import React from 'react';
import { Helmet } from 'react-helmet';
import ClientNavigation from '../../components/ui/ClientNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';

import ContactInfo from './components/ContactInfo';
import GoogleMap from './components/GoogleMap';
import EnquiryForm from './components/EnquiryForm';
import QuickContact from './components/QuickContact';
import Icon from '../../components/AppIcon';

const ContactEnquiry = () => {
  return (
    <div className="bg-background">
      <Helmet>
        <title>Contact & Enquiry - WeddingCraft Pro | Wedding Planning Services in Bangalore</title>
        <meta name="description" content="Get in touch with WeddingCraft Pro for your dream wedding planning. Contact us via phone, email, or WhatsApp. Located in Bangalore, Karnataka." />
        <meta name="keywords" content="wedding planner contact, Bangalore wedding services, wedding enquiry, wedding consultation" />
        <meta property="og:title" content="Contact WeddingCraft Pro - Wedding Planning Services" />
        <meta property="og:description" content="Ready to plan your dream wedding? Contact our expert wedding planners in Bangalore for personalized consultation and services." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/contact-enquiry" />
      </Helmet>

      <ClientNavigation />

      {/* Hero Section (Commented out to fix spacing issue) */}
      {/*
      <section className="bg-gradient-primary text-primary-foreground py-8 lg:py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Icon name="MessageCircle" size={32} />
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
              Let's Plan Your Dream Wedding
            </h1>
            <p className="text-lg lg:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Ready to create magical moments? Get in touch with our expert wedding planners 
              and let's bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} />
                <span>Response within 2-4 hours</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={20} />
                <span>Based in Bangalore</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={20} />
                <span>500+ Happy Couples</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Main Content */}
      <section className="pb-8 lg:pb-12">
        <div className="container-custom">
          {/* Mobile Quick Contact - Removed as it's now part of the main content */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Contact Info & Map */}
            <div className="space-y-8">
              <ContactInfo />
              <GoogleMap />
            </div>

            {/* Right Column - Enquiry Form and Quick Contact */}
            <div>
              <EnquiryForm />
              {/* Show QuickContact below form on all screens */}
              <div className="mt-8">
                <QuickContact />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 bg-surface">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-text-primary mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-text-secondary">
                Quick answers to common questions about our wedding planning services
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "How far in advance should I book your services?",
                  answer: "We recommend booking 6-12 months in advance for peak wedding season (October-March). However, we can accommodate shorter timelines based on availability."
                },
                {
                  question: "Do you provide services outside Bangalore?",
                  answer: "Yes, we provide destination wedding planning services across Karnataka and neighboring states. Additional travel charges may apply."
                },
                {
                  question: "What's included in your wedding planning packages?",
                  answer: "Our packages include venue selection, vendor coordination, decoration, catering management, photography coordination, and day-of coordination. Specific inclusions vary by package."
                },
                {
                  question: "Can I customize my wedding package?",
                  answer: "Absolutely! We offer fully customizable packages tailored to your specific needs, preferences, and budget requirements."
                },
                {
                  question: "Do you offer payment plans?",
                  answer: "Yes, we offer flexible payment plans with milestone-based payments. Typically 30% advance, 40% during planning, and 30% before the event."
                }
              ].map((faq, index) => (
                <details key={index} className="bg-background rounded-lg border border-border-light">
                  <summary className="px-4 py-3 cursor-pointer font-medium flex items-center justify-between">
                    {faq.question}
                    <Icon name="ChevronDown" className="h-5 w-5 text-primary transition-transform" />
                  </summary>
                  <div className="px-4 py-3 border-t border-border-light text-text-secondary">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactEnquiry;