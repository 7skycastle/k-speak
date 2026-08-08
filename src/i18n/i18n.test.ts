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

  it("applies rich Southeast Asia UI overrides before falling back to the catalog", () => {
    expect(t("nav.home", "kh-km")).toBe("ទំព័រដើម");
    expect(t("nav.settings", "mm-my")).toBe("ဆက်တင်များ");
    expect(t("onboarding.step0.title", "th-th")).toBe("คุณต้องการให้เราแนะนำเป็นภาษาอะไร");
    expect(t("home.review.emptyTitle", "my-ms")).toBe("Belum ada item ulang kaji");
    expect(t("settings.sync.button", "id-id")).toBe("Cek koneksi");
    expect(t("audio.status.unavailable", "kh-km")).toContain("សំឡេងមិនអាចប្រើបាន");
    expect(t("recorder.start", "th-th")).toBe("อัดเสียงของฉัน");
    expect(t("review.note.hard", "my-ms")).toContain("sukar");
    expect(t("lesson.phrase.save", "id-id")).toBe("Simpan kalimat");
    expect(t("roleplay.partner", "th-th")).toBe("คู่สนทนา");
  });

  it("covers the remaining Southeast Asia override keys used on home and settings", () => {
    expect(t("home.metric.todayLesson", "id-id")).toBe("Pelajaran hari ini");
    expect(t("home.lesson.meta", "my-ms", { percent: 80, dailyGoal: 10 })).toBe("80% siap · sasaran 10 minit");
    expect(t("time.hoursLater", "th-th", { hours: 3 })).toBe("\u0e2d\u0e35\u0e01 3 \u0e0a\u0e21.");
    expect(t("guide.panelTitle", "id-id", { nativeLabel: "Bahasa Indonesia" })).toBe("Tips belajar Bahasa Indonesia");
    expect(t("error.syncFailed", "my-ms")).toBe("Segerak gagal.");
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

  it("resolves course selector keys for every country pack", () => {
    const courseKeys: UiKey[] = [
      "course.selector.button",
      "course.selector.title",
      "course.foundation.title",
      "course.travel.title",
      "course.kFood.title",
      "course.kCulture.title",
      "course.epsTopik.title",
      "course.status.notStarted",
      "course.status.inProgress",
      "course.status.completed",
      "course.status.preparing",
      "course.action.start",
      "course.action.resume",
      "course.action.switch",
      "culture.setup.kicker",
      "culture.setup.title",
      "culture.setup.notice",
      "culture.setup.primaryLabel",
      "culture.setup.samplerLabel",
      "culture.setup.validation",
      "culture.setup.locked",
      "culture.setup.createRoute",
      "culture.setup.changeRoute",
      "culture.pack.kPop",
      "culture.pack.kDrama",
      "culture.pack.kBeauty",
      "culture.pack.kWebtoon",
      "culture.route.summaryAriaLabel",
      "culture.route.position",
      "culture.route.notCreated",
      "culture.route.completionLabel",
      "culture.route.firstComplete",
      "travel.mission.title",
      "travel.mission.firstSentence",
      "travel.mission.shortResponse",
      "travel.mission.rescueExpression",
      "travel.mission.success",
      "travel.mission.practiceMore",
      "kFood.mission.title",
      "kFood.mission.chooseFood",
      "kFood.mission.shortOrder",
      "kFood.mission.resolveProblem",
      "kFood.mission.success",
      "kFood.mission.practiceMore"
    ];

    for (const pack of countryPacks) {
      for (const key of courseKeys) {
        expect(t(key, pack.id)).toBeTruthy();
        expect(t(key, pack.id)).not.toBe(key);
        expect(t(key, pack.id)).not.toContain("%");
      }
    }
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
