export const manualImportProvider = {
  id: "manual_import",
  label: "Manual static audio import",
  sourceType: "manual_import",
  licenseStatus: "manual_import_to_be_confirmed",
  commercialUse: "unknown"
} as const;

export const isSupportedManualAudioPath = (url: string) =>
  /^\/audio\/day-\d+\/(haneul|jun|mina|taeho)\/(natural|slow|chunk-\d+)\.(mp3|wav|ogg)$/.test(url);
