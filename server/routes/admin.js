const express = require('express');
const db = require('../database/db');
const { authenticateToken } = require('./auth');

const router = express.Router();

// 管理员权限验证中间件
const requireAdmin = (req, res, next) => {
  db.get('SELECT role FROM admins WHERE user_id = ?', [req.user.userId], (err, admin) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    if (!admin || (admin.role !== 'admin' && admin.role !== 'moderator')) {
      return res.status(403).json({ error: '权限不足' });
    }

    req.admin = admin;
    next();
  });
};

// 获取平台统计信息
router.get('/stats', authenticateToken, requireAdmin, (req, res) => {
  const stats = {};
  let completed = 0;
  const queries = [
    { key: 'totalUsers', query: 'SELECT COUNT(*) as count FROM users' },
    { key: 'totalStreamers', query: 'SELECT COUNT(*) as count FROM streamers' },
    { key: 'onlineStreamers', query: 'SELECT COUNT(*) as count FROM streamers WHERE is_online = 1' },
    { key: 'totalRooms', query: 'SELECT COUNT(*) as count FROM live_rooms' },
    { key: 'activeRooms', query: 'SELECT COUNT(*) as count FROM live_rooms WHERE status = "live"' },
    { key: 'totalRevenue', query: 'SELECT SUM(total_amount) as total FROM gift_transactions' },
    { key: 'todayRevenue', query: 'SELECT SUM(total_amount) as total FROM gift_transactions WHERE DATE(created_at) = DATE("now")' },
    { key: 'totalMessages', query: 'SELECT COUNT(*) as count FROM chat_messages' },
    { key: 'todayMessages', query: 'SELECT COUNT(*) as count FROM chat_messages WHERE DATE(created_at) = DATE("now")' }
  ];

  queries.forEach(({ key, query }) => {
    db.get(query, (err, result) => {
      if (!err) {
        stats[key] = result.count || result.total || 0;
      } else {
        stats[key] = 0;
      }

      completed++;
      if (completed === queries.length) {
        res.json(stats);
      }
    });
  });
});

// 获取用户列表
router.get('/users', authenticateToken, requireAdmin, (req, res) => {
  const { page = 1, limit = 50, search = '', sort = 'created_at' } = req.query;
  const offset = (page - 1) * limit;

  let query = `
    SELECT u.*, 
           (SELECT COUNT(*) FROM follows WHERE user_id = u.id) as following_count,
           (SELECT COUNT(*) FROM favorites WHERE user_id = u.id) as favorites_count,
           (SELECT SUM(total_amount) FROM gift_transactions WHERE from_user_id = u.id) as total_spent
    FROM users u
  `;

  const params = [];

  if (search) {
    query += ' WHERE u.username LIKE ? OR u.email LIKE ?';
    params.push(`%${search}%`, `%${search}%`);
  }

  // 排序
  const allowedSorts = ['created_at', 'username', 'level', 'tokens', 'last_login'];
  const sortField = allowedSorts.includes(sort) ? sort : 'created_at';
  query += ` ORDER BY u.${sortField} DESC LIMIT ? OFFSET ?`;
  params.push(parseInt(limit), offset);

  db.all(query, params, (err, users) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    const formattedUsers = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      level: user.level,
      experience: user.experience,
      tokens: user.tokens,
      vip_level: user.vip_level,
      country: user.country,
      age: user.age,
      gender: user.gender,
      is_active: user.is_active,
      following_count: user.following_count || 0,
      favorites_count: user.favorites_count || 0,
      total_spent: user.total_spent || 0,
      last_login: user.last_login,
      created_at: user.created_at
    }));

    res.json({
      users: formattedUsers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        hasMore: formattedUsers.length === parseInt(limit)
      }
    });
  });
});

