import { useRef } from "react";

/**
 * Hidden "trap" field plus a fill-time stamp for public forms that send email.
 * Real visitors never see or fill the trap; bots usually do. The email
 * function silently drops submissions that fill it or arrive too fast.
 */
export const useSpamGuard = () => {
  const startedAt = useRef(Date.now());
  const trapRef = useRef<HTMLInputElement>(null);

  const trap = (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
    >
      <label htmlFor="website-field">Website</label>
      <input
        ref={trapRef}
        id="website-field"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );

  const guardFields = () => ({
    website: trapRef.current?.value ?? "",
    elapsedMs: Date.now() - startedAt.current,
  });

  const reset = () => {
    startedAt.current = Date.now();
    if (trapRef.current) trapRef.current.value = "";
  };

  return { trap, guardFields, reset };
};
