import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Icon from '../AppIcon';

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');

  if (!isOpen) return null;

  const handleSuccess = () => {
    onSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-text-primary/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-border-light">
          <h2 className="text-xl font-heading font-bold text-text-primary">
            Admin Authentication
          </h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'login' ? (
            <LoginForm
              onSuccess={handleSuccess}
              onSwitchToSignup={() => setActiveTab('signup')}
            />
          ) : (
            <SignupForm
              onSuccess={handleSuccess}
              onSwitchToLogin={() => setActiveTab('login')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;