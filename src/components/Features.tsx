import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Globe, Smartphone, Users, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: '超低延迟',
    description: '先进的技术确保直播延迟低于1秒，实现真正的实时互动'
  },
  {
    icon: Shield,
    title: '安全可靠',
    description: '企业级安全保护，保障你的隐私和数据安全'
  },
  {
    icon: Globe,
    title: '全球覆盖',
    description: '遍布全球的CDN网络，为世界各地的观众提供流畅体验'
  },
  {
    icon: Smartphone,
    title: '多平台支持',
    description: '支持手机、电脑、平板等多种设备，随时随地开播'
  },
  {
    icon: Users,
    title: '社区互动',
    description: '丰富的互动功能，建立你的专属粉丝社区'
  },
  {
    icon: BarChart3,
    title: '数据分析',
    description: '详细的直播数据分析，帮助你优化内容和增长粉丝'
  }
];

const Features = () => {
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
            强大{' '}
            <span className="text-red-500">功能</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            为主播和观众提供最佳的直播体验，让创作变得更简单
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:bg-slate-800/70 transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl mb-6"
              >
                <feature.icon className="text-red-400" size={32} />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              准备好开始你的直播之旅了吗？
            </h3>
            <p className="text-slate-400 mb-8 text-lg">
              加入我们的创作者社区，与全世界分享你的才华
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-red-600 transition-colors"
              >
                立即开始直播
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-slate-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-slate-800 transition-colors"
              >
                了解更多功能
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;