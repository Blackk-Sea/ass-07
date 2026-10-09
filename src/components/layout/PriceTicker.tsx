"use client";

import Link from "next/link";
import { Product } from "@/types";
import { formatPrice, formatUnit, formatChange } from "@/lib/utils";

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
  if (!products || products.length === 0) return null;

  // Duplicate the list to create a seamless infinite loop
  const tickerItems = [...products, ...products];

  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 text-slate-200 text-xs overflow-hidden select-none py-2 relative shadow-inner">
      <div className="animate-marquee items-center gap-6">
        {tickerItems.map((item, index) => {
          const change = formatChange(item.change);
          return (
            <Link
              key={`${item.id}-${index}`}
              href={`/product/${item.slug}`}
              className="inline-flex items-center gap-2 hover:text-emerald-400 transition whitespace-nowrap px-3 py-0.5 rounded-full hover:bg-slate-800/60"
            >
              <span className="text-sm">{item.image}</span>
              <span className="font-medium text-slate-100">{item.nameBn}</span>
              <span className="text-slate-300 font-semibold">{formatPrice(item.today)}</span>
              <span className="text-slate-400 text-[11px]">({formatUnit(item.unit)})</span>
              <span
                className={`text-[11px] font-bold px-1.5 py-0.2 rounded ${
                  item.change.dir === "up"
                    ? "text-emerald-400 bg-emerald-950/70"
                    : item.change.dir === "down"
                    ? "text-rose-400 bg-rose-950/70"
                    : "text-slate-400 bg-slate-800"
                }`}
              >
                {change.text}
              </span>
              <span className="text-slate-600 ml-2">•</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
