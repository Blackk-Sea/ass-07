"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Category, Product } from "@/types";
import ProductCard from "@/components/products/ProductCard";
import { toBengaliNumber } from "@/lib/utils";
import { ArrowLeft, ArrowUpDown, ChevronDown, PackageX, Search } from "lucide-react";

interface CategoryViewProps {
  category: Category | null;
  products: Product[];
}

type SortOption = "default" | "price-asc" | "price-desc";

export default function CategoryView({ category, products }: CategoryViewProps) {
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => p.nameBn.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q));
    }

    if (sortBy === "price-asc") {
      return list.sort((a, b) => a.today - b.today);
    }
    if (sortBy === "price-desc") {
      return list.sort((a, b) => b.today - a.today);
    }
    return list;
  }, [products, sortBy, searchQuery]);

  // Empty state / invalid slug (Figma: ← হোম পেজে ফিরে যান)
  if (!category || products.length === 0) {
    return (
      <div className="py-20 px-4 text-center max-w-md mx-auto space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-[#f0f5f0] text-slate-400 flex items-center justify-center mx-auto">
          <PackageX className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-[#1d271f]">কোনো পণ্য পাওয়া যায়নি</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য তালিকাভুক্ত নেই।
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#05893e] text-white text-xs sm:text-sm font-bold hover:bg-[#047f39] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#e1e8e1] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2.5 bg-[#f0f5f0] rounded-2xl border border-[#e1e8e1]">
              {category.icon}
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1d271f] tracking-tight">
                {category.nameBn}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                মোট {toBengaliNumber(filteredAndSortedProducts.length)}টি পণ্য দেখানো হচ্ছে
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="পণ্যের নাম লিখুন…"
              className="w-full sm:w-52 pl-10 pr-4 py-2 bg-white border border-[#e1e8e1] rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#05893e]/20 focus:border-[#05893e] transition shadow-2xs"
            />
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
                className="appearance-none bg-white border border-[#e1e8e1] rounded-xl px-3.5 py-2 pr-9 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#05893e]/20 focus:border-[#05893e] transition cursor-pointer shadow-2xs"
              >
                <option value="default">ডিফল্ট</option>
                <option value="price-asc">দাম: কম থেকে বেশি</option>
                <option value="price-desc">দাম: বেশি থেকে কম</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#e1e8e1] p-8">
          <p className="text-slate-500 text-sm">
            &ldquo;{searchQuery}&rdquo; দিয়ে এই ক্যাটাগরিতে কোনো পণ্য খুঁজে পাওয়া যায়নি।
          </p>
        </div>
      ) : (
        /* Product Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
