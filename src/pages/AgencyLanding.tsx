// src/pages/AgencyLanding.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Rocket, 
  Twitter,
  Target, 
  DollarSign,
  Globe,
  Mail,
  Phone,
  Shield,
  FileText,
  Linkedin,
  Zap,
  Clock,
  Send,
  MapPin,
  Users,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Heart,
  TrendingUp
} from 'lucide-react';

//for vercel test

interface FormData {
  agencyName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  services: string[];
  budgetRange: string;
  industries: string[];
  yearsInBusiness: string;
  description: string;
}

interface FormErrors {
  [key: string]: string;
}

const AgencyLanding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    agencyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    services: [],
    budgetRange: '',
    industries: [],
    yearsInBusiness: '',
    description: ''
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const SHEET_BEST_API = "https://api.sheetbest.com/sheets/48d32295-81a8-4cc3-9b07-c24af21e03b4";

  const serviceOptions = [
    "Digital Marketing",
    "Social Media Management",
    "SEO Services",
    "Content Marketing",
    "PPC/Paid Advertising",
    "Email Marketing",
    "Web Development",
    "Branding & Design",
    "Video Production",
    "Marketing Strategy",
    "Analytics & Reporting",
    "Marketing Automation"
  ];

  const industryOptions = [
    "Technology",
    "E-commerce",
    "Healthcare",
    "Finance",
    "Education",
    "Real Estate",
    "Professional Services",
    "Manufacturing",
    "Retail",
    "Travel & Hospitality",
    "Non-profit",
    "Other"
  ];

  const budgetRanges = [
    "Under $1,000/month",
    "$1,000 - $5,000/month",
    "$5,000 - $10,000/month",
    "$10,000 - $25,000/month",
    "$25,000+/month",
    "Project-based pricing"
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 0:
        // Validate Basic Info
        if (!formData.agencyName.trim()) {
          newErrors.agencyName = 'Agency name is required';
        }
        if (!formData.contactName.trim()) {
          newErrors.contactName = 'Contact name is required';
        }
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Email is invalid';
        }
        if (!formData.website.trim()) {
          newErrors.website = 'Website is required';
        }
        break;

      case 1:
        // Validate Services
        if (formData.services.length === 0) {
          newErrors.services = 'Please select at least one service';
        }
        if (!formData.budgetRange) {
          newErrors.budgetRange = 'Please select a budget range';
        }
        break;

      case 2:
        // Optional: Add any final step validation here
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    // Validate all steps before submission
    const isStep1Valid = validateStep(0);
    const isStep2Valid = validateStep(1);
    
    if (!isStep1Valid || !isStep2Valid) {
      setErrors(prev => ({
        ...prev,
        submit: 'Please complete all required fields'
      }));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(SHEET_BEST_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Timestamp: new Date().toLocaleString(),
          "Agency Name": formData.agencyName,
          "Contact Person": formData.contactName,
          Email: formData.email,
          Phone: formData.phone,
          Website: formData.website,
          Services: formData.services.join(", "),
          "Budget Range": formData.budgetRange,
          "Industries Served": formData.industries.join(", "),
          "Years in Business": formData.yearsInBusiness,
          Description: formData.description,
          Status: "New Lead"
        })
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setIsSuccess(true);
      setFormData({
        agencyName: '',
        contactName: '',
        email: '',
        phone: '',
        website: '',
        services: [],
        budgetRange: '',
        industries: [],
        yearsInBusiness: '',
        description: ''
      });

    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  



