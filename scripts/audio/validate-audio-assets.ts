import { validateAudioConfiguration } from "./audio-rules";

const result = validateAudioConfiguration();

for (const warning of result.warnings) {
  console.warn(`WARN ${warning}`);
}

if (result.errors.length > 0) {
  for (const error of result.errors) {
    console.error(`ERROR ${error}`);
  }
  process.exit(1);
}

console.log(`Audio validation passed: ${result.slots.length} lesson/character slots checked.`);
