import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Priya & Arjun Sharma",
      location: "Bangalore",
      rating: 5,
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      testimonial: `WeddingCraft Pro made our dream wedding come true! From the initial planning to the final execution, every detail was perfect. The team's attention to detail and professionalism exceeded our expectations. Our guests are still talking about how beautiful everything was.`,
      weddingType: "Traditional Wedding",
      date: "December 2023",
      venue: "Palace Grounds, Bangalore"
    },
    {
      id: 2,
      name: "Sneha & Vikram Reddy",
      location: "Mysore",
      rating: 5,
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      testimonial: `Our beachside wedding was absolutely magical! The WeddingCraft team handled everything flawlessly - from coordinating with vendors to managing the timeline. The sunset ceremony was breathtaking, and the reception was everything we dreamed of. Highly recommended!`,
      weddingType: "Beachside Wedding",
      date: "November 2023",
      venue: "Gokarna Beach Resort"
    },
    {
      id: 3,
      name: "Kavya & Rohit Patel",
      location: "Bangalore",
      rating: 5,
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      testimonial: `The royal wedding experience was beyond our imagination! Every element from the grand entrance to the elaborate decorations was executed perfectly. The team's creativity and dedication made our special day truly unforgettable. Worth every penny!`,
      weddingType: "Royal Wedding",
      date: "January 2024",
      venue: "Bangalore Palace"
    },
    {
      id: 4,
      name: "Anita & Suresh Kumar",
      location: "Coorg",
      rating: 5,
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      testimonial: `Planning a destination wedding seemed overwhelming until we found WeddingCraft Pro. They handled all the logistics, vendor coordination, and guest management seamlessly. Our families from different cities had the most wonderful time. Thank you for making it stress-free!`,
      weddingType: "Destination Wedding",
      date: "October 2023",
      venue: "Coorg Resort"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const handleTestimonialClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentTestimonial(index);
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

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <section className="py-12 lg:py-20 bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-success/10 rounded-full mb-6">
            <Icon name="Heart" size={16} className="text-success mr-2" />
            <span className="text-sm font-medium text-success">Happy Couples</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6">
            Love Stories &
            <span className="block text-primary">Testimonials</span>
          </h2>
          
          <p className="text-lg text-text-secondary leading-relaxed">
            Don't just take our word for it. Hear from the couples who trusted us with their most special day.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-surface rounded-3xl p-8 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
              {/* Testimonial Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {renderStars(currentTestimonialData.rating)}
                  </div>
                  <span className="text-sm font-medium text-text-secondary">
                    {currentTestimonialData.rating}.0 out of 5
                  </span>
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg lg:text-xl text-text-primary leading-relaxed italic">
                  "{currentTestimonialData.testimonial}"
                </blockquote>

                {/* Client Info */}
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xl font-heading font-semibold text-text-primary">
                      {currentTestimonialData.name}
                    </h4>
                    <p className="text-text-secondary flex items-center space-x-2">
                      <Icon name="MapPin" size={14} />
                      <span>{currentTestimonialData.location}</span>
                    </p>
                  </div>

                  {/* Wedding Details */}
                  <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} />
                      <span>{currentTestimonialData.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={14} />
                      <span>{currentTestimonialData.venue}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Crown" size={14} />
                      <span>{currentTestimonialData.weddingType}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Client Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={currentTestimonialData.image}
                      alt={`${currentTestimonialData.name} wedding photo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary rounded-full"></div>
                  <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-secondary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleTestimonialClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial 
                  ? 'bg-primary scale-125' :'bg-border hover:bg-primary/50'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 lg:mt-20">
          {[
            { number: "500+", label: "Happy Couples", icon: "Heart" },
            { number: "5+", label: "Years Experience", icon: "Calendar" },
            { number: "4.9", label: "Average Rating", icon: "Star" },
            { number: "50+", label: "Vendor Partners", icon: "Users" }
          ].map((stat, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Icon name={stat.icon} size={24} className="text-primary" />
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-heading font-bold text-primary">
                  {stat.number}
                </div>
                <div className="text-sm text-text-secondary font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 lg:mt-10">
          <p className="text-gray-800 text-lg font-medium mb-4">
            Ready to create your own love story with us?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/client-reviews-testimonials'}
              className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg text-text-secondary hover:text-primary hover:border-primary transition-colors"
            >
              <Icon name="MessageSquare" size={16} className="mr-2" />
              Read More Reviews
            </button>
            <button
              onClick={() => window.location.href = '/contact-enquiry'}
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Icon name="Calendar" size={16} className="mr-2" />
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;