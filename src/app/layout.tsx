import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "বাজার দর (BazarDor) - প্রয়োজনীয় পণ্যের নিত্যদিনের বাজার দর",
  description: "নিত্যপ্রয়োজনীয় পণ্যের বাজার দর এক নজরে জানুন। স্বর্ণমাছি চাল, ডাল, তেল, সবজি, মাছ, মাংস ও ডিম-দুধের সর্বশেষ মূল্যতালিকা।",
  icons: {
    icon: "/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" data-theme="light">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
