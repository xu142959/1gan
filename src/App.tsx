import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LiveRoom from './components/LiveRoom';
import HomePage from './components/HomePage';
import CategoriesPage from './components/CategoriesPage';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'live' | 'categories'>('home');

  const navigateToHome = () => {
    setCurrentView('home');
  };

  const navigateToLive = () => {
    setCurrentView('live');
  };

  const navigateToCategories = () => {
    setCurrentView('categories');
  };

  return (
    <div className="bg-slate-900 min-h-screen">
      <Navbar onLogoClick={navigateToHome} />
      <div className="pt-16">
        {currentView === 'home' && (
          <HomePage onStreamClick={navigateToLive} onCategoriesClick={navigateToCategories} />
        )}
        {currentView === 'live' && (
          <LiveRoom onBackToHome={navigateToHome} />
        )}
        {currentView === 'categories' && (
          <CategoriesPage onBackToHome={navigateToHome} />
        )}
      </div>
    </div>
  );
}

export default App;