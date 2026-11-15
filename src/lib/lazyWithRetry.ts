import { lazy, type ComponentType } from "react";

const RELOAD_FLAG = "shams-chunk-reload";

/**
 * React.lazy that recovers from a missing file after a new version is
 * published: the first failure reloads the page once to fetch fresh files,
 * a second failure is reported normally.
 */
export function lazyWithRetry<T extends ComponentType<any>>(load: () => Promise<{ default: T }>) {
  return lazy(async () => {
    try {
      const mod = await load();
      sessionStorage.removeItem(RELOAD_FLAG);
      return mod;
    } catch (error) {
      if (typeof window !== "undefined" && !sessionStorage.getItem(RELOAD_FLAG)) {
        sessionStorage.setItem(RELOAD_FLAG, "1");
        window.location.reload();
        return new Promise<{ default: T }>(() => {});
      }
      throw error;
    }
  });
}

/**
 * Start a download early (on idle or hover) without ever logging an error.
 * After a new version is published the old file may be gone; that is fine
 * here, because the real load goes through lazyWithRetry, which refreshes the
 * page once to pick up the new files.
 */
export function preloadQuietly(load: () => Promise<unknown>): void {
  try {
    load().catch(() => {});
  } catch {
    // ignore: the real load reports problems
  }
}
