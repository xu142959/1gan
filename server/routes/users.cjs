const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../database/db.cjs');
const { authenticateToken } = require('./auth.cjs');

const router = express.Router();

// 配置文件上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/avatars');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('只允许上传图片文件'));
    }
  }
});

// 获取用户资料
router.get('/profile', authenticateToken, (req, res) => {
  db.get('SELECT * FROM users WHERE id = ?', [req.user.userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      level: user.level,
      experience: user.experience,
      tokens: user.tokens,
      vip_level: user.vip_level,
      avatar_url: user.avatar_url,
      country: user.country,
      age: user.age,
      gender: user.gender,
      bio: user.bio,
      created_at: user.created_at,
      last_login: user.last_login
    });
  });
});

// 更新用户资料
router.put('/profile', authenticateToken, (req, res) => {
  const { country, age, gender, bio } = req.body;
  const userId = req.user.userId;

  db.run(`
    UPDATE users 
    SET country = ?, age = ?, gender = ?, bio = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `, [country, age, gender, bio, userId], function(err) {
    if (err) {
      return res.status(500).json({ error: '更新失败' });
    }

    res.json({ message: '资料更新成功' });
  });
});

// 上传头像
router.post('/avatar', authenticateToken, upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: '请选择要上传的图片' });
  }

  const avatarUrl = `/uploads/avatars/${req.file.filename}`;

  db.run('UPDATE users SET avatar_url = ? WHERE id = ?', [avatarUrl, req.user.userId], (err) => {
    if (err) {
      return res.status(500).json({ error: '头像更新失败' });
    }

    res.json({
      message: '头像上传成功',
      avatar_url: avatarUrl
    });
  });
});

