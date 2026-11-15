import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { allPhysicians } from "@/lib/physicianData";

// Doctor lists show clinic contact details only. These are the only
// shared clinic inboxes allowed; any other email address fails.
const CLINIC_EMAILS = ["thyroidandhormones@gmail.com", "Drs@oakvilledr.com"];
const FILES = ["src/lib/physicianData.ts", "src/pages/PhysicianDirectory.tsx"];

describe("doctor list contact privacy", () => {
  it.each(FILES)("%s lists no personal email addresses", (file) => {
    const src = readFileSync(resolve(process.cwd(), file), "utf8");
    const found = src.match(/[\w.+-]+@[\w-]+\.[\w.-]+/g) ?? [];
    expect(found.filter((e) => !CLINIC_EMAILS.includes(e))).toEqual([]);
  });

  it("keeps Dr. Raed Hawa listed, without his personal email", () => {
    const hawa = allPhysicians.find((p) => p.firstName === "Raed" && p.lastName === "Hawa");
    expect(hawa).toBeDefined();
    expect(hawa?.email ?? "").toBe("");
    expect(hawa?.clinicName).toBe("Toronto Western Hospital");
  });
});
