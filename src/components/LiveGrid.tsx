import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, Star, Gift, Users, Play } from 'lucide-react';

const liveStreams = [
  {
    id: 1,
    username: 'badgirl777888',
    viewers: 2847,
    thumbnail: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=300',
    isLive: true,
    isHD: true,
    tags: ['新人', '亚洲']
  },
  {
    id: 2,
    username: 'XxnTiP',
    viewers: 1234,
    thumbnail: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=300',
    isLive: true,
    isHD: false,
    tags: ['聊天', '音乐']
  },
  {
    id: 3,
    username: 'GouGou-111',
    viewers: 892,
    thumbnail: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    isLive: true,
    isHD: true,
    tags: ['舞蹈']
  },
  {
    id: 4,
    username: 'irohani_usagi',
    viewers: 567,
    thumbnail: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
    isLive: true,
    isHD: false,
    tags: ['日本', '可爱']
  },
  {
    id: 5,
    username: 'hymsy3333',
    viewers: 2156,
    thumbnail: 'https://images.pexels.com/photos/1391499/pexels-photo-1391499.jpeg?auto=compress&cs=tinysrgb&w=300',
    isLive: true,
    isHD: true,
    tags: ['健身', '运动']
  },
  {
    id: 6,
    username: 'yznt-dudu',
    viewers: 1789,
    thumbnail: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=300',
    isLive: true,
    isHD: true,
    tags: ['唱歌', '才艺']
  },
  {
    id: 7,
    username: 'FUTU-new',
    viewers: 934,
    thumbnail: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    isLive: true,
    isHD: false,
    tags: ['新人', '互动']
  },
  {
    id: 8,
    username: 'Luming404',
    viewers: 1456,
    thumbnail: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
    isLive: true,
    isHD: true,
    tags: ['游戏', '电竞']
  },
  {
    id: 9,
    username: 'CZ000333',
    viewers: 678,
    thumbnail: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=300',
    isLive: true,
    isHD: false,
    tags: ['聊天']
  },
  {
    id: 10,
    username: 'sujsoyso-7',
    viewers: 2234,
    thumbnail: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=300',
    isLive: true,
    isHD: true,
    tags: ['美妆', '时尚']
  },
  {
    id: 11,
    username: 'MM_YY_SS',
    viewers: 1567,
    thumbnail: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    isLive: true,
    isHD: true,
    tags: ['双人', '互动']
  },
  {
    id: 12,
    username: 'yunbaobaby',
    viewers: 890,
    thumbnail: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
    isLive: true,
    isHD: false,
    tags: ['可爱', '萌系']
  }
];

const LiveGrid = () => {
  const [selectedSection, setSelectedSection] = useState('我的最爱');

  const sections = [
    { name: '我的最爱', count: 12 },
    { name: '今日为您推荐', count: 24 },
    { name: '匹配您的最新精选', count: 18 }
  ];

  return (
    <div className="p-6">
      {/* Section Tabs */}
      <div className="mb-8">
        <div className="flex space-x-8 border-b border-slate-700">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => setSelectedSection(section.name)}
              className={`pb-4 px-2 text-lg font-medium transition-colors relative ${
                selectedSection === section.name
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {section.name}
              {selectedSection === section.name && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Live Streams Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {liveStreams.map((stream, index) => (
          <motion.div
            key={stream.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-slate-800 rounded-xl overflow-hidden cursor-pointer group"
          >
            <div className="relative aspect-[4/3]">
              <img
                src={stream.thumbnail}
                alt={stream.username}
                className="w-full h-full object-cover"
              />
              
              {/* Live Indicator */}
              {stream.isLive && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>直播</span>
                </div>
              )}

              {/* HD Badge */}
              {stream.isHD && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                  HD
                </div>
              )}

              {/* Viewer Count */}
              <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                <Eye size={12} />
                <span>{stream.viewers}</span>
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-black/70 text-white p-1 rounded hover:bg-red-500 transition-colors">
                  <Heart size={12} />
                </button>
                <button className="bg-black/70 text-white p-1 rounded hover:bg-yellow-500 transition-colors">
                  <Star size={12} />
                </button>
              </div>

              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play className="text-white" size={32} />
              </div>
            </div>

            {/* Stream Info */}
            <div className="p-3">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-white text-sm font-medium truncate">
                  {stream.username}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {stream.tags.slice(0, 2).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-8"
      >
        <button className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg transition-colors">
          查看更多
        </button>
      </motion.div>
    </div>
  );
};

export default LiveGrid;