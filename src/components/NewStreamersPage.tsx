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
  Filter,
  Calendar,
  Award
} from 'lucide-react';

interface NewStreamersPageProps {
  onBackToHome: () => void;
  onStreamClick: () => void;
}

// Generate new streamers
const generateNewStreamers = (startId: number, count: number) => {
  const usernames = [
    'new_angel', 'fresh_face', 'first_time', 'debut_girl', 'newcomer_star',
    'rookie_beauty', 'new_talent', 'fresh_start', 'beginner_cute', 'first_stream'
  ];

  const thumbnails = [
    'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1391499/pexels-photo-1391499.jpeg?auto=compress&cs=tinysrgb&w=300'
  ];

  const tags = [
    ['新人', '首播'], ['新主播', '互动'], ['初次直播'], ['新人求关注'],
    ['刚开始', '害羞'], ['新手', '学习中'], ['第一次', '紧张']
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: startId + index,
    username: usernames[Math.floor(Math.random() * usernames.length)] + Math.floor(Math.random() * 1000),
    viewers: Math.floor(Math.random() * 500) + 10, // Lower viewer counts for new streamers
    thumbnail: thumbnails[Math.floor(Math.random() * thumbnails.length)],
    isLive: true,
    isHD: Math.random() > 0.6, // Lower HD rate for new streamers
    tags: tags[Math.floor(Math.random() * tags.length)],
    isNew: true,
    daysStreaming: Math.floor(Math.random() * 7) + 1, // 1-7 days
    joinDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
  }));
};

const NewStreamersPage: React.FC<NewStreamersPageProps> = ({ onBackToHome, onStreamClick }) => {
  const [streams, setStreams] = useState(() => generateNewStreamers(1, 24));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const loadMoreStreams = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newStreams = generateNewStreamers(streams.length + 1, 12);
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
      case 'newest':
        return a.daysStreaming - b.daysStreaming;
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
                <Star className="text-blue-500" size={32} />
                <div>
                  <h1 className="text-3xl font-bold text-white">新主播</h1>
                  <p className="text-slate-400 mt-1">刚开始直播的新人主播</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="搜索新主播..."
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
                <option value="newest">最新加入</option>
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
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{filteredStreams.length}</div>
              <div className="text-white/80 text-sm">新主播</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {Math.round(filteredStreams.reduce((sum, stream) => sum + stream.daysStreaming, 0) / filteredStreams.length || 0)}
              </div>
              <div className="text-white/80 text-sm">平均直播天数</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {Math.round(filteredStreams.reduce((sum, stream) => sum + stream.viewers, 0) / filteredStreams.length || 0)}
              </div>
              <div className="text-white/80 text-sm">平均观看人数</div>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-white/80 text-sm">新人支持</div>
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
              {/* New Badge */}
              <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-1 rounded text-xs font-bold">
                新人
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

                {/* Days Streaming */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                  <Calendar size={12} />
                  <span>{stream.daysStreaming}天</span>
                </div>

                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="text-white" size={32} />
                </div>
              </div>

              {/* Stream Info */}
              <div className="p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Star size={12} className="text-white" />
                  </div>
                  <span className="text-white text-sm font-medium truncate">
                    {stream.username}
                  </span>
                </div>

                {/* Join Date */}
                <div className="text-xs text-slate-400 mb-2">
                  加入时间: {stream.joinDate}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {stream.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 px-2 py-1 rounded text-xs border border-blue-500/30"
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
              <span>加载更多新主播...</span>
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
              已显示所有新主播
            </div>
          </motion.div>
        )}

        {/* Support Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6 mt-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Award className="text-blue-400" size={24} />
            <h3 className="text-xl font-bold text-white">支持新主播</h3>
          </div>
          <p className="text-slate-300 mb-4">
            这些主播刚刚开始她们的直播之旅。你的支持和鼓励对她们来说意义重大！
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">给予鼓励</span>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">友善互动</span>
            <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">耐心指导</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NewStreamersPage;