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
