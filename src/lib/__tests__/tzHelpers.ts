// Shared helpers for timezone-aware bucketing tests.
//
// These utilities resolve precise UTC instants from local wall-clock times
// in any IANA timezone, so DST transition tests can probe sensitive hours
// (00:00, 01:00, 02:00, 03:00, 23:00) deterministically — no blind UTC
// offset sweeps, no flakiness from the host machine's zone.

const pad = (n: number) => String(n).padStart(2, "0");

export const formatLocal = (
  utc: Date,
  zone: string,
): { date: string; hour: string } => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: zone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(utc);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    hour: get("hour"),
  };
};

export const addDays = (date: string, days: number): string => {
  const [y, m, d] = date.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;
};

/**
 * Resolve the UTC instant whose wall-clock in `zone` equals
 * `localDate` at `localHour`:00.
 *
 * Returns `null` when the local time does not exist (spring-forward gap,
 * e.g. 02:00 on a US DST Sunday). On fall-back ambiguity the first matching
 * instant is returned — both repeated wall-clock instants share the same
 * local calendar date, which is all bucketing tests need.
 */
export const utcForLocal = (
  zone: string,
  localDate: string,
  localHour: number,
): string | null => {
  const [y, m, d] = localDate.split("-").map(Number);
  const targetHour = pad(localHour);
  // IANA zones span UTC-12..+14; scan that full range exhaustively.
  for (let off = -14; off <= 14; off++) {
    const utc = new Date(Date.UTC(y, m - 1, d, localHour + off, 0, 0));
    const { date, hour } = formatLocal(utc, zone);
    if (date === localDate && hour === targetHour) return utc.toISOString();
  }
  return null;
};
