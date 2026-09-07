import { useLang, withLang } from "../i18n/core";
import { useSeo } from "../lib/seo";
import { useReveal } from "../lib/reveal";

export function Privacy() {
  const { lang } = useLang();

  useSeo({
    title: "Privacy Policy · 隐私政策",
    description:
      "KIDAMI privacy policy — how we collect, use and protect your personal information when you visit our website.",
    path: withLang("/privacy", lang),
    robots: "index, follow",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Privacy Policy",
      url: "https://kidami-ent.com/privacy",
      isPartOf: { "@type": "WebSite", name: "KIDAMI", url: "https://kidami-ent.com" },
    },
  });
  useReveal();

  return (
    <div className="bg-brand-sand pt-28 lg:pt-36">
      <div className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="reveal">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-orange">Legal</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm font-bold uppercase tracking-wider text-brand-navy/45">隐私政策</p>
          <p className="mt-4 text-brand-navy/50">Last updated: August 2026</p>
        </div>

        <div className="reveal mt-12 space-y-10 text-brand-navy/80">
          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy">1. Information We Collect</h2>
            <p className="mt-3 leading-relaxed">
              We collect minimal information to provide you with the best experience on our website. This includes:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li><strong>Contact information</strong> — when you submit feedback through our contact form (name, email, topic, message).</li>
              <li><strong>Usage data</strong> — anonymous analytics about how visitors use our site (pages visited, time spent, device type).</li>
              <li><strong>Email subscriptions</strong> — email addresses voluntarily provided for our newsletter.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy">2. How We Use Your Information</h2>
            <p className="mt-3 leading-relaxed">
              We use your information solely to:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Respond to your questions and feedback.</li>
              <li>Send newsletters and product updates (only if you opt in).</li>
              <li>Improve our website and product offerings.</li>
              <li>Ensure website security and prevent fraud.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy">3. Information Sharing</h2>
            <p className="mt-3 leading-relaxed">
              KIDAMI does not sell, trade, or rent your personal information to third parties. We only share data with trusted service providers who help us operate our website (e.g., hosting, analytics, email delivery), and only under strict confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy">4. Cookies & Tracking</h2>
            <p className="mt-3 leading-relaxed">
              We use cookies and similar technologies to understand how visitors interact with our site. You can disable cookies in your browser settings, though this may affect some site functionality. We do not use cookies to track you across other websites.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy">5. Data Security</h2>
            <p className="mt-3 leading-relaxed">
              We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure. We strive to use commercially acceptable means to protect your data but cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy">6. Children's Privacy</h2>
            <p className="mt-3 leading-relaxed">
              Our products are designed for children, but our website is intended for parents and guardians. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy">7. Your Rights</h2>
            <p className="mt-3 leading-relaxed">
              Depending on your location, you may have the right to access, correct, or delete your personal information. To exercise these rights, email us at <a href="mailto:support@kidami-ent.com" className="font-bold text-brand-blue hover:underline">support@kidami-ent.com</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy">8. Changes to This Policy</h2>
            <p className="mt-3 leading-relaxed">
              We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy">9. Contact Us</h2>
            <p className="mt-3 leading-relaxed">
              If you have any questions about this privacy policy, please contact us at <a href="mailto:support@kidami-ent.com" className="font-bold text-brand-blue hover:underline">support@kidami-ent.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
