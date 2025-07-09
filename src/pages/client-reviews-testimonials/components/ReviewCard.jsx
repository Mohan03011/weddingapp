import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReviewCard = ({ review, isExpanded = false, onToggleExpand }) => {
  const [imageError, setImageError] = useState(false);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? 'text-warning fill-current' : 'text-border'}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="card p-6 hover-shadow transition-all duration-300">
      {/* Header */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="flex-shrink-0">
          {!imageError ? (
            <Image
              src={review.clientPhoto}
              alt={review.clientName}
              className="w-12 h-12 rounded-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <Icon name="User" size={20} className="text-primary" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-heading font-semibold text-text-primary truncate">
              {review.clientName}
            </h3>
            <div className="flex items-center space-x-1">
              {renderStars(review.rating)}
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
            <span className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{review.weddingLocation}</span>
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>{formatDate(review.weddingDate)}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Service Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {review.serviceCategories.map((category, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-md"
          >
            {category}
          </span>
        ))}
      </div>

      {/* Review Content */}
      <div className="mb-4">
        <p className="text-text-primary leading-relaxed">
          {isExpanded ? review.content : truncateText(review.content)}
        </p>
        
        {review.content.length > 150 && (
          <Button
            variant="text"
            onClick={onToggleExpand}
            className="mt-2 p-0 text-primary hover:text-secondary text-sm"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </Button>
        )}
      </div>

      {/* Wedding Photos */}
      {review.weddingPhotos && review.weddingPhotos.length > 0 && (
        <div className="mb-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {review.weddingPhotos.slice(0, 3).map((photo, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={photo}
                  alt={`Wedding photo ${index + 1}`}
                  className="w-16 h-16 rounded-lg object-cover hover:scale-105 transition-transform cursor-pointer"
                />
              </div>
            ))}
            {review.weddingPhotos.length > 3 && (
              <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-surface border-2 border-dashed border-border flex items-center justify-center">
                <span className="text-xs text-text-secondary font-medium">
                  +{review.weddingPhotos.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border-light">
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <span className="flex items-center space-x-1">
            <Icon name="ThumbsUp" size={14} />
            <span>{review.helpfulCount} helpful</span>
          </span>
          {review.isVerified && (
            <span className="flex items-center space-x-1 text-success">
              <Icon name="CheckCircle" size={14} />
              <span>Verified</span>
            </span>
          )}
        </div>
        
        <Button
          variant="ghost"
          iconName="Share2"
          iconPosition="left"
          className="text-sm"
        >
          Share
        </Button>
      </div>
    </div>
  );
};

export default ReviewCard;