import type { CountryPackId, CourseEnrollment } from "../../types";
import { createTranslator } from "../../i18n";

export const CultureRouteSummary = ({
  enrollment,
  packId
}: {
  enrollment: CourseEnrollment | undefined;
  packId: CountryPackId;
}) => {
  const tr = createTranslator(packId);
  const routeCount = enrollment?.routeSlots?.length ?? 0;

  return (
    <div className="summary-list" aria-label={tr("culture.route.summaryAriaLabel")}>
      <div className="summary-row">
        <span>{tr("culture.route.position")}</span>
        <strong>{routeCount ? `1 / ${routeCount}` : tr("culture.route.notCreated")}</strong>
      </div>
      <div className="summary-row">
        <span>{tr("culture.route.completionLabel")}</span>
        <strong>{tr("culture.route.firstComplete")}</strong>
      </div>
    </div>
  );
};
