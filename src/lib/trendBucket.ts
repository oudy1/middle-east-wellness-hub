// Pure helpers for bucketing FAQ-vote trend data into days or
// Monday-start weeks within an arbitrary IANA timezone.
//
// We extract Y/M/D and weekday in the target timezone via Intl, then do
// calendar arithmetic in UTC (whole-day subtraction only) so DST transitions
// can never shift the bucket by an hour or a day.

export type Granularity = "day" | "week";

const WEEKDAY_TO_OFFSET: Record<string, number> = {
  Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6,
};

const pad = (n: number) => String(n).padStart(2, "0");

export const bucketKeyFor = (
  iso: string,
  granularity: Granularity,
  timeZone: string,
): string => {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });
  const parts = fmt.formatToParts(new Date(iso));
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const y = Number(get("year"));
  const m = Number(get("month"));
  const d = Number(get("day"));
  const diff = granularity === "week" ? (WEEKDAY_TO_OFFSET[get("weekday")] ?? 0) : 0;
  const anchor = new Date(Date.UTC(y, m - 1, d) - diff * 86400000);
  return `${anchor.getUTCFullYear()}-${pad(anchor.getUTCMonth() + 1)}-${pad(anchor.getUTCDate())}`;
};
