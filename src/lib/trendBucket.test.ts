import { describe, it, expect } from "vitest";
import { bucketKeyFor } from "@/lib/trendBucket";

describe("bucketKeyFor — daily bucketing", () => {
  it("uses local calendar date in UTC zone", () => {
    expect(bucketKeyFor("2025-03-15T12:00:00Z", "day", "UTC")).toBe("2025-03-15");
  });

  it("rolls to previous day for late-UTC timestamps in America/Toronto", () => {
    // 2025-03-15T02:30:00Z is 2025-03-14 22:30 in Toronto (EDT, UTC-4 after DST)
    expect(
      bucketKeyFor("2025-03-15T02:30:00Z", "day", "America/Toronto"),
    ).toBe("2025-03-14");
  });

  it("rolls to next day for early-UTC timestamps in Asia/Dubai", () => {
    // 2025-03-14T22:00:00Z is 2025-03-15 02:00 in Dubai (UTC+4)
    expect(
      bucketKeyFor("2025-03-14T22:00:00Z", "day", "Asia/Dubai"),
    ).toBe("2025-03-15");
  });

  it("handles a timestamp exactly at the DST spring-forward instant", () => {
    // In America/New_York, 2025-03-09 02:00 local does not exist (jumps to 03:00).
    // 06:30 UTC corresponds to 02:30 EST → 03:30 EDT on the same calendar day.
    expect(
      bucketKeyFor("2025-03-09T06:30:00Z", "day", "America/New_York"),
    ).toBe("2025-03-09");
  });

  it("handles fall-back DST timestamps without shifting the day", () => {
    // 2025-11-02 around the fall-back transition in America/New_York.
    // 05:30 UTC → 01:30 EDT (still Nov 2 local).
    expect(
      bucketKeyFor("2025-11-02T05:30:00Z", "day", "America/New_York"),
    ).toBe("2025-11-02");
    // 06:30 UTC → 01:30 EST (still Nov 2 local, after the clock fell back).
    expect(
      bucketKeyFor("2025-11-02T06:30:00Z", "day", "America/New_York"),
    ).toBe("2025-11-02");
  });
});

describe("bucketKeyFor — weekly bucketing (Monday start)", () => {
  it("anchors to the local Monday for a midweek timestamp in UTC", () => {
    // Wed 2025-03-12 → Monday 2025-03-10
    expect(bucketKeyFor("2025-03-12T10:00:00Z", "week", "UTC")).toBe("2025-03-10");
  });

  it("treats Sunday as the end (not start) of the previous week", () => {
    // Sun 2025-03-16 12:00 UTC → Monday 2025-03-10
    expect(bucketKeyFor("2025-03-16T12:00:00Z", "week", "UTC")).toBe("2025-03-10");
  });

  it("uses local weekday in America/Toronto for cross-midnight timestamps", () => {
    // 2025-03-17T02:00:00Z = Sun 2025-03-16 22:00 local in Toronto → Mon 2025-03-10
    expect(
      bucketKeyFor("2025-03-17T02:00:00Z", "week", "America/Toronto"),
    ).toBe("2025-03-10");
  });

  it("places consecutive days around DST in the same week (Toronto spring forward)", () => {
    // DST in America/Toronto begins Sun 2025-03-09 02:00 local.
    // Both Sat 2025-03-08 and Mon 2025-03-10 should bucket into the week
    // starting Mon 2025-03-03.
    const sat = bucketKeyFor("2025-03-08T18:00:00Z", "week", "America/Toronto");
    const mon = bucketKeyFor("2025-03-10T13:00:00Z", "week", "America/Toronto");
    expect(sat).toBe("2025-03-03");
    expect(mon).toBe("2025-03-10");
  });

  it("places consecutive days around fall-back DST in the correct week (Toronto)", () => {
    // DST ends Sun 2025-11-02 02:00 local in Toronto.
    // Sat 2025-11-01 and Sun 2025-11-02 both belong to the week of Mon 2025-10-27.
    expect(
      bucketKeyFor("2025-11-01T18:00:00Z", "week", "America/Toronto"),
    ).toBe("2025-10-27");
    expect(
      bucketKeyFor("2025-11-02T18:00:00Z", "week", "America/Toronto"),
    ).toBe("2025-10-27");
    // Mon 2025-11-03 starts a new week.
    expect(
      bucketKeyFor("2025-11-03T15:00:00Z", "week", "America/Toronto"),
    ).toBe("2025-11-03");
  });

  it("returns different Monday anchors for the same instant in different zones", () => {
    // 2025-03-17T02:00:00Z is Sun in Toronto but Mon in Dubai (06:00 local).
    expect(
      bucketKeyFor("2025-03-17T02:00:00Z", "week", "America/Toronto"),
    ).toBe("2025-03-10");
    expect(
      bucketKeyFor("2025-03-17T02:00:00Z", "week", "Asia/Dubai"),
    ).toBe("2025-03-17");
  });

  it("handles month boundaries inside a week", () => {
    // Wed 2025-04-02 in UTC → Monday 2025-03-31
    expect(bucketKeyFor("2025-04-02T09:00:00Z", "week", "UTC")).toBe("2025-03-31");
  });

  it("handles year boundaries inside a week", () => {
    // Thu 2026-01-01 in UTC → Monday 2025-12-29
    expect(bucketKeyFor("2026-01-01T09:00:00Z", "week", "UTC")).toBe("2025-12-29");
  });
});
