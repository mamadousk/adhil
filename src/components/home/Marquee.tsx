import Image from "next/image";
import { MARQUEE_ITEMS } from "@/lib/site";
import {
  AdidasIcon,
  JordanIcon,
  NewBalanceIcon,
  StockXIcon,
} from "@/components/BrandIcons";

const svgMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Adidas Confirmed": AdidasIcon,
  StockX: StockXIcon,
  Jordan: JordanIcon,
  "New Balance": NewBalanceIcon,
};

const imageMap: Record<string, string> = {
  "Nike SNKRS": "/images/brands/nike.png",
};

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10 md:gap-14 md:pr-14">
      {MARQUEE_ITEMS.map((item) => {
        const img = imageMap[item];
        const Icon = svgMap[item];
        return (
          <div key={item} className="flex items-center gap-3 text-fg-inverse-muted/90">
            {img ? (
              <Image src={img} alt={item} width={56} height={56} className="h-6 w-auto object-contain opacity-90 md:h-7" />
            ) : Icon ? (
              <Icon className="size-6 md:size-7" />
            ) : (
              <span className="size-1.5 rounded-full bg-accent/70" />
            )}
            <span className="font-display text-sm font-semibold tracking-wide whitespace-nowrap md:text-base">
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-line-inverse bg-bg-inverse-soft py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-bg-inverse-soft to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-bg-inverse-soft to-transparent" />
      <div className="flex animate-marquee hover:[animation-play-state:paused]">
        <Row />
        <Row />
      </div>
    </div>
  );
}
