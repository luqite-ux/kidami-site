import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products, skills, type Category, type Skill } from "../data/products";
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

  useSeo({
    title: lang === "en" ? "Shop Die Cast Metal Toy Cars & Magnetic Travel Board Games" : pp.title,
    description:
      lang === "en"
        ? "Browse KIDAMI pull back cars with opening doors, 1:64 diecast toy car gift sets (ages 3+) and magnetic travel board games like ludo and snakes and ladders (ages 6+). ASTM F963 & CPC certified, on Amazon & Walmart."
        : pp.sub,
    path: withLang("/products", lang),
  });
  useReveal();

  const catFilters: { key: Category | "all"; label: string }[] = [
    { key: "all", label: pp.catAll },
    { key: "cars", label: pp.catCars },
    { key: "games", label: pp.catGames },
  ];

  const list = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === "all" || p.category === cat) &&
          (!skill || p.skills.includes(skill))
      ),
    [cat, skill]
  );

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  };

  return (
    <div className="bg-brand-sand pt-28 lg:pt-32">
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl font-extrabold text-brand-navy sm:text-5xl text-balance">
            {pp.title}
          </h1>
          <p className="mt-4 text-lg text-brand-navy/60">{pp.sub}</p>
        </div>

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

        <div className="reveal mt-16 flex flex-col items-center gap-4 rounded-[2rem] bg-brand-sky p-8 text-center sm:p-10">
          <Icon name="shield" className="h-8 w-8 text-brand-blue" />
          <h2 className="font-display text-2xl font-extrabold text-brand-navy">{pp.certTitle}</h2>
          <p className="max-w-xl text-sm leading-relaxed text-brand-navy/60">{pp.certText}</p>
        </div>
      </div>
    </div>
  );
}
