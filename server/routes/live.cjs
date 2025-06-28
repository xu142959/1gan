const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../database/db.cjs');
const { authenticateToken } = require('./auth.cjs');

const router = express.Router();

// 获取直播间信息
router.get('/room/:roomId', (req, res) => {
  const { roomId } = req.params;

  const query = `
    SELECT lr.*, s.stage_name, s.thumbnail_url, s.is_verified,
           u.username, u.avatar_url, u.country, u.vip_level
    FROM live_rooms lr
    JOIN streamers s ON lr.streamer_id = s.id
    JOIN users u ON s.user_id = u.id
    WHERE lr.room_id = ?
  `;

  db.get(query, [roomId], (err, room) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    if (!room) {
      return res.status(404).json({ error: '直播间不存在' });
    }

    res.json({
      id: room.id,
      roomId: room.room_id,
      streamerId: room.streamer_id,
      streamerName: room.stage_name || room.username,
      streamerAvatar: room.thumbnail_url || room.avatar_url,
      isVerified: room.is_verified,
      country: room.country,
      vipLevel: room.vip_level,
      title: room.title,
      description: room.description,
      category: room.category,
      tags: room.tags ? JSON.parse(room.tags) : [],
      isPrivate: room.is_private,
      privatePrice: room.private_price,
      currentViewers: room.current_viewers,
      maxViewers: room.max_viewers,
      totalTips: room.total_tips,
      goal: {
        amount: room.goal_amount,
        description: room.goal_description,
        progress: room.goal_progress
      },
      isRecording: room.is_recording,
      streamQuality: room.stream_quality,
      status: room.status,
      startedAt: room.started_at,
      duration: room.duration
    });
  });
});

// 获取直播间聊天记录
router.get('/room/:roomId/messages', (req, res) => {
  const { roomId } = req.params;
  const { limit = 50, before } = req.query;

  let query = `
    SELECT cm.*, u.avatar_url, u.vip_level
    FROM chat_messages cm
    LEFT JOIN users u ON cm.user_id = u.id
    WHERE cm.room_id = ? AND cm.is_private = 0
  `;

  const params = [roomId];

  if (before) {
    query += ' AND cm.created_at < ?';
    params.push(before);
  }

  query += ' ORDER BY cm.created_at DESC LIMIT ?';
  params.push(parseInt(limit));

  db.all(query, params, (err, messages) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    const formattedMessages = messages.reverse().map(msg => ({
      id: msg.id,
      username: msg.username,
      message: msg.message,
      messageType: msg.message_type,
      avatarUrl: msg.avatar_url,
      vipLevel: msg.vip_level,
      timestamp: msg.created_at
    }));

    res.json({ messages: formattedMessages });
  });
});

// 发送聊天消息
router.post('/room/:roomId/message', authenticateToken, (req, res) => {
  const { roomId } = req.params;
  const { message, isPrivate = false } = req.body;
  const userId = req.user.userId;

  if (!message || message.trim().length === 0) {
    return res.status(400).json({ error: '消息不能为空' });
  }

  if (message.length > 500) {
    return res.status(400).json({ error: '消息长度不能超过500字符' });
  }

  // 获取用户信息
  db.get('SELECT username FROM users WHERE id = ?', [userId], (err, user) => {
    if (err || !user) {
      return res.status(500).json({ error: '用户信息获取失败' });
    }

    // 保存消息到数据库
    db.run(`
      INSERT INTO chat_messages (room_id, user_id, username, message, is_private)
      VALUES (?, ?, ?, ?, ?)
    `, [roomId, userId, user.username, message.trim(), isPrivate ? 1 : 0], function(err) {
      if (err) {
        return res.status(500).json({ error: '消息发送失败' });
      }

      res.json({
        id: this.lastID,
        message: '消息发送成功'
      });
    });
  });
});

