"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, updateUser } from "@/lib/auth-client";
import { User, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isPending) {
      if (!session?.user) {
        toast.error("অনুগ্রহ করে প্রথমে সাইন ইন করুন।");
        router.push("/signin?redirect=/profile/update");
      } else {
        setName(session.user.name || "");
      }
    }
  }, [session, isPending, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      const err = "নামের ঘর ফাঁকা রাখা যাবে না।";
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    setLoading(true);
    try {
      const res = await updateUser({
        name: name.trim(),
      });

      if (res.error) {
        const errorText = res.error.message || "তথ্য আপডেট করা সম্ভব হয়নি।";
        setErrorMessage(errorText);
        toast.error(errorText);
      } else {
        toast.success("প্রোফাইল তথ্য সফলভাবে আপডেট করা হয়েছে!");
        router.push("/profile");
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "তথ্য আপডেটে ত্রুটি ঘটেছে।";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex-1 flex items-center justify-center py-24">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#05893e] mx-auto" />
          <p className="text-slate-500 text-sm">তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto w-full">
      <div className="mb-6">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-[#05893e] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← প্রোফাইলে ফিরুন</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-[#e1e8e1] shadow-lg shadow-slate-100 p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#f0f5f0] text-[#05893e] mb-3 shadow-inner">
            <User className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-[#1d271f]">তথ্য আপডেট</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            আপনার অ্যাকাউন্টের নাম ও তথ্য হালনাগাদ করুন
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              ইমেইল (পরিবর্তনযোগ্য নয়)
            </label>
            <input
              type="email"
              value={session.user.email}
              disabled
              className="w-full px-4 py-2.5 rounded-xl border border-[#e1e8e1] bg-slate-100 text-slate-500 text-sm cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              নাম
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: রহিম উদ্দিন"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e1e8e1] focus:outline-none focus:ring-2 focus:ring-[#05893e]/20 focus:border-[#05893e] transition text-sm text-[#1d271f] bg-[#fafcfa] focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-bold text-white bg-[#05893e] hover:bg-[#047f39] active:scale-[0.99] transition shadow-md shadow-[#05893e]/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>আপডেট হচ্ছে...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>আপডেট</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
