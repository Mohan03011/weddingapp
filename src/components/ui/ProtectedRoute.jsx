import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';

const ProtectedRoute = ({ children, requireRole = null }) => {
  const { user, userProfile, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  // Check if user profile is required and loaded
  if (!userProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="AlertCircle" size={32} className="text-error" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Profile Not Found
          </h2>
          <p className="text-text-secondary mb-4">
            Unable to load user profile. Please try logging in again.
          </p>
          <button
            onClick={() => window.location.href = '/admin-login'}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  // Check role requirements
  if (requireRole && userProfile.role !== requireRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Shield" size={32} className="text-warning" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Access Denied
          </h2>
          <p className="text-text-secondary mb-4">
            You don't have permission to access this page. Required role: {requireRole}
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;