import React from 'react';
import Button from '../../../components/ui/Button';

const FilterTabs = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "primary" : "outline"}
          onClick={() => onCategoryChange(category.id)}
          className="text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default FilterTabs;