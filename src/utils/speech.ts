export const speakKorean = (text: string, rate: number) => {
  if (!("speechSynthesis" in window)) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
  return true;
};
