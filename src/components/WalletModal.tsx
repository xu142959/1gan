import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Wallet, 
  Plus, 
  Minus, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTokens?: () => void;
}

interface Transaction {
  type: 'purchase' | 'withdrawal';
  id: string;
  amount: number;
  description: string;
  status: string;
  created_at: string;
  payment_method: string;
}

interface WalletInfo {
  balance: number;
  monthlySpent: number;
  transactionCount: number;
  pendingWithdrawals: number;
  currency: string;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onAddTokens }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'withdraw'>('overview');
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('paypal');
  const [withdrawAccount, setWithdrawAccount] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadWalletInfo();
      loadTransactions();
    }
  }, [isOpen]);

  const loadWalletInfo = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/payments/wallet', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setWalletInfo(data);
    } catch (error) {
      console.error('加载钱包信息失败:', error);
    }
  };

  const loadTransactions = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/payments/transactions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setTransactions(data.transactions);
    } catch (error) {
      console.error('加载交易记录失败:', error);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || !withdrawAccount) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/payments/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: parseFloat(withdrawAmount),
          method: withdrawMethod,
          accountInfo: {
            account: withdrawAccount,
            method: withdrawMethod
          }
        })
      });

      const data = await response.json();
      if (data.success) {
        alert('提现申请已提交，预计1-3个工作日到账');
        setWithdrawAmount('');
        setWithdrawAccount('');
        loadWalletInfo();
        loadTransactions();
      } else {
        alert(data.error || '提现申请失败');
      }
    } catch (error) {
      console.error('提现失败:', error);
      alert('网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (transaction: Transaction) => {
    if (transaction.type === 'purchase') {
      return <ArrowDownRight className="text-green-400" size={16} />;
    } else {
      return <ArrowUpRight className="text-blue-400" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={14} />;
      case 'pending': return <Clock size={14} />;
      case 'failed': return <AlertCircle size={14} />;
      default: return <Clock size={14} />;
    }
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
            className="bg-slate-900 border border-slate-700/50 rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Wallet className="text-green-500" size={32} />
                <h2 className="text-3xl font-bold text-white">我的钱包</h2>
              </div>
              <p className="text-slate-400">管理您的代币和交易记录</p>
            </div>

            {/* Tabs */}
            <div className="flex space-x-8 border-b border-slate-700 mb-8">
              {[
                { id: 'overview', label: '概览', icon: Wallet },
                { id: 'transactions', label: '交易记录', icon: Calendar },
                { id: 'withdraw', label: '提现', icon: ArrowUpRight }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 pb-4 px-2 text-lg font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeWalletTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && walletInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Balance Card */}
                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-slate-400 text-sm mb-2">当前余额</h3>
                      <div className="flex items-center space-x-3">
                        {showBalance ? (
                          <div className="text-4xl font-bold text-white">
                            {walletInfo.balance.toLocaleString()} 代币
                          </div>
                        ) : (
                          <div className="text-4xl font-bold text-white">••••••</div>
                        )}
                        <button
                          onClick={() => setShowBalance(!showBalance)}
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      <div className="text-slate-400 text-sm mt-2">
                        ≈ ${(walletInfo.balance * 0.01).toFixed(2)} USD
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={onAddTokens}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition-colors flex items-center space-x-2"
                      >
                        <Plus size={20} />
                        <span>充值</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('withdraw')}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-colors flex items-center space-x-2"
                      >
                        <Minus size={20} />
                        <span>提现</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-800 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <TrendingDown className="text-red-400" size={24} />
                      <span className="text-slate-400">本月消费</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      ${walletInfo.monthlySpent.toFixed(2)}
                    </div>
                    <div className="text-slate-400 text-sm mt-1">
                      {walletInfo.transactionCount} 笔交易
                    </div>
                  </div>

                  <div className="bg-slate-800 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Clock className="text-yellow-400" size={24} />
                      <span className="text-slate-400">待处理提现</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      ${walletInfo.pendingWithdrawals.toFixed(2)}
                    </div>
                    <div className="text-slate-400 text-sm mt-1">
                      预计1-3个工作日
                    </div>
                  </div>

                  <div className="bg-slate-800 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <TrendingUp className="text-green-400" size={24} />
                      <span className="text-slate-400">账户等级</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      VIP
                    </div>
                    <div className="text-slate-400 text-sm mt-1">
                      享受更多特权
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">快速操作</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button
                      onClick={onAddTokens}
                      className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg transition-colors flex flex-col items-center space-y-2"
                    >
                      <Plus size={24} />
                      <span className="text-sm">购买代币</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('withdraw')}
                      className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg transition-colors flex flex-col items-center space-y-2"
                    >
                      <ArrowUpRight size={24} />
                      <span className="text-sm">申请提现</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('transactions')}
                      className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg transition-colors flex flex-col items-center space-y-2"
                    >
                      <Calendar size={24} />
                      <span className="text-sm">交易记录</span>
                    </button>
                    <button
                      onClick={loadWalletInfo}
                      className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg transition-colors flex flex-col items-center space-y-2"
                    >
                      <RefreshCw size={24} />
                      <span className="text-sm">刷新余额</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">交易记录</h3>
                  <button
                    onClick={loadTransactions}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <RefreshCw size={20} />
                  </button>
                </div>

                <div className="space-y-3">
                  {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                      <div key={transaction.id} className="bg-slate-800 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                              {getTransactionIcon(transaction)}
                            </div>
                            <div>
                              <div className="text-white font-medium">{transaction.description}</div>
                              <div className="text-slate-400 text-sm">
                                {new Date(transaction.created_at).toLocaleDateString()} • {transaction.payment_method}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-bold ${transaction.type === 'purchase' ? 'text-green-400' : 'text-blue-400'}`}>
                              {transaction.type === 'purchase' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                            </div>
                            <div className={`flex items-center space-x-1 text-sm ${getStatusColor(transaction.status)}`}>
                              {getStatusIcon(transaction.status)}
                              <span>{transaction.status}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16">
                      <Calendar className="text-slate-400 mx-auto mb-4" size={64} />
                      <h4 className="text-lg font-medium text-white mb-2">暂无交易记录</h4>
                      <p className="text-slate-400">您的交易记录会显示在这里</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Withdraw Tab */}
            {activeTab === 'withdraw' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-slate-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6">申请提现</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-slate-400 text-sm mb-2">提现金额</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          placeholder="最低 $10"
                          className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-green-500 focus:outline-none"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                          USD
                        </div>
                      </div>
                      {walletInfo && (
                        <div className="text-slate-400 text-sm mt-2">
                          可提现余额: ${(walletInfo.balance * 0.01).toFixed(2)}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-slate-400 text-sm mb-2">提现方式</label>
                      <select
                        value={withdrawMethod}
                        onChange={(e) => setWithdrawMethod(e.target.value)}
                        className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-green-500 focus:outline-none"
                      >
                        <option value="paypal">PayPal</option>
                        <option value="bank_transfer">银行转账</option>
                        <option value="crypto">加密货币</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 text-sm mb-2">
                        {withdrawMethod === 'paypal' && 'PayPal 邮箱'}
                        {withdrawMethod === 'bank_transfer' && '银行账号'}
                        {withdrawMethod === 'crypto' && '钱包地址'}
                      </label>
                      <input
                        type="text"
                        value={withdrawAccount}
                        onChange={(e) => setWithdrawAccount(e.target.value)}
                        placeholder={
                          withdrawMethod === 'paypal' ? '输入您的 PayPal 邮箱' :
                          withdrawMethod === 'bank_transfer' ? '输入您的银行账号' :
                          '输入您的钱包地址'
                        }
                        className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-green-500 focus:outline-none"
                      />
                    </div>

                    {withdrawAmount && (
                      <div className="bg-slate-700 rounded-lg p-4">
                        <h4 className="text-white font-medium mb-3">提现详情</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-400">提现金额</span>
                            <span className="text-white">${parseFloat(withdrawAmount || '0').toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">手续费 (5%)</span>
                            <span className="text-white">-${(parseFloat(withdrawAmount || '0') * 0.05).toFixed(2)}</span>
                          </div>
                          <div className="border-t border-slate-600 pt-2 flex justify-between">
                            <span className="text-slate-400">实际到账</span>
                            <span className="text-white font-bold">
                              ${(parseFloat(withdrawAmount || '0') * 0.95).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleWithdraw}
                      disabled={!withdrawAmount || !withdrawAccount || loading || parseFloat(withdrawAmount || '0') < 10}
                      className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center space-x-2"
                    >
                      {loading ? (
                        <Loader className="animate-spin" size={20} />
                      ) : (
                        <>
                          <ArrowUpRight size={20} />
                          <span>申请提现</span>
                        </>
                      )}
                    </button>

                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="text-yellow-400 mt-0.5" size={16} />
                        <div className="text-yellow-400 text-sm">
                          <div className="font-medium mb-1">提现说明</div>
                          <ul className="space-y-1 text-xs">
                            <li>• 最低提现金额为 $10</li>
                            <li>• 提现手续费为 5%</li>
                            <li>• 预计1-3个工作日到账</li>
                            <li>• 请确保账户信息准确无误</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WalletModal;