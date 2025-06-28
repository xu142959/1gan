import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Heart, 
  Star, 
  Users, 
  Settings, 
  Crown,
  Gamepad2,
  Music,
  ChefHat,
  Camera,
  Dumbbell,
  GraduationCap
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

  const categories = [
    { icon: Users, label: '中文', count: 162, color: 'bg-red-500' },
    { icon: Crown, label: '白俄罗斯女主播', count: 1519, color: 'bg-white' },
    { icon: Star, label: '新主播', count: 646, color: 'bg-blue-500' },
    { icon: Camera, label: 'VR 直播头', count: 160, color: 'bg-purple-500' },
    { icon: Heart, label: '虚恋', count: 66, color: 'bg-black' },
    { icon: Gamepad2, label: '南美女演', count: 121, color: 'bg-green-500' }
  ];

  const ageGroups = [
    { label: '少女 18+', count: 1419 },
    { label: '辣妈青年 22+', count: 3291 },
    { label: '熟女', count: 826 },
    { label: '成熟', count: 379 },
    { label: '老奶奶', count: 35 }
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

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-wider">
            特别
          </h3>
          <div className="space-y-2">
            {categories.map((category, index) => (
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

        {/* Age Groups */}
        <div className="mb-8">
          <h3 className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-wider">
            年龄
          </h3>
          <div className="space-y-2">
            {ageGroups.map((group, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ x: 5 }}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <span className="text-sm">{group.label}</span>
                <span className="text-xs text-slate-400">{group.count}</span>
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