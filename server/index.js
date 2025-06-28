const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const streamerRoutes = require('./routes/streamers');
const userRoutes = require('./routes/users');
const liveRoutes = require('./routes/live');
const adminRoutes = require('./routes/admin');

// Import database
const db = require('./database/db');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/streamers', streamerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/live', liveRoutes);
app.use('/api/admin', adminRoutes);

// Socket.IO for real-time features
io.on('connection', (socket) => {
  console.log('用户连接:', socket.id);

  // 加入直播间
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`用户 ${socket.id} 加入直播间 ${roomId}`);
    
    // 通知房间内其他用户
    socket.to(roomId).emit('user-joined', {
      userId: socket.id,
      timestamp: new Date()
    });
  });

  // 离开直播间
  socket.on('leave-room', (roomId) => {
    socket.leave(roomId);
    console.log(`用户 ${socket.id} 离开直播间 ${roomId}`);
    
    // 通知房间内其他用户
    socket.to(roomId).emit('user-left', {
      userId: socket.id,
      timestamp: new Date()
    });
  });

  // 发送聊天消息
  socket.on('chat-message', (data) => {
    const { roomId, message, username } = data;
    
    // 广播消息到房间内所有用户
    io.to(roomId).emit('chat-message', {
      id: Date.now(),
      username,
      message,
      timestamp: new Date(),
      userId: socket.id
    });
  });

  // 发送礼物
  socket.on('send-gift', (data) => {
    const { roomId, gift, username, amount } = data;
    
    // 广播礼物到房间内所有用户
    io.to(roomId).emit('gift-received', {
      id: Date.now(),
      username,
      gift,
      amount,
      timestamp: new Date(),
      userId: socket.id
    });
  });

  // 主播状态更新
  socket.on('streamer-status', (data) => {
    const { streamerId, status, viewers } = data;
    
    // 广播主播状态更新
    socket.broadcast.emit('streamer-status-update', {
      streamerId,
      status,
      viewers,
      timestamp: new Date()
    });
  });

  // 断开连接
  socket.on('disconnect', () => {
    console.log('用户断开连接:', socket.id);
  });
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: '服务器内部错误',
    message: process.env.NODE_ENV === 'development' ? err.message : '请稍后重试'
  });
});

// 404 处理
app.use('*', (req, res) => {
  res.status(404).json({ error: '接口不存在' });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 服务器运行在端口 ${PORT}`);
  console.log(`📡 Socket.IO 服务已启动`);
  console.log(`🗄️  数据库已连接`);
});

module.exports = { app, io };