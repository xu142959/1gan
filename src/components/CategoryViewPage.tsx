import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Eye,
  Heart,
  Star,
  Play,
  Users,
  Loader
} from 'lucide-react';

interface CategoryViewPageProps {
  categoryName: string;
  onBackToCategories: () => void;
  onStreamClick: () => void;
}

// Generate streams for the category
const generateCategoryStreams = (categoryName: string, startId: number, count: number) => {
  const usernames = [
    'sweetie_angel', 'dancing_queen', 'music_lover', 'art_creator', 'fitness_girl',
    'cooking_star', 'chat_buddy', 'beauty_queen', 'party_girl', 'dream_girl',
    'lovely_lady', 'cute_princess', 'hot_babe', 'sexy_model', 'gorgeous_girl'
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
    category: categoryName,
    tags: [categoryName, '直播', '互动']
  }));
};

const CategoryViewPage: React.FC<CategoryViewPageProps> = ({ 
  categoryName, 
  onBackToCategories, 
  onStreamClick 
}) => {
  const [streams, setStreams] = useState(() => generateCategoryStreams(categoryName, 1, 24));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('viewers');

  const loadMoreStreams = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newStreams = generateCategoryStreams(categoryName, streams.length + 1, 12);
    setStreams(prev => [...prev, ...newStreams]);
    
    // Stop loading more after 100 streams for demo
    if (streams.length >= 100) {
      setHasMore(false);
    }
    
    setLoading(false);
  }, [loading, hasMore, streams.length, categoryName]);

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
                onClick={onBackToCategories}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">{categoryName}</h1>
                <p className="text-slate-400 mt-1">{filteredStreams.length} 个直播间正在直播</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="搜索主播..."
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
                <option value="viewers">按观看人数</option>
                <option value="username">按用户名</option>
              </select>
              
              <button className="text-slate-400 hover:text-white transition-colors">
                <Filter size={20} />
              </button>
            </div>
          </div>

          {/* Category Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{filteredStreams.length}</div>
              <div className="text-slate-400 text-sm">在线主播</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {filteredStreams.reduce((sum, stream) => sum + stream.viewers, 0).toLocaleString()}
              </div>
              <div className="text-slate-400 text-sm">总观看人数</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {Math.round(filteredStreams.reduce((sum, stream) => sum + stream.viewers, 0) / filteredStreams.length || 0)}
              </div>
              <div className="text-slate-400 text-sm">平均观看人数</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-slate-400 text-sm">全天直播</div>
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
              className="bg-slate-800 rounded-xl overflow-hidden cursor-pointer group"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={stream.thumbnail}
                  alt={stream.username}
                  className="w-full h-full object-cover"
                />
                
                {/* Live Indicator */}
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>直播</span>
                </div>

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
              已显示所有 {categoryName} 分类的直播间
            </div>
          </motion.div>
        )}

        {/* No Results */}
        {searchTerm && sortedStreams.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-slate-400 text-lg mb-2">没有找到匹配的主播</div>
            <div className="text-slate-500">尝试使用不同的搜索词</div>
          </motion.div>
        )}

        {/* Scroll to Top Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: sortedStreams.length > 24 ? 1 : 0,
            scale: sortedStreams.length > 24 ? 1 : 0
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-colors z-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default CategoryViewPage;