import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import contentService from '../../../utils/contentService';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GalleryTab = () => {
  const { user } = useAuth();
  const [contentItems, setContentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'decorations',
    content_type: 'photo',
    alt_text: '',
    file: null,
    file_url: ''
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'decorations', label: 'Decorations' },
    { value: 'ceremonies', label: 'Ceremonies' },
    { value: 'couples', label: 'Couples' },
    { value: 'reception', label: 'Reception' },
    { value: 'catering', label: 'Catering' },
    { value: 'mehendi', label: 'Mehendi' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'prewedding', label: 'Pre-Wedding' }
  ];

  const contentTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'photo', label: 'Photos' },
    { value: 'video', label: 'Videos' }
  ];

  useEffect(() => {
    loadContentItems();
  }, []);

  const loadContentItems = async () => {
    try {
      setLoading(true);
      setError('');
      
      const result = await contentService.getContentItems();
      if (result.success) {
        setContentItems(result.data);
      } else {
        setError(result.error || 'Failed to load content items');
      }
    } catch (error) {
      setError('Failed to load content items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = contentItems.filter(item => {
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesType = filterType === 'all' || item.content_type === filterType;
    return matchesCategory && matchesType;
  });

  const handleItemSelect = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  const handleDeleteSelected = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedItems.length} selected items?`)) {
      return;
    }

    try {
      setError('');
      const result = await contentService.deleteMultipleContentItems(selectedItems);
      
      if (result.success) {
        setContentItems(contentItems.filter(item => !selectedItems.includes(item.id)));
        setSelectedItems([]);
      } else {
        setError(result.error || 'Failed to delete items');
      }
    } catch (error) {
      setError('Failed to delete items. Please try again.');
    }
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      category: 'decorations',
      content_type: 'photo',
      alt_text: '',
      file: null,
      file_url: ''
    });
    setShowUploadForm(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      category: item.category,
      content_type: item.content_type,
      alt_text: item.alt_text || '',
      file: null,
      file_url: item.file_url
    });
    setShowUploadForm(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file,
        file_url: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError('');

    try {
      let fileUrl = formData.file_url;
      
      // Upload file if a new file is selected
      if (formData.file) {
        const uploadResult = await contentService.uploadFile(
          formData.file,
          'content',
          `${formData.content_type}s/`
        );
        
        if (!uploadResult.success) {
          setError(uploadResult.error || 'Failed to upload file');
          return;
        }
        
        fileUrl = uploadResult.data.publicUrl;
      }

      const itemData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        content_type: formData.content_type,
        alt_text: formData.alt_text,
        file_url: fileUrl,
        created_by: user?.id
      };

      if (editingItem) {
        // Update existing item
        const result = await contentService.updateContentItem(editingItem.id, itemData);
        if (result.success) {
          setContentItems(contentItems.map(item => 
            item.id === editingItem.id ? result.data : item
          ));
          setShowUploadForm(false);
        } else {
          setError(result.error || 'Failed to update item');
        }
      } else {
        // Create new item
        const result = await contentService.createContentItem(itemData);
        if (result.success) {
          setContentItems([result.data, ...contentItems]);
          setShowUploadForm(false);
        } else {
          setError(result.error || 'Failed to create item');
        }
      }
    } catch (error) {
      setError('Failed to save item. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      setError('');
      const result = await contentService.deleteContentItem(itemId);
      
      if (result.success) {
        setContentItems(contentItems.filter(item => item.id !== itemId));
      } else {
        setError(result.error || 'Failed to delete item');
      }
    } catch (error) {
      setError('Failed to delete item. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (showUploadForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            {editingItem ? 'Edit Content Item' : 'Add New Content Item'}
          </h3>
          <Button
            variant="ghost"
            iconName="X"
            onClick={() => setShowUploadForm(false)}
          />
        </div>

        {error && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <span className="text-sm text-error">{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Content Type *
                </label>
                <select
                  value={formData.content_type}
                  onChange={(e) => setFormData({...formData, content_type: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="photo">Photo</option>
                  <option value="video">Video</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {formData.content_type === 'photo' ? 'Photo' : 'Video'} File *
                </label>
                <input
                  type="file"
                  accept={formData.content_type === 'photo' ? 'image/*' : 'video/*'}
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required={!editingItem}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Title *
                </label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter title"
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
                  {categories.filter(cat => cat.value !== 'all').map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter description"
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Alt Text (SEO) *
                </label>
                <textarea
                  value={formData.alt_text}
                  onChange={(e) => setFormData({...formData, alt_text: e.target.value})}
                  placeholder="Describe the content for accessibility and SEO"
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Preview
                </label>
                {formData.file_url ? (
                  <div className="border border-border rounded-lg overflow-hidden">
                    {formData.content_type === 'photo' ? (
                      <Image
                        src={formData.file_url}
                        alt={formData.alt_text || 'Preview'}
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <video
                        src={formData.file_url}
                        controls
                        className="w-full h-64 object-cover"
                      />
                    )}
                  </div>
                ) : (
                  <div className="w-full h-64 bg-surface border border-border-light rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Icon name={formData.content_type === 'photo' ? 'Image' : 'Video'} size={48} className="text-text-secondary mx-auto mb-2" />
                      <p className="text-sm text-text-secondary">
                        {formData.content_type === 'photo' ? 'Photo' : 'Video'} preview will appear here
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-border-light">
            <Button
              variant="ghost"
              onClick={() => setShowUploadForm(false)}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={uploading}
            >
              {uploading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                  <span>{editingItem ? 'Updating...' : 'Uploading...'}</span>
                </div>
              ) : (
                editingItem ? 'Update Content' : 'Add Content'
              )}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">Content Management</h3>
          <p className="text-sm text-text-secondary mt-1">Manage your wedding portfolio photos and videos</p>
        </div>
        <Button
          variant="primary"
          iconName="Plus"
          iconPosition="left"
          onClick={handleAddItem}
        >
          Add Content
        </Button>
      </div>

      {error && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <span className="text-sm text-error">{error}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>{category.label}</option>
            ))}
          </select>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {contentTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          
          <Button
            variant="ghost"
            iconName={selectedItems.length === filteredItems.length ? "Square" : "CheckSquare"}
            iconPosition="left"
            onClick={handleSelectAll}
            className="text-sm"
          >
            {selectedItems.length === filteredItems.length ? 'Deselect All' : 'Select All'}
          </Button>
        </div>

        {selectedItems.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">
              {selectedItems.length} selected
            </span>
            <Button
              variant="danger"
              iconName="Trash2"
              iconPosition="left"
              onClick={handleDeleteSelected}
              className="text-sm"
            >
              Delete Selected
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`relative group bg-surface rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              selectedItems.includes(item.id) 
                ? 'border-primary shadow-md' 
                : 'border-border-light hover:border-border'
            }`}
          >
            <div className="aspect-square relative overflow-hidden">
              {item.content_type === 'photo' ? (
                <Image
                  src={item.file_url}
                  alt={item.alt_text}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <video
                  src={item.file_url}
                  className="w-full h-full object-cover"
                  muted
                />
              )}
              
              <div className="absolute inset-0 bg-text-primary/0 group-hover:bg-text-primary/20 transition-colors duration-200" />
              
              <div className="absolute top-2 left-2">
                <button
                  onClick={() => handleItemSelect(item.id)}
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                    selectedItems.includes(item.id)
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'bg-background/80 border-border hover:border-primary'
                  }`}
                >
                  {selectedItems.includes(item.id) && (
                    <Icon name="Check" size={14} />
                  )}
                </button>
              </div>

              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    iconName="Edit"
                    onClick={() => handleEditItem(item)}
                    className="w-8 h-8 bg-background/80 hover:bg-background text-text-primary"
                  />
                  <Button
                    variant="ghost"
                    iconName="Trash2"
                    onClick={() => handleDeleteItem(item.id)}
                    className="w-8 h-8 bg-background/80 hover:bg-background text-error"
                  />
                </div>
              </div>

              {item.content_type === 'video' && (
                <div className="absolute bottom-2 left-2">
                  <div className="bg-background/80 rounded px-2 py-1 flex items-center space-x-1">
                    <Icon name="Play" size={12} className="text-text-primary" />
                    <span className="text-xs text-text-primary">Video</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3">
              <h4 className="font-medium text-text-primary text-sm truncate">{item.title}</h4>
              <div className="flex items-center justify-between mt-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent text-accent-foreground">
                  {item.category}
                </span>
                <span className="text-xs text-text-secondary">
                  {new Date(item.created_at).toLocaleDateString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Image" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No content found</h3>
          <p className="text-text-secondary mb-4">
            {filterCategory === 'all' && filterType === 'all' ?'Start building your content library by adding your first item' :'No content found matching your current filters'
            }
          </p>
          <Button
            variant="primary"
            iconName="Plus"
            iconPosition="left"
            onClick={handleAddItem}
          >
            Add Content
          </Button>
        </div>
      )}
    </div>
  );
};

export default GalleryTab;