import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Accessible smooth-scroll on hash navigation.
 *
 * - Respects `prefers-reduced-motion` (jumps instantly instead of smooth-scrolling).
 * - Moves keyboard focus to the target so the next Tab continues from the section,
 *   not from the top of the page. Adds `tabIndex=-1` only if the element isn't
 *   already focusable, and cleans it up on blur.
 * - Announces the target's accessible label (aria-label / aria-labelledby /
 *   first heading / fallback id) via a polite live region for screen readers.
 */
export function useHashScroll(deps: ReadonlyArray<unknown> = []) {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const timer = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;

      el.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });

      // Focus management — keep keyboard users in sync with the visual scroll.
      const hadTabIndex = el.hasAttribute("tabindex");
      if (!hadTabIndex) el.setAttribute("tabindex", "-1");
      // preventScroll because scrollIntoView already handled it (with header offset).
      try {
        (el as HTMLElement).focus({ preventScroll: true });
      } catch {
        (el as HTMLElement).focus();
      }
      if (!hadTabIndex) {
        const cleanup = () => {
          el.removeAttribute("tabindex");
          el.removeEventListener("blur", cleanup);
        };
        el.addEventListener("blur", cleanup);
      }

      // Announce via the global live region (rendered in App).
      const announceLabel =
        el.getAttribute("aria-label") ||
        (el.getAttribute("aria-labelledby") &&
          document.getElementById(el.getAttribute("aria-labelledby") as string)?.textContent) ||
        el.querySelector("h1, h2, h3")?.textContent ||
        id.replace(/[-_]/g, " ");

      const region = document.getElementById("route-live-region");
      if (region && announceLabel) {
        region.textContent = "";
        // Re-set on next frame so SR picks up the change.
        window.requestAnimationFrame(() => {
          region.textContent = `Navigated to ${announceLabel.trim()}`;
        });
      }
    }, 80);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash, location.key, ...deps]);
}
