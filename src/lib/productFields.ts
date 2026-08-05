import type { Product as StaticProduct } from "../data/products";
import type { Product as SupaProduct } from "../hooks/useSupabaseData";

export type AnyProduct = StaticProduct | SupaProduct;

export function productImage(product: AnyProduct): string {
  return "image_url" in product ? product.image_url : product.image;
}

export function productGallery(product: AnyProduct): string[] {
  if ("gallery" in product && product.gallery.length > 0) return product.gallery;
  return [productImage(product)];
}

export function productReviewCount(product: AnyProduct): number {
  return "review_count" in product ? product.review_count : product.reviewCount;
}

export function productPriceHint(product: AnyProduct): string {
  return "price_hint" in product ? product.price_hint : product.priceHint;
}

export function productBadges(product: AnyProduct, localized?: string[]): string[] {
  if (localized?.length) return localized;
  if ("badges" in product && product.badges.length > 0) return product.badges;
  return product.features.map((f) => f.label);
}
