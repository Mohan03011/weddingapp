import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ReviewsTab = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Priya & Arjun",
      rating: 5,
      review: `WeddingCraft Pro made our dream wedding come true! From the initial planning to the final execution, everything was perfect.\n\nThe team's attention to detail and professionalism exceeded our expectations. Highly recommended!`,
      date: "2024-01-15",
      status: "Approved",
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400",
      weddingType: "Traditional South Indian"
    },
    {
      id: 2,
      name: "Sneha & Vikram",
      rating: 5,
      review: `Absolutely stunning beachside wedding! The team handled everything flawlessly and our guests are still talking about how beautiful everything was.\n\nThank you for making our special day unforgettable.`,
      date: "2024-01-12",
      status: "Approved",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400",
      weddingType: "Beachside Wedding"
    },
    {
      id: 3,
      name: "Kavya & Rohit",
      rating: 4,
      review: `Great service and beautiful decorations. The royal theme was executed perfectly and all our requirements were met professionally.\n\nWould definitely recommend to other couples.`,
      date: "2024-01-10",
      status: "Pending",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
      weddingType: "Royal Wedding"
    },
    {
      id: 4,
      name: "Ananya & Karthik",
      rating: 5,
      review: `Outstanding service from start to finish! The team was incredibly responsive and made sure every detail was perfect for our special day.`,
      date: "2024-01-08",
      status: "Approved",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400",
      weddingType: "Modern Reception"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    review: '',
    image: '',
    weddingType: '',
    status: 'Pending'
  });

  const statuses = ['All', 'Approved', 'Pending', 'Rejected'];
  const weddingTypes = ['Traditional South Indian', 'Beachside Wedding', 'Royal Wedding', 'Modern Reception', 'Destination Wedding'];

  const filteredReviews = filterStatus === 'All' 
    ? reviews 
    : reviews.filter(review => review.status === filterStatus);

  const handleAddReview = () => {
    setEditingReview(null);
    setFormData({
      name: '',
      rating: 5,
      review: '',
      image: '',
      weddingType: '',
      status: 'Pending'
    });
    setShowForm(true);
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setFormData({
      name: review.name,
      rating: review.rating,
      review: review.review,
      image: review.image,
      weddingType: review.weddingType,
      status: review.status
    });
    setShowForm(true);
  };

  const handleDeleteReview = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(review => review.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status: newStatus } : review
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const reviewData = {
      ...formData,
      id: editingReview ? editingReview.id : Math.max(...reviews.map(r => r.id)) + 1,
      date: editingReview ? editingReview.date : new Date().toISOString().split('T')[0]
    };

    if (editingReview) {
      setReviews(reviews.map(review => 
        review.id === editingReview.id ? reviewData : review
      ));
    } else {
      setReviews([reviewData, ...reviews]);
    }

    setShowForm(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? 'text-warning fill-current' : 'text-text-secondary/30'}
      />
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-success/10 text-success';
      case 'Pending':
        return 'bg-warning/10 text-warning';
      case 'Rejected':
        return 'bg-error/10 text-error';
      default:
        return 'bg-text-secondary/10 text-text-secondary';
    }
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            {editingReview ? 'Edit Review' : 'Add New Review'}
          </h3>
          <Button
            variant="ghost"
            iconName="X"
            onClick={() => setShowForm(false)}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Client Name *
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter client name (e.g., Priya & Arjun)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Rating *
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  {[5, 4, 3, 2, 1].map(rating => (
                    <option key={rating} value={rating}>
                      {rating} Star{rating !== 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Wedding Type
                </label>
                <select
                  value={formData.weddingType}
                  onChange={(e) => setFormData({...formData, weddingType: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select wedding type</option>
                  {weddingTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {statuses.filter(status => status !== 'All').map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Wedding Photo URL
                </label>
                <Input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="Enter wedding photo URL"
                />
                {formData.image && (
                  <div className="mt-2">
                    <Image
                      src={formData.image}
                      alt="Wedding preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Rating Preview
                </label>
                <div className="flex items-center space-x-1">
                  {renderStars(formData.rating)}
                  <span className="ml-2 text-sm text-text-secondary">
                    {formData.rating} out of 5 stars
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Review Text *
            </label>
            <textarea
              value={formData.review}
              onChange={(e) => setFormData({...formData, review: e.target.value})}
              placeholder="Enter the client's review"
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              required
            />
          </div>

          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-border-light">
            <Button
              variant="ghost"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
            >
              {editingReview ? 'Update Review' : 'Add Review'}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">Reviews Management</h3>
          <p className="text-sm text-text-secondary mt-1">Manage customer testimonials and reviews</p>
        </div>
        <Button
          variant="primary"
          iconName="Plus"
          iconPosition="left"
          onClick={handleAddReview}
        >
          Add Review
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        
        <div className="text-sm text-text-secondary">
          {filteredReviews.length} review{filteredReviews.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-surface rounded-lg border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <Image
                  src={review.image}
                  alt={`${review.name} wedding`}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-medium text-text-primary">{review.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-text-secondary">
                      {new Date(review.date).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                  {review.weddingType && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent text-accent-foreground mt-2">
                      {review.weddingType}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                  {review.status}
                </span>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    iconName="Edit"
                    onClick={() => handleEditReview(review)}
                    className="text-text-secondary hover:text-primary"
                  />
                  <Button
                    variant="ghost"
                    iconName="Trash2"
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-text-secondary hover:text-error"
                  />
                </div>
              </div>
            </div>

            <p className="text-text-secondary leading-relaxed whitespace-pre-line">
              {review.review}
            </p>

            {review.status === 'Pending' && (
              <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border-light">
                <Button
                  variant="success"
                  iconName="Check"
                  iconPosition="left"
                  onClick={() => handleStatusChange(review.id, 'Approved')}
                  className="text-sm"
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  iconName="X"
                  iconPosition="left"
                  onClick={() => handleStatusChange(review.id, 'Rejected')}
                  className="text-sm"
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Star" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No reviews found</h3>
          <p className="text-text-secondary mb-4">
            {filterStatus === 'All' ?'Start building your testimonials by adding your first review'
              : `No ${filterStatus.toLowerCase()} reviews found`
            }
          </p>
          <Button
            variant="primary"
            iconName="Plus"
            iconPosition="left"
            onClick={handleAddReview}
          >
            Add Review
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;