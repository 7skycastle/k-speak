import type { AnalyticsEvent, UserState } from "../types";
import { getCountryPack } from "../data/countryPacks";
import { saveState } from "./storage";

export const trackEvent = (
  state: UserState,
  event: Omit<AnalyticsEvent, "id" | "userId" | "accountEmail" | "occurredAt">
): UserState => {
  const nextEvent: AnalyticsEvent = {
    id: `event-${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`,
    userId: state.accountEmail ?? state.anonymousId,
    accountEmail: state.accountEmail,
    countryPackId: state.onboarding?.countryPackId,
    interfaceLanguage: getCountryPack(state.onboarding?.countryPackId).interfaceLanguage,
    koreanLevel: state.onboarding?.koreanLevel,
    learningGoal: state.onboarding?.learningGoal,
    characterId: state.onboarding?.characterId,
    occurredAt: new Date().toISOString(),
    ...event
  };

  return saveState({
    ...state,
    analyticsEvents: [...state.analyticsEvents.slice(-199), nextEvent]
  });
};
