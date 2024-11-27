
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Target, 
  TrendingUp, 
  Rocket,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Brain,
  Download,
  Share2,
  Globe,
  Plus,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  color: string;
}

interface InsightCardProps {
  title: string;
  items?: string[];
  icon: LucideIcon;
  color: string;
  className?: string;
}

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  color: string;
}

// Animated Score Ring Component
const ScoreRing = ({ score, size = 200, strokeWidth = 8, color }: ScoreRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 10) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background Ring */}
      <svg className="absolute transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1F1129"
          strokeWidth={strokeWidth}
        />
        {/* Animated Progress Ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      
      {/* Score Display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-4xl font-bold"
          style={{ color }}
        >
          {score.toFixed(1)}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-white/60 text-sm"
        >
          out of 10
        </motion.div>
      </div>
    </div>
  );
};

const InsightCard = ({ title, items = [], icon: Icon, color, className = "" }: InsightCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className={`bg-[#1F1129]/50 rounded-xl border border-white/10 overflow-hidden ${className}`}
    >
      <motion.div
        className="p-6"
        layout="position"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon className="w-5 h-5" style={{ color }} />
            </motion.div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center
              hover:bg-white/10 transition-colors"
          >
            <Plus 
              className="w-4 h-4 text-white/60"
              style={{ transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease' }}
            />
          </motion.button>
        </div>

        {/* Preview Items */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {items.slice(0, 2).map((item: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full mt-2"
                    style={{ backgroundColor: color }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-white/70 group-hover:text-white transition-colors">
                    {item}
                  </span>
                </motion.div>
              ))}
              {items.length > 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-white/40 text-sm mt-2"
                >
                  +{items.length - 2} more insights
                </motion.div>
              )}
            </motion.div>
          )}
          
          {/* Expanded Items */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              {items.map((item: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full mt-2"
                    style={{ backgroundColor: color }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-white/70 group-hover:text-white transition-colors">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const MetricCard = ({ label, value, change, icon: Icon, color }: MetricCardProps) => {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        className="p-6 bg-[#1F1129]/50 rounded-xl border border-white/10"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 text-white/60">
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </div>
          {change && (
            <div className={`flex items-center gap-1 text-sm
              ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              {Math.abs(change)}%
            </div>
          )}
        </div>
        <div className="text-3xl font-bold" style={{ color }}>
          {value}
        </div>
      </motion.div>
    );
  };

const AnalysisResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [] = useState('overview');
  
  const { analysis, loading, error } = location.state || {};

  if (loading) return (
    <div className="min-h-screen bg-[#13091D] flex items-center justify-center">
      <motion.div
        className="w-20 h-20 rounded-full border-4 border-[#FF6B6B] border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#13091D] flex items-center justify-center text-center px-4">
      <div>
        <AlertTriangle className="w-20 h-20 text-[#FF6B6B] mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-white mb-4">Analysis Error</h2>
        <p className="text-white/60 max-w-md mx-auto">{error}</p>
        <motion.button
          onClick={() => navigate('/business-analyzer')}
          className="mt-8 px-6 py-3 bg-[#FF6B6B] text-white rounded-xl hover:bg-[#FF8F8F]
            transition-colors inline-flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowRight className="w-5 h-5" />
          Try Again
        </motion.button>
      </div>
    </div>
  );

  // Parse analysis data
  const {
    scores = {
      marketFit: 7.8,
      growthPotential: 8.2,
      businessModel: 7.5,
      overall: 7.8
    },
    analysis: {
      strengths = [],
      improvements = [],
      recommendations = []
    } = {},
    marketPosition = "Your business shows strong potential with clear opportunities for growth"
  } = analysis || {};

  const metrics = [
    {
      label: "Market Position",
      value: "#12",
      change: 3,
      icon: Globe,
      color: "#FF6B6B"
    },
    {
      label: "Growth Rate",
      value: "86%",
      change: 12,
      icon: TrendingUp,
      color: "#8B5CF6"
    },
    {
      label: "Industry Score",
      value: "A+",
      change: 5,
      icon: Target,
      color: "#3B82F6"
    }
  ];

  return (
    <div className="min-h-screen bg-[#13091D] pb-20 relative overflow-hidden">
      {/* Background Effects */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(to right, #FF6B6B 1px, transparent 1px), linear-gradient(to bottom, #FF6B6B 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Gradient Orbs */}
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

      <div className="relative pt-32 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div className="inline-block mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full 
                  bg-[#1F1129]/80 backdrop-blur-sm text-[#FF6B6B] text-lg font-medium 
                  border border-[#FF6B6B]/20"
              >
                <Brain className="w-5 h-5" />
                <span>Analysis Complete</span>
                <CheckCircle className="w-5 h-5" />
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Your Growth Analysis
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-white/60 max-w-2xl mx-auto"
            >
              {marketPosition}
            </motion.p>
          </motion.div>

          {/* Overall Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1F1129]/50 rounded-2xl p-8 border border-white/10
              backdrop-blur-sm relative overflow-hidden group mb-16"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8F8F]/20
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center md:justify-start">
                <ScoreRing score={scores.overall} color="#FF6B6B" />
              </div>
              
              <div className="space-y-6">
                <div>
                <h3 className="text-2xl font-bold text-white mb-2">Overall Growth Score</h3>
                  <p className="text-white/60">
                    Your business demonstrates strong potential with several key opportunities for growth and optimization.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      label: "Market Position",
                      value: "Strong",
                      icon: Target,
                      color: "#FF6B6B"
                    },
                    {
                      label: "Growth Rate",
                      value: "Excellent",
                      icon: TrendingUp,
                      color: "#8B5CF6"
                    }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="p-4 rounded-xl bg-white/5 border border-white/10"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                        <span className="text-white/60 text-sm">{stat.label}</span>
                      </div>
                      <div className="text-lg font-semibold" style={{ color: stat.color }}>
                        {stat.value}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 
                      text-white hover:bg-white/10 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Report</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 
                      text-white hover:bg-white/10 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share Results</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {metrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>

          {/* Detailed Scores Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                label: "Market Fit",
                score: scores.marketFit,
                icon: Target,
                color: "#FF6B6B",
                description: "How well your business aligns with market needs"
              },
              {
                label: "Growth Potential",
                score: scores.growthPotential,
                icon: TrendingUp,
                color: "#8B5CF6",
                description: "Your capacity for sustainable growth"
              },
              {
                label: "Business Model",
                score: scores.businessModel,
                icon: BarChart3,
                color: "#3B82F6",
                description: "Effectiveness of your revenue generation model"
              }
            ].map((score, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1F1129]/50 rounded-xl p-6 border border-white/10 
                  hover:border-[#FF6B6B]/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{ rotate: 20 }}
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${score.color}20` }}
                    >
                      <score.icon className="w-5 h-5" style={{ color: score.color }} />
                    </motion.div>
                    <div>
                      <h4 className="text-white font-medium">{score.label}</h4>
                      <p className="text-white/40 text-sm">{score.description}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold" style={{ color: score.color }}>
                    {score.score.toFixed(1)}
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: score.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${score.score * 10}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Insights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <InsightCard
              title="Key Strengths"
              items={strengths}
              icon={CheckCircle}
              color="#10B981"
            />
            <InsightCard
              title="Areas for Improvement"
              items={improvements}
              icon={AlertTriangle}
              color="#F59E0B"
            />
          </div>

  {/* Recommendations Section */}
{recommendations.length > 0 && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-8 bg-[#1F1129]/50 rounded-xl p-8 border border-white/10"
  >
    <div className="flex items-center gap-3 mb-6">
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="w-12 h-12 rounded-xl bg-[#FF6B6B]/20 flex items-center justify-center"
      >
        <Rocket className="w-6 h-6 text-[#FF6B6B]" />
      </motion.div>
      <h3 className="text-2xl font-bold text-white">Action Plan</h3>
    </div>
    
    <div className="grid gap-4">
      {recommendations.map((rec: string, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#FF6B6B]/30 transition-all duration-300 group"
        >
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B6B]/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-[#FF6B6B] font-semibold">{i + 1}</span>
            </div>
            <p className="text-white/80 group-hover:text-white transition-colors">
              {rec}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
)}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;