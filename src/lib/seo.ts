import { useEffect } from "react";
import { langCodes, stripLang, withLang } from "../i18n/core";

const SITE = "KIDAMI";
const BASE_URL = "https://kidami-ent.com";

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  jsonLd?: object | object[];
}

/**
 * Lightweight per-page SEO: sets document title, meta description,
 * canonical link, full hreflang set (10 languages + x-default)
 * and optional JSON-LD structured data.
 */
export function useSeo({ title, description, path, jsonLd }: SeoOptions) {
  useEffect(() => {
    document.title = `${title} | ${SITE}`;

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

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", `${title} | ${SITE}`);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", `${BASE_URL}${path}`);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${BASE_URL}${path}`;

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
    if (jsonLd) {
      if (!ld) {
        ld = document.createElement("script");
        ld.type = "application/ld+json";
        ld.id = "page-jsonld";
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify(jsonLd);
    } else if (ld) {
      ld.remove();
    }
  }, [title, description, path, jsonLd]);
}
