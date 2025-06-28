import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Search, Bell, User, Settings, Gift } from 'lucide-react';
import AuthModal from './AuthModal';

interface NavbarProps {
  onLogoClick: () => void;
}

const Logo: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
  >
    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
    </div>
    <span className="text-white font-bold text-xl">STRIPCHAT</span>
  </button>
);

const Navbar: React.FC<NavbarProps> = ({ onLogoClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-red-600 shadow-lg"
      >
        <div className="max-w-full mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left Side */}
            <div className="flex items-center space-x-6">
              <button className="text-white hover:text-red-200 transition-colors">
                <Menu size={24} />
              </button>
              <Logo onClick={onLogoClick} />
              
              {/* Live Status */}
              <div className="hidden md:flex items-center space-x-2 bg-red-500 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">8441 直播中</span>
              </div>

              {/* Navigation Links */}
              <div className="hidden lg:flex items-center space-x-6">
                <a href="#" className="text-white hover:text-red-200 transition-colors text-sm">女主播</a>
                <a href="#" className="text-white hover:text-red-200 transition-colors text-sm">情侣</a>
                <a href="#" className="text-white hover:text-red-200 transition-colors text-sm">男主播</a>
                <a href="#" className="text-white hover:text-red-200 transition-colors text-sm">跨性别</a>
              </div>
            </div>

            {/* Center - Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="主播、类别、国家、小费选项"
                  className="w-full bg-white/10 backdrop-blur-sm text-white placeholder-white/70 pl-10 pr-4 py-2 rounded-full border border-white/20 focus:border-white/40 focus:outline-none"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-red-200 transition-colors">
                <Settings size={20} />
              </button>
              <button className="text-white hover:text-red-200 transition-colors">
                <Bell size={20} />
              </button>
              <button className="text-white hover:text-red-200 transition-colors">
                <Gift size={20} />
              </button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openAuthModal('register')}
                className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-full font-bold hover:bg-yellow-300 transition-colors text-sm"
              >
                添加代币
              </motion.button>

              <button 
                onClick={() => openAuthModal('login')}
                className="text-white hover:text-red-200 transition-colors"
              >
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Navbar;