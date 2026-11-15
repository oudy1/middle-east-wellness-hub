// Asks the live SHAMS chatbot the newcomer-workshop questions and checks each answer
// uses the shared event record (date, place, current form) and never the old form.
// Run: bun scripts/check-workshop-chat.ts
import { searchKnowledge } from "../src/lib/knowledgeIndex";
import { NEWCOMER_WORKSHOP } from "../src/lib/newcomerWorkshop";

const url = `${process.env.VITE_SUPABASE_URL}/functions/v1/shams-chat`;
const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY!;
const questions: [string, "en" | "ar", RegExp[]][] = [
  ["Do you have an upcoming newcomer workshop?", "en", [/November 19/i, /Scadding/i]],
  ["How can I learn about OHIP?", "en", [/OHIP/]],
  ["Where is the November 19 workshop?", "en", [/Scadding/i, /Dundas/i]],
  ["Is the newcomer event free?", "en", [/free/i]],
  // Asked alone this is ambiguous; the bot may ask which sign-up is meant as long as it names the workshop.
  ["How do I register?", "en", [/ipEVd8Np1tDy1GVD7|workshop/i]],
  ["هل لديكم ورشة للوافدين الجدد؟", "ar", [/19/, /سكادينغ/]],
  ["كيف أسجل في ورشة الرعاية الصحية؟", "ar", [/ipEVd8Np1tDy1GVD7/]],
];

async function ask(q: string, language: "en" | "ar") {
  const context = searchKnowledge(q, language, 5).map((r) => ({
    title: language === "ar" ? r.item.title_ar : r.item.title_en,
    description: language === "ar" ? r.item.description_ar : r.item.description_en,
    category: r.item.category,
    url: r.item.url,
  }));
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}`, apikey: key, Origin: "https://www.projectshams.com" },
    body: JSON.stringify({ messages: [{ role: "user", content: q }], language, context }),
  });
  const raw = await res.text();
  let out = "";
  for (const line of raw.split("\n")) {
    if (!line.startsWith("data: ") || line.includes("[DONE]")) continue;
    try { out += JSON.parse(line.slice(6)).choices?.[0]?.delta?.content ?? ""; } catch { /* partial */ }
  }
  return out;
}

let failed = 0;
for (const [q, lang, must] of questions) {
  const a = await ask(q, lang);
  const problems = must.filter((r) => !r.test(a)).map((r) => `missing ${r}`);
  if (/cfQVzbssWp2fTJdo7|J6JsyRLc44chnPF96/.test(a)) problems.push("uses an old form link");
  if (/—/.test(a)) problems.push("em dash");
  if (problems.length) failed++;
  console.log(`${problems.length ? "FAIL" : "PASS"} ${q}\n  ${a.replace(/\s+/g, " ").slice(0, 500)}${problems.length ? `\n  -> ${problems.join(", ")}` : ""}\n`);
}
console.log(failed ? `${failed} failed` : `all ${questions.length} passed`);
if (NEWCOMER_WORKSHOP.registerUrl !== "https://forms.gle/ipEVd8Np1tDy1GVD7") process.exit(1);
process.exit(failed ? 1 : 0);
