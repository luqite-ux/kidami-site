-- ============================================================
-- KIDAMI Website Database Schema
-- Creates new tables with 'kidami_' prefix to avoid conflicts
-- with existing 'products' table (perfume data)
-- ============================================================

-- ============================================================
-- 1. KIDAMI_PRODUCTS (玩具产品)
-- ============================================================
CREATE TABLE IF NOT EXISTS kidami_products (
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
CREATE TABLE IF NOT EXISTS kidami_product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES kidami_products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 2. KIDAMI_ARTICLES (博客文章)
-- ============================================================
CREATE TABLE IF NOT EXISTS kidami_articles (
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
-- 3. KIDAMI_REVIEWS (用户评论)
-- ============================================================
CREATE TABLE IF NOT EXISTS kidami_reviews (
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
-- 4. KIDAMI_TRANSLATIONS (多语言文案)
-- ============================================================
CREATE TABLE IF NOT EXISTS kidami_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lang_code TEXT NOT NULL CHECK (lang_code IN ('en','es','pt','fr','ar','de','ja','ru','it','ko')),
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(lang_code, section, key)
);

-- ============================================================
-- 5. KIDAMI_SEO_SETTINGS (SEO 配置)
-- ============================================================
CREATE TABLE IF NOT EXISTS kidami_seo_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  lang_code TEXT NOT NULL DEFAULT 'en',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  og_title TEXT,
  og_description TEXT,
  og_image_url TEXT,
  canonical_url TEXT,
  robots_meta TEXT DEFAULT 'index, follow',
  json_ld JSONB,
  changefreq TEXT DEFAULT 'weekly',
  priority NUMERIC(2,1) DEFAULT 0.5,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(page_path, lang_code)
);

-- ============================================================
-- 6. KIDAMI_GEO_SETTINGS (GEO / 结构化数据)
-- ============================================================
CREATE TABLE IF NOT EXISTS kidami_geo_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default GEO data
INSERT INTO kidami_geo_settings (key, value, description) VALUES
('organization', '{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "KIDAMI",
  "url": "https://kidami-ent.com/",
  "logo": "https://kidami-ent.com/logo.png",
  "slogan": "A Companion of Childhood, A Keeper of Memories",
  "description": "KIDAMI is a children''s toy brand founded in 2016, specializing in die cast metal toy cars (ages 3+) and magnetic educational board games (ages 6+).",
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
-- 7. KIDAMI_SITE_SETTINGS (网站全局设置)
-- ============================================================
CREATE TABLE IF NOT EXISTS kidami_site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO kidami_site_settings (key, value, description) VALUES
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
-- Row Level Security (RLS)
-- ============================================================

-- Enable RLS on all KIDAMI tables
ALTER TABLE kidami_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE kidami_product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE kidami_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE kidami_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE kidami_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE kidami_seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE kidami_geo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE kidami_site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies (for frontend)
CREATE POLICY "kidami_products_public_read" ON kidami_products FOR SELECT USING (is_active = true);
CREATE POLICY "kidami_product_images_public_read" ON kidami_product_images FOR SELECT USING (true);
CREATE POLICY "kidami_articles_public_read" ON kidami_articles FOR SELECT USING (is_published = true);
CREATE POLICY "kidami_reviews_public_read" ON kidami_reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "kidami_translations_public_read" ON kidami_translations FOR SELECT USING (true);
CREATE POLICY "kidami_seo_public_read" ON kidami_seo_settings FOR SELECT USING (is_active = true);
CREATE POLICY "kidami_geo_public_read" ON kidami_geo_settings FOR SELECT USING (true);
CREATE POLICY "kidami_settings_public_read" ON kidami_site_settings FOR SELECT USING (true);

-- Authenticated user write policies (for admin)
CREATE POLICY "kidami_products_admin_write" ON kidami_products FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "kidami_product_images_admin_write" ON kidami_product_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "kidami_articles_admin_write" ON kidami_articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "kidami_reviews_admin_write" ON kidami_reviews FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "kidami_translations_admin_write" ON kidami_translations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "kidami_seo_admin_write" ON kidami_seo_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "kidami_geo_admin_write" ON kidami_geo_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "kidami_settings_admin_write" ON kidami_site_settings FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- Auto-update updated_at trigger
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER kidami_products_updated_at BEFORE UPDATE ON kidami_products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER kidami_articles_updated_at BEFORE UPDATE ON kidami_articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER kidami_translations_updated_at BEFORE UPDATE ON kidami_translations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER kidami_seo_updated_at BEFORE UPDATE ON kidami_seo_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- Basic indexes (full-text search can be added later when needed)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_kidami_products_slug ON kidami_products(slug);
CREATE INDEX IF NOT EXISTS idx_kidami_products_category ON kidami_products(category);
CREATE INDEX IF NOT EXISTS idx_kidami_articles_slug ON kidami_articles(slug);
CREATE INDEX IF NOT EXISTS idx_kidami_reviews_approved ON kidami_reviews(is_approved);
