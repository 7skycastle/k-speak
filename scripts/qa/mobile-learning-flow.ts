import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { chromium, type Page } from "playwright";

const root = process.cwd();
const distDir = join(root, "dist");
const port = 5181;

if (!existsSync(join(distDir, "index.html"))) {
  throw new Error("dist/index.html is missing. Run `npm run build` before `npm run qa:mobile`.");
}

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
  activeCourseId: "foundation",
  activeCourseChangedAt: "1970-01-01T00:00:00.000Z",
  courseEnrollments: {},
  epsAssessmentAttempts: {},
  epsAssessmentResults: {},
  travelMissionResults: {},
  kFoodMissionResults: {},
  onboarding: {
    countryPackId: "us-en",
    nativeLanguage: "English",
    koreanLevel: "first-time",
    learningGoal: "travel",
    dailyGoalMinutes: 5,
    characterId: "haneul",
    reminderTime: "19:30",
    completedAt: "2026-08-04T09:00:00.000Z"
  },
  lessonProgress: {},
  reviewItems: [
    {
      id: "review-1",
      lessonId: "day-1",
      phraseId: "hello",
      korean: "annyeonghaseyo",
      meaning: "Hello",
      reason: "Warm up your first greeting again.",
      priority: 40,
      dueAt: "2026-08-04T08:00:00.000Z",
      updatedAt: "2026-08-04T08:00:00.000Z"
    }
  ],
  savedPhrases: [
    {
      id: "day-1:core",
      lessonId: "day-1",
      phraseId: "core",
      korean: "annyeonghaseyo",
      romanization: "Annyeonghaseyo",
      meaning: "Hello",
      tags: ["core"],
      source: "core",
      savedAt: "2026-08-04T08:30:00.000Z",
      updatedAt: "2026-08-04T08:30:00.000Z"
    }
  ],
  savedPhraseTombstones: [],
  analyticsEvents: [],
  sync: {
    mode: "local-only",
    pending: false,
    message: "qa",
    messageKey: "sync.localOnly",
    pendingChanges: []
  },
  updatedAt: "2026-08-04T09:00:00.000Z"
};

const viewports = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "desktop-1280", width: 1280, height: 900 }
];

const assertNoOverflow = async (page: Page, name: string) => {
  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  if (hasOverflow) {
    throw new Error(`${name}: horizontal overflow detected.`);
  }
};

const assertBottomContentVisible = async (page: Page, name: string) => {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const occluded = await page.evaluate(() => {
    const nav = document.querySelector(".bottom-nav");
    const screen = document.querySelector(".screen");
    const lastContent = screen?.lastElementChild as HTMLElement | null;
    if (!nav || !lastContent) return false;
    const navRect = nav.getBoundingClientRect();
    const contentRect = lastContent.getBoundingClientRect();
    return contentRect.bottom > navRect.top - 8;
  });

  if (occluded) {
    throw new Error(`${name}: final action is hidden under the fixed navigation.`);
  }
};

const assertStickyActionsVisible = async (page: Page, name: string) => {
  const occluded = await page.evaluate(() => {
    const nav = document.querySelector(".bottom-nav");
    const sticky = document.querySelector(".sticky-actions");
    if (!nav || !sticky) return false;
    const navRect = nav.getBoundingClientRect();
    const stickyRect = sticky.getBoundingClientRect();
    return stickyRect.bottom > navRect.top - 8;
  });

  if (occluded) {
    throw new Error(`${name}: sticky lesson actions overlap the fixed navigation.`);
  }
};

const assertTtsReviewPage = async (page: Page, name: string) => {
  await page.goto(`http://127.0.0.1:${port}/tts-review.html`, { waitUntil: "networkidle" });
  await page.getByText("Korean TTS Review").waitFor();
  await page.locator("#metricSentences").waitFor();
  await page.locator("#metricAudios").waitFor();
  if ((await page.locator(".model-title", { hasText: "MeloTTS-Korean" }).count()) === 0) {
    throw new Error(`${name}: tts-review is missing MeloTTS-Korean rows.`);
  }
  if ((await page.locator(".model-title", { hasText: "Qwen3 Sohee" }).count()) === 0) {
    throw new Error(`${name}: tts-review is missing Qwen3 Sohee rows.`);
  }

  const sentenceCount = await page.locator("#metricSentences").textContent();
  const audioCount = await page.locator("#metricAudios").textContent();
  if (sentenceCount?.trim() !== "20") {
    throw new Error(`${name}: tts-review sentence count should be 20, received ${sentenceCount}.`);
  }
  if (audioCount?.trim() !== "80") {
    throw new Error(`${name}: tts-review audio count should be 80, received ${audioCount}.`);
  }

  await page.locator("#search").fill("hello");
  await page.getByText("안녕하세요. 만나서 반가워요.").waitFor();
  await assertNoOverflow(page, `${name}: tts-review`);
};

