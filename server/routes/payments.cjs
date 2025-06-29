const express = require('express');
const { authenticateToken } = require('./auth.cjs');
const db = require('../database/db.cjs');

const router = express.Router();

// 模拟支付网关配置
const PAYMENT_GATEWAYS = {
  stripe: {
    publicKey: 'pk_test_...',
    secretKey: 'sk_test_...',
    webhookSecret: 'whsec_...'
  },
  paypal: {
    clientId: 'paypal_client_id',
    clientSecret: 'paypal_client_secret'
  },
  alipay: {
    appId: 'alipay_app_id',
    privateKey: 'alipay_private_key'
  },
  wechatpay: {
    mchId: 'wechat_mch_id',
    apiKey: 'wechat_api_key'
  }
};

// 获取支付方式列表
router.get('/methods', (req, res) => {
  const paymentMethods = [
    {
      id: 'credit_card',
      name: '信用卡/借记卡',
      icon: 'credit-card',
      enabled: true,
      fees: 2.9,
      description: '支持 Visa, MasterCard, American Express'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'paypal',
      enabled: true,
      fees: 3.4,
      description: '安全便捷的在线支付'
    },
    {
      id: 'alipay',
      name: '支付宝',
      icon: 'alipay',
      enabled: true,
      fees: 0.6,
      description: '中国用户首选支付方式'
    },
    {
      id: 'wechatpay',
      name: '微信支付',
      icon: 'wechat',
      enabled: true,
      fees: 0.6,
      description: '微信扫码支付'
    },
    {
      id: 'crypto',
      name: '加密货币',
      icon: 'bitcoin',
      enabled: true,
      fees: 1.0,
      description: '支持 BTC, ETH, USDT'
    }
  ];

  res.json({ paymentMethods });
});

// 获取代币套餐
router.get('/packages', (req, res) => {
  const packages = [
    {
      id: 'basic',
      tokens: 100,
      price: 9.99,
      bonus: 0,
      popular: false,
      savings: 0
    },
    {
      id: 'standard',
      tokens: 500,
      price: 39.99,
      bonus: 50,
      popular: true,
      savings: 10
    },
    {
      id: 'premium',
      tokens: 1000,
      price: 69.99,
      bonus: 150,
      popular: false,
      savings: 20
    },
    {
      id: 'ultimate',
      tokens: 2500,
      price: 149.99,
      bonus: 500,
      popular: false,
      savings: 30
    }
  ];

  res.json({ packages });
});

