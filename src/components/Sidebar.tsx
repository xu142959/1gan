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
  onFavoritesClick: () => void;
  onRecommendedClick: () => void;
  onMyModelsClick: () => void;
  onMyCollectionClick: () => void;
  onPrivacySettingsClick: () => void;
  onNewStreamersClick: () => void;
  onHotStreamersClick: () => void;
  onVIPStreamersClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onCategoriesClick,
  onFavoritesClick,
  onRecommendedClick,
  onMyModelsClick,
  onMyCollectionClick,
  onPrivacySettingsClick,
  onNewStreamersClick,
  onHotStreamersClick,
  onVIPStreamersClick
}) => {
  const [activeItem, setActiveItem] = useState('主页');

  const mainNavItems = [
    { icon: Home, label: '主页', active: true, onClick: () => {} },
    { icon: Heart, label: '我的最爱', count: 0, onClick: onFavoritesClick },
    { icon: Star, label: '推荐', onClick: onRecommendedClick },
    { icon: Users, label: '我的模特', onClick: onMyModelsClick },
    { icon: Crown, label: '我的收藏', onClick: onMyCollectionClick },
    { icon: Settings, label: '隐私配置', onClick: onPrivacySettingsClick }
  ];

  // 基础分类（始终显示）
  const basicCategories = [
    { type: 'special', icon: Star, label: '新主播', count: 646, color: 'bg-blue-500', onClick: onNewStreamersClick },
    { type: 'special', icon: Heart, label: '热门', count: 1234, color: 'bg-red-500', onClick: onHotStreamersClick },
    { type: 'special', icon: Crown, label: 'VIP', count: 567, color: 'bg-yellow-500', onClick: onVIPStreamersClick }
  ];

  const handleItemClick = (item: any) => {
    setActiveItem(item.label);
    if (item.onClick) {
      item.onClick();
    }
  };

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
            <motion.button
              key={index}
              onClick={() => handleItemClick(item)}
              whileHover={{ x: 5 }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left ${
                activeItem === item.label
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
            </motion.button>
          ))}
        </nav>

        {/* 基础分类 */}
        <div className="mb-6">
          <h3 className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-wider">
            分类
          </h3>
          <div className="space-y-1">
            {basicCategories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setActiveItem(category.label);
                  category.onClick();
                }}
                whileHover={{ x: 5 }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left ${
                  activeItem === category.label
                    ? 'bg-red-500 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${category.color}`} />
                <span className="flex-1 text-sm">{category.label}</span>
                <span className="text-xs text-slate-400">{category.count}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 全部分类按钮 */}
        <div className="border-t border-slate-700 pt-4">
          <motion.button
            onClick={() => {
              setActiveItem('全部分类');
              onCategoriesClick();
            }}
            whileHover={{ x: 5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center justify-between py-3 px-4 rounded-lg text-sm transition-all duration-300 shadow-lg ${
              activeItem === '全部分类'
                ? 'bg-red-500 text-white'
                : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white'
            }`}
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