// 获取用户关注的主播
router.get('/following', authenticateToken, (req, res) => {
  const { page = 1, limit = 24 } = req.query;
  const offset = (page - 1) * limit;

  const query = `
    SELECT s.*, u.username, u.avatar_url, u.country,
           lr.current_viewers, lr.title as room_title,
           f.created_at as followed_at
    FROM follows f
    JOIN streamers s ON f.streamer_id = s.id
    JOIN users u ON s.user_id = u.id
    LEFT JOIN live_rooms lr ON s.id = lr.streamer_id AND lr.status = 'live'
    WHERE f.user_id = ?
    ORDER BY s.is_online DESC, f.created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.all(query, [req.user.userId, parseInt(limit), offset], (err, streamers) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    const formattedStreamers = streamers.map(streamer => ({
      id: streamer.id,
      username: streamer.stage_name || streamer.username,
      avatar_url: streamer.thumbnail_url || streamer.avatar_url,
      viewers: streamer.current_viewers || 0,
      isLive: streamer.is_online,
      isHD: streamer.is_hd,
      category: streamer.category,
      tags: streamer.tags ? JSON.parse(streamer.tags) : [],
      rating: streamer.rating,
      country: streamer.country,
      roomTitle: streamer.room_title,
      roomId: streamer.room_id,
      followedAt: streamer.followed_at
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

// 获取用户收藏的主播
router.get('/favorites', authenticateToken, (req, res) => {
  const { page = 1, limit = 24 } = req.query;
  const offset = (page - 1) * limit;

  const query = `
    SELECT s.*, u.username, u.avatar_url, u.country,
           lr.current_viewers, lr.title as room_title,
           fav.created_at as favorited_at
    FROM favorites fav
    JOIN streamers s ON fav.streamer_id = s.id
    JOIN users u ON s.user_id = u.id
    LEFT JOIN live_rooms lr ON s.id = lr.streamer_id AND lr.status = 'live'
    WHERE fav.user_id = ?
    ORDER BY s.is_online DESC, fav.created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.all(query, [req.user.userId, parseInt(limit), offset], (err, streamers) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    const formattedStreamers = streamers.map(streamer => ({
      id: streamer.id,
      username: streamer.stage_name || streamer.username,
      avatar_url: streamer.thumbnail_url || streamer.avatar_url,
      viewers: streamer.current_viewers || 0,
      isLive: streamer.is_online,
      isHD: streamer.is_hd,
      category: streamer.category,
      tags: streamer.tags ? JSON.parse(streamer.tags) : [],
      rating: streamer.rating,
      country: streamer.country,
      roomTitle: streamer.room_title,
      roomId: streamer.room_id,
      favoritedAt: streamer.favorited_at
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

// 添加收藏
router.post('/favorites/:streamerId', authenticateToken, (req, res) => {
  const { streamerId } = req.params;
  const userId = req.user.userId;

  // 检查是否已收藏
  db.get('SELECT id FROM favorites WHERE user_id = ? AND streamer_id = ?', [userId, streamerId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    if (row) {
      return res.status(400).json({ error: '已经收藏了这个主播' });
    }

    db.run('INSERT INTO favorites (user_id, streamer_id) VALUES (?, ?)', [userId, streamerId], (err) => {
      if (err) {
        return res.status(500).json({ error: '收藏失败' });
      }

      res.json({ message: '收藏成功' });
    });
  });
});

// 取消收藏
router.delete('/favorites/:streamerId', authenticateToken, (req, res) => {
  const { streamerId } = req.params;
  const userId = req.user.userId;

  db.run('DELETE FROM favorites WHERE user_id = ? AND streamer_id = ?', [userId, streamerId], function(err) {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    if (this.changes === 0) {
      return res.status(400).json({ error: '未收藏这个主播' });
    }

    res.json({ message: '取消收藏成功' });
  });
});

// 获取用户通知
router.get('/notifications', authenticateToken, (req, res) => {
  const { page = 1, limit = 20, unread_only = false } = req.query;
  const offset = (page - 1) * limit;

  let query = 'SELECT * FROM notifications WHERE user_id = ?';
  const params = [req.user.userId];

  if (unread_only === 'true') {
    query += ' AND is_read = 0';
  }

  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), offset);

  db.all(query, params, (err, notifications) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    const formattedNotifications = notifications.map(notif => ({
      id: notif.id,
      type: notif.type,
      title: notif.title,
      message: notif.message,
      data: notif.data ? JSON.parse(notif.data) : null,
      isRead: notif.is_read,
      createdAt: notif.created_at
    }));

    res.json({
      notifications: formattedNotifications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        hasMore: formattedNotifications.length === parseInt(limit)
      }
    });
  });
});

// 标记通知为已读
router.put('/notifications/:id/read', authenticateToken, (req, res) => {
  const { id } = req.params;

  db.run('UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?', [id, req.user.userId], function(err) {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: '通知不存在' });
    }

    res.json({ message: '通知已标记为已读' });
  });
});

// 标记所有通知为已读
router.put('/notifications/read-all', authenticateToken, (req, res) => {
  db.run('UPDATE notifications SET is_read = 1 WHERE user_id = ?', [req.user.userId], (err) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    res.json({ message: '所有通知已标记为已读' });
  });
});

// 删除通知
router.delete('/notifications/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM notifications WHERE id = ? AND user_id = ?', [id, req.user.userId], function(err) {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: '通知不存在' });
    }

    res.json({ message: '通知删除成功' });
  });
});

// 获取用户统计信息
router.get('/stats', authenticateToken, (req, res) => {
  const userId = req.user.userId;

  // 获取关注数、收藏数、消费总额等统计信息
  const queries = {
    following: 'SELECT COUNT(*) as count FROM follows WHERE user_id = ?',
    favorites: 'SELECT COUNT(*) as count FROM favorites WHERE user_id = ?',
    totalSpent: 'SELECT SUM(total_amount) as total FROM gift_transactions WHERE from_user_id = ?',
    unreadNotifications: 'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = 0'
  };

  const stats = {};
  let completed = 0;
  const total = Object.keys(queries).length;

  Object.entries(queries).forEach(([key, query]) => {
    db.get(query, [userId], (err, result) => {
      if (!err) {
        stats[key] = result.count || result.total || 0;
      } else {
        stats[key] = 0;
      }

      completed++;
      if (completed === total) {
        res.json(stats);
      }
    });
  });
});

module.exports = router;