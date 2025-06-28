import React from 'react';
import Sidebar from './Sidebar';
import LiveGrid from './LiveGrid';

interface HomePageProps {
  onStreamClick: () => void;
  onCategoriesClick: () => void;
  onFavoritesClick: () => void;
  onRecommendedClick: () => void;
  onMyModelsClick: () => void;
  onMyCollectionClick: () => void;
  onPrivacySettingsClick: () => void;
  onNewStreamersClick: () => void;
  onHotStreamersClick: () => void;
  onVIPStreamersClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ 
  onStreamClick, 
  onCategoriesClick,
  onFavoritesClick,
  onRecommendedClick,
  onMyModelsClick,
  onMyCollectionClick,
  onPrivacySettingsClick,
  onNewStreamersClick,
  onHotStreamersClick,
  onVIPStreamersClick
}) => {
  return (
    <div className="flex">
      <Sidebar 
        onCategoriesClick={onCategoriesClick}
        onFavoritesClick={onFavoritesClick}
        onRecommendedClick={onRecommendedClick}
        onMyModelsClick={onMyModelsClick}
        onMyCollectionClick={onMyCollectionClick}
        onPrivacySettingsClick={onPrivacySettingsClick}
        onNewStreamersClick={onNewStreamersClick}
        onHotStreamersClick={onHotStreamersClick}
        onVIPStreamersClick={onVIPStreamersClick}
      />
      <div className="flex-1 ml-64">
        <LiveGrid onStreamClick={onStreamClick} />
      </div>
    </div>
  );
};

export default HomePage;