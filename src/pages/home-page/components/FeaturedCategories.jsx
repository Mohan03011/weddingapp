import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FeaturedCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Royal Weddings",
      description: "Majestic celebrations with traditional grandeur and luxury that befits royalty",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Palace Venues", "Traditional Decor", "Royal Cuisine", "Cultural Ceremonies"],
      priceRange: "₹15L - ₹50L",
      icon: "Crown"
    },
    {
      id: 2,
      title: "Beachside Weddings",
      description: "Romantic seaside ceremonies with ocean breeze and sunset backdrops",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Beach Venues", "Sunset Ceremonies", "Coastal Decor", "Seafood Cuisine"],
      priceRange: "₹8L - ₹25L",
      icon: "Waves"
    },
    {
      id: 3,
      title: "Traditional Weddings",
      description: "Authentic cultural ceremonies honoring time-tested customs and rituals",
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Cultural Rituals", "Traditional Attire", "Authentic Cuisine", "Family Customs"],
      priceRange: "₹5L - ₹20L",
      icon: "Heart"
    }
  ];

  const handleExploreCategory = (categoryTitle) => {
    // Navigate to gallery with category filter
    window.location.href = `/gallery?category=${encodeURIComponent(categoryTitle)}`;
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent rounded-full mb-6">
            <Icon name="Sparkles" size={16} className="text-accent-foreground mr-2" />
            <span className="text-sm font-medium text-accent-foreground">Wedding Categories</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6">
            Choose Your Perfect
            <span className="block text-primary">Wedding Style</span>
          </h2>
          
          <p className="text-lg text-text-secondary leading-relaxed">
            Every love story is unique. Discover our specialized wedding categories designed to match your vision and create unforgettable memories.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={category.image}
                  alt={`${category.title} wedding setup`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-text-primary/60 via-transparent to-transparent"></div>
                
                {/* Category Icon */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Icon name={category.icon} size={24} color="#FEFCF8" />
                </div>
                
                {/* Price Range */}
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full">
                  <span className="text-sm font-medium text-text-primary">{category.priceRange}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-3">
                  {category.title}
                </h3>
                
                <p className="text-text-secondary mb-4 leading-relaxed">
                  {category.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {category.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => handleExploreCategory(category.title)}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                >
                  Explore {category.title}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <p className="text-text-secondary mb-6">
            Can't find your perfect style? We create custom wedding experiences tailored to your unique vision.
          </p>
          
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.location.href = '/contact-enquiry'}
            iconName="MessageCircle"
            iconPosition="left"
            className="px-8"
          >
            Discuss Custom Wedding
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;