import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LiveStreams from './components/LiveStreams';
import Categories from './components/Categories';
import Features from './components/Features';
import CreatorSpotlight from './components/CreatorSpotlight';
import Statistics from './components/Statistics';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <Navbar />
      <Hero />
      <LiveStreams />
      <Categories />
      <Features />
      <CreatorSpotlight />
      <Statistics />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default App;