// 创建支付订单
router.post('/create-order', authenticateToken, async (req, res) => {
  try {
    const { packageId, paymentMethod, returnUrl } = req.body;
    const userId = req.user.userId;

    // 获取套餐信息
    const packages = [
      { id: 'basic', tokens: 100, price: 9.99, bonus: 0 },
      { id: 'standard', tokens: 500, price: 39.99, bonus: 50 },
      { id: 'premium', tokens: 1000, price: 69.99, bonus: 150 },
      { id: 'ultimate', tokens: 2500, price: 149.99, bonus: 500 }
    ];

    const selectedPackage = packages.find(p => p.id === packageId);
    if (!selectedPackage) {
      return res.status(400).json({ error: '无效的套餐' });
    }

    // 计算手续费
    const paymentMethods = {
      credit_card: 2.9,
      paypal: 3.4,
      alipay: 0.6,
      wechatpay: 0.6,
      crypto: 1.0
    };

    const feeRate = paymentMethods[paymentMethod] || 2.9;
    const fees = (selectedPackage.price * feeRate / 100).toFixed(2);
    const totalAmount = (parseFloat(selectedPackage.price) + parseFloat(fees)).toFixed(2);

    // 生成订单ID
    const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // 保存订单到数据库
    const orderData = {
      orderId,
      userId,
      packageId,
      tokens: selectedPackage.tokens + selectedPackage.bonus,
      amount: selectedPackage.price,
      fees: parseFloat(fees),
      totalAmount: parseFloat(totalAmount),
      paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    db.run(`
      INSERT INTO payment_orders (
        order_id, user_id, package_id, tokens, amount, fees, total_amount, 
        payment_method, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      orderData.orderId,
      orderData.userId,
      orderData.packageId,
      orderData.tokens,
      orderData.amount,
      orderData.fees,
      orderData.totalAmount,
      orderData.paymentMethod,
      orderData.status,
      orderData.createdAt
    ], function(err) {
      if (err) {
        console.error('订单保存失败:', err);
        return res.status(500).json({ error: '订单创建失败' });
      }

      // 根据支付方式生成支付链接
      let paymentUrl = '';
      let qrCode = '';

      switch (paymentMethod) {
        case 'credit_card':
          paymentUrl = `https://checkout.stripe.com/pay/${orderId}`;
          break;
        case 'paypal':
          paymentUrl = `https://www.paypal.com/checkoutnow?token=${orderId}`;
          break;
        case 'alipay':
          paymentUrl = `alipays://platformapi/startapp?saId=10000007&qrcode=${orderId}`;
          qrCode = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`;
          break;
        case 'wechatpay':
          paymentUrl = `weixin://wxpay/bizpayurl?pr=${orderId}`;
          qrCode = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`;
          break;
        case 'crypto':
          paymentUrl = `bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa?amount=${totalAmount}`;
          break;
      }

      res.json({
        success: true,
        order: {
          ...orderData,
          paymentUrl,
          qrCode,
          expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30分钟过期
        }
      });
    });

  } catch (error) {
    console.error('创建订单错误:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 查询订单状态
router.get('/order/:orderId', authenticateToken, (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.userId;

  db.get(`
    SELECT * FROM payment_orders 
    WHERE order_id = ? AND user_id = ?
  `, [orderId, userId], (err, order) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    if (!order) {
      return res.status(404).json({ error: '订单不存在' });
    }

    res.json({ order });
  });
});

// 处理支付回调
router.post('/webhook/:provider', async (req, res) => {
  const { provider } = req.params;
  const payload = req.body;

  try {
    let orderId = '';
    let status = '';

    // 根据不同支付提供商处理回调
    switch (provider) {
      case 'stripe':
        // 验证 Stripe webhook 签名
        orderId = payload.data.object.metadata.orderId;
        status = payload.type === 'payment_intent.succeeded' ? 'completed' : 'failed';
        break;
      
      case 'paypal':
        orderId = payload.resource.custom_id;
        status = payload.event_type === 'PAYMENT.CAPTURE.COMPLETED' ? 'completed' : 'failed';
        break;
      
      case 'alipay':
        orderId = payload.out_trade_no;
        status = payload.trade_status === 'TRADE_SUCCESS' ? 'completed' : 'failed';
        break;
      
      case 'wechatpay':
        orderId = payload.out_trade_no;
        status = payload.trade_state === 'SUCCESS' ? 'completed' : 'failed';
        break;
    }

    if (orderId && status) {
      // 更新订单状态
      db.run(`
        UPDATE payment_orders 
        SET status = ?, updated_at = ? 
        WHERE order_id = ?
      `, [status, new Date().toISOString(), orderId], function(err) {
        if (err) {
          console.error('更新订单状态失败:', err);
          return res.status(500).json({ error: '更新失败' });
        }

        // 如果支付成功，给用户添加代币
        if (status === 'completed') {
          db.get(`
            SELECT user_id, tokens FROM payment_orders 
            WHERE order_id = ?
          `, [orderId], (err, order) => {
            if (!err && order) {
              db.run(`
                UPDATE users 
                SET tokens = tokens + ? 
                WHERE id = ?
              `, [order.tokens, order.user_id]);

              // 记录交易
              db.run(`
                INSERT INTO gift_transactions (
                  from_user_id, to_streamer_id, room_id, gift_id, 
                  quantity, total_amount, message, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
              `, [
                order.user_id, 0, 'system', 0, 
                order.tokens, order.total_amount, 
                `代币充值 - 订单 ${orderId}`, 
                new Date().toISOString()
              ]);
            }
          });
        }

        res.json({ success: true });
      });
    } else {
      res.status(400).json({ error: '无效的回调数据' });
    }

  } catch (error) {
    console.error('处理支付回调错误:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 申请提现
router.post('/withdraw', authenticateToken, (req, res) => {
  const { amount, method, accountInfo } = req.body;
  const userId = req.user.userId;

  // 验证提现金额
  if (!amount || amount < 10) {
    return res.status(400).json({ error: '最低提现金额为 $10' });
  }

  // 检查用户余额
  db.get('SELECT tokens FROM users WHERE id = ?', [userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }

    // 检查余额是否足够（假设1代币=1美元）
    if (user.tokens < amount) {
      return res.status(400).json({ error: '余额不足' });
    }

    // 生成提现申请ID
    const withdrawId = `WITHDRAW_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // 计算手续费（5%）
    const fees = (amount * 0.05).toFixed(2);
    const netAmount = (amount - parseFloat(fees)).toFixed(2);

    // 保存提现申请
    db.run(`
      INSERT INTO withdrawal_requests (
        withdraw_id, user_id, amount, fees, net_amount, 
        method, account_info, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      withdrawId, userId, amount, parseFloat(fees), parseFloat(netAmount),
      method, JSON.stringify(accountInfo), 'pending', new Date().toISOString()
    ], function(err) {
      if (err) {
        return res.status(500).json({ error: '提现申请失败' });
      }

      // 冻结用户代币
      db.run(`
        UPDATE users 
        SET tokens = tokens - ? 
        WHERE id = ?
      `, [amount, userId]);

      res.json({
        success: true,
        withdrawal: {
          withdrawId,
          amount,
          fees: parseFloat(fees),
          netAmount: parseFloat(netAmount),
          status: 'pending',
          estimatedTime: '1-3个工作日'
        }
      });
    });
  });
});

// 获取用户交易记录
router.get('/transactions', authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const { page = 1, limit = 20, type = 'all' } = req.query;
  const offset = (page - 1) * limit;

  let query = `
    SELECT 
      'purchase' as type, order_id as id, amount, tokens as description, 
      status, created_at, payment_method
    FROM payment_orders 
    WHERE user_id = ?
    
    UNION ALL
    
    SELECT 
      'withdrawal' as type, withdraw_id as id, amount, 
      CONCAT('提现到 ', method) as description, 
      status, created_at, method as payment_method
    FROM withdrawal_requests 
    WHERE user_id = ?
    
    ORDER BY created_at DESC 
    LIMIT ? OFFSET ?
  `;

  db.all(query, [userId, userId, parseInt(limit), offset], (err, transactions) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    res.json({
      transactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        hasMore: transactions.length === parseInt(limit)
      }
    });
  });
});

// 获取用户钱包信息
router.get('/wallet', authenticateToken, (req, res) => {
  const userId = req.user.userId;

  // 获取用户代币余额
  db.get('SELECT tokens FROM users WHERE id = ?', [userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }

    // 获取本月消费统计
    db.get(`
      SELECT 
        COUNT(*) as transaction_count,
        SUM(amount) as total_spent
      FROM payment_orders 
      WHERE user_id = ? AND status = 'completed'
      AND created_at >= date('now', 'start of month')
    `, [userId], (err, monthlyStats) => {
      if (err) {
        monthlyStats = { transaction_count: 0, total_spent: 0 };
      }

      // 获取待处理提现
      db.get(`
        SELECT SUM(amount) as pending_withdrawals
        FROM withdrawal_requests 
        WHERE user_id = ? AND status = 'pending'
      `, [userId], (err, withdrawalStats) => {
        if (err) {
          withdrawalStats = { pending_withdrawals: 0 };
        }

        res.json({
          balance: user.tokens,
          monthlySpent: monthlyStats.total_spent || 0,
          transactionCount: monthlyStats.transaction_count || 0,
          pendingWithdrawals: withdrawalStats.pending_withdrawals || 0,
          currency: 'USD'
        });
      });
    });
  });
});

module.exports = router;