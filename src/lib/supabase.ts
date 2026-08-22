import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://yklxtfilguqyfrxzfgzh.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

// Table names with kidami_ prefix to avoid conflicts with existing perfume data
export const TABLES = {
  products: "kidami_products",
  productImages: "kidami_product_images",
  articles: "kidami_articles",
  reviews: "kidami_reviews",
  translations: "kidami_translations",
  seoSettings: "kidami_seo_settings",
  geoSettings: "kidami_geo_settings",
  siteSettings: "kidami_site_settings",
  visits: "kidami_visits",
} as const;

// Admin client with service role (for server-side operations)
const serviceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY || "";
export const supabaseAdmin = serviceKey
  ? createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } })
  : supabase;
