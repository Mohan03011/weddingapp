import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WriteReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    weddingDate: '',
    weddingLocation: '',
    serviceCategories: [],
    rating: 0,
    title: '',
    content: '',
    wouldRecommend: true,
    allowContact: false
  });

  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceOptions = [
    'Wedding Planning',
    'Venue Decoration',
    'Photography',
    'Catering',
    'Entertainment',
    'Transportation',
    'Accommodation',
    'Invitation Design'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      serviceCategories: prev.serviceCategories.includes(service)
        ? prev.serviceCategories.filter(s => s !== service)
        : [...prev.serviceCategories, service]
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        weddingDate: '',
        weddingLocation: '',
        serviceCategories: [],
        rating: 0,
        title: '',
        content: '',
        wouldRecommend: true,
        allowContact: false
      });
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1;
      const isActive = starNumber <= (hoveredRating || formData.rating);
      
      return (
        <button
          key={index}
          type="button"
          onClick={() => handleRatingClick(starNumber)}
          onMouseEnter={() => setHoveredRating(starNumber)}
          onMouseLeave={() => setHoveredRating(0)}
          className="p-1 transition-transform hover:scale-110"
        >
          <Icon
            name="Star"
            size={24}
            className={isActive ? 'text-warning fill-current' : 'text-border hover:text-warning'}
          />
        </button>
      );
    });
  };

  const getRatingText = (rating) => {
    const ratingTexts = {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent'
    };
    return ratingTexts[rating] || '';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-text-primary/50 z-300 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-light">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Write a Review
            </h2>
            <p className="text-text-secondary text-sm mt-1">
              Share your experience with WeddingCraft Pro
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Your Name *"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
              <Input
                type="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
            
            <Input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>

          {/* Wedding Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">
              Wedding Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="date"
                placeholder="Wedding Date"
                value={formData.weddingDate}
                onChange={(e) => handleInputChange('weddingDate', e.target.value)}
              />
              <Input
                type="text"
                placeholder="Wedding Location"
                value={formData.weddingLocation}
                onChange={(e) => handleInputChange('weddingLocation', e.target.value)}
              />
            </div>

            {/* Service Categories */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Services Used (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {serviceOptions.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleServiceToggle(service)}
                    className={`
                      px-3 py-2 text-sm rounded-lg border transition-all duration-200
                      ${formData.serviceCategories.includes(service)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-text-secondary border-border hover:border-primary hover:text-primary'
                      }
                    `}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">
              Overall Rating *
            </h3>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {renderStars()}
              </div>
              {formData.rating > 0 && (
                <span className="text-lg font-medium text-primary">
                  {getRatingText(formData.rating)}
                </span>
              )}
            </div>
          </div>

          {/* Review Content */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">
              Your Review
            </h3>
            
            <Input
              type="text"
              placeholder="Review Title *"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
            />
            
            <div>
              <textarea
                placeholder="Tell us about your experience with WeddingCraft Pro. What did you like most? How was the service quality? *"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                required
                rows={6}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-text-secondary">
                  Minimum 50 characters required
                </span>
                <span className="text-sm text-text-secondary">
                  {formData.content.length}/1000
                </span>
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="wouldRecommend"
                checked={formData.wouldRecommend}
                onChange={(e) => handleInputChange('wouldRecommend', e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="wouldRecommend" className="text-text-primary">
                I would recommend WeddingCraft Pro to others
              </label>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="allowContact"
                checked={formData.allowContact}
                onChange={(e) => handleInputChange('allowContact', e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="allowContact" className="text-text-secondary text-sm">
                Allow WeddingCraft Pro to contact me for follow-up (optional)
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-border-light">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              disabled={!formData.name || !formData.email || !formData.rating || !formData.title || !formData.content || formData.content.length < 50}
            >
              Submit Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteReviewModal;