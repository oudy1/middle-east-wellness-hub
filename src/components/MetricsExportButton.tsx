import { useState } from "react";

/**
 * Tiny dev-only floating button that exports window.__calligraphyMetrics
 * as a downloadable JSON file. Hidden in production builds.
 */
const MetricsExportButton = () => {
  const [status, setStatus] = useState<"idle" | "ok" | "empty">("idle");

  if (!import.meta.env.DEV) return null;

  const handleExport = () => {
    const metrics = (window as unknown as Record<string, unknown>).__calligraphyMetrics;
    if (!metrics) {
      setStatus("empty");
      setTimeout(() => setStatus("idle"), 1500);
      return;
    }

    const payload = {
      exportedAt: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      calligraphyMetrics: metrics,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shams-metrics-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    setStatus("ok");
    setTimeout(() => setStatus("idle"), 1500);
  };

  const label =
    status === "ok"
      ? "Saved ✓"
      : status === "empty"
      ? "No metrics yet"
      : "Download metrics";

  return (
    <button
      type="button"
      onClick={handleExport}
      aria-label="Download performance metrics as JSON"
      className="fixed bottom-3 left-3 z-50 rounded-md border border-border bg-background/80 px-2 py-1 text-[11px] font-medium text-muted-foreground shadow-sm backdrop-blur hover:bg-muted hover:text-foreground transition"
    >
      {label}
    </button>
  );
};

export default MetricsExportButton;
