import { useState } from "react";
import { Icon } from "../components/Icon";
import { useLang, withLang } from "../i18n/core";
import { useSeo } from "../lib/seo";

export function Contact() {
  const { lang, d } = useLang();
  const c = d.contact;
  const [sent, setSent] = useState(false);

  useSeo({
    title: lang === "en" ? "Contact & Feedback" : c.title,
    description:
      lang === "en"
        ? "Questions about KIDAMI toys? Read our FAQ on safety, shipping and replacements — or send us feedback. Your ideas shape our next products."
        : c.sub,
    path: withLang("/contact", lang),
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  });

  return (
    <div className="bg-brand-sand pt-28 lg:pt-36">
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2">
          {/* form */}
          <div>
            <h1 className="font-display text-4xl font-extrabold text-brand-navy sm:text-5xl text-balance">
              {c.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-brand-navy/60">{c.sub}</p>

            {sent ? (
              <div className="mt-10 rounded-3xl bg-brand-mint p-8 text-center">
                <Icon name="check" className="mx-auto h-8 w-8 text-brand-green" />
                <h2 className="mt-3 font-display text-xl font-extrabold text-brand-navy">
                  {c.sentTitle}
                </h2>
                <p className="mt-2 text-sm text-brand-navy/60">{c.sentText}</p>
              </div>
            ) : (
              <form
                className="mt-10 space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="text-sm font-extrabold text-brand-navy">{c.name}</label>
                    <input
                      id="name"
                      required
                      className="mt-2 w-full rounded-2xl border border-brand-navy/10 bg-white px-4 py-3 text-sm focus:border-brand-blue focus:outline-none"
                      placeholder={c.namePh}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-extrabold text-brand-navy">{c.email}</label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="mt-2 w-full rounded-2xl border border-brand-navy/10 bg-white px-4 py-3 text-sm focus:border-brand-blue focus:outline-none"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="topic" className="text-sm font-extrabold text-brand-navy">{c.topic}</label>
                  <select
                    id="topic"
                    className="mt-2 w-full rounded-2xl border border-brand-navy/10 bg-white px-4 py-3 text-sm focus:border-brand-blue focus:outline-none"
                  >
                    {c.topics.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-extrabold text-brand-navy">{c.message}</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="mt-2 w-full rounded-2xl border border-brand-navy/10 bg-white px-4 py-3 text-sm focus:border-brand-blue focus:outline-none"
                    placeholder={c.messagePh}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-8 py-3.5 font-display font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5"
                >
                  {c.send}
                  <Icon name="arrow" className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          {/* FAQ */}
          <div>
            <h2 className="font-display text-2xl font-extrabold text-brand-navy">{c.faqTitle}</h2>
            <div className="mt-6 space-y-4">
              {c.faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl bg-white p-5 shadow-xs open:shadow-soft"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-display font-bold text-brand-navy [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-sky text-brand-navy transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-brand-navy/65">{f.a}</p>
                </details>
              ))}
            </div>

            <div className="mt-8 rounded-3xl bg-white p-7 shadow-soft">
              <h3 className="font-display text-lg font-bold text-brand-navy">{c.emailCardTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-navy/60">{c.emailCardText}</p>
              <a
                href="mailto:support@kidami-ent.com"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-sky px-5 py-2.5 text-sm font-extrabold text-brand-navy"
              >
                <Icon name="mail" className="h-4 w-4" />
                support@kidami-ent.com
              </a>
            </div>

            <div className="mt-8 rounded-3xl bg-brand-navy p-7 text-white">
              <h3 className="font-display text-lg font-bold">{c.amazonCardTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{c.amazonCardText}</p>
              <a
                href="https://www.amazon.com/stores/KIDAMI/page/546B9750-2336-4B85-8F2F-2C57C2997542?utm_source=kidami_site&utm_medium=contact&utm_campaign=brand_portal"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-5 py-2.5 text-sm font-extrabold text-brand-navy"
              >
                <Icon name="cart" className="h-4 w-4" />
                {c.amazonCardCta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
