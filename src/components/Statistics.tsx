import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Play, Globe } from 'lucide-react';

const Statistics = () => {
  const stats = [
    {
      icon: Users,
      number: '500万+',
      label: '注册用户',
      description: '来自全球各地的用户'
    },
    {
      icon: Play,
      number: '10万+',
      label: '活跃主播',
      description: '每天都有新内容'
    },
    {
      icon: TrendingUp,
      number: '1000万+',
      label: '月观看时长',
      description: '小时的精彩内容'
    },
    {
      icon: Globe,
      number: '180+',
      label: '覆盖国家',
      description: '全球用户共同参与'
    }
  ];

  return (
    <section className="py-32 bg-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            平台{' '}
            <span className="text-red-500">数据</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            看看我们的成长数据，见证 StreamFlow 的发展历程
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 border border-red-500/30 rounded-2xl mb-6"
              >
                <stat.icon className="text-red-400" size={32} />
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                className="mb-4"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-red-400 mb-2">
                  {stat.label}
                </div>
                <div className="text-slate-400">
                  {stat.description}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              成为数据的一部分
            </h3>
            <p className="text-slate-400 mb-8 text-lg">
              加入我们不断增长的社区，与全世界的创作者和观众一起创造精彩内容
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-red-400 mb-1">24/7</div>
                <div className="text-slate-400">全天候直播</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400 mb-1">99.9%</div>
                <div className="text-slate-400">服务可用性</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400 mb-1">&lt;1s</div>
                <div className="text-slate-400">直播延迟</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;