return (
  <div className="min-h-screen bg-[#13091D]">

{/* Hero Section */}
<section id="hero" className="relative min-h-screen pt-32 pb-20 px-4 overflow-hidden">
  {/* Animated Background Elements */}
  <div className="absolute inset-0 bg-[#13091D]">
    {/* Gradient Grid */}
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
        className={`absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-30`}
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

  <div className="max-w-6xl mx-auto text-center relative z-10">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-16 relative"
    >
      {/* Animated Tag */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-block mb-8"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F] rounded-full opacity-50 blur-md group-hover:opacity-70 transition-opacity"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F1129]/80 backdrop-blur-sm
            text-[#FF6B6B] text-lg font-medium border border-[#FF6B6B]/20">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              <Target className="w-5 h-5" />
            </motion.div>
            <span>Get Your Free Growth Score</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Title with Animated Background */}
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/20 to-transparent rounded-3xl blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative"
        >
          <h1 className="text-7xl md:text-8xl font-bold mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white mb-2"
            >
              Find Your Perfect
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="relative inline-block"
            >
              <span className="relative z-10 bg-gradient-to-r from-[#FF6B6B] via-[#FF8F8F] to-[#FF6B6B] 
                text-transparent bg-clip-text bg-[length:200%_100%]"
                style={{
                  animation: "gradient-shift 8s infinite linear"
                }}
              >
                Marketing Match
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8F8F]/20 blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-3xl text-white/60 max-w-2xl mx-auto mb-12"
          >
            Stop chasing leads. 
            <span className="relative inline-block ml-2">
              Start growing
              <motion.div
                className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF6B6B]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
            </span>
          </motion.p>
        </motion.div>
      </div>

      {/* Animated Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-12"
      >
        {[
          { value: "Free", label: "Business Rate" },
          { value: "5 mins", label: "Setup Time" },
          { value: "24/7", label: "Free Funnel" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="relative group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-[#FF6B6B]/10 to-transparent rounded-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
            />
            <div className="relative p-4 rounded-xl backdrop-blur-sm border border-white/10
              group-hover:border-[#FF6B6B]/30 transition-colors">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="text-3xl font-bold text-[#FF6B6B] mb-1"
              >
                {stat.value}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                className="text-white/60"
              >
                {stat.label}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
      >
        <motion.button
          onClick={() => navigate('/business-analyzer')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F]"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
              bg-gradient-to-r from-[#FF8F8F] to-[#FF6B6B]"
            animate={{
              backgroundPosition: ['100% 50%', '0% 50%', '100% 50%']
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <div className="relative flex items-center gap-2 text-white">
            <Target className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            <span>Get Your Growth Score</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden
            group border border-white/10"
        >
          <motion.div
            className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
          <div className="relative flex items-center gap-2 text-white">
            <Send className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>See How It Works</span>
          </div>
        </motion.button>
      </motion.div>

      {/* Trust Markers */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="flex flex-wrap justify-center gap-8"
      >
        {[
          { icon: Shield, text: "Verified Assessment" },
          { icon: Zap, text: "AI-Powered Analysis" },
          { icon: CheckCircle, text: "Industry Leading" }
        ].map((marker, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-3 text-white/60 hover:text-white/90 transition-colors"
          >
            <motion.div
              animate={{ 
                rotate: index === 1 ? [0, 360] : 0,
                scale: index === 0 ? [1, 1.2, 1] : 1
              }}
              transition={{ 
                duration: index === 1 ? 5 : 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <marker.icon className="w-5 h-5 text-[#FF6B6B]" />
            </motion.div>
            <span className="text-sm font-medium">{marker.text}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </div>

  {/* Scroll Indicator */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2 }}
    className="absolute bottom-8 left-1/2 -translate-x-1/2"
  >
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="flex flex-col items-center gap-2 text-white/40"
    >
      <span className="text-sm">Scroll to explore</span>
      <ChevronDown className="w-6 h-6" />
    </motion.div>
  </motion.div>
  
  {/* Benefits Cards */}
<motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.6 }}
  className="max-w-6xl mx-auto mt-20"
>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
    {/* Connecting Lines */}
    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF6B6B]/20 to-transparent 
      hidden lg:block" />
    
    {[
      {
        icon: Target,
        title: "Qualified Buyers",
        description: "Pre-vetted clients ready to buy your services",
        color: "#FF6B6B"
      },
      {
        icon: Zap,
        title: "Smart Matching",
        description: "AI pairs you with your ideal customers",
        color: "#8B5CF6"
      },
      {
        icon: DollarSign,
        title: "Premium Projects",
        description: "Higher budgets, better partnerships",
        color: "#3B82F6"
      },
      {
        icon: Globe,
        title: "Market Growth",
        description: "Tap into new industries instantly",
        color: "#EC4899"
      }
    ].map((benefit, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 + (index * 0.1) }}
        whileHover={{ y: -5 }}
        className="relative group"
      >
        <div className="p-8 rounded-2xl bg-[#1F1129] border border-white/10 
          group-hover:border-[#FF6B6B]/30 transition-all duration-300 overflow-hidden
          group-hover:shadow-lg group-hover:shadow-[#FF6B6B]/5">
          {/* Subtle Gradient Overlay */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at top right, ${benefit.color}10, transparent 60%)`
            }}
          />

          {/* Icon Container */}
          <div className="relative mb-6">
            <motion.div
              className="w-12 h-12 rounded-xl bg-[#13091D] border border-white/10 
                flex items-center justify-center group-hover:border-[#FF6B6B]/20
                group-hover:bg-[#13091D]/80 transition-all duration-300"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <benefit.icon 
                className="w-6 h-6 text-[#FF6B6B] group-hover:scale-110 transition-transform duration-300" 
                style={{ color: benefit.color }}
              />
            </motion.div>
          </div>

          {/* Text Content */}
          <motion.h3 
            className="text-xl font-semibold text-white mb-3 transition-colors duration-300
              group-hover:text-[#FF6B6B]"
            style={{ 
            }}
          >
            {benefit.title}
          </motion.h3>
          
          <p className="text-white/60 group-hover:text-white/80 transition-colors duration-300">
            {benefit.description}
          </p>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>

</section>


{/* How It Works Section */}
<section id="how-it-works" className="py-24 px-4 bg-[#13091D] relative overflow-hidden">
  {/* Animated Background Elements */}
  <motion.div 
    animate={{
      opacity: [0.1, 0.15, 0.1],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse"
    }}
    className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6B6B]/10 rounded-full blur-[100px]"
  />
  <motion.div 
    animate={{
      opacity: [0.1, 0.15, 0.1],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      repeatType: "reverse",
      delay: 1
    }}
    className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]"
  />

  <div className="max-w-6xl mx-auto relative">
    {/* Section Header */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-20"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="inline-block"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B6B]/10 
          text-[#FF6B6B] text-sm font-medium border border-[#FF6B6B]/20">
          <Target className="w-4 h-4" />
          Simple Process
        </span>
      </motion.div>
      
      <motion.h2 
        className="text-4xl md:text-5xl font-bold text-white my-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Your Path to Growth
      </motion.h2>
      
      <motion.p 
        className="text-xl text-white/60 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        Get matched with the perfect clients in three easy steps
      </motion.p>
    </motion.div>

    {/* Timeline Steps */}
    <div className="relative">
      {/* Central Timeline Line */}
      <div className="absolute left-[50%] top-0 bottom-0 w-px hidden lg:block">
        {/* Static Background Line */}
        <div className="absolute inset-0 bg-white/5" />
        
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[#FF6B6B]/0 via-[#FF6B6B]/20 to-[#FF6B6B]/0"
          animate={{
            backgroundSize: ['100% 200%', '100% 200%'],
            backgroundPosition: ['0% 0%', '0% 100%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Animated Progress Line */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 w-full"
        >
          {/* Main Progress Line */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FF6B6B] to-[#FF8F8F]" />

          {/* Animated Particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 left-1/2 -translate-x-1/2 bg-white rounded-full"
              animate={{
                y: ['-100%', '100%'],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "linear"
              }}
            />
          ))}

          {/* Glowing Effect */}
          <motion.div
            className="absolute inset-0 w-[3px] -left-[1px] bg-[#FF6B6B] blur-sm"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />

          {/* Pulse Effect at Current Progress */}
          <motion.div
            className="absolute bottom-0 -left-2 w-5 h-5 bg-[#FF6B6B] rounded-full blur-md"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>

        {/* Scanning Line Effect */}
        <motion.div
          className="absolute w-full h-20 bg-gradient-to-b from-transparent via-[#FF6B6B]/20 to-transparent"
          animate={{
            y: ['-100%', '100%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Steps Content */}
      {[
        {
          step: 1,
          title: "Share Your Expertise",
          description: "Tell us about your agency's strengths and ideal clients",
          icon: FileText,
          color: "#FF6B6B",
          features: [
            "Service offerings",
            "Target industries",
            "Project portfolio",
            "Team capabilities"
          ]
        },
        {
          step: 2,
          title: "Get Your Growth Score",
          description: "Our AI analyzes your potential and market fit",
          icon: Target,
          color: "#FF8F8F",
          features: [
            "Market position",
            "Growth potential",
            "Competitive analysis",
            "Revenue projection"
          ]
        },
        {
          step: 3,
          title: "Connect with Clients",
          description: "Start receiving perfectly matched project opportunities",
          icon: Rocket,
          color: "#FF6B6B",
          features: [
            "Qualified leads",
            "Pre-vetted clients",
            "Matched budgets",
            "Growth tracking"
          ]
        }
      ].map((item, index) => (
        <motion.div
          key={index}
          className={`relative flex ${
            index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
          } flex-col items-center mb-32 last:mb-0`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          {/* Timeline Node */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="absolute left-[50%] transform -translate-x-1/2 hidden lg:block"
          >
            {/* Node Container */}
            <div className="relative">
              {/* Animated Ring */}
              <motion.div
                className="absolute -inset-4 rounded-full"
                style={{
                  background: `conic-gradient(from 0deg, ${item.color}40, ${item.color}20, ${item.color}00)`
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Node Circle */}
              <motion.div
                className="w-8 h-8 rounded-full bg-[#1F1129] border-2"
                style={{ borderColor: item.color }}
                whileHover={{ scale: 1.2 }}
                animate={{
                  boxShadow: [
                    `0 0 0 0px ${item.color}20`,
                    `0 0 0 10px ${item.color}00`
                  ]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
              >
                <div className="w-full h-full rounded-full flex items-center justify-center text-[#FF6B6B]">
                  {item.step}
                </div>
              </motion.div>
            </div>

            {/* Connecting Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              className={`absolute top-1/2 h-[2px] bg-gradient-to-r from-[#FF6B6B] to-transparent
                ${index % 2 === 0 ? '-right-24 w-24' : '-left-24 w-24'}`}
            />
          </motion.div>

          {/* Content Side */}
          <div className={`flex-1 ${
            index % 2 === 0 ? 'lg:pr-32' : 'lg:pl-32'
          } text-center lg:text-left`}>
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-block mb-4"
              >
                <div className="px-4 py-2 bg-[#FF6B6B]/10 rounded-lg border border-[#FF6B6B]/20
                  text-[#FF6B6B] font-mono font-bold">
                  Step {item.step}
                </div>
              </motion.div>

              <h3 className="text-3xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-xl text-white/60 mb-8">{item.description}</p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {item.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: featureIndex * 0.1 }}
                    className="flex items-center gap-3 group"
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full bg-[#FF6B6B]"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-white/80 group-hover:text-white transition-colors">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Icon Side */}
          <div className="relative flex-1 flex justify-center lg:px-20 mt-8 lg:mt-0">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Icon Background Effects */}
              <motion.div
                className="absolute inset-0 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"
                style={{
                  background: `linear-gradient(45deg, ${item.color}40, transparent)`
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Icon Container */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-32 h-32 rounded-3xl bg-[#1F1129] border border-white/10
                  flex items-center justify-center overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/0 via-white/5 to-[#FF6B6B]/0"
                  animate={{
                    x: ['-200%', '200%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon className="w-16 h-16" style={{ color: item.color }} />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Bottom CTA */}
    <motion.button
      onClick={() => scrollToSection('signup-form')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative group px-8 py-4 rounded-xl bg-[#FF6B6B] text-white font-semibold 
        overflow-hidden mt-12 mx-auto block"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F]"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      
      <span className="relative flex items-center gap-2">
        <Target className="w-5 h-5" />
        Get Started Now
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          →
        </motion.span>
      </span>
    </motion.button>
  </div>
</section>


<section id="why-join" className="py-24 bg-[#13091D] relative overflow-hidden">
  {/* Background Elements */}
  <div className="absolute inset-0">
    {/* Grid Pattern */}
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.1 }}
      className="absolute inset-0"
      style={{
        backgroundImage: 'linear-gradient(to right, #FF6B6B 1px, transparent 1px), linear-gradient(to bottom, #FF6B6B 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}
    />
    
    {/* Floating Elements */}
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full bg-[#FF6B6B]"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [-20, 20, -20],
          x: [-20, 20, -20],
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 5 + i,
          repeat: Infinity,
          delay: i * 0.5,
        }}
      />
    ))}
    
    {/* Gradient Orbs */}
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
      style={{
        background: 'radial-gradient(circle, #FF6B6B 0%, transparent 70%)',
        filter: 'blur(100px)'
      }}
    />
    
    <motion.div
      animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.1, 0.15, 0.1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full"
      style={{
        background: 'radial-gradient(circle, purple 0%, transparent 70%)',
        filter: 'blur(100px)'
      }}
    />
  </div>

  {/* Main Content Container */}
  <div className="max-w-6xl mx-auto px-4 relative">
    {/* Header */}
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        className="inline-block"
      >
        <motion.span 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF6B6B]/10
            border border-[#FF6B6B]/20"
          whileHover={{ scale: 1.05 }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(255, 107, 107, 0)',
              '0 0 0 10px rgba(255, 107, 107, 0)',
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <Target className="w-5 h-5 text-[#FF6B6B]" />
          </motion.div>
          <span className="text-[#FF6B6B] font-semibold">Founding Member Access</span>
        </motion.span>
      </motion.div>
      
      <motion.div 
        className="relative mt-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Scale Your Agency with
          <br />
          <span className="relative inline-block mt-2">
            <span className="relative z-10 bg-gradient-to-r from-[#FF6B6B] via-[#FF8F8F] to-[#FF6B6B] 
              text-transparent bg-clip-text bg-[length:200%_100%]"
              style={{
                animation: 'gradient-shift 3s infinite linear'
              }}
            >
              AI-Powered Growth
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
        </motion.h2>
        
        <motion.p 
          className="text-xl text-white/60 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Join an exclusive network of high-growth marketing agencies
        </motion.p>
      </motion.div>
    </motion.div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
      {/* Left Column - Growth Metrics */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        {[
          {
            title: "Business Rating",
            description: "A rating which highlights your strengths and flaws",
            icon: Target,
            stat: "98% Accurate",
            substat: "",
            color: "#FF6B6B"
          },
          {
            title: "Revenue Growth",
            description: "Guaranteed Clients for no charge",
            icon: TrendingUp,
            stat: "0$",
            substat: "For Free",
            color: "#8B5CF6"
          },
          {
            title: "Commission",
            description: "What you pay on who we bring",
            icon: Users,
            stat: "2%",
            substat: "Long-term clients",
            color: "#3B82F6"
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ y: -5 }}
            className="group relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r rounded-xl opacity-0 group-hover:opacity-100 
                transition-all duration-500"
              style={{
                background: `linear-gradient(90deg, ${stat.color}15, transparent)`
              }}
            />
            
            <div className="relative p-8 bg-[#1F1129] rounded-xl border border-white/10 
              group-hover:border-[#FF6B6B]/30 transition-all duration-300">
              <div className="flex items-start gap-6">
                <motion.div
                  className="relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r rounded-lg blur-md"
                    style={{ background: `${stat.color}40` }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="relative w-16 h-16 rounded-lg bg-gradient-to-br 
                    from-white/5 to-white/0 border border-white/10
                    flex items-center justify-center">
                    <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                  </div>
                </motion.div>
                
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <motion.span 
                      className="text-3xl font-bold"
                      style={{ color: stat.color }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.3 }}
                    >
                      {stat.stat}
                    </motion.span>
                    <motion.span
                      className="text-sm font-medium text-white/60"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.3 + 0.2 }}
                    >
                      {stat.substat}
                    </motion.span>
                  </div>
                  <h4 className="text-white font-semibold text-lg mb-2 group-hover:text-[#FF6B6B] 
                    transition-colors">
                    {stat.title}
                  </h4>
                  <p className="text-white/60 group-hover:text-white/80 transition-colors">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Right Column - Benefits */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative"
      >
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6B6B] to-purple-600 rounded-2xl blur"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
        
        <div className="relative p-8 bg-[#1F1129] rounded-xl border border-white/10 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{
              x: ['-200%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />

          <h3 className="text-3xl font-bold text-white mb-10 relative">
            Founding Member Benefits
          </h3>
          
          <div className="space-y-8">
            {[
              {
                metric: "0$",
                title: "Subscription Free",
                description: "Pay no platform fees for life, just when we get you results",
                icon: DollarSign
              },
              {
                metric: "VIP",
                title: "Priority Matching",
                description: "Get matched with premium clients first",
                icon: Target
              },
              {
                metric: "500",
                title: "Exclusive Network",
                description: "Limited to 500 top-performing agencies",
                icon: Users
              }
            ].map((perk, index) => (
              <motion.div
                key={index}
                className="group flex items-start gap-6 border-b border-white/5 pb-6 last:border-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ x: 10 }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-[#FF6B6B]/20 rounded-lg blur-md"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="relative px-4 py-2 bg-[#FF6B6B]/10 rounded-lg 
                    group-hover:bg-[#FF6B6B]/20 transition-colors">
                    <span className="text-[#FF6B6B] font-bold text-2xl">{perk.metric}</span>
                  </div>
                </motion.div>
                
                <div>
                  <motion.div
                    className="flex items-center gap-2 mb-2"
                    whileHover={{ x: 5 }}
                  >
                    <perk.icon className="w-5 h-5 text-[#FF6B6B]" />
                    <h4 className="text-white font-semibold text-lg">
                      {perk.title}
                    </h4>
                  </motion.div>
                  <p className="text-white/60 group-hover:text-white/80 transition-colors">
                    {perk.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timer Component */}
          <motion.div 
            className="mt-8 p-6 bg-[#13091D] rounded-lg relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Inside the timer component */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="p-2 rounded-lg bg-[#FF6B6B]/10 relative group"
                >
                  <motion.div
                    className="absolute inset-0 bg-[#FF6B6B]/20 rounded-lg blur-sm"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Clock className="w-5 h-5 text-[#FF6B6B] relative z-10" />
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-white/80 font-medium">Early Access Closing</span>
                  <motion.span 
                    className="text-[#FF6B6B]/60 text-sm"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Limited spots remaining
                  </motion.span>
                </div>
              </div>
              
              {/* Countdown Display */}
              <div className="flex items-center gap-2">
                {['72', '11', '35'].map((num, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className="bg-[#FF6B6B]/10 px-3 py-2 rounded-lg border border-[#FF6B6B]/20"
                      animate={{
                        borderColor: ['rgba(255, 107, 107, 0.2)', 'rgba(255, 107, 107, 0.4)', 'rgba(255, 107, 107, 0.2)']
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.span 
                        className="text-[#FF6B6B] font-mono font-bold text-lg"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        {num}
                      </motion.span>
                    </motion.div>
                    {index < 2 && (
                      <span className="text-white/40 mx-1 font-mono">:</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 relative h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F]"
                initial={{ width: '100%' }}
                animate={{ width: '15%' }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-[#FF6B6B]">85% Claimed</span>
              <span className="text-white/40">75 spots left</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>

    {/* Social Proof Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-20 relative"
    >
      {/* Stats Bar */}
      <motion.div 
        className="bg-[#1F1129]/50 rounded-2xl p-6 border border-white/10 backdrop-blur-sm"
        whileHover={{ scale: 1.02 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              label: "Active Agencies",
              value: "389",
              subtext: "Growing daily",
              icon: Users
            },
            {
              label: "Average Growth",
              value: "2.8x",
              subtext: "Revenue increase",
              icon: TrendingUp
            },
            {
              label: "Client Satisfaction",
              value: "96%",
              subtext: "Retention rate",
              icon: Heart
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-[#FF6B6B]/10 flex items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <stat.icon className="w-6 h-6 text-[#FF6B6B]" />
              </motion.div>
              <div>
                <motion.div 
                  className="text-2xl font-bold text-white"
                  animate={{ 
                    opacity: [0.8, 1, 0.8],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.value}
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-white/60 text-sm">{stat.label}</span>
                  <span className="text-[#FF6B6B] text-xs">{stat.subtext}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    
      {/* Final CTA */}
      <motion.button
        onClick={() => scrollToSection('signup-form')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group px-8 py-4 rounded-xl overflow-hidden mt-12 mx-auto block"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F]"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        
        <span className="relative flex items-center gap-2 text-white font-semibold">
          <Target className="w-5 h-5" />
          Get Started Now
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </span>
      </motion.button>
    </motion.div>
  </div>
</section>
    
    

{/* Form Section */}
<section id="signup-form" className="py-24 px-4 bg-gradient-to-b from-[#1F1129] to-[#13091D] relative overflow-hidden">
  {/* Enhanced Background Elements */}
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
    
    {/* Floating Particles */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-[#FF6B6B]"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [-20, 20, -20],
          x: [-20, 20, -20],
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5 + i,
          repeat: Infinity,
          delay: i * 0.5,
        }}
      />
    ))}
    
    {/* Enhanced Gradient Orbs */}
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
      style={{
        background: 'radial-gradient(circle, #FF6B6B 0%, transparent 70%)',
        filter: 'blur(100px)'
      }}
    />
    
    <motion.div
      animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.1, 0.15, 0.1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
      style={{
        background: 'radial-gradient(circle, purple 0%, transparent 70%)',
        filter: 'blur(100px)'
      }}
    />
  </div>

  <div className="max-w-3xl mx-auto relative">
    {/* Enhanced Header */}
    <motion.div 
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF6B6B]/10
            border border-[#FF6B6B]/20"
          whileHover={{ scale: 1.05 }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(255, 107, 107, 0)',
              '0 0 0 10px rgba(255, 107, 107, 0)',
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <Target className="w-5 h-5 text-[#FF6B6B]" />
          </motion.div>
          <span className="text-[#FF6B6B] font-semibold">Limited Time Offer</span>
        </motion.span>
      </motion.div>

      <motion.h2 
        className="text-4xl md:text-5xl font-bold text-white my-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Join Our Network
      </motion.h2>

      <motion.p 
        className="text-xl text-white/60 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Complete this form to secure your founding member benefits
      </motion.p>
    </motion.div>

    {isSuccess ? (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden bg-gradient-to-r from-green-500/20 to-green-500/10 
          backdrop-blur-sm border border-green-500/20 rounded-2xl p-12 text-center"
      >
        {/* Success Animation */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="relative"
        >
          <motion.div
            className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(34, 197, 94, 0.4)',
                '0 0 0 20px rgba(34, 197, 94, 0)',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <CheckCircle className="w-10 h-10 text-green-500" />
            </motion.div>
          </motion.div>

          <motion.h3 
            className="text-2xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Application Submitted!
          </motion.h3>
          
          <motion.p 
            className="text-white/60 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Thank you for your interest. We'll be in touch soon.
          </motion.p>

          {/* Success Confetti Effect */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-green-500"
              initial={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 0
              }}
              animate={{
                opacity: 0,
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200,
                scale: 1
              }}
              transition={{
                duration: 1,
                delay: 0.2 + (i * 0.05),
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    ) : (
      <motion.form 
        onSubmit={handleSubmit} 
        className="relative space-y-8 backdrop-blur-sm bg-[#1F1129]/50 p-8 rounded-2xl border border-white/10
          shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{
            x: ['-200%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />

        {/* Progress Indicator */}
        <div className="relative">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
            {['Basic Info', 'Services', 'Details'].map((step, index) => (
              <motion.div 
                key={step} 
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative">
                  <motion.div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 ${
                      index <= currentStep ? 'bg-[#FF6B6B]' : 'bg-white/10'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {index <= currentStep && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-[#FF6B6B]/50"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    <span className={`relative z-10 ${
                      index <= currentStep ? 'text-white' : 'text-white/40'
                    }`}>{index + 1}</span>
                  </motion.div>
                </div>
                
                <motion.span 
                  className={`ml-2 ${
                    index <= currentStep ? 'text-white' : 'text-white/40'
                  }`}
                  whileHover={{ x: 2 }}
                >
                  {step}
                </motion.span>
                
                {index < 2 && (
                  <motion.div 
                    className="w-12 h-px mx-4"
                    style={{
                      background: index < currentStep 
                        ? 'linear-gradient(to right, #FF6B6B, #FF8F8F)' 
                        : 'rgba(255, 255, 255, 0.1)'
                    }}
                    animate={index < currentStep ? {
                      scaleX: [0, 1],
                      opacity: [0, 1]
                    } : {}}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
{/* Basic Information - Step 1 */}
{currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-white/80 font-medium">
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    Agency Name *
                  </motion.span>
                </label>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8F8F]/20 rounded-xl blur"
                    animate={{
                      opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <input
                    type="text"
                    required
                    value={formData.agencyName}
                    onChange={(e) => setFormData({...formData, agencyName: e.target.value})}
                    className={`w-full px-4 py-3 bg-[#13091D] border ${
                      errors.agencyName ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10'
                    } rounded-xl text-white focus:outline-none focus:border-[#FF6B6B] focus:ring-1 
                    focus:ring-[#FF6B6B] transition-all duration-200 relative z-10`}
                    placeholder="Enter your agency name"
                  />
                </motion.div>
                {errors.agencyName && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  >
                    <span>⚠</span> {errors.agencyName}
                  </motion.p>
                )}
              </motion.div>

              {/* Contact Person Field */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-white/80 font-medium">
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    Contact Person *
                  </motion.span>
                </label>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8F8F]/20 rounded-xl blur"
                    animate={{
                      opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    className={`w-full px-4 py-3 bg-[#13091D] border ${
                      errors.contactName ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10'
                    } rounded-xl text-white focus:outline-none focus:border-[#FF6B6B] focus:ring-1 
                    focus:ring-[#FF6B6B] transition-all duration-200 relative z-10`}
                    placeholder="Enter contact person's name"
                  />
                </motion.div>
                {errors.contactName && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  >
                    <span>⚠</span> {errors.contactName}
                  </motion.p>
                )}
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Email Field */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-white/80 font-medium">
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    Email *
                  </motion.span>
                </label>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8F8F]/20 rounded-xl blur"
                    animate={{
                      opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-4 py-3 bg-[#13091D] border ${
                      errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10'
                    } rounded-xl text-white focus:outline-none focus:border-[#FF6B6B] focus:ring-1 
                    focus:ring-[#FF6B6B] transition-all duration-200 relative z-10`}
                    placeholder="Enter your email"
                  />
                </motion.div>
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  >
                    <span>⚠</span> {errors.email}
                  </motion.p>
                )}
              </motion.div>

              {/* Website Field */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-white/80 font-medium">
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    Website *
                  </motion.span>
                </label>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8F8F]/20 rounded-xl blur"
                    animate={{
                      opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <input
                    type="url"
                    required
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    className={`w-full px-4 py-3 bg-[#13091D] border ${
                      errors.website ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10'
                    } rounded-xl text-white focus:outline-none focus:border-[#FF6B6B] focus:ring-1 
                    focus:ring-[#FF6B6B] transition-all duration-200 relative z-10`}
                    placeholder="https://example.com"
                  />
                </motion.div>
                {errors.website && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  >
                    <span>⚠</span> {errors.website}
                  </motion.p>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
{/* Services Section - Step 2 */}
{currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.h3 
                className="text-xl font-semibold text-white flex items-center gap-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <motion.span
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Target className="w-5 h-5 text-[#FF6B6B]" />
                </motion.span>
                Services Offered *
              </motion.h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {serviceOptions.map((service, idx) => (
                  <motion.label 
                    key={service} 
                    className={`relative flex items-center p-4 rounded-xl cursor-pointer
                      ${formData.services.includes(service) 
                        ? 'bg-[#FF6B6B]/20 border-[#FF6B6B]' 
                        : 'bg-[#13091D]/50 border-white/10'
                      } border hover:border-[#FF6B6B]/50 transition-all duration-200`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={(e) => {
                        const updatedServices = e.target.checked
                          ? [...formData.services, service]
                          : formData.services.filter(s => s !== service);
                        setFormData({...formData, services: updatedServices});
                      }}
                      className="sr-only"
                    />
                    {/* Animated Checkbox */}
                    <motion.div
                      className={`w-5 h-5 rounded border mr-3 flex items-center justify-center
                        overflow-hidden relative
                        ${formData.services.includes(service)
                          ? 'bg-[#FF6B6B] border-[#FF6B6B]'
                          : 'border-white/30'
                        }`}
                      layout
                    >
                      {formData.services.includes(service) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <CheckCircle className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                      {/* Hover Effect */}
                      <motion.div
                        className="absolute inset-0 bg-[#FF6B6B]/20"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                    <span className="text-white/80">{service}</span>
                    
                    {/* Background Pulse Effect when Selected */}
                    {formData.services.includes(service) && (
                      <motion.div
                        className="absolute inset-0 bg-[#FF6B6B]/20 rounded-xl"
                        animate={{ 
                          scale: [1, 1.05, 1],
                          opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity
                        }}
                      />
                    )}
                  </motion.label>
                ))}
              </div>
              {errors.services && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1 flex items-center gap-1"
                >
                  <span>⚠</span> {errors.services}
                </motion.p>
              )}
            </div>

            {/* Budget Range */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-white/80 font-medium">Budget Range *</label>
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8F8F]/20 rounded-xl blur"
                  animate={{
                    opacity: [0.5, 0.3, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({...formData, budgetRange: e.target.value})}
                  className={`w-full px-4 py-3 bg-[#13091D] border ${
                    errors.budgetRange ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10'
                  } rounded-xl text-white focus:outline-none focus:border-[#FF6B6B] focus:ring-1 
                  focus:ring-[#FF6B6B] transition-all duration-200 relative z-10`}
                  required
                >
                  <option value="">Select a range</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
              {errors.budgetRange && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1 flex items-center gap-1"
                >
                  <span>⚠</span> {errors.budgetRange}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Details Section - Step 3 */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            {/* Industries Section */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <label className="block text-white/80 font-medium">Industries Served</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {industryOptions.map((industry, idx) => (
                  <motion.label 
                    key={industry} 
                    className={`relative flex items-center p-4 rounded-xl cursor-pointer
                      ${formData.industries.includes(industry) 
                        ? 'bg-[#FF6B6B]/20 border-[#FF6B6B]' 
                        : 'bg-[#13091D]/50 border-white/10'
                      } border hover:border-[#FF6B6B]/50 transition-all duration-200`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.industries.includes(industry)}
                      onChange={(e) => {
                        const updatedIndustries = e.target.checked
                          ? [...formData.industries, industry]
                          : formData.industries.filter(i => i !== industry);
                        setFormData({...formData, industries: updatedIndustries});
                      }}
                      className="sr-only"
                    />
                    <motion.div
                      className={`w-5 h-5 rounded border mr-3 flex items-center justify-center
                        ${formData.industries.includes(industry)
                          ? 'bg-[#FF6B6B] border-[#FF6B6B]'
                          : 'border-white/30'
                        }`}
                      layout
                    >
                      {formData.industries.includes(industry) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <CheckCircle className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                    <span className="text-white/80">{industry}</span>
                  </motion.label>
                ))}
              </div>
            </motion.div>

            {/* Years in Business */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-white/80 font-medium">Years in Business</label>
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8F8F]/20 rounded-xl blur"
                  animate={{
                    opacity: [0.5, 0.3, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <select
                  value={formData.yearsInBusiness}
                  onChange={(e) => setFormData({...formData, yearsInBusiness: e.target.value})}
                  className="w-full px-4 py-3 bg-[#13091D] border border-white/10 rounded-xl
                    text-white focus:outline-none focus:border-[#FF6B6B] focus:ring-1 
                    focus:ring-[#FF6B6B] transition-all duration-200 relative z-10"
                >
                  <option value="">Select years of experience</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>
            </motion.div>

            {/* Agency Description */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-white/80 font-medium">Brief Description of Your Agency</label>
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8F8F]/20 rounded-xl blur"
                  animate={{
                    opacity: [0.5, 0.3, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 bg-[#13091D] border border-white/10 rounded-xl
                    text-white focus:outline-none focus:border-[#FF6B6B] focus:ring-1 
                    focus:ring-[#FF6B6B] transition-all duration-200 h-32 relative z-10"
                  placeholder="Tell us about your agency's strengths and what makes you unique..."
                />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <motion.div 
          className="pt-8 flex flex-col md:flex-row gap-4 items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Back Button */}
          {currentStep > 0 && (
            <motion.button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-6 py-3 bg-white/5 text-white rounded-xl hover:bg-white/10 
                transition-all duration-200 flex items-center gap-2 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              <ArrowLeft className="w-5 h-5" />
              <span className="relative z-10">Back</span>
            </motion.button>
          )}

          {/* Next/Submit Button */}
          <motion.button
            type="button"
            onClick={() => {
              if (currentStep === 2) {
                handleSubmit();
              } else {
                const isValid = validateStep(currentStep);
                if (isValid) {
                  setCurrentStep(currentStep + 1);
                }
              }
            }}
            disabled={isSubmitting}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F] 
              text-white rounded-xl font-semibold relative overflow-hidden
              disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Processing...</span>
              </>
            ) : currentStep === 2 ? (
              <>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Rocket className="w-5 h-5" />
                </motion.div>
                <span>Join as Founding Member</span>
              </>
            ) : (
              <>
                <span>Next Section</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </>
            )}
          </span>
        </motion.button>
      </motion.div>

      {/* Enhanced Step Indicator Dots */}
      <div className="flex justify-center gap-3 mt-6">
        {[0, 1, 2].map((step) => (
          <motion.div
            key={step}
            className="relative"
            whileHover={{ scale: 1.2 }}
          >
            <motion.div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                step === currentStep ? 'bg-[#FF6B6B] w-6' : 'bg-white/20'
              }`}
            />
            {step === currentStep && (
              <motion.div
                className="absolute inset-0 bg-[#FF6B6B] rounded-full"
                initial={{ scale: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Enhanced Error Message */}
      {errors.submit && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mt-4"
        >
          <motion.p 
            className="text-red-500 text-sm text-center flex items-center justify-center gap-2"
            animate={{ 
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>⚠</span>
            {errors.submit}
          </motion.p>
        </motion.div>
      )}

      {/* Enhanced Terms and Privacy Notice */}
      <motion.p 
        className="text-white/40 text-center mt-6 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.span
          className="inline-flex items-center gap-2"
          whileHover={{ x: 2 }}
        >
          <Shield className="w-4 h-4 text-[#FF6B6B]" />
          By submitting, you agree to our{' '}
          <motion.a 
            href="#"
            className="text-[#FF6B6B] hover:text-[#FF8F8F] transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Terms of Service
          </motion.a>
          {' '}and{' '}
          <motion.a 
            href="#"
            className="text-[#FF6B6B] hover:text-[#FF8F8F] transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Privacy Policy
          </motion.a>
        </motion.span>
      </motion.p>

      {/* Form Submit Progress */}
      {isSubmitting && (
        <motion.div
          className="absolute inset-x-0 bottom-0 h-1 bg-[#FF6B6B]/20"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2 }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 bg-[#FF6B6B]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2 }}
          />
        </motion.div>
      )}
    </motion.form>
  )}
</div>
</section>

{/* Footer */}
<footer className="bg-[#1F1129] border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
  {/* Animated Background Elements */}
  <motion.div
    className="absolute inset-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.1 }}
    transition={{ duration: 2 }}
  >
    <div className="absolute inset-0" style={{
      backgroundImage: 'radial-gradient(circle at 50% 50%, #FF6B6B 1px, transparent 1px)',
      backgroundSize: '50px 50px'
    }} />
  </motion.div>

  {/* Gradient Orbs */}
  <motion.div
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.1, 0.15, 0.1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse"
    }}
    className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
    style={{
      background: 'radial-gradient(circle, rgba(255, 107, 107, 0.15) 0%, transparent 70%)',
      filter: 'blur(60px)',
    }}
  />

  <div className="max-w-6xl mx-auto px-4 relative">
    {/* Main Footer Content */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
      {/* Brand Column */}
      <div className="lg:col-span-2">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="text-white text-2xl font-bold relative inline-block"
            whileHover={{ scale: 1.02 }}
          >
            Amplifirm
            <span className="text-[#FF6B6B]">Hub</span>
            <motion.div
              className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF6B6B] to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            />
          </motion.span>
        </motion.div>

        <motion.p 
          className="text-white/60 mb-6 max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Connecting top companies with pre-qualified clients. 
          Grow your business with qualified leads and smart matching.
        </motion.p>

        <motion.div 
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            { icon: Twitter, color: '#1DA1F2' },
            { icon: Linkedin, color: '#0A66C2' },
            { icon: Mail, color: '#FF6B6B' }
          ].map((social, index) => (
            <motion.a 
              key={index}
              href="#" 
              className="relative group"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{ backgroundColor: social.color }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center
                group-hover:bg-white/10 transition-colors relative z-10">
                <social.icon className="w-5 h-5 text-white/60 group-hover:text-[#FF6B6B] 
                  transition-colors" />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Quick Links with Enhanced Animations */}
      {[
        {
          title: "Platform",
          links: [
            { label: "For Companies", link: "/coming-soon" },
            { label: "For Businesses", link: "/coming-soon" },
            { label: "Pricing", link: "/coming-soon" },
            { label: "Features", link: "/coming-soon" },
            { label: "Success Stories", link: "/coming-soon" }
          ]
        },
        {
          title: "Resources",
          links: [
            { label: "Blog", link: "/coming-soon" },
            { label: "Help Center", link: "/coming-soon" },
            { label: "Company Guide", link: "/coming-soon" },
            { label: "API Docs", link: "/coming-soon" },
            { label: "Partner Program", link: "/coming-soon" }
          ]
        }
      ].map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 * sectionIndex }}
        >
          <motion.h3 
            className="text-white font-semibold mb-4 relative inline-block"
            whileHover={{ x: 5 }}
          >
            {section.title}
            <motion.div
              className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF6B6B]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + (0.2 * sectionIndex) }}
            />
          </motion.h3>
          <ul className="space-y-3">
            {section.links.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (0.1 * index) }}
              >
                <motion.a 
                  href={item.link}
                  className="text-white/60 hover:text-[#FF6B6B] transition-colors inline-block
                    relative group"
                  whileHover={{ x: 5 }}
                >
                  <span className="relative z-10">{item.label}</span>
                  <motion.div
                    className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#FF6B6B]/50"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <motion.h3 
          className="text-white font-semibold mb-4 relative inline-block"
          whileHover={{ x: 5 }}
        >
          Contact
          <motion.div
            className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF6B6B]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
          />
        </motion.h3>
        <ul className="space-y-3">
          {[
            { 
              icon: MapPin,
              label: "London, UK",
              link: "#",
              delay: 0.5
            },
            {
              icon: Mail,
              label: "hello@amplifirmhub.com",
              link: "mailto:hello@amplifirmhub.com",
              delay: 0.6
            },
            {
              icon: Phone,
              label: "+44 07525-429032",
              link: "tel:+447525429032",
              delay: 0.7
            }
          ].map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay }}
            >
              <motion.a 
                href={item.link}
                className="flex items-center gap-2 text-white/60 hover:text-[#FF6B6B] 
                  transition-colors group relative"
                whileHover={{ x: 5 }}
              >
                <motion.div
                  whileHover={{ rotate: 20 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <item.icon className="w-4 h-4 text-[#FF6B6B]" />
                </motion.div>
                <span>{item.label}</span>
                <motion.div
                  className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#FF6B6B]/50"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>

    {/* Newsletter */}
<div className="border-t border-white/10 pt-8 pb-12">
  <div className="max-w-xl mx-auto text-center">
    <motion.h3 
      className="text-white font-semibold mb-2"
      initial={{ y: -20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
    >
      Stay Updated
    </motion.h3>
    <motion.p 
      className="text-white/60 mb-6"
      initial={{ y: -20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
    >
      Get the latest updates on platform features and company growth tips.
    </motion.p>
    <motion.form 
      className="flex gap-2 relative group"
      initial={{ y: -20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      onSubmit={(e) => e.preventDefault()}
    >
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F] 
          rounded-lg opacity-0 group-hover:opacity-20 blur transition-opacity"
      />
      <input 
        type="email" 
        placeholder="Enter your email"
        className="flex-1 px-4 py-2 bg-white/5 rounded-lg border border-white/10 
          text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B6B]
          transition-colors relative z-10"
      />
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="px-6 py-2 bg-[#FF6B6B] text-white rounded-lg hover:bg-[#FF8F8F] 
          transition-colors flex items-center gap-2 relative z-10"
      >
        Subscribe
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Send className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </motion.form>
  </div>
</div>

{/* Bottom Bar */}
<motion.div 
  className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between 
    items-center gap-4"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ delay: 0.3 }}
>
  <div className="text-white/40 text-sm">
    © {new Date().getFullYear()} AmplifirmHub. All rights reserved.
  </div>
  <div className="flex gap-6 text-sm">
    {[
      { label: "Terms", link: "/coming-soon" },
      { label: "Privacy", link: "/coming-soon" },
      { label: "Cookies", link: "/coming-soon" },
    ].map((item, index) => (
      <motion.a
        key={index}
        href={item.link}
        className="text-white/40 hover:text-[#FF6B6B] transition-all relative group"
        whileHover={{ y: -2 }}
      >
        <span className="relative z-10">{item.label}</span>
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] bg-[#FF6B6B] w-0 group-hover:w-full 
            transition-all duration-300"
        />
      </motion.a>
    ))}
  </div>
</motion.div>
  </div>
</footer>

</div>
);
        }
export default AgencyLanding;
