const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/db.cjs');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'streamflow_secret_key_2024';

// 注册
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    // 验证输入
    if (!username || !email || !password) {
      return res.status(400).json({ error: '用户名、邮箱和密码不能为空' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: '密码至少需要6个字符' });
    }

    // 检查用户是否已存在
    db.get('SELECT id FROM users WHERE username = ? OR email = ?', [username, email], async (err, row) => {
      if (err) {
        return res.status(500).json({ error: '数据库错误' });
      }

      if (row) {
        return res.status(400).json({ error: '用户名或邮箱已存在' });
      }

      // 加密密码
      const passwordHash = await bcrypt.hash(password, 10);

      // 创建用户
      db.run(`
        INSERT INTO users (username, email, password_hash, tokens)
        VALUES (?, ?, ?, ?)
      `, [username, email, passwordHash, 100], function(err) {
        if (err) {
          return res.status(500).json({ error: '创建用户失败' });
        }

        // 生成JWT token
        const token = jwt.sign(
          { userId: this.lastID, username },
          JWT_SECRET,
          { expiresIn: '7d' }
        );

        res.status(201).json({
          message: '注册成功',
          token,
          user: {
            id: this.lastID,
            username,
            email,
            level: 1,
            tokens: 100,
            vip_level: 'none'
          }
        });
      });
    });
  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 登录
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: '邮箱和密码不能为空' });
    }

    // 查找用户（支持用户名或邮箱登录）
    db.get(`
      SELECT * FROM users 
      WHERE email = ? OR username = ?
    `, [email, email], async (err, user) => {
      if (err) {
        return res.status(500).json({ error: '数据库错误' });
      }

      if (!user) {
        return res.status(401).json({ error: '用户不存在' });
      }

      // 验证密码
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({ error: '密码错误' });
      }

      // 更新最后登录时间
      db.run('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);

      // 生成JWT token
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: '登录成功',
        token,
        user: {
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
          bio: user.bio
        }
      });
    });
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 验证token中间件
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: '访问令牌缺失' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: '访问令牌无效' });
    }
    req.user = user;
    next();
  });
};

// 获取当前用户信息
router.get('/me', authenticateToken, (req, res) => {
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
      created_at: user.created_at
    });
  });
});

// 刷新token
router.post('/refresh', authenticateToken, (req, res) => {
  const newToken = jwt.sign(
    { userId: req.user.userId, username: req.user.username },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ token: newToken });
});

module.exports = { router, authenticateToken };