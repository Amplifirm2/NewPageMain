import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, 
  FileText, 
  ArrowRight,
  ArrowLeft,
  Target,
  Rocket,
  Building2,
  Lightbulb,
  DollarSign,
  Users,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Link,
  Sparkles,
  Info
} from 'lucide-react';

interface FormData {
  businessDescription: string;
  businessModel: string;
  revenueStreams: string;
  targetMarket: string;
  growthStrategy: string;
}

interface FormErrors {
  [key: string]: string;
}

const MIN_CHARS = 100;

const QUESTIONS = [
  {
    id: 'businessDescription',
    title: 'Business Description',
    question: 'Describe your business and its main offerings...',
    icon: Building2,
    color: '#FF6B6B',
    tooltip: 'Provide a comprehensive overview of your business, including your main products/services, unique value proposition, and what sets you apart from competitors.'
  },
  {
    id: 'businessModel',
    title: 'Business Model',
    question: 'How does your business make money?',
    icon: DollarSign,
    color: '#8B5CF6',
    tooltip: 'Explain your revenue generation methods, pricing strategy, and key partnerships that enable your business to operate profitably.'
  },
  {
    id: 'revenueStreams',
    title: 'Revenue Streams',
    question: 'What are your main revenue sources?',
    icon: TrendingUp,
    color: '#3B82F6',
    tooltip: 'Detail your different revenue channels, their relative importance, and how they contribute to your overall business success.'
  },
  {
    id: 'targetMarket',
    title: 'Target Market',
    question: 'Who are your target customers?',
    icon: Users,
    color: '#EC4899',
    tooltip: 'Describe your ideal customer profile, market segments, and why these specific groups need your product/service.'
  },
  {
    id: 'growthStrategy',
    title: 'Growth Strategy',
    question: 'What is your strategy for growth?',
    icon: Lightbulb,
    color: '#10B981',
    tooltip: 'Outline your plans for scaling the business, including marketing strategies, expansion plans, and key milestones.'
  }
];

const getColorForProgress = (progress: number): string => {
  if (progress < 33) return 'from-red-500 to-red-600';
  if (progress < 66) return 'from-yellow-500 to-yellow-600';
  if (progress < 100) return 'from-green-400 to-green-500';
  return 'from-emerald-400 to-emerald-500';
};

