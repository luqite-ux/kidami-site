import { useState } from "react";
import { useProducts, useArticles, useReviews, useSeoSettings, useGeoSettings, useSiteSettings, type Product, type Article, type SeoSetting } from "./hooks/useAdminData";

// Admin password — change this in production via .env
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "kidami2024";

type Tab = "products" | "articles" | "reviews" | "seo" | "geo" | "settings";

const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: "products", label: "Products", icon: "🚗" },
  { key: "articles", label: "Articles", icon: "📝" },
  { key: "reviews", label: "Reviews", icon: "⭐" },
  { key: "seo", label: "SEO", icon: "🔍" },
  { key: "geo", label: "GEO", icon: "📍" },
  { key: "settings", label: "Settings", icon: "⚙️" },
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
      setError("Incorrect password. Please try again.");
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
            <h1 className="mt-4 font-display text-2xl font-extrabold text-brand-navy">KIDAMI Admin</h1>
            <p className="mt-1 text-sm text-brand-navy/50">Enter password to manage content</p>
          </div>
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="text-sm font-extrabold text-brand-navy">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-brand-navy/10 bg-white px-4 py-3 text-sm focus:border-brand-blue focus:outline-none"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            {error && <p className="text-sm font-bold text-red-500">{error}</p>}
            <button type="submit" className="w-full rounded-full bg-brand-navy py-3 font-display font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5">
              Sign In
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
          <p className="mt-2 text-xs text-white/50">Admin Dashboard</p>
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
            className="text-sm font-bold text-white/50 hover:text-white">Sign Out</button>
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

