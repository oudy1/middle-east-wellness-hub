import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import i18n, { dictionaries, MISSING_TRANSLATION_AR } from "@/i18n";

const en = dictionaries.en;
const ar = dictionaries.ar;
const PLURAL_SUFFIX = /_(zero|one|two|few|many|other)$/;
const ARABIC_FORMS = ["zero", "one", "two", "few", "many", "other"];

/** Every literal key passed to t("...") anywhere in src. */
function keysUsedInSource(): Set<string> {
  const used = new Set<string>();
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) {
        if (name !== "__tests__") walk(p);
      } else if (/\.(tsx?|jsx?)$/.test(name)) {
        const src = readFileSync(p, "utf8");
        for (const m of src.matchAll(/\bt\(\s*["'`]([a-zA-Z][\w.-]*)["'`]/g)) used.add(m[1]);
      }
    }
  };
  walk(join(process.cwd(), "src"));
  return used;
}

describe("translation completeness", () => {
  it("every English text has an Arabic translation", () => {
    const missing = Object.keys(en).filter((k) => !ar[k]?.trim());
    expect(missing, `Missing Arabic: ${missing.join(", ")}`).toEqual([]);
  });

  it("no Arabic-only keys that English lacks (except Arabic-only plural forms)", () => {
    const extra = Object.keys(ar).filter((k) => !(k in en) && !PLURAL_SUFFIX.test(k));
    expect(extra).toEqual([]);
  });

  it("every key used in the code exists in English", () => {
    const missing = [...keysUsedInSource()].filter(
      (k) => !(k in en) && !(`${k}_other` in en)
    );
    expect(missing, `Unknown keys: ${missing.join(", ")}`).toEqual([]);
  });

  it("every counted text has all six Arabic plural forms", () => {
    const bases = new Set(Object.keys(en).filter((k) => PLURAL_SUFFIX.test(k)).map((k) => k.replace(PLURAL_SUFFIX, "")));
    for (const base of bases) {
      for (const form of ARABIC_FORMS) expect(ar[`${base}_${form}`], `${base}_${form}`).toBeTruthy();
      expect(en[`${base}_one`], `${base}_one`).toBeTruthy();
      expect(en[`${base}_other`], `${base}_other`).toBeTruthy();
    }
  });

  it("reports how much of Kurdish, Persian and Turkish is still untranslated", () => {
    const total = Object.keys(en).length;
    for (const lang of ["ku", "fa", "tr"] as const) {
      const missing = Object.keys(en).filter((k) => !dictionaries[lang][k]).length;
      // eslint-disable-next-line no-console
      console.info(`[i18n] ${lang}: ${missing} of ${total} texts not yet translated`);
      expect(missing).toBeLessThanOrEqual(total);
    }
  });
});

describe("plural forms", () => {
  const tr = (key: string, count: number, lng: string) => i18n.t(key, { count, lng }) as string;
  it("English uses singular for 1 and plural otherwise", () => {
    expect(tr("common.resultCount", 1, "en")).toBe("1 result");
    expect(tr("common.resultCount", 0, "en")).toBe("0 results");
    expect(tr("common.resultCount", 5, "en")).toBe("5 results");
  });
  it("Arabic uses its six plural forms", () => {
    expect(tr("common.resultCount", 0, "ar")).toBe("لا توجد نتائج");
    expect(tr("common.resultCount", 1, "ar")).toBe("نتيجة واحدة");
    expect(tr("common.resultCount", 2, "ar")).toBe("نتيجتان");
    expect(tr("common.resultCount", 5, "ar")).toBe("5 نتائج");
    expect(tr("common.resultCount", 11, "ar")).toBe("11 نتيجة");
    expect(tr("physicians.count", 3, "ar")).toBe("3 أطباء");
    expect(tr("physicians.count", 2, "ar")).toBe("طبيبان");
  });
});

describe("missing translation fallbacks (unchanged rules)", () => {
  it("Arabic, Kurdish and Persian show the translation notice instead of English", () => {
    expect(i18n.t("test.key.that.does.not.exist", { lng: "ar" })).toBe(MISSING_TRANSLATION_AR);
    const kuMissing = Object.keys(en).find((k) => !dictionaries.ku[k] && !PLURAL_SUFFIX.test(k))!;
    expect(i18n.t(kuMissing, { lng: "ku" })).toBe(MISSING_TRANSLATION_AR);
  });
  it("Turkish falls back to English", () => {
    const trMissing = Object.keys(en).find((k) => !dictionaries.tr[k] && !PLURAL_SUFFIX.test(k))!;
    expect(i18n.t(trMissing, { lng: "tr" })).toBe(en[trMissing]);
  });
  it("English shows the key name only when the text truly does not exist", () => {
    expect(i18n.t("nav.home", { lng: "en" })).toBe(en["nav.home"]);
    expect(i18n.t("test.key.that.does.not.exist", { lng: "en" })).toBe("test.key.that.does.not.exist");
  });
});
