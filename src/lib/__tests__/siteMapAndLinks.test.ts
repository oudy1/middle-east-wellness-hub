import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { MENTOR_FORM_URL, MENTEE_FORM_URL } from "../programLinks";

const app = readFileSync("src/App.tsx", "utf8");
const sitemap = readFileSync("public/sitemap.xml", "utf8");

describe("sitemap lists every public page", () => {
  const routes = [...app.matchAll(/path="([^"]+)" element=\{<(\w+)/g)]
    .filter(([, p, el]) => el !== "Navigate" && !p.includes(":") && p !== "*" && !p.startsWith("/admin") && p !== "/reset-password")
    .map(([, p]) => p);
  for (const r of routes) it(r, () => expect(sitemap).toContain(`<loc>https://www.projectshams.com${r}</loc>`));
});

describe("mentorship sign-up links", () => {
  it("are the approved forms", () => {
    expect(MENTOR_FORM_URL).toBe("https://forms.gle/dCyMfPQH8DRSxsxb8");
    expect(MENTEE_FORM_URL).toBe("https://forms.gle/3Xw71e2Y3Hhqn7gF9");
  });
  it("are not copied into other files", () => {
    for (const f of ["src/pages/Programs.tsx", "src/pages/Mentorship.tsx", "src/components/MentorshipHighlight.tsx"])
      expect(readFileSync(f, "utf8")).not.toContain("forms.gle/");
  });
});
