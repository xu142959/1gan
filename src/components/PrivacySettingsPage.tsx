import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Settings,
  Shield,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Bell,
  BellOff,
  Globe,
  Users,
  UserX,
  Save
} from 'lucide-react';

interface PrivacySettingsPageProps {
  onBackToHome: () => void;
}

const PrivacySettingsPage: React.FC<PrivacySettingsPageProps> = ({ onBackToHome }) => {
  const [settings, setSettings] = useState({
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowPrivateMessages: true,
    showViewingHistory: false,
    allowTips: true,
    emailNotifications: true,
    pushNotifications: true,
    showInSearch: true,
    allowFollowers: true,
    showFavorites: false
  });

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = () => {
    // In a real app, this would save to backend
    console.log('Saving settings:', settings);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBackToHome}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center space-x-3">
              <Settings className="text-green-500" size={32} />
              <div>
                <h1 className="text-3xl font-bold text-white">隐私配置</h1>
                <p className="text-slate-400 mt-1">管理你的隐私和安全设置</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-8">
          {/* Profile Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 rounded-xl p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="text-blue-500" size={24} />
              <h2 className="text-xl font-bold text-white">个人资料隐私</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">个人资料可见性</h3>
                  <p className="text-slate-400 text-sm">控制谁可以查看你的个人资料</p>
                </div>
                <select
                  value={settings.profileVisibility}
                  onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                  className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-green-500 focus:outline-none"
                >
                  <option value="public">公开</option>
                  <option value="friends">仅好友</option>
                  <option value="private">私密</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">显示在线状态</h3>
                  <p className="text-slate-400 text-sm">让其他用户看到你是否在线</p>
                </div>
                <button
                  onClick={() => handleSettingChange('showOnlineStatus', !settings.showOnlineStatus)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.showOnlineStatus ? 'bg-green-500' : 'bg-slate-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.showOnlineStatus ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">在搜索中显示</h3>
                  <p className="text-slate-400 text-sm">允许其他用户在搜索中找到你</p>
                </div>
                <button
                  onClick={() => handleSettingChange('showInSearch', !settings.showInSearch)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.showInSearch ? 'bg-green-500' : 'bg-slate-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.showInSearch ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Communication Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800 rounded-xl p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Users className="text-purple-500" size={24} />
              <h2 className="text-xl font-bold text-white">交流设置</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">允许私信</h3>
                  <p className="text-slate-400 text-sm">其他用户可以给你发送私信</p>
                </div>
                <button
                  onClick={() => handleSettingChange('allowPrivateMessages', !settings.allowPrivateMessages)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.allowPrivateMessages ? 'bg-green-500' : 'bg-slate-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.allowPrivateMessages ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">允许关注</h3>
                  <p className="text-slate-400 text-sm">其他用户可以关注你</p>
                </div>
                <button
                  onClick={() => handleSettingChange('allowFollowers', !settings.allowFollowers)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.allowFollowers ? 'bg-green-500' : 'bg-slate-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.allowFollowers ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">允许小费</h3>
                  <p className="text-slate-400 text-sm">其他用户可以给你发送小费</p>
                </div>
                <button
                  onClick={() => handleSettingChange('allowTips', !settings.allowTips)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.allowTips ? 'bg-green-500' : 'bg-slate-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.allowTips ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Activity Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800 rounded-xl p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Eye className="text-orange-500" size={24} />
              <h2 className="text-xl font-bold text-white">活动隐私</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">显示观看历史</h3>
                  <p className="text-slate-400 text-sm">在你的个人资料中显示观看历史</p>
                </div>
                <button
                  onClick={() => handleSettingChange('showViewingHistory', !settings.showViewingHistory)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.showViewingHistory ? 'bg-green-500' : 'bg-slate-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.showViewingHistory ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">显示收藏列表</h3>
                  <p className="text-slate-400 text-sm">其他用户可以看到你的收藏</p>
                </div>
                <button
                  onClick={() => handleSettingChange('showFavorites', !settings.showFavorites)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.showFavorites ? 'bg-green-500' : 'bg-slate-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.showFavorites ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800 rounded-xl p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="text-yellow-500" size={24} />
              <h2 className="text-xl font-bold text-white">通知设置</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">邮件通知</h3>
                  <p className="text-slate-400 text-sm">接收重要更新的邮件通知</p>
                </div>
                <button
                  onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.emailNotifications ? 'bg-green-500' : 'bg-slate-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">推送通知</h3>
                  <p className="text-slate-400 text-sm">接收浏览器推送通知</p>
                </div>
                <button
                  onClick={() => handleSettingChange('pushNotifications', !settings.pushNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.pushNotifications ? 'bg-green-500' : 'bg-slate-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-end"
          >
            <button
              onClick={saveSettings}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Save size={20} />
              <span>保存设置</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettingsPage;