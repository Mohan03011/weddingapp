import React from 'react';
import { Helmet } from 'react-helmet';
import ClientNavigation from '../../components/ui/ClientNavigation';
import WhatsAppFloat from '../../components/ui/WhatsAppFloat';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import HeroSection from './components/HeroSection';
import FeaturedCategories from './components/FeaturedCategories';
import ServicesShowcase from './components/ServicesShowcase';
import TestimonialsSection from './components/TestimonialsSection';
import StatisticsSection from './components/StatisticsSection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>WeddingCraft Pro - Premier Wedding Planners in Bangalore | Dream Weddings Made Perfect</title>
        <meta name="description" content="Transform your dream wedding into reality with WeddingCraft Pro, Bangalore's premier wedding planning service. From royal ceremonies to beachside celebrations, we craft perfect weddings with 500+ happy couples and 5+ years of expertise." />
        <meta name="keywords" content="wedding planner bangalore, wedding planning services, royal weddings, beachside weddings, traditional weddings, destination weddings, wedding decoration, wedding photography, catering services" />
        <meta property="og:title" content="WeddingCraft Pro - Premier Wedding Planners in Bangalore" />
        <meta property="og:description" content="Creating magical wedding experiences across Karnataka. Your dream wedding, crafted to perfection with love, care, and attention to every detail." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://weddingcraftpro.com/home-page" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WeddingCraft Pro - Premier Wedding Planners in Bangalore" />
        <meta name="twitter:description" content="Transform your dream wedding into reality with Bangalore's premier wedding planning service." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" />
        <link rel="canonical" href="https://weddingcraftpro.com/home-page" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "WeddingCraft Pro",
            "description": "Premier wedding planning services in Bangalore",
            "url": "https://weddingcraftpro.com",
            "telephone": "+91-98765-43210",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 MG Road",
              "addressLocality": "Bangalore",
              "addressRegion": "Karnataka",
              "postalCode": "560001",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "12.9716",
              "longitude": "77.5946"
            },
            "openingHours": "Mo-Fr 09:00-19:00, Sa 10:00-18:00",
            "priceRange": "₹₹₹",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "500"
            }
          })}
        </script>
      </Helmet>

      <section className="py-4 lg:py-8">
        <ClientNavigation />
        <BreadcrumbTrail />
        
        <main>
          <HeroSection />
          <FeaturedCategories />
          <ServicesShowcase />
          <TestimonialsSection />
          <ContactSection />
        </main>

        <FooterSection />
        <WhatsAppFloat />
      </section>
    </>
  );
};

export default HomePage;