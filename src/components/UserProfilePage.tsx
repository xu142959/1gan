import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  User,
  Edit,
  Camera,
  MapPin,
  Calendar,
  Globe,
  Heart,
  Star,
  Award,
  Shield
} from 'lucide-react';

interface UserProfilePageProps {
  onBackToHome: () => void;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState('简介');

  const tabs = ['简介', '照片', '等级和分级'];

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
              <span className="text-white">我的简历</span>
              <span className="text-slate-400">我的好友</span>
              <span className="text-slate-400">我的通知</span>
              <span className="text-slate-400">设置和隐私</span>
              <span className="text-slate-400">我的订阅</span>
              <span className="text-slate-400">重要更新</span>
            </div>
          </div>
          <div className="text-slate-400">分类</div>
        </div>
      </div>

      {/* Profile Header */}
      <div className="relative">
        {/* Cover Photo */}
        <div className="h-64 bg-gradient-to-r from-slate-700 to-slate-600 relative">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Profile Info */}
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-end space-x-6 -mt-16">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-slate-600 rounded-full border-4 border-slate-800 flex items-center justify-center">
                <span className="text-white font-bold text-4xl">G</span>
              </div>
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center border-2 border-slate-800">
                <span className="text-white text-xs font-bold">7</span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 pb-4">
              <h1 className="text-3xl font-bold text-white mb-2">gtx1</h1>
              <p className="text-slate-400">灰色级别 | 7分级</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="flex space-x-8 border-b border-slate-700">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 text-lg font-medium transition-colors relative ${
                activeTab === tab
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeProfileTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === '简介' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800 rounded-xl p-6 mb-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">我的资料</h2>
                  <button className="text-slate-400 hover:text-white">
                    <Edit size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">来自</span>
                    <div className="flex items-center space-x-2">
                      <img src="https://flagcdn.com/w20/cn.png" alt="China" className="w-5 h-3" />
                      <span className="text-white">新加坡</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">感兴趣的会员</span>
                    <span className="text-white">灰色级别，7分级</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">会员</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-white">无</span>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm">
                        升级
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">兴趣</span>
                    <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                      选择
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-800 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">关于我</h2>
                  <button className="text-slate-400 hover:text-white">
                    <Edit size={20} />
                  </button>
                </div>
                <p className="text-slate-400">暂无个人介绍</p>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">相册</h3>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
                  <Camera className="text-slate-400 mx-auto mb-2" size={32} />
                  <p className="text-slate-400 text-sm">添加相册</p>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === '照片' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Camera className="text-slate-400 mx-auto mb-4" size={64} />
            <h2 className="text-2xl font-bold text-white mb-4">还没有照片</h2>
            <p className="text-slate-400 mb-8">上传你的第一张照片</p>
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors">
              上传照片
            </button>
          </motion.div>
        )}

        {activeTab === '等级和分级' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">当前等级</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">7</span>
                </div>
                <div>
                  <div className="text-white font-medium">等级 7</div>
                  <div className="text-slate-400 text-sm">灰色级别</div>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm text-slate-400 mb-1">
                  <span>85/100 经验分</span>
                  <span>15分还需升级</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-slate-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">等级特权</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Star className="text-yellow-400" size={16} />
                  <span className="text-slate-300 text-sm">基础聊天功能</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="text-red-400" size={16} />
                  <span className="text-slate-300 text-sm">收藏主播</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="text-blue-400" size={16} />
                  <span className="text-slate-300 text-sm">参与活动</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;