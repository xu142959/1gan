import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  Star,
  Eye,
  Heart,
  Play,
  Loader,
  Filter
} from 'lucide-react';

interface RecommendedPageProps {
  onBackToHome: () => void;
  onStreamClick: () => void;
}

// Generate recommended streams
const generateRecommendedStreams = (startId: number, count: number) => {
  const usernames = [
    'recommended_angel', 'top_choice', 'best_pick', 'featured_star', 'premium_girl',
    'editor_choice', 'trending_now', 'must_watch', 'popular_pick', 'staff_favorite'
  ];

  const thumbnails = [
    'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1391499/pexels-photo-1391499.jpeg?auto=compress&cs=tinysrgb&w=300'
  ];

  const tags = [
    ['推荐', '热门'], ['精选', '优质'], ['编辑推荐'], ['趋势', '必看'],
    ['人气', '精品'], ['特色', '推荐'], ['热门', '优选']
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: startId + index,
    username: usernames[Math.floor(Math.random() * usernames.length)] + Math.floor(Math.random() * 1000),
    viewers: Math.floor(Math.random() * 5000) + 500, // Higher viewer counts for recommended
    thumbnail: thumbnails[Math.floor(Math.random() * thumbnails.length)],
    isLive: true,
    isHD: Math.random() > 0.2, // Higher HD rate for recommended
    tags: tags[Math.floor(Math.random() * tags.length)],
    isRecommended: true,
    rating: (Math.random() * 2 + 3).toFixed(1) // 3.0 - 5.0 rating
  }));
};

const RecommendedPage: React.FC<RecommendedPageProps> = ({ onBackToHome, onStreamClick }) => {
  const [streams, setStreams] = useState(() => generateRecommendedStreams(1, 24));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const loadMoreStreams = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newStreams = generateRecommendedStreams(streams.length + 1, 12);
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
      case 'rating':
        return parseFloat(b.rating) - parseFloat(a.rating);
      case 'viewers':
        return b.viewers - a.viewers;
      case 'username':
        return a.username.localeCompare(b.username);
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
                <Star className="text-yellow-500" size={32} />
                <div>
                  <h1 className="text-3xl font-bold text-white">推荐</h1>
                  <p className="text-slate-400 mt-1">为你精选的优质直播</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="搜索推荐主播..."
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
                <option value="rating">按评分</option>
                <option value="viewers">按观看人数</option>
                <option value="username">按用户名</option>
              </select>
              
              <button className="text-slate-400 hover:text-white transition-colors">
                <Filter size={20} />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{filteredStreams.length}</div>
              <div className="text-white/80 text-sm">推荐主播</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {(filteredStreams.reduce((sum, stream) => sum + parseFloat(stream.rating), 0) / filteredStreams.length || 0).toFixed(1)}
              </div>
              <div className="text-white/80 text-sm">平均评分</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {Math.round(filteredStreams.filter(s => s.isHD).length / filteredStreams.length * 100 || 0)}%
              </div>
              <div className="text-white/80 text-sm">高清直播</div>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-white/80 text-sm">精选更新</div>
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
              {/* Recommended Badge */}
              <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                推荐
              </div>

              <div className="relative aspect-[4/3]">
                <img
                  src={stream.thumbnail}
                  alt={stream.username}
                  className="w-full h-full object-cover"
                />
                
                {/* Live Indicator */}
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>直播</span>
                </div>

                {/* HD Badge */}
                {stream.isHD && (
                  <div className="absolute top-10 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                    HD
                  </div>
                )}

                {/* Viewer Count */}
                <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                  <Eye size={12} />
                  <span>{stream.viewers}</span>
                </div>

                {/* Rating */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                  <Star size={12} className="text-yellow-400" />
                  <span>{stream.rating}</span>
                </div>

                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="text-white" size={32} />
                </div>
              </div>

              {/* Stream Info */}
              <div className="p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Star size={12} className="text-white" />
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
                      className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 px-2 py-1 rounded text-xs border border-yellow-500/30"
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
              <span>加载更多推荐...</span>
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
              已显示所有推荐直播间
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RecommendedPage;