import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, Star, Gift, Users, Play, Loader } from 'lucide-react';

interface LiveGridProps {
  onStreamClick: () => void;
}

// Generate more streams for infinite scroll
const generateStreams = (startId: number, count: number) => {
  const usernames = [
    'badgirl777888', 'XxnTiP', 'GouGou-111', 'irohani_usagi', 'hymsy3333',
    'yznt-dudu', 'FUTU-new', 'Luming404', 'CZ000333', 'sujsoyso-7',
    'MM_YY_SS', 'yunbaobaby', 'sweetie_angel', 'dancing_queen', 'music_lover',
    'game_master', 'art_creator', 'fitness_girl', 'cooking_star', 'chat_buddy'
  ];

  const tags = [
    ['新人', '亚洲'], ['聊天', '音乐'], ['舞蹈'], ['日本', '可爱'],
    ['健身', '运动'], ['唱歌', '才艺'], ['新人', '互动'], ['游戏', '电竞'],
    ['聊天'], ['美妆', '时尚'], ['双人', '互动'], ['可爱', '萌系'],
    ['艺术', '创作'], ['户外', '旅行'], ['学习', '教育'], ['美食', '烹饪']
  ];

  const thumbnails = [
    'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1391499/pexels-photo-1391499.jpeg?auto=compress&cs=tinysrgb&w=300'
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: startId + index,
    username: usernames[Math.floor(Math.random() * usernames.length)] + Math.floor(Math.random() * 1000),
    viewers: Math.floor(Math.random() * 3000) + 100,
    thumbnail: thumbnails[Math.floor(Math.random() * thumbnails.length)],
    isLive: true,
    isHD: Math.random() > 0.4,
    tags: tags[Math.floor(Math.random() * tags.length)]
  }));
};

const initialStreams = generateStreams(1, 24);

const LiveGrid: React.FC<LiveGridProps> = ({ onStreamClick }) => {
  const [selectedSection, setSelectedSection] = useState('我的最爱');
  const [streams, setStreams] = useState(initialStreams);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const sections = [
    { name: '我的最爱', count: 12 },
    { name: '今日为您推荐', count: 24 },
    { name: '匹配您的最新精选', count: 18 }
  ];

  const loadMoreStreams = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newStreams = generateStreams(streams.length + 1, 12);
    setStreams(prev => [...prev, ...newStreams]);
    
    // Stop loading more after 100 streams for demo
    if (streams.length >= 100) {
      setHasMore(false);
    }
    
    setLoading(false);
  }, [loading, hasMore, streams.length]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop 
        >= document.documentElement.offsetHeight - 1000) {
      loadMoreStreams();
    }
  }, [loadMoreStreams]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleSectionChange = (sectionName: string) => {
    setSelectedSection(sectionName);
    // Reset streams when changing sections
    setStreams(generateStreams(1, 24));
    setHasMore(true);
    window.scrollTo(0, 0);
  };

  return (
    <div className="p-6">
      {/* Section Tabs */}
      <div className="mb-8">
        <div className="flex space-x-8 border-b border-slate-700">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => handleSectionChange(section.name)}
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
        {streams.map((stream, index) => (
          <motion.div
            key={stream.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: (index % 12) * 0.05 }}
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={onStreamClick}
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

      {/* Loading Indicator */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-8"
        >
          <div className="flex items-center space-x-3 text-slate-400">
            <Loader className="animate-spin" size={24} />
            <span>加载更多直播间...</span>
          </div>
        </motion.div>
      )}

      {/* End of Content */}
      {!hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <div className="text-slate-400">
            已显示所有直播间
          </div>
        </motion.div>
      )}

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: streams.length > 24 ? 1 : 0,
          scale: streams.length > 24 ? 1 : 0
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-colors z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
  );
};

export default LiveGrid;