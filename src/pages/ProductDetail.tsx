import { useState } from "react";
import { useParams } from "react-router-dom";
import { skills, amazonCta, walmartCta } from "../data/products";
import { StoreButtons } from "../components/StoreButtons";
import { useProduct } from "../hooks/useSupabaseData";
import { ProductCard } from "../components/ProductCard";
import { Icon, Stars } from "../components/Icon";
import { Link, useLang, withLang } from "../i18n/core";
import { useSeo } from "../lib/seo";
import { useReveal } from "../lib/reveal";
import { productBadges, productGallery, productImage, productPriceHint, productReviewCount } from "../lib/productFields";

export function ProductDetail() {
  const { slug } = useParams();
  const { lang, d } = useLang();
  const dt = d.detail;
  const { product, loading: productLoading } = useProduct(slug ?? "");
  const pd = product ? d.products[product.slug as keyof typeof d.products] : undefined;
  const [activeImg, setActiveImg] = useState(0);

  const name = pd?.name ?? product?.name ?? "Product";
  const tagline = pd?.tagline ?? product?.tagline ?? "";
  const badges = product ? productBadges(product, pd?.badges) : [];
  const features = pd?.features ?? product?.features ?? [];
  const specs = pd?.specs ?? product?.specs ?? [];
  const education = pd?.education ?? product?.education ?? "";

  useSeo({
    title: name,
    description: product
      ? `${tagline} ${d.common.ages} ${product.age}. ${badges.join(", ")}. ${dt.certLine}`
      : "KIDAMI product",
    path: withLang(`/products/${slug}`, lang),
    jsonLd: product
      ? [
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://kidami-ent.com/" },
              { "@type": "ListItem", position: 2, name: "Products", item: "https://kidami-ent.com/products" },
              { "@type": "ListItem", position: 3, name, item: `https://kidami-ent.com/products/${product.slug}` },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name,
            description: tagline,
            image: `https://kidami-ent.com${productImage(product)}`,
            brand: { "@type": "Brand", name: "KIDAMI" },
            category: product.category === "cars" ? "Die-cast toy cars" : "Educational board games",
            audience: { "@type": "PeopleAudience", suggestedMinAge: product.age.replace("+", "") },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: productReviewCount(product),
            },
            offers: [
              {
                "@type": "Offer",
                url: amazonCta(product.slug),
                availability: "https://schema.org/InStock",
                seller: { "@type": "Organization", name: "Amazon" },
                priceCurrency: "USD",
              },
              {
                "@type": "Offer",
                url: walmartCta(product.slug),
                availability: "https://schema.org/InStock",
                seller: { "@type": "Organization", name: "Walmart" },
                priceCurrency: "USD",
              },
            ],
            review: d.reviews.slice(0, 3).map((r) => ({
              "@type": "Review",
              author: { "@type": "Person", name: r.name },
              reviewRating: { "@type": "Rating", ratingValue: r.stars },
              reviewBody: r.text,
            })),
          },
        ]
      : undefined,
  });
  useReveal();

  if (productLoading && !product) return <div className="pt-40 text-center text-brand-navy/50">Loading...</div>;
  if (!product) {
    return (
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-40 text-center">
        <h1 className="font-display text-3xl font-extrabold text-brand-navy">{dt.notFound}</h1>
        <Link to="/products" className="mt-6 inline-block font-bold text-brand-blue hover:underline">
          {dt.back}
        </Link>
      </div>
    );
  }

  const related: any[] = []; // Related products loaded separately
  const isCars = product.category === "cars";
  const gallery = productGallery(product);

  return (
    <div className="bg-brand-sand pt-28 lg:pt-32">
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        {/* breadcrumb */}
        <nav className="py-4 text-sm font-bold text-brand-navy/50" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-brand-navy">{dt.home}</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-brand-navy">{dt.products}</Link>
          <span className="mx-2">/</span>
          <span className="text-brand-navy">{name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* gallery */}
          <div>
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
              <img
                src={gallery[activeImg]}
                alt={`${name} — ${activeImg + 1}`}
                className="aspect-square w-full object-cover"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-4 flex gap-3">
                {gallery.map((g: string, i: number) => (
                  <button
                    key={g}
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`overflow-hidden rounded-2xl border-2 transition-all ${
                      i === activeImg ? "border-brand-orange" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={g} alt="" className="h-20 w-20 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* info */}
          <div>
            <span className={`inline-flex rounded-full px-3.5 py-1.5 text-xs font-extrabold text-white ${isCars ? "bg-brand-blue" : "bg-brand-green"}`}>
              {d.common.ages} {product.age}
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-brand-navy text-balance">
              {name}
            </h1>
            <div className="mt-3 flex items-center gap-2.5">
              <Stars rating={product.rating} className="h-5 w-5" />
              <span className="font-extrabold text-brand-navy">{product.rating}</span>
              <span className="text-sm text-brand-navy/50">· {productReviewCount(product)} {dt.reviews}</span>
            </div>
            <p className="mt-5 text-lg leading-relaxed text-brand-navy/70">{tagline}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {badges.map((b: string) => (
                <span key={b} className="rounded-full bg-brand-sky px-3.5 py-1.5 text-xs font-extrabold text-brand-navy">
                  {b}
                </span>
              ))}
            </div>

            {/* play skills */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/40">{dt.builds}</span>
              {product.skills.map((sk) => {
                const info = skills.find((s) => s.key === sk);
                if (!info) return null;
                return (
                  <Link
                    key={sk}
                    to={`/explore?skill=${sk}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-brand-navy/10 px-3 py-1 text-xs font-extrabold text-brand-navy/70 transition-colors hover:border-brand-blue hover:text-brand-blue"
                  >
                    <Icon name={info.icon} className="h-3.5 w-3.5" />
                    {d.skills[sk as keyof typeof d.skills].name}
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 rounded-3xl bg-white p-6 shadow-soft">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-navy/40">{dt.typicalPrice}</p>
                  <p className="font-display text-2xl font-extrabold text-brand-navy">{productPriceHint(product)}</p>
                </div>
                <div className="w-full sm:w-auto sm:min-w-[280px]">
                  <StoreButtons content={`pdp-${product.slug}`} />
                </div>
              </div>
              <p className="mt-4 flex items-center gap-2 text-xs font-bold text-brand-navy/50">
                <Icon name="shield" className="h-4 w-4 text-brand-green" />
                {dt.certLine}
              </p>
            </div>

            {/* features */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((f, i) => (
                <div key={f.label} className="rounded-2xl bg-white p-5 shadow-xs">
                  <Icon name={(product.features[i] as any)?.icon ?? "check"} className="h-6 w-6 text-brand-blue" />
                  <h3 className="mt-2.5 font-display font-bold text-brand-navy">{f.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-brand-navy/60">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* specs + education */}
        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          <div className="reveal rounded-[2rem] bg-white p-8 shadow-soft lg:col-span-2">
            <h2 className="font-display text-2xl font-extrabold text-brand-navy">{dt.specs}</h2>
            <dl className="mt-6 divide-y divide-brand-navy/8">
              {specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-6 py-3.5">
                  <dt className="text-sm font-bold text-brand-navy/50">{s.label}</dt>
                  <dd className="text-right text-sm font-extrabold text-brand-navy">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="reveal rounded-[2rem] bg-brand-cream p-8 lg:col-span-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-green">{dt.whyMatters}</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-brand-navy">
              {dt.learnInside}
            </h2>
            <p className="mt-4 leading-relaxed text-brand-navy/70">{education}</p>
            <Link to="/learn" className="mt-6 inline-flex items-center gap-2 font-display font-bold text-brand-navy hover:text-brand-orange transition-colors">
              {dt.moreLearning}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-3xl font-extrabold text-brand-navy">{dt.related}</h2>
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-navy/10 bg-white/95 p-3 backdrop-blur lg:hidden">
        <StoreButtons content={`pdp-sticky-${product.slug}`} />
      </div>
    </div>
  );
}
