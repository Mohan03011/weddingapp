import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ searchTerm, onSearchChange, onClearSearch }) => {
  return (
    <div className="relative max-w-md mx-auto mb-6">
      <div className="relative">
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
        />
        <Input
          type="search"
          placeholder="Search by wedding style or venue..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <button
            onClick={onClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-primary transition-colors"
            aria-label="Clear search"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;