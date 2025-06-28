import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Gift, 
  Users, 
  Settings, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Send,
  Star,
  Crown,
  Smile,
  Camera,
  Mic,
  MicOff,
  VideoOff
} from 'lucide-react';

const LiveRoom = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [message, setMessage] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);

  const tipGoals = [
    { id: 1, name: '金金', amount: 5000, current: 0 },
    { id: 2, name: '醉醉', amount: 10, current: 10 },
    { id: 3, name: 'kiki', amount: 3278, current: 3278 },
    { id: 4, name: '番茄', amount: 312, current: 312 },
    { id: 5, name: '蒜头', amount: 1317, current: 1317 }
  ];

  const chatMessages = [
    { id: 1, user: 'mr.smith', message: '才能够达成目标', time: '今天 4:20', isVip: true },
    { id: 2, user: 'mr.smith', message: '🔥🔥🔥🔥🔥', time: '今天 4:20', isVip: true },
    { id: 3, user: 'mr.smith', message: 'all ladys so 🔥🔥🔥🔥🔥🔥', time: '今天 4:20', isVip: true },
    { id: 4, user: 'mr.smith', message: '💰 ❤️', time: '今天 4:20', isVip: true },
    { id: 5, user: 'Kai_Joker', message: '那个?', time: '今天 4:20', isVip: false }
  ];

  const giftOptions = [
    { name: '总裁永恒爱', price: 10, icon: '💎' },
    { name: '财务正主播', price: 10, icon: '💰' },
    { name: '爱的小奶茶', price: 99, icon: '🧋' }
  ];

  return (
    <div className="bg-slate-900 min-h-screen">
      {/* Top Navigation */}
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">B</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">badgirl777888</h1>
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <span>简介</span>
                <span>视频</span>
                <span>照片 40</span>
                <span>热门推荐</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-slate-400 hover:text-white">
              <Settings size={20} />
            </button>
            <div className="text-white">下一个主播 &gt;</div>
            <div className="text-slate-400">分类</div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Video Area */}
        <div className="flex-1 relative">
          {/* Live Badge */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>LIVE</span>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 aspect-video">
            <img 
              src="https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Live Stream"
              className="w-full h-full object-cover"
            />
            
            {/* Tip Goals Overlay */}
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="text-center mb-2">
                <div className="text-2xl font-bold">why1000</div>
                <div className="text-sm text-slate-300">存: 5000</div>
              </div>
              <div className="grid grid-cols-5 gap-2 text-xs">
                {tipGoals.map((goal) => (
                  <div key={goal.id} className="text-center">
                    <div className="font-bold">{goal.id}号{goal.name}</div>
                    <div className="text-yellow-400">{goal.amount}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-4 left-4 flex items-center space-x-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <button className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                <Maximize size={20} />
              </button>
            </div>

            {/* Viewer Count */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
              <Users size={16} />
              <span>1438</span>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="bg-slate-800 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Heart className="text-red-500" size={20} />
                <span className="text-white">8.7k</span>
              </div>
              <div className="text-slate-400">目标: 883代币 开始</div>
            </div>
            <div className="text-slate-400">26.4%</div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-slate-800 border-l border-slate-700 flex flex-col">
          {/* User Actions */}
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center space-x-2 mb-4">
              <button className="text-white hover:text-red-400">
                <Volume2 size={20} />
              </button>
              <span className="text-white">大厅</span>
              <button className="text-white hover:text-blue-400">
                <Users size={20} />
              </button>
              <span className="text-white">私人</span>
              <div className="ml-auto flex items-center space-x-1">
                <Users size={16} className="text-slate-400" />
                <span className="text-white">51</span>
              </div>
            </div>

            {/* Tip Goals Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-green-400 text-sm">🎯 982 代币达成目标</span>
              </div>
              <div className="bg-slate-700 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full w-3/4"></div>
              </div>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm">
                开始倒数秀
              </button>
            </div>
          </div>

          {/* Gift Menu */}
          <div className="p-4 border-b border-slate-700">
            <div className="grid grid-cols-1 gap-2">
              {giftOptions.map((gift, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-700 rounded-lg p-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{gift.icon}</span>
                    <span className="text-white text-sm">{gift.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400 text-sm">{gift.price} 代币</span>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs">
                      充值目标
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="flex items-start space-x-2">
                  <div className="text-xs text-slate-400">{msg.time}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-1">
                      {msg.isVip && <Crown className="text-yellow-400" size={12} />}
                      <span className="text-orange-400 text-sm font-medium">{msg.user}:</span>
                    </div>
                    <div className="text-white text-sm">{msg.message}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex items-center space-x-2 mb-2">
                <button className="text-slate-400 hover:text-white">
                  <Smile size={20} />
                </button>
                <span className="text-slate-400 text-sm">公共聊天</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="发送小费"
                  className="flex-1 bg-slate-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg">
                  <Send size={16} />
                </button>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                最低 50 个代币代币
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveRoom;