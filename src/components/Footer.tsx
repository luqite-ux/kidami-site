import { Link, useLang } from "../i18n/core";
import { Icon } from "./Icon";
import { AMAZON_STORE, WALMART_STORE } from "../data/products";

export function Footer() {
  const { d } = useLang();
  const f = d.footer;

  return (
    <footer className="bg-brand-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center">
              <img src="/logo.png" alt="KIDAMI logo" className="h-10 w-auto object-contain" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">{f.tagline}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {f.badges.map((b) => (
                <span key={b} className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold text-white/70">
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-brand-yellow">{f.shopTitle}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li><Link to="/products?cat=cars" className="hover:text-white">{f.shopCars}</Link></li>
              <li><Link to="/products?cat=games" className="hover:text-white">{f.shopGames}</Link></li>
              <li><Link to="/explore" className="hover:text-white">{f.shopInspiration}</Link></li>
              <li>
                <a href={AMAZON_STORE} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white">
                  {f.shopAmazon}
                </a>
              </li>
              <li>
                <a href={WALMART_STORE} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white">
                  {f.shopWalmart}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-brand-yellow">{f.discoverTitle}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li><Link to="/about" className="hover:text-white">{f.discoverStory}</Link></li>
              <li><Link to="/learn" className="hover:text-white">{f.discoverLearn}</Link></li>
              <li><Link to="/contact" className="hover:text-white">{f.discoverContact}</Link></li>
              <li><a href="mailto:support@kidami-ent.com" className="hover:text-white">support@kidami-ent.com</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-brand-yellow">{f.newsTitle}</h3>
            <p className="mt-4 text-sm text-white/60">{f.newsText}</p>
            <form className="mt-4 flex overflow-hidden rounded-full bg-white/10 p-1" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder={f.newsPlaceholder}
                aria-label="Email address"
                className="w-full bg-transparent px-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-brand-navy" aria-label="Subscribe">
                <Icon name="mail" className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {f.bottomLeft}</p>
          <p>{f.bottomRight}</p>
        </div>
      </div>
    </footer>
  );
}
