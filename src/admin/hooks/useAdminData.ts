import { useState, useEffect, useCallback } from "react";
import { supabase, TABLES } from "../../lib/supabase";

// Generic CRUD hook
export function useTable<T extends { id: string }>(tableName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data: res, error: err } = await supabase
      .from(tableName)
      .select("*")
      .order("created_at", { ascending: false });
    if (err) setError(err.message);
    else setData(res as T[]);
    setLoading(false);
  }, [tableName]);

  const create = useCallback(
    async (item: Omit<T, "id">) => {
      const { data: res, error: err } = await supabase
        .from(tableName)
        .insert(item as Record<string, unknown>)
        .select()
        .single();
      if (err) {
        setError(err.message);
        return null;
      }
      setData((prev) => [res as T, ...prev]);
      return res as T;
    },
    [tableName]
  );

  const update = useCallback(
    async (id: string, updates: Partial<T>) => {
      const { data: res, error: err } = await supabase
        .from(tableName)
        .update(updates as Record<string, unknown>)
        .eq("id", id)
        .select()
        .single();
      if (err) {
        setError(err.message);
        return null;
      }
      setData((prev) => prev.map((d) => (d.id === id ? (res as T) : d)));
      return res as T;
    },
    [tableName]
  );

  const remove = useCallback(
    async (id: string) => {
      const { error: err } = await supabase.from(tableName).delete().eq("id", id);
      if (err) {
        setError(err.message);
        return false;
      }
      setData((prev) => prev.filter((d) => d.id !== id));
      return true;
    },
    [tableName]
  );

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, fetch, create, update, remove };
}

// Product types
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
  is_active: boolean;
  sort_order: number;
}

export function useProducts() {
  return useTable<Product>(TABLES.products);
}

// Article types
export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  minutes: number;
  excerpt: string;
  content: string;
  image_url: string;
  is_published: boolean;
}

export function useArticles() {
  return useTable<Article>(TABLES.articles);
}

// Review types
export interface Review {
  id: string;
  name: string;
  source: string;
  stars: number;
  text: string;
  product_name: string;
  is_approved: boolean;
}

export function useReviews() {
  return useTable<Review>(TABLES.reviews);
}

// SEO types
export interface SeoSetting {
  id: string;
  page_path: string;
  lang_code: string;
  title: string;
  description: string;
  keywords: string[];
  og_title: string;
  og_description: string;
  og_image_url: string;
  canonical_url: string;
  robots_meta: string;
  priority: number;
  changefreq: string;
  is_active: boolean;
  json_ld: Record<string, unknown> | null;
}

export function useSeoSettings() {
  return useTable<SeoSetting>(TABLES.seoSettings);
}

// GEO types
export interface GeoSetting {
  id: string;
  key: string;
  value: Record<string, unknown>;
  description: string;
}

export function useGeoSettings() {
  const [data, setData] = useState<GeoSetting[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data: res } = await supabase.from(TABLES.geoSettings).select("*");
    if (res) setData(res as GeoSetting[]);
    setLoading(false);
  }, []);

  const create = useCallback(async (item: Omit<GeoSetting, "id">) => {
    const { data: res, error } = await supabase
      .from(TABLES.geoSettings)
      .insert(item as Record<string, unknown>)
      .select()
      .single();
    if (!error && res) {
      setData((prev) => [res as GeoSetting, ...prev]);
    }
    return !error;
  }, []);

  const update = useCallback(async (key: string, value: Record<string, unknown>) => {
    const { error } = await supabase
      .from(TABLES.geoSettings)
      .update({ value })
      .eq("key", key);
    if (!error) await fetch();
    return !error;
  }, [fetch]);

  const remove = useCallback(async (key: string) => {
    const { error } = await supabase.from(TABLES.geoSettings).delete().eq("key", key);
    if (!error) setData((prev) => prev.filter((d) => d.key !== key));
    return !error;
  }, []);

  useEffect(() => { fetch(); }, [fetch]);
  return { data, loading, fetch, create, update, remove };
}

// Site Settings
export function useSiteSettings() {
  const [data, setData] = useState<Record<string, string>>({});

  const fetch = useCallback(async () => {
    const { data: res } = await supabase.from(TABLES.siteSettings).select("key, value");
    if (res) {
      const map: Record<string, string> = {};
      res.forEach((s: { key: string; value: string }) => (map[s.key] = s.value));
      setData(map);
    }
  }, []);

  const update = useCallback(async (key: string, value: string) => {
    const { error } = await supabase.from(TABLES.siteSettings).update({ value }).eq("key", key);
    if (!error) setData((prev) => ({ ...prev, [key]: value }));
    return !error;
  }, []);

  const upsert = useCallback(async (key: string, value: string) => {
    const { data: existing } = await supabase.from(TABLES.siteSettings).select("key").eq("key", key).maybeSingle();
    if (existing) {
      const ok = await update(key, value);
      return ok;
    }
    const { error } = await supabase.from(TABLES.siteSettings).insert({
      key,
      value,
      description: "Admin password hash",
    });
    if (!error) setData((prev) => ({ ...prev, [key]: value }));
    return !error;
  }, [update]);

  useEffect(() => { fetch(); }, [fetch]);
  return { data, fetch, update, upsert };
}

export type VisitRow = {
  id: string;
  created_at: string;
  path: string;
  referrer: string;
  source: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  session_id: string;
};

export function useVisits(days = 30) {
  const [rows, setRows] = useState<VisitRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVisits = useCallback(async () => {
    setLoading(true);
    setError(null);
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    const { data, error: err } = await supabase
      .from(TABLES.visits)
      .select("*")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(5000);
    if (err) setError(err.message);
    else setRows((data as VisitRow[]) ?? []);
    setLoading(false);
  }, [days]);

  useEffect(() => {
    fetchVisits();
  }, [fetchVisits]);

  return { rows, loading, error, fetchVisits };
}
