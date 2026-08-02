import { describe, expect, it } from "vitest";
import { countryPacks } from "../data/countryPacks";
import { createTranslator, localized, resolveLocalized, t } from "./index";
import { uiCatalog } from "./ui";
import type { UiKey } from "./index";

const catalogKeys = Object.keys(uiCatalog) as UiKey[];

describe("i18n core", () => {
  it("has a non-empty value for every catalog key across all country packs", () => {
    for (const key of catalogKeys) {
      for (const pack of countryPacks) {
        expect(uiCatalog[key][pack.id]).toBeTruthy();
      }
    }
  });

  it("returns the localized value for the requested pack instead of the English one", () => {
    const japanese = t("nav.home", "jp-ja");
    expect(japanese).toBe(uiCatalog["nav.home"]["jp-ja"]);
    expect(japanese).not.toBe(uiCatalog["nav.home"]["us-en"]);
  });

  it("interpolates params into the resolved string", () => {
    const result = t("lesson.summary.body", "us-en", { phrase: "안녕하세요" });
    expect(result).toContain("안녕하세요");
    expect(result).not.toContain("{");
    expect(result).not.toContain("}");
  });

  it("leaves an unknown placeholder intact when no matching param is supplied", () => {
    const result = t("lesson.summary.body", "us-en", { other: "value" });
    expect(result).toContain("{phrase}");
  });

  it("falls back to the us-en value when the resolved string is empty", () => {
    const entry = localized("English fallback", "", "", "", "");
    expect(resolveLocalized(entry, "jp-ja")).toBe("English fallback");
  });

  it("produces the same output from createTranslator as calling t directly", () => {
    const translate = createTranslator("vn-vi");
    expect(translate("nav.home")).toBe(t("nav.home", "vn-vi"));
  });

  it("does not leak Hangul into any UI catalog value", () => {
    const hangulPattern = /[가-힣]/;
    for (const key of catalogKeys) {
      for (const pack of countryPacks) {
        expect(uiCatalog[key][pack.id]).not.toMatch(hangulPattern);
      }
    }
  });
});