const BusinessAnalyzer = () => {
  const [analysisType, setAnalysisType] = useState<'website' | 'manual'>('manual');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [, setShowUrlTooltip] = useState(false);
  const [urlValidated, setUrlValidated] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    businessDescription: '',
    businessModel: '',
    revenueStreams: '',
    targetMarket: '',
    growthStrategy: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);


  const getProgress = (text: string) => {
    return Math.min((text.length / MIN_CHARS) * 100, 100);
  };
  

  const validateUrl = (url: string) => {
    if (!url) return false;
    try {
      new URL(url);
      return url.includes('.') && url.length > 5;
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setWebsiteUrl(url);
    setUrlValidated(validateUrl(url));
  };

  const validateStep = () => {
    const currentField = QUESTIONS[currentStep].id;
    const text = formData[currentField as keyof FormData];
    
    if (text.length < MIN_CHARS) {
      setErrors({
        ...errors,
        [currentField]: `Please enter at least ${MIN_CHARS} characters (${text.length}/${MIN_CHARS})`
      });
      return false;
    }
    
    setErrors({});
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, QUESTIONS.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (analysisType === 'website') {
      if (!urlValidated) {
        setShowUrlTooltip(true);
        return;
      }
  
      setIsAnalyzing(true);
      // Navigate to loading page with website data
      navigate('/analysis-loading', {
        state: {
          analysisType: 'website',
          websiteUrl: websiteUrl
        }
      });
    } else {
      // For manual input
      if (!validateStep()) {
        return;
      }
  
      setIsAnalyzing(true);
      // Navigate to loading page with form data
      navigate('/analysis-loading', {
        state: {
          analysisType: 'manual',
          formData: formData
        }
      });
    }
  };

  const getCurrentQuestion = () => QUESTIONS[currentStep];

  // Improved Tooltip Component with fixed hover behavior

  // Improved QuestionHelp Component
  const QuestionHelp = ({ content }: { content: string }) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
      <div 
        className="relative group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.button
          className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center
            group-hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Info className="w-4 h-4 text-white/60 group-hover:text-white/90" />
        </motion.button>

        {isHovering && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-50 bg-[#1F1129] text-white text-sm 
              rounded-xl p-4 w-64 shadow-xl border border-white/10 
              left-full ml-2 top-1/2 -translate-y-1/2"
          >
            <div className="absolute top-1/2 -left-2 w-4 h-4 bg-[#1F1129] transform rotate-45 
              border-l border-b border-white/10 -translate-y-1/2" />
            <p className="relative z-10">{content}</p>
          </motion.div>
        )}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-[#13091D] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(to right, #FF6B6B 1px, transparent 1px), linear-gradient(to bottom, #FF6B6B 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 3,
            }}
            style={{
              background: i === 0 ? '#FF6B6B' : i === 1 ? '#8B5CF6' : '#3B82F6',
              left: `${i * 30}%`,
              top: `${i * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="relative min-h-screen pt-32 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div className="inline-block mb-8">
              <motion.div 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F1129]/80 backdrop-blur-sm
                  text-[#FF6B6B] text-lg font-medium border border-[#FF6B6B]/20 relative group"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8F8F]/20 blur-xl
                    opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <Target className="w-5 h-5" />
                <span className="relative z-10">Business Analysis Tool</span>
                {/* Sparkle effects */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.6,
                    }}
                  >
                    <Sparkles className="w-3 h-3 text-[#FF6B6B]" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Decode Your Business
              <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 bg-gradient-to-r from-[#FF6B6B] via-[#FF8F8F] to-[#FF6B6B] 
                  text-transparent bg-clip-text bg-[length:200%_auto]"
                  style={{
                    animation: 'gradient-shift 8s infinite linear'
                  }}>
                  In Detail
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8F8F]/20 blur-xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
            </motion.h1>
          </motion.div>

          {/* Analysis Type Selector */}
          <motion.div
            className="flex justify-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { type: 'website' as const, icon: Globe, label: 'Website Analysis' },
              { type: 'manual' as const, icon: FileText, label: 'Manual Input' }
            ].map((option) => (
              <motion.button
                key={option.type}
                onClick={() => setAnalysisType(option.type)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl relative group overflow-hidden
                  ${analysisType === option.type
                    ? 'bg-[#FF6B6B] text-white'
                    : 'bg-white/5 text-white/60 hover:text-white'
                  } transition-all duration-200`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8F8F]/20
                    ${analysisType === option.type ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
                    transition-opacity`}
                />
                <option.icon className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{option.label}</span>
              </motion.button>
            ))}
          </motion.div>
          {/* Main Content */}
          <AnimatePresence mode="wait">
            {analysisType === 'manual' ? (
              <motion.div
                key="manual-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative"
              >
                {/* Progress Steps */}
                <div className="mb-8">
                  <div className="flex justify-between items-center">
                    {QUESTIONS.map((q, idx) => (
                      <motion.div
                        key={idx}
                        className="flex flex-col items-center relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <motion.div
                          className={`w-12 h-12 rounded-full flex items-center justify-center relative
                            overflow-hidden ${idx === currentStep 
                              ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F]' 
                              : idx < currentStep ? 'bg-green-500' 
                              : 'bg-white/10'}`}
                          whileHover={{ scale: 1.1 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                            animate={{
                              x: ['-200%', '200%'],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatType: "loop"
                            }}
                          />
                          {idx < currentStep ? (
                            <motion.div
                              initial={{ rotate: -180, scale: 0 }}
                              animate={{ rotate: 0, scale: 1 }}
                              transition={{ type: "spring" }}
                            >
                              <CheckCircle className="w-6 h-6 text-white" />
                            </motion.div>
                          ) : (
                            React.createElement(q.icon, {
                              className: "w-6 h-6 text-white relative z-10"
                            })
                          )}
                          {completedSteps.includes(idx) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -right-1 -top-1 bg-green-500 rounded-full p-1
                                shadow-lg shadow-green-500/30"
                            >
                              <CheckCircle className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.div>
                        
                        {/* Step Label */}
                        <motion.div 
                          className="mt-2 text-sm relative"
                          whileHover={{ y: -2 }}
                        >
                          <span className={`${idx === currentStep 
                            ? 'text-white' 
                            : idx < currentStep ? 'text-green-500' 
                            : 'text-white/60'}`}>
                            {q.title}
                          </span>
                        </motion.div>

                        {/* Connecting Line */}
                        {idx < QUESTIONS.length - 1 && (
                          <div className="absolute left-[100%] top-6 w-[calc(100%-3rem)] h-[2px]
                            overflow-hidden">
                            <motion.div
                              className={`h-full ${idx < currentStep 
                                ? 'bg-gradient-to-r from-green-500 to-green-400' 
                                : 'bg-white/10'}`}
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: idx < currentStep ? 1 : 0 }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Question Form */}
                <motion.div
                  className="bg-[#1F1129]/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10
                    shadow-xl mb-8 relative group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.div
                    className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8F8F]/20
                      rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"
                  />

                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6 relative"
                  >
                    {/* Question Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-10 h-10 rounded-xl flex items-center justify-center relative
                            overflow-hidden"
                          style={{ backgroundColor: getCurrentQuestion().color + '20' }}
                          whileHover={{ scale: 1.1, rotate: 10 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                            animate={{
                              x: ['-200%', '200%'],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "loop"
                            }}
                          />
                          {React.createElement(getCurrentQuestion().icon, {
                            className: "w-6 h-6 relative z-10",
                            style: { color: getCurrentQuestion().color }
                          })}
                        </motion.div>
                        <h3 className="text-xl font-semibold text-white">
                          {getCurrentQuestion().title}
                        </h3>
                        <QuestionHelp content={getCurrentQuestion().tooltip} />
                      </div>
                    </div>
                    {/* Text Input Area */}
                    <div className="relative">
                      <textarea
                        value={formData[getCurrentQuestion().id as keyof FormData]}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            [getCurrentQuestion().id]: e.target.value
                          });
                        }}
                        placeholder={getCurrentQuestion().question}
                        className="w-full h-48 px-4 py-3 bg-[#13091D] border border-white/10 rounded-xl
                          text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B6B]
                          transition-colors resize-none"
                      />
                      
                      {/* Character Count */}
                      <div className="absolute bottom-4 right-4 text-sm">
                        <motion.span className={`${
                          formData[getCurrentQuestion().id as keyof FormData].length >= MIN_CHARS
                            ? 'text-green-500'
                            : 'text-white/40'
                        }`}>
                          {formData[getCurrentQuestion().id as keyof FormData].length}
                        </motion.span>
                        <span className="text-white/40">/{MIN_CHARS}</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="absolute -bottom-1 left-0 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${
                            getColorForProgress(
                              getProgress(formData[getCurrentQuestion().id as keyof FormData])
                            )}`}
                          initial={{ width: 0 }}
                          animate={{ 
                            width: `${getProgress(formData[getCurrentQuestion().id as keyof FormData])}%` 
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      
                      {/* Progress Glow Effect */}
                      <motion.div
                        className="absolute -bottom-1 left-0 w-full h-4 rounded-full opacity-20 blur-sm"
                        style={{
                          background: `linear-gradient(to right, transparent, ${
                            getCurrentQuestion().color
                          } ${getProgress(formData[getCurrentQuestion().id as keyof FormData])}%, transparent)`
                        }}
                      />
                    </div>

                    {/* Error Message */}
                    {errors[getCurrentQuestion().id] && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#FF6B6B] text-sm flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors[getCurrentQuestion().id]}
                      </motion.p>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-4">
                      <motion.button
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        className="px-6 py-3 flex items-center gap-2 text-white/60 hover:text-white
                          disabled:opacity-30 disabled:cursor-not-allowed relative group"
                        whileHover={{ scale: 1.02, x: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ArrowLeft className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Previous</span>
                        <motion.div
                          className="absolute inset-0 bg-white/5 rounded-xl opacity-0 
                            group-hover:opacity-100 transition-opacity"
                        />
                      </motion.button>

                      <motion.button
                        onClick={currentStep === QUESTIONS.length - 1 ? handleSubmit : handleNext}
                        disabled={isAnalyzing}
                        className="px-6 py-3 relative group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="absolute -inset-1 bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F] 
                            rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="relative bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F]
                          px-6 py-3 rounded-xl flex items-center gap-2 text-white font-semibold">
                          {isAnalyzing ? (
                            <>
                              <motion.div
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              <span>Analyzing...</span>
                            </>
                          ) : currentStep === QUESTIONS.length - 1 ? (
                            <>
                              <span>Complete Analysis</span>
                              <Rocket className="w-5 h-5" />
                            </>
                          ) : (
                            <>
                              <span>Next Question</span>
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </div>
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="website-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                {/* Website Analysis Form content */}
                <motion.form
                  className="relative"
                  onSubmit={handleSubmit}
                >
                  <motion.div
                    className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F] 
                      rounded-xl blur opacity-20"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  <div className="relative bg-[#1F1129]/50 backdrop-blur-sm rounded-xl p-8 
                    border border-white/10">
                    <div className="mb-8 text-center">
                      <motion.div
                        className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center 
                          relative group overflow-hidden"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8F8F]/20"
                          animate={{
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <Globe className="w-8 h-8 text-[#FF6B6B] relative z-10" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-white mb-2">Website Analysis</h3>
                      <p className="text-white/60">
                        Enter your website URL and let our AI analyze your business model
                      </p>
                    </div>

                    <div className="relative mb-6 group">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8F8F]/20
                          rounded-xl blur-md"
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      
                      <div className="relative flex items-center">
                        <div className="absolute left-4 text-white/40">
                          <Link className="w-5 h-5" />
                        </div>
                        <input
                          type="url"
                          value={websiteUrl}
                          onChange={handleUrlChange}
                          placeholder="https://example.com"
                          className="w-full pl-12 pr-12 py-4 bg-[#13091D] border border-white/10 
                            rounded-xl text-white placeholder:text-white/40 focus:outline-none 
                            focus:border-[#FF6B6B] transition-colors"
                        />
                        {urlValidated && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-4 text-green-500"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={isAnalyzing || !websiteUrl}
                      className="w-full relative group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute -inset-1 bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F] 
                          rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="relative px-6 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F]
                        text-white rounded-xl font-semibold flex items-center justify-center gap-2
                        disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden">
                        
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 
                            to-white/0"
                          animate={{
                            x: ['-200%', '200%'],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "loop"
                          }}
                        />

                        {isAnalyzing ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            <span>Analyzing...</span>
                          </>
                        ) : (
                          <>
                            <Building2 className="w-5 h-5" />
                            <span>Analyze Business Model</span>
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </div>
                    </motion.button>

                    {/* Feature Grid */}
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      {[
                        { icon: Rocket, text: "Instant Analysis" },
                        { icon: Target, text: "AI-Powered Insights" },
                        { icon: CheckCircle, text: "Smart Validation" },
                        { icon: Sparkles, text: "Growth Opportunities" }
                      ].map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="p-4 bg-white/5 rounded-xl border border-white/10 
                            flex items-center gap-3 group hover:bg-white/10 transition-colors"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          whileHover={{ y: -2 }}
                        >
                          <motion.div
                            className="w-8 h-8 rounded-lg bg-[#FF6B6B]/20 
                              flex items-center justify-center"
                            whileHover={{ rotate: 20 }}
                          >
                            <feature.icon className="w-4 h-4 text-[#FF6B6B]" />
                          </motion.div>
                          <span className="text-white/60 group-hover:text-white/90 transition-colors">
                            {feature.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalyzer;