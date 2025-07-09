import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    weddingDate: '',
    guestCount: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const budgetRanges = [
    { value: '5-10', label: '₹5L - ₹10L' },
    { value: '10-20', label: '₹10L - ₹20L' },
    { value: '20-35', label: '₹20L - ₹35L' },
    { value: '35-50', label: '₹35L - ₹50L' },
    { value: '50+', label: '₹50L+' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful submission
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        weddingDate: '',
        guestCount: '',
        budget: '',
        message: ''
      });

      // Send WhatsApp message
      const message = encodeURIComponent(
        `New Wedding Enquiry:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nWedding Date: ${formData.weddingDate}\nGuest Count: ${formData.guestCount}\nBudget: ${formData.budget}\nMessage: ${formData.message}`
      );
      const phoneNumber = "919876543210";
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');

    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in your wedding planning services. Could you please share more details?");
    const phoneNumber = "919876543210";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+919876543210';
  };

  return (
    <section id="contact-form" className="w-full bg-surface py-12 lg:py-16">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Icon name="MessageCircle" size={16} className="text-primary mr-2" />
                <span className="text-sm font-medium text-primary">Get In Touch</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6">
                Let's Plan Your
                <span className="block text-primary">Dream Wedding</span>
              </h2>
              
              <p className="text-lg text-text-secondary leading-relaxed">
                Ready to start planning your perfect wedding? Get in touch with us for a free consultation and personalized quote.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Phone</h3>
                  <p className="text-text-secondary mb-2">Call us for immediate assistance</p>
                  <button
                    onClick={handleCallClick}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    +91 98765 43210
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="MessageCircle" size={20} className="text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">WhatsApp</h3>
                  <p className="text-text-secondary mb-2">Quick chat for instant responses</p>
                  <button
                    onClick={handleWhatsAppClick}
                    className="text-success hover:text-success/80 font-medium"
                  >
                    Chat with us
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" size={20} className="text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Email</h3>
                  <p className="text-text-secondary mb-2">Send us detailed requirements</p>
                  <a
                    href="mailto:hello@weddingcraftpro.com"
                    className="text-secondary hover:text-secondary/80 font-medium"
                  >
                    hello@weddingcraftpro.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" size={20} className="text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Office</h3>
                  <p className="text-text-secondary mb-2">Visit us for in-person consultation</p>
                  <address className="text-warning not-italic">
                    123 MG Road, Bangalore<br />
                    Karnataka 560001
                  </address>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-background rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="Clock" size={20} className="text-primary mr-2" />
                Business Hours
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Monday - Friday</span>
                  <span className="text-text-primary font-medium">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Saturday</span>
                  <span className="text-text-primary font-medium">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Sunday</span>
                  <span className="text-text-primary font-medium">By Appointment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-background rounded-2xl p-8 lg:p-10 shadow-sm">
            <h3 className="text-2xl font-heading font-bold text-text-primary mb-6">
              Get Your Free Quote
            </h3>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <span className="text-success font-medium">
                    Thank you! We'll contact you within 24 hours.
                  </span>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={20} className="text-error" />
                  <span className="text-error font-medium">
                    Something went wrong. Please try again.
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="date"
                  name="weddingDate"
                  placeholder="Wedding Date"
                  value={formData.weddingDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="number"
                  name="guestCount"
                  placeholder="Expected Guest Count"
                  value={formData.guestCount}
                  onChange={handleInputChange}
                  min="1"
                />
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text-primary"
                >
                  <option value="">Select Budget Range</option>
                  {budgetRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                name="message"
                placeholder="Tell us about your dream wedding..."
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text-primary resize-none"
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                iconName="Send"
                iconPosition="right"
              >
                {isSubmitting ? 'Sending...' : 'Send Enquiry'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-text-secondary mb-4">
                Prefer to chat directly?
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={handleWhatsAppClick}
                  iconName="MessageCircle"
                  iconPosition="left"
                  fullWidth
                >
                  WhatsApp Chat
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCallClick}
                  iconName="Phone"
                  iconPosition="left"
                  fullWidth
                >
                  Call Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;