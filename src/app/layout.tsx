import type { Metadata, Viewport } from "next";
import ToastProvider from "@/components/providers/ToastProvider";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "বাজার দর (BazarDor) - প্রয়োজনীয় পণ্যের নিত্যদিনের বাজার দর",
  description:
    "নিত্যপ্রয়োজনীয় পণ্যের বাজার দর এক নজরে জানুন। স্বর্ণমাছি চাল, ডাল, তেল, সবজি, মাছ, মাংস ও ডিম-দুধের সর্বশেষ খুচরা ও পাইকারি মূল্যতালিকা।",
  keywords: ["বাজার দর", "BazarDor", "নিত্যপ্রয়োজনীয় পণ্য", "চাল", "ডাল", "তেল", "সবজি", "মাছ", "মাংস"],
  authors: [{ name: "BazarDor Team" }],
  icons: {
    icon: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
  openGraph: {
    title: "বাজার দর (BazarDor) - Daily Market Commodity Tracker",
    description: "নিত্যপ্রয়োজনীয় পণ্যের বাজার দর এক নজরে জানুন। বিভিন্ন বাজারের মূল্য তুলনা ও দৈনিক পরিবর্তন পর্যবেক্ষণ করুন।",
    siteName: "বাজার দর (BazarDor)",
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: "/bazar-hero.png",
        width: 1200,
        height: 630,
        alt: "বাজার দর প্রিভিউ ব্যানার",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" data-theme="light">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans flex flex-col">
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
