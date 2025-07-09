import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const adminNavigationItems = [
    {
      label: 'Dashboard',
      path: '/admin-dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview & Analytics'
    },
    {
      label: 'Content Management',
      path: '/admin-content-management',
      icon: 'FileText',
      description: 'Manage Gallery & Content'
    },
  ];

  const quickActions = [
    { label: 'View Site', icon: 'ExternalLink', action: () => window.open('/home-page', '_blank') },
    { label: 'New Enquiry', icon: 'Plus', action: () => console.log('New enquiry') },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-300 p-2 bg-surface rounded-lg shadow-md hover:shadow-lg transition-shadow"
        aria-label="Toggle admin menu"
      >
        <Icon name="Menu" size={20} />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-text-primary/50 z-200"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-surface border-r border-border z-200 transition-all duration-300
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border-light">
            {!isCollapsed && (
              <Link to="/admin-dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Icon name="Heart" size={16} color="#FEFCF8" />
                </div>
                <div>
                  <h2 className="text-sm font-heading font-semibold text-primary">WeddingCraft</h2>
                  <p className="text-xs text-text-secondary font-caption">Admin Panel</p>
                </div>
              </Link>
            )}
            
            <button
              onClick={toggleCollapse}
              className="hidden lg:flex p-1.5 rounded-md hover:bg-background transition-colors"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <div className="space-y-1">
              {!isCollapsed && (
                <p className="text-xs font-caption text-text-secondary uppercase tracking-wider px-2 py-1">
                  Main Menu
                </p>
              )}
              
              {adminNavigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                    ${location.pathname === item.path
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-text-secondary hover:bg-background hover:text-primary'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={location.pathname === item.path ? 'text-primary-foreground' : ''}
                  />
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.label}</p>
                      <p className="text-xs opacity-75 truncate">{item.description}</p>
                    </div>
                  )}
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-border-light">
              {!isCollapsed && (
                <p className="text-xs font-caption text-text-secondary uppercase tracking-wider px-2 py-1 mb-2">
                  Quick Actions
                </p>
              )}
              
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors
                    text-text-secondary hover:bg-background hover:text-primary
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                  title={isCollapsed ? action.label : ''}
                >
                  <Icon name={action.icon} size={20} />
                  {!isCollapsed && <span className="font-medium">{action.label}</span>}
                </button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border-light">
            {!isCollapsed ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 px-3 py-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="#FEFCF8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">Admin User</p>
                    <p className="text-xs text-text-secondary truncate">admin@weddingcraft.com</p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  iconName="LogOut"
                  iconPosition="left"
                  fullWidth
                  onClick={() => console.log('Logout')}
                  className="text-sm justify-start"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <button
                onClick={() => console.log('Logout')}
                className="w-full p-2 rounded-lg hover:bg-background transition-colors"
                title="Logout"
              >
                <Icon name="LogOut" size={20} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Content Spacer */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`} />
    </>
  );
};

export default AdminSidebar;