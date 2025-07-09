import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../auth/AuthModal';

const AdminProtectedRoute = ({ children }) => {
  const { user, userProfile, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  // For development: Show all content but with auth prompts
  const isAuthenticated = user && userProfile;
  const isAuthorized = isAuthenticated && ['admin', 'manager', 'editor'].includes(userProfile?.role);

  return (
    <>
      {/* TODO: Before production deployment
          1. Wrap protected content with authentication check
          2. Remove preview mode fallbacks
          3. Test all authentication flows
          4. Verify role-based access controls */}
      
      {isAuthenticated && isAuthorized ? (
        // Authenticated user with proper role
        children
      ) : (
        // Development Preview Mode - Show content with auth prompts
        <div className="min-h-screen bg-background">
          {/* Preview Mode Banner */}
          <div className="bg-accent/10 border-b border-accent/20 p-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-accent-foreground text-sm font-bold">!</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">Preview Mode</h3>
                    <p className="text-sm text-text-secondary">
                      This is a development preview. Authentication is required for full access.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>

          {/* Content with preview overlay */}
          <div className="relative">
            {children}
            
            {/* Overlay for non-authenticated users */}
            {!isAuthenticated && (
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
                    onClick={() => setShowAuthModal(true)}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Sign In to Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          // Refresh the page to update the auth state
          window.location.reload();
        }}
      />
    </>
  );
};

export default AdminProtectedRoute;