import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 min-h-[60vh] flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-md mx-auto space-y-5">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <SearchX className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900">পৃষ্ঠাটি পাওয়া যায়নি (৪০৪)</h1>
          <p className="text-slate-600 text-sm">
            আপনি যে পণ্য বা পাতাটি খুঁজছেন তা বিদ্যমান নেই অথবা অন্য কোথাও সরিয়ে নেওয়া হয়েছে।
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
