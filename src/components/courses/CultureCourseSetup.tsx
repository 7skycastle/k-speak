import { useState } from "react";
import { isCultureRouteLocked } from "../../engine/culturePathEngine";
import { createTranslator } from "../../i18n";
import type { CountryPackId, CourseEnrollment, CulturePackId, CultureRouteSelection, UserState } from "../../types";
import { CultureRouteSummary } from "./CultureRouteSummary";

const culturePackIds: CulturePackId[] = ["k-pop", "k-drama", "k-beauty", "k-webtoon"];

const packLabelKey = {
  "k-pop": "culture.pack.kPop",
  "k-drama": "culture.pack.kDrama",
  "k-beauty": "culture.pack.kBeauty",
  "k-webtoon": "culture.pack.kWebtoon"
} as const;

export const CultureCourseSetup = ({
  enrollment,
  progress,
  onSave,
  packId
}: {
  enrollment: CourseEnrollment | undefined;
  progress: UserState["lessonProgress"];
  onSave: (selection: CultureRouteSelection) => void;
  packId: CountryPackId;
}) => {
  const tr = createTranslator(packId);
  const locked = isCultureRouteLocked(enrollment, progress);
  const [primaryPackId, setPrimaryPackId] = useState<CulturePackId>("k-pop");
  const [samplerPackId, setSamplerPackId] = useState<CulturePackId>("k-drama");
  const canSave = primaryPackId !== samplerPackId && !locked;

  return (
    <section className="flow" aria-label={tr("culture.setup.title")}>
      <section className="panel">
        <span className="kicker">{tr("culture.setup.kicker")}</span>
        <h2>{tr("culture.setup.title")}</h2>
        <p className="culture-note">{tr("culture.setup.notice")}</p>

        <div className="summary-list">
          <fieldset className="field">
            <legend>{tr("culture.setup.primaryLabel")}</legend>
            {culturePackIds.map((id) => (
              <label key={id} className="row-choice">
                <input
                  type="radio"
                  name="culture-primary"
                  checked={primaryPackId === id}
                  disabled={locked || samplerPackId === id}
                  onChange={() => setPrimaryPackId(id)}
                  aria-label={`${tr(packLabelKey[id])} primary`}
                />
                {tr(packLabelKey[id])}
              </label>
            ))}
          </fieldset>

          <fieldset className="field">
            <legend>{tr("culture.setup.samplerLabel")}</legend>
            {culturePackIds.map((id) => (
              <label key={id} className="row-choice">
                <input
                  type="radio"
                  name="culture-sampler"
                  checked={samplerPackId === id}
                  disabled={locked || primaryPackId === id}
                  onChange={() => setSamplerPackId(id)}
                  aria-label={`${tr(packLabelKey[id])} sampler`}
                />
                {tr(packLabelKey[id])}
              </label>
            ))}
          </fieldset>
        </div>

        {!canSave && !locked && <p className="audio-status">{tr("culture.setup.validation")}</p>}
        {locked && <p className="audio-status">{tr("culture.setup.locked")}</p>}
        <CultureRouteSummary enrollment={enrollment} packId={packId} />
      </section>

      <div className="sticky-actions">
        <button
          className="primary-action"
          disabled={!canSave}
          onClick={() => onSave({ primaryPackId, samplerPackId })}
        >
          {enrollment?.routeSlots?.length ? tr("culture.setup.changeRoute") : tr("culture.setup.createRoute")}
        </button>
      </div>
    </section>
  );
};
