// Outside links the chatbot may turn into buttons. Anything else the AI writes
// is shown as plain text, so a made-up or unofficial address can never be tapped.
//
// Allowed:
// - official government and health sites (by domain)
// - exact links that already appear on the SHAMS website (study sign-ups,
//   webinar recordings, convention recap)
// - an event registration link, only until the event day has passed

import studies from "../../content/studies.json";
import webinars from "../../content/webinars.json";
import { EVENTS, eventRecapUrls, isRegistrationOpen } from "./events";
import { isPublished } from "./contentStatus";

/** Official sources the assistant cites (mirrors OFFICIAL_SOURCES in the shams-chat function). */
export const OFFICIAL_SOURCES = {
  ohip_apply: "https://www.ontario.ca/page/apply-ohip-and-get-health-card",
  ifhp: "https://www.canada.ca/en/immigration-refugees-citizenship/services/refugees/help-within-canada/health-care/interim-federal-health-program.html",
  health811: "https://health811.ontario.ca/static/guest/home",
  crisis_988: "https://988.ca",
} as const;

/** Official domains; subdomains are allowed too (health811.ontario.ca). */
const OFFICIAL_HOSTS = ["ontario.ca", "canada.ca", "988.ca", "medlineplus.gov"];

const strip = (u: string) => u.trim().replace(/\/+$/, "");

/** Exact links published on the site (no expiry). */
const SITE_LINKS = new Set<string>(
  [
    ...(studies as { linkUrl?: string; status?: string }[]).filter((s) => isPublished(s.status)).map((s) => s.linkUrl).filter((u): u is string => !!u),
    ...(webinars as { youtubeId?: string; status?: string }[]).filter((w) => isPublished(w.status)).flatMap((w) =>
      w.youtubeId
        ? [`https://www.youtube.com/watch?v=${w.youtubeId}`, `https://youtu.be/${w.youtubeId}`]
        : []
    ),
    ...eventRecapUrls(),
  ].map(strip)
);

/** Registration links with the last Toronto day they may be offered. */
const TIMED_LINKS: { url: string; isOpen: (now: Date) => boolean }[] = EVENTS.filter((e) => e.registrationUrl).map((e) => ({
  url: e.registrationUrl!,
  isOpen: (now: Date) => isRegistrationOpen(e, now),
}));

export function isOfficialHost(url: string): boolean {
  try {
    const { protocol, hostname } = new URL(url);
    if (protocol !== "https:") return false;
    const host = hostname.toLowerCase();
    return OFFICIAL_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

/** May the chatbot show this outside link as a button right now? */
export function isApprovedExternalUrl(url: string, now: Date = new Date()): boolean {
  const clean = strip(url);
  if (!/^https:\/\//i.test(clean)) return false;
  const timed = TIMED_LINKS.find((l) => strip(l.url) === clean);
  if (timed) return timed.isOpen(now);
  return SITE_LINKS.has(clean) || isOfficialHost(clean);
}
