"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, signOut } from "@/lib/auth-client";
import { Category } from "@/types";
import { getBengaliDate } from "@/lib/utils";
import { User, LogOut, Menu, X, ChevronDown, Edit3 } from "lucide-react";

interface NavbarProps {
  categories: Category[];
}

export default function Navbar({ categories }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [banglaDate, setBanglaDate] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    setBanglaDate(getBengaliDate(new Date()));
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      setProfileDropdownOpen(false);
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউটে সমস্যা হয়েছে।");
    }
  };

  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e1e8e1] shadow-2xs">
      {/* Top Bar: Brand, Date, and Auth */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Left: Brand Logo + Bangla Date */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl bg-[#f0f5f0] border border-[#e1e8e1] p-2 flex items-center justify-center shadow-2xs group-hover:scale-105 transition">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর লোগো"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-[#1d271f] tracking-tight flex items-center gap-1.5">
                <span>বাজার দর</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#eef8f2] text-[#05893e] font-bold border border-[#c0e6ce]">
                  লাইভ
                </span>
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {banglaDate || "আজকের বাজার দর"}
              </span>
            </div>
          </Link>

          {/* Right: Auth Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {isPending ? (
              <div className="w-24 h-9 bg-slate-100 animate-pulse rounded-xl" />
            ) : user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-[#e1e8e1] hover:bg-[#fafcfa] transition cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#05893e] text-white font-black text-sm flex items-center justify-center shadow-2xs">
                    {user.name ? user.name.slice(0, 1).toUpperCase() : "U"}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#1d271f] max-w-[120px] truncate">
                    {user.name || user.email}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#e1e8e1] py-2 z-50">
                    <div className="px-4 py-2 border-b border-[#f0f5f0]">
                      <div className="text-[11px] font-medium text-slate-400">লগইন করা আছে</div>
                      <div className="text-sm font-bold text-[#1d271f] truncate">{user.name}</div>
                      <div className="text-xs text-slate-500 truncate">{user.email}</div>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm text-slate-700 hover:bg-[#f0f5f0] hover:text-[#05893e] transition"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>👤 আমার প্রোফাইল</span>
                    </Link>

                    <Link
                      href="/profile/update"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm text-slate-700 hover:bg-[#f0f5f0] hover:text-[#05893e] transition"
                    >
                      <Edit3 className="w-4 h-4 text-slate-400" />
                      <span>তথ্য আপডেট</span>
                    </Link>

                    <div className="border-t border-[#f0f5f0] my-1" />

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm text-[#d03739] hover:bg-[#fdf2f2] transition cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4 text-[#d03739]" />
                      <span>↩ সাইন আউট</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-[#f0f5f0] transition"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#05893e] hover:bg-[#047f39] shadow-xs shadow-[#05893e]/20 active:scale-[0.98] transition"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="sm:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-[#e1e8e1] text-slate-600 hover:bg-[#fafcfa]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Second Row: Category Links (Chips from Figma) */}
      <nav className="bg-[#f0f5f0]/80 border-t border-[#e1e8e1] overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-1.5 sm:gap-2 py-2 whitespace-nowrap min-w-max">
            <li>
              <Link
                href="/"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition ${
                  pathname === "/"
                    ? "bg-[#05893e] text-white shadow-2xs"
                    : "text-slate-700 hover:text-[#05893e] hover:bg-white"
                }`}
              >
                <span>🏠</span>
                <span>সব</span>
              </Link>
            </li>

            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#05893e] text-white shadow-2xs font-bold"
                        : "text-slate-700 hover:text-[#05893e] hover:bg-white"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.nameBn}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 sm:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-50 sm:hidden bg-white border-t border-[#e1e8e1] px-4 py-4 space-y-4 shadow-xl">
            <div className="flex flex-col gap-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                অ্যাকাউন্ট
              </div>
              {user ? (
                <div className="space-y-2">
                  <div className="p-3 bg-[#fafcfa] border border-[#e1e8e1] rounded-xl flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#05893e] text-white font-black flex items-center justify-center">
                      {user.name ? user.name.slice(0, 1).toUpperCase() : "U"}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-sm font-bold text-[#1d271f] truncate">{user.name}</div>
                      <div className="text-xs text-slate-500 truncate">{user.email}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2 px-3 rounded-lg bg-[#f0f5f0] text-xs font-bold text-slate-700 text-center"
                    >
                      👤 আমার প্রোফাইল
                    </Link>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="py-2 px-3 rounded-lg bg-[#fdf2f2] text-xs font-bold text-[#d03739] text-center cursor-pointer"
                    >
                      ↩ সাইন আউট
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 px-3 rounded-xl border border-[#e1e8e1] text-xs sm:text-sm font-bold text-center text-slate-700 hover:bg-[#fafcfa]"
                  >
                    সাইন ইন
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 px-3 rounded-xl bg-[#05893e] text-xs sm:text-sm font-bold text-center text-white hover:bg-[#047f39]"
                  >
                    সাইন আপ
                  </Link>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-[#f0f5f0]">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                ক্যাটাগরি
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
                    pathname === "/" ? "bg-[#05893e] text-white" : "text-slate-700 hover:bg-[#f0f5f0]"
                  }`}
                >
                  <span>🏠</span>
                  <span>সব</span>
                </Link>
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/category/${c.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                      pathname === `/category/${c.slug}`
                        ? "bg-[#05893e] text-white font-bold"
                        : "text-slate-700 hover:bg-[#f0f5f0]"
                    }`}
                  >
                    <span>{c.icon}</span>
                    <span>{c.nameBn}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
