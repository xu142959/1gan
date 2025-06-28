import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LiveRoom from './components/LiveRoom';
import HomePage from './components/HomePage';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'live'>('home');

  const navigateToHome = () => {
    setCurrentView('home');
  };

  const navigateToLive = () => {
    setCurrentView('live');
  };

  return (
    <div className="bg-slate-900 min-h-screen">
      <Navbar onLogoClick={navigateToHome} />
      <div className="pt-16">
        {currentView === 'home' ? (
          <HomePage onStreamClick={navigateToLive} />
        ) : (
          <LiveRoom onBackToHome={navigateToHome} />
        )}
      </div>
    </div>
  );
}

export default App;