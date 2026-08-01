import { existsSync } from "node:fs";
import { delimiter, join } from "node:path";

export const localTtsProvider = {
  id: "local_tts",
  label: "Local open-source TTS",
  sourceType: "free_tts",
  licenseStatus: "open_source_license_confirmed",
  commercialUse: "allowed"
} as const;

export const findLocalTtsCommand = (pathValue = process.env.PATH ?? "") => {
  const candidates = process.platform === "win32" ? ["piper.exe", "piper"] : ["piper"];
  for (const directory of pathValue.split(delimiter)) {
    for (const command of candidates) {
      const commandPath = join(directory, command);
      if (existsSync(commandPath)) return commandPath;
    }
  }
  return undefined;
};
