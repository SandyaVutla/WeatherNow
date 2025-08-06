
import React, { useState } from 'react';
import { SearchIcon } from './Icons';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full relative">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter a city..."
        disabled={isLoading}
        className="w-full pl-5 pr-12 py-3 bg-white/30 dark:bg-black/30 text-white placeholder-white/70 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 disabled:opacity-50"
      />
      <button 
        type="submit" 
        disabled={isLoading}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/50 dark:bg-black/50 rounded-full hover:bg-white/70 dark:hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
      >
        <SearchIcon className="w-5 h-5 text-white" />
      </button>
    </form>
  );
};

export default SearchBar;
