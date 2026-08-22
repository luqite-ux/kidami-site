import { useEffect, type ReactElement } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LangProvider, langCodes } from "./i18n/core";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Explore } from "./pages/Explore";
import { About } from "./pages/About";
import { Learn } from "./pages/Learn";
import { Article } from "./pages/Article";
import { Contact } from "./pages/Contact";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { NotFound } from "./pages/NotFound";
import { Faq } from "./pages/Faq";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const pages: { path: string; el: ReactElement }[] = [
  { path: "/", el: <Home /> },
  { path: "/products", el: <Products /> },
  { path: "/products/:slug", el: <ProductDetail /> },
  { path: "/explore", el: <Explore /> },
  { path: "/about", el: <About /> },
  { path: "/learn", el: <Learn /> },
  { path: "/learn/:slug", el: <Article /> },
  { path: "/contact", el: <Contact /> },
  { path: "/faq", el: <Faq /> },
  { path: "/privacy", el: <Privacy /> },
  { path: "/terms", el: <Terms /> },
];

// "" = English (no prefix), then one prefix per non-English language
const prefixes = ["", ...langCodes.filter((c) => c !== "en").map((c) => `/${c}`)];

const allRoutes = prefixes.flatMap((pre) =>
  pages.map((p) => {
    const full = pre === "" ? p.path : pre + (p.path === "/" ? "" : p.path);
    return <Route key={full || pre} path={full === "" ? "/" : full} element={p.el} />;
  })
);

export default function App() {
  return (
    <LangProvider>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          {allRoutes}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </LangProvider>
  );
}
