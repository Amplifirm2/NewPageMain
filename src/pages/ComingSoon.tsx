import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, ArrowLeft, ChevronRight, 
  Star, Send, CheckCircle, Sparkles } from 'lucide-react';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      // Here you would typically send the email to your backend
    }
  };


  const goBack = () => {
    window.location.href = '/';
  };

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animated letter variants
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="min-h-screen bg-[#13091D] relative overflow-hidden">
      {/* Enhanced Background Animations */}
      <div className="absolute inset-0">
        {/* Dynamic Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(to right, #FF6B6B 1px, transparent 1px), linear-gradient(to bottom, #FF6B6B 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Animated Gradient Orbs */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[100px]"
            style={{
              background: i === 0 ? '#FF6B6B' : i === 1 ? '#8B5CF6' : '#3B82F6',
              width: '600px',
              height: '600px',
              top: `${i * 30}%`,
              left: `${i * 30}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 2,
            }}
          />
        ))}

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#FF6B6B]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 flex items-center justify-center min-h-screen py-20 px-4"
        style={{
          transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, 
                              ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          {/* Enhanced Rocket Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1.5 }}
            className="mb-12 relative mx-auto w-40 h-40"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F] rounded-3xl blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative h-full bg-[#1F1129] rounded-3xl border border-[#FF6B6B]/20
              flex items-center justify-center overflow-hidden group"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="group-hover:scale-110 transition-transform duration-300"
              >
                <Rocket className="w-20 h-20 text-[#FF6B6B]" />
              </motion.div>

              {/* Animated Sparkles */}
              {[...Array(5)].map((_, i) => (
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
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                >
                  <Sparkles className="w-4 h-4 text-[#FF6B6B]" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Title */}
          <motion.div
            className="mb-8 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="text-7xl md:text-9xl font-bold"
              style={{ perspective: 1000 }}
            >
              {/* Animated Coming */}
              <motion.span
                className="block text-white mb-2"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {"Coming".split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                    whileHover={{ scale: 1.2, color: "#FF6B6B" }}
                    style={{ display: 'inline-block' }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.span>

              {/* Animated Soon with Gradient */}
              <motion.span
                className="block bg-gradient-to-r from-[#FF6B6B] via-[#FF8F8F] to-[#FF6B6B] 
                  text-transparent bg-clip-text bg-[length:200%_auto]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  backgroundPosition: ['0% center', '200% center']
                }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.4,
                  backgroundPosition: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              >
                {"Soon".split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                    whileHover={{ scale: 1.2 }}
                    style={{ display: 'inline-block' }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.span>
            </motion.h1>

            {/* Animated Underline */}
            <motion.div
              className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1 }}
            />
          </motion.div>

          {/* Features Preview */}
         <motion.div
           className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
         >
           {[
             { icon: Target, text: "Smart Matching" },
             { icon: Star, text: "Premium Leads" },
             { icon: CheckCircle, text: "Verified Partners" },
           ].map((feature, index) => (
             <motion.div
               key={index}
               className="p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm"
               whileHover={{ y: -5, scale: 1.02 }}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 + index * 0.1 }}
             >
               <motion.div
                 animate={{
                   scale: [1, 1.1, 1],
                 }}
                 transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                 className="text-[#FF6B6B] mb-2"
               >
                 <feature.icon className="w-6 h-6 mx-auto" />
               </motion.div>
               <p className="text-white/80">{feature.text}</p>
             </motion.div>
           ))}
         </motion.div>


         {/* Email Subscription */}
         {!isSubscribed ? (
           <motion.form
             onSubmit={handleSubmit}
             className="max-w-md mx-auto mb-12 relative group"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.7 }}
           >
             <motion.div
               className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F]
                 rounded-lg opacity-0 group-hover:opacity-20 blur transition-opacity"
             />
             <div className="relative flex gap-2">
               <input
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder="Enter your email for updates"
                 className="flex-1 px-4 py-3 bg-white/5 rounded-lg border border-white/10
                   text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B6B]
                   transition-colors"
               />
               <motion.button
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 className="px-6 py-3 bg-[#FF6B6B] text-white rounded-lg hover:bg-[#FF8F8F]
                   transition-colors flex items-center gap-2"
                 type="submit"
               >
                 Notify Me
                 <Send className="w-4 h-4" />
               </motion.button>
             </div>
           </motion.form>
         ) : (
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             className="max-w-md mx-auto mb-12 p-4 bg-[#FF6B6B]/20 rounded-lg border
               border-[#FF6B6B]/30 text-white/80"
           >
             <CheckCircle className="w-6 h-6 text-[#FF6B6B] mx-auto mb-2" />
             We'll notify you when we launch!
           </motion.div>
         )}


         {/* CTA Buttons */}
         <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <motion.button
             onClick={goBack}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="relative group px-8 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F]
               rounded-xl text-white font-semibold flex items-center justify-center gap-2
               overflow-hidden"
           >
             <Target className="w-5 h-5" />
             Get Your Growth Score
             <motion.div
               className="absolute right-4"
               animate={{ x: [0, 4, 0] }}
               transition={{ duration: 1.5, repeat: Infinity }}
             >
               <ChevronRight className="w-5 h-5" />
             </motion.div>
           </motion.button>


           <motion.button
             onClick={goBack}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="px-8 py-4 border border-white/10 rounded-xl text-white/60
               hover:text-white hover:bg-white/5 transition-colors flex items-center
               justify-center gap-2"
           >
             <ArrowLeft className="w-5 h-5" />
             Back to Home
           </motion.button>
         </div>

        </div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;

