import React, { useState, useRef, useCallback } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const GalleryGrid = ({ items, onImageClick, onLoadMore, hasMore, loading }) => {
  const observer = useRef();
  
  const lastItemRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        onLoadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, onLoadMore]);

  const handleItemClick = (item, index) => {
    onImageClick(item, index);
  };

  const handleKeyPress = (e, item, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleItemClick(item, index);
    }
  };

  if (items.length === 0 && !loading) {
    return (
      <div className="text-center py-16">
        <Icon name="Image" size={48} className="mx-auto text-text-secondary mb-4" />
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          No images found
        </h3>
        <p className="text-text-secondary">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {items.map((item, index) => (
        <div
          key={item.id}
          ref={index === items.length - 1 ? lastItemRef : null}
          className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer hover-lift hover-shadow"
          onClick={() => handleItemClick(item, index)}
          onKeyPress={(e) => handleKeyPress(e, item, index)}
          tabIndex={0}
          role="button"
          aria-label={`View ${item.title} - ${item.category}`}
        >
          <Image
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Video Play Icon */}
          {item.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center bg-text-primary/20">
              <div className="w-12 h-12 bg-background/90 rounded-full flex items-center justify-center">
                <Icon name="Play" size={20} className="text-primary ml-1" />
              </div>
            </div>
          )}
          
          {/* Overlay Information */}
          <div className="absolute inset-0 bg-gradient-to-t from-text-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-3 text-background">
              <h4 className="font-heading font-semibold text-sm mb-1 truncate">
                {item.title}
              </h4>
              <div className="flex items-center justify-between text-xs">
                <span className="opacity-90">{item.location}</span>
                <span className="px-2 py-1 bg-primary/20 rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Loading Skeleton */}
      {loading && (
        <>
          {[...Array(8)].map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="aspect-square bg-surface rounded-lg animate-pulse"
            />
          ))}
        </>
      )}
    </div>
  );
};

export default GalleryGrid;