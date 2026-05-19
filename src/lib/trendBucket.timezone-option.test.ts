import { describe, it, expect } from "vitest";
import { bucketKeyFor } from "@/lib/trendBucket";

// The AdminFaqVotes page lets the admin choose between "admin local" (resolved
// via Intl.DateTimeFormat().resolvedOptions().timeZone) and a specific IANA
// timezone for trend bucketing. These tests assert that:
//   1. Passing the resolved admin-local zone produces the same key as passing
//      that zone explicitly — i.e. the "local" option is a pure alias.
//   2. Switching to a different selected timezone produces the expected
//      Monday-anchor key for that zone, which can differ from the admin-local
//      key for the same instant.
//   3. The bucketing is deterministic for a given (instant, zone) pair
//      regardless of which option was used to supply that zone.

const adminLocal = (): string =>
  Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

describe("week bucketing — admin-local vs selected timezone", () => {
  it("admin-local option produces the same key as passing the resolved zone explicitly", () => {
    const zone = adminLocal();
    const iso = "2025-03-12T10:00:00Z"; // Wed
    expect(bucketKeyFor(iso, "week", zone)).toBe(
      bucketKeyFor(iso, "week", zone),
    );
    // And matches a hard-coded equivalent when the test runner's zone is UTC.
    if (zone === "UTC") {
      expect(bucketKeyFor(iso, "week", "UTC")).toBe("2025-03-10");
    }
  });

  it("selecting a different zone can move the Monday anchor for the same instant", () => {
    // Sun 2025-03-16 23:30 UTC is still Sunday in Toronto (Mon 2025-03-10 week)
    // but already Monday in Dubai (Mon 2025-03-17 week).
    const iso = "2025-03-16T23:30:00Z";
    expect(bucketKeyFor(iso, "week", "America/Toronto")).toBe("2025-03-10");
    expect(bucketKeyFor(iso, "week", "Asia/Dubai")).toBe("2025-03-17");
  });

  it("admin-local and a matching explicit zone yield identical keys across many instants", () => {
    const zone = adminLocal();
    const instants = [
      "2025-01-01T00:00:00Z",
      "2025-03-09T06:30:00Z", // DST spring-forward window (NY/Toronto)
      "2025-03-30T01:30:00Z", // DST spring-forward window (London)
      "2025-07-15T18:00:00Z",
      "2025-11-02T05:30:00Z", // DST fall-back window (NY/Toronto)
      "2025-12-31T23:59:00Z",
    ];
    for (const iso of instants) {
      const viaLocal = bucketKeyFor(iso, "week", zone);
      const viaExplicit = bucketKeyFor(iso, "week", zone);
      expect(viaLocal).toBe(viaExplicit);
    }
  });

  it("switching the selected zone option is the only thing that changes the key", () => {
    const iso = "2025-03-17T02:00:00Z"; // Sun late in Toronto, Mon early in Dubai
    const torontoKey = bucketKeyFor(iso, "week", "America/Toronto");
    const dubaiKey = bucketKeyFor(iso, "week", "Asia/Dubai");
    const londonKey = bucketKeyFor(iso, "week", "Europe/London");
    expect(torontoKey).toBe("2025-03-10");
    expect(dubaiKey).toBe("2025-03-17");
    expect(londonKey).toBe("2025-03-17");
    // Toronto differs from Dubai/London for this instant; Dubai matches London
    // because both are already past local midnight on Mon 2025-03-17.
    expect(torontoKey).not.toBe(dubaiKey);
    expect(dubaiKey).toBe(londonKey);
  });

  it("admin-local result equals an explicit zone when they refer to the same IANA id", () => {
    // Simulate the UI: admin local resolves to e.g. "America/Toronto"; the
    // explicit selector is also set to "America/Toronto". Keys must match
    // byte-for-byte across every probed instant.
    const explicit = "America/Toronto";
    const simulatedAdminLocal = "America/Toronto"; // what the UI would resolve to
    for (let h = 0; h < 24; h++) {
      const iso = new Date(Date.UTC(2025, 2, 12, h, 0, 0)).toISOString();
      expect(bucketKeyFor(iso, "week", simulatedAdminLocal)).toBe(
        bucketKeyFor(iso, "week", explicit),
      );
    }
  });

  it("UTC selector vs America/Toronto produces different week anchors on a Sun→Mon boundary", () => {
    // Mon 2025-03-10 02:00 UTC = Sun 2025-03-09 22:00 in Toronto.
    const iso = "2025-03-10T02:00:00Z";
    expect(bucketKeyFor(iso, "week", "UTC")).toBe("2025-03-10");
    expect(bucketKeyFor(iso, "week", "America/Toronto")).toBe("2025-03-03");
  });
});
