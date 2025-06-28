const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 创建数据库连接
const dbPath = path.join(__dirname, 'streamflow.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('数据库连接失败:', err.message);
  } else {
    console.log('✅ SQLite 数据库连接成功');
  }
});

// 创建表结构
const initDatabase = () => {
  // 用户表
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      avatar_url VARCHAR(255),
      level INTEGER DEFAULT 1,
      experience INTEGER DEFAULT 0,
      tokens INTEGER DEFAULT 0,
      vip_level VARCHAR(20) DEFAULT 'none',
      country VARCHAR(50),
      age INTEGER,
      gender VARCHAR(10),
      bio TEXT,
      is_active BOOLEAN DEFAULT 1,
      last_login DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 主播表
  db.run(`
    CREATE TABLE IF NOT EXISTS streamers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE NOT NULL,
      stage_name VARCHAR(100) NOT NULL,
      description TEXT,
      category VARCHAR(50),
      tags TEXT, -- JSON array of tags
      is_verified BOOLEAN DEFAULT 0,
      is_online BOOLEAN DEFAULT 0,
      current_viewers INTEGER DEFAULT 0,
      total_followers INTEGER DEFAULT 0,
      total_earnings DECIMAL(10,2) DEFAULT 0,
      hourly_rate DECIMAL(8,2),
      private_rate DECIMAL(8,2),
      room_id VARCHAR(50) UNIQUE,
      stream_key VARCHAR(100) UNIQUE,
      stream_url VARCHAR(255),
      thumbnail_url VARCHAR(255),
      is_hd BOOLEAN DEFAULT 0,
      languages TEXT, -- JSON array of languages
      schedule TEXT, -- JSON object for schedule
      social_links TEXT, -- JSON object for social media
      rating DECIMAL(3,2) DEFAULT 0,
      total_ratings INTEGER DEFAULT 0,
      status VARCHAR(20) DEFAULT 'offline', -- offline, live, private, away
      last_seen DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // 直播间表
  db.run(`
    CREATE TABLE IF NOT EXISTS live_rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      streamer_id INTEGER NOT NULL,
      room_id VARCHAR(50) UNIQUE NOT NULL,
      title VARCHAR(200),
      description TEXT,
      category VARCHAR(50),
      tags TEXT, -- JSON array
      is_private BOOLEAN DEFAULT 0,
      private_price DECIMAL(8,2),
      current_viewers INTEGER DEFAULT 0,
      max_viewers INTEGER DEFAULT 0,
      total_tips DECIMAL(10,2) DEFAULT 0,
      goal_amount DECIMAL(10,2),
      goal_description VARCHAR(200),
      goal_progress DECIMAL(10,2) DEFAULT 0,
      is_recording BOOLEAN DEFAULT 0,
      recording_url VARCHAR(255),
      stream_quality VARCHAR(20) DEFAULT 'HD',
      started_at DATETIME,
      ended_at DATETIME,
      duration INTEGER DEFAULT 0, -- in seconds
      status VARCHAR(20) DEFAULT 'offline',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (streamer_id) REFERENCES streamers (id) ON DELETE CASCADE
    )
  `);

  // 关注表
  db.run(`
    CREATE TABLE IF NOT EXISTS follows (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      streamer_id INTEGER NOT NULL,
      notification_enabled BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      FOREIGN KEY (streamer_id) REFERENCES streamers (id) ON DELETE CASCADE,
      UNIQUE(user_id, streamer_id)
    )
  `);

  // 聊天消息表
  db.run(`
    CREATE TABLE IF NOT EXISTS chat_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_id VARCHAR(50) NOT NULL,
      user_id INTEGER NOT NULL,
      username VARCHAR(50) NOT NULL,
      message TEXT NOT NULL,
      message_type VARCHAR(20) DEFAULT 'text', -- text, gift, tip, system
      is_private BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // 礼物表
  db.run(`
    CREATE TABLE IF NOT EXISTS gifts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      icon_url VARCHAR(255),
      price DECIMAL(8,2) NOT NULL,
      category VARCHAR(50),
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 礼物记录表
  db.run(`
    CREATE TABLE IF NOT EXISTS gift_transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      from_user_id INTEGER NOT NULL,
      to_streamer_id INTEGER NOT NULL,
      room_id VARCHAR(50) NOT NULL,
      gift_id INTEGER NOT NULL,
      quantity INTEGER DEFAULT 1,
      total_amount DECIMAL(10,2) NOT NULL,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (from_user_id) REFERENCES users (id) ON DELETE CASCADE,
      FOREIGN KEY (to_streamer_id) REFERENCES streamers (id) ON DELETE CASCADE,
      FOREIGN KEY (gift_id) REFERENCES gifts (id) ON DELETE CASCADE
    )
  `);

  // 收藏表
  db.run(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      streamer_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      FOREIGN KEY (streamer_id) REFERENCES streamers (id) ON DELETE CASCADE,
      UNIQUE(user_id, streamer_id)
    )
  `);

  // 评分表
  db.run(`
    CREATE TABLE IF NOT EXISTS ratings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      streamer_id INTEGER NOT NULL,
      rating INTEGER CHECK(rating >= 1 AND rating <= 5),
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      FOREIGN KEY (streamer_id) REFERENCES streamers (id) ON DELETE CASCADE,
      UNIQUE(user_id, streamer_id)
    )
  `);

  // 通知表
  db.run(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      type VARCHAR(50) NOT NULL, -- follow, gift, tip, system, live_start
      title VARCHAR(200) NOT NULL,
      message TEXT NOT NULL,
      data TEXT, -- JSON data
      is_read BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // 管理员表
  db.run(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE NOT NULL,
      role VARCHAR(50) DEFAULT 'moderator', -- admin, moderator, support
      permissions TEXT, -- JSON array of permissions
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // 主播统计表
  db.run(`
    CREATE TABLE IF NOT EXISTS streamer_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      streamer_id INTEGER NOT NULL,
      date DATE NOT NULL,
      total_viewers INTEGER DEFAULT 0,
      max_viewers INTEGER DEFAULT 0,
      stream_duration INTEGER DEFAULT 0, -- in minutes
      total_tips DECIMAL(10,2) DEFAULT 0,
      total_messages INTEGER DEFAULT 0,
      new_followers INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (streamer_id) REFERENCES streamers (id) ON DELETE CASCADE,
      UNIQUE(streamer_id, date)
    )
  `);

  // 插入默认数据
  insertDefaultData();
};

// 插入默认数据
const insertDefaultData = () => {
  // 默认礼物
  const defaultGifts = [
    { name: '玫瑰', description: '浪漫的玫瑰花', price: 10, category: 'romantic', icon_url: '/icons/rose.png' },
    { name: '香槟', description: '庆祝的香槟', price: 50, category: 'celebration', icon_url: '/icons/champagne.png' },
    { name: '钻石', description: '闪亮的钻石', price: 100, category: 'luxury', icon_url: '/icons/diamond.png' },
    { name: '皇冠', description: '尊贵的皇冠', price: 500, category: 'luxury', icon_url: '/icons/crown.png' },
    { name: '跑车', description: '豪华跑车', price: 1000, category: 'luxury', icon_url: '/icons/car.png' }
  ];

  defaultGifts.forEach(gift => {
    db.run(`
      INSERT OR IGNORE INTO gifts (name, description, price, category, icon_url)
      VALUES (?, ?, ?, ?, ?)
    `, [gift.name, gift.description, gift.price, gift.category, gift.icon_url]);
  });

  // 创建测试管理员账户
  const bcrypt = require('bcryptjs');
  const adminPassword = bcrypt.hashSync('admin123', 10);
  
  db.run(`
    INSERT OR IGNORE INTO users (username, email, password_hash, level, tokens, vip_level)
    VALUES (?, ?, ?, ?, ?, ?)
  `, ['admin', 'admin@streamflow.com', adminPassword, 99, 10000, 'diamond'], function(err) {
    if (!err && this.changes > 0) {
      db.run(`
        INSERT OR IGNORE INTO admins (user_id, role, permissions)
        VALUES (?, ?, ?)
      `, [this.lastID, 'admin', JSON.stringify(['all'])]);
    }
  });
};

// 初始化数据库
initDatabase();

module.exports = db;