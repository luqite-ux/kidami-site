import { amazonCta, walmartCta } from "../data/products";
import { useLang } from "../i18n/core";
import { Icon } from "./Icon";

type Size = "sm" | "md";

export function StoreButtons({
  content,
  size = "md",
  className = "",
}: {
  content: string;
  size?: Size;
  className?: string;
}) {
  const { d } = useLang();
  const pad = size === "sm" ? "px-4 py-2 text-xs" : "px-5 py-2.5 text-sm";

  return (
    <div className={`grid grid-cols-2 gap-2 ${className}`}>
      <a
        href={amazonCta(content)}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={`inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-orange ${pad} font-extrabold text-white transition-transform hover:scale-[1.03]`}
      >
        <Icon name="cart" className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
        {d.common.buyAmazon}
      </a>
      <a
        href={walmartCta(content)}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={`inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-brand-blue/25 bg-white ${pad} font-extrabold text-brand-blue transition-colors hover:border-brand-blue`}
      >
        <Icon name="cart" className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
        {d.common.shopWalmart}
      </a>
    </div>
  );
}
