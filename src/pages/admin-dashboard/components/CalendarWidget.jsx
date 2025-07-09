import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const upcomingEvents = [
    {
      id: 1,
      title: "Priya & Arjun - Consultation",
      date: "2024-01-15",
      time: "10:00 AM",
      type: "consultation",
      location: "Office"
    },
    {
      id: 2,
      title: "Sneha & Vikram - Wedding",
      date: "2024-01-18",
      time: "6:00 PM",
      type: "wedding",
      location: "Leela Palace"
    },
    {
      id: 3,
      title: "Kavya & Rohit - Venue Visit",
      date: "2024-01-20",
      time: "2:00 PM",
      type: "venue",
      location: "ITC Windsor"
    },
    {
      id: 4,
      title: "Ananya & Karthik - Final Meeting",
      date: "2024-01-22",
      time: "11:00 AM",
      type: "meeting",
      location: "Client Location"
    }
  ];

  const getEventTypeColor = (type) => {
    const colors = {
      consultation: 'bg-info text-info-foreground',
      wedding: 'bg-success text-success-foreground',
      venue: 'bg-warning text-warning-foreground',
      meeting: 'bg-primary text-primary-foreground'
    };
    return colors[type] || colors.meeting;
  };

  const getEventIcon = (type) => {
    const icons = {
      consultation: 'Users',
      wedding: 'Heart',
      venue: 'MapPin',
      meeting: 'Calendar'
    };
    return icons[type] || icons.meeting;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short' 
      });
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">Upcoming Events</h3>
          <p className="text-sm text-text-secondary">Your schedule for this week</p>
        </div>
        <Button
          variant="ghost"
          iconName="Calendar"
          onClick={() => console.log('Open full calendar')}
          className="p-2"
          title="View Full Calendar"
        />
      </div>

      <div className="space-y-4">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-surface transition-colors cursor-pointer"
            onClick={() => console.log('View event details', event.id)}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getEventTypeColor(event.type)}`}>
              <Icon name={getEventIcon(event.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-text-primary truncate">
                {event.title}
              </h4>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} className="text-text-secondary" />
                  <span className="text-xs text-text-secondary">{event.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={12} className="text-text-secondary" />
                  <span className="text-xs text-text-secondary truncate">{event.location}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <span className="text-xs font-medium text-primary">
                {formatDate(event.date)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border-light">
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
          fullWidth
          onClick={() => console.log('Add new event')}
          className="text-sm"
        >
          Schedule New Event
        </Button>
      </div>
    </div>
  );
};

export default CalendarWidget;