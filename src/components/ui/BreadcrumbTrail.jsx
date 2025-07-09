import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbMap = {
    'home-page': { label: 'Home', icon: 'Home' },
    'gallery': { label: 'Gallery', icon: 'Image' },
    'contact-enquiry': { label: 'Contact', icon: 'MessageCircle' },
    'client-reviews-testimonials': { label: 'Reviews', icon: 'Star' },
    'admin-dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    'admin-content-management': { label: 'Content Management', icon: 'FileText' },
  };

  // Don't show breadcrumbs on home page or if no pathnames
  if (pathnames.length === 0 || (pathnames.length === 1 && pathnames[0] === 'home-page')) {
    return null;
  }

  const isAdminRoute = pathnames.some(path => path.startsWith('admin'));

  return (
    <nav 
      className={`py-4 ${isAdminRoute ? 'px-6' : 'container-custom'}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2 text-sm">
        {/* Home/Dashboard Link */}
        <li>
          <Link
            to={isAdminRoute ? '/admin-dashboard' : '/home-page'}
            className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors"
          >
            <Icon 
              name={isAdminRoute ? 'LayoutDashboard' : 'Home'} 
              size={16} 
            />
            <span className="font-medium">
              {isAdminRoute ? 'Dashboard' : 'Home'}
            </span>
          </Link>
        </li>

        {/* Current Path Breadcrumbs */}
        {pathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const breadcrumbInfo = breadcrumbMap[pathname];

          // Skip if it's the home page or dashboard (already shown above)
          if (pathname === 'home-page' || (pathname === 'admin-dashboard' && index === 0)) {
            return null;
          }

          return (
            <li key={pathname} className="flex items-center space-x-2">
              <Icon name="ChevronRight" size={16} className="text-text-secondary/50" />
              
              {isLast ? (
                <span className="flex items-center space-x-1 text-primary font-medium">
                  {breadcrumbInfo?.icon && (
                    <Icon name={breadcrumbInfo.icon} size={16} />
                  )}
                  <span>{breadcrumbInfo?.label || pathname}</span>
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors"
                >
                  {breadcrumbInfo?.icon && (
                    <Icon name={breadcrumbInfo.icon} size={16} />
                  )}
                  <span className="font-medium">
                    {breadcrumbInfo?.label || pathname}
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbTrail;