"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { Product } from "@/types";
import { formatPrice, formatUnit, formatChange, toBengaliNumber } from "@/lib/utils";
import {
  ArrowLeft,
  Loader2,
  Lock,
  Store,
  MapPin,
  TrendingUp,
  TrendingDown,
  BarChart3,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

interface ProductDetailsClientProps {
  product: Product | null;
  slug: string;
}

export default function ProductDetailsClient({ product, slug }: ProductDetailsClientProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("পণ্যের বিস্তারিত বাজারদর দেখতে অনুগ্রহ করে সাইন ইন করুন।");
      router.push(`/signin?redirect=/product/${slug}`);
    }
  }, [session, isPending, router, slug]);

  if (isPending) {
    return (
      <div className="flex-1 flex items-center justify-center py-24">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
          <p className="text-slate-500 text-sm">পণ্যের তথ্য যাচাই করা হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 px-4">
        <div className="text-center max-w-md mx-auto space-y-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">লগইন প্রয়োজন</h2>
          <p className="text-sm text-slate-500">
            এই পৃষ্ঠাটি সুরক্ষিত। বিস্তারিত দেখতে অনুগ্রহ করে আপনার অ্যাকাউন্টে সাইন ইন করুন।
          </p>
          <div className="pt-2">
            <Link
              href={`/signin?redirect=/product/${slug}`}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
            >
              সাইন ইন করুন
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 px-4">
        <div className="text-center max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">পণ্যটি পাওয়া যায়নি</h2>
          <p className="text-slate-500 text-sm">
            আপনি যে পণ্যের তথ্য খুঁজছেন তা বর্তমানে ডাটাবেজে নেই।
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোমে ফিরুন</span>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate Price Summary: Min, Max, Average
  const markets = product.markets || [];
  let minPrice = product.today;
  let maxPrice = product.today;
  let avgPrice = product.today;

  if (markets.length > 0) {
    const minValues = markets.map((m) => m.min);
    const maxValues = markets.map((m) => m.max);
    minPrice = Math.min(...minValues);
    maxPrice = Math.max(...maxValues);
    const allMarketValues = markets.flatMap((m) => [m.min, m.max]);
    avgPrice = Math.round(allMarketValues.reduce((a, b) => a + b, 0) / allMarketValues.length);
  }

  const change = formatChange(product.change);

  return (
    <div className="space-y-8 max-w-5xl mx-auto w-full py-6">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-emerald-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>সকল পণ্যে ফিরে যান</span>
        </Link>
      </div>

      {/* Top — Summary Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-start sm:items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-4xl sm:text-5xl shadow-inner shrink-0">
              {product.image || product.categoryIcon || "🛒"}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span>{product.categoryIcon}</span>
                  <span>{product.categoryNameBn}</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                  {formatUnit(product.unit)}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {product.nameBn}
              </h1>
              <p className="text-sm text-slate-500 mt-1 max-w-xl">
                বিভিন্ন বিভাগীয় আড়ত ও পাইকারি-খুচরা বাজারের সমন্বিত বাজার দর মনিটরিং সামারি।
              </p>
            </div>
          </div>

          {/* Today's Average Price & Change badge */}
          <div className="sm:text-right bg-slate-50 sm:bg-transparent p-4 sm:p-0 rounded-2xl">
            <span className="text-xs font-medium text-slate-400 block">আজকের গড় মূল্য</span>
            <div className="text-3xl font-black text-slate-900 tracking-tight my-1">
              {formatPrice(product.today)}
            </div>
            <span
              className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full border ${change.colorClass}`}
            >
              {change.text}
            </span>
          </div>
        </div>

        {/* Historical Price Trend Row */}
        <div className="grid grid-cols-3 gap-3 pt-6 text-center">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-400 font-medium block">গতকালকের দাম</span>
            <span className="text-sm sm:text-base font-bold text-slate-800">
              {formatPrice(product.yesterday)}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-400 font-medium block">গত সপ্তাহের দাম</span>
            <span className="text-sm sm:text-base font-bold text-slate-800">
              {formatPrice(product.lastWeek)}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-400 font-medium block">গত মাসের দাম</span>
            <span className="text-sm sm:text-base font-bold text-slate-800">
              {formatPrice(product.lastMonth)}
            </span>
          </div>
        </div>
      </div>

      {/* Price - Summary Cards (Min, Max, Average) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Minimum Price */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 block">সর্বনিম্ন বাজার দর</span>
            <span className="text-2xl font-black text-emerald-700 tracking-tight mt-1 block">
              {formatPrice(minPrice)}
            </span>
            <span className="text-[11px] text-slate-400">দেশব্যাপী বিভিন্ন বাজারে</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingDown className="w-6 h-6" />
          </div>
        </div>

        {/* Average Price */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 block">গড় বাজার দর</span>
            <span className="text-2xl font-black text-slate-900 tracking-tight mt-1 block">
              {formatPrice(avgPrice)}
            </span>
            <span className="text-[11px] text-slate-400">{formatUnit(product.unit)}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>

        {/* Maximum Price */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 block">সর্বোচ্চ বাজার দর</span>
            <span className="text-2xl font-black text-rose-700 tracking-tight mt-1 block">
              {formatPrice(maxPrice)}
            </span>
            <span className="text-[11px] text-slate-400">দেশব্যাপী বিভিন্ন বাজারে</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম (Market breakdown) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">বাজারভিত্তিক আজকের দাম</h2>
              <p className="text-xs text-slate-500">
                দেশের বিভিন্ন প্রধান প্রধান বাজার ও পাইকারি মোকামের মূল্যতালিকা
              </p>
            </div>
          </div>
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
            <CalendarDays className="w-3.5 h-3.5" />
            দৈনিক হালনাগাদ
          </span>
        </div>

        {markets.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            এই পণ্যের জন্য আলাদা বাজার তালিকা পাওয়া যায়নি।
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold">বাজারের নাম</th>
                  <th className="py-3 px-4 font-semibold">বিভাগ</th>
                  <th className="py-3 px-4 font-semibold text-right">সর্বনিম্ন দর</th>
                  <th className="py-3 px-4 font-semibold text-right">সর্বোচ্চ দর</th>
                  <th className="py-3 px-4 font-semibold text-right">গড় মূল্য</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {markets.map((m, index) => {
                  const marketAvg = Math.round((m.min + m.max) / 2);
                  return (
                    <tr
                      key={`${m.market}-${index}`}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-semibold text-slate-800 flex items-center gap-2">
                        <Store className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{m.market}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-xs font-medium">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {m.division}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right text-emerald-700 font-semibold">
                        {toBengaliNumber(m.min)} ৳
                      </td>
                      <td className="py-3.5 px-4 text-right text-rose-700 font-semibold">
                        {toBengaliNumber(m.max)} ৳
                      </td>
                      <td className="py-3.5 px-4 text-right font-black text-slate-900">
                        {toBengaliNumber(marketAvg)} ৳
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
