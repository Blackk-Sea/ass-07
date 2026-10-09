import { ProductChange } from "@/types";

const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliNumber(value: number | string): string {
  if (value === undefined || value === null) return "";
  const str = typeof value === "number" ? value.toLocaleString("en-US") : value.toString();
  return str.replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

export function formatPrice(price: number): string {
  return `${toBengaliNumber(price)} টাকা`;
}

export function formatUnit(unit: string): string {
  const normalized = unit.toLowerCase().trim();
  switch (normalized) {
    case "kg":
      return "প্রতি কেজি";
    case "liter":
    case "litre":
    case "l":
      return "প্রতি লিটার";
    case "dozen":
      return "প্রতি ডজন";
    case "piece":
    case "pcs":
    case "pc":
      return "প্রতি পিস";
    case "gm":
    case "g":
    case "gram":
      return "প্রতি গ্রাম";
    default:
      return `প্রতি ${unit}`;
  }
}

export function formatChange(change: ProductChange) {
  const pctBn = toBengaliNumber(change.pct.toFixed(1));
  if (change.dir === "up") {
    return {
      text: `▲ ${pctBn}%`,
      icon: "▲",
      colorClass: "text-emerald-700 bg-emerald-50 border-emerald-200",
      textColor: "text-emerald-600",
      isRiser: true,
    };
  }
  if (change.dir === "down") {
    return {
      text: `▼ ${pctBn}%`,
      icon: "▼",
      colorClass: "text-rose-700 bg-rose-50 border-rose-200",
      textColor: "text-rose-600",
      isRiser: false,
    };
  }
  return {
    text: `— ${pctBn}%`,
    icon: "—",
    colorClass: "text-slate-600 bg-slate-100 border-slate-200",
    textColor: "text-slate-500",
    isRiser: false,
  };
}

export function getBengaliDate(date: Date = new Date()): string {
  const weekdays = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];

  const weekday = weekdays[date.getDay()];
  const day = toBengaliNumber(date.getDate());
  const month = months[date.getMonth()];
  const year = toBengaliNumber(date.getFullYear());

  return `${weekday}, ${day} ${month} ${year}`;
}
