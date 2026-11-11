import { describe, it, expect } from "vitest";
import { normalizeText, toWords, matchWord } from "../searchText";
import { searchResources } from "../resourceFinderData";
import { searchKnowledge } from "../knowledgeIndex";
import { searchSite, groupResults, flattenGroups } from "../siteSearch";
import { isApprovedUrl } from "../knowledgeIndex";

describe("Arabic spelling variants", () => {
  it("ignores diacritics and treats ة like ه", () => {
    expect(normalizeText("الصِّحَّة النفسيّة")).toBe("الصحه النفسيه");
  });
  it("drops the article so الصحة and صحة match", () => {
    expect(toWords("الصحة")).toEqual(toWords("صحة"));
  });
  it("finds Mental Health when typed without taa marbuta", () => {
    expect(searchResources("الصحه النفسيه", "ar")[0].id).toBe("mental-health");
  });
  it("finds Vaccines when hamza is left off (انفلونزا)", () => {
    expect(searchResources("انفلونزا", "ar").map((r) => r.id)).toContain("vaccines");
  });
});

describe("typo tolerance", () => {
  it("finds Diabetes for 'diabetis'", () => {
    expect(searchResources("diabetis", "en")[0].id).toBe("diabetes");
  });
  it("finds Vaccines for 'vacination'", () => {
    expect(searchResources("vacination", "en")[0].id).toBe("vaccines");
  });
  it("allows no typo in words under 5 letters ('art' is not 'heart')", () => {
    expect(matchWord("art", ["heart"])).toBeNull();
  });
  it("matches a word still being typed ('diab')", () => {
    expect(matchWord("diab", ["diabetes"])).toBe("prefix");
  });
  it("returns nothing for gibberish instead of every entry", () => {
    expect(searchKnowledge("xyzzy qwrtp")).toEqual([]);
    expect(searchSite("xyzzy qwrtp", "en")).toEqual([]);
  });
});

describe("one search list for the site", () => {
  it("finds the past Mental Health Convention, which only the chatbot knew", () => {
    const urls = searchSite("mental health convention", "en").map((r) => r.url);
    expect(urls[0]).toBe("/programs#mental-health-convention");
  });
  it("drops results that match only one of several typed words", () => {
    const ids = searchSite("mental health convention", "en").map((r) => r.id);
    expect(ids).not.toContain("womens-health");
  });
  it("keeps the curated Know Your Rights entry first and does not repeat it", () => {
    const results = searchSite("Know Your Rights recording", "en");
    expect(results[0].url).toBe("/recordings#webinar-know-your-rights");
    expect(results.filter((r) => r.url === "/recordings#webinar-know-your-rights")).toHaveLength(1);
  });
  it("shows at most 12 results, all on approved addresses", () => {
    for (const q of ["health", "صحة", "research study", "webinar", "doctor"]) {
      const results = searchSite(q, "en");
      expect(results.length).toBeLessThanOrEqual(12);
      for (const r of results) expect(isApprovedUrl(r.url), r.url).toBe(true);
    }
  });
  it("groups results with the best group first, in display order", () => {
    const results = searchSite("diabetes", "en");
    const groups = groupResults(results);
    expect(groups[0].category).toBe(results[0].category);
    expect(flattenGroups(groups)).toHaveLength(results.length);
  });
});
