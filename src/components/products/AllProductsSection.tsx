"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { toBengaliNumber } from "@/lib/utils";
import { ArrowUpDown, ChevronDown, Search } from "lucide-react";

interface AllProductsSectionProps {
  initialProducts: Product[];
}

type SortOption = "default" | "price-asc" | "price-desc";

export default function AllProductsSection({ initialProducts }: AllProductsSectionProps) {
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...initialProducts];

    // Filter by search query (Figma: "পণ্যের নাম লিখুন…")
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.nameBn.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.categoryNameBn.toLowerCase().includes(q)
      );
    }

    // Sort numerically (Challenge C1)
    if (sortBy === "price-asc") {
      return list.sort((a, b) => a.today - b.today);
    }
    if (sortBy === "price-desc") {
      return list.sort((a, b) => b.today - a.today);
    }
    return list;
  }, [initialProducts, sortBy, searchQuery]);

  return (
    <section id="সব-পণ্য" className="py-12 scroll-mt-24">
      {/* Header, Search & Sort */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1d271f] tracking-tight">
            সব পণ্য
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            মোট {toBengaliNumber(filteredAndSortedProducts.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Box (from Figma) */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="পণ্যের নাম লিখুন…"
              className="w-full sm:w-56 pl-10 pr-4 py-2 bg-white border border-[#e1e8e1] rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#05893e]/20 focus:border-[#05893e] transition shadow-2xs"
            />
          </div>

          {/* Challenge C1: Sort dropdown */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <label htmlFor="all-sort" className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>সাজান:</span>
            </label>
            <div className="relative">
              <select
                id="all-sort"
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
            &ldquo;{searchQuery}&rdquo; দিয়ে কোনো পণ্য খুঁজে পাওয়া যায়নি।
          </p>
        </div>
      ) : (
        /* Responsive Products Grid (3-4 cols on large screens, collapses on mobile) */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
