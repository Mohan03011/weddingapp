import React from 'react';

const GoogleMap = () => {
  const businessLocation = {
    lat: 12.9716,
    lng: 77.5946,
    name: 'WeddingCraft Pro Office',
    address: '123 MG Road, Bangalore, Karnataka 560001'
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
          Visit Our Office
        </h3>
        <p className="text-text-secondary text-sm">
          Located in the heart of Bangalore, our office is easily accessible by public transport and has parking facilities.
        </p>
      </div>

      <div className="relative bg-surface rounded-lg overflow-hidden shadow-sm border border-border-light">
        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={businessLocation.name}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${businessLocation.lat},${businessLocation.lng}&z=16&output=embed`}
            className="border-0"
          />
        </div>
        
        {/* Map Overlay Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-text-primary/80 to-transparent p-4">
          <div className="text-background">
            <h4 className="font-medium">{businessLocation.name}</h4>
            <p className="text-sm opacity-90">{businessLocation.address}</p>
          </div>
        </div>
      </div>

      {/* Directions Button */}
      <a
        href={`https://maps.google.com/?q=${businessLocation.lat},${businessLocation.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-secondary transition-colors"
      >
        <span>Get Directions</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
};

export default GoogleMap;