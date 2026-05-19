import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { createRef } from "react";
import CalligraphyBackground from "../CalligraphyBackground";

type IOCallback = (entries: Array<{ isIntersecting: boolean; target: Element }>) => void;

interface MockIO {
  observe: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
  unobserve: ReturnType<typeof vi.fn>;
  takeRecords: ReturnType<typeof vi.fn>;
  trigger: (isIntersecting: boolean) => void;
}

const installIntersectionObserver = (): { instances: MockIO[] } => {
  const instances: MockIO[] = [];
  class FakeIO {
    constructor(private cb: IOCallback) {
      const inst: MockIO = {
        observe: vi.fn(),
        disconnect: vi.fn(),
        unobserve: vi.fn(),
        takeRecords: vi.fn(() => []),
        trigger: (isIntersecting: boolean) => {
          const target = (inst.observe.mock.calls[0]?.[0] as Element) ?? document.body;
          cb([{ isIntersecting, target }]);
        },
      };
      instances.push(inst);
      Object.assign(this, inst);
    }
  }
  (window as any).IntersectionObserver = FakeIO;
  return { instances };
};

const removeIntersectionObserver = () => {
  delete (window as any).IntersectionObserver;
};

const resetMetrics = () => {
  delete (window as any).__calligraphyMetrics;
};

beforeEach(() => {
  localStorage.clear();
  resetMetrics();
  document.documentElement.style.removeProperty("--calligraphy-bg");
  vi.spyOn(console, "debug").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  removeIntersectionObserver();
  vi.restoreAllMocks();
});

describe("CalligraphyBackground — cached path", () => {
  it("applies cached background synchronously and skips observer setup", () => {
    localStorage.setItem("calligraphy-bg", "data:image/png;base64,AAA");
    const { instances } = installIntersectionObserver();

    render(<CalligraphyBackground />);

    expect(
      document.documentElement.style.getPropertyValue("--calligraphy-bg")
    ).toBe("url(data:image/png;base64,AAA)");
    expect(instances.length).toBe(0);
    expect((window as any).__calligraphyMetrics.cachedHit).toBe(1);
    expect((window as any).__calligraphyMetrics.generated).toBe(0);
  });
});

describe("CalligraphyBackground — IntersectionObserver gating", () => {
  it("observes the heroRef element and does not schedule until it intersects", () => {
    const { instances } = installIntersectionObserver();
    const heroRef = createRef<HTMLElement>();

    // Pre-mount the hero so the ref is populated.
    const heroEl = document.createElement("section");
    document.body.appendChild(heroEl);
    (heroRef as { current: HTMLElement | null }).current = heroEl;

    const rafSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation(() => 0 as unknown as number);

    render(<CalligraphyBackground heroRef={heroRef} />);

    expect(instances.length).toBe(1);
    expect(instances[0].observe).toHaveBeenCalledWith(heroEl);
    // No rAF scheduling happens until the hero intersects.
    expect(rafSpy).not.toHaveBeenCalled();

    instances[0].trigger(true);

    // After intersection: observer disconnects and rAF chain begins.
    expect(instances[0].disconnect).toHaveBeenCalled();
    expect(rafSpy).toHaveBeenCalled();

    heroEl.remove();
  });

  it("does not schedule generation if hero never intersects, and records skip metric", () => {
    const { instances } = installIntersectionObserver();
    const heroRef = createRef<HTMLElement>();
    const heroEl = document.createElement("section");
    document.body.appendChild(heroEl);
    (heroRef as { current: HTMLElement | null }).current = heroEl;

    const rafSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation(() => 0 as unknown as number);

    const { unmount } = render(<CalligraphyBackground heroRef={heroRef} />);
    expect(instances.length).toBe(1);

    unmount();

    expect(instances[0].disconnect).toHaveBeenCalled();
    expect(rafSpy).not.toHaveBeenCalled();
    expect((window as any).__calligraphyMetrics.skippedNeverIntersected).toBe(1);
    expect((window as any).__calligraphyMetrics.generated).toBe(0);

    heroEl.remove();
  });
});

describe("CalligraphyBackground — fallback when IntersectionObserver is unavailable", () => {
  it("increments ioUnsupported metric and schedules without observing", () => {
    removeIntersectionObserver();
    const heroRef = createRef<HTMLElement>();
    const heroEl = document.createElement("section");
    document.body.appendChild(heroEl);
    (heroRef as { current: HTMLElement | null }).current = heroEl;

    // document.readyState is "complete" in jsdom by default → scheduleAfterPaint runs.
    const rafSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation(() => 0 as unknown as number);

    render(<CalligraphyBackground heroRef={heroRef} />);

    expect((window as any).__calligraphyMetrics.ioUnsupported).toBe(1);
    // No observer means we fall straight through to scheduleAfterPaint (rAF chain).
    expect(rafSpy).toHaveBeenCalled();

    heroEl.remove();
  });

  it("falls back when hero is missing and records heroMissing metric", () => {
    installIntersectionObserver();
    // No heroRef, no <section> in the document.
    const rafSpy = vi
      .spyOn(window, "requestAnimationFrame")
      // First call is the setupGate wrapper (no ref), subsequent are scheduling.
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0);
        return 0 as unknown as number;
      });

    render(<CalligraphyBackground />);

    expect((window as any).__calligraphyMetrics.heroMissing).toBe(1);
    expect(rafSpy).toHaveBeenCalled();
  });
});
