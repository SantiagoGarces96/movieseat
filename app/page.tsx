"use client";
import Hero from './components/home/Hero';
import Features from './components/home/Features';

const Home = () => {
  return (
    <div>
      <main className="min-h-screen bg-gray-100">
        <Hero />
        <Features />
      </main>
    </div>
  );
};

export default Home;