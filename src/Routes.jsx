import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
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
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact-enquiry" element={<ContactEnquiry />} />
        <Route path="/contact" element={<ContactEnquiry />} />
        <Route path="/admin-dashboard" element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        } />
        <Route path="/client-reviews-testimonials" element={<ClientReviewsTestimonials />} />
        <Route path="/admin-content-management" element={
          <AdminProtectedRoute>
            <AdminContentManagement />
          </AdminProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;