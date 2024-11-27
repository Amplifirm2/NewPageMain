import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('Error: ANTHROPIC_API_KEY not found in environment variables');
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function extractJsonFromResponse(text) {
    try {
      console.log('Raw response:', text); // Add this to debug
  
      // First try to extract JSON from code blocks
      const jsonMatch = text.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
      if (jsonMatch && jsonMatch[1]) {
        const cleaned = jsonMatch[1].trim();
        console.log('Extracted from code block:', cleaned);
        return JSON.parse(cleaned);
      }
  
      // Try to find a JSON object pattern
      const jsonPattern = /\{[\s\S]*\}/;
      const matches = text.match(jsonPattern);
      if (matches) {
        const cleaned = matches[0].trim();
        console.log('Extracted using pattern:', cleaned);
        return JSON.parse(cleaned);
      }
  
      throw new Error('No JSON pattern found in response');
    } catch (error) {
      console.error('Error extracting JSON:', error);
      console.error('Original text:', text);
      throw new Error('Failed to parse analysis response');
    }
  }
  
  async function analyzeWithClaude(content) {
    try {
      console.log('Sending content to Claude for analysis...');
  
      // Create a shorter version of content
      const optimizedContent = {
        title: content.title?.slice(0, 100) || '',
        description: content.description?.slice(0, 200) || '',
        mainContent: content.mainContent?.slice(0, 500) || '',
      };
  
      const message = await anthropic.messages.create({
        model: "claude-2.1",
        max_tokens: 500,
        temperature: 0.1, // Reduced for more consistent output
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
      "strengths": ["<strength 1>","<strength 2>"],
      "improvements": ["<improvement 1>","<improvement 2>"],
      "recommendations": ["<recommendation 1>","<recommendation 2>"]
    },
    "marketPosition": "<brief summary>"
  }
  
  Business to analyze: ${JSON.stringify(optimizedContent)}`
        }]
      });
  
      let analysisText = '';
      if (Array.isArray(message.content)) {
        analysisText = message.content.find(item => item.type === 'text')?.text || '';
      } else {
        analysisText = message.content || '';
      }
  
      if (!analysisText) {
        throw new Error('Empty response from Claude');
      }
  
      console.log('Claude response:', analysisText); // Add this to debug
  
      const analysis = extractJsonFromResponse(analysisText);
  
      // Validate the analysis structure
      if (!analysis.scores || !analysis.analysis || !analysis.marketPosition) {
        throw new Error('Invalid analysis structure received');
      }
  
      // Round scores
      Object.keys(analysis.scores).forEach(key => {
        analysis.scores[key] = Number(Number(analysis.scores[key]).toFixed(1));
      });
  
      return analysis;
  
    } catch (error) {
      console.error('Analysis error:', error);
      throw new Error(`Analysis failed: ${error.message}`);
    }
  }

async function scrapeWebsite(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch website: ${response.statusText}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove unnecessary elements to reduce content
    $('script').remove();
    $('style').remove();
    $('noscript').remove();
    $('footer').remove();
    $('nav').remove();
    $('header').remove();

    const content = {
      title: $('title').text().trim() || $('h1').first().text().trim() || '',
      description: $('meta[name="description"]').attr('content') || 
                  $('meta[property="og:description"]').attr('content') || '',
      mainContent: '',
      services: ''
    };

    // Get main content (limited)
    const paragraphs = [];
    $('p').each((_, el) => {
      const text = $(el).text().trim();
      if (text) paragraphs.push(text);
    });
    content.mainContent = paragraphs.slice(0, 5).join(' '); // Only first 5 paragraphs

    // Get services content (limited)
    const serviceElements = $('.service, .product, [class*="service"], [class*="product"]');
    const services = [];
    serviceElements.each((_, el) => {
      const text = $(el).text().trim();
      if (text) services.push(text);
    });
    content.services = services.slice(0, 3).join(' '); // Only first 3 services

    // Validate content
    if (!content.mainContent && !content.description) {
      throw new Error('No meaningful content found on the webpage');
    }

    console.log('Successfully scraped website content');
    return content;
  } catch (error) {
    console.error('Scraping error:', error);
    throw new Error(`Failed to scrape website: ${error.message}`);
  }
}

app.post('/api/analyze-website', async (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ 
      success: false, 
      error: 'URL is required' 
    });
  }

  try {
    console.log('Analyzing website:', url);
    const scrapedContent = await scrapeWebsite(url);
    const analysis = await analyzeWithClaude(scrapedContent);
    
    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error('Website analysis error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.post('/api/analyze-manual', async (req, res) => {
  const { formData } = req.body;
  
  if (!formData) {
    return res.status(400).json({ 
      success: false, 
      error: 'Form data is required' 
    });
  }

  try {
    const analysis = await analyzeWithClaude(formData);
    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error('Manual analysis error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('API Key status:', !!process.env.ANTHROPIC_API_KEY);
});