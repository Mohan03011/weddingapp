import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewFilters = ({ 
  activeFilter, 
  onFilterChange, 
  sortBy, 
  onSortChange, 
  totalReviews,
  averageRating 
}) => {
  const filterOptions = [
    { key: 'all', label: 'All Reviews', count: totalReviews },
    { key: '5', label: '5 Stars', count: 45 },
    { key: '4', label: '4 Stars', count: 28 },
    { key: '3', label: '3 Stars', count: 8 },
    { key: '2', label: '2 Stars', count: 3 },
    { key: '1', label: '1 Star', count: 1 }
  ];

  const sortOptions = [
    { key: 'recent', label: 'Most Recent', icon: 'Clock' },
    { key: 'rating', label: 'Highest Rating', icon: 'Star' },
    { key: 'helpful', label: 'Most Helpful', icon: 'ThumbsUp' }
  ];

  const weddingTypeFilters = [
    { key: 'all-types', label: 'All Types' },
    { key: 'royal', label: 'Royal Wedding' },
    { key: 'traditional', label: 'Traditional' },
    { key: 'beachside', label: 'Beachside' },
    { key: 'destination', label: 'Destination' }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-border'}
      />
    ));
  };

  return (
    <div className="bg-surface rounded-lg p-6 mb-8 space-y-6">
      {/* Overall Rating Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border-light">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="text-center">
            <div className="text-3xl font-heading font-bold text-primary mb-1">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center space-x-1 mb-1">
              {renderStars(averageRating)}
            </div>
            <div className="text-sm text-text-secondary">
              {totalReviews} reviews
            </div>
          </div>
          
          <div className="hidden sm:block w-px h-16 bg-border-light"></div>
          
          <div className="text-center sm:text-left">
            <div className="text-lg font-semibold text-text-primary mb-1">
              Excellent Service
            </div>
            <div className="text-sm text-text-secondary">
              Based on {totalReviews} verified reviews
            </div>
            <div className="flex items-center space-x-1 mt-1">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-success">Verified Reviews</span>
            </div>
          </div>
        </div>

        <Button
          variant="primary"
          iconName="PenTool"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Write a Review
        </Button>
      </div>

      {/* Filter Controls */}
      <div className="space-y-4">
        {/* Rating Filters */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3">Filter by Rating</h3>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => onFilterChange(option.key)}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${activeFilter === option.key
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-background text-text-secondary hover:bg-accent hover:text-accent-foreground'
                  }
                `}
              >
                {option.label}
                <span className="ml-2 text-xs opacity-75">({option.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort and Wedding Type Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
          {/* Sort Options */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Sort by</h3>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => onSortChange(option.key)}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${sortBy === option.key
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-background text-text-secondary hover:bg-accent hover:text-accent-foreground'
                    }
                  `}
                >
                  <Icon name={option.icon} size={16} />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Wedding Type Filter */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Wedding Type</h3>
            <select 
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              defaultValue="all-types"
            >
              {weddingTypeFilters.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(activeFilter !== 'all' || sortBy !== 'recent') && (
        <div className="flex items-center space-x-2 pt-4 border-t border-border-light">
          <span className="text-sm text-text-secondary">Active filters:</span>
          {activeFilter !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
              <span>{activeFilter === 'all' ? 'All Ratings' : `${activeFilter} Stars`}</span>
              <button onClick={() => onFilterChange('all')}>
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          {sortBy !== 'recent' && (
            <span className="inline-flex items-center space-x-1 px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-md">
              <span>{sortOptions.find(opt => opt.key === sortBy)?.label}</span>
              <button onClick={() => onSortChange('recent')}>
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewFilters;