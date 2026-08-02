import type { CountryPackId } from "../types";
import { uiCatalog, localized } from "./ui";

export { localized };

export type UiKey = keyof typeof uiCatalog;

const FALLBACK_PACK_ID: CountryPackId = "us-en";

const interpolate = (value: string, params?: Record<string, string | number>): string => {
  if (!params) {
    return value;
  }

  return value.replace(/\{(\w+)\}/g, (match, token: string) => {
    if (!(token in params)) {
      return match;
    }

    return String(params[token]);
  });
};

export const resolveLocalized = (entry: Record<CountryPackId, string>, packId: CountryPackId): string => {
  const value = entry[packId];
  return value ? value : entry[FALLBACK_PACK_ID];
};

export const t = (key: UiKey, packId: CountryPackId, params?: Record<string, string | number>): string => {
  const resolved = resolveLocalized(uiCatalog[key], packId);
  return interpolate(resolved, params);
};

export const createTranslator = (packId: CountryPackId) => {
  return (key: UiKey, params?: Record<string, string | number>): string => t(key, packId, params);
};
