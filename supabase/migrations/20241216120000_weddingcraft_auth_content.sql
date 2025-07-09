-- WeddingCraft Pro Authentication and Content Management System
-- Migration: 20241216120000_weddingcraft_auth_content.sql

-- 1. Create Custom Types
CREATE TYPE public.user_role AS ENUM ('admin', 'manager', 'editor');
CREATE TYPE public.content_type AS ENUM ('image', 'video', 'document');
CREATE TYPE public.content_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE public.content_category AS ENUM ('decorations', 'ceremonies', 'couples', 'reception', 'catering', 'venue', 'other');

-- 2. Create User Profiles Table (Bridge to auth.users)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'editor'::public.user_role,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Content/Media Management Tables
CREATE TABLE public.content_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    content_type public.content_type NOT NULL,
    category public.content_category NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER,
    file_name TEXT,
    mime_type TEXT,
    alt_text TEXT,
    status public.content_status DEFAULT 'draft'::public.content_status,
    created_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.content_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.content_item_tags (
    content_item_id UUID REFERENCES public.content_items(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES public.content_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (content_item_id, tag_id)
);

CREATE TABLE public.wedding_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price_range TEXT,
    features TEXT[],
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key TEXT NOT NULL UNIQUE,
    setting_value JSONB,
    description TEXT,
    updated_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_content_items_type ON public.content_items(content_type);
CREATE INDEX idx_content_items_category ON public.content_items(category);
CREATE INDEX idx_content_items_status ON public.content_items(status);
CREATE INDEX idx_content_items_created_by ON public.content_items(created_by);
CREATE INDEX idx_content_items_created_at ON public.content_items(created_at);
CREATE INDEX idx_wedding_services_active ON public.wedding_services(is_active);
CREATE INDEX idx_site_settings_key ON public.site_settings(setting_key);

-- 5. Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_item_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 6. Create Helper Functions
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'::public.user_role
)
$$;

CREATE OR REPLACE FUNCTION public.is_admin_or_manager()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() 
    AND up.role IN ('admin'::public.user_role, 'manager'::public.user_role)
)
$$;

CREATE OR REPLACE FUNCTION public.can_edit_content(content_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.content_items ci
    JOIN public.user_profiles up ON ci.created_by = up.id
    WHERE ci.id = content_id 
    AND (up.id = auth.uid() OR public.is_admin_or_manager())
)
$$;

-- 7. Create Trigger Function for Updated At
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 8. Create Triggers
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_content_items_updated_at
    BEFORE UPDATE ON public.content_items
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_wedding_services_updated_at
    BEFORE UPDATE ON public.wedding_services
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- 9. Create Automatic User Profile Creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'role', 'editor')::public.user_role
    );
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 10. Create RLS Policies
-- User Profiles Policies
CREATE POLICY "users_can_view_own_profile"
ON public.user_profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "users_can_update_own_profile"
ON public.user_profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "admins_can_manage_all_profiles"
ON public.user_profiles FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Content Items Policies
CREATE POLICY "admins_can_manage_all_content"
ON public.content_items FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "managers_can_manage_content"
ON public.content_items FOR ALL
TO authenticated
USING (public.is_admin_or_manager())
WITH CHECK (public.is_admin_or_manager());

CREATE POLICY "public_can_view_published_content"
ON public.content_items FOR SELECT
TO public
USING (status = 'published'::public.content_status);

CREATE POLICY "authenticated_can_view_published_content"
ON public.content_items FOR SELECT
TO authenticated
USING (status = 'published'::public.content_status OR public.can_edit_content(id));

-- Content Tags Policies
CREATE POLICY "admins_can_manage_tags"
ON public.content_tags FOR ALL
TO authenticated
USING (public.is_admin_or_manager())
WITH CHECK (public.is_admin_or_manager());

CREATE POLICY "public_can_view_tags"
ON public.content_tags FOR SELECT
TO public
USING (true);

-- Content Item Tags Policies
CREATE POLICY "admins_can_manage_item_tags"
ON public.content_item_tags FOR ALL
TO authenticated
USING (public.is_admin_or_manager())
WITH CHECK (public.is_admin_or_manager());

CREATE POLICY "public_can_view_item_tags"
ON public.content_item_tags FOR SELECT
TO public
USING (true);

-- Wedding Services Policies
CREATE POLICY "admins_can_manage_services"
ON public.wedding_services FOR ALL
TO authenticated
USING (public.is_admin_or_manager())
WITH CHECK (public.is_admin_or_manager());

CREATE POLICY "public_can_view_active_services"
ON public.wedding_services FOR SELECT
TO public
USING (is_active = true);

