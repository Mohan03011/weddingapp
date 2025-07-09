import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RevenueChart = () => {
  const revenueData = [
    { month: 'Jan', revenue: 450000, bookings: 8 },
    { month: 'Feb', revenue: 680000, bookings: 12 },
    { month: 'Mar', revenue: 920000, bookings: 15 },
    { month: 'Apr', revenue: 750000, bookings: 11 },
    { month: 'May', revenue: 1200000, bookings: 18 },
    { month: 'Jun', revenue: 980000, bookings: 14 },
    { month: 'Jul', revenue: 1100000, bookings: 16 },
    { month: 'Aug', revenue: 850000, bookings: 13 },
    { month: 'Sep', revenue: 1350000, bookings: 20 },
    { month: 'Oct', revenue: 1150000, bookings: 17 },
    { month: 'Nov', revenue: 1450000, bookings: 22 },
    { month: 'Dec', revenue: 1680000, bookings: 25 }
  ];

  const formatCurrency = (value) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-text-primary mb-2">{`${label} 2024`}</p>
          <div className="space-y-1">
            <p className="text-sm text-primary">
              Revenue: {formatCurrency(payload[0].value)}
            </p>
            <p className="text-sm text-text-secondary">
              Bookings: {payload[0].payload.bookings}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">Monthly Revenue</h3>
        <p className="text-sm text-text-secondary">Revenue trends for 2024</p>
      </div>

      <div className="h-80" aria-label="Monthly Revenue Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              tickFormatter={formatCurrency}
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="revenue" 
              fill="var(--color-primary)"
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80 transition-opacity"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-border-light">
        <div className="text-center">
          <p className="text-2xl font-bold text-success">₹1.2Cr</p>
          <p className="text-xs text-text-secondary">Total Revenue</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">191</p>
          <p className="text-xs text-text-secondary">Total Bookings</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-warning">₹6.3L</p>
          <p className="text-xs text-text-secondary">Avg. Booking</p>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;