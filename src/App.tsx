import React from 'react';
import Navbar from './components/Navbar';
import LiveRoom from './components/LiveRoom';

function App() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <Navbar />
      <div className="pt-16">
        <LiveRoom />
      </div>
    </div>
  );
}

export default App;