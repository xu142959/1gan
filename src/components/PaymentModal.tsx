import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CreditCard, 
  Smartphone, 
  Bitcoin, 
  Building,
  Check,
  AlertCircle,
  Loader,
  QrCode,
  Copy,
  ExternalLink,
  Shield,
  Star,
  Zap
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface Package {
  id: string;
  tokens: number;
  price: number;
  bonus: number;
  popular: boolean;
  savings: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  fees: number;
  description: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<'packages' | 'methods' | 'processing' | 'success' | 'error'>('packages');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [orderId, setOrderId] = useState('');

  // 加载套餐和支付方式
  useEffect(() => {
    if (isOpen) {
      loadPackages();
      loadPaymentMethods();
    }
  }, [isOpen]);

  const loadPackages = async () => {
    try {
      const response = await fetch('/api/payments/packages');
      const data = await response.json();
      setPackages(data.packages);
    } catch (error) {
      console.error('加载套餐失败:', error);
    }
  };

  const loadPaymentMethods = async () => {
    try {
      const response = await fetch('/api/payments/methods');
      const data = await response.json();
      setPaymentMethods(data.paymentMethods);
    } catch (error) {
      console.error('加载支付方式失败:', error);
    }
  };

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
    setStep('methods');
  };

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };

  const handlePayment = async () => {
    if (!selectedPackage || !selectedMethod) return;

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          packageId: selectedPackage.id,
          paymentMethod: selectedMethod.id,
          returnUrl: window.location.origin + '/payment/success'
        })
      });

      const data = await response.json();

      if (data.success) {
        setOrderId(data.order.orderId);
        setPaymentUrl(data.order.paymentUrl);
        setQrCode(data.order.qrCode);
        setStep('processing');

        // 对于某些支付方式，直接跳转
        if (selectedMethod.id === 'credit_card' || selectedMethod.id === 'paypal') {
          window.open(data.order.paymentUrl, '_blank');
        }

        // 开始轮询订单状态
        pollOrderStatus(data.order.orderId);
      } else {
        setError(data.error || '支付创建失败');
        setStep('error');
      }
    } catch (error) {
      console.error('支付错误:', error);
      setError('网络错误，请重试');
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  const pollOrderStatus = async (orderId: string) => {
    const maxAttempts = 60; // 最多轮询5分钟
    let attempts = 0;

    const poll = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`/api/payments/order/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();

        if (data.order.status === 'completed') {
          setStep('success');
          if (onSuccess) {
            setTimeout(onSuccess, 2000);
          }
          return;
        } else if (data.order.status === 'failed') {
          setError('支付失败，请重试');
          setStep('error');
          return;
        }

        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, 5000); // 每5秒轮询一次
        } else {
          setError('支付超时，请检查支付状态');
          setStep('error');
        }
      } catch (error) {
        console.error('轮询订单状态错误:', error);
      }
    };

    poll();
  };

  const getPaymentIcon = (iconName: string) => {
    switch (iconName) {
      case 'credit-card': return <CreditCard size={24} />;
      case 'paypal': return <Building size={24} />;
      case 'alipay': return <Smartphone size={24} />;
      case 'wechat': return <Smartphone size={24} />;
      case 'bitcoin': return <Bitcoin size={24} />;
      default: return <CreditCard size={24} />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const resetModal = () => {
    setStep('packages');
    setSelectedPackage(null);
    setSelectedMethod(null);
    setError('');
    setPaymentUrl('');
    setQrCode('');
    setOrderId('');
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
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
              onClick={handleClose}
              className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <motion.h2
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white mb-2"
              >
                {step === 'packages' && '选择代币套餐'}
                {step === 'methods' && '选择支付方式'}
                {step === 'processing' && '处理支付中'}
                {step === 'success' && '支付成功'}
                {step === 'error' && '支付失败'}
              </motion.h2>
              <p className="text-slate-400">
                {step === 'packages' && '选择最适合您的代币套餐'}
                {step === 'methods' && '选择您偏好的支付方式'}
                {step === 'processing' && '请完成支付流程'}
                {step === 'success' && '代币已成功添加到您的账户'}
                {step === 'error' && '支付过程中出现问题'}
              </p>
            </div>

            {/* Package Selection */}
            {step === 'packages' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {packages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePackageSelect(pkg)}
                    className={`relative bg-slate-800 border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                      pkg.popular 
                        ? 'border-red-500 bg-gradient-to-b from-red-500/10 to-slate-800' 
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                          <Star size={14} />
                          <span>最受欢迎</span>
                        </div>
                      </div>
                    )}

                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        {pkg.tokens.toLocaleString()}
                      </div>
                      <div className="text-slate-400 text-sm mb-4">代币</div>
                      
                      {pkg.bonus > 0 && (
                        <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm mb-4">
                          +{pkg.bonus} 奖励代币
                        </div>
                      )}

                      <div className="text-2xl font-bold text-white mb-1">
                        ${pkg.price}
                      </div>
                      
                      {pkg.savings > 0 && (
                        <div className="text-green-400 text-sm">
                          节省 {pkg.savings}%
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Payment Method Selection */}
            {step === 'methods' && selectedPackage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Selected Package Summary */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">订单摘要</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white font-medium">
                        {selectedPackage.tokens.toLocaleString()} 代币
                        {selectedPackage.bonus > 0 && (
                          <span className="text-green-400 ml-2">+{selectedPackage.bonus} 奖励</span>
                        )}
                      </div>
                      <div className="text-slate-400 text-sm">
                        总计: {(selectedPackage.tokens + selectedPackage.bonus).toLocaleString()} 代币
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      ${selectedPackage.price}
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                  {paymentMethods.filter(method => method.enabled).map((method) => (
                    <motion.div
                      key={method.id}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => handleMethodSelect(method)}
                      className={`bg-slate-800 border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                        selectedMethod?.id === method.id 
                          ? 'border-red-500 bg-red-500/10' 
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-slate-400">
                            {getPaymentIcon(method.icon)}
                          </div>
                          <div>
                            <div className="text-white font-medium">{method.name}</div>
                            <div className="text-slate-400 text-sm">{method.description}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-slate-400 text-sm">手续费</div>
                          <div className="text-white font-medium">{method.fees}%</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Continue Button */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep('packages')}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-4 rounded-xl font-bold transition-colors"
                  >
                    返回
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={!selectedMethod || loading}
                    className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <Loader className="animate-spin" size={20} />
                    ) : (
                      <>
                        <span>继续支付</span>
                        <ExternalLink size={20} />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Processing */}
            {step === 'processing' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
              >
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Loader className="text-blue-400 animate-spin" size={32} />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">等待支付确认</h3>
                  <p className="text-slate-400">请完成支付流程，我们正在等待支付确认...</p>
                </div>

                {/* QR Code for mobile payments */}
                {qrCode && (selectedMethod?.id === 'alipay' || selectedMethod?.id === 'wechatpay') && (
                  <div className="bg-slate-800 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center justify-center space-x-2">
                      <QrCode size={20} />
                      <span>扫码支付</span>
                    </h4>
                    <div className="flex justify-center mb-4">
                      <img src={qrCode} alt="Payment QR Code" className="w-48 h-48 border border-slate-600 rounded-lg" />
                    </div>
                    <p className="text-slate-400 text-sm text-center">
                      使用{selectedMethod?.name}扫描二维码完成支付
                    </p>
                  </div>
                )}

                {/* Payment URL for crypto */}
                {paymentUrl && selectedMethod?.id === 'crypto' && (
                  <div className="bg-slate-800 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4">加密货币支付</h4>
                    <div className="bg-slate-700 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm font-mono break-all">{paymentUrl}</span>
                        <button
                          onClick={() => copyToClipboard(paymentUrl)}
                          className="text-blue-400 hover:text-blue-300 ml-2"
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm">
                      复制地址到您的加密货币钱包完成支付
                    </p>
                  </div>
                )}

                <div className="bg-slate-800 rounded-xl p-4">
                  <div className="flex items-center space-x-3 text-slate-400">
                    <Shield size={20} />
                    <span className="text-sm">您的支付信息受到银行级加密保护</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Success */}
            {step === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Check className="text-green-400" size={32} />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">支付成功！</h3>
                  <p className="text-slate-400">
                    {selectedPackage && `${(selectedPackage.tokens + selectedPackage.bonus).toLocaleString()} 代币已添加到您的账户`}
                  </p>
                </div>

                <div className="bg-slate-800 rounded-xl p-6">
                  <div className="flex items-center justify-center space-x-2 text-green-400 mb-4">
                    <Zap size={20} />
                    <span className="font-medium">交易完成</span>
                  </div>
                  <div className="text-slate-400 text-sm">
                    订单号: {orderId}
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold transition-colors"
                >
                  完成
                </button>
              </motion.div>
            )}

            {/* Error */}
            {step === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
              >
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle className="text-red-400" size={32} />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">支付失败</h3>
                  <p className="text-slate-400">{error}</p>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep('methods')}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-4 rounded-xl font-bold transition-colors"
                  >
                    重试
                  </button>
                  <button
                    onClick={handleClose}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-bold transition-colors"
                  >
                    关闭
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;