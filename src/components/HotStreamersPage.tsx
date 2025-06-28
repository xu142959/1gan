import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Heart, Eye, Play, Star, Loader, Filter, TrendingUp, Siren as Fire } from 'lucide-react';

interface HotStreamersPageProps {
  onBackToHome: () => void;
  onStreamClick: () => void;
}

// Generate hot streamers
const generateHotStreamers = (startId: number, count: number) => {
  const usernames = [
    'hot_goddess', 'fire_angel', 'trending_star', 'popular_babe', 'viral_beauty',
    'top_model', 'burning_love', 'hot_sensation', 'flame_queen', 'blazing_star'
  ];

  const thumbnails = [
    'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1391499/pexels-photo-1391499.jpeg?auto=compress&cs=tinysrgb&w=300'
  ];

  const tags = [
    ['热门', '火爆'], ['人气', '爆款'], ['趋势', '热点'], ['火热', '爆红'],
    ['热搜', '人气王'], ['火爆全网'], ['超人气', '热门推荐']
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: startId + index,
    username: usernames[Math.floor(Math.random() * usernames.length)] + Math.floor(Math.random() * 1000),
    viewers: Math.floor(Math.random() * 8000) + 2000, // High viewer counts for hot streamers
    thumbnail: thumbnails[Math.floor(Math.random() * thumbnails.length)],
    isLive: true,
    isHD: Math.random() > 0.1, // Very high HD rate for hot streamers
    tags: tags[Math.floor(Math.random() * tags.length)],
    isHot: true,
    trendingScore: Math.floor(Math.random() * 100) + 80, // 80-100 trending score
    likes: Math.floor(Math.random() * 50000) + 10000, // 10k-60k likes
    growthRate: (Math.random() * 500 + 100).toFixed(0) // 100-600% growth
  }));
};

const HotStreamersPage: React.FC<HotStreamersPageProps> = ({ onBackToHome, onStreamClick }) => {
  const [streams, setStreams] = useState(() => generateHotStreamers(1, 24));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('trending');

  const loadMoreStreams = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newStreams = generateHotStreamers(streams.length + 1, 12);
    setStreams(prev => [...prev, ...newStreams]);
    
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

  const filteredStreams = streams.filter(stream =>
    !searchTerm || stream.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStreams = [...filteredStreams].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return b.trendingScore - a.trendingScore;
      case 'viewers':
        return b.viewers - a.viewers;
      case 'likes':
        return b.likes - a.likes;
      case 'growth':
        return parseFloat(b.growthRate) - parseFloat(a.growthRate);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBackToHome}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="flex items-center space-x-3">
                <Heart className="text-red-500" size={32} />
                <div>
                  <h1 className="text-3xl font-bold text-white">热门</h1>
                  <p className="text-slate-400 mt-1">最受欢迎的热门主播</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="搜索热门主播..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-700 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none w-64"
                />
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none"
              >
                <option value="trending">按热度</option>
                <option value="viewers">按观看人数</option>
                <option value="likes">按点赞数</option>
                <option value="growth">按增长率</option>
              </select>
              
              <button className="text-slate-400 hover:text-white transition-colors">
                <Filter size={20} />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{filteredStreams.length}</div>
              <div className="text-white/80 text-sm">热门主播</div>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {Math.round(filteredStreams.reduce((sum, stream) => sum + stream.trendingScore, 0) / filteredStreams.length || 0)}
              </div>
              <div className="text-white/80 text-sm">平均热度</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {Math.round(filteredStreams.reduce((sum, stream) => sum + stream.viewers, 0) / filteredStreams.length || 0).toLocaleString()}
              </div>
              <div className="text-white/80 text-sm">平均观看人数</div>
            </div>
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {Math.round(filteredStreams.reduce((sum, stream) => sum + parseFloat(stream.growthRate), 0) / filteredStreams.length || 0)}%
              </div>
              <div className="text-white/80 text-sm">平均增长率</div>
            </div>
          </div>
        </div>
      </div>

      {/* Streams Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {sortedStreams.map((stream, index) => (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (index % 12) * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={onStreamClick}
              className="bg-slate-800 rounded-xl overflow-hidden cursor-pointer group relative"
            >
              {/* Hot Badge */}
              <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center space-x-1">
                <Fire size={12} />
                <span>热门</span>
              </div>

              {/* Trending Score */}
              <div className="absolute top-2 right-2 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center space-x-1">
                <TrendingUp size={12} />
                <span>{stream.trendingScore}</span>
              </div>

              <div className="relative aspect-[4/3]">
                <img
                  src={stream.thumbnail}
                  alt={stream.username}
                  className="w-full h-full object-cover"
                />
                
                {/* Live Indicator */}
                <div className="absolute top-10 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>直播</span>
                </div>

                {/* HD Badge */}
                {stream.isHD && (
                  <div className="absolute top-16 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                    HD
                  </div>
                )}

                {/* Viewer Count */}
                <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                  <Eye size={12} />
                  <span>{stream.viewers.toLocaleString()}</span>
                </div>

                {/* Likes */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                  <Heart size={12} className="text-red-400" />
                  <span>{(stream.likes / 1000).toFixed(1)}k</span>
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
                    <Fire size={12} className="text-white" />
                  </div>
                  <span className="text-white text-sm font-medium truncate">
                    {stream.username}
                  </span>
                </div>

                {/* Growth Rate */}
                <div className="text-xs text-green-400 mb-2 flex items-center space-x-1">
                  <TrendingUp size={12} />
                  <span>+{stream.growthRate}% 增长</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {stream.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 px-2 py-1 rounded text-xs border border-red-500/30"
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
              <span>加载更多热门主播...</span>
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
              已显示所有热门主播
            </div>
          </motion.div>
        )}

        {/* Trending Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-xl p-6 mt-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Fire className="text-red-400" size={24} />
            <h3 className="text-xl font-bold text-white">热门趋势</h3>
          </div>
          <p className="text-slate-300 mb-4">
            这些主播正在平台上掀起热潮！她们的人气和互动度都在快速增长。
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">🔥 超高人气</span>
            <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm">📈 快速增长</span>
            <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">⭐ 优质内容</span>
            <span className="bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full text-sm">💖 高互动</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HotStreamersPage;