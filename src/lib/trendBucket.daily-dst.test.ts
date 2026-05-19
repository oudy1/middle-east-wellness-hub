import { describe, it, expect } from "vitest";
import { bucketKeyFor } from "@/lib/trendBucket";

// Daily-bucket DST stability tests. Mirrors the weekly DST suite but asserts
// that the *day* a local instant belongs to never gets shifted by the
// spring-forward / fall-back hour jump.
//
// Transition Sundays (local clock changes):
//   America/Toronto  / America/New_York
//     spring forward: 2024-03-10, 2025-03-09, 2026-03-08
//     fall back:      2024-11-03, 2025-11-02, 2026-11-01
//   Europe/London
//     spring forward: 2024-03-31, 2025-03-30, 2026-03-29
//     fall back:      2024-10-27, 2025-10-26, 2026-10-25

type DstCase = {
  zone: string;
  label: string;
  transitionLocalDate: string; // YYYY-MM-DD local Sunday of the clock change
};

const DST_CASES: DstCase[] = [
  { zone: "America/Toronto",  label: "spring 2024", transitionLocalDate: "2024-03-10" },
  { zone: "America/Toronto",  label: "spring 2025", transitionLocalDate: "2025-03-09" },
  { zone: "America/Toronto",  label: "spring 2026", transitionLocalDate: "2026-03-08" },
  { zone: "America/New_York", label: "spring 2025", transitionLocalDate: "2025-03-09" },
  { zone: "America/Toronto",  label: "fall 2024",   transitionLocalDate: "2024-11-03" },
  { zone: "America/Toronto",  label: "fall 2025",   transitionLocalDate: "2025-11-02" },
  { zone: "America/Toronto",  label: "fall 2026",   transitionLocalDate: "2026-11-01" },
  { zone: "America/New_York", label: "fall 2025",   transitionLocalDate: "2025-11-02" },
  { zone: "Europe/London",    label: "spring 2025", transitionLocalDate: "2025-03-30" },
  { zone: "Europe/London",    label: "fall 2025",   transitionLocalDate: "2025-10-26" },
];

const pad = (n: number) => String(n).padStart(2, "0");

// Find the UTC instant whose local representation in `zone` is exactly
// `localDate` at `localHour`:00. Scans a ±18h window around the naive UTC
// guess so it works regardless of the zone's offset.
function utcForLocal(zone: string, localDate: string, localHour: number): string {
  const [y, m, d] = localDate.split("-").map(Number);
  const target = `${localDate} ${pad(localHour)}`;
  for (let off = -18; off <= 18; off++) {
    const utc = new Date(Date.UTC(y, m - 1, d, localHour + off, 0, 0));
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: zone,
      year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hour12: false,
    }).formatToParts(utc);
    const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
    const stamp = `${get("year")}-${get("month")}-${get("day")} ${get("hour")}`;
    if (stamp === target) return utc.toISOString();
  }
  throw new Error(`could not resolve ${zone} ${localDate} ${localHour}:00`);
}

function shiftDate(date: string, days: number): string {
  const [y, m, d] = date.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;
}

describe("daily bucketing — DST boundary stability", () => {
  for (const c of DST_CASES) {
    it(`${c.zone} ${c.label}: each local day Sat..Tue around the transition buckets to itself`, () => {
      // Check the 4-day window centered on the DST Sunday: Sat, Sun, Mon, Tue.
      for (let offset = -1; offset <= 2; offset++) {
        const day = shiftDate(c.transitionLocalDate, offset);
        // Probe a wide set of local hours, including the DST switch window.
        for (const h of [0, 1, 2, 3, 4, 6, 12, 18, 23]) {
          let iso: string;
          try {
            iso = utcForLocal(c.zone, day, h);
          } catch {
            // 02:00 local doesn't exist on spring-forward Sundays — skip.
            continue;
          }
          expect(bucketKeyFor(iso, "day", c.zone)).toBe(day);
        }
      }
    });

    it(`${c.zone} ${c.label}: local midnight on the DST Sunday belongs to that Sunday, not Saturday`, () => {
      const iso = utcForLocal(c.zone, c.transitionLocalDate, 0);
      expect(bucketKeyFor(iso, "day", c.zone)).toBe(c.transitionLocalDate);
    });

    it(`${c.zone} ${c.label}: 23:00 local on the DST Sunday still belongs to that Sunday`, () => {
      const iso = utcForLocal(c.zone, c.transitionLocalDate, 23);
      expect(bucketKeyFor(iso, "day", c.zone)).toBe(c.transitionLocalDate);
    });

    it(`${c.zone} ${c.label}: consecutive local days produce bucket keys exactly 1 day apart`, () => {
      const prev = shiftDate(c.transitionLocalDate, -1);
      const next = shiftDate(c.transitionLocalDate, 1);
      const keys = [prev, c.transitionLocalDate, next].map((d) =>
        bucketKeyFor(utcForLocal(c.zone, d, 12), "day", c.zone),
      );
      const toMs = (k: string) => new Date(`${k}T00:00:00Z`).getTime();
      expect((toMs(keys[1]) - toMs(keys[0])) / 86400000).toBe(1);
      expect((toMs(keys[2]) - toMs(keys[1])) / 86400000).toBe(1);
    });
  }
});
