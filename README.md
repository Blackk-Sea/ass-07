# 🛒 বাজার দর (BazarDor) - Daily Market Commodity Tracker

> **বাজার দর (BazarDor)** হলো একটি আধুনিক ও বাস্তবসম্মত নিত্যপ্রয়োজনীয় পণ্যের বাজারদর ট্র্যাকিং ওয়েব অ্যাপ্লিকেশন। সাধারণ ক্রেতা ও ব্যবসায়ীরা এর মাধ্যমে প্রতিদিনের চাল, ডাল, তেল, শাকসবজি, মাছ-মাংস ও মসলাপাতির সর্বশেষ বাজার দর সহজেই পর্যবেক্ষণ ও তুলনা করতে পারবেন।

---

## 🌟 Key Features (মূল বৈশিষ্ট্যসমূহ)

1. **🔴 রিয়েল-টাইম প্রাইস টিকার (Infinite Price Marquee Ticker)**:
   - ওয়েবসাইটের শীর্ষে অবিরাম স্ক্রলিং স্ট্রিপে পণ্যের ইমোজি, নাম, একক প্রতি আজকের দাম এবং শতকরা হ্রাস-বৃদ্ধির (▲/▼) লাইভ ব্যাজ প্রদর্শিত হয়।
   - মাউস হভার করলে স্বয়ংক্রিয়ভাবে স্ক্রল সাময়িক পজ (Pause on Hover) হয়।

2. **📊 শীর্ষ মূল্যবৃদ্ধি ও মূল্যহ্রাস সেকশন (Top Risers & Fallers)**:
   - হোম পেজে গতকালের তুলনায় সবচেয়ে বেশি দাম বাড়া শীর্ষ ৬টি পণ্য (**আজ দাম বেড়েছে ▲**) এবং দাম কমা শীর্ষ ৬টি পণ্য (**আজ দাম কমেছে ▼**) আলাদা সেকশনে সুন্দর ব্যাজসহ প্রদর্শিত হয়।

3. **🔢 স্মার্ট বাংলা সংখ্যাভিত্তিক সর্টিং (Challenge C1 - Bengali Numeral Sort)**:
   - ক্যাটাগরি ও হোম পেজের সব পণ্য তালিকায় ড্রপডাউন দিয়ে ডিফল্ট, দাম কম থেকে বেশি এবং বেশি থেকে কম অনুযায়ী সংখ্যাগতভাবে সঠিকভাবে সাজানো (Numeric Sort) যায়।

4. **🔒 সুরক্ষিত পণ্যের বিস্তারিত পৃষ্ঠা (Protected Route Product Details)**:
   - যেকোনো পণ্যের বিস্তারিত বাজারদর (`/product/[slug]`) দেখতে লগইন বাধ্যতামূলক। সাইন ইন না থাকলে ইউজারকে টোস্ট নোটিফিকেশন প্রদর্শন করে স্বয়ংক্রিয়ভাবে সাইন ইন পেজে রিডাইরেক্ট করা হয়।
   - এতে অন্তর্ভুক্ত রয়েছে সর্বনিম্ন, সর্বোচ্চ ও গড় বাজারদর এবং দেশের বিভিন্ন আঞ্চলিক মোকাম ও বাজারের (ঢাকা, চট্টগ্রাম, রাজশাহী, খুলনা, সিলেট ইত্যাদি) তুলনামূলক মূল্যতালিকা।

5. **🔐 নিরাপদ অথেনটিকেশন ও প্রোফাইল ব্যবস্থাপনা (BetterAuth & Challenge C3)**:
   - **BetterAuth** চালিত নিরাপদ ইমেইল/পাসওয়ার্ড ও সোশ্যাল লগইন (Google ও GitHub)।
   - ব্যবহারকারীর নিজস্ব প্রোফাইল ভিউ এবং `/profile/update` রাউটে গিয়ে সহজে নিজের নাম আপডেট করার সুবিধা।

---

## 🛠️ Technologies Used (ব্যবহৃত প্রযুক্তিসমূহ)

- **Frontend & Framework**: Next.js (App Router), React, TypeScript
- **Styling & UI**: Tailwind CSS, DaisyUI, Lucide React (Icons)
- **Authentication**: BetterAuth
- **Notifications**: React Hot Toast (`react-hot-toast`)
- **Font & Localization**: Bengali Unicode Support & Custom Bangla Date Formatter

---

## 🚀 Getting Started (রান করার নিয়মাবলী)

### ১. রিপোজিটরি ক্লোন করুন
```bash
git clone <your-repository-url>
cd ass-07
```

### ২. ডিপেন্ডেন্সি ইনস্টল করুন
```bash
npm install
```

### ৩. এনভায়রনমেন্ট ভেরিয়েবল সেটআপ করুন
প্রজেক্টের রুটে `.env.local` ফাইল তৈরি করুন:
```env
BETTER_AUTH_SECRET=bazar_dor_super_secret_key_2026_assignment_07_xyz987
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ঐচ্ছিক সোশ্যাল লগইন কী
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

### ৪. ডেভেলপমেন্ট সার্ভার চালু করুন
```bash
npm run dev
```
ব্রাউজারে ভিজিট করুন: [http://localhost:3000](http://localhost:3000)

### ৫. প্রোডাকশন বিল্ড টেস্ট
```bash
npm run build
npm run start
```

---

## 📌 Submission Information

- **Live Link**: [আপনার লাইভ সাইটের লিংক]
- **GitHub Repository**: [আপনার গিটহাব রিপোজিটরি লিংক]

---

> *“সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”*
