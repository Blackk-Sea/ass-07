"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { ArrowUpDown, ChevronDown } from "lucide-react";

interface AllProductsSectionProps {
  initialProducts: Product[];
}

type SortOption = "default" | "price-asc" | "price-desc";

export default function AllProductsSection({ initialProducts }: AllProductsSectionProps) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const list = [...initialProducts];
    if (sortBy === "price-asc") {
      // Sort numerically
      return list.sort((a, b) => a.today - b.today);
    }
    if (sortBy === "price-desc") {
      // Sort numerically
      return list.sort((a, b) => b.today - a.today);
    }
    return list;
  }, [initialProducts, sortBy]);

  return (
    <section id="সব-পণ্য" className="py-12 scroll-mt-24">
      {/* Header & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              সব পণ্য
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
              {initialProducts.length}টি পণ্য
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            নিত্যপ্রয়োজনীয় সকল খাদ্য ও মুদিপণ্যের আজকের সর্বশেষ খুচরা বাজার মূল্য
          </p>
        </div>

        {/* Challenge C1: Sort dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <label htmlFor="sort-select" className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>সাজান:</span>
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-white border border-slate-200 rounded-xl px-3.5 py-2 pr-9 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition cursor-pointer shadow-xs"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Responsive Products Grid: 3-4 cols on large screens, collapses on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
