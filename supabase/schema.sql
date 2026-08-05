-- ============================================================
-- KIDAMI Website Admin Database Schema
-- Designed for Supabase (PostgreSQL)
-- Includes: Products, Articles, Reviews, Translations, SEO, GEO
-- ============================================================

-- Enable RLS by default
ALTER DATABASE postgres SET "app.settings.jwt_secret" = 'your-jwt-secret';

-- ============================================================
-- 1. PRODUCTS (产品)
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('cars', 'games')),
  skills TEXT[] DEFAULT '{}',
  age TEXT NOT NULL,
  tagline TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  price_hint TEXT NOT NULL,
  image_url TEXT NOT NULL,
  rating NUMERIC(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  features JSONB DEFAULT '[]',
  specs JSONB DEFAULT '[]',
  education TEXT,
  amazon_url TEXT,
  walmart_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Product images (gallery)
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 2. ARTICLES (博客文章)
-- ============================================================
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  minutes INTEGER DEFAULT 5,
  excerpt TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 3. REVIEWS (用户评论)
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  source TEXT DEFAULT 'Amazon Verified Purchase',
  stars INTEGER NOT NULL CHECK (stars BETWEEN 1 AND 5),
  text TEXT NOT NULL,
  product_name TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 4. TRANSLATIONS (多语言文案)
-- ============================================================
CREATE TABLE IF NOT EXISTS translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lang_code TEXT NOT NULL CHECK (lang_code IN ('en','es','pt','fr','ar','de','ja','ru','it','ko')),
  section TEXT NOT NULL,        -- e.g. 'nav', 'home.hero', 'footer'
  key TEXT NOT NULL,            -- e.g. 'title', 'ctaExplore'
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(lang_code, section, key)
);

-- ============================================================
-- 5. SEO_SETTINGS (SEO 配置)
-- ============================================================
CREATE TABLE IF NOT EXISTS seo_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT UNIQUE NOT NULL,     -- e.g. '/', '/products', '/about'
  lang_code TEXT NOT NULL DEFAULT 'en',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  og_title TEXT,
  og_description TEXT,
  og_image_url TEXT,
  canonical_url TEXT,
  robots_meta TEXT DEFAULT 'index, follow',
  json_ld JSONB,                      -- Structured data
  changefreq TEXT DEFAULT 'weekly',
  priority NUMERIC(2,1) DEFAULT 0.5,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 6. GEO_SETTINGS (GEO / 本地商家配置)
-- ============================================================
CREATE TABLE IF NOT EXISTS geo_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default GEO data
INSERT INTO geo_settings (key, value, description) VALUES
('organization', '{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "KIDAMI",
  "url": "https://kidami-ent.com/",
  "logo": "https://kidami-ent.com/logo.png",
  "slogan": "A Companion of Childhood, A Keeper of Memories",
  "description": "KIDAMI is a children''s toy brand founded in 2016...",
  "foundingDate": "2016",
  "sameAs": [
    "https://www.amazon.com/stores/KIDAMI/page/546B9750-2336-4B85-8F2F-2C57C2997542",
    "https://www.walmart.com/ip/seort/20538824770"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "support@kidami-ent.com"
  }
}'::jsonb, 'Organization structured data'),

('local_business', '{
  "@context": "https://schema.org",
  "@type": "ToyStore",
  "name": "KIDAMI",
  "description": "Premium die-cast toy cars and magnetic board games for kids",
  "url": "https://kidami-ent.com/",
  "telephone": "+1-xxx-xxx-xxxx",
  "email": "support@kidami-ent.com",
  "priceRange": "$$",
  "paymentAccepted": ["Credit Card", "PayPal"],
  "currenciesAccepted": "USD"
}'::jsonb, 'LocalBusiness structured data'),

('hreflang', '{
  "default": "en",
  "alternates": [
    {"lang": "en", "url": "https://kidami-ent.com/"},
    {"lang": "es", "url": "https://kidami-ent.com/es"},
    {"lang": "pt", "url": "https://kidami-ent.com/pt"},
    {"lang": "fr", "url": "https://kidami-ent.com/fr"},
    {"lang": "ar", "url": "https://kidami-ent.com/ar"},
    {"lang": "de", "url": "https://kidami-ent.com/de"},
    {"lang": "ja", "url": "https://kidami-ent.com/ja"},
    {"lang": "ru", "url": "https://kidami-ent.com/ru"},
    {"lang": "it", "url": "https://kidami-ent.com/it"},
    {"lang": "ko", "url": "https://kidami-ent.com/ko"}
  ]
}'::jsonb, 'Hreflang configuration')
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- 7. SITE_SETTINGS (网站全局设置)
-- ============================================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO site_settings (key, value, description) VALUES
('site_name', 'KIDAMI', 'Website name'),
('site_tagline', 'A Companion of Childhood, A Keeper of Memories', 'Brand tagline'),
('site_url', 'https://kidami-ent.com/', 'Canonical site URL'),
('contact_email', 'support@kidami-ent.com', 'Customer service email'),
('amazon_store_url', 'https://www.amazon.com/stores/KIDAMI/page/546B9750-2336-4B85-8F2F-2C57C2997542', 'Amazon store URL'),
('walmart_store_url', 'https://www.walmart.com/ip/seort/20538824770', 'Walmart store URL'),
('ga_measurement_id', '', 'Google Analytics Measurement ID'),
('gtm_container_id', '', 'Google Tag Manager Container ID')
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- Row Level Security Policies
-- ============================================================

-- Products: public read, admin write
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products public read" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Products admin all" ON products FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Articles: public read published, admin all
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Articles public read" ON articles FOR SELECT USING (is_published = true);
CREATE POLICY "Articles admin all" ON articles FOR ALL USING (auth.role() = 'authenticated');

-- Reviews: public read approved, admin all
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews public read" ON reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Reviews admin all" ON reviews FOR ALL USING (auth.role() = 'authenticated');

-- Translations: public read, admin write
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Translations public read" ON translations FOR SELECT USING (true);
CREATE POLICY "Translations admin all" ON translations FOR ALL USING (auth.role() = 'authenticated');

-- SEO/GEO/Settings: public read, admin write
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE geo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "SEO public read" ON seo_settings FOR SELECT USING (is_active = true);
CREATE POLICY "SEO admin all" ON seo_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "GEO public read" ON geo_settings FOR SELECT USING (true);
CREATE POLICY "GEO admin all" ON geo_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Settings public read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Settings admin all" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- Functions
-- ============================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER articles_updated_at BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER translations_updated_at BEFORE UPDATE ON translations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER seo_settings_updated_at BEFORE UPDATE ON seo_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Full-text search on products
CREATE INDEX IF NOT EXISTS idx_products_search ON products USING gin(to_tsvector('english', name || ' ' || tagline || ' ' || COALESCE(array_to_string(keywords, ' '), '')));
CREATE INDEX IF NOT EXISTS idx_articles_search ON articles USING gin(to_tsvector('english', title || ' ' || excerpt));
