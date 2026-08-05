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
import { Contact } from "./pages/Contact";

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
  { path: "/contact", el: <Contact /> },
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
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </LangProvider>
  );
}
