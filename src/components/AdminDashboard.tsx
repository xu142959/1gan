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
  ExternalLink
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
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

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
    // 支付相关统计
    totalTransactions: 45623,
    todayTransactions: 234,
    totalRefunds: 1247,
    pendingPayouts: 15420.30,
    averageTransactionValue: 27.50,
    paymentSuccessRate: 98.5
  });

  // 支付交易数据
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN-2024-001234',
      userId: 1,
      username: 'user123',
      type: 'token_purchase',
      amount: 99.99,
      tokens: 1000,
      status: 'completed',
      paymentMethod: 'credit_card',
      cardLast4: '4242',
      timestamp: '2024-01-15 14:30:25',
      description: '购买1000代币',
      fees: 2.99,
      netAmount: 97.00
    },
    {
      id: 'TXN-2024-001235',
      userId: 2,
      username: 'streamer_girl',
      type: 'payout',
      amount: 450.00,
      status: 'pending',
      paymentMethod: 'bank_transfer',
      timestamp: '2024-01-15 16:45:12',
      description: '主播收益提现',
      fees: 5.00,
      netAmount: 445.00
    },
    {
      id: 'TXN-2024-001236',
      userId: 3,
      username: 'vip_user',
      type: 'subscription',
      amount: 29.99,
      status: 'failed',
      paymentMethod: 'paypal',
      timestamp: '2024-01-15 18:20:45',
      description: 'VIP会员订阅',
      fees: 0.87,
      netAmount: 29.12,
      failureReason: '余额不足'
    },
    {
      id: 'TXN-2024-001237',
      userId: 4,
      username: 'regular_user',
      type: 'refund',
      amount: -19.99,
      status: 'completed',
      paymentMethod: 'credit_card',
      cardLast4: '1234',
      timestamp: '2024-01-15 12:15:30',
      description: '代币购买退款',
      fees: -0.60,
      netAmount: -19.39
    }
  ]);

  // 支付方式统计
  const [paymentMethods, setPaymentMethods] = useState([
    { method: 'credit_card', name: '信用卡', count: 28456, percentage: 62.3, revenue: 78234.50 },
    { method: 'paypal', name: 'PayPal', count: 12890, percentage: 28.2, revenue: 35678.90 },
    { method: 'bank_transfer', name: '银行转账', count: 3456, percentage: 7.6, revenue: 9876.40 },
    { method: 'crypto', name: '加密货币', count: 821, percentage: 1.9, revenue: 2057.70 }
  ]);

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
    { id: 'payments', label: '支付管理', icon: CreditCard },
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

  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/10';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10';
      case 'failed': return 'text-red-400 bg-red-400/10';
      case 'refunded': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  const getTransactionTypeIcon = (type: string) => {
    switch (type) {
      case 'token_purchase': return <Wallet className="text-green-400" size={16} />;
      case 'payout': return <ArrowUpRight className="text-blue-400" size={16} />;
      case 'subscription': return <Crown className="text-yellow-400" size={16} />;
      case 'refund': return <ArrowDownRight className="text-red-400" size={16} />;
      default: return <DollarSign className="text-slate-400" size={16} />;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'credit_card': return <CreditCard size={16} />;
      case 'paypal': return <Building size={16} />;
      case 'bank_transfer': return <Building size={16} />;
      case 'crypto': return <Zap size={16} />;
      default: return <CreditCard size={16} />;
    }
  };

  const handleTransactionAction = (action: string, transactionId: string) => {
    switch (action) {
      case 'view':
        const transaction = transactions.find(t => t.id === transactionId);
        setSelectedTransaction(transaction);
        setShowTransactionModal(true);
        break;
      case 'refund':
        // 处理退款逻辑
        console.log('Processing refund for:', transactionId);
        break;
      case 'retry':
        // 重试支付逻辑
        console.log('Retrying payment for:', transactionId);
        break;
    }
  };

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

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Transaction Detail Modal */}
      {showTransactionModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">交易详情</h2>
              <button
                onClick={() => setShowTransactionModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-slate-400 text-sm">交易ID</label>
                  <div className="text-white font-mono">{selectedTransaction.id}</div>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">用户</label>
                  <div className="text-white">{selectedTransaction.username}</div>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">交易类型</label>
                  <div className="flex items-center space-x-2">
                    {getTransactionTypeIcon(selectedTransaction.type)}
                    <span className="text-white">{selectedTransaction.description}</span>
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">金额</label>
                  <div className="text-white text-lg font-bold">
                    ${Math.abs(selectedTransaction.amount).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-slate-400 text-sm">状态</label>
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getTransactionStatusColor(selectedTransaction.status)}`}>
                    {selectedTransaction.status}
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">支付方式</label>
                  <div className="flex items-center space-x-2 text-white">
                    {getPaymentMethodIcon(selectedTransaction.paymentMethod)}
                    <span>{selectedTransaction.paymentMethod}</span>
                    {selectedTransaction.cardLast4 && (
                      <span className="text-slate-400">****{selectedTransaction.cardLast4}</span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">手续费</label>
                  <div className="text-white">${selectedTransaction.fees.toFixed(2)}</div>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">净收入</label>
                  <div className="text-white font-bold">${selectedTransaction.netAmount.toFixed(2)}</div>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">时间</label>
                  <div className="text-white">{selectedTransaction.timestamp}</div>
                </div>
              </div>
            </div>

            {selectedTransaction.failureReason && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center space-x-2 text-red-400">
                  <AlertCircle size={16} />
                  <span className="font-medium">失败原因</span>
                </div>
                <div className="text-red-300 mt-1">{selectedTransaction.failureReason}</div>
              </div>
            )}

            <div className="flex space-x-3 mt-6">
              {selectedTransaction.status === 'completed' && selectedTransaction.type !== 'refund' && (
                <button
                  onClick={() => handleTransactionAction('refund', selectedTransaction.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  处理退款
                </button>
              )}
              {selectedTransaction.status === 'failed' && (
                <button
                  onClick={() => handleTransactionAction('retry', selectedTransaction.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  重试支付
                </button>
              )}
              <button className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors">
                导出详情
              </button>
            </div>
          </motion.div>
        </div>
      )}

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
                  <div className="text-white capitalize">{selectedUser.vipLevel}</div>
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
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                查看交易记录
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                发送消息
              </button>
              <button className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors">
                查看日志
              </button>
            </div>
          </motion.div>
        </div>
      )}

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
                icon={<DollarSign size={24} />}
                title="今日收益"
                value={`$${stats.todayRevenue.toLocaleString()}`}
                change="+8%"
                trend="up"
                color="bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/30"
              />
              <StatCard
                icon={<CreditCard size={24} />}
                title="今日交易"
                value={stats.todayTransactions.toLocaleString()}
                change="+15%"
                trend="up"
                color="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
              />
              <StatCard
                icon={<TrendingUp size={24} />}
                title="支付成功率"
                value={`${stats.paymentSuccessRate}%`}
                change="+0.3%"
                trend="up"
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
                    <CreditCard className="text-green-400" size={20} />
                    <div className="flex-1">
                      <div className="text-white text-sm">新的代币购买</div>
                      <div className="text-slate-400 text-xs">user123 购买了1000代币</div>
                    </div>
                    <div className="text-slate-400 text-xs">2分钟前</div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-slate-700 rounded-lg">
                    <ArrowUpRight className="text-blue-400" size={20} />
                    <div className="flex-1">
                      <div className="text-white text-sm">主播提现</div>
                      <div className="text-slate-400 text-xs">AngelGirl 申请提现$450</div>
                    </div>
                    <div className="text-slate-400 text-xs">5分钟前</div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-slate-700 rounded-lg">
                    <AlertTriangle className="text-red-400" size={20} />
                    <div className="flex-1">
                      <div className="text-white text-sm">支付失败</div>
                      <div className="text-slate-400 text-xs">信用卡支付被拒绝</div>
                    </div>
                    <div className="text-slate-400 text-xs">10分钟前</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="space-y-8">
            {/* Payment Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={<DollarSign size={24} />}
                title="总收益"
                value={`$${stats.totalRevenue.toLocaleString()}`}
                change="+12%"
                trend="up"
                color="bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/30"
              />
              <StatCard
                icon={<Receipt size={24} />}
                title="总交易数"
                value={stats.totalTransactions.toLocaleString()}
                change="+8%"
                trend="up"
                color="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30"
              />
              <StatCard
                icon={<ArrowDownRight size={24} />}
                title="退款总数"
                value={stats.totalRefunds.toLocaleString()}
                change="-2%"
                trend="down"
                color="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30"
              />
              <StatCard
                icon={<Wallet size={24} />}
                title="待付款"
                value={`$${stats.pendingPayouts.toLocaleString()}`}
                change="+5%"
                trend="up"
                color="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
              />
            </div>

            {/* Payment Methods Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">支付方式统计</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="bg-slate-700 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      {getPaymentMethodIcon(method.method)}
                      <span className="text-white font-medium">{method.name}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400 text-sm">交易数</span>
                        <span className="text-white">{method.count.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 text-sm">占比</span>
                        <span className="text-white">{method.percentage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 text-sm">收益</span>
                        <span className="text-white">${method.revenue.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${method.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Transactions Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800 rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">最近交易</h3>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="text"
                        placeholder="搜索交易..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-slate-700 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none w-64"
                      />
                    </div>
                    <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                      <Download size={16} />
                      <span>导出</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="text-left p-4 text-slate-300">交易ID</th>
                      <th className="text-left p-4 text-slate-300">用户</th>
                      <th className="text-left p-4 text-slate-300">类型</th>
                      <th className="text-left p-4 text-slate-300">金额</th>
                      <th className="text-left p-4 text-slate-300">状态</th>
                      <th className="text-left p-4 text-slate-300">支付方式</th>
                      <th className="text-left p-4 text-slate-300">时间</th>
                      <th className="text-left p-4 text-slate-300">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                        <td className="p-4">
                          <span className="text-white font-mono text-sm">{transaction.id}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-white">{transaction.username}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            {getTransactionTypeIcon(transaction.type)}
                            <span className="text-white text-sm">{transaction.description}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`font-bold ${transaction.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            ${Math.abs(transaction.amount).toFixed(2)}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTransactionStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2 text-white">
                            {getPaymentMethodIcon(transaction.paymentMethod)}
                            <span className="text-sm">{transaction.paymentMethod}</span>
                            {transaction.cardLast4 && (
                              <span className="text-slate-400 text-xs">****{transaction.cardLast4}</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-slate-400 text-sm">{transaction.timestamp}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleTransactionAction('view', transaction.id)}
                              className="text-blue-400 hover:text-blue-300 p-1"
                            >
                              <Eye size={16} />
                            </button>
                            {transaction.status === 'completed' && transaction.type !== 'refund' && (
                              <button
                                onClick={() => handleTransactionAction('refund', transaction.id)}
                                className="text-red-400 hover:text-red-300 p-1"
                              >
                                <ArrowDownRight size={16} />
                              </button>
                            )}
                            {transaction.status === 'failed' && (
                              <button
                                onClick={() => handleTransactionAction('retry', transaction.id)}
                                className="text-green-400 hover:text-green-300 p-1"
                              >
                                <RefreshCw size={16} />
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
            </motion.div>
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