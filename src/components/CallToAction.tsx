import React from 'react';
import { motion } from 'framer-motion';
import { Play, Download, Smartphone } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            下载{' '}
            <span className="text-red-500">StreamFlow</span>{' '}
            开始直播
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            随时随地开启你的直播之旅，与全世界分享你的精彩时刻
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - App Download */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-3 bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 text-white px-6 py-4 rounded-2xl hover:bg-slate-800 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  📱
                </div>
                <div className="text-left">
                  <div className="text-xs text-slate-400">下载到</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-3 bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 text-white px-6 py-4 rounded-2xl hover:bg-slate-800 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  📲
                </div>
                <div className="text-left">
                  <div className="text-xs text-slate-400">获取到</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                为什么选择 StreamFlow？
              </h3>
              <div className="space-y-4">
                {[
                  '超低延迟，实时互动体验',
                  '支持多种直播内容类型',
                  '强大的社区功能和粉丝管理',
                  '专业的数据分析工具'
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-slate-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <div className="bg-slate-800 rounded-3xl p-4 shadow-2xl">
                <div className="w-64 h-96 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 text-center">
                    <Play className="text-white mx-auto mb-4" size={64} />
                    <div className="text-white font-bold text-xl mb-2">StreamFlow</div>
                    <div className="text-white/80">开始你的直播</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="text-white mb-4 mt-8">
              <div className="text-lg font-semibold mb-2">
                立即下载开始直播
              </div>
              <div className="text-slate-400">
                支持 iOS 和 Android
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 text-white px-12 py-6 rounded-full text-xl font-bold hover:bg-red-600 transition-colors inline-flex items-center space-x-3"
          >
            <Play size={24} />
            <span>立即开始直播</span>
          </motion.button>
          
          <div className="mt-6 text-slate-400">
            免费注册 • 无需信用卡 • 即刻开始
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;