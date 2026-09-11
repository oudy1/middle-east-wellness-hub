// Single source of truth for every destination the chatbot, smart search,
// quick replies and recommended links may point to.
//
// content/chatbot-routes.json is the approved route map. Nothing else may
// invent a SHAMS URL. Anything not resolvable here is rejected before
// navigation happens.

import routes from "../../content/chatbot-routes.json";

export const approvedRouteMap: Record<string, string> = routes as Record<string, string>;

/** Every approved internal URL, e.g. "/services#resources" */
export const approvedUrls: ReadonlySet<string> = new Set(Object.values(approvedRouteMap));

/** Base paths (no hash / query), e.g. "/services" */
export const approvedPaths: ReadonlySet<string> = new Set(
  Object.values(approvedRouteMap).map((u) => u.split("#")[0].split("?")[0])
);

/** Approved hashes per base path, so invented anchors are blocked. */
export const approvedHashes: Record<string, Set<string>> = Object.values(approvedRouteMap).reduce(
  (acc, url) => {
    const [pathPart, hash] = url.split("#");
    const path = pathPart.split("?")[0];
    if (!acc[path]) acc[path] = new Set<string>();
    if (hash) acc[path].add(hash);
    return acc;
  },
  {} as Record<string, Set<string>>
);

/** Approved mailto actions with prefilled subjects. */
export const SHAMS_EMAIL = "infoprojectshams@gmail.com";

export const mailtoActions = {
  general: `mailto:${SHAMS_EMAIL}?subject=${encodeURIComponent("General Inquiry – SHAMS")}`,
  opportunity: `mailto:${SHAMS_EMAIL}?subject=${encodeURIComponent("Opportunity Submission – SHAMS")}`,
  healthcare_listing: `mailto:${SHAMS_EMAIL}?subject=${encodeURIComponent(
    "Healthcare Worker Listing Request – SHAMS"
  )}`,
} as const;

/** Nearest verified parent page for a given internal URL. */
export function parentRoute(url: string): string {
  const path = url.split("#")[0].split("?")[0];
  if (!path || path === "/") return "/";
  if (approvedPaths.has(path)) {
    // /programs/mentorship -> /programs when the deeper page is unreachable
    const segments = path.split("/").filter(Boolean);
    if (segments.length > 1) {
      const parent = `/${segments.slice(0, -1).join("/")}`;
      if (approvedPaths.has(parent)) return parent;
    }
    return path;
  }
  return "/";
}

/**
 * Is this a chatbot-generated internal link we are willing to navigate to?
 * Accepts approved base paths, approved hashes on those paths, and query
 * strings (used by the healthcare directory city/province search).
 */
export function isApprovedInternalUrl(url: string): boolean {
  if (!url.startsWith("/")) return false;
  const [beforeHash, hash] = url.split("#");
  const path = beforeHash.split("?")[0];
  if (!approvedPaths.has(path)) return false;
  if (hash && !approvedHashes[path]?.has(hash)) return false;
  return true;
}

export function isMailtoOrTel(url: string): boolean {
  const trimmed = url.trim().toLowerCase();
  return trimmed.startsWith("mailto:") || trimmed.startsWith("tel:");
}

export function isSafeExternalUrl(url: string): boolean {
  const trimmed = url.trim().toLowerCase();
  return trimmed.startsWith("https://") || trimmed.startsWith("http://");
}