// ======== PRODUCTS PANEL ========
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

  if (loading) return <p className="text-brand-navy/50">Loading...</p>;

  return (
    <div className="space-y-6">
      <button onClick={() => setEditing({ slug: "", name: "", category: "cars", skills: [], age: "3+", tagline: "", keywords: [], price_hint: "", image_url: "", rating: 0, review_count: 0, features: [], specs: [], education: "", amazon_url: "", walmart_url: "", is_active: true, sort_order: 0 })}
        className="rounded-full bg-brand-orange px-6 py-2.5 font-bold text-white shadow-soft hover:-translate-y-0.5 transition-transform">
        + New Product
      </button>

      {editing && (
        <div className="rounded-3xl bg-white p-6 shadow-soft space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input placeholder="Slug" value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              className="rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
            <input placeholder="Name" value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              className="rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
            <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value as "cars" | "games" })}
              className="rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none">
              <option value="cars">Cars</option>
              <option value="games">Games</option>
            </select>
            <input placeholder="Age" value={editing.age || ""} onChange={(e) => setEditing({ ...editing, age: e.target.value })}
              className="rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
            <input placeholder="Price Hint" value={editing.price_hint || ""} onChange={(e) => setEditing({ ...editing, price_hint: e.target.value })}
              className="rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
            <input placeholder="Image URL" value={editing.image_url || ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
              className="rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
          </div>
          <textarea placeholder="Tagline" value={editing.tagline || ""} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })}
            className="w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" rows={2} />
          <div className="flex gap-3">
            <button onClick={handleSave} className="rounded-full bg-brand-navy px-6 py-2.5 font-bold text-white">Save</button>
            <button onClick={() => setEditing(null)} className="rounded-full border border-brand-navy/20 px-6 py-2.5 font-bold text-brand-navy">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {products.map((p) => (
          <div key={p.id} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-soft">
            <img src={p.image_url} alt={p.name} className="h-16 w-16 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-brand-navy truncate">{p.name}</p>
              <p className="text-sm text-brand-navy/50">{p.category} · {p.age} · {p.price_hint} · ★{p.rating}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(p)} className="rounded-full bg-brand-sky px-4 py-2 text-xs font-bold text-brand-navy">Edit</button>
              <button onClick={() => remove(p.id)} className="rounded-full bg-red-100 px-4 py-2 text-xs font-bold text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ======== ARTICLES PANEL ========
function ArticlesPanel() {
  const { data: articles, loading, create, update, remove } = useArticles();
  const [editing, setEditing] = useState<Partial<Article> | null>(null);

  const handleSave = async () => {
    if (!editing) return;
    if (editing.id) await update(editing.id, editing);
    else await create(editing as Omit<Article, "id">);
    setEditing(null);
  };

  if (loading) return <p className="text-brand-navy/50">Loading...</p>;

  return (
    <div className="space-y-6">
      <button onClick={() => setEditing({ slug: "", title: "", category: "", minutes: 5, excerpt: "", content: "", image_url: "", is_published: false })}
        className="rounded-full bg-brand-orange px-6 py-2.5 font-bold text-white shadow-soft hover:-translate-y-0.5 transition-transform">
        + New Article
      </button>

      {editing && (
        <div className="rounded-3xl bg-white p-6 shadow-soft space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input placeholder="Slug" value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              className="rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
            <input placeholder="Title" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className="rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
            <input placeholder="Category" value={editing.category || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })}
              className="rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
            <input placeholder="Image URL" value={editing.image_url || ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
              className="rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
          </div>
          <textarea placeholder="Excerpt" value={editing.excerpt || ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
            className="w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" rows={2} />
          <label className="flex items-center gap-2 text-sm font-bold text-brand-navy">
            <input type="checkbox" checked={editing.is_published || false} onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })} />
            Published
          </label>
          <div className="flex gap-3">
            <button onClick={handleSave} className="rounded-full bg-brand-navy px-6 py-2.5 font-bold text-white">Save</button>
            <button onClick={() => setEditing(null)} className="rounded-full border border-brand-navy/20 px-6 py-2.5 font-bold text-brand-navy">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {articles.map((a) => (
          <div key={a.id} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-soft">
            <div className="flex-1 min-w-0">
              <p className="font-bold text-brand-navy truncate">{a.title}</p>
              <p className="text-sm text-brand-navy/50">{a.category} · {a.minutes} min read · {a.is_published ? "✅ Published" : "📝 Draft"}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(a)} className="rounded-full bg-brand-sky px-4 py-2 text-xs font-bold text-brand-navy">Edit</button>
              <button onClick={() => remove(a.id)} className="rounded-full bg-red-100 px-4 py-2 text-xs font-bold text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ======== REVIEWS PANEL ========
function ReviewsPanel() {
  const { data: reviews, loading, update } = useReviews();

  const toggleApproval = async (id: string, current: boolean) => {
    await update(id, { is_approved: !current });
  };

  if (loading) return <p className="text-brand-navy/50">Loading...</p>;

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
              {r.is_approved ? "✅ Approved" : "⏳ Pending"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ======== SEO PANEL ========
function SeoPanel() {
  const { data: settings, loading, update } = useSeoSettings();
  const [editing, setEditing] = useState<Partial<SeoSetting> | null>(null);

  const handleSave = async () => {
    if (!editing?.id) return;
    await update(editing.id, editing);
    setEditing(null);
  };

  if (loading) return <p className="text-brand-navy/50">Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {settings.map((s) => (
          <div key={s.id} className="rounded-2xl bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-brand-navy">{s.page_path} ({s.lang_code})</p>
              <button onClick={() => setEditing(s)} className="rounded-full bg-brand-sky px-4 py-2 text-xs font-bold text-brand-navy">Edit</button>
            </div>
            <p className="text-sm text-brand-navy/70 font-bold">{s.title}</p>
            <p className="text-sm text-brand-navy/50">{s.description.slice(0, 120)}...</p>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-auto rounded-3xl bg-white p-6 shadow-lift space-y-4">
            <h2 className="font-display text-xl font-bold text-brand-navy">Edit SEO: {editing.page_path}</h2>
            <input placeholder="Title" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className="w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
            <textarea placeholder="Description" value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              className="w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" rows={3} />
            <input placeholder="OG Image URL" value={editing.og_image_url || ""} onChange={(e) => setEditing({ ...editing, og_image_url: e.target.value })}
              className="w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
            <input placeholder="Robots Meta" value={editing.robots_meta || ""} onChange={(e) => setEditing({ ...editing, robots_meta: e.target.value })}
              className="w-full rounded-2xl border border-brand-navy/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none" />
            <div className="flex gap-3">
              <button onClick={handleSave} className="rounded-full bg-brand-navy px-6 py-2.5 font-bold text-white">Save</button>
              <button onClick={() => setEditing(null)} className="rounded-full border border-brand-navy/20 px-6 py-2.5 font-bold text-brand-navy">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ======== GEO PANEL ========
function GeoPanel() {
  const { data, loading, update } = useGeoSettings();
  const [editing, setEditing] = useState<string | null>(null);
  const [jsonValue, setJsonValue] = useState("");

  const startEdit = (item: typeof data[0]) => {
    setEditing(item.key);
    setJsonValue(JSON.stringify(item.value, null, 2));
  };

  const handleSave = async () => {
    if (!editing) return;
    try {
      const parsed = JSON.parse(jsonValue);
      await update(editing, parsed);
      setEditing(null);
    } catch (e) {
      alert("Invalid JSON: " + (e as Error).message);
    }
  };

  if (loading) return <p className="text-brand-navy/50">Loading...</p>;

  return (
    <div className="space-y-4">
      {data.map((g) => (
        <div key={g.key} className="rounded-2xl bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-bold text-brand-navy">{g.key}</p>
              <p className="text-xs text-brand-navy/40">{g.description}</p>
            </div>
            <button onClick={() => startEdit(g)} className="rounded-full bg-brand-sky px-4 py-2 text-xs font-bold text-brand-navy">Edit JSON</button>
          </div>
          {editing === g.key ? (
            <div className="space-y-3">
              <textarea value={jsonValue} onChange={(e) => setJsonValue(e.target.value)}
                className="w-full rounded-2xl border border-brand-navy/10 bg-brand-ink px-4 py-3 font-mono text-xs text-green-400 focus:border-brand-blue focus:outline-none"
                rows={15} />
              <div className="flex gap-3">
                <button onClick={handleSave} className="rounded-full bg-brand-navy px-6 py-2.5 font-bold text-white">Save</button>
                <button onClick={() => setEditing(null)} className="rounded-full border border-brand-navy/20 px-6 py-2.5 font-bold text-brand-navy">Cancel</button>
              </div>
            </div>
          ) : (
            <pre className="rounded-xl bg-brand-ink p-4 font-mono text-xs text-green-400 overflow-auto max-h-64">
              {JSON.stringify(g.value, null, 2)}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
}

// ======== SETTINGS PANEL ========
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
