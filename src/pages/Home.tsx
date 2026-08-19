import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLang, withLang } from "../i18n/core";
import { products, audiences, WALMART_STORE, amazonCta } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { Icon, Stars } from "../components/Icon";
import { useSeo } from "../lib/seo";
import { useReveal } from "../lib/reveal";

const trustIcons = ["shield", "family", "leaf", "check"];
const beliefIcons = ["shield", "metal", "award"];

export function Home() {
  const { lang, d } = useLang();
  const h = d.home;
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  useSeo({
    title:
      lang === "en"
        ? "Die Cast Metal Toy Cars & Magnetic Travel Board Games for Kids"
        : `${h.hero.titleA} ${h.hero.titleB} ${h.hero.titleC} ${h.hero.titleD}`.replace(/\s+/g, " "),
    description:
      lang === "en"
        ? "KIDAMI crafts die cast metal toy cars (ages 3+) — pull back cars with opening doors, 1:64 diecast gift sets — and magnetic travel board games (ages 6+). EN71, ASTM F963 & CPC certified. On Amazon & Walmart."
        : h.hero.subtitle,
    path: withLang("/", lang),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "KIDAMI",
        url: "https://kidami-ent.com/",
        description:
          "Official KIDAMI brand site — die cast metal toy cars (3+) and magnetic educational board games (6+), available on Amazon and Walmart.",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://kidami-ent.com/products?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "KIDAMI",
        alternateName: "KIDAMI Toys",
        url: "https://kidami-ent.com",
        logo: "https://kidami-ent.com/logo.png",
        slogan: "A Companion of Childhood, A Keeper of Memories",
        description:
          "KIDAMI crafts premium die cast metal toy cars and magnetic educational board games for kids. Founded in 2016, EN71, ASTM F963 & CPC certified.",
        foundingDate: "2016",
        sameAs: [
          "https://www.amazon.com/stores/KIDAMI/page/546B9750-2336-4B85-8F2F-2C57C2997542",
          WALMART_STORE,
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Support",
          email: "support@kidami-ent.com",
          availableLanguage: ["English", "Spanish", "Portuguese", "French", "German", "Japanese", "Russian", "Italian", "Korean"],
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "KIDAMI",
        description: "Premium die cast metal toy cars and magnetic board games for children.",
        url: "https://kidami-ent.com",
        priceRange: "$$",
        paymentAccepted: "Credit Card, PayPal, Amazon Pay",
        currenciesAccepted: "USD",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "KIDAMI Products",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Die Cast Metal Toy Cars",
                description: "Pull back cars with opening doors for ages 3+",
                audience: { "@type": "PeopleAudience", suggestedMinAge: "3" },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Magnetic Board Games",
                description: "Travel board games like Ludo and Snakes & Ladders for ages 6+",
                audience: { "@type": "PeopleAudience", suggestedMinAge: "6" },
              },
            },
          ],
        },
      },
    ],
  });
  useReveal();

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    navigate(withLang(query ? `/products?q=${encodeURIComponent(query)}` : "/products", lang));
  };

  const hot = [products[0], products[1], products[2], products[3]];

  return (
    <>
      {/* ============ HERO: full-bleed image + slogan + search + CTA ============ */}
      <section className="relative overflow-hidden pt-36 pb-20 lg:pt-48 lg:pb-28">
        <img
          src="/images/scene-family-table.jpg"
          alt={h.hero.imgAlt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/85 via-brand-ink/60 to-brand-ink/25" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-white backdrop-blur">
              <Icon name="shield" className="h-4 w-4 text-brand-yellow" />
              {h.hero.badge}
            </div>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.08] tracking-tight text-white text-balance sm:text-6xl">
              {h.hero.titleA} <span className="text-brand-yellow">{h.hero.titleB}</span>
              <br />
              {h.hero.titleC} <span className="text-brand-yellow">{h.hero.titleD}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{h.hero.subtitle}</p>

            {/* search */}
            <form onSubmit={onSearch} role="search" className="mt-8 flex max-w-lg overflow-hidden rounded-full bg-white p-1.5 shadow-lift">
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={d.nav.searchPh}
                aria-label={d.nav.search}
                className="w-full bg-transparent px-5 text-sm font-bold text-brand-navy placeholder:text-brand-navy/40 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-orange px-6 py-3 font-display text-sm font-extrabold text-white transition-transform hover:scale-105"
              >
                <Icon name="search" className="h-4 w-4" />
                {d.nav.search}
              </button>
            </form>

            {/* dual CTA + stores */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-display text-base font-bold text-brand-navy shadow-lift transition-transform hover:-translate-y-0.5"
              >
                {h.hero.ctaExplore}
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-7 py-3.5 font-display text-base font-bold text-white shadow-lift transition-transform hover:-translate-y-0.5"
              >
                {h.hero.ctaBrowse}
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href={amazonCta("hero")}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex items-center gap-2 text-sm font-bold text-white/85 transition-colors hover:text-brand-yellow"
              >
                <Stars rating={5} className="h-4 w-4" />
                {h.hero.ratingAmazon} · {h.hero.ratingReviews}
              </a>
              <a
                href={WALMART_STORE}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex items-center gap-1.5 text-sm font-bold text-white/70 transition-colors hover:text-brand-yellow"
              >
                <Icon name="cart" className="h-4 w-4" />
                {h.hero.alsoWalmart}
                <Icon name="arrow" className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* trust strip */}
        <div className="relative mt-14 border-t border-white/15 bg-brand-ink/40 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-4 sm:px-6 lg:px-8">
            {h.trust.map((text, i) => (
              <div key={text} className="flex items-center gap-2 text-sm font-bold text-white/85">
                <Icon name={trustIcons[i]} className="h-4 w-4 text-brand-yellow" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BELIEF: quote + 3 pillars ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="reveal mx-auto max-w-2xl text-center font-display text-3xl font-extrabold leading-snug text-brand-navy sm:text-4xl text-balance">
          “{h.belief.quote}”
        </p>
        <div className="reveal mt-12 grid gap-6 sm:grid-cols-3">
          {h.belief.cols.map((c, i) => (
            <div key={c.title} className="rounded-3xl bg-white p-7 text-center shadow-soft">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cream">
                <Icon name={beliefIcons[i]} className="h-6 w-6 text-brand-orange" />
              </span>
              <h3 className="mt-4 font-display text-lg font-extrabold text-brand-navy">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-navy/60">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ REVIEWS ============ */}
      <section className="bg-brand-cream py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal mx-auto max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-orange">{h.reviewsSec.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl text-balance">
              {h.reviewsSec.title}
            </h2>
            <p className="mt-4 text-brand-navy/60">{h.reviewsSec.sub}</p>
          </div>
          <div className="reveal mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {d.reviews.map((r) => (
              <figure key={r.name} className="flex flex-col rounded-3xl border border-brand-navy/8 bg-white p-6 shadow-soft">
                <Stars rating={r.stars} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-brand-navy/75">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-5 border-t border-brand-navy/8 pt-4">
                  <p className="text-sm font-extrabold text-brand-navy">{r.name}</p>
                  <p className="mt-0.5 text-xs text-brand-navy/50">{d.common.verified} · {r.product}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ AUDIENCE ENTRANCES (4 cards) ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-orange">{h.audiences.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl text-balance">
            {h.audiences.title}
          </h2>
          <p className="mt-4 text-brand-navy/60">{h.audiences.sub}</p>
        </div>
        <div className="reveal mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => {
            const card = h.audiences.cards[i];
            return (
              <Link
                key={a.key}
                to={`/products?for=${a.key}`}
                className="group overflow-hidden rounded-3xl bg-white shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div className="overflow-hidden">
                  <img
                    src={a.img}
                    alt={card.name}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-extrabold text-brand-navy">{card.name}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {card.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2 text-sm font-bold text-brand-navy/65">
                        <Icon name="check" className="h-3.5 w-3.5 shrink-0 text-brand-green" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-brand-blue">
                    {card.cta}
                    <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============ BESTSELLERS ============ */}
      <section className="bg-brand-cream py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-orange">{h.hot.eyebrow}</p>
              <h2 className="mt-3 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl text-balance">
                {h.hot.title}
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-navy/15 px-6 py-3 font-display font-bold text-brand-navy transition-colors hover:border-brand-navy"
            >
              {d.common.viewAll}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <div className="reveal mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {hot.map((p, i) => (
              <div key={p.slug} className={`reveal-delay-${i + 1}`}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OUR STORY strip ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="reveal grid items-center gap-10 overflow-hidden rounded-[2.5rem] bg-white shadow-lift lg:grid-cols-2">
          <img
            src="/images/scene-car-trunk.jpg"
            alt={d.about.imgAlt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="p-8 sm:p-12">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-orange">{h.story.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-brand-navy sm:text-4xl text-balance">
              {d.about.title}
            </h2>
            <p className="mt-5 leading-relaxed text-brand-navy/65">{d.about.text}</p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-navy px-7 py-3.5 font-display font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5"
            >
              {h.story.cta}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
