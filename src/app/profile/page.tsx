"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, signOut } from "@/lib/auth-client";
import { User, Mail, Calendar, Edit3, LogOut, Loader2, ShieldCheck, ArrowLeft } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।");
      router.push("/signin?redirect=/profile");
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে।");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউটে সমস্যা হয়েছে।");
    }
  };

  if (isPending) {
    return (
      <div className="flex-1 flex items-center justify-center py-24">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#05893e] mx-auto" />
          <p className="text-slate-500 text-sm">প্রোফাইল তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;

  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-[#05893e] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← হোম পেজে ফিরে যান</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-[#e1e8e1] shadow-sm overflow-hidden">
        {/* Profile Banner */}
        <div className="h-32 bg-gradient-to-r from-[#05893e] to-[#047f39] relative">
          <div className="absolute -bottom-10 left-6 sm:left-8">
            <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-md border border-[#e1e8e1] flex items-center justify-center">
              <div className="w-full h-full rounded-xl bg-[#f0f5f0] text-[#05893e] font-black text-2xl flex items-center justify-center">
                {user.name ? user.name.slice(0, 1).toUpperCase() : "U"}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-14 pb-8 px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#f0f5f0]">
            <div>
              <div className="flex items-center gap-2">
                {/* Title from Figma */}
                <h1 className="text-2xl font-black text-[#1d271f] flex items-center gap-2">
                  <span>👤 আমার প্রোফাইল</span>
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#eef8f2] text-[#1a9951] border border-[#c0e6ce]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  সক্রিয় অ্যাকাউন্ট
                </span>
              </div>
              {/* Subtitle from Figma */}
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Challenge C3: Update Information Button */}
              <Link
                href="/profile/update"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#05893e] bg-[#f0f5f0] hover:bg-[#e1e8e1] border border-[#e1e8e1] transition"
              >
                <Edit3 className="w-4 h-4" />
                <span>আপডেট</span>
              </Link>

              {/* Sign out from Figma: "↩ সাইন আউট" */}
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#d03739] bg-[#fdf2f2] hover:bg-[#fce4e5] border border-[#f8d0d1] transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>↩ সাইন আউট</span>
              </button>
            </div>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-[#fafcfa] border border-[#e1e8e1]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#f0f5f0] text-[#05893e] flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">নাম</div>
                  <div className="text-sm font-bold text-[#1d271f]">{user.name || "প্রদান করা হয়নি"}</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#fafcfa] border border-[#e1e8e1]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#f0f5f0] text-[#05893e] flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">ইমেইল</div>
                  <div className="text-sm font-bold text-[#1d271f]">{user.email}</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#fafcfa] border border-[#e1e8e1] sm:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#f0f5f0] text-[#05893e] flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">নিবন্ধনের তারিখ</div>
                  <div className="text-sm font-bold text-[#1d271f]">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString("bn-BD", { year: "numeric", month: "long", day: "numeric" }) : "আজ"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
