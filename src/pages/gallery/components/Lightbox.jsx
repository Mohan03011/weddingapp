import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Lightbox = ({ isOpen, items, currentIndex, onClose, onNext, onPrev }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const currentItem = items[currentIndex];
  const minSwipeDistance = 50;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsZoomed(false);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, onClose, onNext, onPrev]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onNext();
    } else if (isRightSwipe) {
      onPrev();
    }
  };

  const handleShare = async () => {
    if (navigator.share && currentItem) {
      try {
        await navigator.share({
          title: currentItem.title,
          text: `Check out this beautiful ${currentItem.category} wedding photo from WeddingCraft Pro`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!isOpen || !currentItem) return null;

  return (
    <div className="fixed inset-0 z-300 bg-text-primary/95 backdrop-blur-sm">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-text-primary/80 to-transparent">
        <div className="flex items-center justify-between p-4">
          <div className="text-background">
            <h3 className="font-heading font-semibold text-lg">{currentItem.title}</h3>
            <p className="text-sm opacity-80">{currentItem.location} • {currentItem.category}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={handleShare}
              iconName="Share2"
              className="text-background hover:bg-background/20"
              aria-label="Share image"
            />
            <Button
              variant="ghost"
              onClick={onClose}
              iconName="X"
              className="text-background hover:bg-background/20"
              aria-label="Close lightbox"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div 
        className="flex items-center justify-center h-full p-4 pt-20 pb-16"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className={`relative max-w-full max-h-full transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}>
          {currentItem.type === 'video' ? (
            <video
              src={currentItem.src}
              controls
              className="max-w-full max-h-full object-contain"
              autoPlay
            />
          ) : (
            <Image
              src={currentItem.src}
              alt={currentItem.alt}
              className="max-w-full max-h-full object-contain cursor-zoom-in"
              onClick={() => setIsZoomed(!isZoomed)}
            />
          )}
        </div>
      </div>

      {/* Navigation */}
      {items.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background/20 hover:bg-background/30 rounded-full flex items-center justify-center text-background transition-colors"
            aria-label="Previous image"
          >
            <Icon name="ChevronLeft" size={24} />
          </button>
          
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background/20 hover:bg-background/30 rounded-full flex items-center justify-center text-background transition-colors"
            aria-label="Next image"
          >
            <Icon name="ChevronRight" size={24} />
          </button>
        </>
      )}

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-text-primary/80 to-transparent">
        <div className="flex items-center justify-between p-4 text-background">
          <div className="text-sm opacity-80">
            {currentIndex + 1} of {items.length}
          </div>
          
          {currentItem.type !== 'video' && (
            <Button
              variant="ghost"
              onClick={() => setIsZoomed(!isZoomed)}
              iconName={isZoomed ? "ZoomOut" : "ZoomIn"}
              className="text-background hover:bg-background/20"
            >
              {isZoomed ? 'Zoom Out' : 'Zoom In'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;