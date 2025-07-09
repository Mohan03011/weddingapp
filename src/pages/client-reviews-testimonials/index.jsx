import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ClientNavigation from '../../components/ui/ClientNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import WhatsAppFloat from '../../components/ui/WhatsAppFloat';
import FeaturedReview from './components/FeaturedReview';
import ReviewFilters from './components/ReviewFilters';
import ReviewCard from './components/ReviewCard';
import VideoTestimonial from './components/VideoTestimonial';
import GoogleReviewsSection from './components/GoogleReviewsSection';
import WriteReviewModal from './components/WriteReviewModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ClientReviewsTestimonials = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [expandedReviews, setExpandedReviews] = useState(new Set());
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for reviews
  const mockReviews = [
    {
      id: 1,
      clientName: "Priya & Arjun Sharma",
      clientPhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      weddingLocation: "Bangalore Palace",
      weddingDate: "2024-02-14",
      serviceCategories: ["Wedding Planning", "Venue Decoration", "Photography"],
      content: `WeddingCraft Pro made our dream wedding come true! From the initial consultation to the final send-off, every detail was perfectly executed. The team's attention to detail, creativity, and professionalism exceeded our expectations. Our guests are still talking about how beautiful and well-organized everything was. The venue decoration was absolutely stunning, and the coordination was flawless. We couldn't have asked for a better wedding planning experience. Highly recommend them to anyone looking for exceptional wedding services in Bangalore.`,
      weddingPhotos: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=200&h=200&fit=crop"
      ],
      helpfulCount: 24,
      isVerified: true,
      isFeatured: true
    },
    {
      id: 2,
      clientName: "Sneha & Vikram Reddy",
      clientPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      weddingLocation: "Leela Palace",
      weddingDate: "2024-01-20",
      serviceCategories: ["Wedding Planning", "Catering", "Entertainment"],
      content: `Outstanding service from start to finish! The team at WeddingCraft Pro understood our vision perfectly and brought it to life. The catering was exceptional, and the entertainment arrangements were top-notch. Our families were thoroughly impressed with the level of organization and attention to detail.`,
      weddingPhotos: [
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=200&h=200&fit=crop"
      ],
      helpfulCount: 18,
      isVerified: true,
      isFeatured: false
    },
    {
      id: 3,
      clientName: "Kavya & Rohit Nair",
      clientPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      weddingLocation: "Taj West End",
      weddingDate: "2023-12-15",
      serviceCategories: ["Venue Decoration", "Photography", "Transportation"],
      content: `Great experience overall! The decoration was beautiful and the photography team captured all our precious moments perfectly. There were minor delays in transportation, but the team handled it professionally and ensured everything went smoothly.`,
      weddingPhotos: [
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=200&h=200&fit=crop"
      ],
      helpfulCount: 12,
      isVerified: true,
      isFeatured: false
    },
    {
      id: 4,
      clientName: "Anita & Suresh Kumar",
      clientPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      weddingLocation: "ITC Gardenia",
      weddingDate: "2023-11-28",
      serviceCategories: ["Wedding Planning", "Invitation Design", "Accommodation"],
      content: `Exceptional service! The invitation designs were unique and beautiful. The team took care of all accommodation arrangements for our out-of-town guests. Everything was perfectly coordinated and executed. Highly recommended!`,
      weddingPhotos: [],
      helpfulCount: 15,
      isVerified: true,
      isFeatured: false
    }
  ];

  // Mock video testimonials
  const mockVideoTestimonials = [
    {
      id: 1,
      clientName: "Deepika & Rajesh",
      clientPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      thumbnail: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop",
      duration: 125,
      rating: 5,
      weddingLocation: "Mysore Palace",
      weddingType: "Royal Wedding",
      serviceCategories: ["Wedding Planning", "Venue Decoration", "Photography", "Catering"],
      previewText: "WeddingCraft Pro made our royal wedding absolutely magical. Every detail was perfect, from the grand decorations to the seamless coordination. We couldn't have asked for better service.",
      views: 1250,
      likes: 89
    },
    {
      id: 2,
      clientName: "Meera & Aditya",
      clientPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
      duration: 98,
      rating: 5,
      weddingLocation: "Goa Beach Resort",
      weddingType: "Beachside Wedding",
      serviceCategories: ["Wedding Planning", "Entertainment", "Photography"],
      previewText: "Our beachside wedding was a dream come true thanks to WeddingCraft Pro. The sunset ceremony was breathtaking, and every moment was captured beautifully.",
      views: 890,
      likes: 67
    }
  ];

  // Mock Google Reviews
  const mockGoogleReviews = [
    {
      id: 1,
      reviewerName: "Ramesh Gupta",
      rating: 5,
      date: "2024-03-10",
      content: `Excellent wedding planning service! They handled everything professionally and made our special day memorable. The team was responsive and creative. Highly recommend WeddingCraft Pro for anyone planning their wedding in Bangalore.`,
      helpfulCount: 8,
      isLocalGuide: true,
      businessReply: `Thank you so much for your wonderful review, Ramesh! We're thrilled that we could make your special day memorable. It was our pleasure to work with you and your family.`,
      googleUrl: "https://g.page/r/weddingcraft-bangalore/review"
    },
    {
      id: 2,
      reviewerName: "Lakshmi Iyer",
      rating: 5,
      date: "2024-03-05",
      content: `Outstanding service from WeddingCraft Pro! They took care of every detail and made our wedding planning stress-free. The decoration was beautiful and exactly what we envisioned.`,
      helpfulCount: 5,
      isLocalGuide: false,
      businessReply: `Dear Lakshmi, thank you for trusting us with your special day! We're so happy that we could bring your vision to life and make the process stress-free for you.`,
      googleUrl: "https://g.page/r/weddingcraft-bangalore/review"
    },
    {
      id: 3,
      reviewerName: "Karthik Rao",
      rating: 4,
      date: "2024-02-28",
      content: `Good service overall. The team was professional and handled most things well. There were minor issues with timing, but they resolved them quickly. Would recommend for wedding planning.`,
      helpfulCount: 3,
      isLocalGuide: false,
      businessReply: `Thank you for your feedback, Karthik. We appreciate your understanding regarding the timing issues and are glad we could resolve them promptly. We'll continue to improve our services.`,
      googleUrl: "https://g.page/r/weddingcraft-bangalore/review"
    }
  ];

  const totalReviews = 85;
  const averageRating = 4.8;
  const googleAverageRating = 4.7;
  const googleTotalReviews = 127;

  // Filter and sort reviews
  useEffect(() => {
    let filtered = [...mockReviews];

    // Apply rating filter
    if (activeFilter !== 'all') {
      const rating = parseInt(activeFilter);
      filtered = filtered.filter(review => review.rating === rating);
    }

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'helpful':
        filtered.sort((a, b) => b.helpfulCount - a.helpfulCount);
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => new Date(b.weddingDate) - new Date(a.weddingDate));
        break;
    }

    setFilteredReviews(filtered);
  }, [activeFilter, sortBy]);

  const handleToggleExpand = (reviewId) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const handleWriteReview = async (reviewData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Review submitted:', reviewData);
      // In real app, this would make an API call to submit the review
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const featuredReview = mockReviews.find(review => review.isFeatured);

  return (
    <>
      <Helmet>
        <title>Client Reviews & Testimonials - WeddingCraft Pro | Authentic Wedding Planning Reviews</title>
        <meta name="description" content="Read authentic reviews and testimonials from our satisfied wedding clients in Bangalore. See why couples choose WeddingCraft Pro for their special day with 4.8-star ratings." />
        <meta name="keywords" content="wedding reviews, testimonials, Bangalore wedding planner reviews, client feedback, wedding planning reviews, WeddingCraft Pro reviews" />
        <meta property="og:title" content="Client Reviews & Testimonials - WeddingCraft Pro" />
        <meta property="og:description" content="Discover why couples trust WeddingCraft Pro for their wedding planning needs. Read authentic reviews and testimonials from our satisfied clients." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/client-reviews-testimonials" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <ClientNavigation />
        <BreadcrumbTrail />

        <main className="container-custom py-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-4">
              Client Reviews & Testimonials
            </h1>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Discover what our clients say about their wedding planning experience with WeddingCraft Pro. 
              Read authentic reviews and testimonials from couples who trusted us with their special day.
            </p>
            
            {/* Overall Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">{averageRating}</div>
                <div className="flex items-center justify-center space-x-1 mb-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Icon
                      key={index}
                      name="Star"
                      size={16}
                      className={index < Math.floor(averageRating) ? 'text-warning fill-current' : 'text-border'}
                    />
                  ))}
                </div>
                <div className="text-sm text-text-secondary">{totalReviews} reviews</div>
              </div>
              
              <div className="hidden sm:block w-px h-16 bg-border-light"></div>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-text-primary mb-1">98%</div>
                <div className="text-sm text-text-secondary">Would Recommend</div>
              </div>
              
              <div className="hidden sm:block w-px h-16 bg-border-light"></div>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-text-primary mb-1">150+</div>
                <div className="text-sm text-text-secondary">Weddings Planned</div>
              </div>
            </div>
          </div>

          {/* Featured Review */}
          {featuredReview && (
            <FeaturedReview review={featuredReview} />
          )}

          {/* Google Reviews Section */}
          <GoogleReviewsSection 
            googleReviews={mockGoogleReviews}
            averageRating={googleAverageRating}
            totalReviews={googleTotalReviews}
          />

          {/* Video Testimonials */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-semibold text-text-primary">
                Video Testimonials
              </h2>
              <Button
                variant="outline"
                iconName="Play"
                iconPosition="left"
              >
                View All Videos
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockVideoTestimonials.map((testimonial) => (
                <VideoTestimonial key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>

          {/* Review Filters */}
          <ReviewFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalReviews={totalReviews}
            averageRating={averageRating}
          />

          {/* Reviews Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-semibold text-text-primary">
                All Reviews ({filteredReviews.length})
              </h2>
              
              <Button
                variant="primary"
                iconName="PenTool"
                iconPosition="left"
                onClick={() => setIsWriteReviewOpen(true)}
              >
                Write a Review
              </Button>
            </div>

            {filteredReviews.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredReviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    isExpanded={expandedReviews.has(review.id)}
                    onToggleExpand={() => handleToggleExpand(review.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="MessageSquare" size={48} className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  No reviews found
                </h3>
                <p className="text-text-secondary mb-6">
                  No reviews match your current filter criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setActiveFilter('all');
                    setSortBy('recent');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Load More Button */}
          {filteredReviews.length > 0 && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                iconName="ChevronDown"
                iconPosition="right"
                loading={isLoading}
              >
                Load More Reviews
              </Button>
            </div>
          )}

          {/* Call to Action */}
          <div className="bg-gradient-accent rounded-lg p-8 mt-16 text-center">
            <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
              Ready to Create Your Perfect Wedding?
            </h2>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Join hundreds of satisfied couples who trusted WeddingCraft Pro with their special day. 
              Let us make your wedding dreams come true with our expert planning and flawless execution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                variant="primary"
                iconName="Calendar"
                iconPosition="left"
                onClick={() => window.location.href = '/contact-enquiry'}
              >
                Book Consultation
              </Button>
              <Button
                variant="outline"
                iconName="MessageCircle"
                iconPosition="left"
                onClick={() => {
                  const message = encodeURIComponent("Hi! I'm interested in your wedding planning services after reading the reviews. Could you please share more details?");
                  window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
                }}
              >
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </main>

        {/* Write Review Modal */}
        <WriteReviewModal
          isOpen={isWriteReviewOpen}
          onClose={() => setIsWriteReviewOpen(false)}
          onSubmit={handleWriteReview}
        />

        <WhatsAppFloat />
      </div>
    </>
  );
};

export default ClientReviewsTestimonials;