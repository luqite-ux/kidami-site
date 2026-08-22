import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase, TABLES } from "../lib/supabase";

function sessionId(): string {
  const key = "kidami_sid";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

function classifySource(referrer: string, utmSource: string): string {
  if (utmSource) {
    const u = utmSource.toLowerCase();
    if (u.includes("google")) return "Google / Ads";
    if (u.includes("facebook") || u === "fb") return "Facebook";
    if (u.includes("instagram") || u === "ig") return "Instagram";
    if (u.includes("tiktok")) return "TikTok";
    if (u.includes("amazon")) return "Amazon";
    if (u.includes("walmart")) return "Walmart";
    return utmSource;
  }
  if (!referrer) return "直接访问";
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (host.includes("kidami-ent.com") || host.includes("vercel.app")) return "站内跳转";
    if (host.includes("google.")) return "Google 搜索";
    if (host.includes("bing.")) return "Bing 搜索";
    if (host.includes("baidu.")) return "百度搜索";
    if (host.includes("yahoo.")) return "Yahoo 搜索";
    if (host.includes("facebook.") || host.includes("fb.")) return "Facebook";
    if (host.includes("instagram.") || host.includes("l.instagram")) return "Instagram";
    if (host.includes("tiktok.") || host.includes("t.co")) return host.includes("tiktok") ? "TikTok" : "Twitter / X";
    if (host.includes("youtube.") || host.includes("youtu.be")) return "YouTube";
    if (host.includes("amazon.")) return "Amazon";
    if (host.includes("walmart.")) return "Walmart";
    return host;
  } catch {
    return "其他";
  }
}

export function VisitTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.pathname.includes("admin")) return;

    const params = new URLSearchParams(location.search);
    const utm_source = params.get("utm_source") || "";
    const utm_medium = params.get("utm_medium") || "";
    const utm_campaign = params.get("utm_campaign") || "";
    const referrer = document.referrer || "";
    const path = (location.pathname + location.search).slice(0, 240);

    const t = window.setTimeout(() => {
      void supabase.from(TABLES.visits).insert({
        path,
        referrer: referrer.slice(0, 400),
        source: classifySource(referrer, utm_source),
        utm_source,
        utm_medium,
        utm_campaign,
        session_id: sessionId(),
      });
    }, 400);

    return () => window.clearTimeout(t);
  }, [location.pathname, location.search]);

  return null;
}
