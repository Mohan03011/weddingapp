import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VideoTestimonial = ({ testimonial }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
    setShowFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsPlaying(false);
    setShowFullscreen(false);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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

  return (
    <>
      <div className="card p-6 hover-shadow transition-all duration-300">
        {/* Video Thumbnail */}
        <div className="relative mb-4 group cursor-pointer" onClick={handlePlayVideo}>
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={testimonial.thumbnail}
              alt={`Video testimonial from ${testimonial.clientName}`}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-text-primary/30 flex items-center justify-center group-hover:bg-text-primary/40 transition-colors">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Icon name="Play" size={24} className="text-primary-foreground ml-1" />
              </div>
            </div>

            {/* Duration Badge */}
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-text-primary/80 text-background text-xs font-medium rounded">
              {formatDuration(testimonial.duration)}
            </div>

            {/* Video Quality Badge */}
            <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
              HD
            </div>
          </div>
        </div>

        {/* Client Info */}
        <div className="flex items-start space-x-3 mb-3">
          <Image
            src={testimonial.clientPhoto}
            alt={testimonial.clientName}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-text-primary truncate">
              {testimonial.clientName}
            </h3>
            <div className="flex items-center space-x-1 mb-1">
              {renderStars(testimonial.rating)}
            </div>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <span className="flex items-center space-x-1">
                <Icon name="MapPin" size={12} />
                <span>{testimonial.weddingLocation}</span>
              </span>
              <span className="text-border">•</span>
              <span>{testimonial.weddingType}</span>
            </div>
          </div>
        </div>

        {/* Preview Text */}
        <p className="text-text-primary text-sm leading-relaxed mb-4 line-clamp-3">
          {testimonial.previewText}
        </p>

        {/* Service Categories */}
        <div className="flex flex-wrap gap-1 mb-4">
          {testimonial.serviceCategories.slice(0, 3).map((category, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded"
            >
              {category}
            </span>
          ))}
          {testimonial.serviceCategories.length > 3 && (
            <span className="px-2 py-1 bg-surface text-text-secondary text-xs font-medium rounded">
              +{testimonial.serviceCategories.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border-light">
          <div className="flex items-center space-x-3 text-sm text-text-secondary">
            <span className="flex items-center space-x-1">
              <Icon name="Eye" size={14} />
              <span>{testimonial.views}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="ThumbsUp" size={14} />
              <span>{testimonial.likes}</span>
            </span>
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

      {/* Fullscreen Video Modal */}
      {showFullscreen && (
        <div className="fixed inset-0 bg-text-primary/90 z-300 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-background rounded-lg overflow-hidden">
            {/* Close Button */}
            <button
              onClick={handleCloseFullscreen}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-text-primary/80 hover:bg-text-primary text-background rounded-full flex items-center justify-center transition-colors"
            >
              <Icon name="X" size={20} />
            </button>

            {/* Video Player Placeholder */}
            <div className="w-full h-full bg-surface flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Icon name="Play" size={32} className="text-primary-foreground ml-1" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Video Testimonial
                </h3>
                <p className="text-text-secondary">
                  {testimonial.clientName} - {testimonial.weddingLocation}
                </p>
                <p className="text-sm text-text-secondary mt-2">
                  Duration: {formatDuration(testimonial.duration)}
                </p>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-text-primary/80 to-transparent p-4">
              <div className="flex items-center justify-between text-background">
                <div className="flex items-center space-x-4">
                  <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Icon name={isPlaying ? "Pause" : "Play"} size={20} className="text-primary-foreground" />
                  </button>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">0:00</span>
                    <div className="w-32 h-1 bg-background/30 rounded-full">
                      <div className="w-0 h-full bg-primary rounded-full"></div>
                    </div>
                    <span className="text-sm">{formatDuration(testimonial.duration)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-background/20 rounded">
                    <Icon name="Volume2" size={20} />
                  </button>
                  <button className="p-2 hover:bg-background/20 rounded">
                    <Icon name="Maximize" size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoTestimonial;