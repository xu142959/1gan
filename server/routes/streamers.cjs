const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../database/db.cjs');
const { authenticateToken } = require('./auth.cjs');

const router = express.Router();

// 获取所有在线主播
router.get('/online', (req, res) => {
  const { category, page = 1, limit = 24, sort = 'viewers' } = req.query;
  const offset = (page - 1) * limit;

  let query = `
    SELECT s.*, u.username, u.avatar_url, u.country, u.age,
           lr.current_viewers, lr.title as room_title, lr.category as room_category,
           lr.tags as room_tags, lr.is_private, lr.private_price
    FROM streamers s
    JOIN users u ON s.user_id = u.id
    LEFT JOIN live_rooms lr ON s.id = lr.streamer_id AND lr.status = 'live'
    WHERE s.is_online = 1 AND s.status = 'live'
  `;

  const params = [];

  if (category) {
    query += ' AND s.category = ?';
    params.push(category);
  }

  // 排序
  switch (sort) {
    case 'viewers':
      query += ' ORDER BY lr.current_viewers DESC';
      break;
    case 'rating':
      query += ' ORDER BY s.rating DESC';
      break;
    case 'newest':
      query += ' ORDER BY s.created_at DESC';
      break;
    default:
      query += ' ORDER BY lr.current_viewers DESC';
  }

  query += ' LIMIT ? OFFSET ?';
  params.push(parseInt(limit), offset);

  db.all(query, params, (err, streamers) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    // 处理数据格式
    const formattedStreamers = streamers.map(streamer => ({
      id: streamer.id,
      username: streamer.stage_name || streamer.username,
      avatar_url: streamer.thumbnail_url || streamer.avatar_url,
      viewers: streamer.current_viewers || 0,
      isLive: streamer.is_online,
      isHD: streamer.is_hd,
      category: streamer.room_category || streamer.category,
      tags: streamer.room_tags ? JSON.parse(streamer.room_tags) : (streamer.tags ? JSON.parse(streamer.tags) : []),
      rating: streamer.rating,
      country: streamer.country,
      age: streamer.age,
      isPrivate: streamer.is_private,
      privatePrice: streamer.private_price,
      roomTitle: streamer.room_title,
      roomId: streamer.room_id
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

// 获取推荐主播
router.get('/recommended', (req, res) => {
  const { page = 1, limit = 24 } = req.query;
  const offset = (page - 1) * limit;

  const query = `
    SELECT s.*, u.username, u.avatar_url, u.country, u.age,
           lr.current_viewers, lr.title as room_title
    FROM streamers s
    JOIN users u ON s.user_id = u.id
    LEFT JOIN live_rooms lr ON s.id = lr.streamer_id AND lr.status = 'live'
    WHERE s.rating >= 4.0 OR s.total_followers > 1000
    ORDER BY (s.rating * 0.6 + (s.total_followers / 1000) * 0.4) DESC
    LIMIT ? OFFSET ?
  `;

  db.all(query, [parseInt(limit), offset], (err, streamers) => {
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
      age: streamer.age,
      roomTitle: streamer.room_title,
      roomId: streamer.room_id,
      isRecommended: true
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

// 获取新主播
router.get('/new', (req, res) => {
  const { page = 1, limit = 24 } = req.query;
  const offset = (page - 1) * limit;

  const query = `
    SELECT s.*, u.username, u.avatar_url, u.country, u.age,
           lr.current_viewers, lr.title as room_title
    FROM streamers s
    JOIN users u ON s.user_id = u.id
    LEFT JOIN live_rooms lr ON s.id = lr.streamer_id AND lr.status = 'live'
    WHERE s.created_at >= datetime('now', '-30 days')
    ORDER BY s.created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.all(query, [parseInt(limit), offset], (err, streamers) => {
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
      age: streamer.age,
      roomTitle: streamer.room_title,
      roomId: streamer.room_id,
      isNew: true,
      daysStreaming: Math.floor((Date.now() - new Date(streamer.created_at).getTime()) / (1000 * 60 * 60 * 24))
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

// 获取热门主播
router.get('/hot', (req, res) => {
  const { page = 1, limit = 24 } = req.query;
  const offset = (page - 1) * limit;

  const query = `
    SELECT s.*, u.username, u.avatar_url, u.country, u.age,
           lr.current_viewers, lr.title as room_title,
           (lr.current_viewers * 0.4 + s.total_followers * 0.3 + s.rating * 20 * 0.3) as hotness_score
    FROM streamers s
    JOIN users u ON s.user_id = u.id
    LEFT JOIN live_rooms lr ON s.id = lr.streamer_id AND lr.status = 'live'
    WHERE s.is_online = 1 AND lr.current_viewers > 500
    ORDER BY hotness_score DESC
    LIMIT ? OFFSET ?
  `;

  db.all(query, [parseInt(limit), offset], (err, streamers) => {
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
      age: streamer.age,
      roomTitle: streamer.room_title,
      roomId: streamer.room_id,
      isHot: true,
      hotnessScore: Math.round(streamer.hotness_score),
      trendingScore: Math.min(100, Math.round(streamer.hotness_score / 10))
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

// 获取VIP主播
router.get('/vip', (req, res) => {
  const { page = 1, limit = 24, level = 'all' } = req.query;
  const offset = (page - 1) * limit;

  let query = `
    SELECT s.*, u.username, u.avatar_url, u.country, u.age, u.vip_level,
           lr.current_viewers, lr.title as room_title
    FROM streamers s
    JOIN users u ON s.user_id = u.id
    LEFT JOIN live_rooms lr ON s.id = lr.streamer_id AND lr.status = 'live'
    WHERE s.is_verified = 1 AND u.vip_level != 'none'
  `;

  const params = [];

  if (level !== 'all') {
    query += ' AND u.vip_level = ?';
    params.push(level);
  }

  query += ` 
    ORDER BY 
      CASE u.vip_level 
        WHEN 'diamond' THEN 4 
        WHEN 'platinum' THEN 3 
        WHEN 'gold' THEN 2 
        WHEN 'silver' THEN 1 
        ELSE 0 
      END DESC,
      s.rating DESC
    LIMIT ? OFFSET ?
  `;

  params.push(parseInt(limit), offset);

  db.all(query, params, (err, streamers) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    const vipLevelMap = {
      'diamond': '钻石',
      'platinum': '白金', 
      'gold': '黄金',
      'silver': '银牌'
    };

    const formattedStreamers = streamers.map(streamer => ({
      id: streamer.id,
      username: streamer.stage_name || streamer.username,
      avatar_url: streamer.thumbnail_url || streamer.avatar_url,
      viewers: streamer.current_viewers || 0,
      isLive: streamer.is_online,
      isHD: true, // VIP主播默认高清
      category: streamer.category,
      tags: streamer.tags ? JSON.parse(streamer.tags) : [],
      rating: streamer.rating,
      country: streamer.country,
      age: streamer.age,
      roomTitle: streamer.room_title,
      roomId: streamer.room_id,
      isVIP: true,
      vipLevel: vipLevelMap[streamer.vip_level] || '银牌',
      isVerified: streamer.is_verified,
      specialFeatures: Math.floor(Math.random() * 5) + 3
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

// 按分类获取主播
router.get('/category/:category', (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 24, sort = 'viewers' } = req.query;
  const offset = (page - 1) * limit;

  let query = `
    SELECT s.*, u.username, u.avatar_url, u.country, u.age,
           lr.current_viewers, lr.title as room_title
    FROM streamers s
    JOIN users u ON s.user_id = u.id
    LEFT JOIN live_rooms lr ON s.id = lr.streamer_id AND lr.status = 'live'
    WHERE s.category = ? OR lr.category = ?
  `;

  const params = [category, category];

  // 排序
  switch (sort) {
    case 'viewers':
      query += ' ORDER BY lr.current_viewers DESC';
      break;
    case 'rating':
      query += ' ORDER BY s.rating DESC';
      break;
    case 'newest':
      query += ' ORDER BY s.created_at DESC';
      break;
    default:
      query += ' ORDER BY lr.current_viewers DESC';
  }

  query += ' LIMIT ? OFFSET ?';
  params.push(parseInt(limit), offset);

  db.all(query, params, (err, streamers) => {
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
      age: streamer.age,
      roomTitle: streamer.room_title,
      roomId: streamer.room_id
    }));

    res.json({
      streamers: formattedStreamers,
      category,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        hasMore: formattedStreamers.length === parseInt(limit)
      }
    });
  });
});

// 搜索主播
router.get('/search', (req, res) => {
  const { q, page = 1, limit = 24 } = req.query;
  const offset = (page - 1) * limit;

  if (!q) {
    return res.status(400).json({ error: '搜索关键词不能为空' });
  }

  const query = `
    SELECT s.*, u.username, u.avatar_url, u.country, u.age,
           lr.current_viewers, lr.title as room_title
    FROM streamers s
    JOIN users u ON s.user_id = u.id
    LEFT JOIN live_rooms lr ON s.id = lr.streamer_id AND lr.status = 'live'
    WHERE s.stage_name LIKE ? OR u.username LIKE ? OR s.tags LIKE ? OR s.category LIKE ?
    ORDER BY s.is_online DESC, lr.current_viewers DESC
    LIMIT ? OFFSET ?
  `;

  const searchTerm = `%${q}%`;
  const params = [searchTerm, searchTerm, searchTerm, searchTerm, parseInt(limit), offset];

  db.all(query, params, (err, streamers) => {
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
      age: streamer.age,
      roomTitle: streamer.room_title,
      roomId: streamer.room_id
    }));

    res.json({
      streamers: formattedStreamers,
      query: q,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        hasMore: formattedStreamers.length === parseInt(limit)
      }
    });
  });
});

// 获取主播详情
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT s.*, u.username, u.avatar_url, u.country, u.age, u.bio, u.vip_level,
           lr.current_viewers, lr.title as room_title, lr.description as room_description,
           lr.goal_amount, lr.goal_description, lr.goal_progress
    FROM streamers s
    JOIN users u ON s.user_id = u.id
    LEFT JOIN live_rooms lr ON s.id = lr.streamer_id AND lr.status = 'live'
    WHERE s.id = ?
  `;

  db.get(query, [id], (err, streamer) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    if (!streamer) {
      return res.status(404).json({ error: '主播不存在' });
    }

    res.json({
      id: streamer.id,
      username: streamer.stage_name || streamer.username,
      stageName: streamer.stage_name,
      description: streamer.description,
      avatar_url: streamer.thumbnail_url || streamer.avatar_url,
      viewers: streamer.current_viewers || 0,
      followers: streamer.total_followers,
      isLive: streamer.is_online,
      isHD: streamer.is_hd,
      isVerified: streamer.is_verified,
      category: streamer.category,
      tags: streamer.tags ? JSON.parse(streamer.tags) : [],
      rating: streamer.rating,
      totalRatings: streamer.total_ratings,
      country: streamer.country,
      age: streamer.age,
      bio: streamer.bio,
      vipLevel: streamer.vip_level,
      roomId: streamer.room_id,
      roomTitle: streamer.room_title,
      roomDescription: streamer.room_description,
      hourlyRate: streamer.hourly_rate,
      privateRate: streamer.private_rate,
      languages: streamer.languages ? JSON.parse(streamer.languages) : [],
      socialLinks: streamer.social_links ? JSON.parse(streamer.social_links) : {},
      goal: {
        amount: streamer.goal_amount,
        description: streamer.goal_description,
        progress: streamer.goal_progress
      },
      schedule: streamer.schedule ? JSON.parse(streamer.schedule) : {},
      lastSeen: streamer.last_seen,
      createdAt: streamer.created_at
    });
  });
});

// 关注主播
router.post('/:id/follow', authenticateToken, (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  // 检查是否已关注
  db.get('SELECT id FROM follows WHERE user_id = ? AND streamer_id = ?', [userId, id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    if (row) {
      return res.status(400).json({ error: '已经关注了这个主播' });
    }

    // 添加关注
    db.run('INSERT INTO follows (user_id, streamer_id) VALUES (?, ?)', [userId, id], function(err) {
      if (err) {
        return res.status(500).json({ error: '关注失败' });
      }

      // 更新主播关注数
      db.run('UPDATE streamers SET total_followers = total_followers + 1 WHERE id = ?', [id]);

      res.json({ message: '关注成功' });
    });
  });
});

// 取消关注主播
router.delete('/:id/follow', authenticateToken, (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  db.run('DELETE FROM follows WHERE user_id = ? AND streamer_id = ?', [userId, id], function(err) {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    if (this.changes === 0) {
      return res.status(400).json({ error: '未关注这个主播' });
    }

    // 更新主播关注数
    db.run('UPDATE streamers SET total_followers = total_followers - 1 WHERE id = ?', [id]);

    res.json({ message: '取消关注成功' });
  });
});

// 评分主播
router.post('/:id/rate', authenticateToken, (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: '评分必须在1-5之间' });
  }

  // 检查是否已评分
  db.get('SELECT id FROM ratings WHERE user_id = ? AND streamer_id = ?', [userId, id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    if (row) {
      // 更新评分
      db.run(`
        UPDATE ratings SET rating = ?, comment = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE user_id = ? AND streamer_id = ?
      `, [rating, comment, userId, id], (err) => {
        if (err) {
          return res.status(500).json({ error: '更新评分失败' });
        }
        updateStreamerRating(id);
        res.json({ message: '评分更新成功' });
      });
    } else {
      // 新增评分
      db.run(`
        INSERT INTO ratings (user_id, streamer_id, rating, comment) 
        VALUES (?, ?, ?, ?)
      `, [userId, id, rating, comment], (err) => {
        if (err) {
          return res.status(500).json({ error: '评分失败' });
        }
        updateStreamerRating(id);
        res.json({ message: '评分成功' });
      });
    }
  });
});

// 更新主播平均评分
function updateStreamerRating(streamerId) {
  db.get(`
    SELECT AVG(rating) as avg_rating, COUNT(*) as total_ratings 
    FROM ratings WHERE streamer_id = ?
  `, [streamerId], (err, result) => {
    if (!err && result) {
      db.run(`
        UPDATE streamers 
        SET rating = ROUND(?, 2), total_ratings = ? 
        WHERE id = ?
      `, [result.avg_rating, result.total_ratings, streamerId]);
    }
  });
}

module.exports = router;