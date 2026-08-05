import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link, NavLink, useLang, langCodes, langNames, stripLang, withLang, type LangCode } from "../i18n/core";
import { Icon } from "./Icon";
import { AMAZON_STORE } from "../data/products";

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

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { d } = useLang();

  const links = [
    { to: "/products", label: d.nav.products },
    { to: "/explore", label: d.nav.inspiration },
    { to: "/learn", label: d.nav.learn },
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow-soft backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <Link to="/" className="flex items-center" aria-label="KIDAMI home">
          <img src="/logo.png" alt="KIDAMI logo" className="h-10 w-auto object-contain" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-[15px] font-bold transition-colors ${
                  isActive ? "bg-brand-sky text-brand-navy" : "text-brand-navy/70 hover:bg-brand-sky/60 hover:text-brand-navy"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden sm:block">
            <LanguageMenu />
          </div>
          <a
            href={AMAZON_STORE}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="hidden items-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-sm font-extrabold text-white shadow-soft transition-transform hover:-translate-y-0.5 hover:shadow-lift sm:inline-flex"
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

      {open && (
        <nav className="border-t border-brand-navy/10 bg-white px-4 py-4 md:hidden" aria-label="Mobile navigation">
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
          <a
            href={AMAZON_STORE}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-3 font-extrabold text-white"
          >
            <Icon name="cart" className="h-4 w-4" />
            {d.nav.buy}
          </a>
        </nav>
      )}
    </header>
  );
}
