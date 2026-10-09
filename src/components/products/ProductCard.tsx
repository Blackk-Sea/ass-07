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
      className="group bg-white rounded-2xl border border-[#e1e8e1] p-5 shadow-2xs hover:shadow-lg hover:border-[#05893e]/50 transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        {/* Top: Category & Unit Tag + Change Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold text-slate-500 bg-[#f0f5f0] px-2 py-0.5 rounded-md">
            {formatUnit(product.unit)} · {product.categoryNameBn}
          </span>

          <span
            className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border ${
              product.change.dir === "up"
                ? "text-[#1a9951] bg-[#eef8f2] border-[#c0e6ce]"
                : product.change.dir === "down"
                ? "text-[#d03739] bg-[#fdf2f2] border-[#f8d0d1]"
                : "text-slate-600 bg-slate-100 border-slate-200"
            }`}
          >
            {change.text}
          </span>
        </div>

        {/* Product Emoji & Name */}
        <div className="flex items-center gap-3.5 my-2">
          <div className="w-12 h-12 rounded-xl bg-[#fafcfa] border border-[#e1e8e1] flex items-center justify-center text-2xl group-hover:scale-105 transition shadow-2xs shrink-0">
            {product.image || product.categoryIcon || "🛒"}
          </div>
          <div className="overflow-hidden">
            <h3 className="font-bold text-[#1d271f] group-hover:text-[#05893e] transition text-base leading-snug truncate">
              {product.nameBn}
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              {formatUnit(product.unit)}
            </p>
          </div>
        </div>
      </div>

      {/* Price Row: label "আজকের দাম" + value + unit rate */}
      <div className="mt-4 pt-3 border-t border-[#f0f5f0] flex items-center justify-between">
        <div>
          <span className="text-[11px] font-medium text-slate-400 block">আজকের দাম</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-[#1d271f] tracking-tight">
              {formatPrice(product.today)}
            </span>
          </div>
        </div>

        <div className="w-8 h-8 rounded-lg bg-[#f0f5f0] text-[#05893e] group-hover:bg-[#05893e] group-hover:text-white transition flex items-center justify-center shadow-2xs">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
