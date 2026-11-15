// Shared record for every SHAMS event (content/events.json). The homepage,
// Programs, Recordings, news, search, chatbot and approved-link list all read
// dates, registration links, posters, recordings and recaps from here, so an
// event is entered once.
//
// Lifecycle (Toronto calendar date):
//   upcoming   - on or before the event day, registration link shown
//   recording  - after the day, a published recording exists
//   recap      - after the day, a recap link exists
//   completed  - after the day, SHAMS confirmed it took place (heldConfirmed)
//   ended      - after the day with nothing confirmed: "Registration closed",
//                never "completed", so the site does not claim it happened.

import eventsData from "../../content/events.json";
import webinarsData from "../../content/webinars.json";
import { isPublished, type ContentStatus } from "./contentStatus";
import kyrEn from "@/assets/know-your-rights-en.webp.asset.json";
import kyrAr from "@/assets/know-your-rights-ar.webp.asset.json";
import mhcPoster from "@/assets/mhc-poster.png.asset.json";
import newcomerEn from "@/assets/newcomer-workshop-poster-en.webp.asset.json";
import newcomerAr from "@/assets/newcomer-workshop-poster-ar.webp.asset.json";

export type Lang = "en" | "ar";

export interface EventText {
  title: string;
  date: string;
  time?: string;
  place: string;
}

export interface EventRecord {
  id: string;
  kind: "webinar" | "workshop" | "convention";
  status: ContentStatus;
  dateIso: string;
  startUtc?: string;
  endUtc?: string;
  en: EventText;
  ar: EventText;
  posters: string[];
  registrationUrl?: string;
  detailsPath: string;
  heldConfirmed: boolean;
  recordingId?: string;
  recapUrl?: string;
}

/** Poster files by key. Add a new poster here once, then list its key on the event. */
export const POSTERS: Record<string, { url: string; lang: Lang | "both" }> = {
  "know-your-rights-en": { url: kyrEn.url, lang: "en" },
  "know-your-rights-ar": { url: kyrAr.url, lang: "ar" },
  "mhc-poster": { url: mhcPoster.url, lang: "en" },
  "newcomer-workshop-en": { url: newcomerEn.url, lang: "en" },
  "newcomer-workshop-ar": { url: newcomerAr.url, lang: "ar" },
};

export const EVENTS = eventsData as EventRecord[];

export interface Recording {
  id: string;
  status?: string;
  eventId?: string;
  youtubeId: string;
  date?: string;
  dateAr?: string;
  en: { title: string; description: string; speakers: string[]; topics?: string[]; watchButton: string };
  ar: { title: string; description: string; speakers: string[]; topics?: string[]; watchButton: string };
  tags: string[];
  tagsAr?: string[];
  slidesUrl?: string;
  resourcesUrl?: string;
}

export const getEvent = (id: string): EventRecord => {
  const e = EVENTS.find((x) => x.id === id);
  if (!e) throw new Error(`Unknown event: ${id}`);
  return e;
};

export const torontoDate = (now: Date = new Date()) =>
  now.toLocaleDateString("en-CA", { timeZone: "America/Toronto" });

/** Recordings visitors can see, with dates taken from the linked event so they never disagree. */
export const RECORDINGS: Recording[] = (webinarsData as Recording[])
  .filter((w) => isPublished(w.status))
  .map((w) => {
    const ev = w.eventId ? EVENTS.find((e) => e.id === w.eventId) : undefined;
    return ev ? { ...w, date: ev.en.date, dateAr: ev.ar.date } : w;
  });

/** The published recording of an event, only when it has a YouTube video. */
export const recordingFor = (e: EventRecord): Recording | undefined =>
  e.recordingId ? RECORDINGS.find((r) => r.id === e.recordingId && !!r.youtubeId) : undefined;

export type EventPhase = "hidden" | "upcoming" | "recording" | "recap" | "completed" | "ended";

export const eventPhase = (e: EventRecord, now: Date = new Date()): EventPhase => {
  if (!isPublished(e.status)) return "hidden";
  if (torontoDate(now) <= e.dateIso) return "upcoming";
  if (recordingFor(e)) return "recording";
  if (e.recapUrl) return "recap";
  if (e.heldConfirmed) return "completed";
  return "ended";
};

/** A registration link is offered only while the event is upcoming. */
export const isRegistrationOpen = (e: EventRecord, now: Date = new Date()) =>
  !!e.registrationUrl && eventPhase(e, now) === "upcoming";

export const PHASE_LABELS: Record<Exclude<EventPhase, "hidden">, Record<Lang, string>> = {
  upcoming: { en: "Upcoming", ar: "قادمة" },
  recording: { en: "Recording available", ar: "التسجيل متاح" },
  recap: { en: "Recap available", ar: "الملخص متاح" },
  completed: { en: "Completed", ar: "انتهت" },
  ended: { en: "Registration closed", ar: "أُغلق التسجيل" },
};

/** Posters in reading order: the visitor's language first, the other language after. */
export const postersFor = (e: EventRecord, lang: Lang) =>
  e.posters
    .map((key) => ({ key, ...POSTERS[key] }))
    .filter((p) => !!p.url)
    .sort((a, b) => Number(b.lang === lang) - Number(a.lang === lang));

/** Fields still missing Arabic (or English) text. Published events must return an empty list. */
export const missingTranslations = (e: EventRecord): string[] => {
  const out: string[] = [];
  for (const f of ["title", "date", "place"] as const) {
    if (!e.en[f]?.trim()) out.push(`en.${f}`);
    if (!/[\u0600-\u06FF]/.test(e.ar[f] ?? "")) out.push(`ar.${f}`);
  }
  if (e.en.time && !/[\u0600-\u06FF]/.test(e.ar.time ?? "")) out.push("ar.time");
  return out;
};

/** Every outside link an event publishes that has no end date (recaps). */
export const eventRecapUrls = () => EVENTS.filter((e) => isPublished(e.status) && e.recapUrl).map((e) => e.recapUrl!);
