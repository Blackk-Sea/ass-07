import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Package, Store, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f0f5f0]/70 py-10 sm:py-14 border-b border-[#e1e8e1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Eyebrow (from Figma) */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e1e8e1]/80 text-[#05893e] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#05893e] animate-pulse" />
              <span>আজকের বাজারের দাম এক নজরে</span>
            </div>

            {/* Main Heading (from Figma) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1d271f] tracking-tight leading-[1.2]">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম
            </h1>

            {/* Subtitle (from Figma) */}
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* Stats Chips (from Figma) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#e1e8e1] text-xs font-semibold text-slate-700 shadow-2xs">
                <Package className="w-3.5 h-3.5 text-[#05893e]" />
                <span>৩৩টি নিত্যদিনের পণ্য</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#e1e8e1] text-xs font-semibold text-slate-700 shadow-2xs">
                <Store className="w-3.5 h-3.5 text-[#05893e]" />
                <span>১২টি বাজার অন্তর্ভুক্ত</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#e1e8e1] text-xs font-semibold text-slate-700 shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-[#05893e]" />
                <span>৮টি বিভাগের তথ্য</span>
              </span>
            </div>

            {/* Primary CTA (from Figma) */}
            <div className="pt-3 flex justify-center lg:justify-start">
              <Link
                href="#সব-পণ্য"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#05893e] hover:bg-[#047f39] active:scale-[0.98] transition shadow-md shadow-[#05893e]/20 text-sm cursor-pointer"
              >
                <span>সব পণ্য দেখুন</span>
                <ArrowDown className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Graphic Banner */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-4/3 flex items-center justify-center">
              <Image
                src="/bazar-hero.png"
                alt="বাজার দর হিরো ব্যানার"
                fill
                className="object-contain drop-shadow-sm"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
