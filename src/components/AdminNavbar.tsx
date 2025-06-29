import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  User, 
  LogOut, 
  Settings, 
  Bell, 
  Home,
  ChevronDown,
  Activity,
  Database,
  Users,
  BarChart3,
  AlertTriangle
} from 'lucide-react';

interface AdminNavbarProps {
  adminUser: any;
  onLogout: () => void;
  onBackToHome: () => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ adminUser, onLogout, onBackToHome }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-800 border-b border-slate-700 shadow-lg"
    >
      <div className="max-w-full mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Side - Admin Logo */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Shield className="text-white" size={20} />
              </div>
              <div>
                <span className="text-white font-bold text-xl">StreamFlow</span>
                <div className="text-red-400 text-xs font-medium">管理员后台</div>
              </div>
            </div>
          </div>

          {/* Center - Quick Stats */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-2 text-slate-300">
              <Activity className="text-green-400" size={16} />
              <span className="text-sm">系统正常</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Users className="text-blue-400" size={16} />
              <span className="text-sm">1,234 在线用户</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <BarChart3 className="text-yellow-400" size={16} />
              <span className="text-sm">$12,345 今日收益</span>
            </div>
          </div>

          {/* Right Side - Admin Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>

            {/* Back to Home */}
            <button 
              onClick={onBackToHome}
              className="text-slate-400 hover:text-white transition-colors flex items-center space-x-2"
            >
              <Home size={20} />
              <span className="hidden md:block">返回首页</span>
            </button>

            {/* Admin User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-3 text-white hover:text-slate-300 transition-colors"
              >
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">管理员</div>
                  <div className="text-xs text-slate-400">admin@streamflow.com</div>
                </div>
                <ChevronDown size={16} className="text-slate-400" />
              </button>

              <AnimatePresence>
                {showUserDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden"
                  >
                    {/* User Info */}
                    <div className="p-4 border-b border-slate-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">A</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">超级管理员</div>
                          <div className="text-slate-400 text-sm">admin@streamflow.com</div>
                          <div className="text-red-400 text-xs">最高权限</div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="p-2">
                      <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors rounded-lg">
                        <User size={16} />
                        <span className="text-sm">个人设置</span>
                      </button>
                      
                      <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors rounded-lg">
                        <Settings size={16} />
                        <span className="text-sm">系统设置</span>
                      </button>
                      
                      <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors rounded-lg">
                        <Database size={16} />
                        <span className="text-sm">数据库管理</span>
                      </button>
                      
                      <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors rounded-lg">
                        <AlertTriangle size={16} />
                        <span className="text-sm">系统日志</span>
                      </button>
                    </div>

                    {/* Logout */}
                    <div className="p-2 border-t border-slate-700">
                      <button 
                        onClick={onLogout}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors rounded-lg"
                      >
                        <LogOut size={16} />
                        <span className="text-sm">退出登录</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default AdminNavbar;