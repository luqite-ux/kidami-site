import { Link, useLang, withLang } from "../i18n/core";
import { products, audiences, amazonCta, WALMART_STORE } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { StoreButtons } from "../components/StoreButtons";
import { Icon, Stars } from "../components/Icon";
import { useSeo } from "../lib/seo";
import { useReveal } from "../lib/reveal";
import { useReviews } from "../hooks/useSupabaseData";

const beliefIcons = ["shield", "metal", "award"];

export function Home() {
  const { lang, d } = useLang();
  const h = d.home;
  const liveReviews = useReviews();

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

  const hot = [products[0], products[1], products[2], products[3]];
  const reviewPhotos = [
    "/images/scene-play-indoor.jpg",
    "/images/scene-family-table.jpg",
    "/images/scene-picnic.jpg",
    "/images/scene-grandparents-gift.jpg",
  ];
  const displayReviews =
    liveReviews.length > 0
      ? liveReviews.slice(0, 4).map((r, i) => ({
          name: r.name,
          stars: r.stars,
          text: r.text,
          product: r.product_name,
          photo: r.image_url || reviewPhotos[i % reviewPhotos.length],
        }))
      : d.reviews.map((r, i) => ({
          ...r,
          photo: reviewPhotos[i % reviewPhotos.length],
        }));
  const avgRating =
    displayReviews.reduce((sum, r) => sum + r.stars, 0) / Math.max(displayReviews.length, 1);

  return (
    <>
      {/* ============ HERO: slogan only — search lives in the top bar ============ */}
      <section className="relative overflow-hidden pt-36 pb-24 lg:pt-48 lg:pb-32">
        <img
          src="/images/scene-family-table.jpg"
          alt={h.hero.imgAlt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/80 via-brand-ink/45 to-brand-ink/15" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <h1 className="font-display text-5xl font-extrabold leading-[1.08] tracking-tight text-white text-balance sm:text-6xl">
              {h.hero.titleA} <span className="text-brand-yellow">{h.hero.titleB}</span>
              <br />
              {h.hero.titleC} <span className="text-brand-yellow">{h.hero.titleD}</span>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/80">{h.hero.subtitle}</p>
            <StoreButtons content="home-hero" className="mt-8 max-w-md" />
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
            <p className="mt-4 text-brand-navy/60">
              {h.reviewsSec.sub} · {avgRating.toFixed(1)} / 5
            </p>
          </div>
          <div className="reveal mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayReviews.map((r) => (
              <figure key={r.name + r.product} className="flex flex-col overflow-hidden rounded-3xl border border-brand-navy/8 bg-white shadow-soft">
                <img src={r.photo} alt="" className="h-36 w-full object-cover" loading="lazy" />
                <div className="flex flex-1 flex-col p-6">
                  <Stars rating={r.stars} />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-brand-navy/75">
                    “{r.text}”
                  </blockquote>
                  <figcaption className="mt-5 border-t border-brand-navy/8 pt-4">
                    <p className="text-sm font-extrabold text-brand-navy">{r.name}</p>
                    <p className="mt-0.5 text-xs text-brand-navy/50">{d.common.verified} · {r.product}</p>
                  </figcaption>
                </div>
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
              <a
                key={a.key}
                href={amazonCta(`audience-${a.key}`)}
                target="_blank"
                rel="noopener noreferrer sponsored"
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
              </a>
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
