import React from 'react';
import Sidebar from './Sidebar';
import LiveGrid from './LiveGrid';

interface HomePageProps {
  onStreamClick: () => void;
  onCategoriesClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStreamClick, onCategoriesClick }) => {
  return (
    <div className="flex">
      <Sidebar onCategoriesClick={onCategoriesClick} />
      <div className="flex-1 ml-64">
        <LiveGrid onStreamClick={onStreamClick} />
      </div>
    </div>
  );
};

export default HomePage;