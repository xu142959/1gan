import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Eye,
  Users
} from 'lucide-react';

interface CategoriesPageProps {
  onBackToHome: () => void;
  onCategoryClick: (categoryName: string) => void;
}

const CategoriesPage: React.FC<CategoriesPageProps> = ({ onBackToHome, onCategoryClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // 外貌分类
  const appearanceCategories = [
    { label: '少女 18+', count: 1909 },
    { label: '针织青年 22+', count: 3272 },
    { label: '熟女', count: 823 },
    { label: '成熟', count: 390 },
    { label: '老奶奶', count: 29 },
    { label: '网络俏人', count: 65 },
    { label: '亚洲人', count: 737 },
    { label: '黑珍珠', count: 435 },
    { label: '印度人', count: 294 },
    { label: '拉丁人', count: 2063 },
    { label: '混血主播', count: 206 },
    { label: '白人', count: 2355 }
  ];

  // 体型分类
  const bodyTypeCategories = [
    { label: '瘦', count: 2908 },
    { label: '运动型', count: 569 },
    { label: '中等', count: 2926 },
    { label: '丰满', count: 1282 },
    { label: '大号美女', count: 299 }
  ];

  // 发型分类
  const hairCategories = [
    { label: '金发', count: 1115 },
    { label: '黑发', count: 4344 },
    { label: '棕发小姐', count: 3199 },
    { label: '红发', count: 419 },
    { label: '彩色', count: 338 }
  ];

  // 特征分类
  const featuresCategories = [
    { label: '大屁股', count: 3833 },
    { label: '大乳头', count: 1812 },
    { label: '大胸部', count: 1381 },
    { label: '多毛胸下', count: 432 },
    { label: '巨乳', count: 2764 },
    { label: '娇光', count: 3281 },
    { label: '娇毛', count: 1337 },
    { label: '无发', count: 14 },
    { label: '小胸部', count: 2007 },
    { label: '阴部多毛', count: 997 }
  ];

  // 可请求提供的表演分类
  const performanceCategories = [
    { label: '私密表演', count: null },
    { label: '8-12代币', count: 2819 },
    { label: '16-24代币', count: 1821 },
    { label: '32-60代币', count: 1354 },
    { label: '90+代币', count: 316 },
    { label: '视频通话（直播）', count: 5948 },
    { label: '可录制私人表演', count: 4333 },
    { label: '偷窥表演', count: 300 },
    { label: '可请求的表演', count: null },
    { label: '69受势', count: 502 },
    { label: '臀打', count: 4787 },
    { label: '潮吹', count: 2956 },
    { label: '深喉上身', count: 4181 },
    { label: '抽烟', count: 2171 },
    { label: '穿戴式玩具', count: 477 },
    { label: '打飞机', count: 2726 },
    { label: '大阴评分', count: 4306 },
    { label: '电臀舞', count: 4870 },
    { label: '高跟鞋', count: 3675 },
    { label: '臀打', count: 805 },
    { label: '后庭玩具', count: 2148 },
    { label: '假阳具或者动摇', count: 4519 },
    { label: '假阳具圣肛交', count: 264 },
    { label: '精油表演', count: 4365 },
    { label: '开红', count: 543 },
    { label: '口交', count: 4412 },
    { label: '快内摆饰', count: 2677 },
    { label: '深喉舞厅', count: 1002 },
    { label: '臀夹', count: 805 },
    { label: '串底只光', count: 2289 },
    { label: '乳夹', count: 3425 },
    { label: '乳头玩具', count: 1916 },
    { label: '色情短信', count: null },
    { label: '色情舞', count: 4902 },
    { label: '深喉', count: 3629 },
    { label: '手淫指导', count: 2152 },
    { label: '洗澡', count: 1386 },
    { label: '下蹲舞', count: 4433 },
    { label: '性玩具', count: 4101 },
    { label: '臀时', count: 1523 },
    { label: '阴部骑乘', count: 3186 },
    { label: '摩时', count: 1238 },
    { label: '指交', count: 5017 },
    { label: '白臀', count: 4889 },
    { label: '游戏', count: null },
    { label: '穿戴式玩具', count: 477 },
    { label: '后庭玩具', count: 2148 },
    { label: '互动玩具', count: 3688 },
    { label: '假阳具或者动摇', count: 4519 },
    { label: '乳头玩具', count: 1916 },
    { label: '性玩具', count: 4101 },
    { label: 'Kiiroo', count: null },
    { label: 'Lovense', count: 3688 }
  ];

  const filterCategories = (categories: any[], searchTerm: string) => {
    if (!searchTerm) return categories;
    return categories.filter(cat => 
      cat.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleCategoryClick = (categoryName: string) => {
    onCategoryClick(categoryName);
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
              <div>
                <h1 className="text-3xl font-bold text-white">全部类别</h1>
                <p className="text-slate-400 mt-1">在线性爱聊天的视频女孩</p>
              </div>
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
        </div>
      </div>

      {/* Categories Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* 外貌 Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Eye className="text-white" size={24} />
            <h2 className="text-2xl font-bold text-white">外貌</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filterCategories(appearanceCategories, searchTerm).map((category, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ scale: 1.02, backgroundColor: 'rgb(51, 65, 85)' }}
                onClick={() => handleCategoryClick(category.label)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg text-left transition-all duration-200"
              >
                <div className="font-medium text-sm">{category.label}</div>
                <div className="text-slate-400 text-xs mt-1">{category.count}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 体型 Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h3 className="text-xl font-bold text-white mb-4">体型</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filterCategories(bodyTypeCategories, searchTerm).map((category, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ scale: 1.02, backgroundColor: 'rgb(51, 65, 85)' }}
                onClick={() => handleCategoryClick(category.label)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg text-left transition-all duration-200"
              >
                <div className="font-medium text-sm">{category.label}</div>
                <div className="text-slate-400 text-xs mt-1">{category.count}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 发型 Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-xl font-bold text-white mb-4">发型</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filterCategories(hairCategories, searchTerm).map((category, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ scale: 1.02, backgroundColor: 'rgb(51, 65, 85)' }}
                onClick={() => handleCategoryClick(category.label)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg text-left transition-all duration-200"
              >
                <div className="font-medium text-sm">{category.label}</div>
                <div className="text-slate-400 text-xs mt-1">{category.count}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 特征 Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-xl font-bold text-white mb-4">特征</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filterCategories(featuresCategories, searchTerm).map((category, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ scale: 1.02, backgroundColor: 'rgb(51, 65, 85)' }}
                onClick={() => handleCategoryClick(category.label)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg text-left transition-all duration-200"
              >
                <div className="font-medium text-sm">{category.label}</div>
                <div className="text-slate-400 text-xs mt-1">{category.count}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 可请求提供的表演 Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Users className="text-white" size={24} />
            <h2 className="text-2xl font-bold text-white">可请求提供的表演</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filterCategories(performanceCategories, searchTerm).map((category, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ scale: 1.02, backgroundColor: 'rgb(51, 65, 85)' }}
                onClick={() => handleCategoryClick(category.label)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg text-left transition-all duration-200"
              >
                <div className="font-medium text-sm">{category.label}</div>
                {category.count && (
                  <div className="text-slate-400 text-xs mt-1">{category.count}</div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* No Results */}
        {searchTerm && 
         filterCategories([...appearanceCategories, ...bodyTypeCategories, ...hairCategories, ...featuresCategories, ...performanceCategories], searchTerm).length === 0 && (
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
              <div className="text-2xl font-bold text-white mb-1">100+</div>
              <div className="text-slate-400 text-sm">分类标签</div>
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