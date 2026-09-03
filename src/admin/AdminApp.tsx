import { useState } from "react";
import {
  useProducts,
  useArticles,
  useReviews,
  useSeoSettings,
  useGeoSettings,
  useSiteSettings,
  useVisits,
  type Product,
  type Article,
  type SeoSetting,
  type GeoSetting,
} from "./hooks/useAdminData";
import { langCodes, langNames } from "../i18n/core";
import { supabase, TABLES } from "../lib/supabase";
import { uploadPublicImage } from "../lib/uploadImage";
import {
  isAdminSession,
  passwordMatches,
  setAdminSession,
  setLocalPasswordHash,
  getLocalPasswordHash,
  SETTINGS_KEY,
  sha256,
} from "./auth";

type Tab = "products" | "articles" | "reviews" | "seo" | "geo" | "stats" | "settings" | "password";

const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: "products", label: "产品管理", icon: "🚗" },
  { key: "articles", label: "文章管理", icon: "📝" },
  { key: "reviews", label: "评论审核", icon: "⭐" },
  { key: "seo", label: "SEO 设置", icon: "🔍" },
  { key: "geo", label: "GEO 设置", icon: "📍" },
  { key: "stats", label: "访问统计", icon: "📊" },
  { key: "settings", label: "站点设置", icon: "⚙️" },
  { key: "password", label: "修改密码", icon: "🔐" },
];

export default function AdminApp() {
  const [activeTab, setActiveTab] = useState<Tab>("products");
  const [isLoggedIn, setIsLoggedIn] = useState(() => isAdminSession());
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { data: res } = await supabase
      .from(TABLES.siteSettings)
      .select("value")
      .eq("key", SETTINGS_KEY)
      .maybeSingle();
    const storedHash = res?.value || getLocalPasswordHash();
    if (await passwordMatches(password, storedHash)) {
      if (storedHash) setLocalPasswordHash(storedHash);
      setAdminSession(true);
      setIsLoggedIn(true);
    } else {
      setError("密码错误，请重试");
    }
  };

  const handleLogout = () => {
    setAdminSession(false);
    setIsLoggedIn(false);
    setPassword("");
  };

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-sand">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lift">
          <div className="text-center">
            <img src="/logo.png" alt="KIDAMI" className="mx-auto h-16 w-auto" />
            <h1 className="mt-4 font-display text-2xl font-extrabold text-brand-navy">KIDAMI 管理后台</h1>
            <p className="mt-1 text-sm text-brand-navy/50">请输入密码进入管理</p>
          </div>
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="text-sm font-extrabold text-brand-navy">密码</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-brand-navy/10 bg-white px-4 py-3 text-sm focus:border-brand-blue focus:outline-none"
                placeholder="请输入管理员密码"
                autoFocus
              />
            </div>
            {error && <p className="text-sm font-bold text-red-500">{error}</p>}
            <button type="submit" className="w-full rounded-full bg-brand-navy py-3 font-display font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5">
              登录
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-brand-sand">
      <aside className="w-64 shrink-0 bg-brand-navy text-white">
        <div className="p-6">
          <img src="/logo.png" alt="KIDAMI" className="h-12 w-auto" />
          <p className="mt-2 text-xs text-white/50">管理控制台</p>
        </div>
        <nav className="px-3 pb-6">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition-colors ${
                activeTab === t.key ? "bg-brand-blue text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-white/10 px-6 py-4">
          <button onClick={handleLogout}
            className="text-sm font-bold text-white/50 hover:text-white">退出登录</button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-8 font-display text-3xl font-extrabold text-brand-navy">
            {tabs.find((t) => t.key === activeTab)?.label}
          </h1>
          {activeTab === "products" && <ProductsPanel />}
          {activeTab === "articles" && <ArticlesPanel />}
          {activeTab === "reviews" && <ReviewsPanel />}
          {activeTab === "seo" && <SeoPanel />}
          {activeTab === "geo" && <GeoPanel />}
          {activeTab === "stats" && <StatsPanel />}
          {activeTab === "settings" && <SettingsPanel />}
          {activeTab === "password" && <PasswordPanel />}
        </div>
      </main>
    </div>
  );
}

