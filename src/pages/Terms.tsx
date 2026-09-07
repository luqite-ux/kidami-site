import { useLang, withLang } from "../i18n/core";
import { useSeo } from "../lib/seo";
import { useReveal } from "../lib/reveal";

export function Terms() {
  const { lang } = useLang();

  useSeo({
    title: "Terms of Service · 服务条款",
    description:
      "KIDAMI terms of service — rules and guidelines for using our website, purchasing products, and interacting with our brand.",
    path: withLang("/terms", lang),
    robots: "index, follow",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Terms of Service",
      url: "https://kidami-ent.com/terms",
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
            Terms of Service
          </h1>
          <p className="mt-2 text-sm font-bold uppercase tracking-wider text-brand-navy/45">服务条款</p>
          <p className="mt-4 text-brand-navy/50">Last updated: August 2026</p>
        </div>

        <div className="reveal mt-12 space-y-10 text-brand-navy/80">
          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy">1. Acceptance of Terms</h2>
            <p className="mt-3 leading-relaxed">
              By accessing and using the KIDAMI website (kidami-ent.com), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of the website immediately.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy">2. About KIDAMI</h2>
            <p className="mt-3 leading-relaxed">
              KIDAMI is a toy brand specializing in die cast metal toy cars and magnetic educational board games. Our products are sold through authorized third-party marketplaces including Amazon and Walmart. This website serves as our official brand portal, providing product information, educational content, and customer support.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy">3. Product Purchases</h2>
            <p className="mt-3 leading-relaxed">
              All product purchases are processed through our authorized retail partners (Amazon and Walmart). KIDAMI does not directly process payments or fulfill orders through this website. When you click "Buy on Amazon" or similar links, you are redirected to the respective marketplace where their terms of service and privacy policies apply.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy">4. Intellectual Property</h2>
            <p className="mt-3 leading-relaxed">
              All content on this website — including text, images, logos, product descriptions, and design — is the property of KIDAMI or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without express written permission.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy">5. User Content</h2>
            <p className="mt-3 leading-relaxed">
              By submitting feedback, reviews, or other content through our website, you grant KIDAMI a non-exclusive, royalty-free, perpetual license to use, modify, and display that content for marketing, product improvement, and customer support purposes. You represent that you have the right to submit such content and that it does not violate any third-party rights.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy">6. Product Safety & Age Recommendations</h2>
            <p className="mt-3 leading-relaxed">
              All KIDAMI products undergo rigorous safety testing and meet or exceed ASTM F963 and CPC (Children's Product Certificate) standards. Age recommendations are clearly stated on each product page. Parents and guardians are responsible for selecting age-appropriate products and supervising children during play.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy">7. Disclaimer of Warranties</h2>
            <p className="mt-3 leading-relaxed">
              This website and its content are provided "as is" without warranties of any kind, either express or implied. While we strive for accuracy, we do not guarantee that product descriptions, pricing, or availability information is always complete or current. Please verify details on the retail marketplace before purchasing.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy">8. Limitation of Liability</h2>
            <p className="mt-3 leading-relaxed">
              To the fullest extent permitted by law, KIDAMI shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website or our products. Our total liability shall not exceed the purchase price of the specific product giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy">9. Governing Law</h2>
            <p className="mt-3 leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of the United States. Any disputes arising from these terms shall be resolved through good-faith negotiation, and if necessary, binding arbitration.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy">10. Changes to These Terms</h2>
            <p className="mt-3 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Continued use of the website after changes constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy">11. Contact Us</h2>
            <p className="mt-3 leading-relaxed">
              For questions about these Terms of Service, please contact us at <a href="mailto:support@kidami-ent.com" className="font-bold text-brand-blue hover:underline">support@kidami-ent.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
