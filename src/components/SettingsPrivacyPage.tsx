import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Settings,
  Shield,
  Bell,
  Eye,
  Lock,
  Globe,
  Users,
  MessageCircle,
  Save,
  User,
  Mail,
  Smartphone
} from 'lucide-react';

interface SettingsPrivacyPageProps {
  onBackToHome: () => void;
}

const SettingsPrivacyPage: React.FC<SettingsPrivacyPageProps> = ({ onBackToHome }) => {
  const [settings, setSettings] = useState({
    // Privacy Settings
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowPrivateMessages: true,
    showViewingHistory: false,
    allowFollowers: true,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    
    // Communication Settings
    allowTips: true,
    autoReply: false,
    
    // Account Settings
    twoFactorAuth: false
  });

  const [activeTab, setActiveTab] = useState('隐私');

  const tabs = ['隐私', '通知', '账户', '主播通知设置'];

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const ToggleSwitch: React.FC<{ 
    enabled: boolean; 
    onChange: (enabled: boolean) => void;
    disabled?: boolean;
  }> = ({ enabled, onChange, disabled = false }) => (
    <button
      onClick={() => !disabled && onChange(!enabled)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-green-500' : 'bg-slate-600'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

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
              <span className="text-slate-400">我的通知</span>
              <span className="text-white border-b-2 border-red-500 pb-1">设置和隐私</span>
              <span className="text-slate-400">我的订阅</span>
              <span className="text-slate-400">重要更新</span>
            </div>
          </div>
          <div className="text-slate-400">分类</div>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">设置和隐私</h1>
          <p className="text-slate-400">管理你的账户设置和隐私偏好</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 border-b border-slate-700 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 text-lg font-medium transition-colors relative ${
                activeTab === tab
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeSettingsTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === '隐私' && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800 rounded-xl p-6"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="text-blue-500" size={24} />
                  <h2 className="text-xl font-bold text-white">个人资料隐私</h2>
                </div>

                <div className="space-y-6">
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
                      <option value="public">所有人</option>
                      <option value="friends">主播们</option>
                      <option value="private">私密</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">代币信息可见性</h3>
                      <p className="text-slate-400 text-sm">控制谁可以看到你的代币余额和消费</p>
                    </div>
                    <select
                      className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-green-500 focus:outline-none"
                    >
                      <option value="private">主播们</option>
                      <option value="public">所有人</option>
                      <option value="none">无人</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-800 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">自动充值</h3>
                <p className="text-slate-400 text-sm mb-4">
                  上次购买后的代币余额不足10枚时，您的账户会自动充值。了解更多关于自动充值的信息。
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-white">启动自动充值：</span>
                  <ToggleSwitch
                    enabled={settings.autoReply}
                    onChange={(value) => handleSettingChange('autoReply', value)}
                  />
                </div>
              </motion.div>
            </>
          )}

          {activeTab === '通知' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Bell className="text-yellow-500" size={24} />
                  <h2 className="text-xl font-bold text-white">产品更新和促销邮件</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">产品更新</h3>
                      <p className="text-slate-400 text-sm">接收有关产品功能与更新的邮件</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.emailNotifications}
                      onChange={(value) => handleSettingChange('emailNotifications', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">特别优惠</h3>
                      <p className="text-slate-400 text-sm">接收有关特别优惠与促销的邮件</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.pushNotifications}
                      onChange={(value) => handleSettingChange('pushNotifications', value)}
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-slate-700 rounded-lg">
                  <p className="text-slate-300 text-sm">
                    退订将停止向您发送所有产品更新和促销邮件，您可以随时重新订阅。
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === '账户' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">我的电邮</h2>
                    <p className="text-slate-400">hu***@***.com ✓</p>
                  </div>
                  <button className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors">
                    变更电子邮件
                  </button>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">我的密码</h2>
                    <p className="text-slate-400">••••••••</p>
                  </div>
                  <button className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors">
                    更改密码
                  </button>
                </div>

                <div className="border-t border-slate-700 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-white font-medium">我的用户名</h3>
                      <p className="text-slate-400 text-sm">gtx1</p>
                    </div>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                      获得终极会员
                    </button>
                  </div>
                  <p className="text-slate-400 text-sm">
                    🔒 更改您的用户名，您必须先成为终极会员。
                  </p>
                </div>

                <div className="border-t border-slate-700 pt-6 mt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">双重认证</h3>
                      <p className="text-slate-400 text-sm">
                        为了更好保护您的账户，我们建议您启用双重认证(2FA)。有了双重认证，您可以通过输入Google身份验证器中的代码来保护您的账户。
                      </p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.twoFactorAuth}
                      onChange={(value) => handleSettingChange('twoFactorAuth', value)}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">活跃登录</h3>
                <p className="text-slate-400 text-sm mb-4">
                  以下为您使用我们平台的设备及设备信息。
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div>
                        <p className="text-white font-medium">Windows • Chrome • 上次在线：台湾 — 现在</p>
                      </div>
                    </div>
                    <span className="text-green-400 text-sm">当前窗口</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Mac • Chrome • 上次在线：中国香港特别行政区 — 2025-06-27周四上午 4:20</p>
                    </div>
                    <button className="text-red-400 hover:text-red-300 text-sm">
                      退出
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === '主播通知设置' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4">主播通知设置</h2>
              <p className="text-slate-400 text-sm mb-6">
                当下方列表中的主播们进行直播时您会收到邮件通知，我们将会发送给您，我们将会发送给您主播设置通知，并且您将收到她们的通知。
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-600 rounded-full"></div>
                    <div>
                      <p className="text-white font-medium">badgirl777888</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-400 text-sm">电邮</span>
                      <ToggleSwitch enabled={true} onChange={() => {}} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-400 text-sm">浏览器通知</span>
                      <ToggleSwitch enabled={false} onChange={() => {}} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-400 text-sm">Telegram 通知程序</span>
                      <ToggleSwitch enabled={false} onChange={() => {}} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-600 rounded-full"></div>
                    <div>
                      <p className="text-white font-medium">GouGou-111</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-400 text-sm">电邮</span>
                      <ToggleSwitch enabled={true} onChange={() => {}} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-400 text-sm">浏览器通知</span>
                      <ToggleSwitch enabled={false} onChange={() => {}} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-400 text-sm">Telegram 通知程序</span>
                      <ToggleSwitch enabled={false} onChange={() => {}} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition-colors flex items-center space-x-2">
            <Save size={20} />
            <span>保存设置</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPrivacyPage;