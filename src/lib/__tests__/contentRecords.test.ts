import { describe, expect, it } from "vitest";
import events from "../../../content/events.json";
import webinars from "../../../content/webinars.json";
import studies from "../../../content/studies.json";
import {
  EVENTS,
  POSTERS,
  RECORDINGS,
  eventPhase,
  getEvent,
  isRegistrationOpen,
  missingTranslations,
  postersFor,
  type EventRecord,
} from "../events";
import { CONTENT_STATUSES, hasArabic } from "../contentStatus";
import { isApprovedExternalUrl } from "../approvedExternalLinks";
import { studies as shownStudies } from "../studyData";

const at = (iso: string) => new Date(iso);
const base = getEvent("newcomer-workshop-2026-11-19");
const variant = (over: Partial<EventRecord>): EventRecord => ({ ...base, ...over });

describe("every content record has a review status", () => {
  it.each([
    ["events", events],
    ["recordings", webinars],
    ["studies", studies],
  ])("%s use only draft, pending review, approved, published or archived", (_n, list) => {
    for (const item of list as { id: string; status?: string }[]) {
      expect(CONTENT_STATUSES, item.id).toContain(item.status);
    }
  });

  it("each event is entered once", () => {
    const ids = EVENTS.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("Arabic text is ready before anything is published", () => {
  it("published events have English and Arabic title, date, time and place", () => {
    for (const e of EVENTS.filter((x) => x.status === "published")) expect(missingTranslations(e), e.id).toEqual([]);
  });
  it("published recordings have Arabic title, description, speakers and button", () => {
    for (const w of RECORDINGS) {
      expect(hasArabic(w.ar.title), w.id).toBe(true);
      expect(hasArabic(w.ar.description), w.id).toBe(true);
      expect(hasArabic(w.ar.watchButton), w.id).toBe(true);
      expect(w.ar.speakers.length, w.id).toBe(w.en.speakers.length);
    }
  });
  it("published studies have Arabic title and summary", () => {
    for (const s of shownStudies) {
      expect(hasArabic(s.titleAr), s.id).toBe(true);
      expect(hasArabic(s.summaryAr), s.id).toBe(true);
    }
  });
  it("flags a missing Arabic field", () => {
    expect(missingTranslations(variant({ ar: { ...base.ar, place: "Toronto" } }))).toEqual(["ar.place"]);
  });
});

describe("event links, posters and recordings point at real records", () => {
  it("every poster key exists and every recording link has a video", () => {
    for (const e of EVENTS) {
      for (const key of e.posters) expect(POSTERS[key], `${e.id} ${key}`).toBeDefined();
      if (e.recordingId) expect(RECORDINGS.some((r) => r.id === e.recordingId), e.id).toBe(true);
      if (e.registrationUrl) expect(e.registrationUrl.startsWith("https://"), e.id).toBe(true);
      expect(e.dateIso).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      if (e.startUtc) expect(e.startUtc.slice(0, 8)).toBe(e.dateIso.replace(/-/g, ""));
    }
  });
  it("Arabic visitors see the Arabic poster first", () => {
    expect(postersFor(base, "ar")[0].key).toBe("newcomer-workshop-ar");
    expect(postersFor(base, "en")[0].key).toBe("newcomer-workshop-en");
  });
  it("the recordings page takes the Know Your Rights date from the event", () => {
    const kyr = RECORDINGS.find((r) => r.id === "know-your-rights")!;
    expect(kyr.date).toBe(getEvent("know-your-rights-2026-10-21").en.date);
    expect(kyr.dateAr).toBe(getEvent("know-your-rights-2026-10-21").ar.date);
  });
});

describe("event lifecycle", () => {
  it("is upcoming through the event day in Toronto, with registration open", () => {
    expect(eventPhase(base, at("2026-11-20T04:59:00Z"))).toBe("upcoming");
    expect(isRegistrationOpen(base, at("2026-11-20T04:59:00Z"))).toBe(true);
  });
  it("closes registration the next Toronto day", () => {
    expect(isRegistrationOpen(base, at("2026-11-20T05:00:00Z"))).toBe(false);
    expect(isApprovedExternalUrl(base.registrationUrl!, at("2026-11-20T05:00:00Z"))).toBe(false);
  });
  it("a passed date alone never counts as completed or recorded", () => {
    expect(eventPhase(variant({ heldConfirmed: false }), at("2026-12-01T12:00:00Z"))).toBe("ended");
  });
  it("becomes completed only when SHAMS confirms it took place", () => {
    expect(eventPhase(variant({ heldConfirmed: true }), at("2026-12-01T12:00:00Z"))).toBe("completed");
  });
  it("switches to the recording once a published recording is linked", () => {
    expect(eventPhase(getEvent("know-your-rights-2026-10-21"), at("2026-11-15T12:00:00Z"))).toBe("recording");
  });
  it("switches to the recap when a recap link is added", () => {
    expect(eventPhase(getEvent("mental-health-convention-2026-07-18"), at("2026-11-15T12:00:00Z"))).toBe("recap");
  });
  it("drafts and items waiting for review are never shown", () => {
    for (const status of ["draft", "pending_review", "approved", "archived"] as const) {
      expect(eventPhase(variant({ status }), at("2026-11-01T12:00:00Z"))).toBe("hidden");
      expect(isRegistrationOpen(variant({ status }), at("2026-11-01T12:00:00Z"))).toBe(false);
    }
  });
  it("the old Know Your Rights sign-up form is no longer offered", () => {
    expect(isApprovedExternalUrl("https://forms.gle/XgzS5fjHRYmHN2k16", at("2026-11-15T12:00:00Z"))).toBe(false);
  });
});

describe("unpublished recordings and studies stay off the site", () => {
  it("only published recordings reach the recordings page", () => {
    const hidden = (webinars as { id: string; status: string }[]).filter((w) => w.status !== "published").map((w) => w.id);
    for (const id of hidden) expect(RECORDINGS.some((r) => r.id === id)).toBe(false);
    expect(RECORDINGS.every((r) => r.status === "published")).toBe(true);
  });
});
