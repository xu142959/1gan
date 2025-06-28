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
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Sidebar = () => {
  const [showAllCategories, setShowAllCategories] = useState(false);

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

  // 国家/地区分类（隐藏在"全部分类"中）
  const countryCategories = [
    { type: 'country', flag: '🇨🇳', label: '中国', count: 1625 },
    { type: 'country', flag: '🇺🇸', label: '美国', count: 2847 },
    { type: 'country', flag: '🇷🇺', label: '俄罗斯', count: 1519 },
    { type: 'country', flag: '🇯🇵', label: '日本', count: 892 },
    { type: 'country', flag: '🇰🇷', label: '韩国', count: 756 },
    { type: 'country', flag: '🇬🇧', label: '英国', count: 634 },
    { type: 'country', flag: '🇩🇪', label: '德国', count: 523 },
    { type: 'country', flag: '🇫🇷', label: '法国', count: 467 },
    { type: 'country', flag: '🇮🇹', label: '意大利', count: 389 },
    { type: 'country', flag: '🇪🇸', label: '西班牙', count: 356 },
    { type: 'country', flag: '🇧🇷', label: '巴西', count: 445 },
    { type: 'country', flag: '🇦🇷', label: '阿根廷', count: 234 },
    { type: 'country', flag: '🇲🇽', label: '墨西哥', count: 312 },
    { type: 'country', flag: '🇨🇦', label: '加拿大', count: 289 },
    { type: 'country', flag: '🇦🇺', label: '澳大利亚', count: 198 },
    { type: 'country', flag: '🇮🇳', label: '印度', count: 567 },
    { type: 'country', flag: '🇹🇭', label: '泰国', count: 423 },
    { type: 'country', flag: '🇻🇳', label: '越南', count: 345 },
    { type: 'country', flag: '🇵🇭', label: '菲律宾', count: 278 },
    { type: 'country', flag: '🇮🇩', label: '印度尼西亚', count: 234 }
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
            onClick={() => setShowAllCategories(!showAllCategories)}
            whileHover={{ x: 5 }}
            className="w-full flex items-center justify-between bg-slate-700 hover:bg-slate-600 text-white py-3 px-4 rounded-lg text-sm transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Globe size={16} />
              <span>全部分类</span>
            </div>
            {showAllCategories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </motion.button>

          {/* 展开的国家分类列表 */}
          <AnimatePresence>
            {showAllCategories && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 space-y-1 max-h-64 overflow-y-auto bg-slate-750 rounded-lg p-2"
              >
                <div className="text-slate-400 text-xs font-medium mb-2 px-2 uppercase tracking-wider">
                  国家/地区
                </div>
                {countryCategories.map((category, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-600 hover:text-white transition-colors"
                  >
                    <span className="text-base">{category.flag}</span>
                    <span className="flex-1 text-sm">{category.label}</span>
                    <span className="text-xs text-slate-400">{category.count}</span>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;