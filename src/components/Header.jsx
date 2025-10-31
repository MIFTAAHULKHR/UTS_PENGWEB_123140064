import React from 'react';
import { Newspaper } from 'lucide-react';

const Header = ({ onCategoryChange, activeCategory }) => {
  const categories = ['technology', 'business', 'sports'];
  
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Newspaper className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Digit 4 News Portal</h1>
          </div>
        </div>
        <nav className="flex space-x-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'bg-blue-700 hover:bg-blue-600'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
