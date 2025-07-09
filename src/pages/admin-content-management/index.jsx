import React, { useState } from 'react';
import ProtectedRoute from '../../components/ui/ProtectedRoute';
import AdminSidebar from '../../components/ui/AdminSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ServicesTab from './components/ServicesTab';
import GalleryTab from './components/GalleryTab';
import ReviewsTab from './components/ReviewsTab';
import SiteSettingsTab from './components/SiteSettingsTab';
import { useAuth } from '../../contexts/AuthContext';

const AdminContentManagement = () => {
  const { signOut, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('services');

  const tabs = [
    {
      id: 'services',
      label: 'Services',
      icon: 'Package',
      description: 'Manage wedding packages and services'
    },
    {
      id: 'gallery',
      label: 'Gallery',
      icon: 'Image',
      description: 'Upload and organize wedding photos'
    },
    {
      id: 'reviews',
      label: 'Reviews',
      icon: 'Star',
      description: 'Manage customer testimonials'
    },
    {
      id: 'settings',
      label: 'Site Settings',
      icon: 'Settings',
      description: 'Configure website content and settings'
    }
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'services':
        return <ServicesTab />;
      case 'gallery':
        return <GalleryTab />;
      case 'reviews':
        return <ReviewsTab />;
      case 'settings':
        return <SiteSettingsTab />;
      default:
        return <ServicesTab />;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <AdminSidebar />
        
        <main className="lg:ml-64 transition-all duration-300">
          <BreadcrumbTrail />
          
          <div className="px-6 pb-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={20} color="#FEFCF8" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-heading font-bold text-text-primary">
                      Content Management
                    </h1>
                    <p className="text-text-secondary">
                      Manage your website content, services, and media
                    </p>
                  </div>
                </div>
                
                {/* User Info & Sign Out */}
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-text-primary">
                      {userProfile?.full_name || 'Admin User'}
                    </p>
                    <p className="text-xs text-text-secondary capitalize">
                      {userProfile?.role || 'admin'}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    iconName="LogOut"
                    iconPosition="left"
                    onClick={handleSignOut}
                    className="text-sm"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>

            {/* Authentication Status Banner */}
            <div className="mb-6 bg-success/10 border border-success/20 rounded-lg p-4 flex items-center space-x-3">
              <Icon name="Shield" size={20} className="text-success" />
              <div>
                <p className="text-sm font-medium text-success">Authenticated Access</p>
                <p className="text-xs text-success/80">
                  You are logged in as {userProfile?.email} with {userProfile?.role} privileges
                </p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mb-8">
              <div className="border-b border-border-light">
                <nav className="flex space-x-8 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-primary hover:border-border'
                      }`}
                    >
                      <Icon name={tab.icon} size={18} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
              
              {/* Tab Description */}
              <div className="mt-4">
                <p className="text-sm text-text-secondary">
                  {tabs.find(tab => tab.id === activeTab)?.description}
                </p>
              </div>
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in">
              {renderTabContent()}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default AdminContentManagement;