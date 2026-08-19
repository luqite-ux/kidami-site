import { useParams } from "react-router-dom";
import { articles as baseArticles } from "../data/products";
import { Icon } from "../components/Icon";
import { Link, useLang, withLang } from "../i18n/core";
import { useSeo } from "../lib/seo";
import { useReveal } from "../lib/reveal";

export function Article() {
  const { slug } = useParams();
  const { lang, d } = useLang();
  const base = baseArticles.find((a) => a.slug === slug);
  const localized = d.articles.find((a) => a.slug === slug);
  const title = localized?.title ?? base?.title ?? "";
  const excerpt = localized?.excerpt ?? base?.excerpt ?? "";

  useSeo({
    title: title || "Guide",
    description: excerpt,
    path: withLang(`/learn/${slug}`, lang),
    jsonLd: base
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: base.title,
          description: base.excerpt,
          image: `https://kidami-ent.com${base.image}`,
          url: `https://kidami-ent.com/learn/${base.slug}`,
          author: { "@type": "Organization", name: "KIDAMI" },
          publisher: {
            "@type": "Organization",
            name: "KIDAMI",
            logo: { "@type": "ImageObject", url: "https://kidami-ent.com/logo.png" },
          },
        }
      : undefined,
  });
  useReveal();

  if (!base) {
    return (
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-44 text-center">
        <h1 className="font-display text-3xl font-extrabold text-brand-navy">{d.detail.notFound}</h1>
        <Link to="/learn" className="mt-6 inline-block font-bold text-brand-blue hover:underline">
          {d.learn.back}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-sand pt-28 lg:pt-36">
      <article className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
        <Link to="/learn" className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-blue hover:underline">
          {d.learn.back}
        </Link>
        <div className="mt-6 flex items-center gap-3 text-xs font-bold">
          <span className="rounded-full bg-brand-mint px-3 py-1 text-brand-green">{localized?.category ?? base.category}</span>
          <span className="text-brand-navy/40">{base.minutes} {d.common.minRead}</span>
        </div>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-brand-navy text-balance sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-brand-navy/60">{excerpt}</p>
        <div className="mt-8 overflow-hidden rounded-[2rem] shadow-soft">
          <img src={base.image} alt={title} className="w-full object-cover" />
        </div>
        <div className="mt-10 space-y-6">
          {base.body.map((p, i) => (
            <p key={i} className="leading-relaxed text-brand-navy/75">
              {p}
            </p>
          ))}
        </div>
        <div className="mt-12 rounded-[2rem] bg-white p-8 text-center shadow-soft">
          <Icon name="gift" className="mx-auto h-8 w-8 text-brand-orange" />
          <Link
            to="/products"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-navy px-7 py-3.5 font-display font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5"
          >
            {d.learn.cta}
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </article>
    </div>
  );
}
