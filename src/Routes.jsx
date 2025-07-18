import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import AdminProtectedRoute from "components/ui/AdminProtectedRoute";
// Add your imports here
import HomePage from "pages/home-page";
import Gallery from "pages/gallery";
import ContactEnquiry from "pages/contact-enquiry";
import AdminDashboard from "pages/admin-dashboard";
import ClientReviewsTestimonials from "pages/client-reviews-testimonials";
import AdminContentManagement from "pages/admin-content-management";
import AdminLogin from "pages/admin-login";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact-enquiry" element={<ContactEnquiry />} />
          <Route path="/contact" element={<ContactEnquiry />} />
          <Route path="/client-reviews-testimonials" element={<ClientReviewsTestimonials />} />
          
          {/* Admin Authentication */}
          <Route path="/admin-login" element={<AdminLogin />} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <AdminProtectedRoute requiredRoles={['admin', 'manager']}>
              <Navigate to="/admin/dashboard" replace />
            </AdminProtectedRoute>
          } />
          
          <Route path="/admin/dashboard" element={
            <AdminProtectedRoute requiredRoles={['admin', 'manager']}>
              <AdminDashboard />
            </AdminProtectedRoute>
          } />
          
          <Route path="/admin/content" element={
            <AdminProtectedRoute requiredRoles={['admin', 'editor']}>
              <AdminContentManagement />
            </AdminProtectedRoute>
          } />
          
          {/* 404 - Not Found */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;