import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Bell,
  Settings,
  Check,
  X,
  Heart,
  MessageCircle,
  Gift,
  Star,
  Users,
  Trash2
} from 'lucide-react';

interface NotificationsPageProps {
  onBackToHome: () => void;
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ onBackToHome }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'update',
      title: '为您的私人秀录像制定个性化标题',
      content: '在直播结束后为您的私人秀录像会议！让经验丰富的用户更容易一眼就看到您。',
      time: '大约1个月前',
      isNew: true,
      badge: 'NEW'
    },
    {
      id: 2,
      type: 'update',
      title: '发送卡通表情表达您的感受',
      content: '欢迎使用全新的卡通表情功能，可以增强您的私信体验。',
      time: '大约2个月前',
      isNew: true,
      badge: 'NEW'
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isNew: false } : notif
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'update': return <Bell className="text-blue-400" size={20} />;
      case 'like': return <Heart className="text-red-400" size={20} />;
      case 'message': return <MessageCircle className="text-green-400" size={20} />;
      case 'gift': return <Gift className="text-yellow-400" size={20} />;
      default: return <Bell className="text-blue-400" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header Navigation */}
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBackToHome}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex space-x-8">
              <span className="text-slate-400">我的简历</span>
              <span className="text-slate-400">我的好友</span>
              <span className="text-white border-b-2 border-red-500 pb-1">我的通知</span>
              <span className="text-slate-400">设置和隐私</span>
              <span className="text-slate-400">我的订阅</span>
              <span className="text-white border-b-2 border-red-500 pb-1">重要更新</span>
            </div>
          </div>
          <div className="text-slate-400">分类</div>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">重要更新</h1>
            <p className="text-slate-400">查看最新的功能更新和重要通知</p>
          </div>
          <button className="bg-slate-800 text-slate-400 hover:text-white p-3 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
            <Settings size={20} />
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-slate-800 rounded-xl p-6 border ${
                notification.isNew ? 'border-red-500/30' : 'border-slate-700'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-white font-medium">{notification.title}</h3>
                      {notification.badge && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                          {notification.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {notification.isNew && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-slate-400 hover:text-green-400 transition-colors"
                          title="标记为已读"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-slate-400 hover:text-red-400 transition-colors"
                        title="删除通知"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 mb-3 leading-relaxed">
                    {notification.content}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">{notification.time}</span>
                    <div className="flex items-center space-x-2">
                      <button className="text-slate-400 hover:text-white p-2 rounded transition-colors">
                        <Heart size={16} />
                      </button>
                      <button className="text-slate-400 hover:text-white p-2 rounded transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Promotional Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Name your Private show</h3>
              <h2 className="text-2xl font-bold text-yellow-300 mb-2">RECORDINGS</h2>
              <p className="text-sm opacity-90 mb-4">Save the Recording?</p>
              <div className="flex items-center space-x-2">
                <span className="bg-white/20 px-2 py-1 rounded text-xs">NEW</span>
                <span className="text-sm">My Media Collection</span>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <Search className="text-white/50" size={20} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-6 text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Show your feelings with</h3>
              <h2 className="text-2xl font-bold text-yellow-300 mb-2">animations</h2>
              <p className="text-sm opacity-90 mb-4">in Private Chat</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">😊</span>
                <span className="text-2xl">😍</span>
                <span className="text-2xl">🥰</span>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <Search className="text-white/50" size={20} />
            </div>
          </motion.div>
        </div>

        {/* Empty State (when no notifications) */}
        {notifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Bell className="text-slate-400 mx-auto mb-4" size={64} />
            <h2 className="text-2xl font-bold text-white mb-4">暂无通知</h2>
            <p className="text-slate-400">当有新的更新或消息时，它们会出现在这里</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;