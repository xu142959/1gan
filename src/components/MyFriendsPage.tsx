import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Search,
  Users,
  UserPlus,
  MessageCircle,
  MoreHorizontal,
  Filter
} from 'lucide-react';

interface MyFriendsPageProps {
  onBackToHome: () => void;
}

const MyFriendsPage: React.FC<MyFriendsPageProps> = ({ onBackToHome }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header Navigation */}
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBackToHome}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex space-x-8">
              <span className="text-slate-400">我的简历</span>
              <span className="text-white border-b-2 border-red-500 pb-1">我的好友</span>
              <span className="text-slate-400">我的通知</span>
              <span className="text-slate-400">设置和隐私</span>
              <span className="text-slate-400">我的订阅</span>
              <span className="text-slate-400">重要更新</span>
            </div>
          </div>
          <div className="text-slate-400">分类</div>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">我的好友</h1>
          <p className="text-slate-400">管理你的好友列表</p>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="搜索好友..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 text-white pl-10 pr-4 py-3 rounded-lg border border-slate-700 focus:border-red-500 focus:outline-none"
            />
          </div>
          <button className="bg-slate-800 text-slate-400 hover:text-white p-3 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
            <Filter size={20} />
          </button>
        </div>

        {/* Empty State */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="bg-slate-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <Users className="text-slate-400" size={48} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">空</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            你还没有添加任何好友。开始关注其他用户来建立你的好友网络。
          </p>
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 mx-auto">
            <UserPlus size={20} />
            <span>发现新朋友</span>
          </button>
        </motion.div>

        {/* Friends List (when there are friends) */}
        {/* This would be populated with actual friend data */}
      </div>
    </div>
  );
};

export default MyFriendsPage;