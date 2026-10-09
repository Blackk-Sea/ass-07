"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp, signIn } from "@/lib/auth-client";
import { UserPlus, User, Mail, Lock, Loader2, ArrowRight } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      const err = "অনুগ্রহ করে আপনার নাম লিখুন।";
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    if (!email.trim() || !password) {
      const err = "ইমেইল এবং পাসওয়ার্ড পূরণ করা আবশ্যক।";
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    if (password.length < 6) {
      const err = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।";
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    setLoading(true);
    try {
      const res = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (res.error) {
        const errorText = res.error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে। অন্য ইমেইল ব্যবহার করুন।";
        setErrorMessage(errorText);
        toast.error(errorText);
      } else {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! অনুগ্রহ করে সাইন ইন করুন।");
        router.push("/signin");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "রেজিস্ট্রেশন সম্পন্ন করা সম্ভব হয়নি।";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    setSocialLoading(provider);
    setErrorMessage("");
    try {
      await signIn.social({
        provider,
        callbackURL: "/",
      });
      toast.success(`${provider === "google" ? "Google" : "GitHub"} দিয়ে চালিয়ে যান...`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "সোশ্যাল লগইনে সমস্যা হয়েছে।";
      setErrorMessage(msg);
      toast.error(msg);
      setSocialLoading(null);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#f0f5f0]/60 via-[#fafcfa] to-[#f0f5f0]/30">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-[#e1e8e1] shadow-xl shadow-slate-200/50">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#f0f5f0] text-[#05893e] mb-4 shadow-inner">
            <UserPlus className="w-7 h-7" />
          </div>
          {/* Title from Figma */}
          <h2 className="text-2xl font-black text-[#1d271f]">অ্যাকাউন্ট তৈরি করুন</h2>
          {/* Subtitle from Figma */}
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {/* Label from Figma */}
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

          <div>
            {/* Label from Figma */}
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              ইমেইল
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e1e8e1] focus:outline-none focus:ring-2 focus:ring-[#05893e]/20 focus:border-[#05893e] transition text-sm text-[#1d271f] bg-[#fafcfa] focus:bg-white"
              />
            </div>
          </div>

          <div>
            {/* Label from Figma */}
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              পাসওয়ার্ড
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e1e8e1] focus:outline-none focus:ring-2 focus:ring-[#05893e]/20 focus:border-[#05893e] transition text-sm text-[#1d271f] bg-[#fafcfa] focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl font-bold text-white bg-[#05893e] hover:bg-[#047f39] active:scale-[0.99] transition shadow-md shadow-[#05893e]/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>রেজিস্ট্রেশন করা হচ্ছে...</span>
              </>
            ) : (
              <>
                <span>সাইন আপ করুন</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#e1e8e1]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-slate-400 font-semibold">অথবা</span>
          </div>
        </div>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            disabled={socialLoading !== null}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-3 rounded-xl border border-[#e1e8e1] hover:bg-[#fafcfa] text-xs font-semibold text-slate-700 transition cursor-pointer disabled:opacity-60"
          >
            {socialLoading === "google" ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            disabled={socialLoading !== null}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-3 rounded-xl border border-[#e1e8e1] hover:bg-[#fafcfa] text-xs font-semibold text-slate-700 transition cursor-pointer disabled:opacity-60"
          >
            {socialLoading === "github" ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
            ) : (
              <svg className="w-4 h-4 fill-current text-slate-800" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            )}
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        {/* Link from Figma */}
        <div className="mt-8 text-center text-xs sm:text-sm text-slate-500">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-bold text-[#05893e] hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