// ======== 产品管理 ========
function ProductsPanel() {
  const { data: products, loading, create, update, remove } = useProducts();
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");

  const handleSave = async () => {
    if (!editing) return;
    if (editing.id) {
      await update(editing.id, editing);
    } else {
      await create(editing as Omit<Product, "id">);
    }
    setEditing(null);
  };

  const handleImageUpload = async (file: File | undefined) => {
    if (!file || !editing) return;
    setUploading(true);
    setUploadMsg("");
    const { url, error } = await uploadPublicImage(file, "products");
    setUploading(false);
    if (error || !url) {
      setUploadMsg(error || "上传失败。请确认 Supabase 已创建公开桶 kidami-assets。");
      return;
    }
    setEditing({ ...editing, image_url: url });
    setUploadMsg("上传成功");
  };

  if (loading) return <p className="text-brand-navy/50">加载中...</p>;

  return (
    <div className="space-y-6">
      <button onClick={() => setEditing({ slug: "", name: "", category: "cars", skills: [], age: "3+", tagline: "", keywords: [], price_hint: "", image_url: "", rating: 0, review_count: 0, features: [], specs: [], education: "", amazon_url: "", walmart_url: "", is_active: true, sort_order: 0 })}
        className="rounded-full bg-brand-orange px-6 py-2.5 font-bold text-white shadow-soft hover:-translate-y-0.5 transition-transform">
        + 新建产品
      </button>

      {editing && (
        <div className="rounded-3xl bg-white p-6 shadow-soft space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input placeholder="URL 标识 (slug)" value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              className="rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
            <input placeholder="产品名称" value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              className="rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
            <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value as "cars" | "games" })}
              className="rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none">
              <option value="cars">玩具车</option>
              <option value="games">桌游</option>
            </select>
            <input placeholder="适用年龄" value={editing.age || ""} onChange={(e) => setEditing({ ...editing, age: e.target.value })}
              className="rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
            <input placeholder="价格提示" value={editing.price_hint || ""} onChange={(e) => setEditing({ ...editing, price_hint: e.target.value })}
              className="rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
            <input placeholder="图片 URL" value={editing.image_url || ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
              className="rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
          </div>

          <div className="rounded-2xl border border-dashed border-brand-navy/20 bg-brand-cream/60 p-4">
            <p className="text-sm font-bold text-brand-navy">上传商品照片</p>
            <p className="mt-1 text-xs text-brand-navy/50">支持 JPG / PNG / WEBP。上传后会自动填入图片 URL。</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <label className="cursor-pointer rounded-full bg-brand-blue px-5 py-2.5 text-sm font-bold text-white shadow-soft">
                {uploading ? "上传中…" : "选择本地图片"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => handleImageUpload(e.target.files?.[0])}
                />
              </label>
              {editing.image_url && (
                <img src={editing.image_url} alt="预览" className="h-16 w-16 rounded-xl object-cover border border-brand-navy/10" />
              )}
              {uploadMsg && <span className="text-xs font-bold text-brand-navy/60">{uploadMsg}</span>}
            </div>
          </div>

          <textarea placeholder="一句话简介" value={editing.tagline || ""} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })}
            className="w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" rows={2} />
          <div className="flex gap-3">
            <button onClick={handleSave} className="rounded-full bg-brand-navy px-6 py-2.5 font-bold text-white">保存</button>
            <button onClick={() => setEditing(null)} className="rounded-full border border-brand-navy/20 px-6 py-2.5 font-bold text-brand-navy">取消</button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {products.map((p) => (
          <div key={p.id} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-soft">
            <img src={p.image_url} alt={p.name} className="h-16 w-16 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-brand-navy truncate">{p.name}</p>
              <p className="text-sm text-brand-navy/50">{p.category === "cars" ? "玩具车" : "桌游"} · {p.age} · {p.price_hint} · ★{p.rating}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(p)} className="rounded-full bg-brand-sky px-4 py-2 text-xs font-bold text-brand-navy">编辑</button>
              <button onClick={() => remove(p.id)} className="rounded-full bg-red-100 px-4 py-2 text-xs font-bold text-red-600">删除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ======== 文章管理 ========
function ArticlesPanel() {
  const { data: articles, loading, create, update, remove } = useArticles();
  const [editing, setEditing] = useState<Partial<Article> | null>(null);

  const handleSave = async () => {
    if (!editing) return;
    if (editing.id) await update(editing.id, editing);
    else await create(editing as Omit<Article, "id">);
    setEditing(null);
  };

  if (loading) return <p className="text-brand-navy/50">加载中...</p>;

  return (
    <div className="space-y-6">
      <button onClick={() => setEditing({ slug: "", title: "", category: "", minutes: 5, excerpt: "", content: "", image_url: "", is_published: false })}
        className="rounded-full bg-brand-orange px-6 py-2.5 font-bold text-white shadow-soft hover:-translate-y-0.5 transition-transform">
        + 新建文章
      </button>

      {editing && (
        <div className="rounded-3xl bg-white p-6 shadow-soft space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input placeholder="URL 标识 (slug)" value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              className="rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
            <input placeholder="标题" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className="rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
            <input placeholder="分类" value={editing.category || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })}
              className="rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
            <input placeholder="图片 URL" value={editing.image_url || ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
              className="rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
          </div>
          <textarea placeholder="摘要" value={editing.excerpt || ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
            className="w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" rows={2} />
          <label className="flex items-center gap-2 text-sm font-bold text-brand-navy">
            <input type="checkbox" checked={editing.is_published || false} onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })} />
            已发布
          </label>
          <div className="flex gap-3">
            <button onClick={handleSave} className="rounded-full bg-brand-navy px-6 py-2.5 font-bold text-white">保存</button>
            <button onClick={() => setEditing(null)} className="rounded-full border border-brand-navy/20 px-6 py-2.5 font-bold text-brand-navy">取消</button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {articles.map((a) => (
          <div key={a.id} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-soft">
            <div className="flex-1 min-w-0">
              <p className="font-bold text-brand-navy truncate">{a.title}</p>
              <p className="text-sm text-brand-navy/50">{a.category} · {a.minutes} 分钟阅读 · {a.is_published ? "✅ 已发布" : "📝 草稿"}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(a)} className="rounded-full bg-brand-sky px-4 py-2 text-xs font-bold text-brand-navy">编辑</button>
              <button onClick={() => remove(a.id)} className="rounded-full bg-red-100 px-4 py-2 text-xs font-bold text-red-600">删除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ======== 评论审核 ========
function ReviewsPanel() {
  const { data: reviews, loading, update } = useReviews();

  const toggleApproval = async (id: string, current: boolean) => {
    await update(id, { is_approved: !current });
  };

  if (loading) return <p className="text-brand-navy/50">加载中...</p>;

  return (
    <div className="grid gap-4">
      {reviews.map((r) => (
        <div key={r.id} className="rounded-2xl bg-white p-5 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-bold text-brand-navy">{r.name} <span className="text-brand-orange">{'★'.repeat(r.stars)}</span></p>
              <p className="text-sm text-brand-navy/50">{r.source} · {r.product_name}</p>
              <p className="mt-2 text-sm text-brand-navy/70">"{r.text}"</p>
            </div>
            <button onClick={() => toggleApproval(r.id, r.is_approved)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold ${
                r.is_approved ? "bg-brand-mint text-brand-green" : "bg-yellow-100 text-yellow-700"
              }`}>
              {r.is_approved ? "✅ 已通过" : "⏳ 待审核"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ======== SEO 设置 ========
const emptySeo: Partial<SeoSetting> = {
  page_path: "/",
  lang_code: "en",
  title: "",
  description: "",
  keywords: [],
  og_title: "",
  og_description: "",
  og_image_url: "",
  canonical_url: "",
  robots_meta: "index, follow",
  priority: 0.5,
  changefreq: "weekly",
  is_active: true,
  json_ld: null,
};

const CHANGEFREQ_OPTIONS = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];
const ROBOTS_OPTIONS = ["index, follow", "noindex, follow", "index, nofollow", "noindex, nofollow", "index, follow, noarchive"];

function TagInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");
  const add = (text: string) => {
    const t = text.trim();
    if (t && !value.includes(t)) onChange([...value, t]);
    setInput("");
  };
  return (
    <div className="w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus-within:border-brand-blue">
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-brand-sky px-2.5 py-1 text-xs font-bold text-brand-navy">
            {tag}
            <button onClick={() => onChange(value.filter((v) => v !== tag))} className="text-brand-navy/50 hover:text-red-500">×</button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              add(input);
            }
          }}
          onBlur={() => add(input)}
          placeholder={value.length === 0 ? placeholder : ""}
          className="min-w-[120px] flex-1 bg-transparent py-1 text-sm outline-none"
        />
      </div>
    </div>
  );
}

function SeoPanel() {
  const { data: settings, loading, create, update, remove } = useSeoSettings();
  const [editing, setEditing] = useState<Partial<SeoSetting> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleSave = async () => {
    if (!editing) return;
    if (isNew || !editing.id) {
      await create(editing as Omit<SeoSetting, "id">);
    } else {
      await update(editing.id, editing);
    }
    setEditing(null);
    setIsNew(false);
  };

  const startNew = () => {
    setEditing({ ...emptySeo });
    setIsNew(true);
  };

  const startEdit = (s: SeoSetting) => {
    setEditing({ ...s });
    setIsNew(false);
  };

  if (loading) return <p className="text-brand-navy/50">加载中...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={startNew}
          className="rounded-full bg-brand-orange px-6 py-2.5 font-bold text-white shadow-soft hover:-translate-y-0.5 transition-transform">
          + 新建 SEO 设置
        </button>
        <p className="text-sm text-brand-navy/50">共 {settings.length} 条 SEO 记录</p>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-3xl max-h-[92vh] overflow-auto rounded-3xl bg-white p-6 shadow-lift space-y-4">
            <h2 className="font-display text-xl font-bold text-brand-navy">
              {isNew ? "新建 SEO 设置" : `编辑 SEO: ${editing.page_path}`}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/50">页面路径</label>
                <input value={editing.page_path || ""} onChange={(e) => setEditing({ ...editing, page_path: e.target.value })}
                  className="mt-1 w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" placeholder="/ 或 /products" />
              </div>
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/50">语言</label>
                <select value={editing.lang_code || "en"} onChange={(e) => setEditing({ ...editing, lang_code: e.target.value })}
                  className="mt-1 w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none">
                  {langCodes.map((code) => (
                    <option key={code} value={code}>{langNames[code as keyof typeof langNames]} ({code})</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/50">页面标题 (Title)</label>
              <input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="mt-1 w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
            </div>

            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/50">页面描述 (Description)</label>
              <textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="mt-1 w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" rows={3} />
            </div>

            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/50">关键词 <span className="font-normal normal-case text-brand-navy/30">— 按回车或逗号添加</span></label>
              <div className="mt-1">
                <TagInput value={editing.keywords || []} onChange={(v) => setEditing({ ...editing, keywords: v })} placeholder="如：玩具车, 合金车, ..." />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/50">OG 标题</label>
                <input value={editing.og_title || ""} onChange={(e) => setEditing({ ...editing, og_title: e.target.value })}
                  className="mt-1 w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
              </div>
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/50">OG 描述</label>
                <input value={editing.og_description || ""} onChange={(e) => setEditing({ ...editing, og_description: e.target.value })}
                  className="mt-1 w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/50">OG 图片 URL</label>
                <input value={editing.og_image_url || ""} onChange={(e) => setEditing({ ...editing, og_image_url: e.target.value })}
                  className="mt-1 w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
              </div>
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/50">Canonical URL</label>
                <input value={editing.canonical_url || ""} onChange={(e) => setEditing({ ...editing, canonical_url: e.target.value })}
                  className="mt-1 w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" placeholder="留空则自动生成" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/50">Robots Meta</label>
                <select value={editing.robots_meta || "index, follow"} onChange={(e) => setEditing({ ...editing, robots_meta: e.target.value })}
                  className="mt-1 w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none">
                  {ROBOTS_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/50">优先级: {(editing.priority ?? 0.5).toFixed(1)}</label>
                <input type="range" min={0} max={1} step={0.1} value={editing.priority ?? 0.5}
                  onChange={(e) => setEditing({ ...editing, priority: parseFloat(e.target.value) })}
                  className="mt-3 w-full accent-brand-blue" />
              </div>
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/50">更新频率</label>
                <select value={editing.changefreq || "weekly"} onChange={(e) => setEditing({ ...editing, changefreq: e.target.value })}
                  className="mt-1 w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none">
                  {CHANGEFREQ_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <label className="flex items-center gap-3 text-sm font-bold text-brand-navy">
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-brand-navy/10 transition-colors"
                onClick={() => setEditing({ ...editing, is_active: !editing.is_active })}
                style={{ backgroundColor: editing.is_active ? "#2e6bf0" : undefined }}>
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${editing.is_active ? "translate-x-5" : "translate-x-0.5"}`} />
              </div>
              {editing.is_active ? "已启用" : "已禁用"}
            </label>

            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/50">JSON-LD 结构化数据</label>
              <textarea value={editing.json_ld ? JSON.stringify(editing.json_ld, null, 2) : ""}
                onChange={(e) => {
                  try {
                    const parsed = e.target.value.trim() ? JSON.parse(e.target.value) : null;
                    setEditing({ ...editing, json_ld: parsed });
                  } catch {
                    setEditing({ ...editing, json_ld: e.target.value as any });
                  }
                }}
                className="mt-1 w-full rounded-2xl border border-brand-navy/10 bg-brand-ink px-4 py-3 font-mono text-xs text-green-400 focus:border-brand-blue focus:outline-none"
                rows={8} placeholder='{ "@context": "https://schema.org", ... }' />
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} className="rounded-full bg-brand-navy px-6 py-2.5 font-bold text-white">保存</button>
              <button onClick={() => { setEditing(null); setIsNew(false); }} className="rounded-full border border-brand-navy/20 px-6 py-2.5 font-bold text-brand-navy">取消</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {settings.map((s) => (
          <div key={s.id} className="rounded-2xl bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider ${s.is_active ? "bg-brand-mint text-brand-green" : "bg-gray-100 text-gray-500"}`}>
                  {s.is_active ? "已启用" : "已禁用"}
                </span>
                <p className="font-bold text-brand-navy">{s.page_path} <span className="text-brand-navy/40">({s.lang_code})</span></p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(s)} className="rounded-full bg-brand-sky px-4 py-2 text-xs font-bold text-brand-navy">编辑</button>
                <button onClick={() => remove(s.id)} className="rounded-full bg-red-100 px-4 py-2 text-xs font-bold text-red-600">删除</button>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <p className="text-sm text-brand-navy/70 font-bold truncate">{s.title}</p>
              <p className="text-sm text-brand-navy/50 truncate">{s.description}</p>
              <p className="text-xs text-brand-navy/40">Robots: {s.robots_meta} · 优先级: {s.priority} · 频率: {s.changefreq}</p>
              <div className="flex flex-wrap gap-1">
                {(s.keywords || []).slice(0, 6).map((k) => (
                  <span key={k} className="rounded-full bg-brand-sky/50 px-2 py-0.5 text-[10px] font-bold text-brand-navy">{k}</span>
                ))}
                {(s.keywords || []).length > 6 && <span className="text-[10px] text-brand-navy/30">+{(s.keywords || []).length - 6}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ======== GEO 设置 ========
type GeoSection = "organization" | "localBusiness" | "hreflang";

function GeoPanel() {
  const { data, loading, update, create } = useGeoSettings();
  const [activeSection, setActiveSection] = useState<GeoSection>("organization");

  const getItem = (key: string) => data.find((d) => d.key === key);

  if (loading) return <p className="text-brand-navy/50">加载中...</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(["organization", "localBusiness", "hreflang"] as GeoSection[]).map((s) => (
          <button key={s} onClick={() => setActiveSection(s)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
              activeSection === s ? "bg-brand-navy text-white shadow-soft" : "bg-white text-brand-navy/60 hover:text-brand-navy"
            }`}>
            {s === "organization" ? "🏢 组织机构" : s === "localBusiness" ? "🏪 本地商家" : "🌐 Hreflang"}
          </button>
        ))}
      </div>

      {activeSection === "organization" && (
        <OrganizationEditor item={getItem("organization")} onSave={(v) => {
          const existing = getItem("organization");
          if (existing) update("organization", v);
          else create({ key: "organization", value: v, description: "Organization structured data for Schema.org" });
        }} />
      )}
      {activeSection === "localBusiness" && (
        <LocalBusinessEditor item={getItem("localBusiness")} onSave={(v) => {
          const existing = getItem("localBusiness");
          if (existing) update("localBusiness", v);
          else create({ key: "localBusiness", value: v, description: "LocalBusiness structured data for Schema.org" });
        }} />
      )}
      {activeSection === "hreflang" && (
        <HreflangEditor item={getItem("hreflang")} onSave={(v) => {
          const existing = getItem("hreflang");
          if (existing) update("hreflang", v);
          else create({ key: "hreflang", value: v, description: "Hreflang alternate URLs for multilingual SEO" });
        }} />
      )}
    </div>
  );
}

function OrganizationEditor({ item, onSave }: { item?: GeoSetting; onSave: (v: Record<string, unknown>) => void }) {
  const val = (item?.value ?? {}) as Record<string, unknown>;
  const [form, setForm] = useState({
    name: (val.name as string) || "KIDAMI",
    url: (val.url as string) || "https://kidami-ent.com",
    logo: (val.logo as string) || "https://kidami-ent.com/logo.png",
    slogan: (val.slogan as string) || "",
    description: (val.description as string) || "",
    foundingDate: (val.foundingDate as string) || "2016",
    sameAs: ((val.sameAs as string[]) || []).join("\n"),
    contactEmail: ((val.contactPoint as Record<string, string>)?.email as string) || "",
    contactPhone: ((val.contactPoint as Record<string, string>)?.telephone as string) || "",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const sameAs = form.sameAs.split("\n").map((s) => s.trim()).filter(Boolean);
    onSave({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: form.name,
      url: form.url,
      logo: form.logo,
      slogan: form.slogan || undefined,
      description: form.description || undefined,
      foundingDate: form.foundingDate || undefined,
      sameAs: sameAs.length ? sameAs : undefined,
      contactPoint: form.contactEmail || form.contactPhone
        ? { "@type": "ContactPoint", email: form.contactEmail || undefined, telephone: form.contactPhone || undefined }
        : undefined,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-soft space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-brand-navy">组织机构 Schema (Organization)</h3>
        {saved && <span className="rounded-full bg-brand-mint px-3 py-1 text-xs font-bold text-brand-green">已保存!</span>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="名称" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Field label="网址" value={form.url} onChange={(v) => setForm({ ...form, url: v })} />
        <Field label="Logo URL" value={form.logo} onChange={(v) => setForm({ ...form, logo: v })} />
        <Field label="成立日期" value={form.foundingDate} onChange={(v) => setForm({ ...form, foundingDate: v })} />
        <Field label="口号" value={form.slogan} onChange={(v) => setForm({ ...form, slogan: v })} />
      </div>
      <div>
        <label className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/50">描述</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="mt-1 w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" rows={3} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="联系邮箱" value={form.contactEmail} onChange={(v) => setForm({ ...form, contactEmail: v })} />
        <Field label="联系电话" value={form.contactPhone} onChange={(v) => setForm({ ...form, contactPhone: v })} />
      </div>
      <div>
        <label className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/50">社交主页 (SameAs) <span className="font-normal normal-case text-brand-navy/30">— 每行一个链接</span></label>
        <textarea value={form.sameAs} onChange={(e) => setForm({ ...form, sameAs: e.target.value })}
          className="mt-1 w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" rows={4} placeholder="https://facebook.com/...&#10;https://instagram.com/..." />
      </div>
      <button onClick={handleSave} className="rounded-full bg-brand-navy px-6 py-2.5 font-bold text-white">保存组织机构</button>
    </div>
  );
}

function LocalBusinessEditor({ item, onSave }: { item?: GeoSetting; onSave: (v: Record<string, unknown>) => void }) {
  const val = (item?.value ?? {}) as Record<string, unknown>;
  const addr = (val.address as Record<string, string>) || {};
  const [form, setForm] = useState({
    type: (val["@type"] as string) || "ToyStore",
    description: (val.description as string) || "",
    telephone: (val.telephone as string) || "",
    email: (val.email as string) || "",
    priceRange: (val.priceRange as string) || "$$",
    paymentAccepted: (val.paymentAccepted as string) || "Cash, Credit Card, PayPal",
    currenciesAccepted: (val.currenciesAccepted as string) || "USD",
    street: addr.streetAddress || "",
    city: addr.addressLocality || "",
    state: addr.addressRegion || "",
    zip: addr.postalCode || "",
    country: addr.addressCountry || "US",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave({
      "@context": "https://schema.org",
      "@type": form.type,
      description: form.description || undefined,
      telephone: form.telephone || undefined,
      email: form.email || undefined,
      priceRange: form.priceRange || undefined,
      paymentAccepted: form.paymentAccepted || undefined,
      currenciesAccepted: form.currenciesAccepted || undefined,
      address: {
        "@type": "PostalAddress",
        streetAddress: form.street || undefined,
        addressLocality: form.city || undefined,
        addressRegion: form.state || undefined,
        postalCode: form.zip || undefined,
        addressCountry: form.country || undefined,
      },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-soft space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-brand-navy">本地商家 Schema (LocalBusiness)</h3>
        {saved && <span className="rounded-full bg-brand-mint px-3 py-1 text-xs font-bold text-brand-green">已保存!</span>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/50">商家类型</label>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="mt-1 w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none">
            {["ToyStore", "Store", "OnlineStore", "Organization", "LocalBusiness"].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <Field label="价格区间" value={form.priceRange} onChange={(v) => setForm({ ...form, priceRange: v })} />
        <Field label="电话" value={form.telephone} onChange={(v) => setForm({ ...form, telephone: v })} />
        <Field label="邮箱" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
        <Field label="支付方式" value={form.paymentAccepted} onChange={(v) => setForm({ ...form, paymentAccepted: v })} />
        <Field label="接受货币" value={form.currenciesAccepted} onChange={(v) => setForm({ ...form, currenciesAccepted: v })} />
      </div>
      <div>
        <label className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/50">描述</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="mt-1 w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" rows={3} />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="街道地址" value={form.street} onChange={(v) => setForm({ ...form, street: v })} />
        <Field label="城市" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
        <Field label="州/省" value={form.state} onChange={(v) => setForm({ ...form, state: v })} />
        <Field label="邮编" value={form.zip} onChange={(v) => setForm({ ...form, zip: v })} />
        <Field label="国家" value={form.country} onChange={(v) => setForm({ ...form, country: v })} />
      </div>
      <button onClick={handleSave} className="rounded-full bg-brand-navy px-6 py-2.5 font-bold text-white">保存本地商家</button>
    </div>
  );
}

function HreflangEditor({ item, onSave }: { item?: GeoSetting; onSave: (v: Record<string, unknown>) => void }) {
  const val = (item?.value ?? {}) as Record<string, Record<string, string>>;
  const [rows, setRows] = useState<{ path: string; langs: Record<string, string> }[]>(() => {
    const entries = Object.entries(val);
    if (entries.length === 0) return [{ path: "/", langs: { en: "https://kidami-ent.com/" } }];
    return entries.map(([path, langs]) => ({ path, langs: { ...langs } }));
  });
  const [saved, setSaved] = useState(false);

  const updateLang = (idx: number, code: string, url: string) => {
    setRows((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], langs: { ...next[idx].langs, [code]: url } };
      return next;
    });
  };

  const addRow = () => setRows([...rows, { path: "/", langs: { en: "" } }]);
  const removeRow = (idx: number) => setRows(rows.filter((_, i) => i !== idx));

  const handleSave = () => {
    const out: Record<string, Record<string, string>> = {};
    rows.forEach((r) => {
      out[r.path] = r.langs;
    });
    onSave(out);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-soft space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-brand-navy">Hreflang 多语言链接</h3>
        {saved && <span className="rounded-full bg-brand-mint px-3 py-1 text-xs font-bold text-brand-green">已保存!</span>}
      </div>
      <p className="text-sm text-brand-navy/50">为每个页面路径配置各语言版本的完整 URL。</p>

      <div className="space-y-4">
        {rows.map((row, idx) => (
          <div key={idx} className="rounded-2xl border border-brand-navy/10 p-4 space-y-3">
            <div className="flex items-center gap-3">
              <input value={row.path} onChange={(e) => {
                const next = [...rows];
                next[idx].path = e.target.value;
                setRows(next);
              }} placeholder="页面路径，如 /products"
                className="flex-1 rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
              <button onClick={() => removeRow(idx)} className="rounded-full bg-red-100 px-3 py-2 text-xs font-bold text-red-600">删除</button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {langCodes.map((code) => (
                <div key={code}>
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-brand-navy/40">{langNames[code]} ({code})</label>
                  <input value={row.langs[code] || ""} onChange={(e) => updateLang(idx, code, e.target.value)}
                    placeholder={`https://kidami-ent.com/${code === "en" ? "" : code + "/"}...`}
                    className="mt-1 w-full rounded-xl border border-brand-navy/10 px-3 py-2 text-xs focus:border-brand-blue focus:outline-none" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={addRow} className="rounded-full bg-brand-sky px-5 py-2 text-sm font-bold text-brand-navy">+ 添加路径</button>
        <button onClick={handleSave} className="rounded-full bg-brand-navy px-6 py-2.5 font-bold text-white">保存 Hreflang</button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/50">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
    </div>
  );
}

function countBy<T>(rows: T[], keyFn: (row: T) => string, limit = 8) {
  const map = new Map<string, number>();
  for (const row of rows) {
    const k = keyFn(row) || "(空)";
    map.set(k, (map.get(k) || 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
}

function StatsPanel() {
  const { rows, loading, error, fetchVisits } = useVisits(30);
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const today = rows.filter((r) => now - new Date(r.created_at).getTime() < day);
  const week = rows.filter((r) => now - new Date(r.created_at).getTime() < 7 * day);
  const sessions = (list: typeof rows) => new Set(list.map((r) => r.session_id).filter(Boolean)).size;
  const sources = countBy(week, (r) => r.source);
  const pages = countBy(week, (r) => r.path);
  const maxSource = sources[0]?.[1] || 1;

  if (loading) return <p className="text-brand-navy/50">加载中...</p>;
  if (error) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <p className="font-extrabold text-brand-navy">统计表尚未创建</p>
        <p className="mt-2 text-sm text-brand-navy/60">
          请到 Supabase → SQL Editor 执行项目里的 <code className="rounded bg-brand-sand px-1">supabase/kidami-visits.sql</code>，然后刷新本页。
        </p>
        <p className="mt-4 text-xs text-red-500">{error}</p>
        <button onClick={fetchVisits} className="mt-6 rounded-full bg-brand-navy px-5 py-2 text-sm font-bold text-white">
          重新加载
        </button>
      </div>
    );
  }

  const cards = [
    { label: "今日浏览", value: today.length },
    { label: "今日访客", value: sessions(today) },
    { label: "近 7 天浏览", value: week.length },
    { label: "近 7 天访客", value: sessions(week) },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-brand-navy/55">统计前台访问次数与来路（不含后台）。数据从接入之日起开始累计。</p>
        <button onClick={fetchVisits} className="rounded-full border border-brand-navy/15 px-4 py-2 text-xs font-extrabold text-brand-navy">
          刷新
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-3xl bg-white p-6 shadow-soft">
            <p className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/40">{c.label}</p>
            <p className="mt-2 font-display text-4xl font-extrabold text-brand-navy">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="font-display text-xl font-extrabold text-brand-navy">访客来路（近 7 天）</h2>
          <p className="mt-1 text-xs text-brand-navy/45">含搜索引擎、社交、广告 UTM 与直接打开</p>
          <ul className="mt-5 space-y-3">
            {sources.length === 0 && <li className="text-sm text-brand-navy/50">暂无数据，有人访问前台后会出现在这里。</li>}
            {sources.map(([name, n]) => (
              <li key={name}>
                <div className="flex items-center justify-between text-sm font-bold text-brand-navy">
                  <span>{name}</span>
                  <span>{n}</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-brand-sand">
                  <div className="h-full rounded-full bg-brand-blue" style={{ width: `${Math.max(8, (n / maxSource) * 100)}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="font-display text-xl font-extrabold text-brand-navy">热门页面（近 7 天）</h2>
          <ul className="mt-5 space-y-2">
            {pages.length === 0 && <li className="text-sm text-brand-navy/50">暂无数据</li>}
            {pages.map(([name, n]) => (
              <li key={name} className="flex items-center justify-between gap-4 rounded-2xl bg-brand-sand px-4 py-2.5 text-sm">
                <span className="truncate font-bold text-brand-navy">{name}</span>
                <span className="shrink-0 font-extrabold text-brand-blue">{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-soft">
        <h2 className="font-display text-xl font-extrabold text-brand-navy">最近访问</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/40">
                <th className="pb-2">时间</th>
                <th className="pb-2">页面</th>
                <th className="pb-2">来路</th>
                <th className="pb-2">UTM</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 20).map((r) => (
                <tr key={r.id} className="border-t border-brand-navy/8">
                  <td className="py-2.5 text-brand-navy/60">{new Date(r.created_at).toLocaleString("zh-CN")}</td>
                  <td className="py-2.5 font-bold text-brand-navy">{r.path}</td>
                  <td className="py-2.5">{r.source}</td>
                  <td className="py-2.5 text-brand-navy/50">{[r.utm_source, r.utm_medium, r.utm_campaign].filter(Boolean).join(" / ") || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ======== 站点设置 ========
function SettingsPanel() {
  const { data, update } = useSiteSettings();
  const visible = Object.entries(data).filter(([key]) => key !== SETTINGS_KEY);

  return (
    <div className="space-y-4">
      {visible.length === 0 && <p className="text-sm text-brand-navy/50">暂无站点配置</p>}
      {visible.map(([key, value]) => (
        <div key={key} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-soft">
          <div className="w-40 shrink-0">
            <p className="text-sm font-bold text-brand-navy">{key.replace(/_/g, " ")}</p>
          </div>
          <input value={value} onChange={(e) => update(key, e.target.value)}
            className="flex-1 rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
        </div>
      ))}
    </div>
  );
}

function PasswordPanel() {
  const { data, upsert } = useSiteSettings();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setOk(false);
    if (next.length < 6) {
      setMessage("新密码至少 6 位");
      return;
    }
    if (next !== confirm) {
      setMessage("两次输入的新密码不一致");
      return;
    }
    const storedHash = data[SETTINGS_KEY] || getLocalPasswordHash();
    if (!(await passwordMatches(current, storedHash))) {
      setMessage("当前密码不正确");
      return;
    }
    setSaving(true);
    const hash = await sha256(next);
    setLocalPasswordHash(hash);
    const synced = await upsert(SETTINGS_KEY, hash);
    setSaving(false);
    setOk(true);
    setCurrent("");
    setNext("");
    setConfirm("");
    setMessage(synced ? "管理员密码已更新，下次登录请使用新密码。" : "密码已在本浏览器更新。若数据库同步失败，其他设备仍可能使用旧密码。");
  };

  return (
    <form onSubmit={handleSave} className="max-w-lg space-y-4 rounded-3xl bg-white p-8 shadow-soft">
      <p className="text-sm leading-relaxed text-brand-navy/60">
        修改后立即生效。请妥善保管新密码；默认初始密码来自环境变量，改过之后以这里保存的为准。
      </p>
      <div>
        <label className="text-sm font-extrabold text-brand-navy">当前密码</label>
        <input
          type="password"
          required
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          className="mt-1 w-full rounded-2xl border border-brand-navy/10 px-4 py-3 text-sm focus:border-brand-blue focus:outline-none"
        />
      </div>
      <div>
        <label className="text-sm font-extrabold text-brand-navy">新密码</label>
        <input
          type="password"
          required
          minLength={6}
          value={next}
          onChange={(e) => setNext(e.target.value)}
          className="mt-1 w-full rounded-2xl border border-brand-navy/10 px-4 py-3 text-sm focus:border-brand-blue focus:outline-none"
          placeholder="至少 6 位"
        />
      </div>
      <div>
        <label className="text-sm font-extrabold text-brand-navy">确认新密码</label>
        <input
          type="password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="mt-1 w-full rounded-2xl border border-brand-navy/10 px-4 py-3 text-sm focus:border-brand-blue focus:outline-none"
        />
      </div>
      {message && (
        <p className={`text-sm font-bold ${ok ? "text-brand-green" : "text-red-500"}`}>{message}</p>
      )}
      <button
        type="submit"
        disabled={saving}
        className="rounded-full bg-brand-navy px-8 py-3 font-display font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {saving ? "保存中..." : "保存新密码"}
      </button>
    </form>
  );
}
