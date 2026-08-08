import { describe, expect, it } from "vitest";
import { countryPacks } from "../countryPacks";
import { getApprovedCulturePacks, getCourseExposureForLocale, isCourseLocaleApproved } from "./contentApproval";

describe("course locale approval", () => {
  it("keeps unapproved courses gated while allowing approved Travel and K-Culture locales", () => {
    expect(isCourseLocaleApproved("travel", "us-en")).toBe(true);
    expect(getCourseExposureForLocale("travel", "us-en")).toBe("visible");
    expect(getCourseExposureForLocale("k-food", "us-en")).toBe("visible");
    expect(getCourseExposureForLocale("k-food", "vn-vi")).toBe("preparing");
    expect(getCourseExposureForLocale("k-culture", "us-en")).toBe("visible");
    expect(getCourseExposureForLocale("k-culture", "vn-vi")).toBe("preparing");
    expect(getCourseExposureForLocale("eps-topik", "us-en")).toBe("hidden");
  });

  it("requires two different approved culture packs before exposing K-Culture", () => {
    expect(getApprovedCulturePacks("us-en").sort()).toEqual(["k-drama", "k-pop"]);
    expect(getApprovedCulturePacks("vn-vi")).toEqual([]);
  });

  it("has an explicit approval entry for every country pack and course", () => {
    for (const pack of countryPacks) {
      expect(getCourseExposureForLocale("foundation", pack.id)).toBe("visible");
      expect(["visible", "preparing"]).toContain(getCourseExposureForLocale("travel", pack.id));
      expect(["visible", "preparing"]).toContain(getCourseExposureForLocale("k-food", pack.id));
      expect(["visible", "preparing"]).toContain(getCourseExposureForLocale("k-culture", pack.id));
      expect(getCourseExposureForLocale("eps-topik", pack.id)).toBe("hidden");
    }
  });
});
