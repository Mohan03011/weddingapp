-- Location: supabase/migrations/20241216120000_wedding_content_management.sql

-- 1. Create custom types
CREATE TYPE public.user_role AS ENUM ('admin', 'manager', 'editor');
CREATE TYPE public.content_type AS ENUM ('photo', 'video');
CREATE TYPE public.content_category AS ENUM ('decorations', 'ceremonies', 'couples', 'reception', 'catering', 'mehendi', 'engagement', 'prewedding');
CREATE TYPE public.content_status AS ENUM ('active', 'inactive', 'pending');

-- 2. Create user_profiles table (intermediary for auth)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'editor'::public.user_role,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create content management tables
CREATE TABLE public.content_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    content_type public.content_type NOT NULL,
    category public.content_category NOT NULL,
    status public.content_status DEFAULT 'active'::public.content_status,
    file_url TEXT NOT NULL,
    thumbnail_url TEXT,
    alt_text TEXT,
    file_size INTEGER,
    duration INTEGER, -- For videos in seconds
    width INTEGER,
    height INTEGER,
    created_by UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    features TEXT[],
    category TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    client_email TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    wedding_date DATE,
    is_featured BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    value TEXT NOT NULL,
    description TEXT,
    updated_by UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create indexes for better performance
CREATE INDEX idx_content_items_category ON public.content_items(category);
CREATE INDEX idx_content_items_type ON public.content_items(content_type);
CREATE INDEX idx_content_items_status ON public.content_items(status);
CREATE INDEX idx_content_items_created_by ON public.content_items(created_by);
CREATE INDEX idx_services_category ON public.services(category);
CREATE INDEX idx_services_active ON public.services(is_active);
CREATE INDEX idx_testimonials_approved ON public.testimonials(is_approved);
CREATE INDEX idx_testimonials_featured ON public.testimonials(is_featured);
CREATE INDEX idx_site_settings_key ON public.site_settings(key);

-- 5. Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 6. Helper functions for RLS
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

CREATE OR REPLACE FUNCTION public.is_manager_or_above()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role IN ('admin'::public.user_role, 'manager'::public.user_role)
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
    WHERE ci.id = content_id AND (
        ci.created_by = auth.uid() OR
        public.is_manager_or_above()
    )
)
$$;

-- 7. Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 8. Create triggers for automatic timestamp updates
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_content_items_updated_at
    BEFORE UPDATE ON public.content_items
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
    BEFORE UPDATE ON public.testimonials
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- 9. Auto-create user profile on signup
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
        COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'editor'::public.user_role)
    );
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 10. RLS Policies
CREATE POLICY "users_own_profile" ON public.user_profiles
    FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "admin_full_access_profiles" ON public.user_profiles
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "authenticated_view_content" ON public.content_items
    FOR SELECT TO authenticated USING (status = 'active'::public.content_status);

CREATE POLICY "editors_create_content" ON public.content_items
    FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "content_creators_edit_own" ON public.content_items
    FOR UPDATE TO authenticated USING (public.can_edit_content(id)) WITH CHECK (public.can_edit_content(id));

CREATE POLICY "managers_delete_content" ON public.content_items
    FOR DELETE TO authenticated USING (public.is_manager_or_above());

CREATE POLICY "authenticated_view_services" ON public.services
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "editors_manage_services" ON public.services
    FOR ALL TO authenticated USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "public_read_testimonials" ON public.testimonials
    FOR SELECT TO public USING (is_approved = true);

CREATE POLICY "authenticated_manage_testimonials" ON public.testimonials
    FOR ALL TO authenticated USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "authenticated_view_settings" ON public.site_settings
    FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);

CREATE POLICY "managers_edit_settings" ON public.site_settings
    FOR ALL TO authenticated USING (public.is_manager_or_above()) WITH CHECK (public.is_manager_or_above());

-- 11. Sample data for testing
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    editor_uuid UUID := gen_random_uuid();
    content1_uuid UUID := gen_random_uuid();
    content2_uuid UUID := gen_random_uuid();
    service1_uuid UUID := gen_random_uuid();
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
        (editor_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'editor@weddingcraft.com', crypt('editor123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Editor User", "role": "editor"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create sample content items
    INSERT INTO public.content_items (id, title, description, content_type, category, file_url, thumbnail_url, alt_text, created_by)
    VALUES
        (content1_uuid, 'Royal Mandap Setup', 'Beautiful royal mandap decoration with traditional marigold flowers', 'photo'::public.content_type, 'decorations'::public.content_category, 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=300', 'Royal wedding mandap decoration with marigold flowers', admin_uuid),
        (content2_uuid, 'Beach Wedding Ceremony', 'Stunning beachside wedding ceremony captured at sunset', 'photo'::public.content_type, 'ceremonies'::public.content_category, 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300', 'Beachside wedding ceremony at sunset', editor_uuid);

    -- Create sample services
    INSERT INTO public.services (id, name, description, price, features, category, created_by)
    VALUES
        (service1_uuid, 'Premium Wedding Package', 'Complete wedding planning and decoration service', 150000.00, 
         ARRAY['Full venue decoration', 'Mandap setup', 'Photography', 'Catering coordination', 'Guest management'], 
         'Complete Package', admin_uuid);

    -- Create sample testimonials
    INSERT INTO public.testimonials (client_name, client_email, rating, review_text, wedding_date, is_featured, is_approved)
    VALUES
        ('Priya and Raj', 'priya.raj@email.com', 5, 'Amazing service! Our wedding was absolutely perfect. The team handled everything professionally.', '2024-01-15', true, true),
        ('Sneha and Vikram', 'sneha.vikram@email.com', 5, 'Could not have asked for better wedding planners. Every detail was taken care of beautifully.', '2024-01-20', false, true);

    -- Create sample site settings
    INSERT INTO public.site_settings (key, value, description, updated_by)
    VALUES
        ('site_title', 'WeddingCraft Pro', 'Main website title', admin_uuid),
        ('contact_email', 'info@weddingcraft.com', 'Main contact email', admin_uuid),
        ('contact_phone', '+91 98765 43210', 'Main contact phone number', admin_uuid),
        ('business_hours', '9:00 AM - 7:00 PM', 'Business operating hours', admin_uuid);

END $$;