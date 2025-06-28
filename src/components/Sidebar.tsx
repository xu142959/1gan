import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Heart, 
  Star, 
  Users, 
  Settings, 
  Crown,
  Globe,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  onCategoriesClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCategoriesClick }) => {
  const mainNavItems = [
    { icon: Home, label: '主页', active: true },
    { icon: Heart, label: '我的最爱', count: 0 },
    { icon: Star, label: '推荐' },
    { icon: Users, label: '我的模特' },
    { icon: Crown, label: '我的收藏' },
    { icon: Settings, label: '隐私配置' }
  ];

  // 基础分类（始终显示）
  const basicCategories = [
    { type: 'special', icon: Star, label: '新主播', count: 646, color: 'bg-blue-500' },
    { type: 'special', icon: Heart, label: '热门', count: 1234, color: 'bg-red-500' },
    { type: 'special', icon: Crown, label: 'VIP', count: 567, color: 'bg-yellow-500' }
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-16 bottom-0 w-64 bg-slate-800 border-r border-slate-700 overflow-y-auto z-40"
    >
      <div className="p-4">
        {/* Main Navigation */}
        <nav className="space-y-2 mb-8">
          {mainNavItems.map((item, index) => (
            <motion.a
              key={index}
              href="#"
              whileHover={{ x: 5 }}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                item.active 
                  ? 'bg-red-500 text-white' 
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="flex-1">{item.label}</span>
              {item.count !== undefined && (
                <span className="text-xs bg-slate-600 px-2 py-1 rounded-full">
                  {item.count}
                </span>
              )}
            </motion.a>
          ))}
        </nav>

        {/* 基础分类 */}
        <div className="mb-6">
          <h3 className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-wider">
            分类
          </h3>
          <div className="space-y-1">
            {basicCategories.map((category, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <div className={`w-3 h-3 rounded-full ${category.color}`} />
                <span className="flex-1 text-sm">{category.label}</span>
                <span className="text-xs text-slate-400">{category.count}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* 全部分类按钮 */}
        <div className="border-t border-slate-700 pt-4">
          <motion.button
            onClick={onCategoriesClick}
            whileHover={{ x: 5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-between bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-3 px-4 rounded-lg text-sm transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <Globe size={16} />
              <span className="font-medium">全部分类</span>
            </div>
            <ChevronRight size={16} />
          </motion.button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;