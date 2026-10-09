import Image from "next/image";
import Link from "next/link";
import { ArrowDown, TrendingUp, Sparkles, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50/40 to-slate-50 pt-8 pb-14 sm:py-16 border-b border-slate-200/60">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Eyebrow, Heading, Subtitle, CTA */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Eyebrow / Small Text */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>নিত্যদিনের নির্ভরযোগ্য বাজার দর মনিটর</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.2] sm:leading-[1.15]">
              সঠিক বাজার দর জানুন,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                সচেতনভাবে
              </span>{" "}
              কেনাকাটা করুন।
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              প্রতিদিনের তাজা শাকসবজি, মাছ-মাংস ও চাল-ডালের হালনাগাদ দরদাম এক নজরে। বিভিন্ন বাজারের তুলনা করে আপনার কেনাকাটা করুন সহজ ও সাশ্রয়ী।
            </p>

            {/* CTA and Highlights */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {/* Primary CTA button scrolling to #সব-পণ্য */}
              <Link
                href="#সব-পণ্য"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition shadow-lg shadow-emerald-600/25 cursor-pointer text-base"
              >
                <span>সব পণ্য দেখুন</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </Link>

              <div className="flex items-center gap-4 text-xs font-medium text-slate-500 pt-1">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  যাচাইকৃত তথ্য
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  দৈনিক বিশ্লেষণ
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Banner Image */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-square sm:aspect-4/3 lg:aspect-square flex items-center justify-center">
              <div className="absolute inset-4 rounded-3xl bg-gradient-to-tr from-emerald-400/20 via-teal-300/15 to-transparent blur-xl" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-emerald-100/80 shadow-2xl shadow-emerald-950/5 bg-white/70 p-4 flex items-center justify-center">
                <Image
                  src="/bazar-hero.png"
                  alt="বাজার দর হিরো ব্যানার"
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
