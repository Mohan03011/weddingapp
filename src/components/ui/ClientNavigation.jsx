import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ClientNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Home', path: '/home-page', icon: 'Home' },
    { label: 'Gallery', path: '/gallery', icon: 'Image' },
    { label: 'Reviews', path: '/client-reviews-testimonials', icon: 'Star' },
    { label: 'Contact', path: '/contact-enquiry', icon: 'MessageCircle' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in your wedding planning services. Could you please share more details?");
    const phoneNumber = "919876543210"; // Replace with actual WhatsApp number
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-background'
      }`}>
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/home-page" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Icon name="Heart" size={24} color="#FEFCF8" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-heading font-semibold text-primary">
                  WeddingCraft
                </h1>
                <p className="text-xs text-text-secondary font-caption">Pro</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={handleWhatsAppClick}
                iconName="MessageCircle"
                iconPosition="left"
                className="text-sm"
              >
                WhatsApp
              </Button>
              <Button
                variant="primary"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm"
              >
                Get Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-surface transition-colors"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="py-4 space-y-2 border-t border-border-light">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-accent text-primary' :'text-text-secondary hover:bg-surface hover:text-primary'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              
              <div className="px-4 pt-4 space-y-3 border-t border-border-light">
                <Button
                  variant="outline"
                  onClick={handleWhatsAppClick}
                  iconName="MessageCircle"
                  iconPosition="left"
                  fullWidth
                >
                  WhatsApp
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  fullWidth
                >
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer to prevent content overlap */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
};

export default ClientNavigation;