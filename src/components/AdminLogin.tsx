import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Home,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (user: any) => void;
  onBackToHome: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToHome }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check admin credentials
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      const adminUser = {
        id: 1,
        username: 'admin',
        email: 'admin@streamflow.com',
        role: 'super_admin',
        permissions: ['all']
      };
      onLoginSuccess(adminUser);
    } else {
      setError('用户名或密码错误');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      {/* Back to Home Button */}
      <button
        onClick={onBackToHome}
        className="absolute top-6 left-6 flex items-center space-x-2 text-slate-400 hover:text-white transition-colors z-10"
      >
        <Home size={20} />
        <span>返回首页</span>
      </button>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">管理员登录</h1>
          <p className="text-slate-400">请输入管理员凭据以访问后台</p>
        </div>

        {/* Demo Credentials */}
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="text-blue-400" size={16} />
            <span className="text-blue-400 font-medium text-sm">演示凭据</span>
          </div>
          <div className="text-blue-300 text-sm space-y-1">
            <div>用户名: <span className="font-mono">admin</span></div>
            <div>密码: <span className="font-mono">admin123</span></div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-2"
          >
            <AlertCircle className="text-red-400" size={16} />
            <span className="text-red-400 text-sm">{error}</span>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              name="username"
              placeholder="管理员用户名"
              value={credentials.username}
              onChange={handleInputChange}
              className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:border-red-400 focus:outline-none transition-colors"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="管理员密码"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl pl-12 pr-12 py-4 text-white placeholder-slate-400 focus:border-red-400 focus:outline-none transition-colors"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 rounded-xl font-bold hover:from-red-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>登录管理后台</span>
                <ArrowRight size={20} />
              </>
            )}
          </motion.button>
        </form>

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-slate-700/30 rounded-xl">
          <div className="flex items-start space-x-3">
            <Shield className="text-yellow-400 mt-0.5" size={16} />
            <div className="text-slate-300 text-sm">
              <div className="font-medium mb-1">安全提醒</div>
              <ul className="space-y-1 text-xs text-slate-400">
                <li>• 请确保您有管理员权限</li>
                <li>• 不要在公共设备上登录</li>
                <li>• 定期更改管理员密码</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-slate-500 text-sm">
        StreamFlow 管理系统 v2.0
      </div>
    </div>
  );
};

export default AdminLogin;