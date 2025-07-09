import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const EnquiryForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Basic Details
    fullName: '',
    email: '',
    phone: '',
    
    // Step 2: Wedding Details
    weddingDate: '',
    venue: '',
    guestCount: '',
    
    // Step 3: Budget & Services
    budget: '',
    services: [],
    
    // Step 4: Additional Details
    message: '',
    preferredContact: 'phone'
  });

  const [errors, setErrors] = useState({});

  const steps = [
    { number: 1, title: 'Basic Details', icon: 'User' },
    { number: 2, title: 'Wedding Details', icon: 'Calendar' },
    { number: 3, title: 'Budget & Services', icon: 'IndianRupee' },
    { number: 4, title: 'Additional Info', icon: 'MessageSquare' }
  ];

  const budgetRanges = [
    { value: '2-5', label: '₹2 - 5 Lakhs' },
    { value: '5-10', label: '₹5 - 10 Lakhs' },
    { value: '10-20', label: '₹10 - 20 Lakhs' },
    { value: '20-50', label: '₹20 - 50 Lakhs' },
    { value: '50+', label: '₹50+ Lakhs' }
  ];

  const serviceOptions = [
    { id: 'planning', label: 'Complete Wedding Planning' },
    { id: 'decoration', label: 'Decoration & Styling' },
    { id: 'catering', label: 'Catering Services' },
    { id: 'photography', label: 'Photography & Videography' },
    { id: 'entertainment', label: 'Entertainment & Music' },
    { id: 'transport', label: 'Transportation' },
    { id: 'accommodation', label: 'Guest Accommodation' },
    { id: 'other', label: 'Other Services' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleServiceToggle = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
          newErrors.phone = 'Invalid Indian phone number';
        }
        break;
      case 2:
        if (!formData.weddingDate) newErrors.weddingDate = 'Wedding date is required';
        if (!formData.venue.trim()) newErrors.venue = 'Venue preference is required';
        if (!formData.guestCount) newErrors.guestCount = 'Guest count is required';
        break;
      case 3:
        if (!formData.budget) newErrors.budget = 'Budget range is required';
        if (formData.services.length === 0) newErrors.services = 'Please select at least one service';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success message
      alert(`Thank you ${formData.fullName}! Your enquiry has been submitted successfully. We'll contact you within 2-4 hours.`);
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        weddingDate: '',
        venue: '',
        guestCount: '',
        budget: '',
        services: [],
        message: '',
        preferredContact: 'phone'
      });
      setCurrentStep(1);
      
    } catch (error) {
      alert('Sorry, there was an error submitting your enquiry. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Full Name *
              </label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={errors.fullName ? 'border-error' : ''}
              />
              {errors.fullName && (
                <p className="text-error text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email Address *
              </label>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-error' : ''}
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Phone Number *
              </label>
              <Input
                type="tel"
                placeholder="Enter your 10-digit phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={errors.phone ? 'border-error' : ''}
              />
              {errors.phone && (
                <p className="text-error text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Wedding Date *
              </label>
              <Input
                type="date"
                value={formData.weddingDate}
                onChange={(e) => handleInputChange('weddingDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={errors.weddingDate ? 'border-error' : ''}
              />
              {errors.weddingDate && (
                <p className="text-error text-sm mt-1">{errors.weddingDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Venue Preference *
              </label>
              <Input
                type="text"
                placeholder="e.g., Banquet Hall, Resort, Outdoor Garden"
                value={formData.venue}
                onChange={(e) => handleInputChange('venue', e.target.value)}
                className={errors.venue ? 'border-error' : ''}
              />
              {errors.venue && (
                <p className="text-error text-sm mt-1">{errors.venue}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Expected Guest Count *
              </label>
              <select
                value={formData.guestCount}
                onChange={(e) => handleInputChange('guestCount', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.guestCount ? 'border-error' : 'border-border'
                }`}
              >
                <option value="">Select guest count</option>
                <option value="50-100">50 - 100 guests</option>
                <option value="100-200">100 - 200 guests</option>
                <option value="200-300">200 - 300 guests</option>
                <option value="300-500">300 - 500 guests</option>
                <option value="500+">500+ guests</option>
              </select>
              {errors.guestCount && (
                <p className="text-error text-sm mt-1">{errors.guestCount}</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Budget Range *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {budgetRanges.map((range) => (
                  <label
                    key={range.value}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.budget === range.value
                        ? 'border-primary bg-accent' :'border-border hover:bg-surface'
                    }`}
                  >
                    <input
                      type="radio"
                      name="budget"
                      value={range.value}
                      checked={formData.budget === range.value}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      formData.budget === range.value
                        ? 'border-primary bg-primary' :'border-border'
                    }`}>
                      {formData.budget === range.value && (
                        <div className="w-2 h-2 bg-primary-foreground rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <span className="text-sm font-medium">{range.label}</span>
                  </label>
                ))}
              </div>
              {errors.budget && (
                <p className="text-error text-sm mt-1">{errors.budget}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Services Required *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceOptions.map((service) => (
                  <label
                    key={service.id}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.services.includes(service.id)
                        ? 'border-primary bg-accent' :'border-border hover:bg-surface'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service.id)}
                      onChange={() => handleServiceToggle(service.id)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border mr-3 flex items-center justify-center ${
                      formData.services.includes(service.id)
                        ? 'border-primary bg-primary' :'border-border'
                    }`}>
                      {formData.services.includes(service.id) && (
                        <Icon name="Check" size={12} color="#FEFCF8" />
                      )}
                    </div>
                    <span className="text-sm">{service.label}</span>
                  </label>
                ))}
              </div>
              {errors.services && (
                <p className="text-error text-sm mt-1">{errors.services}</p>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Additional Message
              </label>
              <textarea
                placeholder="Tell us more about your dream wedding, special requirements, or any questions you have..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Preferred Contact Method
              </label>
              <div className="flex space-x-4">
                {[
                  { value: 'phone', label: 'Phone Call', icon: 'Phone' },
                  { value: 'email', label: 'Email', icon: 'Mail' },
                  { value: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle' }
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.preferredContact === method.value
                        ? 'border-primary bg-accent' :'border-border hover:bg-surface'
                    }`}
                  >
                    <input
                      type="radio"
                      name="preferredContact"
                      value={method.value}
                      checked={formData.preferredContact === method.value}
                      onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                      className="sr-only"
                    />
                    <Icon name={method.icon} size={16} className="mr-2" />
                    <span className="text-sm">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-border-light p-6">
      {/* Form Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Wedding Enquiry Form
        </h2>
        <p className="text-text-secondary">
          Tell us about your dream wedding and we'll create a personalized proposal for you.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                currentStep >= step.number
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-text-secondary'
              }`}>
                <Icon name={step.icon} size={16} />
              </div>
              <div className="ml-3 hidden sm:block">
                <p className={`text-sm font-medium ${
                  currentStep >= step.number ? 'text-primary' : 'text-text-secondary'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 sm:w-16 h-0.5 mx-4 ${
                  currentStep > step.number ? 'bg-primary' : 'bg-border'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Form Navigation */}
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>

          {currentStep < 4 ? (
            <Button
              type="button"
              variant="primary"
              onClick={handleNext}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              iconName="Send"
              iconPosition="right"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EnquiryForm;