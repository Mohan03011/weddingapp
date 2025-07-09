import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ServicesShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const services = [
    {
      id: 1,
      title: "Complete Wedding Planning",
      description: "End-to-end wedding planning services from concept to execution, ensuring every detail is perfect for your special day.",
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: ["Venue Selection", "Vendor Coordination", "Timeline Management", "Day-of Coordination"],
      icon: "Calendar",
      price: "Starting from ₹2,50,000"
    },
    {
      id: 2,
      title: "Venue Decoration",
      description: "Transform any space into a magical wedding venue with our creative decoration and design expertise.",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: ["Floral Arrangements", "Lighting Design", "Stage Setup", "Theme Decoration"],
      icon: "Palette",
      price: "Starting from ₹1,50,000"
    },
    {
      id: 3,
      title: "Photography & Videography",
      description: "Capture every precious moment with our professional photography and videography services.",
      image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: ["Pre-wedding Shoots", "Wedding Day Coverage", "Drone Photography", "Same Day Edits"],
      icon: "Camera",
      price: "Starting from ₹1,00,000"
    },
    {
      id: 4,
      title: "Catering Services",
      description: "Delight your guests with exquisite cuisine crafted by our expert chefs and catering partners.",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: ["Multi-cuisine Options", "Live Counters", "Custom Menus", "Dietary Accommodations"],
      icon: "ChefHat",
      price: "Starting from ₹800 per plate"
    },
    {
      id: 5,
      title: "Entertainment & Music",
      description: "Keep your guests entertained with live music, DJs, and cultural performances tailored to your celebration.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: ["Live Bands", "DJ Services", "Cultural Performances", "Sound Systems"],
      icon: "Music",
      price: "Starting from ₹75,000"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, services.length]);

  const handlePrevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  const handleNextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const handleSlideClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  const handleGetQuote = (serviceTitle) => {
    const message = encodeURIComponent(`Hi! I'm interested in your ${serviceTitle} service. Could you please share more details and pricing?`);
    const phoneNumber = "919876543210";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="services-section" className="py-16 lg:py-24 bg-surface">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Icon name="Settings" size={16} className="text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Our Services</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6">
            Complete Wedding
            <span className="block text-primary">Solutions</span>
          </h2>
          
          <p className="text-lg text-text-secondary leading-relaxed">
            From planning to execution, we handle every aspect of your wedding to ensure a seamless and memorable celebration.
          </p>
        </div>

        {/* Services Carousel */}
        <div className="relative">
          {/* Main Carousel Container */}
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {services.map((service) => (
                <div key={service.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[500px] p-8 lg:p-12">
                    {/* Content */}
                    <div className="space-y-6 order-2 lg:order-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                          <Icon name={service.icon} size={24} color="#FEFCF8" />
                        </div>
                        <div className="px-3 py-1 bg-accent rounded-full">
                          <span className="text-sm font-medium text-accent-foreground">{service.price}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
                        {service.title}
                      </h3>

                      <p className="text-lg text-text-secondary leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="grid grid-cols-2 gap-3">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Icon name="Check" size={16} className="text-success" />
                            <span className="text-sm text-text-secondary">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button
                          variant="primary"
                          onClick={() => handleGetQuote(service.title)}
                          iconName="MessageCircle"
                          iconPosition="left"
                        >
                          Get Quote
                        </Button>
                        
                        <Button
                          variant="outline"
                          onClick={() => window.location.href = '/gallery'}
                          iconName="Eye"
                          iconPosition="left"
                        >
                          View Gallery
                        </Button>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="order-1 lg:order-2">
                      <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src={service.image}
                          alt={`${service.title} showcase`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-text-primary/20 to-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-background transition-all duration-200 z-10"
            aria-label="Previous service"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>

          <button
            onClick={handleNextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-background transition-all duration-200 z-10"
            aria-label="Next service"
          >
            <Icon name="ChevronRight" size={20} />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide ? 'bg-primary' : 'bg-border hover:bg-primary/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <div className="bg-gradient-primary rounded-2xl p-8 lg:p-12 text-center">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-gray-900 mb-4">
              Ready to Plan Your Dream Wedding?
            </h3>
            <p className="text-gray-800 mb-6 max-w-2xl mx-auto">
              Let's discuss your vision and create a customized package that fits your budget and exceeds your expectations.
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => window.location.href = '/contact-enquiry'}
              iconName="Calendar"
              iconPosition="left"
              className="px-8"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;