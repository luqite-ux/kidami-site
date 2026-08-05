// Video player removed — no video file available
import { Link, useLang, withLang } from "../i18n/core";
import { products, articles as baseArticles, skills, comingSoon as baseComingSoon, WALMART_STORE, amazonCta } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { MagneticButton, FloatingParticles, GlowOrb } from "../components/Effects";
import { Icon, Stars } from "../components/Icon";
import { useSeo } from "../lib/seo";
import { useReveal } from "../lib/reveal";

const trustIcons = ["shield", "leaf", "check", "award"];
const valueIcons = ["metal", "brain", "family", "shield"];
const pointIcons = ["pullback", "brain", "family"];
const buyerImgs = ["/images/ludo-kids-play.jpg", "/images/cars-open-doors.jpg", "/images/boardgame-gift.jpg"];

export function Home() {
  const { lang, d } = useLang();
  const h = d.home;

  useSeo({
    title:
      lang === "en"
        ? "Die Cast Metal Toy Cars & Magnetic Travel Board Games for Kids"
        : `${h.hero.titleA} ${h.hero.titleB} ${h.hero.titleC} ${h.hero.titleD}`.replace(/\s+/g, " "),
    description:
      lang === "en"
        ? "KIDAMI crafts die cast metal toy cars (ages 3+) — pull back cars with opening doors, 1:64 diecast gift sets — and magnetic travel board games (ages 6+). ASTM F963 & CPC certified. On Amazon & Walmart."
        : h.hero.subtitle,
    path: withLang("/", lang),
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "KIDAMI",
      url: "https://kidami-ent.com/",
      description:
        "Official KIDAMI brand site — die cast metal toy cars (3+) and magnetic educational board games (6+), available on Amazon and Walmart.",
    },
  });
  useReveal();

  const featured = [products[0], products[1], products[3]];


  return (
    <>
      {/* ============ HERO: slogan + ratings + buy ============ */}
      <section className="relative overflow-hidden bg-brand-sand pt-28 lg:pt-36">
        <FloatingParticles count={16} />
        <GlowOrb color="#ffc92e" size={400} className="-left-40 top-10 animate-float-slow" />
        <GlowOrb color="#2e6bf0" size={350} className="-right-32 top-40 animate-float" />
        <GlowOrb color="#12b76a" size={250} className="left-1/3 -bottom-20 animate-float-gentle" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-navy/10 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-brand-navy shadow-xs">
              <Icon name="shield" className="h-4 w-4 text-brand-green" />
              {h.hero.badge}
            </div>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-brand-navy text-balance sm:text-6xl lg:text-7xl">
              {h.hero.titleA} <span className="text-brand-orange">{h.hero.titleB}</span>
              <br />
              {h.hero.titleC} <span className="text-brand-blue">{h.hero.titleD}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-navy/70">
              {h.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-7 py-3.5 font-display text-base font-bold text-white shadow-lift hover-lift">
                <Link to="/products" className="flex items-center gap-2">
                  {h.hero.ctaExplore}
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </MagneticButton>
              <a
                href={amazonCta("hero")}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-2 rounded-full border-2 border-brand-navy/15 bg-white px-7 py-3.5 font-display text-base font-bold text-brand-navy transition-colors hover:border-brand-orange hover:text-brand-orange"
              >
                <Icon name="cart" className="h-4 w-4" />
                {d.common.buyAmazon}
              </a>
            </div>
            {/* ratings row: Amazon + Walmart */}
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <div className="flex items-center gap-2">
                <Stars rating={5} className="h-4 w-4" />
                <span className="text-sm font-bold text-brand-navy">{h.hero.ratingAmazon}</span>
                <span className="text-sm text-brand-navy/50">· {h.hero.ratingReviews}</span>
              </div>
              <a
                href={WALMART_STORE}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex items-center gap-1.5 text-sm font-bold text-brand-navy/60 transition-colors hover:text-brand-blue"
              >
                {h.hero.alsoWalmart}
                <Icon name="arrow" className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="animate-float-slow relative overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-lift">
              <img
                src="/images/cars-6x6-set.jpg"
                alt={h.hero.imgAlt}
                className="w-full rounded-[2rem] object-cover"
                fetchPriority="high"
              />
            </div>
            <div className="absolute -left-4 top-8 rotate-[-6deg] rounded-2xl bg-white px-4 py-3 shadow-lift sm:-left-8 animate-float-gentle">
              <div className="flex items-center gap-2">
                <Icon name="metal" className="h-5 w-5 text-brand-blue" />
                <span className="text-sm font-extrabold text-brand-navy">{h.hero.badgeMetal}</span>
              </div>
            </div>
            <div className="absolute -right-3 bottom-10 rotate-[4deg] rounded-2xl bg-white px-4 py-3 shadow-lift sm:-right-6 animate-float">
              <div className="flex items-center gap-2">
                <Icon name="pullback" className="h-5 w-5 text-brand-orange" />
                <span className="text-sm font-extrabold text-brand-navy">{h.hero.badgePull}</span>
              </div>
            </div>
          </div>
        </div>

        {/* trust strip */}
        <div className="relative border-t border-brand-navy/5 bg-white/70 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-5 sm:px-6 lg:px-8">
            {h.trust.map((text, i) => (
              <div key={text} className="flex items-center gap-2 text-sm font-bold text-brand-navy/70">
                <Icon name={trustIcons[i]} className="h-4 w-4 text-brand-green" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VIDEO / BUYER SHOW ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-orange">{h.video.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl text-balance">
            {h.video.title}
          </h2>
          <p className="mt-4 text-brand-navy/60">{h.video.sub}</p>
        </div>

        <div className="reveal mt-12">
          {/* Buyer show gallery — video coming soon */}
          <div className="grid gap-5 sm:grid-cols-3">
            {h.video.captions.map((caption, i) => (
              <figure key={buyerImgs[i]} className="overflow-hidden rounded-3xl bg-white shadow-soft">
                <img src={buyerImgs[i]} alt={caption} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <figcaption className="p-5 text-sm font-bold leading-relaxed text-brand-navy/70">{caption}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-brand-navy/40">🎬 Brand video coming soon — subscribe for updates</p>
        </div>
      </section>

      {/* ============ INSPIRATION LIBRARY 童年灵感库 ============ */}
      <section className="bg-brand-cream py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-orange">{h.library.eyebrow}</p>
              <h2 className="mt-3 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl text-balance">
                {h.library.title}
              </h2>
              <p className="mt-4 text-brand-navy/60">{h.library.sub}</p>
            </div>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-navy/15 px-6 py-3 font-display font-bold text-brand-navy transition-colors hover:border-brand-navy"
            >
              {h.library.openCta}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>

          <div className="reveal mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((s) => {
              const sd = d.skills[s.key as keyof typeof d.skills];
              return (
                <Link
                  key={s.key}
                  to={`/explore?skill=${s.key}`}
                  className="group rounded-3xl bg-white p-7 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-lift"
                >
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-soft transition-transform group-hover:scale-110"
                    style={{ backgroundColor: s.color }}
                  >
                    <Icon name={s.icon} className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-brand-navy">
                    {sd.name}
                  </h3>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/35">{s.zh}</p>
                  <p className="mt-3 text-sm leading-relaxed text-brand-navy/60">{sd.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-brand-blue">
                    {d.common.explore}
                    <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>

          {/* future categories teaser */}
          <div className="reveal mt-6 grid gap-6 sm:grid-cols-3">
            {d.comingSoon.map((c, i) => (
              <div key={c.name} className="flex items-center gap-4 rounded-3xl border-2 border-dashed border-brand-navy/15 bg-white/50 px-6 py-5">
                <Icon name={baseComingSoon[i].icon} className="h-6 w-6 shrink-0 text-brand-navy/40" />
                <div>
                  <p className="font-display font-bold text-brand-navy/60">{c.name} · {baseComingSoon[i].zh}</p>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-brand-green">{d.common.comingSoon}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-orange">{h.cats.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl text-balance">
            {h.cats.title}
          </h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Die-cast cars */}
          <Link
            to="/products?cat=cars"
            className="reveal-left group relative overflow-hidden rounded-[2.5rem] bg-brand-navy text-white shadow-lift hover-lift"
          >
            <img
              src="/images/cars-collection.jpg"
              alt={h.cats.cars.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-45 transition-all duration-700 group-hover:scale-105 group-hover:opacity-55 group-hover:filter group-hover:brightness-110"
            />
            <div className="relative flex min-h-[420px] flex-col justify-end p-8 sm:p-10">
              <span className="mb-4 inline-flex w-fit rounded-full bg-brand-blue px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider">
                {h.cats.cars.badge}
              </span>
              <h3 className="font-display text-3xl font-extrabold sm:text-4xl">{h.cats.cars.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-white/80">{h.cats.cars.text}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-display font-bold text-brand-yellow">
                {h.cats.cars.cta}
                <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </span>
            </div>
          </Link>

          {/* Board games */}
          <Link
            to="/products?cat=games"
            className="reveal-right group relative overflow-hidden rounded-[2.5rem] bg-brand-green text-white shadow-lift hover-lift"
          >
            <img
              src="/images/ludo-kids-play.jpg"
              alt={h.cats.games.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-45 transition-all duration-700 group-hover:scale-105 group-hover:opacity-55 group-hover:filter group-hover:brightness-110"
            />
            <div className="relative flex min-h-[420px] flex-col justify-end p-8 sm:p-10">
              <span className="mb-4 inline-flex w-fit rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-green">
                {h.cats.games.badge}
              </span>
              <h3 className="font-display text-3xl font-extrabold sm:text-4xl">{h.cats.games.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-white/85">{h.cats.games.text}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-display font-bold text-white">
                {h.cats.games.cta}
                <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ============ CRAFTSMANSHIP (dark) ============ */}
      <section className="bg-brand-ink py-20 text-white lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="reveal order-2 lg:order-1">
            <div className="overflow-hidden rounded-[2.5rem] shadow-lift">
              <img
                src="/images/cars-premium-dark.jpg"
                alt={h.craft.imgAlt}
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
          </div>
          <div className="reveal order-1 lg:order-2">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-yellow">{h.craft.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl text-balance">
              {h.craft.title}
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-white/70">{h.craft.text}</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {h.craft.values.map((v, i) => (
                <div key={v.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Icon name={valueIcons[i]} className="h-6 w-6 text-brand-yellow" />
                  <h3 className="mt-3 font-display text-lg font-bold">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">{v.desc}</p>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="mt-9 inline-flex items-center gap-2 font-display font-bold text-brand-yellow hover:gap-3.5 transition-all"
            >
              {h.craft.cta}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-orange">{h.featured.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl text-balance">
              {h.featured.title}
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
        <div className="reveal mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <div key={p.slug} className={`reveal-delay-${i + 1}`}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* ============ LEARNING / STEM ============ */}
      <section className="bg-brand-cream py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="reveal">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-green">{h.learning.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl text-balance">
              {h.learning.title}
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-brand-navy/70">{h.learning.text}</p>
            <ul className="mt-8 space-y-5">
              {h.learning.points.map((p, i) => (
                <li key={p.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-soft">
                    <Icon name={pointIcons[i]} className="h-5 w-5 text-brand-blue" />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-brand-navy">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-brand-navy/60">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              to="/learn"
              className="mt-9 inline-flex items-center gap-2 font-display font-bold text-brand-navy hover:text-brand-orange transition-colors"
            >
              {h.learning.cta}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <div className="reveal">
            <div className="overflow-hidden rounded-[2.5rem] shadow-lift">
              <img
                src="/images/ludo-kids-play.jpg"
                alt={h.learning.imgAlt}
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ REVIEWS ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
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
      </section>

      {/* ============ BLOG TEASER ============ */}
      <section className="bg-brand-sky/60 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-blue">{h.blog.eyebrow}</p>
              <h2 className="mt-3 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl text-balance">
                {h.blog.title}
              </h2>
            </div>
            <Link
              to="/learn"
              className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 font-display font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5"
            >
              {d.common.allArticles}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <div className="reveal mt-12 grid gap-7 md:grid-cols-3">
            {d.articles.map((a) => {
              const base = baseArticles.find((b) => b.slug === a.slug);
              return (
                <Link
                  key={a.slug}
                  to="/learn"
                  className="group overflow-hidden rounded-3xl bg-white shadow-soft transition-all hover:-translate-y-2 hover:shadow-lift hover-lift"
                >
                  <div className="overflow-hidden">
                    <img
                      src={base?.image ?? "/images/cars-open-doors.jpg"}
                      alt={a.title}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs font-bold">
                      <span className="rounded-full bg-brand-mint px-3 py-1 text-brand-green">{a.category}</span>
                      <span className="text-brand-navy/40">{a.minutes} {d.common.minRead}</span>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug text-brand-navy group-hover:text-brand-blue">
                      {a.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-brand-navy/60">{a.excerpt}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ FINAL: subscribe benefit + future + 3rd CTA ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="reveal relative overflow-hidden rounded-[2.5rem] bg-brand-navy px-8 py-16 text-white shadow-lift sm:px-16">
          <FloatingParticles count={8} />
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-yellow/20 blur-3xl animate-float-slow" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-brand-blue/30 blur-3xl animate-float" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/10 blur-3xl animate-float-gentle" />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl text-balance">
              {h.final.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-white/70">
              {h.final.sub1} <span className="font-extrabold text-brand-yellow">{h.final.highlight}</span> {h.final.sub2}
            </p>
            <form
              className="mx-auto mt-8 flex max-w-md overflow-hidden rounded-full bg-white/10 p-1.5 backdrop-blur"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder={h.final.placeholder}
                aria-label="Email address"
                className="w-full bg-transparent px-5 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button className="shrink-0 rounded-full bg-brand-yellow px-6 py-3 font-display text-sm font-extrabold text-brand-navy transition-transform hover:scale-105">
                {h.final.button}
              </button>
            </form>
            <p className="mt-3 text-xs text-white/40">{h.final.note}</p>
          </div>

          <div className="relative mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-10">
            <p className="text-sm font-bold text-white/60">{h.final.ready}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={amazonCta("bottom")}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-8 py-4 font-display text-base font-extrabold text-white shadow-lift transition-transform hover:-translate-y-0.5"
              >
                <Icon name="cart" className="h-5 w-5" />
                {h.final.ctaAmazon}
              </a>
              <a
                href={WALMART_STORE}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 px-8 py-4 font-display text-base font-bold text-white transition-colors hover:border-white"
              >
                {d.common.shopWalmart}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
