import { useState, useEffect } from "react";
import { langCodes, stripLang, withLang } from "../i18n/core";
import { supabase } from "./supabase";
import { TABLES } from "./supabase";

const SITE = "KIDAMI";
const BASE_URL = "https://kidami-ent.com";

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  jsonLd?: object | object[];
  keywords?: string[];
  ogImage?: string;
  robots?: string;
  canonical?: string;
}

interface DbSeo {
  title: string;
  description: string;
  keywords: string[];
  og_title: string;
  og_description: string;
  og_image_url: string;
  canonical_url: string;
  robots_meta: string;
  json_ld: Record<string, unknown> | null;
}

function useDbSeo(pagePath: string, lang: string): DbSeo | null {
  const [seo, setSeo] = useState<DbSeo | null>(null);
  useEffect(() => {
    supabase
      .from(TABLES.seoSettings)
      .select("title,description,keywords,og_title,og_description,og_image_url,canonical_url,robots_meta,json_ld")
      .eq("page_path", pagePath)
      .eq("lang_code", lang)
      .eq("is_active", true)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setSeo(data as DbSeo);
      });
  }, [pagePath, lang]);
  return seo;
}

/**
 * Per-page SEO: sets document title, meta description, keywords, Open Graph,
 * canonical, hreflang alternates, robots, and optional JSON-LD.
 * If a matching record exists in Supabase kidami_seo_settings, it overrides
 * the hard-coded fallback values.
 */
export function useSeo({ title, description, path, jsonLd, keywords, ogImage, robots, canonical }: SeoOptions) {
  const pagePath = stripLang(path) || "/";
  const lang = (path.split("/")[1] && langCodes.includes(path.split("/")[1] as any) ? path.split("/")[1] : "en") as string;
  const db = useDbSeo(pagePath, lang);

  const finalTitle = db?.title || title;
  const finalDesc = db?.description || description;
  const finalKeywords = db?.keywords?.join(", ") || keywords?.join(", ") || "";
  const finalOgTitle = db?.og_title || finalTitle;
  const finalOgDesc = db?.og_description || finalDesc;
  const finalOgImage = db?.og_image_url || ogImage || "https://kidami-ent.com/og-image.jpg";
  const finalCanonical = db?.canonical_url || canonical || `${BASE_URL}${path}`;
  const finalRobots = db?.robots_meta || robots || "index, follow";
  const finalJsonLd = db?.json_ld || jsonLd;

  useEffect(() => {
    document.title = `${finalTitle} | ${SITE}`;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        const [kind, name] = selector.replace(/[[\]"]/g, "").split("=");
        el.setAttribute(kind, name);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", finalDesc);
    if (finalKeywords) setMeta('meta[name="keywords"]', "content", finalKeywords);
    setMeta('meta[property="og:title"]', "content", `${finalOgTitle} | ${SITE}`);
    setMeta('meta[property="og:description"]', "content", finalOgDesc);
    setMeta('meta[property="og:url"]', "content", `${BASE_URL}${path}`);
    setMeta('meta[property="og:image"]', "content", finalOgImage);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[name="robots"]', "content", finalRobots);
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = finalCanonical;

    // hreflang: one alternate per language + x-default (English)
    document.head
      .querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]')
      .forEach((el) => el.remove());
    const basePath = stripLang(path);
    const addAlt = (hreflang: string, href: string) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = hreflang;
      link.href = href;
      document.head.appendChild(link);
    };
    for (const code of langCodes) {
      addAlt(code, `${BASE_URL}${withLang(basePath, code)}`);
    }
    addAlt("x-default", `${BASE_URL}${basePath}`);

    let ld = document.getElementById("page-jsonld") as HTMLScriptElement | null;
    if (finalJsonLd) {
      if (!ld) {
        ld = document.createElement("script");
        ld.type = "application/ld+json";
        ld.id = "page-jsonld";
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify(finalJsonLd);
    } else if (ld) {
      ld.remove();
    }
  }, [finalTitle, finalDesc, path, finalJsonLd, finalKeywords, finalOgImage, finalCanonical, finalRobots, finalOgTitle, finalOgDesc]);
}
