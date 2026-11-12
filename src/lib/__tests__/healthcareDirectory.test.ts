import { describe, expect, it } from "vitest";
import {
  NEXT_STATUSES,
  PUBLIC_WORKER_COLUMNS,
  isDueForReverification,
  isPubliclyVisible,
  reportListingMailto,
} from "@/lib/healthcareDirectory";

describe("healthcare directory approval rules", () => {
  it("only published listings are visible to visitors", () => {
    expect(isPubliclyVisible("published")).toBe(true);
    for (const s of ["draft", "pending_review", "needs_correction", "approved", "rejected", "archived"] as const) {
      expect(isPubliclyVisible(s)).toBe(false);
    }
  });

  it("a rejected or corrected listing must go back to review before it can be published", () => {
    expect(NEXT_STATUSES.rejected).not.toContain("published");
    expect(NEXT_STATUSES.needs_correction).not.toContain("published");
    expect(NEXT_STATUSES.draft).not.toContain("published");
  });

  it("public pages never ask for private applicant details", () => {
    expect(PUBLIC_WORKER_COLUMNS).not.toMatch(/submitted_by_email|review_notes|reviewed_by|applicant_notes/);
  });

  it("listings are due for a re-check after 365 days or when flagged", () => {
    const now = new Date("2026-11-12T12:00:00Z");
    expect(isDueForReverification("2025-11-01T12:00:00Z", false, now)).toBe(true);
    expect(isDueForReverification("2026-01-01T12:00:00Z", false, now)).toBe(false);
    expect(isDueForReverification("2026-01-01T12:00:00Z", true, now)).toBe(true);
    expect(isDueForReverification(null, false, now)).toBe(true);
  });

  it("the report link emails SHAMS with the listing name and city", () => {
    const href = reportListingMailto({ id: "abc", full_name: "Dr. Sara Haddad", city: "Toronto", province: "ON" }, "en");
    expect(href.startsWith("mailto:infoprojectshams@gmail.com?subject=")).toBe(true);
    expect(decodeURIComponent(href)).toContain("Directory correction: Dr. Sara Haddad (Toronto, ON)");
    expect(decodeURIComponent(href)).toContain("Listing ID: abc");
  });
});
