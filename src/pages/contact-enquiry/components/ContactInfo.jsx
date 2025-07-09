import React from 'react';
import Icon from '../../../components/AppIcon';

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: 'Phone',
      label: 'Phone',
      value: '+91 98765 43210',
      action: 'tel:+919876543210',
      description: 'Call us directly'
    },
    {
      icon: 'Mail',
      label: 'Email',
      value: 'hello@weddingcraft.com',
      action: 'mailto:hello@weddingcraft.com',
      description: 'Send us an email'
    },
    {
      icon: 'MapPin',
      label: 'Address',
      value: '123 MG Road, Bangalore, Karnataka 560001',
      action: 'https://maps.google.com/?q=12.9716,77.5946',
      description: 'Visit our office'
    },
    {
      icon: 'Clock',
      label: 'Business Hours',
      value: 'Mon - Sat: 9:00 AM - 7:00 PM IST',
      description: 'Sunday: By appointment only'
    }
  ];

  const socialLinks = [
    { icon: 'Instagram', url: 'https://instagram.com/weddingcraft', label: 'Instagram' },
    { icon: 'Facebook', url: 'https://facebook.com/weddingcraft', label: 'Facebook' },
    { icon: 'Youtube', url: 'https://youtube.com/weddingcraft', label: 'YouTube' }
  ];

  const handleContactClick = (action) => {
    if (action) {
      if (action.startsWith('http')) {
        window.open(action, '_blank');
      } else {
        window.location.href = action;
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Get in Touch
        </h2>
        <p className="text-text-secondary">
          Ready to plan your dream wedding? We're here to help make your special day unforgettable.
        </p>
      </div>

      {/* Contact Details */}
      <div className="space-y-4">
        {contactDetails.map((contact, index) => (
          <div
            key={index}
            className={`flex items-start space-x-4 p-4 rounded-lg transition-colors ${
              contact.action ? 'hover:bg-accent cursor-pointer' : 'bg-surface'
            }`}
            onClick={() => handleContactClick(contact.action)}
          >
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={contact.icon} size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-text-primary">{contact.label}</h3>
              <p className="text-text-primary font-medium">{contact.value}</p>
              <p className="text-sm text-text-secondary">{contact.description}</p>
            </div>
            {contact.action && (
              <Icon name="ExternalLink" size={16} className="text-text-secondary" />
            )}
          </div>
        ))}
      </div>

      {/* Social Media */}
      <div>
        <h3 className="font-medium text-text-primary mb-4">Follow Us</h3>
        <div className="flex space-x-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-surface hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-colors"
              aria-label={social.label}
            >
              <Icon name={social.icon} size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Response Time */}
      <div className="bg-accent/50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Clock" size={16} className="text-primary" />
          <h3 className="font-medium text-text-primary">Response Time</h3>
        </div>
        <p className="text-sm text-text-secondary">
          We typically respond to enquiries within 2-4 hours during business hours. 
          For urgent matters, please call us directly.
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;