import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  Heart,
  Eye,
  Play,
  Star,
  Loader,
  HeartOff
} from 'lucide-react';

interface FavoritesPageProps {
  onBackToHome: () => void;
  onStreamClick: () => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ onBackToHome, onStreamClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<any[]>([]);

  // Simulate empty favorites for demo
  useEffect(() => {
    // In a real app, this would load from user's favorites
    setFavorites([]);
  }, []);

  const filteredFavorites = favorites.filter(stream =>
    !searchTerm || stream.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  <h1 className="text-3xl font-bold text-white">我的最爱</h1>
                  <p className="text-slate-400 mt-1">你收藏的主播</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="搜索收藏的主播..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-700 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <HeartOff className="text-slate-400 mx-auto mb-4" size={64} />
            <h2 className="text-2xl font-bold text-white mb-4">还没有收藏的主播</h2>
            <p className="text-slate-400 mb-8">
              浏览直播间时点击心形图标来收藏你喜欢的主播
            </p>
            <button
              onClick={onBackToHome}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              开始浏览
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredFavorites.map((stream, index) => (
              <motion.div
                key={stream.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={onStreamClick}
                className="bg-slate-800 rounded-xl overflow-hidden cursor-pointer group"
              >
                {/* Stream card content would go here */}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;