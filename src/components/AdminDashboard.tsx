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
  Wifi
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
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [showServerConfigModal, setShowServerConfigModal] = useState(false);

  // API Keys state
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: 'Stripe Payment API',
      type: 'payment',
      key: 'sk_live_51H7...',
      status: 'active',
      lastUsed: '2024-01-15 14:30:25',
      createdAt: '2024-01-01 10:00:00'
    },
    {
      id: 2,
      name: 'PayPal Webhook',
      type: 'payment',
      key: 'whsec_1234...',
      status: 'active',
      lastUsed: '2024-01-15 12:15:30',
      createdAt: '2024-01-01 10:00:00'
    },
    {
      id: 3,
      name: 'SMS Notification',
      type: 'notification',
      key: 'sk_test_abc123...',
      status: 'inactive',
      lastUsed: '2024-01-10 09:45:12',
      createdAt: '2024-01-01 10:00:00'
    }
  ]);

  // Server Configuration state
  const [serverConfig, setServerConfig] = useState({
    server: {
      port: 3001,
      host: '0.0.0.0',
      ssl: true,
      sslCert: '/etc/ssl/certs/server.crt',
      sslKey: '/etc/ssl/private/server.key'
    },
    database: {
      host: 'localhost',
      port: 5432,
      name: 'streamflow',
      user: 'postgres',
      password: '••••••••'
    },
    redis: {
      host: 'localhost',
      port: 6379,
      password: '••••••••'
    },
    smtp: {
      host: 'smtp.gmail.com',
      port: 587,
      user: 'noreply@streamflow.com',
      password: '••••••••'
    }
  });

  // System status
  const [systemStatus, setSystemStatus] = useState({
    uptime: '15 天 8 小时 32 分钟',
    cpu: 45,
    memory: 68,
    disk: 32,
    network: 'online'
  });

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
    paymentSuccessRate: 98.5
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleAddApiKey = () => {
    setShowApiKeyModal(true);
  };

  const handleSaveServerConfig = () => {
    // Save server configuration logic
    console.log('Saving server config:', serverConfig);
    alert('服务器配置已保存');
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 rounded-xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">添加API密钥</h2>
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <XCircle size={24} />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-slate-400 text-sm mb-2">密钥名称</label>
                <input
                  type="text"
                  placeholder="例如: Stripe Payment API"
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-2">密钥类型</label>
                <select className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none">
                  <option value="payment">支付</option>
                  <option value="notification">通知</option>
                  <option value="analytics">分析</option>
                  <option value="storage">存储</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-2">API密钥</label>
                <input
                  type="password"
                  placeholder="输入API密钥"
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowApiKeyModal(false)}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition-colors"
                >
                  添加
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Server Config Modal */}
      {showServerConfigModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">服务器配置</h2>
              <button
                onClick={() => setShowServerConfigModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Server Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">服务器设置</h3>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">端口</label>
                  <input
                    type="number"
                    value={serverConfig.server.port}
                    onChange={(e) => setServerConfig(prev => ({
                      ...prev,
                      server: { ...prev.server, port: parseInt(e.target.value) }
                    }))}
                    className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">主机地址</label>
                  <input
                    type="text"
                    value={serverConfig.server.host}
                    onChange={(e) => setServerConfig(prev => ({
                      ...prev,
                      server: { ...prev.server, host: e.target.value }
                    }))}
                    className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">启用SSL</span>
                  <button
                    onClick={() => setServerConfig(prev => ({
                      ...prev,
                      server: { ...prev.server, ssl: !prev.server.ssl }
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      serverConfig.server.ssl ? 'bg-green-500' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        serverConfig.server.ssl ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Database Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">数据库设置</h3>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">数据库主机</label>
                  <input
                    type="text"
                    value={serverConfig.database.host}
                    onChange={(e) => setServerConfig(prev => ({
                      ...prev,
                      database: { ...prev.database, host: e.target.value }
                    }))}
                    className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">端口</label>
                  <input
                    type="number"
                    value={serverConfig.database.port}
                    onChange={(e) => setServerConfig(prev => ({
                      ...prev,
                      database: { ...prev.database, port: parseInt(e.target.value) }
                    }))}
                    className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">数据库名称</label>
                  <input
                    type="text"
                    value={serverConfig.database.name}
                    onChange={(e) => setServerConfig(prev => ({
                      ...prev,
                      database: { ...prev.database, name: e.target.value }
                    }))}
                    className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowServerConfigModal(false)}
                className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSaveServerConfig}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Save size={20} />
                <span>保存配置</span>
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
              {/* System Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-700 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Monitor className="text-blue-400" size={24} />
                    <span className="text-white font-medium">系统状态</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">运行时间</span>
                      <span className="text-white text-sm">{systemStatus.uptime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">网络</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-400 text-sm">在线</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Cpu className="text-green-400" size={24} />
                    <span className="text-white font-medium">CPU使用率</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{systemStatus.cpu}%</div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-green-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${systemStatus.cpu}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-slate-700 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <MemoryStick className="text-yellow-400" size={24} />
                    <span className="text-white font-medium">内存使用率</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{systemStatus.memory}%</div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${systemStatus.memory}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-slate-700 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <HardDrive className="text-purple-400" size={24} />
                    <span className="text-white font-medium">磁盘使用率</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{systemStatus.disk}%</div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-purple-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${systemStatus.disk}%` }}
                    ></div>
                  </div>
                </div>
              </div>

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

              {/* Recent Activity */}
              <div className="bg-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">最近活动</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-slate-600 rounded-lg">
                    <CreditCard className="text-green-400" size={20} />
                    <div className="flex-1">
                      <div className="text-white text-sm">新的代币购买</div>
                      <div className="text-slate-400 text-xs">user123 购买了1000代币</div>
                    </div>
                    <div className="text-slate-400 text-xs">2分钟前</div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-slate-600 rounded-lg">
                    <ArrowUpRight className="text-blue-400" size={20} />
                    <div className="flex-1">
                      <div className="text-white text-sm">主播提现</div>
                      <div className="text-slate-400 text-xs">AngelGirl 申请提现$450</div>
                    </div>
                    <div className="text-slate-400 text-xs">5分钟前</div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-slate-600 rounded-lg">
                    <AlertTriangle className="text-red-400" size={20} />
                    <div className="flex-1">
                      <div className="text-white text-sm">支付失败</div>
                      <div className="text-slate-400 text-xs">信用卡支付被拒绝</div>
                    </div>
                    <div className="text-slate-400 text-xs">10分钟前</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API Keys Tab */}
          {activeTab === 'api-keys' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">API密钥管理</h2>
                <button
                  onClick={handleAddApiKey}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Plus size={16} />
                  <span>添加密钥</span>
                </button>
              </div>

              <div className="bg-slate-700 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-600">
                    <tr>
                      <th className="text-left p-4 text-slate-300">名称</th>
                      <th className="text-left p-4 text-slate-300">类型</th>
                      <th className="text-left p-4 text-slate-300">密钥</th>
                      <th className="text-left p-4 text-slate-300">状态</th>
                      <th className="text-left p-4 text-slate-300">最后使用</th>
                      <th className="text-left p-4 text-slate-300">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiKeys.map((key) => (
                      <tr key={key.id} className="border-t border-slate-600">
                        <td className="p-4 text-white">{key.name}</td>
                        <td className="p-4">
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">
                            {key.type}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-400 font-mono">{key.key}</span>
                            <button
                              onClick={() => copyToClipboard(key.key)}
                              className="text-slate-400 hover:text-white"
                            >
                              <Copy size={14} />
                            </button>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            key.status === 'active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {key.status === 'active' ? '活跃' : '禁用'}
                          </span>
                        </td>
                        <td className="p-4 text-slate-400 text-sm">{key.lastUsed}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-400 hover:text-blue-300">
                              <Edit size={16} />
                            </button>
                            <button className="text-red-400 hover:text-red-300">
                              <Trash2 size={16} />
                            </button>
                            <button className="text-slate-400 hover:text-white">
                              {key.status === 'active' ? <Lock size={16} /> : <Unlock size={16} />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <Shield className="text-yellow-400 mt-0.5" size={20} />
                  <div>
                    <h3 className="text-yellow-400 font-medium mb-2">API密钥安全提醒</h3>
                    <ul className="text-yellow-300 text-sm space-y-1">
                      <li>• 定期轮换API密钥以确保安全</li>
                      <li>• 不要在客户端代码中暴露密钥</li>
                      <li>• 为不同服务使用不同的密钥</li>
                      <li>• 监控密钥使用情况，及时发现异常</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Server Config Tab */}
          {activeTab === 'server-config' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">服务器配置</h2>
                <button
                  onClick={() => setShowServerConfigModal(true)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Settings size={16} />
                  <span>编辑配置</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Server Settings */}
                <div className="bg-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                    <Server size={20} />
                    <span>服务器设置</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">端口</span>
                      <span className="text-white">{serverConfig.server.port}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">主机</span>
                      <span className="text-white">{serverConfig.server.host}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">SSL</span>
                      <span className={serverConfig.server.ssl ? 'text-green-400' : 'text-red-400'}>
                        {serverConfig.server.ssl ? '启用' : '禁用'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Database Settings */}
                <div className="bg-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                    <Database size={20} />
                    <span>数据库设置</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">主机</span>
                      <span className="text-white">{serverConfig.database.host}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">端口</span>
                      <span className="text-white">{serverConfig.database.port}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">数据库</span>
                      <span className="text-white">{serverConfig.database.name}</span>
                    </div>
                  </div>
                </div>

                {/* Redis Settings */}
                <div className="bg-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                    <Zap size={20} />
                    <span>Redis设置</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">主机</span>
                      <span className="text-white">{serverConfig.redis.host}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">端口</span>
                      <span className="text-white">{serverConfig.redis.port}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">状态</span>
                      <span className="text-green-400">已连接</span>
                    </div>
                  </div>
                </div>

                {/* SMTP Settings */}
                <div className="bg-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                    <Mail size={20} />
                    <span>SMTP设置</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">主机</span>
                      <span className="text-white">{serverConfig.smtp.host}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">端口</span>
                      <span className="text-white">{serverConfig.smtp.port}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">用户</span>
                      <span className="text-white">{serverConfig.smtp.user}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Configuration Preview */}
              <div className="bg-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">配置文件预览</h3>
                <pre className="bg-slate-800 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{JSON.stringify(serverConfig, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Other tabs remain the same... */}
          {activeTab === 'users' && (
            <div className="text-center py-16">
              <Users className="text-slate-400 mx-auto mb-4" size={64} />
              <h3 className="text-xl font-bold text-white mb-2">用户管理</h3>
              <p className="text-slate-400">用户管理功能正在开发中</p>
            </div>
          )}

          {activeTab === 'streamers' && (
            <div className="text-center py-16">
              <Video className="text-slate-400 mx-auto mb-4" size={64} />
              <h3 className="text-xl font-bold text-white mb-2">主播管理</h3>
              <p className="text-slate-400">主播管理功能正在开发中</p>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="text-center py-16">
              <CreditCard className="text-slate-400 mx-auto mb-4" size={64} />
              <h3 className="text-xl font-bold text-white mb-2">支付管理</h3>
              <p className="text-slate-400">支付管理功能正在开发中</p>
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