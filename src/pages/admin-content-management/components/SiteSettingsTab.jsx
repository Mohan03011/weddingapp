import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SiteSettingsTab = () => {
  const [settings, setSettings] = useState({
    // Business Information
    businessName: "WeddingCraft Pro",
    tagline: "Creating Magical Wedding Moments",
    description: `We are Bangalore's premier wedding planning service, specializing in creating unforgettable wedding experiences.\n\nFrom traditional South Indian ceremonies to modern destination weddings, we handle every detail with precision and care.`,
    
    // Contact Information
    phone: "+91 98765 43210",
    email: "info@weddingcraft.com",
    whatsapp: "+91 98765 43210",
    address: "123 MG Road, Bangalore, Karnataka 560001",
    
    // Social Media
    instagram: "https://instagram.com/weddingcraft_pro",
    facebook: "https://facebook.com/weddingcraft.pro",
    youtube: "https://youtube.com/@weddingcraft",
    
    // Homepage Content
    heroTitle: "Your Dream Wedding Awaits",
    heroSubtitle: "Creating magical moments that last a lifetime with personalized wedding planning services in Bangalore",
    heroButtonText: "Plan Your Wedding",
    
    // Services Section
    servicesTitle: "Our Wedding Services",
    servicesSubtitle: "Comprehensive wedding planning solutions tailored to your vision",
    
    // Gallery Section
    galleryTitle: "Our Wedding Portfolio",
    gallerySubtitle: "Discover the magic we create for couples across Bangalore",
    
    // Reviews Section
    reviewsTitle: "What Our Couples Say",
    reviewsSubtitle: "Real stories from real couples who trusted us with their special day",
    
    // Business Hours
    businessHours: {
      monday: "9:00 AM - 7:00 PM",
      tuesday: "9:00 AM - 7:00 PM",
      wednesday: "9:00 AM - 7:00 PM",
      thursday: "9:00 AM - 7:00 PM",
      friday: "9:00 AM - 7:00 PM",
      saturday: "10:00 AM - 6:00 PM",
      sunday: "Closed"
    },
    
    // SEO Settings
    metaTitle: "WeddingCraft Pro - Premier Wedding Planning Services in Bangalore",
    metaDescription: "Transform your dream wedding into reality with WeddingCraft Pro. Expert wedding planning services in Bangalore for traditional, modern, and destination weddings.",
    metaKeywords: "wedding planning bangalore, wedding planners, destination weddings, traditional weddings, wedding services"
  });

  const [activeSection, setActiveSection] = useState('business');
  const [hasChanges, setHasChanges] = useState(false);

  const sections = [
    { id: 'business', label: 'Business Info', icon: 'Building' },
    { id: 'contact', label: 'Contact Details', icon: 'Phone' },
    { id: 'social', label: 'Social Media', icon: 'Share2' },
    { id: 'homepage', label: 'Homepage Content', icon: 'Home' },
    { id: 'hours', label: 'Business Hours', icon: 'Clock' },
    { id: 'seo', label: 'SEO Settings', icon: 'Search' }
  ];

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleBusinessHoursChange = (day, value) => {
    setSettings(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Simulate save operation
    console.log('Saving settings:', settings);
    setHasChanges(false);
    // Show success message
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all changes?')) {
      // Reset to original values (in real app, fetch from server)
      setHasChanges(false);
    }
  };

  const renderBusinessInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Business Name *
        </label>
        <Input
          type="text"
          value={settings.businessName}
          onChange={(e) => handleInputChange('businessName', e.target.value)}
          placeholder="Enter business name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Tagline
        </label>
        <Input
          type="text"
          value={settings.tagline}
          onChange={(e) => handleInputChange('tagline', e.target.value)}
          placeholder="Enter business tagline"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Business Description
        </label>
        <textarea
          value={settings.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Enter business description"
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        />
      </div>
    </div>
  );

  const renderContactDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Phone Number *
          </label>
          <Input
            type="tel"
            value={settings.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+91 XXXXX XXXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            WhatsApp Number
          </label>
          <Input
            type="tel"
            value={settings.whatsapp}
            onChange={(e) => handleInputChange('whatsapp', e.target.value)}
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Email Address *
        </label>
        <Input
          type="email"
          value={settings.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="info@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Business Address
        </label>
        <textarea
          value={settings.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          placeholder="Enter complete business address"
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        />
      </div>
    </div>
  );

  const renderSocialMedia = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Instagram Profile
        </label>
        <Input
          type="url"
          value={settings.instagram}
          onChange={(e) => handleInputChange('instagram', e.target.value)}
          placeholder="https://instagram.com/your_profile"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Facebook Page
        </label>
        <Input
          type="url"
          value={settings.facebook}
          onChange={(e) => handleInputChange('facebook', e.target.value)}
          placeholder="https://facebook.com/your_page"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          YouTube Channel
        </label>
        <Input
          type="url"
          value={settings.youtube}
          onChange={(e) => handleInputChange('youtube', e.target.value)}
          placeholder="https://youtube.com/@your_channel"
        />
      </div>
    </div>
  );

  const renderHomepageContent = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-medium text-text-primary mb-4">Hero Section</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Hero Title
            </label>
            <Input
              type="text"
              value={settings.heroTitle}
              onChange={(e) => handleInputChange('heroTitle', e.target.value)}
              placeholder="Enter hero section title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Hero Subtitle
            </label>
            <textarea
              value={settings.heroSubtitle}
              onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
              placeholder="Enter hero section subtitle"
              rows={2}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Hero Button Text
            </label>
            <Input
              type="text"
              value={settings.heroButtonText}
              onChange={(e) => handleInputChange('heroButtonText', e.target.value)}
              placeholder="Enter button text"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border-light pt-6">
        <h4 className="text-md font-medium text-text-primary mb-4">Section Titles</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Services Section Title
            </label>
            <Input
              type="text"
              value={settings.servicesTitle}
              onChange={(e) => handleInputChange('servicesTitle', e.target.value)}
              placeholder="Services section title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Gallery Section Title
            </label>
            <Input
              type="text"
              value={settings.galleryTitle}
              onChange={(e) => handleInputChange('galleryTitle', e.target.value)}
              placeholder="Gallery section title"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderBusinessHours = () => (
    <div className="space-y-4">
      {Object.entries(settings.businessHours).map(([day, hours]) => (
        <div key={day} className="flex items-center space-x-4">
          <div className="w-24">
            <label className="block text-sm font-medium text-text-primary capitalize">
              {day}
            </label>
          </div>
          <div className="flex-1">
            <Input
              type="text"
              value={hours}
              onChange={(e) => handleBusinessHoursChange(day, e.target.value)}
              placeholder="9:00 AM - 6:00 PM or Closed"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderSEOSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Meta Title
        </label>
        <Input
          type="text"
          value={settings.metaTitle}
          onChange={(e) => handleInputChange('metaTitle', e.target.value)}
          placeholder="Enter meta title for SEO"
        />
        <p className="text-xs text-text-secondary mt-1">
          Recommended: 50-60 characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Meta Description
        </label>
        <textarea
          value={settings.metaDescription}
          onChange={(e) => handleInputChange('metaDescription', e.target.value)}
          placeholder="Enter meta description for SEO"
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        />
        <p className="text-xs text-text-secondary mt-1">
          Recommended: 150-160 characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Meta Keywords
        </label>
        <Input
          type="text"
          value={settings.metaKeywords}
          onChange={(e) => handleInputChange('metaKeywords', e.target.value)}
          placeholder="Enter comma-separated keywords"
        />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'business':
        return renderBusinessInfo();
      case 'contact':
        return renderContactDetails();
      case 'social':
        return renderSocialMedia();
      case 'homepage':
        return renderHomepageContent();
      case 'hours':
        return renderBusinessHours();
      case 'seo':
        return renderSEOSettings();
      default:
        return renderBusinessInfo();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">Site Settings</h3>
          <p className="text-sm text-text-secondary mt-1">Manage your website content and configuration</p>
        </div>
        
        {hasChanges && (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              iconName="Save"
              iconPosition="left"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:bg-surface hover:text-primary'
                }`}
              >
                <Icon name={section.icon} size={18} />
                <span className="font-medium">{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-surface rounded-lg border border-border p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteSettingsTab;