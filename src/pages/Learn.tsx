import { articles as baseArticles } from "../data/products";
import { Icon } from "../components/Icon";
import { Link, useLang, withLang } from "../i18n/core";
import { useSeo } from "../lib/seo";
import { useReveal } from "../lib/reveal";

export function Learn() {
  const { lang, d } = useLang();
  const l = d.learn;

  useSeo({
    title: lang === "en" ? "STEM & Learning — Play Ideas Backed by Child-Development Science" : l.title,
    description:
      lang === "en"
        ? "Articles and guides on play-based learning: how die-cast cars build fine motor skills, why board games teach logic and probability, and how to choose screen-free travel toys."
        : l.sub,
    path: withLang("/learn", lang),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://kidami-ent.com/" },
          { "@type": "ListItem", position: 2, name: "Learn", item: "https://kidami-ent.com/learn" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "KIDAMI Learning Hub",
        description: "STEM & Learning — Play Ideas Backed by Child-Development Science",
        blogPost: baseArticles.map((a) => ({
          "@type": "BlogPosting",
          headline: a.title,
          description: a.excerpt,
          image: `https://kidami-ent.com${a.image}`,
          url: `https://kidami-ent.com/learn#${a.slug}`,
        })),
      },
    ],
  });
  useReveal();

  return (
    <div className="bg-brand-sand pt-28 lg:pt-36">
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-green">{l.eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl text-balance">
            {l.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-brand-navy/60">{l.sub}</p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {l.topics.map((t, i) => (
            <span
              key={t}
              className={`rounded-full px-5 py-2.5 text-sm font-extrabold ${
                i === 0 ? "bg-brand-navy text-white" : "bg-white text-brand-navy/60"
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {d.articles.map((a) => {
            const base = baseArticles.find((b) => b.slug === a.slug);
            return (
              <article
                key={a.slug}
                className="reveal group flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div className="overflow-hidden">
                  <img
                    src={base?.image ?? "/images/cars-open-doors.jpg"}
                    alt={a.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs font-bold">
                    <span className="rounded-full bg-brand-mint px-3 py-1 text-brand-green">{a.category}</span>
                    <span className="text-brand-navy/40">{a.minutes} {d.common.minRead}</span>
                  </div>
                  <h2 className="mt-3 font-display text-xl font-bold leading-snug text-brand-navy">
                    {a.title}
                  </h2>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-brand-navy/60">{a.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-brand-blue">
                    {l.readGuide}
                    <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* coming soon / content engine note */}
        <div className="reveal mt-16 rounded-[2rem] border-2 border-dashed border-brand-navy/15 bg-white/60 p-10 text-center">
          <Icon name="spark" className="mx-auto h-8 w-8 text-brand-orange" />
          <h2 className="mt-4 font-display text-2xl font-extrabold text-brand-navy">
            {l.weeklyTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-navy/60">
            {l.weeklyText}
          </p>
          <Link
            to="/products"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-navy px-7 py-3.5 font-display font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5"
          >
            {l.cta}
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
