import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  Crown,
  Eye,
  Heart,
  Play,
  Star,
  Loader,
  Filter,
  Award,
  Gem,
  Shield
} from 'lucide-react';

interface VIPStreamersPageProps {
  onBackToHome: () => void;
  onStreamClick: () => void;
}

// Generate VIP streamers
const generateVIPStreamers = (startId: number, count: number) => {
  const usernames = [
    'vip_goddess', 'premium_angel', 'elite_beauty', 'royal_queen', 'diamond_star',
    'platinum_babe', 'gold_model', 'exclusive_diva', 'luxury_girl', 'crown_princess'
  ];

  const thumbnails = [
    'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1391499/pexels-photo-1391499.jpeg?auto=compress&cs=tinysrgb&w=300'
  ];

  const tags = [
    ['VIP', '认证'], ['高级', '专属'], ['精英', '顶级'], ['皇冠', '贵族'],
    ['钻石', '奢华'], ['白金', '尊贵'], ['黄金', '特权']
  ];

  const vipLevels = ['钻石', '白金', '黄金', '银牌'];

  return Array.from({ length: count }, (_, index) => ({
    id: startId + index,
    username: usernames[Math.floor(Math.random() * usernames.length)] + Math.floor(Math.random() * 1000),
    viewers: Math.floor(Math.random() * 6000) + 1500, // High viewer counts for VIP streamers
    thumbnail: thumbnails[Math.floor(Math.random() * thumbnails.length)],
    isLive: true,
    isHD: true, // All VIP streamers have HD
    tags: tags[Math.floor(Math.random() * tags.length)],
    isVIP: true,
    vipLevel: vipLevels[Math.floor(Math.random() * vipLevels.length)],
    rating: (Math.random() * 1 + 4).toFixed(1), // 4.0 - 5.0 rating
    verifiedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    specialFeatures: Math.floor(Math.random() * 5) + 3 // 3-7 special features
  }));
};

