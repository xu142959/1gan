import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Search, Bell, User } from 'lucide-react';
import AuthModal from './AuthModal';

const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
    </div>
    <span className="text-white font-bold text-xl">StreamFlow</span>
  </div>
);

const Navbar = () => {
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
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo />
            
            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="搜索直播间、主播..."
                  className="w-full bg-slate-800 text-white pl-10 pr-4 py-2 rounded-full border border-slate-700 focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-slate-300 hover:text-white transition-colors">首页</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">分类</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">关注</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">发现</a>
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-slate-300 hover:text-white transition-colors">
                <Bell size={20} />
              </button>
              <button 
                onClick={() => openAuthModal('login')}
                className="text-slate-300 hover:text-white transition-colors"
              >
                登录
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openAuthModal('register')}
                className="bg-red-500 text-white px-4 py-2 rounded-full font-medium hover:bg-red-600 transition-colors"
              >
                开始直播
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-slate-800"
            >
              <div className="flex flex-col space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="搜索直播间、主播..."
                    className="w-full bg-slate-800 text-white pl-10 pr-4 py-2 rounded-full border border-slate-700 focus:border-red-500 focus:outline-none"
                  />
                </div>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">首页</a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">分类</a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">关注</a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">发现</a>
                <div className="flex space-x-3 pt-3 border-t border-slate-800">
                  <button 
                    onClick={() => openAuthModal('login')}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    登录
                  </button>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="bg-red-500 text-white px-4 py-2 rounded-full font-medium hover:bg-red-600 transition-colors"
                  >
                    开始直播
                  </button>
                </div>
              </div>
            </motion.div>
          )}
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