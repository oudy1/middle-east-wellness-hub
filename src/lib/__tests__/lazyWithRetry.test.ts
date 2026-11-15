import { describe, expect, it, vi } from "vitest";
import { preloadQuietly } from "../lazyWithRetry";

describe("background downloads", () => {
  it("a missing file during warm-up raises no error", async () => {
    const onUnhandled = vi.fn();
    process.on("unhandledRejection", onUnhandled);
    preloadQuietly(() => Promise.reject(new TypeError("Failed to fetch dynamically imported module")));
    preloadQuietly(() => {
      throw new Error("sync failure");
    });
    await new Promise((r) => setTimeout(r, 20));
    process.off("unhandledRejection", onUnhandled);
    expect(onUnhandled).not.toHaveBeenCalled();
  });

  it("still starts the download", () => {
    const load = vi.fn(() => Promise.resolve({}));
    preloadQuietly(load);
    expect(load).toHaveBeenCalledTimes(1);
  });
});
