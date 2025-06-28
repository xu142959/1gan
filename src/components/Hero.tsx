import React from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Eye, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      {/* Live Stats Floating Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute top-32 right-8 bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4"
      >
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-white font-semibold">正在直播</span>
        </div>
        <div className="text-red-400 font-bold text-xl">2,847</div>
        <div className="text-slate-400 text-sm">个直播间</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute top-48 left-8 bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4"
      >
        <div className="flex items-center space-x-2 mb-2">
          <Eye className="text-blue-400" size={16} />
          <span className="text-white font-semibold">在线观众</span>
        </div>
        <div className="text-blue-400 font-bold text-xl">1.2M</div>
        <div className="text-slate-400 text-sm">人正在观看</div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight"
        >
          开启你的{' '}
          <span className="text-red-500">直播</span>{' '}
          之旅
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
        >
          与全球观众实时互动，分享你的才华，建立你的社区。
          StreamFlow 让直播变得简单而有趣。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-red-600 transition-colors flex items-center space-x-2"
          >
            <Play size={20} />
            <span>开始直播</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-slate-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-slate-800 transition-colors flex items-center space-x-2"
          >
            <Users size={20} />
            <span>观看直播</span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { icon: Users, label: '500万+', desc: '注册用户' },
            { icon: Play, label: '10万+', desc: '活跃主播' },
            { icon: Star, label: '4.9', desc: '用户评分' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <stat.icon className="text-red-400 mx-auto mb-2" size={32} />
              <div className="text-2xl font-bold text-white">{stat.label}</div>
              <div className="text-slate-400">{stat.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;