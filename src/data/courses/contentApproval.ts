import type { CourseExposure, CourseId, CountryPackId } from "../../types";
import { courseRegistry } from "./courseRegistry";

export type CourseLocaleApprovalStatus = "draft" | "native-review" | "approved";

export interface CourseLocaleApproval {
  courseId: CourseId;
  countryPackId: CountryPackId;
  contentVersion: string;
  status: CourseLocaleApprovalStatus;
  reviewerRole: "internal" | "native-reviewer";
  reviewedAt?: string;
}

const countryPackIds: CountryPackId[] = [
  "us-en",
  "jp-ja",
  "cn-zh",
  "vn-vi",
  "mx-es",
  "id-id",
  "kh-km",
  "mm-my",
  "th-th",
  "my-ms"
];

export const courseLocaleApprovals: CourseLocaleApproval[] = [
  ...countryPackIds.map((countryPackId) => ({
    courseId: "foundation" as const,
    countryPackId,
    contentVersion: "foundation-v1",
    status: "approved" as const,
    reviewerRole: "internal" as const,
    reviewedAt: "2026-08-08T00:00:00.000Z"
  })),
  ...countryPackIds.map((countryPackId) => ({
    courseId: "travel" as const,
    countryPackId,
    contentVersion: "travel-v1",
    status: "approved" as const,
    reviewerRole: "internal" as const,
    reviewedAt: "2026-08-08T00:00:00.000Z"
  })),
  {
    courseId: "k-food" as const,
    countryPackId: "us-en" as const,
    contentVersion: "k-food-v1",
    status: "approved" as const,
    reviewerRole: "internal" as const,
    reviewedAt: "2026-08-08T00:00:00.000Z"
  },
  ...countryPackIds.flatMap((countryPackId) => [
    {
      courseId: "k-culture" as const,
      countryPackId,
      contentVersion: "k-culture-v1",
      status: "draft" as const,
      reviewerRole: "internal" as const
    },
    {
      courseId: "eps-topik" as const,
      countryPackId,
      contentVersion: "eps-topik-v1",
      status: "draft" as const,
      reviewerRole: "internal" as const
    }
  ])
];

export const isCourseLocaleApproved = (courseId: CourseId, countryPackId: CountryPackId) =>
  courseLocaleApprovals.some(
    (approval) =>
      approval.courseId === courseId &&
      approval.countryPackId === countryPackId &&
      approval.status === "approved"
  );

export const getCourseExposureForLocale = (courseId: CourseId, countryPackId: CountryPackId): CourseExposure => {
  if (courseId === "foundation") return "visible";
  if (courseRegistry[courseId].exposure === "hidden") return "hidden";
  return isCourseLocaleApproved(courseId, countryPackId) ? "visible" : "preparing";
};
