import { Link, useLang, withLang } from "../i18n/core";
import { Icon } from "../components/Icon";
import { useSeo } from "../lib/seo";
import { useReveal } from "../lib/reveal";

export function VideoPage() {
  const { lang, d } = useLang();
  const v = d.videoPage;

  useSeo({
    title: v.title,
    description: v.sub,
    path: withLang("/video", lang),
  });
  useReveal();

  return (
    <div className="bg-brand-sand pt-28 pb-20 lg:pt-36 lg:pb-28">
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-orange">{v.eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl text-balance">
            {v.title}
          </h1>
          <p className="mt-4 text-lg text-brand-navy/65">{v.sub}</p>
        </div>

        <div className="reveal mt-10 overflow-hidden rounded-[2rem] bg-brand-ink shadow-lift">
          <video
            className="aspect-video w-full object-cover"
            controls
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            poster="/images/scene-family-table.jpg"
            aria-label={d.home.video.videoAlt}
          >
            <source src="/videos/brand.mp4" type="video/mp4" />
          </video>
        </div>

        <ul className="reveal mt-10 space-y-4">
          {d.home.video.captions.map((c) => (
            <li key={c} className="rounded-2xl bg-white px-6 py-4 text-sm font-bold text-brand-navy/70 shadow-soft">
              {c}
            </li>
          ))}
        </ul>

        <div className="reveal mt-12 flex flex-wrap justify-center gap-3">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-7 py-3.5 font-display font-bold text-white shadow-soft"
          >
            {v.ctaProducts}
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-navy/15 px-7 py-3.5 font-display font-bold text-brand-navy"
          >
            {v.ctaHome}
          </Link>
        </div>
      </section>
    </div>
  );
}
