import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'enquiry',
      title: 'New enquiry received',
      description: 'Priya & Arjun submitted wedding planning enquiry',
      timestamp: '2 hours ago',
      icon: 'Mail',
      color: 'text-info'
    },
    {
      id: 2,
      type: 'booking',
      title: 'Booking confirmed',
      description: 'Sneha & Vikram confirmed their wedding package',
      timestamp: '4 hours ago',
      icon: 'CheckCircle',
      color: 'text-success'
    },
    {
      id: 3,
      type: 'gallery',
      title: 'Gallery updated',
      description: 'Added 15 new photos to Royal Wedding collection',
      timestamp: '6 hours ago',
      icon: 'Image',
      color: 'text-primary'
    },
    {
      id: 4,
      type: 'review',
      title: 'New review posted',
      description: 'Kavya & Rohit left a 5-star review',
      timestamp: '8 hours ago',
      icon: 'Star',
      color: 'text-warning'
    },
    {
      id: 5,
      type: 'payment',
      title: 'Payment received',
      description: 'Advance payment of ₹2,00,000 from Ananya & Karthik',
      timestamp: '1 day ago',
      icon: 'CreditCard',
      color: 'text-success'
    },
    {
      id: 6,
      type: 'system',
      title: 'System backup completed',
      description: 'Daily backup completed successfully',
      timestamp: '1 day ago',
      icon: 'Database',
      color: 'text-text-secondary'
    }
  ];

  const getActivityIcon = (activity) => {
    return (
      <div className={`w-8 h-8 rounded-full bg-surface flex items-center justify-center ${activity.color}`}>
        <Icon name={activity.icon} size={16} />
      </div>
    );
  };

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">Recent Activity</h3>
        <p className="text-sm text-text-secondary">Latest updates and system activities</p>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex items-start space-x-3">
            {getActivityIcon(activity)}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-text-primary">
                  {activity.title}
                </h4>
                <span className="text-xs text-text-secondary whitespace-nowrap ml-2">
                  {activity.timestamp}
                </span>
              </div>
              <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                {activity.description}
              </p>
            </div>
            
            {index < activities.length - 1 && (
              <div className="absolute left-4 mt-8 w-px h-4 bg-border-light"></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border-light text-center">
        <button
          onClick={() => console.log('View all activities')}
          className="text-sm text-primary hover:text-secondary transition-colors font-medium"
        >
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;