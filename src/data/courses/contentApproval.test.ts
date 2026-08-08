import { describe, expect, it } from "vitest";
import { countryPacks } from "../countryPacks";
import { getCourseExposureForLocale, isCourseLocaleApproved } from "./contentApproval";

describe("course locale approval", () => {
  it("keeps future courses hidden while allowing approved Travel locales", () => {
    expect(isCourseLocaleApproved("travel", "us-en")).toBe(true);
    expect(getCourseExposureForLocale("travel", "us-en")).toBe("visible");
    expect(getCourseExposureForLocale("k-culture", "us-en")).toBe("hidden");
    expect(getCourseExposureForLocale("eps-topik", "us-en")).toBe("hidden");
  });

  it("has an explicit approval entry for every country pack and course", () => {
    for (const pack of countryPacks) {
      expect(getCourseExposureForLocale("foundation", pack.id)).toBe("visible");
      expect(["visible", "preparing"]).toContain(getCourseExposureForLocale("travel", pack.id));
      expect(getCourseExposureForLocale("k-culture", pack.id)).toBe("hidden");
      expect(getCourseExposureForLocale("eps-topik", pack.id)).toBe("hidden");
    }
  });
});
