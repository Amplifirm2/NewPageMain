import { VercelRequest, VercelResponse } from '@vercel/node';
import { Anthropic } from '@anthropic-ai/sdk';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function extractJsonFromResponse(text: string) {
  try {
    const jsonMatch = text.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1].trim());
    }

    const jsonPattern = /\{[\s\S]*\}/;
    const matches = text.match(jsonPattern);
    if (matches) {
      return JSON.parse(matches[0].trim());
    }

    throw new Error('No JSON pattern found in response');
  } catch (error) {
    console.error('Error extracting JSON:', error);
    throw new Error('Failed to parse analysis response');
  }
}

async function analyzeWithClaude(content: any) {
  try {
    const optimizedContent = {
      title: content.title?.slice(0, 100) || '',
      description: content.description?.slice(0, 200) || '',
      mainContent: content.mainContent?.slice(0, 500) || '',
    };

    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1024,
      temperature: 0.1,
      system: "You are a business analyst. Always respond with pure JSON only, no explanations or markdown.",
      messages: [{
        role: "user",
        content: `Return ONLY a JSON object analyzing this business. No other text or formatting. The response must be a raw JSON object matching this exact structure:

{
  "scores": {
    "marketFit": <0-10>,
    "growthPotential": <0-10>,
    "businessModel": <0-10>,
    "overall": <0-10>
  },
  "analysis": {
    "strengths": ["<strength 1>", "<strength 2>"],
    "improvements": ["<improvement 1>", "<improvement 2>"],
    "recommendations": ["<recommendation 1>", "<recommendation 2>"]
  },
  "marketPosition": "<brief summary>"
}

Business to analyze: ${JSON.stringify(optimizedContent)}`
      }]
    });

    const analysisText = response.content[0].text;
    const analysis = extractJsonFromResponse(analysisText);

    if (!analysis.scores || !analysis.analysis || !analysis.marketPosition) {
      throw new Error('Invalid analysis structure received');
    }

    Object.keys(analysis.scores).forEach((key) => {
      analysis.scores[key] = Number(Number(analysis.scores[key]).toFixed(1));
    });

    return analysis;
  } catch (error) {
    console.error('Analysis error:', error);
    throw new Error(`Analysis failed: ${error.message}`);
  }
}

async function scrapeWebsite(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch website: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    $('script, style, noscript, footer, nav, header').remove();

    const content = {
      title: $('title').text().trim() || $('h1').first().text().trim() || '',
      description: $('meta[name="description"]').attr('content') ||
                  $('meta[property="og:description"]').attr('content') || '',
      mainContent: '',
      services: '',
    };

    const paragraphs: string[] = [];
    $('p').each((_, el) => {
      const text = $(el).text().trim();
      if (text) paragraphs.push(text);
    });
    content.mainContent = paragraphs.slice(0, 5).join(' ');

    const serviceElements = $('.service, .product, [class*="service"], [class*="product"]');
    const services: string[] = [];
    serviceElements.each((_, el) => {
      const text = $(el).text().trim();
      if (text) services.push(text);
    });
    content.services = services.slice(0, 3).join(' ');

    if (!content.mainContent && !content.description) {
      throw new Error('No meaningful content found on the webpage');
    }

    return content;
  } catch (error) {
    throw new Error(`Failed to scrape website: ${error.message}`);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, formData } = req.body;

    if (!url && !formData) {
      return res.status(400).json({
        success: false,
        error: 'Either URL or form data is required',
      });
    }

    let analysisContent;
    if (url) {
      analysisContent = await scrapeWebsite(url);
    } else {
      analysisContent = formData;
    }

    const analysis = await analyzeWithClaude(analysisContent);

    return res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
}