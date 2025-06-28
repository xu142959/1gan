import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Music, ChefHat, GraduationCap, Dumbbell, Camera, Palette, Mic } from 'lucide-react';

const categories = [
  { icon: Gamepad2, name: '游戏', count: '1.2万', color: 'from-purple-500 to-blue-500' },
  { icon: Music, name: '音乐', count: '8.5千', color: 'from-pink-500 to-red-500' },
  { icon: ChefHat, name: '美食', count: '6.3千', color: 'from-orange-500 to-yellow-500' },
  { icon: GraduationCap, name: '教育', count: '4.7千', color: 'from-green-500 to-teal-500' },
  { icon: Dumbbell, name: '运动', count: '5.9千', color: 'from-red-500 to-pink-500' },
  { icon: Camera, name: '生活', count: '7.2千', color: 'from-blue-500 to-cyan-500' },
  { icon: Palette, name: '艺术', count: '3.4千', color: 'from-indigo-500 to-purple-500' },
  { icon: Mic, name: '聊天', count: '9.1千', color: 'from-emerald-500 to-green-500' }
];

const Categories = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            热门{' '}
            <span className="text-red-500">分类</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            探索各种精彩内容，找到你感兴趣的直播分类
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="relative group cursor-pointer"
            >
              <div className={`bg-gradient-to-br ${category.color} p-8 rounded-3xl text-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="relative z-10">
                  <category.icon className="text-white mx-auto mb-4" size={48} />
                  <h3 className="text-white font-bold text-xl mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/80">
                    {category.count} 个直播间
                  </p>
                </div>
                
                {/* Hover Effect */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center"
                >
                  <span className="text-white font-semibold">进入分类</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              找不到你喜欢的分类？
            </h3>
            <p className="text-slate-400 mb-6">
              我们正在不断添加新的内容分类，满足更多用户的需求
            </p>
            <button className="bg-red-500 text-white px-8 py-3 rounded-full font-medium hover:bg-red-600 transition-colors">
              建议新分类
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;