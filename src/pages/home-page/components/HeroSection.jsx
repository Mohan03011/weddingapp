import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const handleGetQuote = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewServices = () => {
    document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Beautiful wedding ceremony setup with elegant decorations"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-text-primary/70 via-text-primary/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center lg:text-left">
        <div className="max-w-4xl mx-auto lg:mx-0">
          <div className="space-y-6 lg:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-accent/90 backdrop-blur-sm rounded-full">
              <span className="text-sm font-medium text-accent-foreground">
                ✨ Bangalore's Premier Wedding Planners
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-background leading-tight">
              Crafting Your
              <span className="block text-primary">Perfect Wedding</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl lg:text-2xl text-background/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              From intimate ceremonies to grand celebrations, we bring your dream wedding to life with personalized planning and flawless execution.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleViewServices}
                iconName="ArrowRight"
                iconPosition="right"
                className="text-lg px-8 py-4 shadow-lg hover:shadow-xl"
              >
                View Our Services
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleGetQuote}
                iconName="MessageCircle"
                iconPosition="left"
                className="text-lg px-8 py-4 bg-background/10 backdrop-blur-sm border-background/30 text-background hover:bg-background hover:text-text-primary shadow-lg"
              >
                Get Free Quote
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-8 text-background/80">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-primary border-2 border-background"></div>
                  ))}
                </div>
                <span className="text-sm font-medium">500+ Happy Couples</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex text-warning">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                </div>
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-success-foreground">✓</span>
                </div>
                <span className="text-sm font-medium">5+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-background/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-background/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;