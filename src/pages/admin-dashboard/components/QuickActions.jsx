import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      title: "Add New Service",
      description: "Create a new wedding service package",
      icon: "Plus",
      color: "primary",
      action: () => console.log('Add new service')
    },
    {
      title: "Upload Gallery",
      description: "Add photos to wedding gallery",
      icon: "Upload",
      color: "secondary",
      action: () => console.log('Upload gallery')
    },
    {
      title: "Respond to Reviews",
      description: "Reply to client testimonials",
      icon: "MessageSquare",
      color: "success",
      action: () => console.log('Respond to reviews')
    },
    {
      title: "Export Reports",
      description: "Download business analytics",
      icon: "Download",
      color: "info",
      action: () => console.log('Export reports')
    }
  ];

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">Quick Actions</h3>
        <p className="text-sm text-text-secondary">Frequently used administrative tasks</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions.map((action, index) => (
          <div
            key={index}
            className="p-4 border border-border-light rounded-lg hover:border-primary hover:shadow-sm transition-all duration-200 cursor-pointer group"
            onClick={action.action}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${action.color} text-${action.color}-foreground group-hover:scale-105 transition-transform`}>
                <Button
                  variant="ghost"
                  iconName={action.icon}
                  onClick={action.action}
                  className="p-0 w-6 h-6 text-current hover:bg-transparent"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
                  {action.title}
                </h4>
                <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                  {action.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;