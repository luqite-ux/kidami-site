import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products, skills, audiences, type Audience, type Category, type Skill } from "../data/products";
import { useProducts } from "../hooks/useSupabaseData";
import { ProductCard } from "../components/ProductCard";
import { Icon } from "../components/Icon";
import { useLang, withLang } from "../i18n/core";
import { useSeo } from "../lib/seo";
import { useReveal } from "../lib/reveal";

export function Products() {
  const { lang, d } = useLang();
  const pp = d.productsPage;
  const [params, setParams] = useSearchParams();
  const cat = (params.get("cat") as Category | null) ?? "all";
  const skill = (params.get("skill") as Skill | null) ?? null;
  const q = (params.get("q") ?? "").trim().toLowerCase();
  const forKey = params.get("for") as Audience | null;
  const audience = audiences.find((a) => a.key === forKey) ?? null;
  const audienceCard = audience
    ? d.home.audiences.cards[audiences.findIndex((a) => a.key === audience.key)]
    : null;

  useSeo({
    title: lang === "en" ? "Shop Die Cast Metal Toy Cars & Magnetic Travel Board Games" : pp.title,
    description:
      lang === "en"
        ? "Browse KIDAMI pull back cars with opening doors, 1:64 diecast toy car gift sets (ages 3+) and magnetic travel board games like ludo and snakes and ladders (ages 6+). EN71, ASTM F963 & CPC certified, on Amazon & Walmart."
        : pp.sub,
    path: withLang("/products", lang),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://kidami-ent.com/" },
          { "@type": "ListItem", position: 2, name: "Products", item: "https://kidami-ent.com/products" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "KIDAMI Products",
        itemListElement: products.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          url: `https://kidami-ent.com/products/${p.slug}`,
        })),
      },
    ],
  });
  useReveal();

  const catFilters: { key: Category | "all"; label: string }[] = [
    { key: "all", label: pp.catAll },
    { key: "cars", label: pp.catCars },
    { key: "games", label: pp.catGames },
  ];

  const { products: dbProducts } = useProducts(cat === "all" ? undefined : cat);
  const list = useMemo(
    () =>
      dbProducts.filter((p) => {
        if (skill && !(p.skills || []).includes(skill)) return false;
        if (q) {
          const pd = d.products[p.slug as keyof typeof d.products];
          const haystack = [p.name, p.tagline, pd?.name ?? "", pd?.tagline ?? "", ...(p.keywords ?? [])]
            .join(" ")
            .toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      }),
    [dbProducts, skill, q, d]
  );

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  };

  return (
    <div className="bg-brand-sand pt-28 lg:pt-32">
      {/* audience banner — shown when arriving from a homepage audience card; all products still listed below */}
      {audience && audienceCard && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-white shadow-soft sm:grid-cols-5">
            <img
              src={audience.img}
              alt={audienceCard.name}
              className="h-48 w-full object-cover sm:h-full sm:col-span-2"
            />
            <div className="p-6 sm:col-span-3 sm:p-10">
              <h2 className="font-display text-2xl font-extrabold text-brand-navy sm:text-3xl">
                {audienceCard.name}
              </h2>
              <p className="mt-3 leading-relaxed text-brand-navy/65">{audienceCard.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {audienceCard.points.map((pt) => (
                  <span key={pt} className="inline-flex items-center gap-1.5 rounded-full bg-brand-cream px-3.5 py-1.5 text-xs font-extrabold text-brand-navy/70">
                    <Icon name="check" className="h-3 w-3 text-brand-green" />
                    {pt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl font-extrabold text-brand-navy sm:text-5xl text-balance">
            {pp.title}
          </h1>
          <p className="mt-4 text-lg text-brand-navy/60">{pp.sub}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {[
            { key: "cars" as const, label: pp.catCars, img: "/images/scene-play-indoor.jpg" },
            { key: "games" as const, label: pp.catGames, img: "/images/scene-picnic.jpg" },
          ].map((c) => (
            <button
              key={c.key}
              onClick={() => setParam("cat", cat === c.key ? null : c.key)}
              className={`group overflow-hidden rounded-[2rem] text-left shadow-soft transition-all hover:-translate-y-1 ${
                cat === c.key ? "ring-4 ring-brand-orange" : "bg-white"
              }`}
            >
              <img src={c.img} alt="" className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="bg-white p-5">
                <p className="font-display text-xl font-extrabold text-brand-navy">{c.label}</p>
                <p className="mt-1 text-sm font-bold text-brand-navy/50">{pp.bySkill}</p>
              </div>
            </button>
          ))}
        </div>

        {q && (
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-sky px-4 py-2 text-sm font-extrabold text-brand-navy">
            <Icon name="search" className="h-4 w-4" />
            {pp.resultsFor} “{params.get("q")}”
            <button
              onClick={() => setParam("q", null)}
              aria-label="Clear search"
              className="ml-1 rounded-full px-1 text-brand-navy/40 hover:text-brand-navy"
            >
              ✕
            </button>
          </p>
        )}

        {/* category filter */}
        <div className="mt-10 flex flex-wrap gap-3" role="tablist" aria-label="Product categories">
          {catFilters.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={cat === f.key}
              onClick={() => setParam("cat", f.key === "all" ? null : f.key)}
              className={`rounded-full px-5 py-2.5 text-sm font-extrabold transition-all ${
                cat === f.key
                  ? "bg-brand-navy text-white shadow-soft"
                  : "bg-white text-brand-navy/60 hover:text-brand-navy shadow-xs"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* skill filter */}
        <div className="mt-4 flex flex-wrap items-center gap-3" aria-label="Filter by play skill">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/40">
            {pp.bySkill}
          </span>
          {skills.map((s) => (
            <button
              key={s.key}
              aria-pressed={skill === s.key}
              onClick={() => setParam("skill", skill === s.key ? null : s.key)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-extrabold transition-all ${
                skill === s.key
                  ? "text-white shadow-soft"
                  : "bg-brand-cream text-brand-navy/60 hover:text-brand-navy"
              }`}
              style={skill === s.key ? { backgroundColor: s.color } : undefined}
            >
              <Icon name={s.icon} className="h-3.5 w-3.5" />
              {d.skills[s.key as keyof typeof d.skills].name}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        {list.length === 0 && (
          <p className="mt-16 text-center text-brand-navy/50">{pp.noMatch}</p>
        )}
      </div>
    </div>
  );
}
