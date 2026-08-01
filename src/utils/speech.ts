const getSpeechSynthesis = () => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return undefined;
  return window.speechSynthesis;
};

export const getKoreanSpeechVoices = () => {
  const synthesis = getSpeechSynthesis();
  if (!synthesis) return [];
  return synthesis.getVoices().filter((voice) => voice.lang.toLowerCase().startsWith("ko"));
};

export const hasKoreanSpeechVoice = () => getKoreanSpeechVoices().length > 0;

export const speakKorean = (text: string, rate: number) => {
  const synthesis = getSpeechSynthesis();
  if (!synthesis || typeof SpeechSynthesisUtterance === "undefined") return false;
  synthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.voice = getKoreanSpeechVoices()[0] ?? null;
  utterance.rate = rate;
  synthesis.speak(utterance);
  return true;
};
