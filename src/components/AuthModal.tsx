import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
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
                    "radial-gradient(circle at 20% 20%, rgba(225, 252, 2, 0.05) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 80%, rgba(225, 252, 2, 0.05) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 80%, rgba(225, 252, 2, 0.05) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 20%, rgba(225, 252, 2, 0.05) 0%, transparent 50%)"
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
                  className="text-3xl font-light text-white mb-2"
                >
                  {mode === 'login' ? 'Welcome back' : 'Join FlowPay'}
                </motion.h2>
                <p className="text-slate-400">
                  {mode === 'login' 
                    ? 'Sign in to your account' 
                    : 'Create your account to get started'
                  }
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                  {mode === 'register' && (
                    <motion.div
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
                          placeholder="First name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:border-lime-400 focus:outline-none transition-colors"
                          required
                        />
                      </div>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:border-lime-400 focus:outline-none transition-colors"
                          required
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:border-lime-400 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-12 pr-12 py-4 text-white placeholder-slate-400 focus:border-lime-400 focus:outline-none transition-colors"
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
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:border-lime-400 focus:outline-none transition-colors"
                      required
                    />
                  </motion.div>
                )}

                {mode === 'login' && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-lime-400 hover:text-lime-300 text-sm transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-lime-400 text-slate-900 py-4 rounded-xl font-semibold hover:bg-lime-300 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>{mode === 'login' ? 'Sign in' : 'Create account'}</span>
                  <ArrowRight size={20} />
                </motion.button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-8">
                <div className="flex-1 h-px bg-slate-700"></div>
                <span className="px-4 text-slate-400 text-sm">or</span>
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
                  <span>Continue with Google</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-slate-800/50 border border-slate-700/50 text-white py-4 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center space-x-3"
                >
                  <div className="w-5 h-5 bg-black rounded flex items-center justify-center text-white text-xs">🍎</div>
                  <span>Continue with Apple</span>
                </motion.button>
              </div>

              {/* Switch Mode */}
              <div className="text-center mt-8">
                <span className="text-slate-400">
                  {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                </span>
                <button
                  onClick={switchMode}
                  className="text-lime-400 hover:text-lime-300 font-medium transition-colors"
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </div>

              {mode === 'register' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mt-6"
                >
                  <p className="text-slate-400 text-xs leading-relaxed">
                    By creating an account, you agree to our{' '}
                    <a href="#" className="text-lime-400 hover:text-lime-300">Terms of Service</a>{' '}
                    and{' '}
                    <a href="#" className="text-lime-400 hover:text-lime-300">Privacy Policy</a>
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