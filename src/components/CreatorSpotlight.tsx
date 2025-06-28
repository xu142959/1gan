import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Eye, Heart } from 'lucide-react';

const creators = [
  {
    name: '小雨游戏解说',
    category: '游戏主播',
    followers: '128万',
    totalViews: '5600万',
    avatar: '🎮',
    description: '专业游戏解说，带你体验最新最热门的游戏',
    achievements: ['金牌主播', '百万粉丝', '年度最佳']
  },
  {
    name: '音乐小天使',
    category: '音乐创作',
    followers: '89万',
    totalViews: '3200万',
    avatar: '🎵',
    description: '原创音乐人，每晚为你带来治愈系音乐',
    achievements: ['原创音乐人', '粉丝最爱', '创作达人']
  },
  {
    name: '美食探索家',
    category: '美食制作',
    followers: '156万',
    totalViews: '7800万',
    avatar: '👨‍🍳',
    description: '分享世界各地美食制作，让你在家也能品尝美味',
    achievements: ['美食专家', '教学达人', '人气王']
  }
];

const CreatorSpotlight = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-red-900/10 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            明星{' '}
            <span className="text-red-500">主播</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            认识我们平台上最受欢迎的创作者，看看他们如何建立自己的社区
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {creators.map((creator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:bg-slate-800/70 transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{creator.avatar}</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {creator.name}
                </h3>
                <p className="text-red-400 font-medium">
                  {creator.category}
                </p>
              </div>

              <p className="text-slate-400 text-center mb-6 leading-relaxed">
                {creator.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Users className="text-blue-400" size={16} />
                    <span className="text-blue-400 font-bold">{creator.followers}</span>
                  </div>
                  <div className="text-slate-400 text-sm">粉丝</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Eye className="text-green-400" size={16} />
                    <span className="text-green-400 font-bold">{creator.totalViews}</span>
                  </div>
                  <div className="text-slate-400 text-sm">总观看</div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {creator.achievements.map((achievement, i) => (
                  <div
                    key={i}
                    className="bg-red-500/10 border border-red-500/30 rounded-full px-3 py-1 text-red-400 text-sm text-center"
                  >
                    {achievement}
                  </div>
                ))}
              </div>

              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-red-500 text-white py-3 rounded-full font-medium hover:bg-red-600 transition-colors"
                >
                  关注
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 border border-slate-600 text-white py-3 rounded-full font-medium hover:bg-slate-800 transition-colors"
                >
                  观看直播
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 max-w-2xl mx-auto">
            <Star className="text-yellow-400 mx-auto mb-4" size={48} />
            <h3 className="text-2xl font-bold text-white mb-4">
              成为下一个明星主播
            </h3>
            <p className="text-slate-400 mb-6">
              我们为优秀的创作者提供全方位的支持，帮助你实现梦想
            </p>
            <button className="bg-red-500 text-white px-8 py-3 rounded-full font-medium hover:bg-red-600 transition-colors">
              申请成为签约主播
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CreatorSpotlight;