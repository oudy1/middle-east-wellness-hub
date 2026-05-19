import { useCallback, useEffect, useRef, useState } from "react";

type CalligraphyMetrics = {
  cachedHit: number;
  generated: number;
  ioUnsupported: number;
  heroMissing: number;
  skippedNeverIntersected: number;
  skippedAfterSchedule: number;
  lastGenerationMs: number | null;
  lastPhaseMs: Record<string, number>;
};

/**
 * Dev-only floating overlay that polls window.__calligraphyMetrics and
 * displays the live generation status of CalligraphyBackground.
 *
 * Supports pause/resume of the polling loop and an on-demand refresh.
 */
const MetricsDebugOverlay = () => {
  const [metrics, setMetrics] = useState<CalligraphyMetrics | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const read = useCallback(() => {
    const m = (window as unknown as Record<string, CalligraphyMetrics>)
      .__calligraphyMetrics;
    setMetrics(m ?? null);
    setLastUpdated(Date.now());
  }, []);

  // Keep latest `read` reference for the interval without restarting it.
  const readRef = useRef(read);
  useEffect(() => {
    readRef.current = read;
  }, [read]);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    readRef.current();
    if (paused) return;
    const id = window.setInterval(() => readRef.current(), 500);
    return () => window.clearInterval(id);
  }, [paused]);

  if (!import.meta.env.DEV) return null;

  const status = (() => {
    if (!metrics) return { label: "waiting", color: "bg-muted-foreground" };
    if (metrics.cachedHit > 0)
      return { label: "cached", color: "bg-emerald-500" };
    if (metrics.generated > 0)
      return { label: "generated", color: "bg-sky-500" };
    if (metrics.skippedNeverIntersected > 0 || metrics.skippedAfterSchedule > 0)
      return { label: "skipped", color: "bg-amber-500" };
    return { label: "pending", color: "bg-muted-foreground" };
  })();

  const lastMs =
    metrics?.lastGenerationMs != null
      ? `${Math.round(metrics.lastGenerationMs)}ms`
      : "—";

  const updatedAgo =
    lastUpdated != null
      ? `${Math.max(0, Math.round((Date.now() - lastUpdated) / 1000))}s`
      : "—";

  return (
    <div
      role="status"
      aria-label="Calligraphy generation debug overlay"
      className="fixed bottom-3 right-3 z-50 select-none rounded-md border border-border bg-background/90 px-2 py-1 text-[11px] font-mono text-foreground shadow-sm backdrop-blur"
    >
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="flex items-center gap-1.5"
          aria-expanded={!collapsed}
          aria-label="Toggle metrics overlay details"
        >
          <span
            className={`inline-block h-2 w-2 rounded-full ${status.color}`}
            aria-hidden="true"
          />
          <span className="font-semibold">{status.label}</span>
          <span className="text-muted-foreground">{lastMs}</span>
        </button>

        <span className="mx-1 h-3 w-px bg-border" aria-hidden="true" />

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="rounded px-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          aria-pressed={paused}
          aria-label={paused ? "Resume polling" : "Pause polling"}
          title={paused ? "Resume polling" : "Pause polling"}
        >
          {paused ? "▶" : "❚❚"}
        </button>
        <button
          type="button"
          onClick={read}
          className="rounded px-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          aria-label="Refresh metrics now"
          title="Refresh metrics now"
        >
          ⟳
        </button>
      </div>

      {!collapsed && (
        <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-0.5 text-muted-foreground">
          <span>status</span>
          <span className="text-right text-foreground">
            {paused ? "paused" : "live"}
          </span>
          <span>updated</span>
          <span className="text-right text-foreground">{updatedAgo} ago</span>
          {metrics && (
            <>
              <span>cached</span>
              <span className="text-right text-foreground">
                {metrics.cachedHit}
              </span>
              <span>generated</span>
              <span className="text-right text-foreground">
                {metrics.generated}
              </span>
              <span>skip-no-int</span>
              <span className="text-right text-foreground">
                {metrics.skippedNeverIntersected}
              </span>
              <span>skip-sched</span>
              <span className="text-right text-foreground">
                {metrics.skippedAfterSchedule}
              </span>
              <span>io-unsupp</span>
              <span className="text-right text-foreground">
                {metrics.ioUnsupported}
              </span>
              <span>hero-miss</span>
              <span className="text-right text-foreground">
                {metrics.heroMissing}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MetricsDebugOverlay;
