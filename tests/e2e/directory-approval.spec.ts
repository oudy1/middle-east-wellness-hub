import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

// The public API must never return or accept unreviewed doctor listings.
const env = Object.fromEntries(
  readFileSync(".env", "utf8")
    .split("\n")
    .map((l) => l.match(/^(\w+)="?([^"]*)"?$/))
    .filter(Boolean)
    .map((m) => [m![1], m![2]]),
);
const API = `${env.VITE_SUPABASE_URL}/rest/v1`;
const headers = {
  apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY,
  Authorization: `Bearer ${env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=minimal",
};

test.describe("doctor listing approval (public API)", () => {
  test("visitors only receive published listings", async ({ request }) => {
    const res = await request.get(`${API}/healthcare_workers?select=status`, { headers });
    expect(res.ok()).toBe(true);
    const rows: { status: string }[] = await res.json();
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.every((r) => r.status === "published")).toBe(true);
    const hidden = await request.get(`${API}/healthcare_workers?select=id&status=neq.published`, { headers });
    expect(await hidden.json()).toEqual([]);
  });

  test("visitors cannot read private applicant details or history", async ({ request }) => {
    for (const table of ["healthcare_worker_reviews", "healthcare_worker_history"]) {
      const res = await request.get(`${API}/${table}?select=*`, { headers });
      const body = res.ok() ? await res.json() : [];
      expect(body).toEqual([]);
    }
    const res = await request.get(`${API}/healthcare_workers?select=submitted_by_email&submitted_by_email=not.is.null`, { headers });
    expect(await res.json()).toEqual([]);
  });

  test("visitors cannot publish or verify their own listing", async ({ request }) => {
    const base = { full_name: "E2E Blocked Listing", city: "Toronto", province: "ON", provider_type: "Family Physician", source: "self-submitted" };
    for (const extra of [{ status: "published" }, { status: "approved" }, { verified: true }, { last_verified_at: new Date().toISOString() }]) {
      const res = await request.post(`${API}/healthcare_workers`, { headers, data: { ...base, ...extra } });
      expect(res.status(), JSON.stringify(extra)).toBeGreaterThanOrEqual(400);
    }
  });

  test("visitors cannot change an existing listing", async ({ request }) => {
    const list = await (await request.get(`${API}/healthcare_workers?select=id,full_name&limit=1`, { headers })).json();
    const res = await request.patch(`${API}/healthcare_workers?id=eq.${list[0].id}`, {
      headers: { ...headers, Prefer: "return=representation" },
      data: { status: "archived" },
    });
    const body = res.ok() ? await res.json() : [];
    expect(body).toEqual([]);
    const after = await (await request.get(`${API}/healthcare_workers?select=status&id=eq.${list[0].id}`, { headers })).json();
    expect(after[0].status).toBe("published");
  });
});

test("directory listings show the availability note and a report link", async ({ page }) => {
  await page.goto("/directory");
  await expect(page.getByTestId("directory-disclaimer")).toContainText("does not mean a provider is available");
  const report = page.getByRole("link", { name: /report incorrect information for/i }).first();
  await expect(report).toHaveAttribute("href", /^mailto:infoprojectshams@gmail\.com\?subject=Directory%20correction/);
});