// 获取主播列表
router.get('/streamers', authenticateToken, requireAdmin, (req, res) => {
  const { page = 1, limit = 50, search = '', status = 'all' } = req.query;
  const offset = (page - 1) * limit;

  let query = `
    SELECT s.*, u.username, u.email, u.vip_level,
           lr.current_viewers, lr.status as room_status
    FROM streamers s
    JOIN users u ON s.user_id = u.id
    LEFT JOIN live_rooms lr ON s.id = lr.streamer_id AND lr.status = 'live'
  `;

  const params = [];

  const conditions = [];
  if (search) {
    conditions.push('(s.stage_name LIKE ? OR u.username LIKE ? OR u.email LIKE ?)');
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (status !== 'all') {
    conditions.push('s.status = ?');
    params.push(status);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY s.created_at DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), offset);

  db.all(query, params, (err, streamers) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    const formattedStreamers = streamers.map(streamer => ({
      id: streamer.id,
      userId: streamer.user_id,
      username: streamer.username,
      email: streamer.email,
      stageName: streamer.stage_name,
      category: streamer.category,
      isVerified: streamer.is_verified,
      isOnline: streamer.is_online,
      status: streamer.status,
      currentViewers: streamer.current_viewers || 0,
      totalFollowers: streamer.total_followers,
      totalEarnings: streamer.total_earnings,
      rating: streamer.rating,
      totalRatings: streamer.total_ratings,
      vipLevel: streamer.vip_level,
      roomStatus: streamer.room_status,
      lastSeen: streamer.last_seen,
      createdAt: streamer.created_at
    }));

    res.json({
      streamers: formattedStreamers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        hasMore: formattedStreamers.length === parseInt(limit)
      }
    });
  });
});

// 验证主播
router.post('/streamers/:id/verify', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;

  if (req.admin.role !== 'admin') {
    return res.status(403).json({ error: '只有管理员可以验证主播' });
  }

  db.run('UPDATE streamers SET is_verified = 1 WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: '主播不存在' });
    }

    res.json({ message: '主播验证成功' });
  });
});

// 取消验证主播
router.post('/streamers/:id/unverify', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;

  if (req.admin.role !== 'admin') {
    return res.status(403).json({ error: '只有管理员可以取消验证' });
  }

  db.run('UPDATE streamers SET is_verified = 0 WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: '主播不存在' });
    }

    res.json({ message: '主播验证已取消' });
  });
});

// 封禁用户
router.post('/users/:id/ban', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const { reason = '违反平台规定' } = req.body;

  db.run('UPDATE users SET is_active = 0 WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: '用户不存在' });
    }

    // 记录封禁日志
    db.run(`
      INSERT INTO notifications (user_id, type, title, message, data)
      VALUES (?, 'system', '账户已被封禁', ?, ?)
    `, [id, `您的账户因"${reason}"被封禁，如有疑问请联系客服`, JSON.stringify({ reason, admin_id: req.user.userId })]);

    res.json({ message: '用户封禁成功' });
  });
});

// 解封用户
router.post('/users/:id/unban', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;

  db.run('UPDATE users SET is_active = 1 WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: '用户不存在' });
    }

    // 发送解封通知
    db.run(`
      INSERT INTO notifications (user_id, type, title, message)
      VALUES (?, 'system', '账户已解封', '您的账户已恢复正常，感谢您的理解与配合')
    `, [id]);

    res.json({ message: '用户解封成功' });
  });
});

// 获取举报列表
router.get('/reports', authenticateToken, requireAdmin, (req, res) => {
  // 这里可以添加举报系统的逻辑
  res.json({ reports: [], message: '举报系统待开发' });
});

// 获取系统日志
router.get('/logs', authenticateToken, requireAdmin, (req, res) => {
  const { page = 1, limit = 100, type = 'all' } = req.query;
  const offset = (page - 1) * limit;

  // 这里可以添加系统日志的逻辑
  res.json({ 
    logs: [],
    message: '系统日志功能待开发',
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      hasMore: false
    }
  });
});

// 发送系统通知
router.post('/notifications/broadcast', authenticateToken, requireAdmin, (req, res) => {
  const { title, message, type = 'system', target = 'all' } = req.body;

  if (!title || !message) {
    return res.status(400).json({ error: '标题和消息不能为空' });
  }

  let query = 'SELECT id FROM users WHERE is_active = 1';
  const params = [];

  if (target === 'streamers') {
    query = `
      SELECT DISTINCT u.id 
      FROM users u 
      JOIN streamers s ON u.id = s.user_id 
      WHERE u.is_active = 1
    `;
  } else if (target === 'vip') {
    query += ' AND vip_level != "none"';
  }

  db.all(query, params, (err, users) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    // 批量插入通知
    const insertQuery = `
      INSERT INTO notifications (user_id, type, title, message)
      VALUES (?, ?, ?, ?)
    `;

    let completed = 0;
    const total = users.length;

    if (total === 0) {
      return res.json({ message: '没有找到目标用户' });
    }

    users.forEach(user => {
      db.run(insertQuery, [user.id, type, title, message], (err) => {
        completed++;
        if (completed === total) {
          res.json({ 
            message: `通知发送成功，共发送给 ${total} 个用户`,
            count: total
          });
        }
      });
    });
  });
});

module.exports = router;