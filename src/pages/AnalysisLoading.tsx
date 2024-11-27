import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Brain, BarChart2, Target, PieChart } from 'lucide-react';

const AnalysisLoading = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [, setError] = useState<string | null>(null);

  const steps = [
    { icon: Brain, text: "Analyzing Business Model", color: "#FF6B6B" },
    { icon: BarChart2, text: "Processing Market Data", color: "#8B5CF6" },
    { icon: Target, text: "Evaluating Growth Potential", color: "#3B82F6" },
    { icon: PieChart, text: "Generating Insights", color: "#EC4899" }
  ];

  useEffect(() => {
    const { analysisType, formData, websiteUrl } = location.state as { 
      analysisType?: string; 
      formData?: any; 
      websiteUrl?: string 
    } || {};
    
    console.log('Loading page received:', { analysisType, formData, websiteUrl });
    
    let isMounted = true;

    const fetchAnalysis = async () => {
      try {
        const endpoint = analysisType === 'website' 
          ? '/api/analyze-website'
          : '/api/analyze-manual';
        
        const response = await fetch(`http://localhost:3001${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            analysisType === 'website' 
              ? { url: websiteUrl }
              : { formData }
          ),
        });

        if (!response.ok) {
          throw new Error('Analysis failed');
        }

        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Analysis failed');
        }

        // Ensure we have valid analysis data
        if (!data.analysis || typeof data.analysis !== 'object') {
          throw new Error('Invalid analysis data received');
        }

        if (isMounted) {
          // Wait for progress animation to complete
          setTimeout(() => {
            navigate('/analysis-results', {
              state: {
                analysis: data.analysis,
                loading: false,
                error: null
              }
            });
          }, 1000);
        }
      } catch (error: unknown) {
        console.error('Analysis error:', error);
        if (error instanceof Error) {
          setError(error.message);
          navigate('/analysis-results', {
            state: {
              analysis: null,
              loading: false,
              error: error.message
            }
          });
        } else {
          setError('An unknown error occurred');
          navigate('/analysis-results', {
            state: {
              analysis: null,
              loading: false,
              error: 'An unknown error occurred'
            }
          });
        }
      }
    };

    // Start progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    // Update current step
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000);

    // Start analysis
    fetchAnalysis();

    return () => {
      isMounted = false;
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [navigate, location, steps]);

  return (
    <div className="min-h-screen bg-[#13091D] flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(to right, #FF6B6B 1px, transparent 1px), linear-gradient(to bottom, #FF6B6B 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Floating Orbs */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
            style={{
              background: i === 0 ? '#FF6B6B' : i === 1 ? '#8B5CF6' : '#3B82F6',
              opacity: 0.2,
              top: `${i * 30}%`,
              left: `${i * 30}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 2,
            }}
          />
        ))}

        {/* Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#FF6B6B]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4">
        {/* Main Loading Animation */}
        <motion.div 
          className="mb-12 relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 1 }}
        >
          <div className="w-32 h-32 mx-auto relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F] rounded-3xl blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="relative w-full h-full rounded-3xl bg-[#1F1129] border border-[#FF6B6B]/20
                flex items-center justify-center overflow-hidden"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="w-16 h-16 text-[#FF6B6B]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <div className="space-y-6 mb-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ 
                opacity: currentStep >= index ? 1 : 0.3,
                x: 0 
              }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center gap-4"
            >
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center relative"
                style={{ 
                  backgroundColor: `${step.color}20`,
                  color: step.color
                }}
                animate={currentStep >= index ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0]
                } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <step.icon className="w-5 h-5" />
                {currentStep === index && (
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2"
                    style={{ borderColor: step.color }}
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.div>
              <span className="text-white/80">{step.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="relative pt-4">
          <div className="flex justify-between text-sm text-white/60 mb-2">
            <span>Analysis Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Loading Message */}
        <motion.p
          className="text-white/40 text-center mt-8"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Please wait while we analyze your business data...
        </motion.p>
      </div>
    </div>
  );
};

export default AnalysisLoading;