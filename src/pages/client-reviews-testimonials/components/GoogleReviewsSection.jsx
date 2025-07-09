import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GoogleReviewsSection = ({ googleReviews, averageRating, totalReviews }) => {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-surface rounded-lg p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Google Reviews
            </h2>
            <p className="text-text-secondary text-sm">
              Authentic reviews from Google My Business
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          iconName="ExternalLink"
          iconPosition="right"
          onClick={() => window.open('https://g.page/r/weddingcraft-bangalore/review', '_blank')}
        >
          View on Google
        </Button>
      </div>

      {/* Overall Rating */}
      <div className="flex items-center justify-between p-4 bg-accent rounded-lg mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center space-x-1 mb-1">
              {renderStars(averageRating)}
            </div>
          </div>
          <div>
            <p className="text-text-primary font-semibold">
              Excellent Rating
            </p>
            <p className="text-text-secondary text-sm">
              Based on {totalReviews} Google reviews
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center space-x-1 text-success mb-1">
            <Icon name="TrendingUp" size={16} />
            <span className="text-sm font-medium">Trending Up</span>
          </div>
          <p className="text-xs text-text-secondary">
            +12 reviews this month
          </p>
        </div>
      </div>

      {/* Recent Google Reviews */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Recent Google Reviews
        </h3>

        {googleReviews.slice(0, 3).map((review) => (
          <div key={review.id} className="border border-border-light rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-semibold text-sm">
                  {review.reviewerName.charAt(0)}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-text-primary">
                      {review.reviewerName}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-text-secondary text-sm">
                        {formatDate(review.date)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-xs text-text-secondary">
                    <Icon name="MapPin" size={12} />
                    <span>Google</span>
                  </div>
                </div>

                <p className="text-text-primary text-sm leading-relaxed mb-3">
                  {truncateText(review.content)}
                </p>

                {review.businessReply && (
                  <div className="bg-background rounded-lg p-3 border-l-4 border-primary">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="MessageSquare" size={14} className="text-primary" />
                      <span className="text-sm font-medium text-primary">
                        Response from WeddingCraft Pro
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm">
                      {truncateText(review.businessReply, 100)}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-light">
                  <div className="flex items-center space-x-3 text-sm text-text-secondary">
                    <span className="flex items-center space-x-1">
                      <Icon name="ThumbsUp" size={14} />
                      <span>{review.helpfulCount}</span>
                    </span>
                    {review.isLocalGuide && (
                      <span className="flex items-center space-x-1 text-primary">
                        <Icon name="Award" size={14} />
                        <span>Local Guide</span>
                      </span>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    iconName="ExternalLink"
                    className="text-xs"
                    onClick={() => window.open(review.googleUrl, '_blank')}
                  >
                    View on Google
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-6">
        <Button
          variant="outline"
          iconName="ExternalLink"
          iconPosition="right"
          onClick={() => window.open('https://g.page/r/weddingcraft-bangalore/review', '_blank')}
        >
          View All {totalReviews} Google Reviews
        </Button>
      </div>
    </div>
  );
};

export default GoogleReviewsSection;