import { Link, useLang, withLang } from "../i18n/core";
import { useSeo } from "../lib/seo";
import { Icon } from "../components/Icon";

export function NotFound() {
  const { lang } = useLang();

  useSeo({
    title: "Page Not Found",
    description: "The page you are looking for does not exist. Explore KIDAMI die cast metal toy cars and magnetic board games.",
    path: withLang("/404", lang),
    robots: "noindex, follow",
  });

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-brand-sand px-4 pt-28 text-center lg:pt-36">
      <div className="max-w-md">
        <h1 className="font-display text-7xl font-extrabold text-brand-navy">404</h1>
        <p className="mt-4 text-lg text-brand-navy/60">
          Sorry, we couldn't find that page.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 font-display font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <Icon name="arrow" className="h-4 w-4 rotate-180" />
            Back to Home
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-navy/15 px-6 py-3 font-display font-bold text-brand-navy transition-colors hover:border-brand-navy"
          >
            Shop Products
          </Link>
        </div>
      </div>
    </div>
  );
}
