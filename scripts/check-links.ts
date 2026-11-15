// Lists every outside link in src/ and content/ and reports ones that don't load.
// Run: bun scripts/check-links.ts
import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";
const files: string[] = [];
const walk = (d: string) => readdirSync(d).forEach((n) => { const p = join(d, n); statSync(p).isDirectory() ? (n !== "__tests__" && walk(p)) : /\.(tsx?|json)$/.test(n) && files.push(p); });
["src", "content"].forEach(walk);
const urls = new Set<string>();
for (const f of files) for (const m of readFileSync(f, "utf8").matchAll(/https:\/\/[^\s"'`)<>\\]+/g)) urls.add(m[0].replace(/[.,;]+$/, ""));
const skip = /\{|spreadsheets\/d\/$|supabase\.co|localhost|\$\{|fonts\.g|schema\.org|w3\.org/;
const list = [...urls].filter((u) => !skip.test(u));
let bad = 0;
await Promise.all(list.map(async (u) => {
  try {
    const r = await fetch(u, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(15000), headers: { "user-agent": "Mozilla/5.0 SHAMS link check" } });
    if (r.status >= 400 && ![401, 403, 429, 999].includes(r.status)) { bad++; console.log(`${r.status}  ${u}`); }
  } catch (e) { bad++; console.log(`ERR  ${u}`); }
}));
console.log(`${list.length} links checked, ${bad} problems`);
