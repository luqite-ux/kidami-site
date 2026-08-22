import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link, NavLink, useLang, langCodes, langNames, stripLang, withLang, type LangCode } from "../i18n/core";
import { Icon } from "./Icon";
import { AMAZON_STORE } from "../data/products";
import { StoreButtons } from "./StoreButtons";

function LanguageMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { lang, d } = useLang();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const switchTo = (code: LangCode) => {
    setOpen(false);
    const base = stripLang(location.pathname);
    navigate(withLang(base, code) + location.search + location.hash);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Choose language"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold text-brand-navy/70 transition-colors hover:bg-brand-sky/60 hover:text-brand-navy"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
        </svg>
        {lang.toUpperCase()}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-2xl bg-white py-2 shadow-lift">
          {langCodes.map((code) => (
            <button
              key={code}
              onClick={() => switchTo(code)}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-bold transition-colors ${
                code === lang ? "bg-brand-sky text-brand-navy" : "text-brand-navy/60 hover:bg-brand-sky/50 hover:text-brand-navy"
              }`}
            >
              <span>{langNames[code]}</span>
              {code === lang && (
                <span className="text-[10px] font-extrabold uppercase text-brand-green">{d.nav.current}</span>
              )}
            </button>
          ))}
          <p className="border-t border-brand-navy/8 px-4 pt-2 text-[11px] leading-snug text-brand-navy/40">
            {d.nav.langNote}
          </p>
        </div>
      )}
    </div>
  );
}

function SearchBox({ className = "", onDone }: { className?: string; onDone?: () => void }) {
  const { lang, d } = useLang();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    const faqHit = /faq|return|age|size|material|certificat|售后|材质|尺寸|年龄/i.test(query);
    if (faqHit) {
      navigate(withLang(query ? `/faq?q=${encodeURIComponent(query)}` : "/faq", lang));
    } else {
      navigate(withLang(query ? `/products?q=${encodeURIComponent(query)}` : "/products", lang));
    }
    setQ("");
    onDone?.();
  };

  return (
    <form onSubmit={submit} role="search" className={`flex items-center overflow-hidden rounded-full border border-brand-navy/12 bg-brand-sand focus-within:border-brand-blue ${className}`}>
      <Icon name="search" className="ml-3.5 h-4 w-4 shrink-0 text-brand-navy/40" />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={d.nav.searchPh}
        aria-label={d.nav.search}
        className="w-full bg-transparent px-2.5 py-2 text-sm font-bold text-brand-navy placeholder:text-brand-navy/35 focus:outline-none"
      />
    </form>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { d } = useLang();

  const links = [
    { to: "/products", label: d.nav.products },
    { to: "/explore", label: d.nav.inspiration },
    { to: "/learn", label: d.nav.learn },
    { to: "/faq", label: d.nav.faq },
    { to: "/about", label: d.nav.about },
    { to: "/contact", label: d.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* announcement bar */}
      <div className="bg-brand-navy text-white">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-x-8 gap-y-1 overflow-hidden px-4 text-[11px] font-bold uppercase tracking-wider sm:px-6 lg:px-8">
          {d.topBar.map((t, i) => (
            <span key={t} className={`flex items-center gap-1.5 ${i > 0 ? "hidden sm:flex" : ""}`}>
              <Icon name={["shield", "check", "gift"][i] ?? "check"} className="h-3 w-3 text-brand-yellow" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* main nav — always solid for visibility */}
      <div className={`bg-white transition-shadow duration-300 ${scrolled || open ? "shadow-soft" : "shadow-xs"}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
          <Link to="/" className="flex shrink-0 items-center" aria-label="KIDAMI home">
            <img src="/logo.png" alt="KIDAMI logo" className="h-14 w-auto object-contain" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2.5 text-[15px] font-extrabold transition-colors ${
                    isActive ? "bg-brand-navy text-white" : "text-brand-navy/75 hover:bg-brand-sky hover:text-brand-navy"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <SearchBox className="hidden w-40 md:flex lg:w-56" />
            <Link
              to="/faq"
              className="hidden rounded-full px-3 py-2 text-sm font-extrabold text-brand-navy/70 hover:bg-brand-sky hover:text-brand-navy lg:inline-flex"
            >
              {d.nav.faq}
            </Link>
            <div className="hidden sm:block">
              <LanguageMenu />
            </div>
            <div className="hidden w-64 xl:block">
              <StoreButtons content="nav" size="sm" />
            </div>
            <a
              href={AMAZON_STORE}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="hidden items-center gap-2 rounded-full bg-brand-orange px-4 py-2.5 text-sm font-extrabold text-white shadow-soft xl:hidden sm:inline-flex"
            >
              <Icon name="cart" className="h-4 w-4" />
              {d.nav.buy}
            </a>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-navy md:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav className="border-t border-brand-navy/10 bg-white px-4 py-4 md:hidden" aria-label="Mobile navigation">
          <SearchBox className="mb-3" onDone={() => setOpen(false)} />
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className="block rounded-xl px-4 py-3 text-base font-bold text-brand-navy hover:bg-brand-sky"
            >
              {l.label}
            </NavLink>
          ))}
          <div className="mt-2 flex justify-center">
            <LanguageMenu />
          </div>
          <StoreButtons content="nav-mobile" className="mt-3" />
        </nav>
      )}
    </header>
  );
}
