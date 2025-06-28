import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Globe,
  Users,
  Star,
  Crown,
  Heart,
  Gamepad2,
  Music,
  Camera,
  Palette,
  Dumbbell,
  GraduationCap
} from 'lucide-react';

interface CategoriesPageProps {
  onBackToHome: () => void;
}

const CategoriesPage: React.FC<CategoriesPageProps> = ({ onBackToHome }) => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'all', label: '全部', icon: Globe },
    { id: 'countries', label: '国家/地区', icon: Globe },
    { id: 'content', label: '内容类型', icon: Star },
    { id: 'special', label: '特殊分类', icon: Crown }
  ];

  const countryCategories = [
    { flag: '🇨🇳', label: '中国', count: 1625, description: '最受欢迎的中文直播' },
    { flag: '🇺🇸', label: '美国', count: 2847, description: '英语直播内容' },
    { flag: '🇷🇺', label: '俄罗斯', count: 1519, description: '俄语直播间' },
    { flag: '🇯🇵', label: '日本', count: 892, description: '日语直播内容' },
    { flag: '🇰🇷', label: '韩国', count: 756, description: '韩语直播间' },
    { flag: '🇬🇧', label: '英国', count: 634, description: '英式英语直播' },
    { flag: '🇩🇪', label: '德国', count: 523, description: '德语直播内容' },
    { flag: '🇫🇷', label: '法国', count: 467, description: '法语直播间' },
    { flag: '🇮🇹', label: '意大利', count: 389, description: '意大利语直播' },
    { flag: '🇪🇸', label: '西班牙', count: 356, description: '西班牙语直播' },
    { flag: '🇧🇷', label: '巴西', count: 445, description: '葡萄牙语直播' },
    { flag: '🇦🇷', label: '阿根廷', count: 234, description: '南美直播内容' },
    { flag: '🇲🇽', label: '墨西哥', count: 312, description: '墨西哥直播间' },
    { flag: '🇨🇦', label: '加拿大', count: 289, description: '加拿大直播内容' },
    { flag: '🇦🇺', label: '澳大利亚', count: 198, description: '澳洲直播间' },
    { flag: '🇮🇳', label: '印度', count: 567, description: '印度直播内容' },
    { flag: '🇹🇭', label: '泰国', count: 423, description: '泰语直播间' },
    { flag: '🇻🇳', label: '越南', count: 345, description: '越南语直播' },
    { flag: '🇵🇭', label: '菲律宾', count: 278, description: '菲律宾直播间' },
    { flag: '🇮🇩', label: '印度尼西亚', count: 234, description: '印尼直播内容' }
  ];

  const contentCategories = [
    { icon: Gamepad2, label: '游戏直播', count: 1234, description: '电竞游戏内容', color: 'from-purple-500 to-blue-500' },
    { icon: Music, label: '音乐表演', count: 856, description: '音乐才艺展示', color: 'from-pink-500 to-red-500' },
    { icon: Camera, label: '生活分享', count: 723, description: '日常生活直播', color: 'from-blue-500 to-cyan-500' },
    { icon: Palette, label: '艺术创作', count: 456, description: '绘画艺术直播', color: 'from-indigo-500 to-purple-500' },
    { icon: Dumbbell, label: '健身运动', count: 589, description: '健身教学直播', color: 'from-red-500 to-pink-500' },
    { icon: GraduationCap, label: '教育学习', count: 367, description: '知识分享直播', color: 'from-green-500 to-teal-500' }
  ];

  const specialCategories = [
    { icon: Star, label: '新主播', count: 646, description: '刚开始直播的新人', color: 'bg-blue-500' },
    { icon: Heart, label: '热门直播', count: 1234, description: '最受欢迎的直播间', color: 'bg-red-500' },
    { icon: Crown, label: 'VIP主播', count: 567, description: '认证VIP主播', color: 'bg-yellow-500' },
    { icon: Users, label: '多人直播', count: 234, description: '多人互动直播', color: 'bg-green-500' }
  ];

  const getAllCategories = () => {
    const all = [
      ...specialCategories.map(cat => ({ ...cat, type: 'special' })),
      ...contentCategories.map(cat => ({ ...cat, type: 'content' })),
      ...countryCategories.map(cat => ({ ...cat, type: 'country', icon: Globe }))
    ];
    
    if (searchTerm) {
      return all.filter(cat => 
        cat.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return all;
  };

  const getFilteredCategories = () => {
    switch (selectedTab) {
      case 'countries':
        return countryCategories
          .filter(cat => 
            !searchTerm || cat.label.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(cat => ({ ...cat, type: 'country', icon: Globe }));
      case 'content':
        return contentCategories
          .filter(cat => 
            !searchTerm || cat.label.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(cat => ({ ...cat, type: 'content' }));
      case 'special':
        return specialCategories
          .filter(cat => 
            !searchTerm || cat.label.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(cat => ({ ...cat, type: 'special' }));
      default:
        return getAllCategories();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBackToHome}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-3xl font-bold text-white">全部分类</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="搜索分类..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-700 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none w-64"
                />
              </div>
              <button className="text-slate-400 hover:text-white transition-colors">
                <Filter size={20} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-slate-700 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                  selectedTab === tab.id
                    ? 'bg-red-500 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-600'
                }`}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredCategories().map((category, index) => (
            <motion.div
              key={`${category.label}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-slate-800 rounded-xl overflow-hidden cursor-pointer group hover:bg-slate-700 transition-all duration-300"
            >
              <div className={`p-6 ${
                category.type === 'content' 
                  ? `bg-gradient-to-br ${category.color}` 
                  : category.type === 'special'
                  ? `${category.color}`
                  : 'bg-slate-700'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {category.type === 'country' ? (
                      <span className="text-3xl">{category.flag}</span>
                    ) : (
                      <category.icon className="text-white" size={32} />
                    )}
                    <div>
                      <h3 className="text-white font-bold text-lg">{category.label}</h3>
                      <p className="text-white/80 text-sm">{category.count} 个直播间</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-white/70 text-sm mb-4">
                  {category.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-white/80">
                    <Users size={16} />
                    <span className="text-sm">{category.count} 在线</span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="text-white/80 text-sm"
                  >
                    查看 →
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {getFilteredCategories().length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-slate-400 text-lg mb-2">没有找到匹配的分类</div>
            <div className="text-slate-500">尝试使用不同的搜索词</div>
          </motion.div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="bg-slate-800 border-t border-slate-700 p-6 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-white mb-1">8,441</div>
              <div className="text-slate-400 text-sm">正在直播</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">50+</div>
              <div className="text-slate-400 text-sm">国家地区</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">20+</div>
              <div className="text-slate-400 text-sm">内容分类</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-slate-400 text-sm">全天直播</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;