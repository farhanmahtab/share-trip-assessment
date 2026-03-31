import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="glass-panel p-8 mb-8 rounded-2xl shadow-lg border border-white/20 backdrop-blur-md bg-white/5">
      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
        Premium Products
      </h1>
      <p className="text-gray-400 max-w-2xl text-lg">
        Explore our curated selection of high-quality items. Experience seamless browsing even with our resilient back-end integration.
      </p>
    </header>
  );
};

export default Header;
