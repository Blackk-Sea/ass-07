import Navbar from "@/components/layout/Navbar";
import PriceTicker from "@/components/layout/PriceTicker";
import Hero from "@/components/home/Hero";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import AllProductsSection from "@/components/products/AllProductsSection";
import { getCategories, getProducts, getTopRisers, getTopFallers } from "@/lib/api";
import { TrendingUp, TrendingDown } from "lucide-react";

export default async function Home() {
  const [categories, products, risers, fallers] = await Promise.all([
    getCategories(),
    getProducts(),
    getTopRisers(6),
    getTopFallers(6),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      {/* 1. Navbar */}
      <Navbar categories={categories} />

      {/* Price Ticker Marquee */}
      <PriceTicker products={products} />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Product Sections Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-14 py-12">
        {/* Section A: আজ দাম বেড়েছে ▲ */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>আজ দাম বেড়েছে</span>
                  <span className="text-emerald-600 font-bold">▲</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  গতকালের তুলনায় যেসকল পণ্যের দাম আজ বৃদ্ধি পেয়েছে (শীর্ষ ৬টি)
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Section B: আজ দাম কমেছে ▼ */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-rose-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shadow-xs">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>আজ দাম কমেছে</span>
                  <span className="text-rose-600 font-bold">▼</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  গতকালের তুলনায় যেসকল পণ্যের দাম আজ হ্রাস পেয়েছে (শীর্ষ ৬টি)
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {fallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Section C: সব পণ্য with C1 Sort Dropdown */}
        <AllProductsSection initialProducts={products} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