const VIPStreamersPage: React.FC<VIPStreamersPageProps> = ({ onBackToHome, onStreamClick }) => {
  const [streams, setStreams] = useState(() => generateVIPStreamers(1, 24));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('vipLevel');
  const [filterLevel, setFilterLevel] = useState('all');

  const loadMoreStreams = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newStreams = generateVIPStreamers(streams.length + 1, 12);
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

  const filteredStreams = streams.filter(stream => {
    const matchesSearch = !searchTerm || stream.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || stream.vipLevel === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const getVipLevelOrder = (level: string) => {
    const order = { '钻石': 4, '白金': 3, '黄金': 2, '银牌': 1 };
    return order[level] || 0;
  };

  const sortedStreams = [...filteredStreams].sort((a, b) => {
    switch (sortBy) {
      case 'vipLevel':
        return getVipLevelOrder(b.vipLevel) - getVipLevelOrder(a.vipLevel);
      case 'rating':
        return parseFloat(b.rating) - parseFloat(a.rating);
      case 'viewers':
        return b.viewers - a.viewers;
      case 'features':
        return b.specialFeatures - a.specialFeatures;
      default:
        return 0;
    }
  });

  const getVipLevelColor = (level: string) => {
    switch (level) {
      case '钻石': return 'from-blue-400 to-cyan-400';
      case '白金': return 'from-gray-300 to-gray-400';
      case '黄金': return 'from-yellow-400 to-orange-400';
      case '银牌': return 'from-gray-400 to-gray-500';
      default: return 'from-yellow-400 to-orange-400';
    }
  };

  const getVipLevelIcon = (level: string) => {
    switch (level) {
      case '钻石': return <Gem size={12} />;
      case '白金': return <Shield size={12} />;
      case '黄金': return <Crown size={12} />;
      case '银牌': return <Award size={12} />;
      default: return <Crown size={12} />;
    }
  };

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
                <Crown className="text-yellow-500" size={32} />
                <div>
                  <h1 className="text-3xl font-bold text-white">VIP</h1>
                  <p className="text-slate-400 mt-1">认证VIP主播</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="搜索VIP主播..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-700 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none w-64"
                />
              </div>
              
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none"
              >
                <option value="all">所有等级</option>
                <option value="钻石">钻石VIP</option>
                <option value="白金">白金VIP</option>
                <option value="黄金">黄金VIP</option>
                <option value="银牌">银牌VIP</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none"
              >
                <option value="vipLevel">按VIP等级</option>
                <option value="rating">按评分</option>
                <option value="viewers">按观看人数</option>
                <option value="features">按特色功能</option>
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
              <div className="text-white/80 text-sm">VIP主播</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {(filteredStreams.reduce((sum, stream) => sum + parseFloat(stream.rating), 0) / filteredStreams.length || 0).toFixed(1)}
              </div>
              <div className="text-white/80 text-sm">平均评分</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-white/80 text-sm">高清直播</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {Math.round(filteredStreams.reduce((sum, stream) => sum + stream.specialFeatures, 0) / filteredStreams.length || 0)}
              </div>
              <div className="text-white/80 text-sm">平均特色功能</div>
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
              className="bg-slate-800 rounded-xl overflow-hidden cursor-pointer group relative border border-yellow-500/20"
            >
              {/* VIP Badge */}
              <div className={`absolute top-2 left-2 z-10 bg-gradient-to-r ${getVipLevelColor(stream.vipLevel)} text-white px-2 py-1 rounded text-xs font-bold flex items-center space-x-1`}>
                {getVipLevelIcon(stream.vipLevel)}
                <span>{stream.vipLevel}</span>
              </div>

              {/* Verified Badge */}
              <div className="absolute top-2 right-2 z-10 bg-green-500 text-white p-1 rounded-full">
                <Shield size={12} />
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
                <div className="absolute top-16 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                  4K
                </div>

                {/* Viewer Count */}
                <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                  <Eye size={12} />
                  <span>{stream.viewers.toLocaleString()}</span>
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
                  <div className={`w-6 h-6 bg-gradient-to-br ${getVipLevelColor(stream.vipLevel)} rounded-full flex items-center justify-center`}>
                    <Crown size={12} className="text-white" />
                  </div>
                  <span className="text-white text-sm font-medium truncate">
                    {stream.username}
                  </span>
                </div>

                {/* Special Features Count */}
                <div className="text-xs text-yellow-400 mb-2 flex items-center space-x-1">
                  <Award size={12} />
                  <span>{stream.specialFeatures} 项特色功能</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {stream.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`bg-gradient-to-r ${getVipLevelColor(stream.vipLevel)}/20 text-yellow-400 px-2 py-1 rounded text-xs border border-yellow-500/30`}
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
              <span>加载更多VIP主播...</span>
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
              已显示所有VIP主播
            </div>
          </motion.div>
        )}

        {/* VIP Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6 mt-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Crown className="text-yellow-400" size={24} />
            <h3 className="text-xl font-bold text-white">VIP特权</h3>
          </div>
          <p className="text-slate-300 mb-4">
            VIP主播经过严格认证，提供最优质的直播体验和专属服务。
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="bg-blue-500/20 text-blue-400 p-3 rounded-lg mb-2">
                <Gem className="mx-auto" size={24} />
              </div>
              <div className="text-white text-sm font-medium">4K高清</div>
            </div>
            <div className="text-center">
              <div className="bg-green-500/20 text-green-400 p-3 rounded-lg mb-2">
                <Shield className="mx-auto" size={24} />
              </div>
              <div className="text-white text-sm font-medium">身份认证</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-500/20 text-purple-400 p-3 rounded-lg mb-2">
                <Star className="mx-auto" size={24} />
              </div>
              <div className="text-white text-sm font-medium">专属功能</div>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500/20 text-yellow-400 p-3 rounded-lg mb-2">
                <Award className="mx-auto" size={24} />
              </div>
              <div className="text-white text-sm font-medium">优先支持</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VIPStreamersPage;