import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LiveRoom from './components/LiveRoom';
import HomePage from './components/HomePage';
import CategoriesPage from './components/CategoriesPage';
import CategoryViewPage from './components/CategoryViewPage';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'live' | 'categories' | 'category-view'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const navigateToHome = () => {
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
      </div>
    </div>
  );
}

export default App;