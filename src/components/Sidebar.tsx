import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Heart, 
  Star, 
  Users, 
  Settings, 
  Crown,
  Globe
} from 'lucide-react';

const Sidebar = () => {
  const mainNavItems = [
    { icon: Home, label: '主页', active: true },
    { icon: Heart, label: '我的最爱', count: 0 },
    { icon: Star, label: '推荐' },
    { icon: Users, label: '我的模特' },
    { icon: Crown, label: '我的收藏' },
    { icon: Settings, label: '隐私配置' }
  ];

  const countries = [
    { flag: '🇨🇳', label: '中国', count: 1625 },
    { flag: '🇺🇸', label: '美国', count: 2847 },
    { flag: '🇷🇺', label: '俄罗斯', count: 1519 },
    { flag: '🇯🇵', label: '日本', count: 892 },
    { flag: '🇰🇷', label: '韩国', count: 756 },
    { flag: '🇬🇧', label: '英国', count: 634 },
    { flag: '🇩🇪', label: '德国', count: 523 },
    { flag: '🇫🇷', label: '法国', count: 467 },
    { flag: '🇮🇹', label: '意大利', count: 389 },
    { flag: '🇪🇸', label: '西班牙', count: 356 },
    { flag: '🇧🇷', label: '巴西', count: 445 },
    { flag: '🇦🇷', label: '阿根廷', count: 234 },
    { flag: '🇲🇽', label: '墨西哥', count: 312 },
    { flag: '🇨🇦', label: '加拿大', count: 289 },
    { flag: '🇦🇺', label: '澳大利亚', count: 198 },
    { flag: '🇮🇳', label: '印度', count: 567 },
    { flag: '🇹🇭', label: '泰国', count: 423 },
    { flag: '🇻🇳', label: '越南', count: 345 },
    { flag: '🇵🇭', label: '菲律宾', count: 278 },
    { flag: '🇮🇩', label: '印度尼西亚', count: 234 }
  ];

  const specialCategories = [
    { icon: Star, label: '新主播', count: 646, color: 'bg-blue-500' },
    { icon: Crown, label: 'VIP 直播间', count: 160, color: 'bg-purple-500' },
    { icon: Heart, label: '虚恋', count: 66, color: 'bg-pink-500' },
    { icon: Globe, label: '多语言', count: 121, color: 'bg-green-500' }
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

        {/* Special Categories */}
        <div className="mb-8">
          <h3 className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-wider">
            特别
          </h3>
          <div className="space-y-2">
            {specialCategories.map((category, index) => (
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

        {/* Countries */}
        <div className="mb-8">
          <h3 className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-wider">
            国家/地区
          </h3>
          <div className="space-y-1 max-h-80 overflow-y-auto">
            {countries.map((country, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <span className="text-lg">{country.flag}</span>
                <span className="flex-1 text-sm">{country.label}</span>
                <span className="text-xs text-slate-400">{country.count}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700 pt-4">
          <button className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg text-sm transition-colors">
            全部分类
          </button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;