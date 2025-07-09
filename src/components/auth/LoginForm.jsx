import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Icon from '../AppIcon';

const LoginForm = ({ onSuccess, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn(formData.email, formData.password);
      
      if (result.success) {
        onSuccess?.();
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-background rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="Lock" size={24} color="#FEFCF8" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-text-primary">
            Admin Login
          </h2>
          <p className="text-text-secondary mt-2">
            Sign in to access the admin dashboard
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <span className="text-sm text-error">{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={loading}
              required
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={loading}
              required
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-text-secondary text-sm">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-primary hover:text-primary/80 font-medium"
            >
              Sign up here
            </button>
          </p>
        </div>

        <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
          <p className="text-xs text-text-secondary text-center">
            <strong>Demo Credentials:</strong><br />
            Email: admin@weddingcraft.com<br />
            Password: admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;