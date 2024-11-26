import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  scrollToSection: (sectionId: string) => void;
}

const Navbar = ({ }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleScoreClick = () => {
    navigate('/business-analyzer');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-[#13091D]/90 backdrop-blur-sm z-40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigation('/')}
              className="cursor-pointer"
            >
              <img 
                src="/marketley (1).svg"
                alt="Marketley"
                className="h-13 w-auto object-contain hover:opacity-90 transition-opacity"
                style={{ maxWidth: '200px' }}
              />
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigation('/coming-soon')}
              className="cursor-pointer text-white/60 hover:text-white transition-colors"
            >
              For Businesses
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigation('/coming-soon')}
              className="cursor-pointer text-white/60 hover:text-white transition-colors"
            >
              For Agencies
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigation('/coming-soon')}
              className="cursor-pointer text-white/60 hover:text-white transition-colors"
            >
              Pricing
            </motion.div>

            {/* Growth Score Button */}
            <motion.button
              onClick={handleScoreClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8F8F] text-white 
                px-6 py-2 rounded-lg flex items-center gap-2 relative group"
            >
              <Target className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>Get Growth Score</span>
              <motion.div
                className="absolute -top-2 -right-2 bg-[#FF6B6B] text-white text-xs 
                  px-2 py-0.5 rounded-full shadow-lg"
              >
                Free
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white/60 hover:text-white p-2"
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute left-0 right-0 bg-[#13091D] border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              <div
                onClick={() => handleNavigation('/coming-soon')}
                className="block px-3 py-2 text-white/60 hover:text-white cursor-pointer"
              >
                For Businesses
              </div>
              
              <div
                onClick={() => handleNavigation('/coming-soon')}
                className="block px-3 py-2 text-white/60 hover:text-white cursor-pointer"
              >
                For Agencies
              </div>
              
              <div
                onClick={() => handleNavigation('/coming-soon')}
                className="block px-3 py-2 text-white/60 hover:text-white cursor-pointer"
              >
                Pricing
              </div>

              <div
                onClick={handleScoreClick}
                className="block px-3 py-2 text-[#FF6B6B] hover:text-[#FF8F8F] cursor-pointer
                  flex items-center gap-2"
              >
                <Target className="w-4 h-4" />
                Get Growth Score
                <span className="text-xs bg-[#FF6B6B] text-white px-2 py-0.5 rounded-full">
                  Free
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;