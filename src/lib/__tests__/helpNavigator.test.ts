import { describe, expect, it } from "vitest";
import { HELP_TOPICS, helpLinkHref } from "@/lib/helpNavigator";
import { approvedRouteMap, isApprovedInternalUrl } from "@/lib/chatbotRoutes";
import { listedLanguagesOf } from "@/lib/healthcareDirectory";

describe("How Can We Help You? navigator", () => {
  it("offers the six choices from the brief", () => {
    expect(HELP_TOPICS.map((t) => t.en)).toEqual([
      "I need healthcare information",
      "I am new to Canada",
      "I am looking for a healthcare worker",
      "I want to join a program",
      "I am interested in research",
      "I want to watch educational webinars",
    ]);
  });

  it("every site link comes from the approved address list", () => {
    for (const topic of HELP_TOPICS) {
      for (const link of topic.links) {
        if (!link.routeKey) continue;
        expect(approvedRouteMap[link.routeKey], `${topic.id}/${link.id}`).toBeDefined();
        expect(isApprovedInternalUrl(helpLinkHref(link)!)).toBe(true);
      }
    }
  });

  it("outside links go only to official Ontario or Canada government pages", () => {
    expect(helpLinkHref({ id: "x", externalUrl: "https://example.com/ohip", en: "", ar: "", descEn: "", descAr: "" })).toBeNull();
    for (const topic of HELP_TOPICS) {
      for (const link of topic.links) {
        if (!link.externalUrl) continue;
        expect(helpLinkHref(link), link.id).toBe(link.externalUrl);
      }
    }
  });

  it("each choice shows a short list (3 to 6 links) with Arabic text", () => {
    for (const topic of HELP_TOPICS) {
      expect(topic.ar.trim()).not.toBe("");
      expect(topic.links.length).toBeGreaterThanOrEqual(3);
      expect(topic.links.length).toBeLessThanOrEqual(6);
      for (const link of topic.links) {
        expect(link.ar.trim(), link.id).not.toBe("");
        expect(link.descAr.trim(), link.id).not.toBe("");
      }
    }
  });

  it("new to Canada covers OHIP, IFHP, family doctor, patient rights and newcomer workshops", () => {
    const newcomer = HELP_TOPICS.find((t) => t.id === "newcomer")!;
    const hrefs = newcomer.links.map(helpLinkHref);
    expect(hrefs.some((h) => h?.includes("ohip"))).toBe(true);
    expect(hrefs.some((h) => h?.includes("interim-federal-health-program"))).toBe(true);
    expect(hrefs.some((h) => h?.includes("find-family-doctor"))).toBe(true);
    expect(hrefs).toContain("/services#patient-rights");
    expect(hrefs).toContain("/programs#newcomer-initiative");
  });
});

describe("directory language filter", () => {
  it("lists only languages that appear on listings, once each", () => {
    expect(
      listedLanguagesOf([{ languages: ["Arabic", "English"] }, { languages: [" arabic", "French"] }, { languages: null }])
    ).toEqual(["Arabic", "English", "French"]);
  });
});

describe("directory language names", () => {
  it("shows Arabic names in Arabic and keeps the listed name otherwise", async () => {
    const { languageLabel } = await import("@/lib/healthcareDirectory");
    expect(languageLabel("Arabic", true)).toBe("العربية");
    expect(languageLabel("English", false)).toBe("English");
    expect(languageLabel("Tigrinya", true)).toBe("Tigrinya");
  });
});

import { QUICK_ENTRIES } from "../helpNavigator";
import { approvedRouteMap as quickRoutes } from "../chatbotRoutes";
describe("homepage quick entries", () => {
  it("has the six requested entry points", () => expect(QUICK_ENTRIES.map((q) => q.id)).toEqual(["newcomer", "arabic-info", "family-doctors", "research", "programs", "recordings"]));
  for (const q of QUICK_ENTRIES) it(`${q.id} opens an approved page with Arabic text`, () => { expect(quickRoutes[q.routeKey]).toBeTruthy(); expect(q.ar).toMatch(/[\u0600-\u06FF]/); });
});
