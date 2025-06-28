import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onAuthSuccess?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (mode === 'login') {
      // Check test credentials
      if (formData.email === 'admin' && formData.password === 'admin123') {
        console.log('Login successful with test credentials');
        if (onAuthSuccess) {
          onAuthSuccess();
        }
      } else {
        setError('用户名或密码错误。请使用测试账号：admin / admin123');
      }
    } else {
      // Registration logic
      if (formData.password !== formData.confirmPassword) {
        setError('密码不匹配');
      } else if (formData.password.length < 6) {
        setError('密码至少需要6个字符');
      } else {
        console.log('Registration successful:', formData);
        if (onAuthSuccess) {
          onAuthSuccess();
        }
      }
    }

    setLoading(false);
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-slate-900 border border-slate-700/50 rounded-3xl p-8 w-full max-w-md relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Animation */}
            <div className="absolute inset-0">
              <motion.div
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 20%, rgba(239, 68, 68, 0.05) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 80%, rgba(239, 68, 68, 0.05) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 80%, rgba(239, 68, 68, 0.05) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 20%, rgba(239, 68, 68, 0.05) 0%, transparent 50%)"
                  ]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              />
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <motion.h2
                  key={mode}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  {mode === 'login' ? '欢迎回来' : '加入 StreamFlow'}
                </motion.h2>
                <p className="text-slate-400">
                  {mode === 'login' 
                    ? '登录你的账户开始直播' 
                    : '创建账户开启你的直播之旅'
                  }
                </p>
                {mode === 'login' && (
                  <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-blue-400 text-sm">
                      测试账号：<span className="font-mono">admin</span><br />
                      测试密码：<span className="font-mono">admin123</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <p className="text-red-400 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                  {mode === 'register' && (
                    <motion.div
                      key="register-fields"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                        <input
                          type="text"
                          name="firstName"
                          placeholder="名字"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:border-red-400 focus:outline-none transition-colors"
                          required
                        />
                      </div>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                        <input
                          type="text"
                          name="lastName"
                          placeholder="姓氏"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:border-red-400 focus:outline-none transition-colors"
                          required
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type={mode === 'login' ? 'text' : 'email'}
                    name="email"
                    placeholder={mode === 'login' ? '用户名' : '邮箱地址'}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:border-red-400 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="密码"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-12 pr-12 py-4 text-white placeholder-slate-400 focus:border-red-400 focus:outline-none transition-colors"
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

                {mode === 'register' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="relative"
                  >
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="确认密码"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:border-red-400 focus:outline-none transition-colors"
                      required
                    />
                  </motion.div>
                )}

                {mode === 'login' && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-red-400 hover:text-red-300 text-sm transition-colors"
                    >
                      忘记密码？
                    </button>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{mode === 'login' ? '登录' : '创建账户'}</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-8">
                <div className="flex-1 h-px bg-slate-700"></div>
                <span className="px-4 text-slate-400 text-sm">或</span>
                <div className="flex-1 h-px bg-slate-700"></div>
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-slate-800/50 border border-slate-700/50 text-white py-4 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center space-x-3"
                >
                  <div className="w-5 h-5 bg-white rounded flex items-center justify-center text-xs">G</div>
                  <span>使用 Google 继续</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-slate-800/50 border border-slate-700/50 text-white py-4 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center space-x-3"
                >
                  <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center text-white text-xs">f</div>
                  <span>使用 Facebook 继续</span>
                </motion.button>
              </div>

              {/* Switch Mode */}
              <div className="text-center mt-8">
                <span className="text-slate-400">
                  {mode === 'login' ? "还没有账户？ " : "已有账户？ "}
                </span>
                <button
                  onClick={switchMode}
                  className="text-red-400 hover:text-red-300 font-bold transition-colors"
                >
                  {mode === 'login' ? '立即注册' : '立即登录'}
                </button>
              </div>

              {mode === 'register' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mt-6"
                >
                  <p className="text-slate-400 text-xs leading-relaxed">
                    创建账户即表示你同意我们的{' '}
                    <a href="#" className="text-red-400 hover:text-red-300">服务条款</a>{' '}
                    和{' '}
                    <a href="#" className="text-red-400 hover:text-red-300">隐私政策</a>
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;