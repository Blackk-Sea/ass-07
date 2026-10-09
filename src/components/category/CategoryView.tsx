"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Category, Product } from "@/types";
import ProductCard from "@/components/products/ProductCard";
import { ArrowLeft, ArrowUpDown, ChevronDown, PackageX } from "lucide-react";

interface CategoryViewProps {
  category: Category | null;
  products: Product[];
}

type SortOption = "default" | "price-asc" | "price-desc";

export default function CategoryView({ category, products }: CategoryViewProps) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortBy === "price-asc") {
      return list.sort((a, b) => a.today - b.today);
    }
    if (sortBy === "price-desc") {
      return list.sort((a, b) => b.today - a.today);
    }
    return list;
  }, [products, sortBy]);

  // Empty state / invalid slug
  if (!category || products.length === 0) {
    return (
      <div className="py-20 px-4 text-center max-w-md mx-auto space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <PackageX className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-800">কোনো পণ্য পাওয়া যায়নি</h2>
          <p className="text-sm text-slate-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য তালিকাভুক্ত নেই।
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 bg-emerald-50 rounded-xl border border-emerald-100">
              {category.icon}
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {category.nameBn}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {products.length}টি পণ্যের আজকের বাজার দর
              </p>
            </div>
          </div>
        </div>

        {/* Sort Controls (C1) */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <label htmlFor="cat-sort" className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>সাজান:</span>
          </label>
          <div className="relative">
            <select
              id="cat-sort"
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

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
