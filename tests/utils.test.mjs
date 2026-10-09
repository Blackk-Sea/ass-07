import assert from "node:assert";

// Bengali numeral test data
const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

function toBengaliNumber(value) {
  if (value === undefined || value === null) return "";
  const str = typeof value === "number" ? value.toLocaleString("en-US") : value.toString();
  return str.replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

function formatPrice(price) {
  return `${toBengaliNumber(price)} টাকা`;
}

// 1. Numerals test
assert.strictEqual(toBengaliNumber(0), "০");
assert.strictEqual(toBengaliNumber(148), "১৪৮");
assert.strictEqual(toBengaliNumber(1850), "১,৮৫০");
assert.strictEqual(formatPrice(148), "১৪৮ টাকা");

// 2. Numeric sorting test (Challenge C1 verification)
const mockList = [
  { name: "আলু", today: 55 },
  { name: "ইলিশ", today: 1850 },
  { name: "চাল", today: 148 },
];

const asc = [...mockList].sort((a, b) => a.today - b.today);
assert.deepStrictEqual(asc.map(i => i.today), [55, 148, 1850]);

const desc = [...mockList].sort((a, b) => b.today - a.today);
assert.deepStrictEqual(desc.map(i => i.today), [1850, 148, 55]);

console.log("All utility tests passed successfully!");
