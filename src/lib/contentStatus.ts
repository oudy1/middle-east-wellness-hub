// One set of review states for every piece of SHAMS content (events,
// recordings, research studies, doctor listings, research opportunities).
// Only "published" items are promoted to visitors; "archived" items are kept
// as history and never featured.

export const CONTENT_STATUSES = ["draft", "pending_review", "approved", "published", "archived"] as const;
export type ContentStatus = (typeof CONTENT_STATUSES)[number];

export const isContentStatus = (s: unknown): s is ContentStatus =>
  typeof s === "string" && (CONTENT_STATUSES as readonly string[]).includes(s);

/** Visitors only ever see published items. */
export const isPublished = (s: string | undefined) => s === "published";

/** Labels for every status used anywhere on the site, including the database review states. */
export const STATUS_TEXT: Record<string, { en: string; ar: string; tone: "default" | "secondary" | "destructive" | "outline" }> = {
  draft: { en: "Draft", ar: "مسودة", tone: "outline" },
  pending: { en: "Pending review", ar: "بانتظار المراجعة", tone: "secondary" },
  pending_review: { en: "Pending review", ar: "بانتظار المراجعة", tone: "secondary" },
  needs_correction: { en: "Needs correction", ar: "يحتاج إلى تصحيح", tone: "secondary" },
  approved: { en: "Approved", ar: "تمت الموافقة", tone: "secondary" },
  published: { en: "Published", ar: "منشور", tone: "default" },
  rejected: { en: "Rejected", ar: "مرفوض", tone: "destructive" },
  archived: { en: "Archived", ar: "مؤرشف", tone: "outline" },
};

/** True when the text holds at least one Arabic letter. */
export const hasArabic = (s: unknown) => typeof s === "string" && /[\u0600-\u06FF]/.test(s);
