import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
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
  User,
  Lock
} from 'lucide-react';
import AuthModal from './AuthModal';

interface AdminDashboardProps {
  onBackToHome: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication and admin status on component mount
  useEffect(() => {
    const checkAuth = () => {
      // Simulate checking authentication status
      // In a real app, this would check JWT token, session, etc.
      const token = localStorage.getItem('authToken');
      const userRole = localStorage.getItem('userRole');
      
      if (token) {
        setIsLoggedIn(true);
        // Check if user is admin
        if (userRole === 'admin') {
          setIsAdmin(true);
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleAuthSuccess = () => {
    // Simulate successful login with admin privileges
    localStorage.setItem('authToken', 'mock-token');
    localStorage.setItem('userRole', 'admin');
    setIsLoggedIn(true);
    setIsAdmin(true);
    setAuthModalOpen(false);
  };

  // 模拟数据
  const [stats, setStats] = useState({
    totalUsers: 15847,
    totalStreamers: 2341,
    onlineStreamers: 456,
    activeRooms: 234,
    totalRevenue: 125847.50,
    todayRevenue: 3247.80,
    totalMessages: 89234,
    todayMessages: 1247
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
      isActive: true,
      lastLogin: '2024-01-15 14:30',
      totalSpent: 5420,
      joinDate: '2023-06-15'
    },
    {
      id: 2,
      username: 'streamer_girl',
      email: 'streamer@example.com',
      level: 12,
      tokens: 8750,
      vipLevel: 'diamond',
      country: 'US',
      isActive: true,
      lastLogin: '2024-01-15 16:45',
      totalSpent: 12340,
      joinDate: '2023-03-20'
    },
    {
      id: 3,
      username: 'banned_user',
      email: 'banned@example.com',
      level: 3,
      tokens: 0,
      vipLevel: 'none',
      country: 'UK',
      isActive: false,
      lastLogin: '2024-01-10 09:15',
      totalSpent: 230,
      joinDate: '2023-12-01'
    }
  ]);

  const [streamers, setStreamers] = useState([
    {
      id: 1,
      userId: 2,
      username: 'streamer_girl',
      stageName: 'AngelGirl',
      category: '聊天',
      isVerified: true,
      isOnline: true,
      currentViewers: 234,
      totalFollowers: 5420,
      totalEarnings: 12450.50,
      rating: 4.8,
      status: 'live',
      joinDate: '2023-03-20'
    },
    {
      id: 2,
      userId: 4,
      username: 'new_streamer',
      stageName: 'CuteKitty',
      category: '舞蹈',
      isVerified: false,
      isOnline: false,
      currentViewers: 0,
      totalFollowers: 156,
      totalEarnings: 234.80,
      rating: 4.2,
      status: 'offline',
      joinDate: '2024-01-10'
    }
  ]);

  const tabs = [
    { id: 'dashboard', label: '仪表板', icon: BarChart3 },
    { id: 'users', label: '用户管理', icon: Users },
    { id: 'streamers', label: '主播管理', icon: Video },
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
            <TrendingUp size={14} className={trend === 'down' ? 'rotate-180' : ''} />
            <span>{change}</span>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-slate-400 text-sm">{title}</div>
    </motion.div>
  );

  const handleUserAction = (action: string, userId: number) => {
    switch (action) {
      case 'ban':
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, isActive: false } : user
        ));
        break;
      case 'unban':
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, isActive: true } : user
        ));
        break;
      case 'view':
        const user = users.find(u => u.id === userId);
        setSelectedUser(user);
        setShowUserModal(true);
        break;
    }
  };

  const handleStreamerVerify = (streamerId: number, verified: boolean) => {
    setStreamers(prev => prev.map(streamer => 
      streamer.id === streamerId ? { ...streamer, isVerified: verified } : streamer
    ));
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

  const getVipLevelIcon = (level: string) => {
    switch (level) {
      case 'diamond': return <Crown className="text-blue-400" size={16} />;
      case 'platinum': return <Crown className="text-gray-300" size={16} />;
      case 'gold': return <Crown className="text-yellow-400" size={16} />;
      case 'silver': return <Crown className="text-gray-400" size={16} />;
      default: return null;
    }
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">验证身份中...</p>
        </div>
      </div>
    );
  }

  // Show login required message if not logged in
  if (!isLoggedIn) {
    return (
      <>
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 rounded-xl p-8 max-w-md w-full mx-4 text-center"
          >
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="text-red-400" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">需要登录</h2>
            <p className="text-slate-400 mb-6">
              访问管理员后台需要先登录您的管理员账户
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setAuthModalOpen(true)}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition-colors"
              >
                管理员登录
              </button>
              <button
                onClick={onBackToHome}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg transition-colors"
              >
                返回首页
              </button>
            </div>
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-400 text-sm">
                测试管理员账号：<span className="font-mono">admin</span><br />
                测试密码：<span className="font-mono">admin123</span>
              </p>
            </div>
          </motion.div>
        </div>

        <AuthModal 
          isOpen={authModalOpen} 
          onClose={() => setAuthModalOpen(false)}
          initialMode="login"
          onAuthSuccess={handleAuthSuccess}
        />
      </>
    );
  }

  // Show access denied if logged in but not admin
  if (isLoggedIn && !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 rounded-xl p-8 max-w-md w-full mx-4 text-center"
        >
          <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="text-yellow-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">权限不足</h2>
          <p className="text-slate-400 mb-6">
            您没有访问管理员后台的权限。请联系系统管理员。
          </p>
          <button
            onClick={onBackToHome}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg transition-colors"
          >
            返回首页
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">用户详情</h2>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-slate-400 text-sm">用户名</label>
                  <div className="text-white font-medium">{selectedUser.username}</div>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">邮箱</label>
                  <div className="text-white">{selectedUser.email}</div>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">等级</label>
                  <div className="text-white">{selectedUser.level}</div>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">代币余额</label>
                  <div className="text-white">{selectedUser.tokens.toLocaleString()}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-slate-400 text-sm">VIP等级</label>
                  <div className={`flex items-center space-x-2 ${getVipLevelColor(selectedUser.vipLevel)}`}>
                    {getVipLevelIcon(selectedUser.vipLevel)}
                    <span className="capitalize">{selectedUser.vipLevel}</span>
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">国家</label>
                  <div className="text-white">{selectedUser.country}</div>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">状态</label>
                  <div className={`flex items-center space-x-2 ${selectedUser.isActive ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedUser.isActive ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    <span>{selectedUser.isActive ? '正常' : '已封禁'}</span>
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">总消费</label>
                  <div className="text-white">${selectedUser.totalSpent.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => handleUserAction(selectedUser.isActive ? 'ban' : 'unban', selectedUser.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedUser.isActive 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {selectedUser.isActive ? '封禁用户' : '解封用户'}
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                发送消息
              </button>
              <button className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors">
                查看日志
              </button>
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
              <div className="flex items-center space-x-3">
                <Shield className="text-red-500" size={32} />
                <div>
                  <h1 className="text-3xl font-bold text-white">管理员后台</h1>
                  <p className="text-slate-400 mt-1">系统管理与监控</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-slate-400 text-sm">
                欢迎，管理员
              </div>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                <Bell size={16} />
                <span>通知</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">3</span>
              </button>
              <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
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
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
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
                title="在线主播"
                value={`${stats.onlineStreamers}/${stats.totalStreamers}`}
                change="+5%"
                trend="up"
                color="bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/30"
              />
              <StatCard
                icon={<DollarSign size={24} />}
                title="今日收益"
                value={`$${stats.todayRevenue.toLocaleString()}`}
                change="+8%"
                trend="up"
                color="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
              />
              <StatCard
                icon={<MessageCircle size={24} />}
                title="今日消息"
                value={stats.todayMessages.toLocaleString()}
                change="-3%"
                trend="down"
                color="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30"
              />
            </div>

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">收益趋势</h3>
                <div className="h-64 bg-slate-700 rounded-lg flex items-center justify-center">
                  <div className="text-slate-400">收益图表区域</div>
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-800 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">最近活动</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-slate-700 rounded-lg">
                    <UserCheck className="text-green-400" size={20} />
                    <div className="flex-1">
                      <div className="text-white text-sm">新用户注册</div>
                      <div className="text-slate-400 text-xs">user123 刚刚注册</div>
                    </div>
                    <div className="text-slate-400 text-xs">2分钟前</div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-slate-700 rounded-lg">
                    <Video className="text-blue-400" size={20} />
                    <div className="flex-1">
                      <div className="text-white text-sm">主播开始直播</div>
                      <div className="text-slate-400 text-xs">AngelGirl 开始了直播</div>
                    </div>
                    <div className="text-slate-400 text-xs">5分钟前</div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-slate-700 rounded-lg">
                    <AlertTriangle className="text-yellow-400" size={20} />
                    <div className="flex-1">
                      <div className="text-white text-sm">新举报</div>
                      <div className="text-slate-400 text-xs">用户举报不当内容</div>
                    </div>
                    <div className="text-slate-400 text-xs">10分钟前</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="搜索用户..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-slate-800 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-700 focus:border-red-500 focus:outline-none w-64"
                  />
                </div>
                <button className="bg-slate-800 text-slate-400 hover:text-white p-2 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                  <Filter size={20} />
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                  <Plus size={16} />
                  <span>添加用户</span>
                </button>
                <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                  <Download size={16} />
                  <span>导出</span>
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-slate-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="text-left p-4 text-slate-300">
                        <input type="checkbox" className="rounded" />
                      </th>
                      <th className="text-left p-4 text-slate-300">用户</th>
                      <th className="text-left p-4 text-slate-300">等级</th>
                      <th className="text-left p-4 text-slate-300">VIP</th>
                      <th className="text-left p-4 text-slate-300">代币</th>
                      <th className="text-left p-4 text-slate-300">状态</th>
                      <th className="text-left p-4 text-slate-300">最后登录</th>
                      <th className="text-left p-4 text-slate-300">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.filter(user => 
                      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      user.email.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((user) => (
                      <tr key={user.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                        <td className="p-4">
                          <input type="checkbox" className="rounded" />
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="text-white font-medium">{user.username}</div>
                            <div className="text-slate-400 text-sm">{user.email}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">{user.level}</span>
                            </div>
                            <span className="text-white">{user.level}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className={`flex items-center space-x-2 ${getVipLevelColor(user.vipLevel)}`}>
                            {getVipLevelIcon(user.vipLevel)}
                            <span className="capitalize">{user.vipLevel}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-white">{user.tokens.toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                          <div className={`flex items-center space-x-2 ${user.isActive ? 'text-green-400' : 'text-red-400'}`}>
                            {user.isActive ? <CheckCircle size={16} /> : <XCircle size={16} />}
                            <span>{user.isActive ? '正常' : '封禁'}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-slate-400 text-sm">{user.lastLogin}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleUserAction('view', user.id)}
                              className="text-blue-400 hover:text-blue-300 p-1"
                            >
                              <Eye size={16} />
                            </button>
                            <button className="text-slate-400 hover:text-white p-1">
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleUserAction(user.isActive ? 'ban' : 'unban', user.id)}
                              className={`p-1 ${user.isActive ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'}`}
                            >
                              {user.isActive ? <Ban size={16} /> : <CheckCircle size={16} />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Streamers Tab */}
        {activeTab === 'streamers' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="搜索主播..."
                    className="bg-slate-800 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-700 focus:border-red-500 focus:outline-none w-64"
                  />
                </div>
                <select className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-red-500 focus:outline-none">
                  <option value="all">所有状态</option>
                  <option value="online">在线</option>
                  <option value="offline">离线</option>
                  <option value="verified">已认证</option>
                  <option value="unverified">未认证</option>
                </select>
              </div>
              
              <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                <Download size={16} />
                <span>导出数据</span>
              </button>
            </div>

            {/* Streamers Table */}
            <div className="bg-slate-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="text-left p-4 text-slate-300">主播</th>
                      <th className="text-left p-4 text-slate-300">分类</th>
                      <th className="text-left p-4 text-slate-300">状态</th>
                      <th className="text-left p-4 text-slate-300">观众</th>
                      <th className="text-left p-4 text-slate-300">关注者</th>
                      <th className="text-left p-4 text-slate-300">收益</th>
                      <th className="text-left p-4 text-slate-300">评分</th>
                      <th className="text-left p-4 text-slate-300">认证</th>
                      <th className="text-left p-4 text-slate-300">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {streamers.map((streamer) => (
                      <tr key={streamer.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                              <Video className="text-white" size={16} />
                            </div>
                            <div>
                              <div className="text-white font-medium">{streamer.stageName}</div>
                              <div className="text-slate-400 text-sm">@{streamer.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-sm">
                            {streamer.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className={`flex items-center space-x-2 ${streamer.isOnline ? 'text-green-400' : 'text-slate-400'}`}>
                            <div className={`w-2 h-2 rounded-full ${streamer.isOnline ? 'bg-green-400' : 'bg-slate-400'}`}></div>
                            <span>{streamer.status}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-white">{streamer.currentViewers}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-white">{streamer.totalFollowers.toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-white">${streamer.totalEarnings.toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-1">
                            <Star className="text-yellow-400" size={14} />
                            <span className="text-white">{streamer.rating}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          {streamer.isVerified ? (
                            <div className="flex items-center space-x-1 text-green-400">
                              <CheckCircle size={16} />
                              <span>已认证</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1 text-yellow-400">
                              <Clock size={16} />
                              <span>待认证</span>
                            </div>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-400 hover:text-blue-300 p-1">
                              <Eye size={16} />
                            </button>
                            {!streamer.isVerified && (
                              <button
                                onClick={() => handleStreamerVerify(streamer.id, true)}
                                className="text-green-400 hover:text-green-300 p-1"
                              >
                                <CheckCircle size={16} />
                              </button>
                            )}
                            <button className="text-slate-400 hover:text-white p-1">
                              <MoreHorizontal size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">举报管理</h3>
              <div className="text-center py-16">
                <AlertTriangle className="text-slate-400 mx-auto mb-4" size={64} />
                <h4 className="text-lg font-medium text-white mb-2">暂无举报</h4>
                <p className="text-slate-400">当有新的举报时，它们会出现在这里</p>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">用户增长</h3>
                <div className="h-64 bg-slate-700 rounded-lg flex items-center justify-center">
                  <div className="text-slate-400">用户增长图表</div>
                </div>
              </div>
              
              <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">收益分析</h3>
                <div className="h-64 bg-slate-700 rounded-lg flex items-center justify-center">
                  <div className="text-slate-400">收益分析图表</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">系统设置</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-4">平台设置</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">允许新用户注册</span>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">需要邮箱验证</span>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">维护模式</span>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-600">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-4">安全设置</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">强制双重认证</span>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-600">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1 transition-transform" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">IP限制</span>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">自动封禁可疑账户</span>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors">
                  保存设置
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;