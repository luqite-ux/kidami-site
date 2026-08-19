import { useSearchParams } from "react-router-dom";
import { products, skills, comingSoon as baseComingSoon, type Skill } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { Icon } from "../components/Icon";
import { Link, useLang, withLang } from "../i18n/core";
import { useSeo } from "../lib/seo";
import { useReveal } from "../lib/reveal";

export function Explore() {
  const { lang, d } = useLang();
  const ex = d.explore;
  const [params] = useSearchParams();
  const active = (params.get("skill") as Skill | null) ?? null;

  useSeo({
    title: lang === "en" ? "Inspiration Library — Shop Toys by Play Skill" : ex.title,
    description:
      lang === "en"
        ? "Explore KIDAMI toys by what they teach: hands-on skills, outdoor adventure, early learning and family time. Die cast metal toy cars and magnetic board games for every kind of growing up."
        : ex.sub,
    path: withLang("/explore", lang),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://kidami-ent.com/" },
          { "@type": "ListItem", position: 2, name: "Explore", item: "https://kidami-ent.com/explore" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Inspiration Library — Shop Toys by Play Skill",
        description: "Explore KIDAMI toys by what they teach: hands-on skills, outdoor adventure, early learning and family time.",
        hasPart: skills.map((s) => ({
          "@type": "WebPage",
          name: s.name,
          description: s.tagline,
          url: `https://kidami-ent.com/explore?skill=${s.key}`,
        })),
      },
    ],
  });
  useReveal();

  const visible = active ? skills.filter((s) => s.key === active) : skills;

  return (
    <div className="bg-brand-sand pt-28 lg:pt-36">
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-orange">{ex.eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl text-balance">
            {ex.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-brand-navy/60">{ex.sub}</p>
        </div>

        {/* skill chips */}
        <div className="mt-10 flex flex-wrap gap-3" role="tablist" aria-label="Play skills">
          <Link
            to="/explore"
            className={`rounded-full px-5 py-2.5 text-sm font-extrabold transition-all ${
              !active ? "bg-brand-navy text-white shadow-soft" : "bg-white text-brand-navy/60 hover:text-brand-navy shadow-xs"
            }`}
          >
            {ex.allSkills}
          </Link>
          {skills.map((s) => (
            <Link
              key={s.key}
              to={`/explore?skill=${s.key}`}
              role="tab"
              aria-selected={active === s.key}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-extrabold transition-all ${
                active === s.key ? "bg-brand-navy text-white shadow-soft" : "bg-white text-brand-navy/60 hover:text-brand-navy shadow-xs"
              }`}
            >
              <Icon name={s.icon} className="h-4 w-4" />
              {d.skills[s.key as keyof typeof d.skills].name}
            </Link>
          ))}
        </div>

        {/* skill sections */}
        {visible.map((s) => {
          const sd = d.skills[s.key as keyof typeof d.skills];
          const list = products.filter((p) => p.skills.includes(s.key));
          return (
            <section key={s.key} className="mt-16">
              <div className="reveal flex flex-wrap items-end justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-soft"
                    style={{ backgroundColor: s.color }}
                  >
                    <Icon name={s.icon} className="h-7 w-7" />
                  </span>
                  <div>
                    <h2 className="font-display text-3xl font-extrabold text-brand-navy">
                      {sd.name}
                    </h2>
                    <p className="mt-1 text-sm text-brand-navy/60">{sd.tagline}</p>
                  </div>
                </div>
              </div>
              <div className="reveal mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </section>
          );
        })}

        {/* coming soon */}
        <section className="mt-20">
          <div className="reveal max-w-xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-green">{ex.growingEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-brand-navy">
              {ex.growingTitle}
            </h2>
          </div>
          <div className="reveal mt-8 grid gap-6 md:grid-cols-3">
            {d.comingSoon.map((c, i) => (
              <div
                key={c.name}
                className="rounded-3xl border-2 border-dashed border-brand-navy/15 bg-white/60 p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cream">
                    <Icon name={baseComingSoon[i].icon} className="h-6 w-6 text-brand-navy/50" />
                  </span>
                  <span className="rounded-full bg-brand-yellow/25 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-navy">
                    {d.common.comingSoon}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-brand-navy/70">
                  {c.name}
                </h3>
                <p className="mt-2 text-sm text-brand-navy/50">{c.note}</p>
              </div>
            ))}
          </div>
          <p className="reveal mt-8 text-center text-sm text-brand-navy/50">
            {ex.wantToKnow}{" "}
            <Link to="/contact" className="font-extrabold text-brand-blue hover:underline">
              {ex.tellUs}
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
