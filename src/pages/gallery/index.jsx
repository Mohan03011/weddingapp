import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import ClientNavigation from '../../components/ui/ClientNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import WhatsAppFloat from '../../components/ui/WhatsAppFloat';
import FilterTabs from './components/FilterTabs';
import SearchBar from './components/SearchBar';
import GalleryGrid from './components/GalleryGrid';
import Lightbox from './components/Lightbox';
import FloatingQuoteButton from './components/FloatingQuoteButton';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Mock data for gallery categories
  const categories = [
    { id: 'all', name: 'All Weddings' },
    { id: 'royal', name: 'Royal' },
    { id: 'traditional', name: 'Traditional' },
    { id: 'beachside', name: 'Beachside' },
    { id: 'destination', name: 'Destination' }
  ];

  // Mock gallery data
  const galleryItems = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=800&fit=crop",
      alt: "Royal wedding ceremony with golden decorations",
      title: "Royal Palace Wedding",
      location: "Bangalore Palace",
      category: "royal",
      type: "image"
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?w=800&h=800&fit=crop",
      alt: "Traditional South Indian wedding ceremony",
      title: "Traditional Ceremony",
      location: "Mysore",
      category: "traditional",
      type: "image"
    },
    {
      id: 3,
      src: "https://images.pixabay.com/photo/2016/11/29/05/45/beach-1867285_1280.jpg?w=800&h=800&fit=crop",
      alt: "Beautiful beachside wedding setup",
      title: "Sunset Beach Wedding",
      location: "Goa Beach Resort",
      category: "beachside",
      type: "image"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=800&fit=crop",
      alt: "Destination wedding in the mountains",
      title: "Mountain View Wedding",
      location: "Coorg Hills",
      category: "destination",
      type: "image"
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?w=800&h=800&fit=crop",
      alt: "Royal wedding mandap decoration",
      title: "Golden Mandap Setup",
      location: "Bangalore",
      category: "royal",
      type: "image"
    },
    {
      id: 6,
      src: "https://images.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg?w=800&h=800&fit=crop",
      alt: "Traditional wedding rituals",
      title: "Sacred Rituals",
      location: "Chennai",
      category: "traditional",
      type: "image"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=800&fit=crop",
      alt: "Beachside wedding reception",
      title: "Beach Reception",
      location: "Pondicherry",
      category: "beachside",
      type: "image"
    },
    {
      id: 8,
      src: "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?w=800&h=800&fit=crop",
      alt: "Destination wedding celebration",
      title: "Hill Station Wedding",
      location: "Ooty",
      category: "destination",
      type: "image"
    },
    {
      id: 9,
      src: "https://images.pixabay.com/photo/2016/03/27/07/32/restaurant-1282315_1280.jpg?w=800&h=800&fit=crop",
      alt: "Royal wedding reception hall",
      title: "Grand Reception",
      location: "Bangalore",
      category: "royal",
      type: "image"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=800&fit=crop",
      alt: "Traditional wedding photography",
      title: "Couple Portraits",
      location: "Mysore Palace",
      category: "traditional",
      type: "image"
    },
    {
      id: 11,
      src: "https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?w=800&h=800&fit=crop",
      alt: "Beach wedding video highlights",
      title: "Wedding Highlights",
      location: "Goa",
      category: "beachside",
      type: "video"
    },
    {
      id: 12,
      src: "https://images.pixabay.com/photo/2017/07/15/22/07/wedding-2507729_1280.jpg?w=800&h=800&fit=crop",
      alt: "Destination wedding decor",
      title: "Mountain Decor",
      location: "Kodaikanal",
      category: "destination",
      type: "image"
    },
    {
      id: 13,
      src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=800&fit=crop",
      alt: "Royal wedding jewelry",
      title: "Bridal Jewelry",
      location: "Bangalore",
      category: "royal",
      type: "image"
    },
    {
      id: 14,
      src: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?w=800&h=800&fit=crop",
      alt: "Traditional wedding feast",
      title: "Wedding Feast",
      location: "Madurai",
      category: "traditional",
      type: "image"
    },
    {
      id: 15,
      src: "https://images.pixabay.com/photo/2016/11/29/05/46/beach-1867271_1280.jpg?w=800&h=800&fit=crop",
      alt: "Beachside wedding ceremony",
      title: "Seaside Vows",
      location: "Mangalore",
      category: "beachside",
      type: "image"
    },
    {
      id: 16,
      src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&h=800&fit=crop",
      alt: "Destination wedding video",
      title: "Wedding Story",
      location: "Munnar",
      category: "destination",
      type: "video"
    }
  ];

  // Filter and search logic
  const filteredItems = useMemo(() => {
    let filtered = galleryItems;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [activeCategory, searchTerm]);

  // Initialize displayed items
  useEffect(() => {
    setDisplayedItems(filteredItems.slice(0, 12));
    setHasMore(filteredItems.length > 12);
  }, [filteredItems]);

  // Load more items
  const loadMoreItems = () => {
    if (loading) return;
    
    setLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const currentLength = displayedItems.length;
      const nextItems = filteredItems.slice(currentLength, currentLength + 8);
      
      setDisplayedItems(prev => [...prev, ...nextItems]);
      setHasMore(currentLength + nextItems.length < filteredItems.length);
      setLoading(false);
    }, 1000);
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setSearchTerm('');
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleImageClick = (item, index) => {
    const itemIndex = filteredItems.findIndex(filteredItem => filteredItem.id === item.id);
    setCurrentImageIndex(itemIndex);
    setLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setLightboxOpen(false);
  };

  const handleLightboxNext = () => {
    setCurrentImageIndex((prev) => 
      prev === filteredItems.length - 1 ? 0 : prev + 1
    );
  };

  const handleLightboxPrev = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? filteredItems.length - 1 : prev - 1
    );
  };

  const handleQuoteRequest = () => {
    // Scroll to contact form or navigate to contact page
    window.location.href = '/contact-enquiry';
  };

  return (
    <>
      <Helmet>
        <title>Wedding Gallery - WeddingCraft Pro | Bangalore's Premier Wedding Planners</title>
        <meta name="description" content="Explore our stunning wedding gallery featuring Royal, Traditional, Beachside, and Destination weddings in Bangalore. Get inspired by our beautiful wedding photography and videography." />
        <meta name="keywords" content="wedding gallery, wedding photography, Bangalore weddings, royal weddings, traditional weddings, beachside weddings, destination weddings" />
        <meta property="og:title" content="Wedding Gallery - WeddingCraft Pro" />
        <meta property="og:description" content="Discover beautiful wedding moments captured by WeddingCraft Pro. Browse our extensive gallery of weddings across different themes and locations." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/gallery" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <ClientNavigation />
        <BreadcrumbTrail />
        
        <main className="container-custom py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
              Our Wedding Gallery
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Discover the magic of love through our lens. Each wedding tells a unique story, 
              beautifully captured and crafted with passion and precision.
            </p>
          </div>

          {/* Filter Tabs */}
          <FilterTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Search Bar */}
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onClearSearch={handleClearSearch}
          />

          {/* Results Count */}
          {(searchTerm || activeCategory !== 'all') && (
            <div className="text-center mb-6">
              <p className="text-text-secondary">
                {filteredItems.length === 0 
                  ? 'No results found' 
                  : `Showing ${filteredItems.length} ${filteredItems.length === 1 ? 'result' : 'results'}`
                }
                {searchTerm && ` for "${searchTerm}"`}
                {activeCategory !== 'all' && ` in ${categories.find(cat => cat.id === activeCategory)?.name}`}
              </p>
            </div>
          )}

          {/* Gallery Grid */}
          <GalleryGrid
            items={displayedItems}
            onImageClick={handleImageClick}
            onLoadMore={loadMoreItems}
            hasMore={hasMore}
            loading={loading}
          />

          {/* Load More Button for Desktop */}
          {hasMore && !loading && displayedItems.length > 0 && (
            <div className="text-center mt-12">
              <button
                onClick={loadMoreItems}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Load More Images
              </button>
            </div>
          )}
        </main>

        {/* Lightbox */}
        <Lightbox
          isOpen={lightboxOpen}
          items={filteredItems}
          currentIndex={currentImageIndex}
          onClose={handleLightboxClose}
          onNext={handleLightboxNext}
          onPrev={handleLightboxPrev}
        />

        {/* Floating Quote Button */}
        <FloatingQuoteButton onQuoteRequest={handleQuoteRequest} />

        {/* WhatsApp Float */}
        <WhatsAppFloat />
      </div>
    </>
  );
};

export default Gallery;