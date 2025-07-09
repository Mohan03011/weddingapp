import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Icon from '../AppIcon';

const SignupForm = ({ onSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: 'editor'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();

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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const result = await signUp(formData.email, formData.password, {
        full_name: formData.fullName,
        role: formData.role
      });
      
      if (result.success) {
        onSuccess?.();
      } else {
        setError(result.error || 'Signup failed. Please try again.');
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
            <Icon name="UserPlus" size={24} color="#FEFCF8" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-text-primary">
            Create Account
          </h2>
          <p className="text-text-secondary mt-2">
            Sign up to get access to the admin dashboard
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
            <label htmlFor="fullName" className="block text-sm font-medium text-text-primary mb-2">
              Full Name
            </label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              disabled={loading}
              required
              className="w-full"
            />
          </div>

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
            <label htmlFor="role" className="block text-sm font-medium text-text-primary mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
              required
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="editor">Editor</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
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
              placeholder="Create a password"
              disabled={loading}
              required
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
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
                <span>Creating account...</span>
              </div>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-text-secondary text-sm">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-primary hover:text-primary/80 font-medium"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;