import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, MessageCircle, Users } from 'lucide-react';

const liveStreams = [
  {
    id: 1,
    title: '王者荣耀巅峰赛冲分',
    streamer: '游戏大神小明',
    category: '游戏',
    viewers: 12847,
    thumbnail: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    avatar: '🎮',
    isLive: true
  },
  {
    id: 2,
    title: '深夜电台 | 治愈系音乐分享',
    streamer: '音乐小仙女',
    category: '音乐',
    viewers: 8934,
    thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    avatar: '🎵',
    isLive: true
  },
  {
    id: 3,
    title: '美食制作 | 今天做麻辣火锅',
    streamer: '厨房达人',
    category: '美食',
    viewers: 6521,
    thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    avatar: '🍳',
    isLive: true
  },
  {
    id: 4,
    title: '户外徒步 | 探索神秘山谷',
    streamer: '户外探险家',
    category: '户外',
    viewers: 4892,
    thumbnail: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400',
    avatar: '🏔️',
    isLive: true
  },
  {
    id: 5,
    title: '学习直播 | Python编程入门',
    streamer: '编程老师',
    category: '教育',
    viewers: 3456,
    thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
    avatar: '💻',
    isLive: true
  },
  {
    id: 6,
    title: '健身训练 | 全身燃脂运动',
    streamer: '健身教练',
    category: '运动',
    viewers: 7234,
    thumbnail: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400',
    avatar: '💪',
    isLive: true
  }
];

const LiveStreams = () => {
  return (
    <section className="py-32 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            热门{' '}
            <span className="text-red-500">直播</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            发现最受欢迎的直播内容，与你喜爱的主播实时互动
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {liveStreams.map((stream, index) => (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden hover:bg-slate-800/70 transition-all duration-300 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className="w-full h-48 object-cover"
                />
                {stream.isLive && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>直播中</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-sm flex items-center space-x-1">
                  <Eye size={14} />
                  <span>{stream.viewers.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="text-2xl">{stream.avatar}</div>
                  <div>
                    <div className="text-white font-semibold">{stream.streamer}</div>
                    <div className="text-slate-400 text-sm">{stream.category}</div>
                  </div>
                </div>

                <h3 className="text-white font-semibold mb-4 line-clamp-2">
                  {stream.title}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-slate-400">
                    <button className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                      <Heart size={16} />
                      <span className="text-sm">点赞</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                      <MessageCircle size={16} />
                      <span className="text-sm">聊天</span>
                    </button>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-400">
                    <Users size={16} />
                    <span className="text-sm">{stream.viewers.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <button className="bg-red-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-red-600 transition-colors">
            查看更多直播
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveStreams;