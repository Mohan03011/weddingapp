import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const StatisticsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    weddings: 0,
    experience: 0,
    rating: 0,
    vendors: 0
  });
  
  const sectionRef = useRef(null);

  const finalValues = {
    weddings: 500,
    experience: 5,
    rating: 4.9,
    vendors: 50
  };

  const statistics = [
    {
      key: 'weddings',
      icon: 'Heart',
      value: counters.weddings,
      suffix: '+',
      label: 'Weddings Planned',
      description: 'Successfully executed weddings across Karnataka',
      color: 'text-primary'
    },
    {
      key: 'experience',
      icon: 'Calendar',
      value: counters.experience,
      suffix: '+',
      label: 'Years Experience',
      description: 'Trusted expertise in wedding planning industry',
      color: 'text-secondary'
    },
    {
      key: 'rating',
      icon: 'Star',
      value: counters.rating,
      suffix: '/5',
      label: 'Client Rating',
      description: 'Average rating from our happy couples',
      color: 'text-warning'
    },
    {
      key: 'vendors',
      icon: 'Users',
      value: counters.vendors,
      suffix: '+',
      label: 'Vendor Partners',
      description: 'Trusted network of wedding service providers',
      color: 'text-success'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        weddings: Math.floor(finalValues.weddings * progress),
        experience: Math.floor(finalValues.experience * progress),
        rating: parseFloat((finalValues.rating * progress).toFixed(1)),
        vendors: Math.floor(finalValues.vendors * progress)
      });

      if (currentStep >= steps) {
        setCounters(finalValues);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-gradient-primary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary-foreground/20 backdrop-blur-sm rounded-full mb-6">
            <Icon name="TrendingUp" size={16} className="text-primary-foreground mr-2" />
            <span className="text-sm font-medium text-primary-foreground">Our Achievements</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-6">
            Numbers That Speak
            <span className="block">Our Success</span>
          </h2>
          
          <p className="text-lg text-primary-foreground/90 leading-relaxed">
            Years of dedication, hundreds of celebrations, and countless happy memories created together.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <div
              key={stat.key}
              className="text-center group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Icon name={stat.icon} size={32} className="text-primary-foreground" />
                </div>
                
                {/* Decorative Ring */}
                <div className="absolute inset-0 w-20 h-20 border-2 border-primary-foreground/20 rounded-2xl mx-auto animate-pulse"></div>
              </div>

              {/* Counter */}
              <div className="mb-4">
                <div className="text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-2">
                  {stat.key === 'rating' ? stat.value.toFixed(1) : stat.value}
                  <span className="text-2xl lg:text-3xl">{stat.suffix}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                  {stat.label}
                </h3>
                
                <p className="text-sm text-primary-foreground/80 leading-relaxed">
                  {stat.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-primary-foreground/20 rounded-full h-1 overflow-hidden">
                <div 
                  className="h-full bg-primary-foreground rounded-full transition-all duration-2000 ease-out"
                  style={{ 
                    width: isVisible ? '100%' : '0%',
                    transitionDelay: `${index * 0.2}s`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16 lg:mt-20">
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-primary-foreground mb-4">
              Why Choose WeddingCraft Pro?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                {
                  icon: 'Shield',
                  title: 'Trusted Expertise',
                  description: 'Years of experience in creating perfect weddings'
                },
                {
                  icon: 'Clock',
                  title: 'Timely Execution',
                  description: 'Always on schedule, never compromising on quality'
                },
                {
                  icon: 'Award',
                  title: 'Award Winning',
                  description: 'Recognized for excellence in wedding planning'
                }
              ].map((feature, index) => (
                <div key={index} className="text-center space-y-3">
                  <div className="w-12 h-12 bg-primary-foreground/20 rounded-xl flex items-center justify-center mx-auto">
                    <Icon name={feature.icon} size={20} className="text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-primary-foreground">{feature.title}</h4>
                  <p className="text-sm text-primary-foreground/80">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;