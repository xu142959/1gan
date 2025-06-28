import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Bell, User, Gift, Settings, LogOut, Crown, Heart, Users, Bookmark, Shield, Volume2, RefreshCw, Video } from 'lucide-react';
import AuthModal from './AuthModal';

interface NavbarProps {
  onLogoClick: () => void;
  onUserProfileClick?: () => void;
  onMyFriendsClick?: () => void;
  onNotificationsClick?: () => void;
  onSettingsPrivacyClick?: () => void;
  onStreamerDashboardClick?: () => void;
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

const Navbar: React.FC<NavbarProps> = ({ 
  onLogoClick, 
  onUserProfileClick,
  onMyFriendsClick,
  onNotificationsClick,
  onSettingsPrivacyClick,
  onStreamerDashboardClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [hiddenMode, setHiddenMode] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setAuthModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowUserDropdown(false);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const handleMenuItemClick = (action?: () => void) => {
    setShowUserDropdown(false);
    if (action) {
      action();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

              {/* User Profile Dropdown */}
              {isLoggedIn ? (
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={toggleUserDropdown}
                    className="text-white hover:text-red-200 transition-colors"
                  >
                    <User size={20} />
                  </button>

                  <AnimatePresence>
                    {showUserDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-72 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50"
                      >
                        {/* User Profile Header */}
                        <div className="p-4 border-b border-slate-700">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-lg">G</span>
                            </div>
                            <div>
                              <div className="text-white font-medium">gtx1</div>
                            </div>
                          </div>
                          
                          {/* Level Info */}
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">7</span>
                              </div>
                              <span className="text-slate-300 text-sm">等级</span>
                            </div>
                            <span className="text-slate-400 text-sm">灰色级别</span>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                              <span>85 /100经验分</span>
                              <span>3分钟</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div className="bg-slate-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                          </div>
                        </div>

                        {/* VIP Section */}
                        <div className="p-4 border-b border-slate-700">
                          <div className="flex items-center space-x-2 text-orange-400">
                            <Crown size={16} />
                            <span className="text-sm font-medium">获得终极会员</span>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          <button 
                            onClick={() => handleMenuItemClick(onUserProfileClick)}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                          >
                            <User size={16} />
                            <span className="text-sm">我的简历</span>
                          </button>
                          
                          <button className="w-full flex items-center space-x-3 px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                            <Bookmark size={16} />
                            <span className="text-sm">我的收藏</span>
                          </button>
                          
                          <button 
                            onClick={() => handleMenuItemClick(onMyFriendsClick)}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                          >
                            <Users size={16} />
                            <span className="text-sm">我的好友</span>
                          </button>
                          
                          <button 
                            onClick={() => handleMenuItemClick(onNotificationsClick)}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                          >
                            <Bell size={16} />
                            <span className="text-sm">我的通知</span>
                          </button>
                          
                          <button className="w-full flex items-center space-x-3 px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                            <Heart size={16} />
                            <span className="text-sm">我的最爱</span>
                          </button>

                          {/* Streamer Dashboard */}
                          <button 
                            onClick={() => handleMenuItemClick(onStreamerDashboardClick)}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                          >
                            <Video size={16} />
                            <span className="text-sm">直播中心</span>
                          </button>
                        </div>

                        {/* Settings Section */}
                        <div className="py-2 border-t border-slate-700">
                          <button 
                            onClick={() => setHiddenMode(!hiddenMode)}
                            className="w-full flex items-center justify-between px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <Shield size={16} />
                              <span className="text-sm">隐形模式</span>
                            </div>
                            <div className={`w-8 h-4 rounded-full transition-colors ${hiddenMode ? 'bg-green-500' : 'bg-slate-600'}`}>
                              <div className={`w-3 h-3 bg-white rounded-full mt-0.5 transition-transform ${hiddenMode ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                            </div>
                          </button>
                          
                          <button 
                            onClick={() => handleMenuItemClick(onSettingsPrivacyClick)}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                          >
                            <Settings size={16} />
                            <span className="text-sm">设置和隐私</span>
                          </button>
                        </div>

                        {/* Bottom Section */}
                        <div className="py-2 border-t border-slate-700">
                          <button 
                            onClick={() => handleMenuItemClick(onNotificationsClick)}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                          >
                            <RefreshCw size={16} />
                            <span className="text-sm">重要更新</span>
                          </button>
                          
                          <button className="w-full flex items-center space-x-3 px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                            <Volume2 size={16} />
                            <span className="text-sm">给予反馈</span>
                          </button>
                          
                          <button 
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors"
                          >
                            <LogOut size={16} />
                            <span className="text-sm">退出</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openAuthModal('login')}
                  className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium hover:bg-white/20 transition-colors text-sm border border-white/20"
                >
                  登录
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Navbar;