import { Icon } from "../components/Icon";
import { Link, useLang, withLang } from "../i18n/core";
import { useSeo } from "../lib/seo";
import { useReveal } from "../lib/reveal";

const valueIcons = ["metal", "brain", "family", "shield"];
const commitIcons = ["shield", "leaf", "check", "family"];

export function About() {
  const { lang, d } = useLang();
  const a = d.about;

  useSeo({
    title: lang === "en" ? "Our Story — A Companion of Childhood, A Keeper of Memories" : a.title,
    description:
      lang === "en"
        ? "Founded in 2016, KIDAMI ('Kid' + 'Ami', French for friend) crafts premium, safe, educational toys. Discover our mission, values and the quality commitments behind every die-cast car and board game."
        : a.text,
    path: withLang("/about", lang),
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: a.title,
      description: a.text,
      mainEntity: {
        "@type": "Organization",
        name: "KIDAMI",
        description: a.text,
        foundingDate: "2016",
        url: "https://kidami-ent.com",
        logo: "https://kidami-ent.com/logo.png",
        sameAs: [
          "https://www.amazon.com/stores/KIDAMI/page/546B9750-2336-4B85-8F2F-2C57C2997542",
        ],
      },
    },
  });
  useReveal();

  return (
    <div className="bg-brand-sand pt-28 lg:pt-36">
      {/* intro */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-orange">{a.eyebrow}</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight text-brand-navy sm:text-5xl lg:text-6xl text-balance">
              {a.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-navy/70">{a.text}</p>
          </div>
          <div className="overflow-hidden rounded-[2.5rem] shadow-lift">
            <img
              src="/images/cars-cute-series.jpg"
              alt={a.imgAlt}
              className="w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 className="reveal font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">{a.timelineTitle}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {a.timeline.map((t) => (
            <div key={t.title} className="reveal rounded-3xl bg-white p-7 shadow-soft">
              <span className="inline-block rounded-full bg-brand-yellow/25 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-navy">
                {t.year}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-brand-navy">{t.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-navy/65">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* mission / vision */}
      <section className="bg-brand-navy py-20 text-white lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="reveal">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-yellow">{a.missionEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-snug sm:text-4xl text-balance">
              {a.missionTitle}
            </h2>
          </div>
          <div className="reveal">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-yellow">{a.visionEyebrow}</p>
            <p className="mt-3 text-lg leading-relaxed text-white/75">{a.visionText}</p>
          </div>
        </div>
      </section>

      {/* values */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="reveal max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
            {a.valuesTitle}
          </h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {a.values.map((v, i) => (
            <div key={v.title} className="reveal rounded-3xl bg-white p-7 shadow-soft">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-sky">
                <Icon name={valueIcons[i]} className="h-6 w-6 text-brand-blue" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-brand-navy">{v.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-brand-navy/65">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* commitments */}
      <section className="bg-brand-cream py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal mx-auto max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-green">{a.commitEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-brand-navy sm:text-4xl text-balance">
              {a.commitTitle}
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {a.commitments.map((c, i) => (
              <div key={c.title} className="reveal flex gap-5 rounded-3xl bg-white p-7 shadow-soft">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-mint">
                  <Icon name={commitIcons[i]} className="h-6 w-6 text-brand-green" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-brand-navy">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-navy/65">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal mt-14 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-8 py-4 font-display font-bold text-white shadow-lift transition-transform hover:-translate-y-0.5"
            >
              {a.cta}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
