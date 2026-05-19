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
const STABILITY_HIDE_MS = 10_000;

const MetricsDebugOverlay = () => {
  const [metrics, setMetrics] = useState<CalligraphyMetrics | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [phasesOpen, setPhasesOpen] = useState(false);
  const [autoHide, setAutoHide] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [stableSince, setStableSince] = useState<number | null>(null);

  const lastStatusRef = useRef<string | null>(null);

  const read = useCallback(() => {
    const m = (window as unknown as Record<string, CalligraphyMetrics>)
      .__calligraphyMetrics;
    setMetrics(m ?? null);
    setLastUpdated(Date.now());
  }, []);

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

  // Track when the status last changed; reset stability + visibility on change.
  useEffect(() => {
    if (lastStatusRef.current !== status.label) {
      lastStatusRef.current = status.label;
      setStableSince(Date.now());
      setHidden(false);
    }
  }, [status.label]);

  // Auto-hide after STABILITY_HIDE_MS of unchanged status.
  useEffect(() => {
    if (!autoHide || hidden || stableSince == null) return;
    const elapsed = Date.now() - stableSince;
    const remaining = Math.max(0, STABILITY_HIDE_MS - elapsed);
    const id = window.setTimeout(() => setHidden(true), remaining);
    return () => window.clearTimeout(id);
  }, [autoHide, hidden, stableSince]);

  if (!import.meta.env.DEV) return null;

  if (hidden) {
    return (
      <button
        type="button"
        onClick={() => {
          setHidden(false);
          setStableSince(Date.now());
        }}
        aria-label="Show metrics debug overlay"
        title="Show metrics debug overlay"
        className="fixed bottom-3 right-3 z-50 flex h-3 w-3 items-center justify-center rounded-full border border-border bg-background/80 shadow-sm backdrop-blur"
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${status.color}`}
          aria-hidden="true"
        />
      </button>
    );
  }


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
          ⟳
        </button>
        <button
          type="button"
          onClick={() => setAutoHide((a) => !a)}
          className={`rounded px-1 hover:bg-accent hover:text-accent-foreground ${
            autoHide ? "text-foreground" : "text-muted-foreground"
          }`}
          aria-pressed={autoHide}
          aria-label={
            autoHide
              ? "Disable auto-hide after stable status"
              : "Enable auto-hide after 10s of stable status"
          }
          title={
            autoHide
              ? "Auto-hide: on (10s stable)"
              : "Auto-hide: off"
          }
        >
          {autoHide ? "👁︎" : "👁"}
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

      {!collapsed && metrics && (() => {
        const entries = Object.entries(metrics.lastPhaseMs ?? {});
        if (entries.length === 0) return null;
        const slowest = entries.reduce((a, b) => (b[1] > a[1] ? b : a));
        return (
          <div className="mt-1 border-t border-border pt-1">
            <button
              type="button"
              onClick={() => setPhasesOpen((o) => !o)}
              className="flex w-full items-center justify-between gap-1.5 text-muted-foreground hover:text-foreground"
              aria-expanded={phasesOpen}
              aria-label="Toggle phase breakdown"
            >
              <span className="font-semibold">phases</span>
              <span className="text-foreground">
                {phasesOpen ? "▾" : "▸"} slowest:{" "}
                <span className="text-amber-500">
                  {slowest[0]} {Math.round(slowest[1])}ms
                </span>
              </span>
            </button>
            {phasesOpen && (
              <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-0.5">
                {entries
                  .slice()
                  .sort((a, b) => b[1] - a[1])
                  .map(([name, ms]) => {
                    const isSlowest = name === slowest[0];
                    return (
                      <span
                        key={name}
                        className="contents"
                        aria-label={isSlowest ? "slowest phase" : undefined}
                      >
                        <span
                          className={
                            isSlowest
                              ? "text-amber-500"
                              : "text-muted-foreground"
                          }
                        >
                          {isSlowest ? "★ " : ""}
                          {name}
                        </span>
                        <span
                          className={
                            isSlowest
                              ? "text-right text-amber-500"
                              : "text-right text-foreground"
                          }
                        >
                          {Math.round(ms)}ms
                        </span>
                      </span>
                    );
                  })}
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
};

export default MetricsDebugOverlay;
