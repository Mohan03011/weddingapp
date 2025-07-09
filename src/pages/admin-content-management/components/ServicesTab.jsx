import React, { useState } from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ServicesTab = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      title: "Royal Wedding Package",
      category: "Premium",
      price: 500000,
      status: "Active",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
      description: `Complete royal wedding experience with traditional decorations, premium catering, and luxury arrangements.\n\nIncludes mandap decoration, flower arrangements, photography, and coordination services.`,
      features: ["Mandap Decoration", "Photography", "Catering", "Coordination"]
    },
    {
      id: 2,
      title: "Beachside Wedding",
      category: "Destination",
      price: 750000,
      status: "Active",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400",
      description: `Romantic beachside wedding setup with ocean views and sunset ceremonies.\n\nPerfect for couples seeking a unique destination wedding experience.`,
      features: ["Beach Setup", "Sunset Ceremony", "Coastal Catering", "Photography"]
    },
    {
      id: 3,
      title: "Traditional South Indian",
      category: "Cultural",
      price: 350000,
      status: "Draft",
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400",
      description: `Authentic South Indian wedding with traditional rituals and cultural elements.\n\nIncludes traditional decorations, authentic cuisine, and ritual coordination.`,
      features: ["Traditional Rituals", "Cultural Decorations", "Authentic Cuisine", "Priest Coordination"]
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
    features: '',
    image: '',
    status: 'Active'
  });

  const categories = ['Premium', 'Destination', 'Cultural', 'Budget', 'Luxury'];
  const statuses = ['Active', 'Draft', 'Inactive'];

  const handleAddService = () => {
    setEditingService(null);
    setFormData({
      title: '',
      category: '',
      price: '',
      description: '',
      features: '',
      image: '',
      status: 'Active'
    });
    setShowForm(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      category: service.category,
      price: service.price.toString(),
      description: service.description,
      features: service.features.join(', '),
      image: service.image,
      status: service.status
    });
    setShowForm(true);
  };

  const handleDeleteService = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== id));
    }
  };

  const handleDuplicateService = (service) => {
    const newService = {
      ...service,
      id: Math.max(...services.map(s => s.id)) + 1,
      title: `${service.title} (Copy)`,
      status: 'Draft'
    };
    setServices([...services, newService]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const serviceData = {
      ...formData,
      price: parseInt(formData.price),
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
      id: editingService ? editingService.id : Math.max(...services.map(s => s.id)) + 1
    };

    if (editingService) {
      setServices(services.map(service => 
        service.id === editingService.id ? serviceData : service
      ));
    } else {
      setServices([...services, serviceData]);
    }

    setShowForm(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            {editingService ? 'Edit Service' : 'Add New Service'}
          </h3>
          <Button
            variant="ghost"
            iconName="X"
            onClick={() => setShowForm(false)}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Service Title *
                </label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter service title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Price (₹) *
                </label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="Enter price in rupees"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Service Image URL
                </label>
                <Input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="Enter image URL"
                />
                {formData.image && (
                  <div className="mt-2">
                    <Image
                      src={formData.image}
                      alt="Service preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Features (comma-separated)
                </label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({...formData, features: e.target.value})}
                  placeholder="Feature 1, Feature 2, Feature 3"
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Enter detailed service description"
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-border-light">
            <Button
              variant="ghost"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
            >
              {editingService ? 'Update Service' : 'Add Service'}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">Services Management</h3>
          <p className="text-sm text-text-secondary mt-1">Manage your wedding service packages</p>
        </div>
        <Button
          variant="primary"
          iconName="Plus"
          iconPosition="left"
          onClick={handleAddService}
        >
          Add Service
        </Button>
      </div>

      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b border-border-light">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-primary">Service</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-primary">Category</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-primary">Price</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-primary">Status</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-text-primary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-background transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={service.image}
                        alt={service.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-text-primary">{service.title}</p>
                        <p className="text-sm text-text-secondary">
                          {service.features.slice(0, 2).join(', ')}
                          {service.features.length > 2 && '...'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-primary font-medium">
                    {formatPrice(service.price)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      service.status === 'Active' ?'bg-success/10 text-success' 
                        : service.status === 'Draft' ?'bg-warning/10 text-warning' :'bg-error/10 text-error'
                    }`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        iconName="Edit"
                        onClick={() => handleEditService(service)}
                        className="text-text-secondary hover:text-primary"
                      />
                      <Button
                        variant="ghost"
                        iconName="Copy"
                        onClick={() => handleDuplicateService(service)}
                        className="text-text-secondary hover:text-primary"
                      />
                      <Button
                        variant="ghost"
                        iconName="Trash2"
                        onClick={() => handleDeleteService(service.id)}
                        className="text-text-secondary hover:text-error"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServicesTab;