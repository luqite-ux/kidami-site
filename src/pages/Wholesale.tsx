import { Link, useLang, withLang } from "../i18n/core";
import { Icon } from "../components/Icon";
import { StoreButtons } from "../components/StoreButtons";
import { useSeo } from "../lib/seo";
import { useReveal } from "../lib/reveal";

export function Wholesale() {
  const { lang, d } = useLang();
  const w = d.wholesale;

  useSeo({
    title: w.title,
    description: w.sub,
    path: withLang("/wholesale", lang),
  });
  useReveal();

  return (
    <div className="bg-brand-sand pt-28 pb-20 lg:pt-36 lg:pb-28">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-orange">{w.eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl text-balance">
            {w.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-brand-navy/65">{w.sub}</p>
        </div>

        <div className="reveal mt-14 grid gap-6 md:grid-cols-2">
          {w.cards.map((card) => (
            <div key={card.title} className="rounded-[2rem] bg-white p-8 shadow-soft">
              <h2 className="font-display text-2xl font-extrabold text-brand-navy">{card.title}</h2>
              <p className="mt-4 leading-relaxed text-brand-navy/65">{card.text}</p>
              <ul className="mt-6 space-y-2.5">
                {card.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-sm font-bold text-brand-navy/70">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="reveal mx-auto mt-14 max-w-2xl rounded-[2rem] bg-brand-navy p-8 text-center text-white sm:p-12">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">{w.ctaTitle}</h2>
          <p className="mt-4 text-white/70">{w.ctaText}</p>
          <a
            href={`mailto:${w.email}?subject=${encodeURIComponent(w.emailSubject)}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-7 py-3.5 font-display font-bold text-brand-navy shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <Icon name="mail" className="h-4 w-4" />
            {w.email}
          </a>
          <p className="mt-6 text-sm text-white/50">{w.orShop}</p>
          <StoreButtons content="wholesale" className="mx-auto mt-4 max-w-md" />
        </div>

        <div className="reveal mt-10 text-center">
          <Link to="/contact" className="font-bold text-brand-blue hover:underline">
            {w.contactLink}
          </Link>
        </div>
      </section>
    </div>
  );
}
