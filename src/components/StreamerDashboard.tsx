import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Settings, 
  BarChart3, 
  Heart, 
  Diamond, 
  Video, 
  DollarSign, 
  Users, 
  Eye, 
  Calendar,
  Clock,
  TrendingUp,
  Star,
  Gift,
  MessageCircle,
  Camera,
  Mic,
  MicOff,
  VideoOff,
  Play,
  Pause,
  Square,
  Monitor,
  Smartphone,
  Globe,
  Crown,
  Award,
  Target,
  Zap,
  RefreshCw,
  ArrowRight,
  Lightbulb,
  Shield,
  User,
  Lock,
  CheckCircle
} from 'lucide-react';

interface StreamerDashboardProps {
  onBackToHome: () => void;
}

const StreamerDashboard: React.FC<StreamerDashboardProps> = ({ onBackToHome }) => {
  const [isLive, setIsLive] = useState(false);
  const [currentViewers, setCurrentViewers] = useState(0);
  const [totalFollowers, setTotalFollowers] = useState(54);
  const [totalTips, setTotalTips] = useState(0);
  const [streamScore, setStreamScore] = useState(35);
  const [setupProgress, setSetupProgress] = useState(57);
  const [weeklyEarnings, setWeeklyEarnings] = useState(0);
  const [privateShowRating, setPrivateShowRating] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  
  // 模拟登录状态和实名认证状态
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 这里应该从实际的认证状态获取
  const [isVerified, setIsVerified] = useState(false); // 实名认证状态
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive) {
        setCurrentViewers(prev => Math.max(0, prev + Math.floor(Math.random() * 10) - 4));
        setStreamScore(prev => Math.min(100, Math.max(0, prev + Math.floor(Math.random() * 6) - 2)));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const handleStartStream = () => {
    if (!isLoggedIn) {
      alert('请先登录');
      return;
    }
    
    if (!isVerified) {
      setShowVerificationModal(true);
      return;
    }
    
    setIsLive(true);
    setCurrentViewers(Math.floor(Math.random() * 50) + 10);
  };

  const handleStopStream = () => {
    setIsLive(false);
    setCurrentViewers(0);
  };

  const handleVerification = () => {
    // 模拟实名认证流程
    setIsVerified(true);
    setShowVerificationModal(false);
    alert('实名认证成功！现在可以开始直播了。');
  };

  const StatCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    value: string | number;
    subtitle?: string;
    color?: string;
    trend?: string;
    onClick?: () => void;
  }> = ({ icon, title, value, subtitle, color = 'bg-slate-800', trend, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`${color} rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-slate-400">{icon}</div>
        {trend && (
          <div className="flex items-center space-x-1 text-green-400 text-sm">
            <TrendingUp size={14} />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-slate-400 text-sm">{title}</div>
      {subtitle && <div className="text-slate-500 text-xs mt-1">{subtitle}</div>}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 rounded-xl p-8 max-w-md w-full"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-red-400" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">需要实名认证</h2>
              <p className="text-slate-300 mb-6">
                为了保障平台安全和用户权益，开始直播前需要完成实名认证。
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-slate-300">
                  <CheckCircle className="text-green-400" size={16} />
                  <span className="text-sm">身份信息保护</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <CheckCircle className="text-green-400" size={16} />
                  <span className="text-sm">快速审核流程</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <CheckCircle className="text-green-400" size={16} />
                  <span className="text-sm">安全可靠</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowVerificationModal(false)}
                  className="flex-1 bg-slate-700 text-white py-3 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  稍后认证
                </button>
                <button
                  onClick={handleVerification}
                  className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
                >
                  立即认证
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBackToHome}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">直播中心</h1>
                <p className="text-slate-400 mt-1">管理你的直播和收益</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isLoggedIn && (
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isVerified ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                  <span className="text-slate-400 text-sm">
                    {isVerified ? '已实名认证' : '未实名认证'}
                  </span>
                </div>
              )}
              <div className="text-slate-400 text-sm">
                想要赚钱吗？分享你的直播录像到"我的直播设置" → "我的直播设置" → "录制节目"
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Login Required Message */}
        {!isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 rounded-xl p-8 mb-8 text-center"
          >
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="text-blue-400" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">请先登录</h2>
            <p className="text-slate-400 mb-6">
              登录后即可访问直播中心，开始你的直播之旅
            </p>
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg transition-colors">
              立即登录
            </button>
          </motion.div>
        )}

        {/* Main Content - Only show when logged in */}
        {isLoggedIn && (
          <>
            {/* Setup Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 rounded-xl p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Settings className="text-blue-500" size={24} />
                  <span className="text-white font-medium">设置：8 / 14 步已完成</span>
                </div>
                <div className="text-3xl font-bold text-white">{setupProgress}%</div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
                <div 
                  className="bg-red-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${setupProgress}%` }}
                ></div>
              </div>
              <p className="text-slate-400 text-sm">完成设置以获得更多观众和收益</p>
            </motion.div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard
                icon={<BarChart3 size={24} />}
                title="StripScore"
                value={streamScore}
                subtitle="1000+"
                trend="+5"
              />
              
              <StatCard
                icon={<Heart size={24} />}
                title="收藏者"
                value={totalFollowers}
                color="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30"
              />
              
              <StatCard
                icon={<Diamond size={24} />}
                title="粉丝团"
                value={`${currentViewers}代币/月`}
                subtitle={`来自0个订阅用户`}
                color="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30"
              />
            </div>

            {/* Secondary Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard
                icon={<Video size={24} />}
                title="私人秀评分"
                value="—"
                subtitle="您需要进行更多的私人秀才能查看节目自评分"
              />
              
              <StatCard
                icon={<DollarSign size={24} />}
                title="每小时收益"
                value={`$${weeklyEarnings}`}
                subtitle="0代币/小时"
                color="bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/30"
              />
              
              <StatCard
                icon={<Users size={24} />}
                title="本周收益"
                value={`${weeklyEarnings}代币`}
                subtitle="从周一到周日"
                color="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
              />
            </div>

            {/* Live Controls - Only show if verified */}
            {isVerified && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800 rounded-xl p-6 mb-8"
              >
                <h2 className="text-xl font-bold text-white mb-6">直播控制</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Stream Status */}
                  <div>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-4 h-4 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`}></div>
                      <span className="text-white font-medium">
                        {isLive ? '正在直播' : '离线'}
                      </span>
                      {isLive && (
                        <div className="flex items-center space-x-2 text-slate-400">
                          <Eye size={16} />
                          <span>{currentViewers} 观众</span>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-3 mb-6">
                      {!isLive ? (
                        <button
                          onClick={handleStartStream}
                          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
                        >
                          <Play size={20} />
                          <span>开始直播</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleStopStream}
                          className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
                        >
                          <Square size={20} />
                          <span>结束直播</span>
                        </button>
                      )}
                      
                      <button
                        onClick={() => setIsRecording(!isRecording)}
                        className={`${isRecording ? 'bg-red-500' : 'bg-slate-600'} hover:bg-opacity-80 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2`}
                      >
                        <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-white animate-pulse' : 'bg-slate-400'}`}></div>
                        <span>{isRecording ? '录制中' : '开始录制'}</span>
                      </button>
                    </div>

                    {/* Device Controls */}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setMicEnabled(!micEnabled)}
                        className={`${micEnabled ? 'bg-slate-600' : 'bg-red-500'} hover:bg-opacity-80 text-white p-3 rounded-lg transition-colors`}
                      >
                        {micEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                      </button>
                      
                      <button
                        onClick={() => setCameraEnabled(!cameraEnabled)}
                        className={`${cameraEnabled ? 'bg-slate-600' : 'bg-red-500'} hover:bg-opacity-80 text-white p-3 rounded-lg transition-colors`}
                      >
                        {cameraEnabled ? <Camera size={20} /> : <VideoOff size={20} />}
                      </button>
                      
                      <button className="bg-slate-600 hover:bg-slate-700 text-white p-3 rounded-lg transition-colors">
                        <Monitor size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clock className="text-blue-400" size={20} />
                        <span className="text-white">直播时长</span>
                      </div>
                      <span className="text-slate-400">{isLive ? '00:00:00' : '—'}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Gift className="text-yellow-400" size={20} />
                        <span className="text-white">今日收益</span>
                      </div>
                      <span className="text-slate-400">0 代币</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <MessageCircle className="text-green-400" size={20} />
                        <span className="text-white">消息数</span>
                      </div>
                      <span className="text-slate-400">0</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Verification Required Message */}
            {!isVerified && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-8 mb-8"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-500/20 p-4 rounded-full">
                    <Lock className="text-yellow-400" size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">完成实名认证开始直播</h3>
                    <p className="text-slate-300 mb-4">
                      为了保障平台安全和用户权益，需要完成实名认证后才能开始直播。
                    </p>
                    <button
                      onClick={() => setShowVerificationModal(true)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-bold transition-colors flex items-center space-x-2"
                    >
                      <Shield size={20} />
                      <span>立即认证</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Start Broadcasting Section - Only show if verified */}
            {isVerified && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-8 mb-8 text-white relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <Video className="text-white" size={32} />
                        <h2 className="text-3xl font-bold">准备开播？</h2>
                      </div>
                      <p className="text-white/90 text-lg mb-6">
                        学习相机和直播间创作获得更多收益！
                      </p>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={handleStartStream}
                          disabled={isLive}
                          className={`${isLive ? 'bg-white/20 cursor-not-allowed' : 'bg-white hover:bg-white/90'} text-red-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center space-x-3 shadow-lg`}
                        >
                          <Play size={24} />
                          <span>{isLive ? '正在直播中' : '立即开播'}</span>
                          {!isLive && <ArrowRight size={20} />}
                        </button>
                        
                        <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-4 rounded-xl font-medium transition-colors flex items-center space-x-2">
                          <Lightbulb size={20} />
                          <span>学习技巧</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="hidden lg:block">
                      <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                        <Camera className="text-white" size={48} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Promotional Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 text-white relative overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Public Show recordings</h3>
                  <h2 className="text-2xl font-bold text-yellow-300 mb-2">& Video editor</h2>
                  <p className="text-sm opacity-90 mb-4">Save the Recording?</p>
                  <div className="flex items-center space-x-2">
                    <span className="bg-white/20 px-2 py-1 rounded text-xs">NEW</span>
                    <span className="text-sm">My Media Collection</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Video className="text-white/50" size={32} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-6 text-white relative overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Pride Celebration</h3>
                  <h2 className="text-2xl font-bold mb-2">all June long</h2>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl">🏳️‍🌈</span>
                    <span className="text-2xl">😊</span>
                    <span className="text-2xl">🎉</span>
                  </div>
                  <p className="text-sm opacity-90">Join the celebration!</p>
                </div>
                <div className="absolute top-4 right-4">
                  <Crown className="text-white/50" size={32} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white relative overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Gender-aligned</h3>
                  <h2 className="text-2xl font-bold text-pink-300 mb-2">activity list</h2>
                  <p className="text-sm opacity-90 mb-4">My Menu Activities</p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <span className="bg-white/20 px-2 py-1 rounded">Messaging</span>
                    <span className="bg-white/20 px-2 py-1 rounded">Streaming</span>
                    <span className="bg-white/20 px-2 py-1 rounded">Modeling</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Target className="text-white/50" size={32} />
                </div>
              </motion.div>
            </div>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-slate-800 rounded-xl p-6 mb-8 border border-red-500/20"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-red-500/20 p-3 rounded-full">
                  <Shield className="text-red-400" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-2">注意</h3>
                  <div className="text-slate-300 space-y-2">
                    <p>• 运营者会有代币保护机制行为的保障</p>
                    <p>• 不要与任何人透露您的个人信息</p>
                    <p>• Stripchat官方管理员绝不会向您索取密码标识！</p>
                  </div>
                  <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors">
                    获得安全小贴士
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Setup Live Stream Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <button className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-xl font-bold text-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3 mx-auto">
                <Settings size={24} />
                <span>设置直播</span>
                <ArrowRight size={20} />
              </button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-8 bg-slate-800 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6">快速操作</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg transition-colors flex flex-col items-center space-y-2">
                  <Settings size={24} />
                  <span className="text-sm">直播设置</span>
                </button>
                
                <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg transition-colors flex flex-col items-center space-y-2">
                  <Award size={24} />
                  <span className="text-sm">我的奖励</span>
                </button>
                
                <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg transition-colors flex flex-col items-center space-y-2">
                  <BarChart3 size={24} />
                  <span className="text-sm">收益统计</span>
                </button>
                
                <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg transition-colors flex flex-col items-center space-y-2">
                  <RefreshCw size={24} />
                  <span className="text-sm">刷新数据</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default StreamerDashboard;