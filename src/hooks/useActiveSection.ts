import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Tracks which `[id]` section inside <main> is currently in the viewport's
 * "active band" (just below the sticky header). Returns the id (without `#`)
 * of the active section, or `""` if none.
 *
 * The active band is computed dynamically from the actual sticky header's
 * bounding rect, so it stays correct when the header height changes — e.g.
 * mobile vs. desktop breakpoints, condensed-on-scroll headers, drawer/sheet
 * opening that toggles header layout, or font/zoom changes. We rebuild the
 * IntersectionObserver whenever the header's measured height bucket changes
 * (rounded to the nearest 4px to avoid churn).
 */
export function useActiveSection(): string {
  const { pathname } = useLocation();
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    let cancelled = false;
    const visibility = new Map<string, number>();
    let observer: IntersectionObserver | null = null;
    let sections: HTMLElement[] = [];
    let currentHeaderBucket = -1;
    let resizeObserver: ResizeObserver | null = null;
    let rebuildRaf = 0;

    const measureHeaderHeight = (): number => {
      const header =
        document.querySelector<HTMLElement>("header[class*='sticky']") ||
        document.querySelector<HTMLElement>("header");
      if (!header) return 80;
      const h = header.getBoundingClientRect().height;
      // Expose for any other consumer that wants the live header offset.
      document.documentElement.style.setProperty(
        "--header-height",
        `${Math.round(h)}px`
      );
      return h;
    };

    const recompute = () => {
      let bestId = "";
      let bestRatio = 0;
      for (const el of sections) {
        const ratio = visibility.get(el.id) ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = el.id;
        }
      }
      setActiveId((prev) => (prev === bestId ? prev : bestId));
    };

    const buildObserver = () => {
      if (cancelled) return;
      const root =
        document.getElementById("main-content") ||
        document.querySelector("main");
      if (!root) return;

      sections = Array.from(root.querySelectorAll<HTMLElement>("[id]"));
      if (sections.length === 0) return;

      const headerH = measureHeaderHeight();
      // Bucket to nearest 4px to avoid rebuilding on sub-pixel changes.
      const bucket = Math.round(headerH / 4) * 4;
      if (bucket === currentHeaderBucket && observer) return;
      currentHeaderBucket = bucket;

      observer?.disconnect();
      visibility.clear();

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const id = (entry.target as HTMLElement).id;
            if (!id) continue;
            visibility.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
          }
          recompute();
        },
        {
          // Top margin matches the live header height so the "active band"
          // starts exactly where content becomes visible below the header.
          rootMargin: `-${bucket}px 0px -55% 0px`,
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );

      sections.forEach((el) => observer!.observe(el));
    };

    const scheduleRebuild = () => {
      if (rebuildRaf) cancelAnimationFrame(rebuildRaf);
      rebuildRaf = requestAnimationFrame(() => {
        rebuildRaf = 0;
        buildObserver();
      });
    };

    // Initial build, deferred so lazy sections can mount.
    const raf = window.requestAnimationFrame(() => {
      const t = window.setTimeout(() => {
        buildObserver();

        // Watch the header for height changes (breakpoint, condensed-on-scroll,
        // drawer open shifting layout, dynamic content).
        const header =
          document.querySelector<HTMLElement>("header[class*='sticky']") ||
          document.querySelector<HTMLElement>("header");
        if (header && "ResizeObserver" in window) {
          resizeObserver = new ResizeObserver(() => scheduleRebuild());
          resizeObserver.observe(header);
        }
      }, 150);
      // Stash cleanup of the timeout via closure on the outer cleanup below.
      (buildObserver as unknown as { _t?: number })._t = t;
    });

    // Viewport changes also affect header height (mobile rotation, browser UI).
    window.addEventListener("resize", scheduleRebuild);
    window.addEventListener("orientationchange", scheduleRebuild);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      if (rebuildRaf) cancelAnimationFrame(rebuildRaf);
      const t = (buildObserver as unknown as { _t?: number })._t;
      if (t) window.clearTimeout(t);
      window.removeEventListener("resize", scheduleRebuild);
      window.removeEventListener("orientationchange", scheduleRebuild);
      resizeObserver?.disconnect();
      observer?.disconnect();
      setActiveId("");
    };
  }, [pathname]);

  return activeId;
}
