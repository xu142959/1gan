import React from 'react';
import Sidebar from './Sidebar';
import LiveGrid from './LiveGrid';

interface HomePageProps {
  onStreamClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStreamClick }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <LiveGrid onStreamClick={onStreamClick} />
      </div>
    </div>
  );
};

export default HomePage;