import React, { useState } from 'react';
import Button from '../../../components/ui/Button';


const FloatingQuoteButton = ({ onQuoteRequest }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-20 right-6 z-150 animate-fade-in">
      <Button
        variant="primary"
        onClick={onQuoteRequest}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105
          ${isHovered ? 'pr-4 pl-4' : 'p-4'}
        `}
        iconName="MessageSquare"
        iconPosition="left"
      >
        <span className={`
          ml-2 font-medium text-sm whitespace-nowrap transition-all duration-300 overflow-hidden
          ${isHovered ? 'max-w-32 opacity-100' : 'max-w-0 opacity-0'}
        `}>
          Request Quote
        </span>
      </Button>
    </div>
  );
};

export default FloatingQuoteButton;