import { createContext, useContext, useEffect, type ReactNode } from "react";
import { Link as RRLink, NavLink as RRNavLink, useLocation, type LinkProps, type NavLinkProps } from "react-router-dom";
import { en, type Dict } from "./en";
import { es } from "./es";
import { pt } from "./pt";
import { fr } from "./fr";
import { ar } from "./ar";
import { de } from "./de";
import { ja } from "./ja";
import { ru } from "./ru";
import { it } from "./it";
import { ko } from "./ko";

export const langCodes = ["en", "es", "pt", "fr", "ar", "de", "ja", "ru", "it", "ko"] as const;
export type LangCode = (typeof langCodes)[number];

export const langNames: Record<LangCode, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
  fr: "Français",
  ar: "العربية",
  de: "Deutsch",
  ja: "日本語",
  ru: "Русский",
  it: "Italiano",
  ko: "한국어",
};

const dictionaries: Record<LangCode, Dict> = { en, es, pt, fr, ar, de, ja, ru, it, ko };

const LangContext = createContext<{ lang: LangCode; d: Dict }>({ lang: "en", d: en });

/** Detect language from the first URL segment and expose the dictionary. */
export function LangProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const seg = location.pathname.split("/")[1] as LangCode;
  const lang: LangCode = (langCodes as readonly string[]).includes(seg) ? seg : "en";
  const d = dictionaries[lang] ?? en;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return <LangContext.Provider value={{ lang, d }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** Strip the language prefix from a pathname ("/es/products" -> "/products"). */
export function stripLang(pathname: string): string {
  const seg = pathname.split("/")[1];
  if ((langCodes as readonly string[]).includes(seg) && seg !== "en") {
    const rest = pathname.slice(seg.length + 1);
    return rest === "" ? "/" : rest;
  }
  return pathname;
}

/** Prefix a path with the current language (no prefix for English). */
export function withLang(path: string, lang: LangCode): string {
  if (lang === "en" || !path.startsWith("/")) return path;
  return `/${lang}${path === "/" ? "" : path}`;
}

/** Language-aware Link — keeps visitors inside their language. */
export function Link({ to, ...rest }: LinkProps) {
  const { lang } = useLang();
  const prefixed = typeof to === "string" ? withLang(to, lang) : to;
  return <RRLink to={prefixed} {...rest} />;
}

/** Language-aware NavLink. */
export function NavLink({ to, ...rest }: NavLinkProps) {
  const { lang } = useLang();
  const prefixed = typeof to === "string" ? withLang(to, lang) : to;
  return <RRNavLink to={prefixed} {...rest} />;
}
