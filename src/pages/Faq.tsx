import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { StoreButtons } from "../components/StoreButtons";
import { useLang, withLang } from "../i18n/core";
import { useSeo } from "../lib/seo";

export function Faq() {
  const { lang, d } = useLang();
  const f = d.faqPage;
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [cat, setCat] = useState(params.get("cat") ?? "all");

  useSeo({
    title: f.title,
    description: f.sub,
    path: withLang("/faq", lang),
  });

  const cats = [
    { key: "all", label: f.catAll },
    ...f.sections.map((s) => ({ key: s.key, label: s.title })),
  ];

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return f.sections
      .filter((s) => cat === "all" || s.key === cat)
      .map((s) => ({
        ...s,
        items: s.items.filter((item) => {
          if (!needle) return true;
          return `${item.q} ${item.a}`.toLowerCase().includes(needle);
        }),
      }))
      .filter((s) => s.items.length > 0);
  }, [f.sections, cat, q]);

  const onSearch = (value: string) => {
    setQ(value);
    const next = new URLSearchParams(params);
    if (value.trim()) next.set("q", value.trim());
    else next.delete("q");
    setParams(next, { replace: true });
  };

  return (
    <div className="bg-brand-sand pt-28 lg:pt-32">
      <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-orange">{f.eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl">{f.title}</h1>
        <p className="mt-4 text-lg text-brand-navy/60">{f.sub}</p>

        <form
          role="search"
          className="mt-8 flex overflow-hidden rounded-full bg-white p-1.5 shadow-soft"
          onSubmit={(e) => e.preventDefault()}
        >
          <Icon name="search" className="ml-4 h-5 w-5 shrink-0 self-center text-brand-navy/35" />
          <input
            type="search"
            value={q}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={f.searchPh}
            aria-label={f.searchPh}
            className="w-full bg-transparent px-3 py-3 text-sm font-bold text-brand-navy placeholder:text-brand-navy/40 focus:outline-none"
          />
        </form>

        <div className="mt-6 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              className={`rounded-full px-4 py-2 text-xs font-extrabold transition-all ${
                cat === c.key ? "bg-brand-navy text-white" : "bg-white text-brand-navy/60 hover:text-brand-navy"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-10 space-y-10">
          {filtered.map((section) => (
            <section key={section.key}>
              <h2 className="font-display text-2xl font-extrabold text-brand-navy">{section.title}</h2>
              <div className="mt-4 space-y-3">
                {section.items.map((item) => (
                  <details key={item.q} className="group rounded-2xl bg-white p-5 shadow-xs">
                    <summary className="cursor-pointer list-none font-extrabold text-brand-navy">
                      {item.q}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-brand-navy/65">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-brand-navy/50">{f.noMatch}</p>
          )}
        </div>

        <div className="mt-14 rounded-[2rem] bg-white p-8 text-center shadow-soft">
          <h2 className="font-display text-2xl font-extrabold text-brand-navy">{f.shopTitle}</h2>
          <p className="mt-2 text-sm text-brand-navy/60">{f.shopText}</p>
          <StoreButtons content="faq" className="mx-auto mt-6 max-w-md" />
        </div>
      </div>
    </div>
  );
}
