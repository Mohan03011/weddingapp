import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedReview = ({ review }) => {
  const [imageError, setImageError] = useState(false);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={20}
        className={index < rating ? 'text-warning fill-current' : 'text-border'}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="card-elevated p-8 mb-8 bg-gradient-accent">
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
        {/* Client Photo */}
        <div className="flex-shrink-0 mb-6 lg:mb-0">
          {!imageError ? (
            <Image
              src={review.clientPhoto}
              alt={review.clientName}
              className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover mx-auto lg:mx-0 shadow-md"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-primary flex items-center justify-center mx-auto lg:mx-0 shadow-md">
              <Icon name="User" size={32} className="text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Review Content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Rating */}
          <div className="flex items-center justify-center lg:justify-start space-x-1 mb-3">
            {renderStars(review.rating)}
          </div>

          {/* Quote */}
          <blockquote className="text-lg lg:text-xl text-text-primary font-medium leading-relaxed mb-4 italic">
            "{review.content}"
          </blockquote>

          {/* Client Info */}
          <div className="mb-4">
            <h3 className="font-heading font-semibold text-xl text-primary mb-1">
              {review.clientName}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start sm:space-x-4 space-y-1 sm:space-y-0 text-text-secondary">
              <span className="flex items-center justify-center lg:justify-start space-x-1">
                <Icon name="MapPin" size={16} />
                <span>{review.weddingLocation}</span>
              </span>
              <span className="hidden sm:block text-border">•</span>
              <span className="flex items-center justify-center lg:justify-start space-x-1">
                <Icon name="Calendar" size={16} />
                <span>{formatDate(review.weddingDate)}</span>
              </span>
            </div>
          </div>

          {/* Service Categories */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
            {review.serviceCategories.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Wedding Photos Preview */}
          {review.weddingPhotos && review.weddingPhotos.length > 0 && (
            <div className="flex justify-center lg:justify-start space-x-3 mb-6">
              {review.weddingPhotos.slice(0, 4).map((photo, index) => (
                <div key={index} className="relative">
                  <Image
                    src={photo}
                    alt={`Wedding photo ${index + 1}`}
                    className="w-16 h-16 rounded-lg object-cover hover:scale-105 transition-transform cursor-pointer shadow-sm"
                  />
                </div>
              ))}
              {review.weddingPhotos.length > 4 && (
                <div className="w-16 h-16 rounded-lg bg-surface border-2 border-dashed border-border flex items-center justify-center">
                  <span className="text-xs text-text-secondary font-medium">
                    +{review.weddingPhotos.length - 4}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <span className="flex items-center space-x-1">
                <Icon name="ThumbsUp" size={16} />
                <span>{review.helpfulCount} found this helpful</span>
              </span>
              {review.isVerified && (
                <span className="flex items-center space-x-1 text-success">
                  <Icon name="CheckCircle" size={16} />
                  <span>Verified Client</span>
                </span>
              )}
            </div>
            
            <Button
              variant="outline"
              iconName="Share2"
              iconPosition="left"
              className="text-sm"
            >
              Share Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedReview;