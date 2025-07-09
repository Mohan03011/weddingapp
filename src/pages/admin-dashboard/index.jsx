import React from 'react';
import AdminSidebar from '../../components/ui/AdminSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import MetricsCard from './components/MetricsCard';
import EnquiriesTable from './components/EnquiriesTable';
import QuickActions from './components/QuickActions';
import RevenueChart from './components/RevenueChart';
import CalendarWidget from './components/CalendarWidget';
import ActivityFeed from './components/ActivityFeed';

const AdminDashboard = () => {
  const metricsData = [
    {
      title: "New Enquiries",
      value: "24",
      change: "+12% from last month",
      changeType: "positive",
      icon: "Mail",
      color: "primary"
    },
    {
      title: "Monthly Revenue",
      value: "₹14.5L",
      change: "+8% from last month",
      changeType: "positive",
      icon: "TrendingUp",
      color: "success"
    },
    {
      title: "Active Bookings",
      value: "18",
      change: "+3 this week",
      changeType: "positive",
      icon: "Calendar",
      color: "warning"
    },
    {
      title: "Website Traffic",
      value: "2,847",
      change: "-5% from last month",
      changeType: "negative",
      icon: "Users",
      color: "info"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="lg:ml-64 transition-all duration-300">
        <BreadcrumbTrail />
        
        <div className="px-6 pb-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
              Dashboard Overview
            </h1>
            <p className="text-text-secondary">
              Welcome back! Here's what's happening with your wedding planning business.
            </p>
          </div>

          {/* Metrics Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {metricsData.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
                color={metric.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Revenue Chart - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <RevenueChart />
            </div>
            
            {/* Quick Actions */}
            <div>
              <QuickActions />
            </div>
          </div>

          {/* Secondary Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Calendar Widget */}
            <div>
              <CalendarWidget />
            </div>
            
            {/* Activity Feed */}
            <div>
              <ActivityFeed />
            </div>
            
            {/* Additional space for future widgets */}
            <div className="hidden xl:block">
              <div className="card p-6 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                    More Insights Coming Soon
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Additional analytics and reporting features will be available here.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enquiries Table - Full Width */}
          <div className="mb-8">
            <EnquiriesTable />
          </div>

          {/* Footer Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-text-secondary">Client Satisfaction</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-success mb-2">156</div>
              <div className="text-sm text-text-secondary">Weddings Completed</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-warning mb-2">4.9</div>
              <div className="text-sm text-text-secondary">Average Rating</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;