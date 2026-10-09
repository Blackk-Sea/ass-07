import Link from "next/link";
import { Product } from "@/types";
import { formatPrice, formatUnit, formatChange } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const change = formatChange(product.change);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-xl hover:shadow-emerald-950/5 hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        {/* Top: Category Tag & Change Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
            <span>{product.categoryIcon}</span>
            <span>{product.categoryNameBn}</span>
          </span>

          <span
            className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border ${change.colorClass}`}
          >
            {change.text}
          </span>
        </div>

        {/* Product Emoji & Name */}
        <div className="flex items-center gap-3.5 my-2">
          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl group-hover:scale-110 transition shadow-inner">
            {product.image || product.categoryIcon || "🛒"}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition text-base leading-snug">
              {product.nameBn}
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              {formatUnit(product.unit)}
            </p>
          </div>
        </div>
      </div>

      {/* Price Row: label "আজকের দাম" + value + view details icon */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-medium text-slate-400 block">আজকের দাম</span>
          <span className="text-lg font-black text-slate-900 tracking-tight">
            {formatPrice(product.today)}
          </span>
        </div>

        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition flex items-center justify-center shadow-xs">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
