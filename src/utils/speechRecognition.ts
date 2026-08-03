export interface RecognitionResult {
  text: string;
  confidence: number;
}

// Lightweight score: proportion of recognized characters that match target
export const scoreMatch = (recognized: string, target: string): number => {
  const r = recognized.trim().replace(/\s+/g, "");
  const t = target.trim().replace(/\s+/g, "");
  if (!r || !t) return 0;
  if (r === t) return 1;
  let matches = 0;
  const minLen = Math.min(r.length, t.length);
  for (let i = 0; i < minLen; i++) {
    if (r[i] === t[i]) matches++;
  }
  return matches / Math.max(r.length, t.length);
};

interface SrInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string; confidence: number }>> }) => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

type SrCtor = new () => SrInstance;

const getRecognitionCtor = (): SrCtor | null => {
  if (typeof window === "undefined") return null;
  const w = window as unknown as Record<string, unknown>;
  return (w["SpeechRecognition"] ?? w["webkitSpeechRecognition"] ?? null) as SrCtor | null;
};

export const isRecognitionSupported = (): boolean =>
  getRecognitionCtor() !== null;

// Starts a single Korean recognition session.
// Returns a stop() function. Calls onResult once with the best hypothesis,
// onError if recognition fails, and onEnd when the session closes.
export const recognizeKorean = (
  onResult: (result: RecognitionResult) => void,
  onError: (code: string) => void,
  onEnd: () => void
): (() => void) => {
  const Ctor = getRecognitionCtor();
  if (!Ctor) {
    onError("unsupported");
    return () => {};
  }

  const recognition = new Ctor();
  recognition.lang = "ko-KR";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const best = event.results[0][0];
    onResult({ text: best.transcript, confidence: best.confidence });
  };

  recognition.onerror = (event) => {
    onError(event.error ?? "unknown");
  };

  recognition.onend = onEnd;

  try {
    recognition.start();
  } catch {
    onError("start_failed");
  }

  return () => {
    try {
      recognition.stop();
    } catch {
      // already stopped
    }
  };
};
