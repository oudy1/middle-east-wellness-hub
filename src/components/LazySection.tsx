import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  /** Space kept free before the section appears, so the page doesn't jump much. */
  minHeight?: number;
  /** How far below the screen to start loading (px). */
  margin?: number;
}

/**
 * Renders its children only when the visitor scrolls near them, so phones
 * download and run lower homepage sections on demand. Renders immediately
 * when the browser has no IntersectionObserver or the page was opened with a
 * #section link (so jump links always find their target).
 */
export default function LazySection({ children, minHeight = 600, margin = 600 }: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(
    () =>
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined" ||
      Boolean(window.location.hash)
  );

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: `${margin}px 0px` }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, margin]);

  if (visible) return <>{children}</>;
  return <div ref={ref} style={{ minHeight }} aria-hidden="true" data-lazy-section="" />;
}
