import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const WhatsAppFloat = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in your wedding planning services. Could you please share more details about your packages and availability?"
    );
    const phoneNumber = "919876543210"; // Replace with actual WhatsApp number
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-150 animate-fade-in">
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          group relative flex items-center bg-success text-success-foreground rounded-full shadow-lg
          transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 
          focus:ring-success focus:ring-offset-2 focus:ring-offset-background
          ${isHovered ? 'pr-4 pl-4' : 'p-4'}
        `}
        aria-label="Contact us on WhatsApp"
      >
        <Icon name="MessageCircle" size={24} className="flex-shrink-0" />
        
        <span className={`
          ml-3 font-medium text-sm whitespace-nowrap transition-all duration-300 overflow-hidden
          ${isHovered ? 'max-w-32 opacity-100' : 'max-w-0 opacity-0'}
        `}>
          Chat with us
        </span>

        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-success animate-ping opacity-20"></div>
        
        {/* Tooltip for mobile */}
        <div className={`
          absolute bottom-full right-0 mb-2 px-3 py-2 bg-text-primary text-background text-sm 
          rounded-lg shadow-lg whitespace-nowrap transition-all duration-200 pointer-events-none
          ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          sm:hidden
        `}>
          Chat with us on WhatsApp
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-text-primary"></div>
        </div>
      </button>

      {/* Notification badge */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full animate-pulse"></div>
    </div>
  );
};

export default WhatsAppFloat;