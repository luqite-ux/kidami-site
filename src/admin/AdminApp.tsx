import { useState } from "react";
import {
  useProducts,
  useArticles,
  useReviews,
  useSeoSettings,
  useGeoSettings,
  useSiteSettings,
  type Product,
  type Article,
  type SeoSetting,
  type GeoSetting,
} from "./hooks/useAdminData";
import { langCodes, langNames } from "../i18n/core";

// 管理员密码 — 生产环境请通过 .env 设置
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "kidami2024";

type Tab = "products" | "articles" | "reviews" | "seo" | "geo" | "settings";

const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: "products", label: "产品管理", icon: "🚗" },
  { key: "articles", label: "文章管理", icon: "📝" },
  { key: "reviews", label: "评论审核", icon: "⭐" },
  { key: "seo", label: "SEO 设置", icon: "🔍" },
  { key: "geo", label: "GEO 设置", icon: "📍" },
  { key: "settings", label: "站点设置", icon: "⚙️" },
];

export default function AdminApp() {
  const [activeTab, setActiveTab] = useState<Tab>("products");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("kidami_admin") === "1";
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("kidami_admin", "1");
      setIsLoggedIn(true);
    } else {
      setError("密码错误，请重试");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("kidami_admin");
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
          {activeTab === "settings" && <SettingsPanel />}
        </div>
      </main>
    </div>
  );
}

// ======== 产品管理 ========
function ProductsPanel() {
  const { data: products, loading, create, update, remove } = useProducts();
  const [editing, setEditing] = useState<Partial<Product> | null>(null);

  const handleSave = async () => {
    if (!editing) return;
    if (editing.id) {
      await update(editing.id, editing);
    } else {
      await create(editing as Omit<Product, "id">);
    }
    setEditing(null);
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

// ======== 站点设置 ========
function SettingsPanel() {
  const { data, update } = useSiteSettings();

  return (
    <div className="space-y-4">
      {Object.entries(data).map(([key, value]) => (
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