// 发送礼物
router.post('/room/:roomId/gift', authenticateToken, (req, res) => {
  const { roomId } = req.params;
  const { giftId, quantity = 1, message = '' } = req.body;
  const userId = req.user.userId;

  if (!giftId || quantity < 1) {
    return res.status(400).json({ error: '礼物信息无效' });
  }

  // 获取礼物信息
  db.get('SELECT * FROM gifts WHERE id = ? AND is_active = 1', [giftId], (err, gift) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    if (!gift) {
      return res.status(404).json({ error: '礼物不存在' });
    }

    const totalAmount = gift.price * quantity;

    // 检查用户代币余额
    db.get('SELECT tokens FROM users WHERE id = ?', [userId], (err, user) => {
      if (err) {
        return res.status(500).json({ error: '数据库错误' });
      }

      if (!user || user.tokens < totalAmount) {
        return res.status(400).json({ error: '代币余额不足' });
      }

      // 获取直播间信息
      db.get('SELECT streamer_id FROM live_rooms WHERE room_id = ?', [roomId], (err, room) => {
        if (err || !room) {
          return res.status(404).json({ error: '直播间不存在' });
        }

        // 开始事务
        db.serialize(() => {
          db.run('BEGIN TRANSACTION');

          // 扣除用户代币
          db.run('UPDATE users SET tokens = tokens - ? WHERE id = ?', [totalAmount, userId], (err) => {
            if (err) {
              db.run('ROLLBACK');
              return res.status(500).json({ error: '代币扣除失败' });
            }

            // 增加主播收益
            db.run('UPDATE streamers SET total_earnings = total_earnings + ? WHERE id = ?', [totalAmount, room.streamer_id], (err) => {
              if (err) {
                db.run('ROLLBACK');
                return res.status(500).json({ error: '收益更新失败' });
              }

              // 更新直播间小费总额
              db.run('UPDATE live_rooms SET total_tips = total_tips + ? WHERE room_id = ?', [totalAmount, roomId], (err) => {
                if (err) {
                  db.run('ROLLBACK');
                  return res.status(500).json({ error: '直播间数据更新失败' });
                }

                // 记录礼物交易
                db.run(`
                  INSERT INTO gift_transactions (from_user_id, to_streamer_id, room_id, gift_id, quantity, total_amount, message)
                  VALUES (?, ?, ?, ?, ?, ?, ?)
                `, [userId, room.streamer_id, roomId, giftId, quantity, totalAmount, message], function(err) {
                  if (err) {
                    db.run('ROLLBACK');
                    return res.status(500).json({ error: '交易记录失败' });
                  }

                  db.run('COMMIT');

                  res.json({
                    message: '礼物发送成功',
                    transactionId: this.lastID,
                    gift: {
                      name: gift.name,
                      quantity,
                      totalAmount
                    }
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

// 获取礼物列表
router.get('/gifts', (req, res) => {
  db.all('SELECT * FROM gifts WHERE is_active = 1 ORDER BY price ASC', (err, gifts) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    res.json({ gifts });
  });
});

// 进入私人表演
router.post('/room/:roomId/private', authenticateToken, (req, res) => {
  const { roomId } = req.params;
  const userId = req.user.userId;

  // 获取直播间信息
  db.get(`
    SELECT lr.*, s.private_rate 
    FROM live_rooms lr
    JOIN streamers s ON lr.streamer_id = s.id
    WHERE lr.room_id = ?
  `, [roomId], (err, room) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    if (!room) {
      return res.status(404).json({ error: '直播间不存在' });
    }

    if (room.is_private) {
      return res.status(400).json({ error: '直播间已在私人模式' });
    }

    // 检查用户代币余额
    db.get('SELECT tokens FROM users WHERE id = ?', [userId], (err, user) => {
      if (err) {
        return res.status(500).json({ error: '数据库错误' });
      }

      const requiredTokens = room.private_price || room.private_rate || 100;

      if (!user || user.tokens < requiredTokens) {
        return res.status(400).json({ error: '代币余额不足，无法进入私人表演' });
      }

      // 开启私人模式
      db.run(`
        UPDATE live_rooms 
        SET is_private = 1, private_price = ?
        WHERE room_id = ?
      `, [requiredTokens, roomId], (err) => {
        if (err) {
          return res.status(500).json({ error: '私人模式开启失败' });
        }

        res.json({
          message: '私人表演开始',
          privatePrice: requiredTokens
        });
      });
    });
  });
});

// 结束私人表演
router.post('/room/:roomId/private/end', authenticateToken, (req, res) => {
  const { roomId } = req.params;

  db.run('UPDATE live_rooms SET is_private = 0 WHERE room_id = ?', [roomId], function(err) {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: '直播间不存在' });
    }

    res.json({ message: '私人表演已结束' });
  });
});

// 更新观看人数
router.post('/room/:roomId/viewers', (req, res) => {
  const { roomId } = req.params;
  const { action } = req.body; // 'join' or 'leave'

  const increment = action === 'join' ? 1 : -1;

  db.run(`
    UPDATE live_rooms 
    SET current_viewers = MAX(0, current_viewers + ?),
        max_viewers = MAX(max_viewers, current_viewers + ?)
    WHERE room_id = ?
  `, [increment, increment, roomId], function(err) {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }

    // 获取更新后的观看人数
    db.get('SELECT current_viewers FROM live_rooms WHERE room_id = ?', [roomId], (err, room) => {
      if (err) {
        return res.status(500).json({ error: '数据库错误' });
      }

      res.json({
        currentViewers: room ? room.current_viewers : 0
      });
    });
  });
});

module.exports = router;