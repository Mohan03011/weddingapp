import { supabase } from '../lib/supabase';

const contentService = {
  // Get all content items
  getContentItems: async (filters = {}) => {
    try {
      let query = supabase
        .from('content_items')
        .select(`
          *,
          created_by:user_profiles(full_name, email)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      if (filters.content_type) {
        query = query.eq('content_type', filters.content_type);
      }

      const { data, error } = await query;

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        };
      }
      return { success: false, error: 'Failed to load content. Please try again.' };
    }
  },

  // Create new content item
  createContentItem: async (contentData) => {
    try {
      const { data, error } = await supabase
        .from('content_items')
        .insert([contentData])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        };
      }
      return { success: false, error: 'Failed to create content. Please try again.' };
    }
  },

  // Update content item
  updateContentItem: async (contentId, updates) => {
    try {
      const { data, error } = await supabase
        .from('content_items')
        .update(updates)
        .eq('id', contentId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        };
      }
      return { success: false, error: 'Failed to update content. Please try again.' };
    }
  },

  // Delete content item
  deleteContentItem: async (contentId) => {
    try {
      const { error } = await supabase
        .from('content_items')
        .delete()
        .eq('id', contentId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        };
      }
      return { success: false, error: 'Failed to delete content. Please try again.' };
    }
  },

  // Delete multiple content items
  deleteMultipleContentItems: async (contentIds) => {
    try {
      const { error } = await supabase
        .from('content_items')
        .delete()
        .in('id', contentIds);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        };
      }
      return { success: false, error: 'Failed to delete content items. Please try again.' };
    }
  },

  // Upload file to Supabase storage
  uploadFile: async (file, bucketName = 'content', path = '') => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${path}${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        return { success: false, error: error.message };
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      return { 
        success: true, 
        data: { 
          path: data.path, 
          publicUrl: urlData.publicUrl 
        } 
      };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to storage service. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        };
      }
      return { success: false, error: 'Failed to upload file. Please try again.' };
    }
  },

  // Get services
  getServices: async (filters = {}) => {
    try {
      let query = supabase
        .from('services')
        .select(`
          *,
          created_by:user_profiles(full_name, email)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (filters.category) {
        query = query.eq('category', filters.category);
      }

      const { data, error } = await query;

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        };
      }
      return { success: false, error: 'Failed to load services. Please try again.' };
    }
  },

  // Create service
  createService: async (serviceData) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .insert([serviceData])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        };
      }
      return { success: false, error: 'Failed to create service. Please try again.' };
    }
  },

  // Update service
  updateService: async (serviceId, updates) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .update(updates)
        .eq('id', serviceId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        };
      }
      return { success: false, error: 'Failed to update service. Please try again.' };
    }
  },

  // Delete service
  deleteService: async (serviceId) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        };
      }
      return { success: false, error: 'Failed to delete service. Please try again.' };
    }
  },

  // Get testimonials
  getTestimonials: async (approvedOnly = false) => {
    try {
      let query = supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (approvedOnly) {
        query = query.eq('is_approved', true);
      }

      const { data, error } = await query;

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        };
      }
      return { success: false, error: 'Failed to load testimonials. Please try again.' };
    }
  },

  // Create testimonial
  createTestimonial: async (testimonialData) => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([testimonialData])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        };
      }
      return { success: false, error: 'Failed to create testimonial. Please try again.' };
    }
  },

  // Update testimonial
  updateTestimonial: async (testimonialId, updates) => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .update(updates)
        .eq('id', testimonialId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        };
      }
      return { success: false, error: 'Failed to update testimonial. Please try again.' };
    }
  },

  // Delete testimonial
  deleteTestimonial: async (testimonialId) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', testimonialId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        };
      }
      return { success: false, error: 'Failed to delete testimonial. Please try again.' };
    }
  },

  // Get site settings
  getSiteSettings: async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('key');

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        };
      }
      return { success: false, error: 'Failed to load site settings. Please try again.' };
    }
  },

  // Update site setting
  updateSiteSetting: async (key, value, description = '') => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .upsert([{ key, value, description }])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        };
      }
      return { success: false, error: 'Failed to update site setting. Please try again.' };
    }
  }
};

export default contentService;