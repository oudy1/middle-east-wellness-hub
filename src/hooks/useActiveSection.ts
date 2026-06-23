import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Tracks which `[id]` section inside <main> is currently in the viewport's
 * "active band" (just below the sticky header). Returns the id (without `#`)
 * of the active section, or `""` if none.
 *
 * Uses IntersectionObserver with a rootMargin that biases toward the top of
 * the viewport, so the active section is the one a reader is currently on,
 * not whatever sliver appears at the bottom.
 */
export function useActiveSection(): string {
  const { pathname } = useLocation();
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    // Defer so lazy-mounted sections have time to register.
    let cancelled = false;
    const visibility = new Map<string, number>();

    const setup = () => {
      if (cancelled) return () => {};
      const root =
        document.getElementById("main-content") ||
        document.querySelector("main");
      if (!root) return () => {};

      const sections = Array.from(root.querySelectorAll<HTMLElement>("[id]"));
      if (sections.length === 0) return () => {};

      const recompute = () => {
        // Pick the section with the largest visible ratio; tie-break by
        // earliest position in the document.
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

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const id = (entry.target as HTMLElement).id;
            if (!id) continue;
            visibility.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
          }
          recompute();
        },
        {
          // Active band sits just below the sticky header.
          rootMargin: "-96px 0px -55% 0px",
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );

      sections.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    };

    // Wait one frame, then a short timeout, to let Suspense fallbacks resolve.
    let cleanup: (() => void) | undefined;
    const raf = window.requestAnimationFrame(() => {
      const t = window.setTimeout(() => {
        cleanup = setup();
      }, 150);
      cleanup = () => window.clearTimeout(t);
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      cleanup?.();
      setActiveId("");
    };
  }, [pathname]);

  return activeId;
}
