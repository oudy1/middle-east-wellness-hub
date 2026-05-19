import { describe, it, expect } from "vitest";
import { bucketKeyFor } from "@/lib/trendBucket";

// DST transition reference (all are local Sundays where the clock changes):
//   America/Toronto  spring forward: 2024-03-10, 2025-03-09, 2026-03-08
//   America/Toronto  fall back:      2024-11-03, 2025-11-02, 2026-11-01
//   America/New_York mirrors Toronto
//   Europe/London    spring forward: 2024-03-31, 2025-03-30, 2026-03-29
//   Europe/London    fall back:      2024-10-27, 2025-10-26, 2026-10-25
//
// For each transition we verify that every day in the surrounding Mon..Sun
// week buckets into the same Monday-anchor key, regardless of the DST shift.
//
// Probing strategy:
//   Instead of blindly sweeping UTC offsets (which produces ambiguous "is
//   this the same local day or not?" samples and risks flakiness on hosts
//   in unusual zones), we resolve each (localDate, localHour) pair to the
//   exact UTC instant whose wall-clock in the target zone matches. That
//   gives precise, deterministic coverage of every sensitive instant —
//   especially 00:00, 01:00, 02:00, 03:00 on the transition Sunday.

type DstCase = {
  zone: string;
  label: string;
  transitionLocalDate: string; // YYYY-MM-DD of the Sunday the clocks change
  expectedMonday: string;      // YYYY-MM-DD Monday that starts the DST week
};

const DST_CASES: DstCase[] = [
  // Toronto / NY spring forward weeks
  { zone: "America/Toronto",  label: "spring 2024", transitionLocalDate: "2024-03-10", expectedMonday: "2024-03-04" },
  { zone: "America/Toronto",  label: "spring 2025", transitionLocalDate: "2025-03-09", expectedMonday: "2025-03-03" },
  { zone: "America/Toronto",  label: "spring 2026", transitionLocalDate: "2026-03-08", expectedMonday: "2026-03-02" },
  { zone: "America/New_York", label: "spring 2025", transitionLocalDate: "2025-03-09", expectedMonday: "2025-03-03" },
  // Toronto / NY fall back weeks
  { zone: "America/Toronto",  label: "fall 2024",   transitionLocalDate: "2024-11-03", expectedMonday: "2024-10-28" },
  { zone: "America/Toronto",  label: "fall 2025",   transitionLocalDate: "2025-11-02", expectedMonday: "2025-10-27" },
  { zone: "America/Toronto",  label: "fall 2026",   transitionLocalDate: "2026-11-01", expectedMonday: "2026-10-26" },
  { zone: "America/New_York", label: "fall 2025",   transitionLocalDate: "2025-11-02", expectedMonday: "2025-10-27" },
  // London spring forward / fall back weeks
  { zone: "Europe/London",    label: "spring 2025", transitionLocalDate: "2025-03-30", expectedMonday: "2025-03-24" },
  { zone: "Europe/London",    label: "fall 2025",   transitionLocalDate: "2025-10-26", expectedMonday: "2025-10-20" },
];

const pad = (n: number) => String(n).padStart(2, "0");

const formatLocal = (utc: Date, zone: string) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: zone,
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hour12: false,
  }).formatToParts(utc);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return { date: `${get("year")}-${get("month")}-${get("day")}`, hour: get("hour") };
};

const addDays = (date: string, days: number): string => {
  const [y, m, d] = date.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;
};

// Resolve the UTC instant whose wall-clock in `zone` equals localDate at
// localHour:00. Returns null when the local time does not exist (spring
// forward gap, e.g. 02:00 on a US DST Sunday). On fall-back ambiguity we
// accept the first match — both repeated wall-clock instants belong to the
// same local calendar day, which is all this suite cares about.
function utcForLocal(zone: string, localDate: string, localHour: number): string | null {
  const [y, m, d] = localDate.split("-").map(Number);
  const targetHour = pad(localHour);
  // Zones we test fall within UTC-12..+14; scan that range exhaustively.
  for (let off = -14; off <= 14; off++) {
    const utc = new Date(Date.UTC(y, m - 1, d, localHour + off, 0, 0));
    const { date, hour } = formatLocal(utc, zone);
    if (date === localDate && hour === targetHour) return utc.toISOString();
  }
  return null;
}

describe("weekly bucketing — DST boundary stability", () => {
  for (const c of DST_CASES) {
    it(`${c.zone} ${c.label}: every local hour Mon..Sun buckets to ${c.expectedMonday}`, () => {
      // Walk every day of the DST week and every hour 00..23. For each
      // (day, hour) we resolve the precise UTC instant and assert the bucket
      // key equals the DST Monday. Non-existent local times (spring-forward
      // gap) are skipped — they cannot occur in real recorded data.
      const [y, m, d] = c.expectedMonday.split("-").map(Number);
      let resolvedCount = 0;
      for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
        const local = addDays(c.expectedMonday, dayOffset);
        for (let h = 0; h < 24; h++) {
          const iso = utcForLocal(c.zone, local, h);
          if (!iso) continue; // spring-forward gap
          resolvedCount++;
          expect(bucketKeyFor(iso, "week", c.zone)).toBe(c.expectedMonday);
        }
      }
      // Sanity: we must have resolved most of the 7*24=168 hours.
      expect(resolvedCount).toBeGreaterThanOrEqual(165);
      // Silence unused-var lint for y/m/d kept for readability above.
      void y; void m; void d;
    });

    it(`${c.zone} ${c.label}: 00:00 and 23:00 on each local day stay inside ${c.expectedMonday}`, () => {
      for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
        const local = addDays(c.expectedMonday, dayOffset);
        for (const h of [0, 23]) {
          const iso = utcForLocal(c.zone, local, h);
          expect(iso, `${local} ${h}:00 should resolve in ${c.zone}`).not.toBeNull();
          expect(bucketKeyFor(iso!, "week", c.zone)).toBe(c.expectedMonday);
        }
      }
    });

    it(`${c.zone} ${c.label}: the previous Sunday 23:00 and next Monday 00:00 land in adjacent weeks`, () => {
      const prevSun = addDays(c.expectedMonday, -1);
      const nextMon = addDays(c.expectedMonday, 7);
      const prevSunIso = utcForLocal(c.zone, prevSun, 23)!;
      const nextMonIso = utcForLocal(c.zone, nextMon, 0)!;
      expect(bucketKeyFor(prevSunIso, "week", c.zone)).toBe(addDays(c.expectedMonday, -7));
      expect(bucketKeyFor(nextMonIso, "week", c.zone)).toBe(nextMon);
    });
  }

  it("week before and week after a DST transition are exactly 7 days apart", () => {
    // Pick Toronto spring 2025 — the controversial week.
    const before = bucketKeyFor("2025-03-04T17:00:00Z", "week", "America/Toronto");
    const dstWeek = bucketKeyFor("2025-03-11T17:00:00Z", "week", "America/Toronto");
    const after = bucketKeyFor("2025-03-18T17:00:00Z", "week", "America/Toronto");
    const toDate = (k: string) => new Date(`${k}T00:00:00Z`).getTime();
    expect((toDate(dstWeek) - toDate(before)) / 86400000).toBe(7);
    expect((toDate(after) - toDate(dstWeek)) / 86400000).toBe(7);
  });
});
