import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const FooterSection = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: 'Complete Wedding Planning', href: '/contact-enquiry' },
      { label: 'Venue Decoration', href: '/contact-enquiry' },
      { label: 'Photography & Videography', href: '/contact-enquiry' },
      { label: 'Catering Services', href: '/contact-enquiry' },
      { label: 'Entertainment & Music', href: '/contact-enquiry' }
    ],
    company: [
      { label: 'About Us', href: '/home-page#about' },
      { label: 'Our Gallery', href: '/gallery' },
      { label: 'Client Reviews', href: '/client-reviews-testimonials' },
      { label: 'Contact Us', href: '/contact-enquiry' }
    ],
    weddingTypes: [
      { label: 'Royal Weddings', href: '/gallery?category=royal' },
      { label: 'Beachside Weddings', href: '/gallery?category=beachside' },
      { label: 'Traditional Weddings', href: '/gallery?category=traditional' },
      { label: 'Destination Weddings', href: '/gallery?category=destination' }
    ]
  };

  const socialLinks = [
    { 
      name: 'Instagram', 
      icon: 'Instagram', 
      href: 'https://instagram.com/weddingcraftpro',
      color: 'hover:text-pink-500'
    },
    { 
      name: 'Facebook', 
      icon: 'Facebook', 
      href: 'https://facebook.com/weddingcraftpro',
      color: 'hover:text-blue-500'
    },
    { 
      name: 'YouTube', 
      icon: 'Youtube', 
      href: 'https://youtube.com/weddingcraftpro',
      color: 'hover:text-red-500'
    },
    { 
      name: 'WhatsApp', 
      icon: 'MessageCircle', 
      href: 'https://wa.me/919876543210',
      color: 'hover:text-green-500'
    }
  ];

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setIsSubscribing(true);
    setSubscriptionStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubscriptionStatus('success');
      setNewsletterEmail('');
    } catch (error) {
      setSubscriptionStatus('error');
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in your wedding planning services. Could you please share more details?");
    const phoneNumber = "919876543210";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <footer className="bg-text-primary text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="container-custom py-12 lg:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-4">
                Stay Updated with Wedding Trends
              </h3>
              <p className="text-background/80 text-lg">
                Get the latest wedding inspiration, planning tips, and exclusive offers delivered to your inbox.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-background/10 border-background/20 text-background placeholder-background/60"
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  loading={isSubscribing}
                  iconName="Send"
                  iconPosition="right"
                  className="px-6"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </div>

              {subscriptionStatus === 'success' && (
                <p className="mt-3 text-success text-sm">
                  ✓ Successfully subscribed! Welcome to our newsletter.
                </p>
              )}

              {subscriptionStatus === 'error' && (
                <p className="mt-3 text-error text-sm">
                  ✗ Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/home-page" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Heart" size={24} color="#FEFCF8" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary">WeddingCraft</h2>
                <p className="text-sm text-background/80 font-caption">Pro</p>
              </div>
            </Link>

            <p className="text-background/80 leading-relaxed">
              Creating magical wedding experiences in Bangalore and across Karnataka. 
              Your dream wedding, crafted to perfection with love, care, and attention to every detail.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} className="text-primary" />
                <a href="tel:+919876543210" className="text-background/80 hover:text-background transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-primary" />
                <a href="mailto:hello@weddingcraftpro.com" className="text-background/80 hover:text-background transition-colors">
                  hello@weddingcraftpro.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={16} className="text-primary mt-0.5" />
                <address className="text-background/80 not-italic">
                  123 MG Road, Bangalore<br />
                  Karnataka 560001, India
                </address>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-background/20 ${social.color}`}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <Icon name={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-background/80 hover:text-background transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-background/80 hover:text-background transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Wedding Types */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">Wedding Types</h3>
            <ul className="space-y-3">
              {footerLinks.weddingTypes.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-background/80 hover:text-background transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-background/60">
              © {currentYear} WeddingCraft Pro. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link to="/privacy-policy" className="text-background/60 hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-background/60 hover:text-background transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-background/60 hover:text-background transition-colors">
                Sitemap
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-background/60">Made with</span>
              <Icon name="Heart" size={14} className="text-primary" />
              <span className="text-sm text-background/60">in Bangalore</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Contact Button */}
      <div className="fixed bottom-20 right-6 lg:bottom-6 lg:right-6 z-40">
        <Button
          variant="primary"
          onClick={handleWhatsAppClick}
          iconName="MessageCircle"
          iconPosition="left"
          className="shadow-lg hover:shadow-xl px-4 py-3 lg:px-6 lg:py-4"
        >
          <span className="hidden sm:inline">Quick Chat</span>
          <span className="sm:hidden">Chat</span>
        </Button>
      </div>
    </footer>
  );
};

export default FooterSection;