await new Promise<void>((resolve) => server.listen(port, "127.0.0.1", resolve));

try {
  const browser = await chromium.launch();

  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.addInitScript((value) => {
      localStorage.setItem("korean-first-talk:user-state:v1", JSON.stringify(value));
    }, state);

    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle" });

    await page.getByText("What comes after Day 14").waitFor();
    await page.getByText("Offline audio pack status").waitFor();
    await page.getByText("Saved phrases").waitFor();
    await page.getByRole("button", { name: "Change course" }).click();
    await page.getByRole("button", { name: /Korean Travel/ }).click();
    await page.getByText("Airport Arrival").waitFor();
    await page.getByRole("button", { name: "Change course" }).click();
    await page.getByRole("button", { name: /K-Food Korean/ }).click();
    await page.getByText("First food-court order").waitFor();
    await page.getByRole("button", { name: /Start|Resume/ }).click();
    await page.getByText("First food-court order").waitFor();
    await assertStickyActionsVisible(page, `${viewport.name}: k-food`);
    await page.getByRole("button", { name: "Home" }).click();
    await page.getByRole("button", { name: "Change course" }).click();
    await page.getByRole("button", { name: /Korean First Talk/ }).click();
    await page.getByText(/Day 1\./).waitFor();

    await page.getByRole("button", { name: "Change course" }).click();
    await page.getByRole("button", { name: /K-Culture Korean/ }).click();
    await page.getByText("Polite and casual distance").waitFor();
    await page.getByRole("button", { name: /Start|Resume/ }).click();
    await page.getByText("Choose your K-Culture route").waitFor();
    await page.getByText(/K-Speak original learning scenes/i).waitFor();
    await page.getByLabel("K-Pop primary").check();
    await page.getByLabel("K-Drama sampler").check();
    await page.getByRole("button", { name: "Create my route" }).click();
    await page.getByText("Polite and casual distance").waitFor();
    await assertNoOverflow(page, `${viewport.name}: k-culture setup`);
    await assertStickyActionsVisible(page, `${viewport.name}: k-culture`);

    await assertNoOverflow(page, viewport.name);
    await assertBottomContentVisible(page, viewport.name);

    await page.getByRole("button", { name: "Settings" }).click();
    await page.getByText("My learning settings").waitFor();
    await page.getByText("Sync status").waitFor();
    await page.locator('select').first().selectOption("vn-vi");
    await page.getByText("Cài đặt học tập của tôi").waitFor();
    await assertNoOverflow(page, viewport.name);

    await page.getByRole("button", { name: "Ôn tập" }).click();
    await page.getByText("Chưa có mục ôn tập").waitFor();
    await assertNoOverflow(page, `${viewport.name}: vietnamese review empty`);

    await page.getByRole("button", { name: "Trang chủ" }).click();
    await page.getByRole("button", { name: /Start|Resume|Bắt đầu|Tiếp tục/ }).click();
    await page.getByRole("button", { name: /^(Continue|Tiếp tục)$/ }).waitFor();
    await assertNoOverflow(page, viewport.name);
    await assertStickyActionsVisible(page, viewport.name);
    await assertTtsReviewPage(page, viewport.name);

    if (consoleErrors.length || pageErrors.length) {
      throw new Error(
        `${viewport.name}: runtime errors detected.\nconsole: ${consoleErrors.join(" | ")}\npage: ${pageErrors.join(" | ")}`
      );
    }

    console.log(`${viewport.name}: passed home, settings, review, lesson, and layout checks`);
    await page.close();
  }

  await browser.close();
} finally {
  server.close();
}
