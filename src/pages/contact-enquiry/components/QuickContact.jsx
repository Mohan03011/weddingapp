import React from 'react';

import Icon from '../../../components/AppIcon';

const QuickContact = () => {
  const quickContactOptions = [
    {
      title: 'Call Now',
      description: 'Speak directly with our wedding planners',
      action: () => window.location.href = 'tel:+919876543210',
      icon: 'Phone',
      color: 'success',
      value: '+91 98765 43210'
    },
    {
      title: 'WhatsApp Chat',
      description: 'Quick response via WhatsApp',
      action: () => {
        const message = encodeURIComponent("Hi! I'm interested in your wedding planning services. Could you please share more details about your packages and availability?");
        window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
      },
      icon: 'MessageCircle',
      color: 'primary',
      value: 'Chat Now'
    },
    {
      title: 'Email Us',
      description: 'Send detailed enquiry via email',
      action: () => window.location.href = 'mailto:hello@weddingcraft.com?subject=Wedding Planning Enquiry',
      icon: 'Mail',
      color: 'secondary',
      value: 'hello@weddingcraft.com'
    }
  ];

  const emergencyContact = {
    title: 'Emergency Contact',
    description: 'For urgent wedding day support',
    phone: '+91 98765 43211',
    available: '24/7 during wedding season'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
          Need Immediate Assistance?
        </h2>
        <p className="text-text-secondary text-sm">
          Choose your preferred way to connect with us
        </p>
      </div>

      {/* Quick Contact Options */}
      <div className="grid grid-cols-1 gap-4">
        {quickContactOptions.map((option, index) => (
          <div
            key={index}
            onClick={option.action}
            className="group bg-surface hover:bg-accent border border-border-light rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                option.color === 'success' ? 'bg-success/10 text-success group-hover:bg-success group-hover:text-success-foreground' :
                option.color === 'primary' ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground' :
                'bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground'
              }`}>
                <Icon name={option.icon} size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-text-primary group-hover:text-primary">
                  {option.title}
                </h3>
                <p className="text-sm text-text-secondary mb-1">
                  {option.description}
                </p>
                <p className="text-sm font-medium text-primary">
                  {option.value}
                </p>
              </div>
              
              <Icon name="ChevronRight" size={16} className="text-text-secondary group-hover:text-primary" />
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Contact */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="AlertCircle" size={16} className="text-warning" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-text-primary mb-1">
              {emergencyContact.title}
            </h3>
            <p className="text-sm text-text-secondary mb-2">
              {emergencyContact.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-warning">
                {emergencyContact.phone}
              </span>
              <span className="text-xs text-text-secondary">
                {emergencyContact.available}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Business Hours Reminder */}
      <div className="bg-accent/30 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Clock" size={16} className="text-primary" />
          <h3 className="font-medium text-text-primary">Business Hours</h3>
        </div>
        <p className="text-sm text-text-secondary">
          Monday - Saturday: 9:00 AM - 7:00 PM IST
        </p>
        <p className="text-xs text-text-secondary mt-1">
          Sunday: By appointment only
        </p>
      </div>
    </div>
  );
};

export default QuickContact;