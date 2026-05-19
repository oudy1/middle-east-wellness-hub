import { useEffect, useState } from "react";

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
 */
const MetricsDebugOverlay = () => {
  const [metrics, setMetrics] = useState<CalligraphyMetrics | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const read = () => {
      const m = (window as unknown as Record<string, CalligraphyMetrics>)
        .__calligraphyMetrics;
      setMetrics(m ?? null);
    };
    read();
    const id = window.setInterval(read, 500);
    return () => window.clearInterval(id);
  }, []);

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

  return (
    <div
      role="status"
      aria-label="Calligraphy generation debug overlay"
      className="fixed bottom-3 right-3 z-50 select-none rounded-md border border-border bg-background/90 px-2 py-1 text-[11px] font-mono text-foreground shadow-sm backdrop-blur"
    >
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center gap-1.5"
        aria-expanded={!collapsed}
      >
        <span
          className={`inline-block h-2 w-2 rounded-full ${status.color}`}
          aria-hidden="true"
        />
        <span className="font-semibold">{status.label}</span>
        <span className="text-muted-foreground">{lastMs}</span>
      </button>

      {!collapsed && metrics && (
        <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-0.5 text-muted-foreground">
          <span>cached</span>
          <span className="text-right text-foreground">{metrics.cachedHit}</span>
          <span>generated</span>
          <span className="text-right text-foreground">{metrics.generated}</span>
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
        </div>
      )}
    </div>
  );
};

export default MetricsDebugOverlay;
