import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Facebook, Instagram, Youtube, Globe } from 'lucide-react';

const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
      <div className="w-3 h-3 bg-white rounded-full"></div>
    </div>
    <span className="text-white font-bold text-xl">StreamFlow</span>
  </div>
);

const Footer = () => {
  const footerLinks = {
    '产品': [
      '直播功能',
      '移动应用',
      '桌面版本',
      '开发者API',
      '企业解决方案'
    ],
    '社区': [
      '创作者中心',
      '帮助中心',
      '社区指南',
      '安全中心',
      '举报问题'
    ],
    '公司': [
      '关于我们',
      '招聘信息',
      '新闻中心',
      '投资者关系',
      '合作伙伴'
    ],
    '支持': [
      '联系我们',
      '技术支持',
      '状态页面',
      '系统要求',
      '反馈建议'
    ]
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="text-slate-400 mb-6 mt-4 leading-relaxed">
              StreamFlow 是全球领先的直播平台，
              为创作者和观众提供最佳的直播体验。
              让每个人都能分享自己的精彩时刻。
            </p>
            <div className="flex items-center space-x-4">
              {[Twitter, Facebook, Instagram, Youtube].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-all duration-300"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-bold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="flex items-center space-x-2 text-slate-400">
                <Globe size={16} />
                <select className="bg-transparent text-slate-400 text-sm focus:outline-none">
                  <option>简体中文</option>
                  <option>English</option>
                  <option>日本語</option>
                  <option>한국어</option>
                </select>
              </div>
              <div className="text-slate-400 text-sm">
                © 2024 StreamFlow
              </div>
            </div>

            <div className="flex items-center space-x-6 text-slate-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                隐私政策
              </a>
              <a href="#" className="hover:text-white transition-colors">
                服务条款
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie 政策
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;