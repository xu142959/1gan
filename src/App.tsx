import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LiveGrid from './components/LiveGrid';

function App() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 ml-64">
          <LiveGrid />
        </main>
      </div>
    </div>
  );
}

export default App;