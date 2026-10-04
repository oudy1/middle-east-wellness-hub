import { describe, it, expect } from "vitest";
import { isEventUpcoming, REGISTER_URL } from "../UpcomingEventFeature";

describe("Know Your Rights upcoming event", () => {
  it("shows on Oct 21, 2026 at 11pm Toronto", () => {
    expect(isEventUpcoming(new Date("2026-10-22T03:00:00Z"))).toBe(true);
  });
  it("hides once Oct 21, 2026 has passed in Toronto", () => {
    expect(isEventUpcoming(new Date("2026-10-22T04:00:01Z"))).toBe(false);
  });
  it("uses the official registration form", () => {
    expect(REGISTER_URL).toBe("https://forms.gle/XgzS5fjHRYmHN2k16");
  });
});
