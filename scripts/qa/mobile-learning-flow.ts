import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const distDir = join(root, "dist");
const port = 5181;

const mimeTypes: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".wav": "audio/wav"
};

const server = createServer((request, response) => {
  const requestPath = decodeURIComponent((request.url ?? "/").split("?")[0]);
  const safePath = normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(distDir, safePath === "/" ? "index.html" : safePath);
  const target = existsSync(filePath) && statSync(filePath).isFile() ? filePath : join(distDir, "index.html");
  response.setHeader("Content-Type", mimeTypes[extname(target)] ?? "application/octet-stream");
  createReadStream(target).pipe(response);
});

const state = {
  anonymousId: "mobile-qa",
  onboarding: {
    countryPackId: "us-en",
    nativeLanguage: "English",
    koreanLevel: "first-time",
    learningGoal: "travel",
    dailyGoalMinutes: 5,
    characterId: "haneul",
    reminderTime: "19:30",
    completedAt: new Date().toISOString()
  },
  lessonProgress: {},
  reviewItems: [],
  savedPhrases: [],
  analyticsEvents: [],
  sync: { mode: "local-only", pending: false, message: "qa" },
  updatedAt: new Date().toISOString()
};

const viewports = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "desktop-1280", width: 1280, height: 900 }
];

await new Promise<void>((resolve) => server.listen(port, "127.0.0.1", resolve));

try {
  const browser = await chromium.launch();
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    await page.addInitScript((value) => {
      localStorage.setItem("korean-first-talk:user-state:v1", JSON.stringify(value));
    }, state);
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "domcontentloaded" });
    await page.getByText("Day 14 이후 이어질 길").waitFor();
    await page.getByText("Day 15-30 여행 생존 말하기").waitFor();
    await page.getByText("여기로 가 주세요.").waitFor();
    await page.getByRole("button", { name: "여기로 가 주세요. 듣기" }).waitFor();
    await page.getByRole("button", { name: "여기로 가 주세요. 천천히" }).waitFor();
    await page.getByText("오프라인 저용량 음원 준비").waitFor();
    await page.getByText("English 학습 설명").waitFor();
    await page.getByRole("button", { name: /시작|이어하기/ }).click();
    await page.getByRole("button", { name: "계속" }).click();
    await page.getByRole("button", { name: "계속" }).click();
    await page.getByRole("button", { name: "문장 저장" }).click();
    await page.getByRole("button", { name: "복습" }).click();
    await page.getByText("저장 문장함").waitFor();
    await page.getByText("안녕하세요. 만나서 반가워요.").waitFor();
    await page.getByRole("button", { name: "핵심" }).click();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    if (overflow) throw new Error(`${viewport.name} has horizontal overflow.`);
    console.log(`${viewport.name}: home program and saved phrase review flow passed`);
    await page.close();
  }
  await browser.close();
} finally {
  server.close();
}
