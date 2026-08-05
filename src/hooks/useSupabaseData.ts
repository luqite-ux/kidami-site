import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { TABLES } from "../lib/supabase";

// Products
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "cars" | "games";
  skills: string[];
  age: string;
  tagline: string;
  keywords: string[];
  price_hint: string;
  image_url: string;
  rating: number;
  review_count: number;
  features: { icon: string; label: string; desc: string }[];
  specs: { label: string; value: string }[];
  education: string;
  amazon_url: string;
  walmart_url: string;
}

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let q = supabase.from(TABLES.products).select("*").eq("is_active", true).order("sort_order");
    if (category) q = q.eq("category", category);
    q.then(({ data, error }) => {
      if (!error && data) setProducts(data as Product[]);
      setLoading(false);
    });
  }, [category]);

  return { products, loading };
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from(TABLES.products)
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setProduct(data as Product);
        setLoading(false);
      });
  }, [slug]);

  return { product, loading };
}

// Articles
export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  minutes: number;
  excerpt: string;
  content: string;
  image_url: string;
}

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from(TABLES.articles)
      .select("*")
      .eq("is_published", true)
      .then(({ data, error }) => {
        if (!error && data) setArticles(data as Article[]);
        setLoading(false);
      });
  }, []);

  return { articles, loading };
}

// Reviews
export interface Review {
  id: string;
  name: string;
  source: string;
  stars: number;
  text: string;
  product_name: string;
}

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    supabase
      .from(TABLES.reviews)
      .select("*")
      .eq("is_approved", true)
      .then(({ data, error }) => {
        if (!error && data) setReviews(data as Review[]);
      });
  }, []);

  return reviews;
}

// SEO
export interface SeoData {
  page_path: string;
  title: string;
  description: string;
  keywords: string[];
  og_title: string;
  og_description: string;
  og_image_url: string;
  canonical_url: string;
  robots_meta: string;
  json_ld: Record<string, unknown>;
}

export function useSeo(pagePath: string, lang: string = "en") {
  const [seo, setSeo] = useState<SeoData | null>(null);

  useEffect(() => {
    supabase
      .from(TABLES.seoSettings)
      .select("*")
      .eq("page_path", pagePath)
      .eq("lang_code", lang)
      .eq("is_active", true)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setSeo(data as SeoData);
      });
  }, [pagePath, lang]);

  return seo;
}

// Site Settings
export function useSiteSetting(key: string): string {
  const [value, setValue] = useState("");

  useEffect(() => {
    supabase
      .from(TABLES.siteSettings)
      .select("value")
      .eq("key", key)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setValue(data.value);
      });
  }, [key]);

  return value;
}

// GEO Settings
export interface GeoData {
  key: string;
  value: Record<string, unknown>;
}

export function useGeoSettings() {
  const [geo, setGeo] = useState<GeoData[]>([]);

  useEffect(() => {
    supabase
      .from(TABLES.geoSettings)
      .select("*")
      .then(({ data, error }) => {
        if (!error && data) setGeo(data as GeoData[]);
      });
  }, []);

  return geo;
}
