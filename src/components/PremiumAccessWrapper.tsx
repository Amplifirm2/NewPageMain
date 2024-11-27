import { useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Lock,
  Crown,
  Target,
  Rocket,
  ArrowRight,
  Star,
  Shield,
  Clock
} from 'lucide-react';

const STORAGE_KEY = 'amplifirm_qualified_status';

interface PremiumAccessWrapperProps {
  children: ReactNode;
}

const PremiumAccessWrapper = ({ children }: PremiumAccessWrapperProps): JSX.Element => {
  const navigate = useNavigate();
  const [isQualified, setIsQualified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStatus = () => {
      const status = localStorage.getItem(STORAGE_KEY);
      if (status) {
        try {
          const { qualified, timestamp } = JSON.parse(status);
          const isValid = Date.now() - timestamp < 24 * 60 * 60 * 1000;
          setIsQualified(qualified && isValid);
          if (!isValid) {
            localStorage.removeItem(STORAGE_KEY);
          }
        } catch (e) {
          localStorage.removeItem(STORAGE_KEY);
          setIsQualified(false);
        }
      } else {
        setIsQualified(false);
      }
      setIsLoading(false);
    };

    checkStatus();
  }, []);

  const handleUpgradeClick = () => {
    navigate('/', { 
      state: { scrollTo: 'signup-form' }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#13091D] flex items-center justify-center">
        <motion.div
          className="w-20 h-20 rounded-full"
          style={{
            border: '4px solid rgba(255, 107, 107, 0.3)',
            borderTop: '4px solid #FF6B6B'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!isQualified) {
    return (
      <div className="min-h-screen bg-[#13091D] flex items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, #FF6B6B 1px, transparent 1px), linear-gradient(to bottom, #FF6B6B 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </motion.div>

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

        <div className="max-w-6xl mx-auto px-4 py-20 text-center relative z-10">
          {/* Early Access Tag */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block mb-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full 
              bg-[#1F1129]/80 backdrop-blur-sm text-[#FF6B6B] text-lg font-medium 
              border border-[#FF6B6B]/20">
              <Clock className="w-5 h-5" />
              <span>Limited Time Free Access</span>
            </div>
          </motion.div>

          {/* Lock Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 mx-auto mb-8 relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F] rounded-2xl blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative w-full h-full bg-[#1F1129] rounded-2xl border border-[#FF6B6B]/20
              flex items-center justify-center">
              <Lock className="w-12 h-12 text-[#FF6B6B]" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div className="mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-7xl font-bold"
            >
              <span className="text-white">Unlock </span>
              <span className="bg-gradient-to-r from-[#FF6B6B] via-[#FF8F8F] to-[#FF6B6B] 
                text-transparent bg-clip-text bg-[length:200%_auto]"
                style={{
                  animation: "gradient-shift 8s infinite linear"
                }}>
                Premium Access
              </span>
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto mb-16"
          >
            Join as a founding member to unlock AI-powered insights and premium analytics
          </motion.p>

          {/* Feature Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {[
              {
                icon: Crown,
                title: "Founding Member",
                description: "Exclusive lifetime benefits",
                color: "#FF6B6B"
              },
              {
                icon: Target,
                title: "AI Analysis",
                description: "Deep business insights",
                color: "#8B5CF6"
              },
              {
                icon: Rocket,
                title: "Growth Tools",
                description: "Premium features access",
                color: "#3B82F6"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative p-8 bg-[#1F1129]/50 rounded-xl border border-white/10
                  hover:border-[#FF6B6B]/30 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at top right, ${feature.color}10, transparent 60%)`
                  }}
                />
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-[#13091D] border border-white/10 
                    flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/60">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <motion.div className="relative">
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F] rounded-xl blur"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.button
                onClick={handleUpgradeClick}
                className="relative px-8 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F] 
                  rounded-xl text-white font-semibold flex items-center gap-3 group overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">Become a Founder</span>
                <div className="relative z-10 flex items-center gap-1 px-2 py-0.5 bg-white/20 
                  rounded-full text-sm">
                  <Star className="w-3 h-3" />
                  FREE
                </div>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            <div className="flex items-center gap-6 px-6 py-4 bg-[#1F1129]/50 backdrop-blur-sm 
              rounded-xl border border-white/10">
              {[
                { icon: Target, text: "Instant Access" },
                { icon: Shield, text: "Lifetime Benefits" },
                { icon: Star, text: "Premium Support" }
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-white/60">
                  <benefit.icon className="w-4 h-4 text-[#FF6B6B]" />
                  <span>{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timer */}
          <motion.div 
            className="mt-8 inline-flex items-center gap-2 text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Clock className="w-4 h-4" />
            <span>Limited time offer • Only 75 spots remaining</span>
          </motion.div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PremiumAccessWrapper;