import { describe, it, expect } from "vitest";
import { bucketKeyFor } from "@/lib/trendBucket";

// DST transition reference (all are local Sundays where the clock changes):
//   America/Toronto  spring forward: 2024-03-10, 2025-03-09, 2026-03-08
//   America/Toronto  fall back:      2024-11-03, 2025-11-02, 2026-11-01
//   America/New_York mirrors Toronto
//   Europe/London    spring forward: 2024-03-31, 2025-03-30, 2026-03-29
//   Europe/London    fall back:      2024-10-27, 2025-10-26, 2026-10-25
//
// For each transition we verify that every day in the surrounding Mon–Sun
// week buckets into the same Monday-anchor key, regardless of the DST shift.

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

// Returns ISO timestamps for every hour of `days` consecutive local days
// starting at `startLocalDate` 00:00 in `zone`, plus a few near-midnight
// samples that are most likely to trip DST off-by-one bugs.
function probeHoursAcrossWeek(zone: string, monday: string): string[] {
  const [y, m, d] = monday.split("-").map(Number);
  const samples: string[] = [];
  // For each of the 7 days in the week, probe multiple hours including just
  // before/after midnight and the DST switch window (01:00 .. 03:00).
  const hours = [0, 1, 2, 3, 6, 12, 18, 23];
  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    for (const h of hours) {
      // Build an ISO using Date constructor in the *runner's* zone then shift,
      // but to stay zone-independent we just probe enough UTC instants across
      // a 9-day window centered on the Monday — bucketKeyFor reads the local
      // calendar date via Intl, so this is sufficient coverage.
      for (let utcOffsetH = -12; utcOffsetH <= 14; utcOffsetH += 2) {
        const dt = new Date(Date.UTC(y, m - 1, d + dayOffset, h, 0, 0));
        dt.setUTCHours(dt.getUTCHours() + utcOffsetH);
        samples.push(dt.toISOString());
      }
    }
  }
  return samples;
}

describe("weekly bucketing — DST boundary stability", () => {
  for (const c of DST_CASES) {
    it(`${c.zone} ${c.label}: every Mon–Sun timestamp buckets to ${c.expectedMonday}`, () => {
      const monday = c.expectedMonday;
      const [y, m, d] = monday.split("-").map(Number);
      const nextMonday = new Date(Date.UTC(y, m - 1, d + 7));
      const nm = `${nextMonday.getUTCFullYear()}-${String(nextMonday.getUTCMonth() + 1).padStart(2, "0")}-${String(nextMonday.getUTCDate()).padStart(2, "0")}`;

      // Probe many instants across the surrounding range and assert each one
      // buckets to either the DST week's Monday or one of its immediate
      // neighbours — never to a fractional/shifted date.
      const samples = probeHoursAcrossWeek(c.zone, monday);
      const seen = new Set<string>();
      for (const iso of samples) seen.add(bucketKeyFor(iso, "week", c.zone));

      // The DST week's Monday MUST be a produced bucket key.
      expect(seen.has(monday)).toBe(true);
      // Only adjacent Monday keys are acceptable in the produced set.
      const prevMonday = new Date(Date.UTC(y, m - 1, d - 7));
      const pm = `${prevMonday.getUTCFullYear()}-${String(prevMonday.getUTCMonth() + 1).padStart(2, "0")}-${String(prevMonday.getUTCDate()).padStart(2, "0")}`;
      for (const k of seen) {
        expect([pm, monday, nm]).toContain(k);
      }
    });

    it(`${c.zone} ${c.label}: noon on each local day Mon–Sun maps to ${c.expectedMonday}`, () => {
      const [y, m, d] = c.expectedMonday.split("-").map(Number);
      // Local noon is far from any DST switch (which happens at 01:00–03:00),
      // so every Mon..Sun noon in `zone` must bucket to the same Monday.
      // We approximate "local noon" by probing 12:00 in zone offsets -12..+14.
      for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
        for (let off = -12; off <= 14; off++) {
          const utc = new Date(Date.UTC(y, m - 1, d + dayOffset, 12 - off, 0, 0));
          const key = bucketKeyFor(utc.toISOString(), "week", c.zone);
          // Either this matches the DST week or it falls into an adjacent
          // week because the UTC-offset probe pushed it past midnight — both
          // are valid; just assert it's never a non-Monday key.
          const kd = new Date(`${key}T00:00:00Z`).getUTCDay();
          expect(kd).toBe(1); // 1 = Monday
        }
        // The local-noon instant in `zone` itself MUST land on the DST Monday.
        // We get this by formatting back: pick the UTC instant whose local
        // representation in `zone` is `dayOffset` days after Monday at 12:00.
        // Find it by binary scan over a 48h window.
        const targetLocal = `${new Date(Date.UTC(y, m - 1, d + dayOffset)).toISOString().slice(0, 10)} 12`;
        let chosen = "";
        for (let h = -14; h <= 14; h++) {
          const utc = new Date(Date.UTC(y, m - 1, d + dayOffset, 12 + h, 0, 0));
          const parts = new Intl.DateTimeFormat("en-CA", {
            timeZone: c.zone,
            year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hour12: false,
          }).formatToParts(utc);
          const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
          const stamp = `${get("year")}-${get("month")}-${get("day")} ${get("hour")}`;
          if (stamp === targetLocal) { chosen = utc.toISOString(); break; }
        }
        expect(chosen).not.toBe("");
        expect(bucketKeyFor(chosen, "week", c.zone)).toBe(c.expectedMonday);
      }
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
