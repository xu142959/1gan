import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LiveRoom from './components/LiveRoom';
import HomePage from './components/HomePage';
import CategoriesPage from './components/CategoriesPage';
import CategoryViewPage from './components/CategoryViewPage';
import FavoritesPage from './components/FavoritesPage';
import RecommendedPage from './components/RecommendedPage';
import MyModelsPage from './components/MyModelsPage';
import MyCollectionPage from './components/MyCollectionPage';
import PrivacySettingsPage from './components/PrivacySettingsPage';
import NewStreamersPage from './components/NewStreamersPage';
import HotStreamersPage from './components/HotStreamersPage';
import VIPStreamersPage from './components/VIPStreamersPage';
import UserProfilePage from './components/UserProfilePage';
import MyFriendsPage from './components/MyFriendsPage';
import NotificationsPage from './components/NotificationsPage';
import SettingsPrivacyPage from './components/SettingsPrivacyPage';
import StreamerDashboard from './components/StreamerDashboard';
import AdminApp from './components/AdminApp';

type ViewType = 
  | 'home' 
  | 'live' 
  | 'categories' 
  | 'category-view'
  | 'favorites'
  | 'recommended'
  | 'my-models'
  | 'my-collection'
  | 'privacy-settings'
  | 'new-streamers'
  | 'hot-streamers'
  | 'vip-streamers'
  | 'user-profile'
  | 'my-friends'
  | 'notifications'
  | 'settings-privacy'
  | 'streamer-dashboard';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Check if current URL is admin
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin' || path.startsWith('/admin/')) {
      setIsAdminMode(true);
    } else {
      setIsAdminMode(false);
    }

    // Listen for URL changes
    const handlePopState = () => {
      const newPath = window.location.pathname;
      if (newPath === '/admin' || newPath.startsWith('/admin/')) {
        setIsAdminMode(true);
      } else {
        setIsAdminMode(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setIsAdminMode(true);
  };

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setIsAdminMode(false);
    setCurrentView('home');
  };

  const navigateToLive = () => {
    setCurrentView('live');
  };

  const navigateToCategories = () => {
    setCurrentView('categories');
  };

  const navigateToCategoryView = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setCurrentView('category-view');
  };

  const navigateBackToCategories = () => {
    setCurrentView('categories');
  };

  const navigateToFavorites = () => {
    setCurrentView('favorites');
  };

  const navigateToRecommended = () => {
    setCurrentView('recommended');
  };

  const navigateToMyModels = () => {
    setCurrentView('my-models');
  };

  const navigateToMyCollection = () => {
    setCurrentView('my-collection');
  };

  const navigateToPrivacySettings = () => {
    setCurrentView('privacy-settings');
  };

  const navigateToNewStreamers = () => {
    setCurrentView('new-streamers');
  };

  const navigateToHotStreamers = () => {
    setCurrentView('hot-streamers');
  };

  const navigateToVIPStreamers = () => {
    setCurrentView('vip-streamers');
  };

  const navigateToUserProfile = () => {
    setCurrentView('user-profile');
  };

  const navigateToMyFriends = () => {
    setCurrentView('my-friends');
  };

  const navigateToNotifications = () => {
    setCurrentView('notifications');
  };

  const navigateToSettingsPrivacy = () => {
    setCurrentView('settings-privacy');
  };

  const navigateToStreamerDashboard = () => {
    setCurrentView('streamer-dashboard');
  };

  // Render Admin App if in admin mode
  if (isAdminMode) {
    return <AdminApp onBackToHome={navigateToHome} />;
  }

  // Render Main App
  return (
    <div className="bg-slate-900 min-h-screen">
      <Navbar 
        onLogoClick={navigateToHome}
        onUserProfileClick={navigateToUserProfile}
        onMyFriendsClick={navigateToMyFriends}
        onNotificationsClick={navigateToNotifications}
        onSettingsPrivacyClick={navigateToSettingsPrivacy}
        onStreamerDashboardClick={navigateToStreamerDashboard}
        onAdminDashboardClick={navigateToAdmin}
      />
      <div className="pt-16">
        {currentView === 'home' && (
          <HomePage 
            onStreamClick={navigateToLive} 
            onCategoriesClick={navigateToCategories}
            onFavoritesClick={navigateToFavorites}
            onRecommendedClick={navigateToRecommended}
            onMyModelsClick={navigateToMyModels}
            onMyCollectionClick={navigateToMyCollection}
            onPrivacySettingsClick={navigateToPrivacySettings}
            onNewStreamersClick={navigateToNewStreamers}
            onHotStreamersClick={navigateToHotStreamers}
            onVIPStreamersClick={navigateToVIPStreamers}
          />
        )}
        {currentView === 'live' && (
          <LiveRoom onBackToHome={navigateToHome} />
        )}
        {currentView === 'categories' && (
          <CategoriesPage 
            onBackToHome={navigateToHome} 
            onCategoryClick={navigateToCategoryView}
          />
        )}
        {currentView === 'category-view' && (
          <CategoryViewPage 
            categoryName={selectedCategory}
            onBackToCategories={navigateBackToCategories}
            onStreamClick={navigateToLive}
          />
        )}
        {currentView === 'favorites' && (
          <FavoritesPage 
            onBackToHome={navigateToHome}
            onStreamClick={navigateToLive}
          />
        )}
        {currentView === 'recommended' && (
          <RecommendedPage 
            onBackToHome={navigateToHome}
            onStreamClick={navigateToLive}
          />
        )}
        {currentView === 'my-models' && (
          <MyModelsPage 
            onBackToHome={navigateToHome}
            onStreamClick={navigateToLive}
          />
        )}
        {currentView === 'my-collection' && (
          <MyCollectionPage 
            onBackToHome={navigateToHome}
            onStreamClick={navigateToLive}
          />
        )}
        {currentView === 'privacy-settings' && (
          <PrivacySettingsPage 
            onBackToHome={navigateToHome}
          />
        )}
        {currentView === 'new-streamers' && (
          <NewStreamersPage 
            onBackToHome={navigateToHome}
            onStreamClick={navigateToLive}
          />
        )}
        {currentView === 'hot-streamers' && (
          <HotStreamersPage 
            onBackToHome={navigateToHome}
            onStreamClick={navigateToLive}
          />
        )}
        {currentView === 'vip-streamers' && (
          <VIPStreamersPage 
            onBackToHome={navigateToHome}
            onStreamClick={navigateToLive}
          />
        )}
        {currentView === 'user-profile' && (
          <UserProfilePage 
            onBackToHome={navigateToHome}
          />
        )}
        {currentView === 'my-friends' && (
          <MyFriendsPage 
            onBackToHome={navigateToHome}
          />
        )}
        {currentView === 'notifications' && (
          <NotificationsPage 
            onBackToHome={navigateToHome}
          />
        )}
        {currentView === 'settings-privacy' && (
          <SettingsPrivacyPage 
            onBackToHome={navigateToHome}
          />
        )}
        {currentView === 'streamer-dashboard' && (
          <StreamerDashboard 
            onBackToHome={navigateToHome}
          />
        )}
      </div>
    </div>
  );
}

export default App;