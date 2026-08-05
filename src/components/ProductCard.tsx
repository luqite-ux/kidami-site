import { Link, useLang } from "../i18n/core";
import type { Product } from "../data/products";
import type { Product as SupaProduct } from "../hooks/useSupabaseData";
import { amazonCta } from "../data/products";
import { productBadges, productImage, productPriceHint, productReviewCount } from "../lib/productFields";
import { Icon, Stars } from "./Icon";

export function ProductCard({ product }: { product: Product | SupaProduct }) {
  const { d } = useLang();
  const pd = d.products[product.slug as keyof typeof d.products];
  const isCars = product.category === "cars";

  const name = pd?.name ?? product.name;
  const tagline = pd?.tagline ?? product.tagline;
  const badges = productBadges(product, pd?.badges);

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-lift card-3d">
      <Link to={`/products/${product.slug}`} className="relative block overflow-hidden bg-brand-cream">
        <img
          src={productImage(product)}
          alt={name}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-extrabold text-white ${
            isCars ? "bg-brand-blue" : "bg-brand-green"
          }`}
        >
          {d.common.ages} {product.age}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="text-xs font-bold text-brand-navy/50">
            {product.rating} ({productReviewCount(product)})
          </span>
        </div>
        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-brand-navy">
          <Link to={`/products/${product.slug}`} className="hover:text-brand-blue">
            {name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-brand-navy/60">{tagline}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {badges.map((b) => (
            <span key={b} className="rounded-full bg-brand-sky px-2.5 py-0.5 text-[11px] font-bold text-brand-navy/70">
              {b}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-sm font-extrabold text-brand-navy">{productPriceHint(product)}</span>
          <a
            href={amazonCta(product.slug)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-4 py-2 text-xs font-extrabold text-white transition-transform hover:scale-105"
          >
            <Icon name="cart" className="h-3.5 w-3.5" />
            {d.common.buyAmazon}
          </a>
        </div>
      </div>
    </article>
  );
}
