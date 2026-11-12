/**
 * Healthcare directory rules shared by the public pages and the admin review page.
 * The database enforces who can see and publish listings; this module only
 * keeps the browser in step (which columns to ask for, which moves are offered).
 */

export const SHAMS_EMAIL = "infoprojectshams@gmail.com";

/** Columns the public pages read. Private applicant details live in another table. */
export const PUBLIC_WORKER_COLUMNS =
  "id, full_name, provider_type, specialty, languages, city, province, clinic_name, phone, email, website, address, accepting_new_patients, virtual_available, notes, verified, last_verified_at";

export interface PublicHealthcareWorker {
  id: string;
  full_name: string;
  provider_type: string;
  specialty: string | null;
  languages: string[] | null;
  city: string;
  province: string;
  clinic_name: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  accepting_new_patients: boolean | null;
  virtual_available: boolean | null;
  notes: string | null;
  verified: boolean | null;
  last_verified_at: string | null;
}

export const LISTING_STATUSES = [
  "draft",
  "pending_review",
  "needs_correction",
  "approved",
  "published",
  "rejected",
  "archived",
] as const;
export type ListingStatus = (typeof LISTING_STATUSES)[number];

export const STATUS_LABELS: Record<ListingStatus, string> = {
  draft: "Draft",
  pending_review: "Pending review",
  needs_correction: "Needs correction",
  approved: "Approved (not public)",
  published: "Published",
  rejected: "Rejected",
  archived: "Archived",
};

/** Only published listings are visible to visitors. */
export const isPubliclyVisible = (status: ListingStatus) => status === "published";

/** The moves an administrator is offered from each status. */
export const NEXT_STATUSES: Record<ListingStatus, ListingStatus[]> = {
  draft: ["pending_review"],
  pending_review: ["approved", "published", "needs_correction", "rejected"],
  needs_correction: ["pending_review", "rejected"],
  approved: ["published", "pending_review"],
  published: ["approved", "archived"],
  rejected: ["pending_review"],
  archived: ["pending_review", "published"],
};

export const ACTION_LABELS: Record<ListingStatus, string> = {
  draft: "Move to draft",
  pending_review: "Back to review",
  needs_correction: "Needs correction",
  approved: "Approve (keep hidden)",
  published: "Publish",
  rejected: "Reject",
  archived: "Archive",
};

/** Listings not checked for this long are shown to admins as due for re-verification. */
export const REVERIFY_AFTER_DAYS = 365;

export function isDueForReverification(
  lastVerifiedAt: string | null,
  needsReverification: boolean,
  now: Date = new Date(),
): boolean {
  if (needsReverification) return true;
  if (!lastVerifiedAt) return true;
  const ageDays = (now.getTime() - new Date(lastVerifiedAt).getTime()) / 86_400_000;
  return ageDays > REVERIFY_AFTER_DAYS;
}

/** Email link a visitor uses to report a wrong phone, address or other detail. */
export function reportListingMailto(
  worker: Pick<PublicHealthcareWorker, "id" | "full_name" | "city" | "province">,
  language: "en" | "ar",
): string {
  const subject = `Directory correction: ${worker.full_name} (${worker.city}, ${worker.province})`;
  const body =
    language === "ar"
      ? `ما المعلومة غير الصحيحة؟\n\nما التصحيح المقترح (إن وجد)؟\n\nرقم القائمة: ${worker.id}`
      : `What is incorrect?\n\nSuggested correction (if known):\n\nListing ID: ${worker.id}`;
  return `mailto:${SHAMS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
