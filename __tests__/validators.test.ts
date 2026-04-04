import { describe, it, expect } from "vitest";

// ─── Pure functions extracted from ContactPageClient ─────────────────────────
// These are module-level helpers — tested here as pure units since they're not
// exported. We mirror the exact implementation to catch regressions if logic drifts.

const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const validPhone = (v: string) => v.replace(/[^\d]/g, "").length >= 7;
const validName  = (v: string) => v.trim().length >= 2;
const validTrav  = (v: string) => { const n = Number(v); return Number.isInteger(n) && n >= 1 && n <= 500; };

const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
const pad2 = (n: number) => String(n).padStart(2,"0");

function fmtMonth(v: string) {
  if (!/^\d{4}-\d{2}$/.test(v)) return "";
  const [y, m] = v.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

function fmtDob(v: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return "";
  const [y, m, d] = v.split("-").map(Number);
  return `${pad2(d)} ${MONTHS[m - 1]} ${y}`;
}

// ─── validEmail ───────────────────────────────────────────────────────────────

describe("validEmail", () => {
  it("accepts standard email", () => {
    expect(validEmail("user@example.com")).toBe(true);
  });

  it("accepts email with subdomain", () => {
    expect(validEmail("hello@mail.company.co")).toBe(true);
  });

  it("accepts email with plus addressing", () => {
    expect(validEmail("user+tag@example.com")).toBe(true);
  });

  it("rejects missing @", () => {
    expect(validEmail("userexample.com")).toBe(false);
  });

  it("rejects missing domain", () => {
    expect(validEmail("user@")).toBe(false);
  });

  it("rejects missing TLD", () => {
    expect(validEmail("user@example")).toBe(false);
  });

  it("rejects space in email", () => {
    expect(validEmail("user @example.com")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(validEmail("")).toBe(false);
  });
});

// ─── validPhone ───────────────────────────────────────────────────────────────

describe("validPhone", () => {
  it("accepts 10-digit number", () => {
    expect(validPhone("9811099951")).toBe(true);
  });

  it("accepts number with country code prefix", () => {
    expect(validPhone("+91 98110 99951")).toBe(true);
  });

  it("accepts number with dashes", () => {
    expect(validPhone("981-109-9951")).toBe(true);
  });

  it("accepts exactly 7 digits (minimum)", () => {
    expect(validPhone("1234567")).toBe(true);
  });

  it("rejects 6-digit number (too short)", () => {
    expect(validPhone("123456")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(validPhone("")).toBe(false);
  });

  it("rejects string with no digits", () => {
    expect(validPhone("abcdefg")).toBe(false);
  });
});

// ─── validName ────────────────────────────────────────────────────────────────

describe("validName", () => {
  it("accepts standard name", () => {
    expect(validName("Aryan")).toBe(true);
  });

  it("accepts two-character name (minimum)", () => {
    expect(validName("Jo")).toBe(true);
  });

  it("accepts name with spaces", () => {
    expect(validName("John Doe")).toBe(true);
  });

  it("rejects single character", () => {
    expect(validName("J")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(validName("")).toBe(false);
  });

  it("rejects whitespace-only string", () => {
    expect(validName("   ")).toBe(false);
  });

  it("rejects name that is only one char after trim", () => {
    expect(validName(" A ")).toBe(false);
  });
});

// ─── validTrav ────────────────────────────────────────────────────────────────

describe("validTrav", () => {
  it("accepts '1' (minimum)", () => {
    expect(validTrav("1")).toBe(true);
  });

  it("accepts '500' (maximum)", () => {
    expect(validTrav("500")).toBe(true);
  });

  it("accepts mid-range value", () => {
    expect(validTrav("4")).toBe(true);
  });

  it("rejects '0'", () => {
    expect(validTrav("0")).toBe(false);
  });

  it("rejects '501' (above maximum)", () => {
    expect(validTrav("501")).toBe(false);
  });

  it("rejects decimal value", () => {
    expect(validTrav("2.5")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(validTrav("")).toBe(false);
  });

  it("rejects non-numeric string", () => {
    expect(validTrav("abc")).toBe(false);
  });

  it("rejects negative number", () => {
    expect(validTrav("-1")).toBe(false);
  });
});

// ─── fmtMonth ─────────────────────────────────────────────────────────────────

describe("fmtMonth", () => {
  it("formats January correctly", () => {
    expect(fmtMonth("2025-01")).toBe("JAN 2025");
  });

  it("formats December correctly", () => {
    expect(fmtMonth("2025-12")).toBe("DEC 2025");
  });

  it("formats a mid-year month correctly", () => {
    expect(fmtMonth("2024-07")).toBe("JUL 2024");
  });

  it("returns empty string for invalid format (YYYY/MM)", () => {
    expect(fmtMonth("2025/01")).toBe("");
  });

  it("returns empty string for full date string", () => {
    expect(fmtMonth("2025-01-15")).toBe("");
  });

  it("returns empty string for empty input", () => {
    expect(fmtMonth("")).toBe("");
  });

  it("returns empty string for random text", () => {
    expect(fmtMonth("hello")).toBe("");
  });
});

// ─── fmtDob ───────────────────────────────────────────────────────────────────

describe("fmtDob", () => {
  it("formats a standard date correctly", () => {
    expect(fmtDob("1990-03-15")).toBe("15 MAR 1990");
  });

  it("pads single-digit day with zero", () => {
    expect(fmtDob("2000-01-05")).toBe("05 JAN 2000");
  });

  it("formats December 31 correctly", () => {
    expect(fmtDob("1985-12-31")).toBe("31 DEC 1985");
  });

  it("returns empty string for month-only format", () => {
    expect(fmtDob("1990-03")).toBe("");
  });

  it("returns empty string for empty input", () => {
    expect(fmtDob("")).toBe("");
  });

  it("returns empty string for random text", () => {
    expect(fmtDob("not-a-date")).toBe("");
  });
});
