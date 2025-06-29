import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Video, 
  BarChart3, 
  Settings, 
  Shield, 
  AlertTriangle,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  XCircle,
  Crown,
  Star,
  TrendingUp,
  DollarSign,
  MessageCircle,
  Calendar,
  Clock,
  Globe,
  Zap,
  RefreshCw,
  Plus,
  MoreHorizontal,
  UserCheck,
  UserX,
  Activity,
  Database,
  Mail,
  Bell,
  FileText,
  PieChart,
  Target,
  Award,
  CreditCard,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  TrendingDown,
  Wallet,
  Building,
  Calendar as CalendarIcon,
  ExternalLink,
  Key,
  Server,
  Copy,
  Save,
  Lock,
  Unlock,
  Monitor,
  HardDrive,
  Cpu,
  MemoryStick,
  Wifi,
  MapPin,
  Phone,
  Camera,
  Mic,
  Gift,
  Heart,
  Flag,
  UserPlus,
  UserMinus,
  Verified,
  X
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToHome: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showStreamerModal, setShowStreamerModal] = useState(false);
  const [selectedStreamer, setSelectedStreamer] = useState<any>(null);
  const [userFilter, setUserFilter] = useState('all');
  const [streamerFilter, setStreamerFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');

  // 模拟数据
  const [stats, setStats] = useState({
    totalUsers: 15847,
    totalStreamers: 2341,
    onlineStreamers: 456,
    activeRooms: 234,
    totalRevenue: 125847.50,
    todayRevenue: 3247.80,
    totalMessages: 89234,
    todayMessages: 1247,
    totalTransactions: 45623,
    todayTransactions: 234,
    totalRefunds: 1247,
    pendingPayouts: 15420.30,
    averageTransactionValue: 27.50,
    paymentSuccessRate: 98.5,
    bannedUsers: 234,
    verifiedStreamers: 1456,
    pendingVerifications: 89
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'user123',
      email: 'user123@example.com',
      level: 7,
      tokens: 1250,
      vipLevel: 'gold',
      country: 'CN',
      age: 25,
      gender: 'female',
      isActive: true,
      isBanned: false,
      lastLogin: '2024-01-15 14:30',
      totalSpent: 5420,
      joinDate: '2023-06-15',
      avatar: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=100',
      loginCount: 245,
      deviceInfo: 'Chrome on Windows',
      ipAddress: '192.168.1.1',
      referralCode: 'REF123',
      totalReferrals: 5
    },
    {
      id: 2,
      username: 'streamer_girl',
      email: 'streamer@example.com',
      level: 12,
      tokens: 8750,
      vipLevel: 'diamond',
      country: 'US',
      age: 22,
      gender: 'female',
      isActive: true,
      isBanned: false,
      lastLogin: '2024-01-15 16:45',
      totalSpent: 12340,
      joinDate: '2023-03-20',
      avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=100',
      loginCount: 456,
      deviceInfo: 'Safari on iPhone',
      ipAddress: '10.0.0.1',
      referralCode: 'REF456',
      totalReferrals: 12
    },
    {
      id: 3,
      username: 'premium_user',
      email: 'premium@example.com',
      level: 15,
      tokens: 15000,
      vipLevel: 'platinum',
      country: 'JP',
      age: 28,
      gender: 'male',
      isActive: true,
      isBanned: false,
      lastLogin: '2024-01-15 18:20',
      totalSpent: 25000,
      joinDate: '2023-01-10',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      loginCount: 789,
      deviceInfo: 'Chrome on Mac',
      ipAddress: '172.16.0.1',
      referralCode: 'REF789',
      totalReferrals: 25
    }
  ]);

  const [streamers, setStreamers] = useState([
    {
      id: 1,
      userId: 2,
      username: 'streamer_girl',
      email: 'streamer@example.com',
      stageName: 'AngelGirl',
      category: '聊天',
      isVerified: true,
      isOnline: true,
      status: 'live',
      currentViewers: 1234,
      totalFollowers: 5678,
      totalEarnings: 12500.50,
      rating: 4.8,
      totalRatings: 456,
      vipLevel: 'diamond',
      roomStatus: 'live',
      lastSeen: '2024-01-15 16:45',
      createdAt: '2023-03-20',
      avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=100',
      country: 'US',
      age: 22,
      languages: ['English', 'Spanish'],
      tags: ['新人', '可爱', '聊天'],
      hourlyRate: 50,
      privateRate: 100,
      totalShows: 234,
      averageShowDuration: 45,
      topSpender: 'premium_user',
      verificationDate: '2023-04-01',
      documentsStatus: 'approved',
      payoutMethod: 'PayPal',
      taxInfo: 'completed'
    },
    {
      id: 2,
      userId: 4,
      username: 'hot_model',
      email: 'model@example.com',
      stageName: 'HotBabe',
      category: '舞蹈',
      isVerified: false,
      isOnline: false,
      status: 'offline',
      currentViewers: 0,
      totalFollowers: 2345,
      totalEarnings: 8750.25,
      rating: 4.5,
      totalRatings: 234,
      vipLevel: 'gold',
      roomStatus: 'offline',
      lastSeen: '2024-01-15 12:30',
      createdAt: '2023-08-15',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
      country: 'BR',
      age: 24,
      languages: ['Portuguese', 'English'],
      tags: ['舞蹈', '热情', '互动'],
      hourlyRate: 40,
      privateRate: 80,
      totalShows: 156,
      averageShowDuration: 38,
      topSpender: 'user123',
      verificationDate: null,
      documentsStatus: 'pending',
      payoutMethod: 'Bank Transfer',
      taxInfo: 'pending'
    }
  ]);

  const tabs = [
    { id: 'dashboard', label: '仪表板', icon: BarChart3 },
    { id: 'users', label: '用户管理', icon: Users },
    { id: 'streamers', label: '主播管理', icon: Video },
    { id: 'payments', label: '支付管理', icon: CreditCard },
    { id: 'api-keys', label: 'API密钥', icon: Key },
    { id: 'server-config', label: '服务器配置', icon: Server },
    { id: 'reports', label: '举报管理', icon: AlertTriangle },
    { id: 'analytics', label: '数据分析', icon: PieChart },
    { id: 'settings', label: '系统设置', icon: Settings }
  ];

  const StatCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    value: string | number;
    change?: string;
    color?: string;
    trend?: 'up' | 'down' | 'neutral';
  }> = ({ icon, title, value, change, color = 'bg-slate-800', trend = 'neutral' }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`${color} rounded-xl p-6 transition-all duration-300 hover:shadow-lg`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-slate-400">{icon}</div>
        {change && (
          <div className={`flex items-center space-x-1 text-sm ${
            trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-slate-400'
          }`}>
            {trend === 'up' ? <TrendingUp size={14} /> : trend === 'down' ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
            <span>{change}</span>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-slate-400 text-sm">{title}</div>
    </motion.div>
  );

  const handleUserAction = (action: string, userId: number) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    switch (action) {
      case 'ban':
        setUsers(prev => prev.map(u => 
          u.id === userId ? { ...u, isBanned: true, isActive: false } : u
        ));
        break;
      case 'unban':
        setUsers(prev => prev.map(u => 
          u.id === userId ? { ...u, isBanned: false, isActive: true } : u
        ));
        break;
      case 'delete':
        if (confirm('确定要删除这个用户吗？此操作不可恢复。')) {
          setUsers(prev => prev.filter(u => u.id !== userId));
        }
        break;
      case 'view':
        setSelectedUser(user);
        setShowUserModal(true);
        break;
    }
  };

  const handleStreamerAction = (action: string, streamerId: number) => {
    const streamer = streamers.find(s => s.id === streamerId);
    if (!streamer) return;

    switch (action) {
      case 'verify':
        setStreamers(prev => prev.map(s => 
          s.id === streamerId ? { ...s, isVerified: true, verificationDate: new Date().toISOString().split('T')[0] } : s
        ));
        break;
      case 'unverify':
        setStreamers(prev => prev.map(s => 
          s.id === streamerId ? { ...s, isVerified: false, verificationDate: null } : s
        ));
        break;
      case 'ban':
        setStreamers(prev => prev.map(s => 
          s.id === streamerId ? { ...s, status: 'banned', isOnline: false } : s
        ));
        break;
      case 'view':
        setSelectedStreamer(streamer);
        setShowStreamerModal(true);
        break;
    }
  };

  const getVipLevelColor = (level: string) => {
    switch (level) {
      case 'diamond': return 'text-blue-400';
      case 'platinum': return 'text-gray-300';
      case 'gold': return 'text-yellow-400';
      case 'silver': return 'text-gray-400';
      default: return 'text-slate-400';
    }
  };

  const getVipLevelBg = (level: string) => {
    switch (level) {
      case 'diamond': return 'bg-blue-500/20';
      case 'platinum': return 'bg-gray-500/20';
      case 'gold': return 'bg-yellow-500/20';
      case 'silver': return 'bg-gray-400/20';
      default: return 'bg-slate-500/20';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchTerm || 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = userFilter === 'all' ||
      (userFilter === 'active' && user.isActive) ||
      (userFilter === 'banned' && user.isBanned) ||
      (userFilter === 'vip' && user.vipLevel !== 'none');
    
    return matchesSearch && matchesFilter;
  });

  const filteredStreamers = streamers.filter(streamer => {
    const matchesSearch = !searchTerm || 
      streamer.stageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      streamer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      streamer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = streamerFilter === 'all' ||
      (streamerFilter === 'verified' && streamer.isVerified) ||
      (streamerFilter === 'pending' && !streamer.isVerified) ||
      (streamerFilter === 'online' && streamer.isOnline) ||
      (streamerFilter === 'earning' && streamer.totalEarnings > 1000);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-900">
      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">用户详情</h2>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={selectedUser.avatar} 
                    alt={selectedUser.username}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedUser.username}</h3>
                    <p className="text-slate-400">{selectedUser.email}</p>
                    <div className={`inline-flex items-center px-2 py-1 rounded text-xs ${getVipLevelBg(selectedUser.vipLevel)} ${getVipLevelColor(selectedUser.vipLevel)}`}>
                      <Crown size={12} className="mr-1" />
                      {selectedUser.vipLevel.toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <div className="text-slate-400 text-sm">等级</div>
                    <div className="text-white font-bold">{selectedUser.level}</div>
                  </div>
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <div className="text-slate-400 text-sm">代币</div>
                    <div className="text-white font-bold">{selectedUser.tokens.toLocaleString()}</div>
                  </div>
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <div className="text-slate-400 text-sm">总消费</div>
                    <div className="text-white font-bold">${selectedUser.totalSpent.toLocaleString()}</div>
                  </div>
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <div className="text-slate-400 text-sm">推荐人数</div>
                    <div className="text-white font-bold">{selectedUser.totalReferrals}</div>
                  </div>
                </div>
              </div>

              {/* Account Info */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white">账户信息</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">国家</span>
                    <span className="text-white">{selectedUser.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">年龄</span>
                    <span className="text-white">{selectedUser.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">性别</span>
                    <span className="text-white">{selectedUser.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">注册时间</span>
                    <span className="text-white">{selectedUser.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">最后登录</span>
                    <span className="text-white">{selectedUser.lastLogin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">登录次数</span>
                    <span className="text-white">{selectedUser.loginCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">设备信息</span>
                    <span className="text-white">{selectedUser.deviceInfo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">IP地址</span>
                    <span className="text-white">{selectedUser.ipAddress}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 mt-6 pt-6 border-t border-slate-700">
              <button
                onClick={() => handleUserAction(selectedUser.isBanned ? 'unban' : 'ban', selectedUser.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedUser.isBanned 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {selectedUser.isBanned ? '解封账户' : '封禁账户'}
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                发送消息
              </button>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors">
                调整等级
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                赠送代币
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Streamer Detail Modal */}
      {showStreamerModal && selectedStreamer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 rounded-xl p-6 max-w-5xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">主播详情</h2>
              <button
                onClick={() => setShowStreamerModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="text-center">
                  <img 
                    src={selectedStreamer.avatar} 
                    alt={selectedStreamer.stageName}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-white">{selectedStreamer.stageName}</h3>
                  <p className="text-slate-400">@{selectedStreamer.username}</p>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    {selectedStreamer.isVerified && (
                      <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs flex items-center">
                        <Verified size={12} className="mr-1" />
                        已认证
                      </div>
                    )}
                    <div className={`px-2 py-1 rounded text-xs ${
                      selectedStreamer.isOnline ? 'bg-green-500/20 text-green-400' : 'bg-slate-500/20 text-slate-400'
                    }`}>
                      {selectedStreamer.isOnline ? '在线' : '离线'}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <div className="text-slate-400 text-sm">分类</div>
                    <div className="text-white">{selectedStreamer.category}</div>
                  </div>
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <div className="text-slate-400 text-sm">国家</div>
                    <div className="text-white">{selectedStreamer.country}</div>
                  </div>
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <div className="text-slate-400 text-sm">年龄</div>
                    <div className="text-white">{selectedStreamer.age}</div>
                  </div>
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <div className="text-slate-400 text-sm">语言</div>
                    <div className="text-white">{selectedStreamer.languages.join(', ')}</div>
                  </div>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white">表现统计</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-700 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white">{selectedStreamer.currentViewers}</div>
                    <div className="text-slate-400 text-xs">当前观众</div>
                  </div>
                  <div className="bg-slate-700 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white">{selectedStreamer.totalFollowers.toLocaleString()}</div>
                    <div className="text-slate-400 text-xs">总关注</div>
                  </div>
                  <div className="bg-slate-700 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-400">${selectedStreamer.totalEarnings.toLocaleString()}</div>
                    <div className="text-slate-400 text-xs">总收益</div>
                  </div>
                  <div className="bg-slate-700 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-400">{selectedStreamer.rating}</div>
                    <div className="text-slate-400 text-xs">评分</div>
                  </div>
                  <div className="bg-slate-700 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white">{selectedStreamer.totalShows}</div>
                    <div className="text-slate-400 text-xs">总场次</div>
                  </div>
                  <div className="bg-slate-700 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white">{selectedStreamer.averageShowDuration}分</div>
                    <div className="text-slate-400 text-xs">平均时长</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">小时费率</span>
                    <span className="text-white">${selectedStreamer.hourlyRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">私人费率</span>
                    <span className="text-white">${selectedStreamer.privateRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">最大消费者</span>
                    <span className="text-white">{selectedStreamer.topSpender}</span>
                  </div>
                </div>
              </div>

              {/* Account & Verification */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white">账户与认证</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">邮箱</span>
                    <span className="text-white text-sm">{selectedStreamer.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">注册时间</span>
                    <span className="text-white">{selectedStreamer.createdAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">认证时间</span>
                    <span className="text-white">{selectedStreamer.verificationDate || '未认证'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">文档状态</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      selectedStreamer.documentsStatus === 'approved' ? 'bg-green-500/20 text-green-400' :
                      selectedStreamer.documentsStatus === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {selectedStreamer.documentsStatus === 'approved' ? '已批准' :
                       selectedStreamer.documentsStatus === 'pending' ? '待审核' : '已拒绝'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">支付方式</span>
                    <span className="text-white">{selectedStreamer.payoutMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">税务信息</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      selectedStreamer.taxInfo === 'completed' ? 'bg-green-500/20 text-green-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {selectedStreamer.taxInfo === 'completed' ? '已完成' : '待完成'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-slate-400 text-sm">标签</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedStreamer.tags.map((tag: string, index: number) => (
                      <span key={index} className="bg-slate-600 text-white px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 mt-6 pt-6 border-t border-slate-700">
              <button
                onClick={() => handleStreamerAction(selectedStreamer.isVerified ? 'unverify' : 'verify', selectedStreamer.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedStreamer.isVerified 
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {selectedStreamer.isVerified ? '取消认证' : '认证主播'}
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                发送消息
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                查看直播间
              </button>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors">
                财务记录
              </button>
              <button
                onClick={() => handleStreamerAction('ban', selectedStreamer.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                封禁主播
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="bg-slate-800 border-b border-slate-700 rounded-t-xl">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-b-xl p-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  icon={<Users size={24} />}
                  title="总用户数"
                  value={stats.totalUsers.toLocaleString()}
                  change="+12%"
                  trend="up"
                  color="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30"
                />
                <StatCard
                  icon={<Video size={24} />}
                  title="总主播数"
                  value={stats.totalStreamers.toLocaleString()}
                  change="+8%"
                  trend="up"
                  color="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                />
                <StatCard
                  icon={<DollarSign size={24} />}
                  title="今日收益"
                  value={`$${stats.todayRevenue.toLocaleString()}`}
                  change="+15%"
                  trend="up"
                  color="bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/30"
                />
                <StatCard
                  icon={<Activity size={24} />}
                  title="在线主播"
                  value={stats.onlineStreamers.toLocaleString()}
                  change="+5%"
                  trend="up"
                  color="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
                />
              </div>

              {/* Additional Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  icon={<Ban size={24} />}
                  title="封禁用户"
                  value={stats.bannedUsers.toLocaleString()}
                  color="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30"
                />
                <StatCard
                  icon={<CheckCircle size={24} />}
                  title="认证主播"
                  value={stats.verifiedStreamers.toLocaleString()}
                  color="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30"
                />
                <StatCard
                  icon={<Clock size={24} />}
                  title="待审核"
                  value={stats.pendingVerifications.toLocaleString()}
                  color="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/30"
                />
                <StatCard
                  icon={<MessageCircle size={24} />}
                  title="今日消息"
                  value={stats.todayMessages.toLocaleString()}
                  change="+23%"
                  trend="up"
                  color="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-500/30"
                />
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">用户管理</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="text"
                      placeholder="搜索用户..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-slate-700 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none w-64"
                    />
                  </div>
                  <select
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                    className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none"
                  >
                    <option value="all">所有用户</option>
                    <option value="active">活跃用户</option>
                    <option value="banned">封禁用户</option>
                    <option value="vip">VIP用户</option>
                  </select>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                    <UserPlus size={16} />
                    <span>添加用户</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-700 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-600">
                    <tr>
                      <th className="text-left p-4 text-slate-300">用户</th>
                      <th className="text-left p-4 text-slate-300">等级</th>
                      <th className="text-left p-4 text-slate-300">代币</th>
                      <th className="text-left p-4 text-slate-300">VIP</th>
                      <th className="text-left p-4 text-slate-300">总消费</th>
                      <th className="text-left p-4 text-slate-300">状态</th>
                      <th className="text-left p-4 text-slate-300">最后登录</th>
                      <th className="text-left p-4 text-slate-300">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-t border-slate-600 hover:bg-slate-600/50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={user.avatar} 
                              alt={user.username}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <div className="text-white font-medium">{user.username}</div>
                              <div className="text-slate-400 text-sm">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">{user.level}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-white">{user.tokens.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs ${getVipLevelBg(user.vipLevel)} ${getVipLevelColor(user.vipLevel)}`}>
                            {user.vipLevel.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4 text-white">${user.totalSpent.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            user.isBanned 
                              ? 'bg-red-500/20 text-red-400' 
                              : user.isActive 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-slate-500/20 text-slate-400'
                          }`}>
                            {user.isBanned ? '已封禁' : user.isActive ? '活跃' : '非活跃'}
                          </span>
                        </td>
                        <td className="p-4 text-slate-400 text-sm">{user.lastLogin}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleUserAction('view', user.id)}
                              className="text-blue-400 hover:text-blue-300"
                              title="查看详情"
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              onClick={() => handleUserAction(user.isBanned ? 'unban' : 'ban', user.id)}
                              className={user.isBanned ? 'text-green-400 hover:text-green-300' : 'text-red-400 hover:text-red-300'}
                              title={user.isBanned ? '解封' : '封禁'}
                            >
                              {user.isBanned ? <UserCheck size={16} /> : <Ban size={16} />}
                            </button>
                            <button 
                              onClick={() => handleUserAction('delete', user.id)}
                              className="text-red-400 hover:text-red-300"
                              title="删除用户"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Streamers Tab */}
          {activeTab === 'streamers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">主播管理</h2>
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
                    value={streamerFilter}
                    onChange={(e) => setStreamerFilter(e.target.value)}
                    className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none"
                  >
                    <option value="all">所有主播</option>
                    <option value="verified">已认证</option>
                    <option value="pending">待认证</option>
                    <option value="online">在线</option>
                    <option value="earning">高收益</option>
                  </select>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                    <Video size={16} />
                    <span>邀请主播</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-700 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-600">
                    <tr>
                      <th className="text-left p-4 text-slate-300">主播</th>
                      <th className="text-left p-4 text-slate-300">分类</th>
                      <th className="text-left p-4 text-slate-300">状态</th>
                      <th className="text-left p-4 text-slate-300">观众</th>
                      <th className="text-left p-4 text-slate-300">关注</th>
                      <th className="text-left p-4 text-slate-300">收益</th>
                      <th className="text-left p-4 text-slate-300">评分</th>
                      <th className="text-left p-4 text-slate-300">认证</th>
                      <th className="text-left p-4 text-slate-300">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStreamers.map((streamer) => (
                      <tr key={streamer.id} className="border-t border-slate-600 hover:bg-slate-600/50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={streamer.avatar} 
                              alt={streamer.stageName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <div className="text-white font-medium">{streamer.stageName}</div>
                              <div className="text-slate-400 text-sm">@{streamer.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">
                            {streamer.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${streamer.isOnline ? 'bg-green-400' : 'bg-slate-400'}`}></div>
                            <span className={`text-sm ${streamer.isOnline ? 'text-green-400' : 'text-slate-400'}`}>
                              {streamer.isOnline ? '在线' : '离线'}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-white">{streamer.currentViewers.toLocaleString()}</td>
                        <td className="p-4 text-white">{streamer.totalFollowers.toLocaleString()}</td>
                        <td className="p-4 text-green-400">${streamer.totalEarnings.toLocaleString()}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-1">
                            <Star className="text-yellow-400" size={14} />
                            <span className="text-white">{streamer.rating}</span>
                            <span className="text-slate-400 text-xs">({streamer.totalRatings})</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs flex items-center space-x-1 ${
                            streamer.isVerified 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {streamer.isVerified ? (
                              <>
                                <CheckCircle size={12} />
                                <span>已认证</span>
                              </>
                            ) : (
                              <>
                                <Clock size={12} />
                                <span>待认证</span>
                              </>
                            )}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleStreamerAction('view', streamer.id)}
                              className="text-blue-400 hover:text-blue-300"
                              title="查看详情"
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              onClick={() => handleStreamerAction(streamer.isVerified ? 'unverify' : 'verify', streamer.id)}
                              className={streamer.isVerified ? 'text-yellow-400 hover:text-yellow-300' : 'text-green-400 hover:text-green-300'}
                              title={streamer.isVerified ? '取消认证' : '认证'}
                            >
                              {streamer.isVerified ? <XCircle size={16} /> : <CheckCircle size={16} />}
                            </button>
                            <button 
                              onClick={() => handleStreamerAction('ban', streamer.id)}
                              className="text-red-400 hover:text-red-300"
                              title="封禁主播"
                            >
                              <Ban size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Other tabs remain the same... */}
          {activeTab === 'payments' && (
            <div className="text-center py-16">
              <CreditCard className="text-slate-400 mx-auto mb-4" size={64} />
              <h3 className="text-xl font-bold text-white mb-2">支付管理</h3>
              <p className="text-slate-400">支付管理功能正在开发中</p>
            </div>
          )}

          {activeTab === 'api-keys' && (
            <div className="text-center py-16">
              <Key className="text-slate-400 mx-auto mb-4" size={64} />
              <h3 className="text-xl font-bold text-white mb-2">API密钥</h3>
              <p className="text-slate-400">API密钥管理功能正在开发中</p>
            </div>
          )}

          {activeTab === 'server-config' && (
            <div className="text-center py-16">
              <Server className="text-slate-400 mx-auto mb-4" size={64} />
              <h3 className="text-xl font-bold text-white mb-2">服务器配置</h3>
              <p className="text-slate-400">服务器配置功能正在开发中</p>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="text-center py-16">
              <AlertTriangle className="text-slate-400 mx-auto mb-4" size={64} />
              <h3 className="text-xl font-bold text-white mb-2">举报管理</h3>
              <p className="text-slate-400">举报管理功能正在开发中</p>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="text-center py-16">
              <PieChart className="text-slate-400 mx-auto mb-4" size={64} />
              <h3 className="text-xl font-bold text-white mb-2">数据分析</h3>
              <p className="text-slate-400">数据分析功能正在开发中</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="text-center py-16">
              <Settings className="text-slate-400 mx-auto mb-4" size={64} />
              <h3 className="text-xl font-bold text-white mb-2">系统设置</h3>
              <p className="text-slate-400">系统设置功能正在开发中</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;