import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Left Requirement */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 p-1 flex items-center justify-center">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                © {new Date().getFullYear()} সর্বস্বত্ব সংরক্ষিত।
              </p>
            </div>
          </div>

          {/* Right Requirement */}
          <div className="text-xs text-slate-500 italic max-w-md md:text-right">
            “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
          </div>
        </div>
      </div>
    </footer>
  );
}
