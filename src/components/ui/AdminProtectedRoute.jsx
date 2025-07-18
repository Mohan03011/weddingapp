import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const AdminProtectedRoute = ({ children, requiredRoles = ['admin'] }) => {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      // Check if user is authenticated
      if (!user) {
        toast.error('Please log in to access this page');
        navigate('/admin-login', { state: { from: location.pathname } });
        return;
      }

      // Check if user has required role
      if (userProfile && !requiredRoles.includes(userProfile.role)) {
        toast.error('You do not have permission to access this page');
        navigate('/');
      }
    }
  }, [user, userProfile, loading, navigate, location, requiredRoles]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Check if user is authenticated and has required role
  const isAuthenticated = !!user;
  const isAuthorized = isAuthenticated && userProfile && requiredRoles.includes(userProfile.role);

  if (!isAuthenticated || !isAuthorized) {
    return (
      <div className="relative">
        {/* Overlay for non-authenticated users */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-bold text-text-primary mb-2">
              Authentication Required
            </h3>
            <p className="text-text-secondary mb-6">
              Please sign in to access the admin content management system.
            </p>
            <button
              onClick={() => navigate('/admin-login', { state: { from: location.pathname } })}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Sign In to Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminProtectedRoute;