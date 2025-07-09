import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const AdminLogin = () => {
  const { user, signIn, authError, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Clear error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearError();

    try {
      const result = await signIn(formData.email, formData.password);
      
      if (result.success) {
        // Redirect will happen automatically via AuthContext
      }
    } catch (error) {
      console.log('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Shield" size={32} color="#FEFCF8" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
            Admin Login
          </h1>
          <p className="text-text-secondary">
            Access your WeddingCraft Pro dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-surface rounded-2xl shadow-sm border border-border p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                autoComplete="email"
                className="w-full"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
                </button>
              </div>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="bg-error/10 border border-error/20 rounded-lg p-4 flex items-start space-x-3">
                <Icon name="AlertCircle" size={20} className="text-error mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-error mb-1">Login Failed</p>
                  <p className="text-sm text-error/80">{authError}</p>
                </div>
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              disabled={loading || !formData.email || !formData.password}
              className="w-full"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={18} className="mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-border-light">
            <div className="bg-accent/10 rounded-lg p-4">
              <h3 className="text-sm font-medium text-text-primary mb-2 flex items-center">
                <Icon name="Info" size={16} className="mr-2" />
                Demo Credentials
              </h3>
              <div className="text-xs text-text-secondary space-y-1">
                <p><strong>Admin:</strong> admin@weddingcraft.com / admin123</p>
                <p><strong>Manager:</strong> manager@weddingcraft.com / manager123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-text-secondary">
            © 2024 WeddingCraft Pro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;