-- Site Settings Policies
CREATE POLICY "admins_can_manage_settings"
ON public.site_settings FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "public_can_view_settings"
ON public.site_settings FOR SELECT
TO public
USING (true);

-- 11. Create Mock Data
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    manager_uuid UUID := gen_random_uuid();
    content1_id UUID := gen_random_uuid();
    content2_id UUID := gen_random_uuid();
    content3_id UUID := gen_random_uuid();
    service1_id UUID := gen_random_uuid();
    service2_id UUID := gen_random_uuid();
    tag1_id UUID := gen_random_uuid();
    tag2_id UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@weddingcraft.com', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (manager_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'manager@weddingcraft.com', crypt('manager123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Manager User", "role": "manager"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create content tags
    INSERT INTO public.content_tags (id, name, slug) VALUES
        (tag1_id, 'Traditional', 'traditional'),
        (tag2_id, 'Modern', 'modern');

    -- Create content items
    INSERT INTO public.content_items (id, title, description, content_type, category, file_url, alt_text, status, created_by) VALUES
        (content1_id, 'Royal Mandap Setup', 'Beautiful traditional mandap decoration with marigold flowers', 'image'::public.content_type, 'decorations'::public.content_category, 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', 'Royal wedding mandap decoration with marigold flowers', 'published'::public.content_status, admin_uuid),
        (content2_id, 'Beach Wedding Ceremony', 'Romantic beachside wedding ceremony at sunset', 'image'::public.content_type, 'ceremonies'::public.content_category, 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800', 'Beachside wedding ceremony at sunset', 'published'::public.content_status, admin_uuid),
        (content3_id, 'Traditional Wedding Portrait', 'Beautiful South Indian wedding couple portrait', 'image'::public.content_type, 'couples'::public.content_category, 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800', 'Traditional South Indian wedding couple', 'published'::public.content_status, manager_uuid);

    -- Create content item tags
    INSERT INTO public.content_item_tags (content_item_id, tag_id) VALUES
        (content1_id, tag1_id),
        (content3_id, tag1_id),
        (content2_id, tag2_id);

    -- Create wedding services
    INSERT INTO public.wedding_services (id, name, description, price_range, features, image_url, created_by) VALUES
        (service1_id, 'Traditional Wedding Package', 'Complete traditional wedding planning and execution', '₹2,00,000 - ₹5,00,000', ARRAY['Mandap Decoration', 'Catering for 500 guests', 'Photography & Videography', 'Bridal Makeup', 'DJ and Entertainment'], 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', admin_uuid),
        (service2_id, 'Destination Wedding Package', 'Exotic destination wedding planning and coordination', '₹5,00,000 - ₹15,00,000', ARRAY['Venue Booking', 'Guest Accommodation', 'Travel Coordination', 'Complete Event Management', 'Professional Photography'], 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800', admin_uuid);

    -- Create site settings
    INSERT INTO public.site_settings (setting_key, setting_value, description, updated_by) VALUES
        ('site_title', '"WeddingCraft Pro"', 'Main website title', admin_uuid),
        ('contact_email', '"info@weddingcraft.com"', 'Primary contact email', admin_uuid),
        ('contact_phone', '"+91 98765 43210"', 'Primary contact phone number', admin_uuid),
        ('gallery_settings', '{"items_per_page": 12, "auto_optimize": true}'::jsonb, 'Gallery display settings', admin_uuid);

END $$;

-- 12. Create Cleanup Function
CREATE OR REPLACE FUNCTION public.cleanup_test_data()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    auth_user_ids_to_delete UUID[];
BEGIN
    -- Get auth user IDs to delete
    SELECT ARRAY_AGG(id) INTO auth_user_ids_to_delete
    FROM auth.users
    WHERE email LIKE '%@weddingcraft.com';

    -- Delete in dependency order (children first)
    DELETE FROM public.content_item_tags WHERE content_item_id IN (
        SELECT id FROM public.content_items WHERE created_by = ANY(auth_user_ids_to_delete)
    );
    DELETE FROM public.content_items WHERE created_by = ANY(auth_user_ids_to_delete);
    DELETE FROM public.wedding_services WHERE created_by = ANY(auth_user_ids_to_delete);
    DELETE FROM public.site_settings WHERE updated_by = ANY(auth_user_ids_to_delete);
    DELETE FROM public.user_profiles WHERE id = ANY(auth_user_ids_to_delete);
    DELETE FROM auth.users WHERE id = ANY(auth_user_ids_to_delete);
    
    -- Delete remaining test data
    DELETE FROM public.content_tags WHERE slug IN ('traditional', 'modern');
    
EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key constraint prevents deletion: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Cleanup failed: %', SQLERRM;
END;
$$;