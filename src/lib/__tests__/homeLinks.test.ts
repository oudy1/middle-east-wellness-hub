import { describe, it, expect } from "vitest";
import { BENTO_KEYS, HERO_LINKS, JOURNEY_KEYS, HOME_ROUTES, homeRoute } from "@/lib/homeLinks";

describe("homepage links", () => {
  it("every homepage card uses a listed route", () => {
    for (const k of [...BENTO_KEYS, ...JOURNEY_KEYS, HERO_LINKS.primary, HERO_LINKS.secondary]) {
      expect(HOME_ROUTES[k], k).toMatch(/^\//);
    }
  });
  it("has the six help areas", () => {
    expect(BENTO_KEYS).toHaveLength(6);
    expect(homeRoute("healthcare_workers")).toBe("/find-healthcare-workers");
  });
  it("rejects unknown keys", () => {
    expect(() => homeRoute("nope")).toThrow();
  });
});
