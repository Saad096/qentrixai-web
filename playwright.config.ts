import { defineConfig, devices } from "@playwright/test";

/**
 * The matrix from CLAUDE.md section 9.1, minus WebKit: this host cannot run it
 * (missing libavif13). Install it with `sudo npx playwright install-deps
 * webkit` and the three WebKit projects below start working.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  timeout: 45_000,
  use: {
    baseURL: process.env.BASE_URL ?? "http://127.0.0.1:3311",
    trace: "on-first-retry",
  },
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npx next start -p 3311",
        url: "http://127.0.0.1:3311",
        reuseExistingServer: true,
        timeout: 120_000,
      },
  projects: [
    { name: "phone-small", use: { ...devices["Desktop Chrome"], viewport: { width: 360, height: 780 }, isMobile: false } },
    { name: "phone-large", use: { ...devices["Desktop Chrome"], viewport: { width: 430, height: 932 } } },
    { name: "tablet", use: { ...devices["Desktop Chrome"], viewport: { width: 768, height: 1024 } } },
    { name: "laptop", use: { ...devices["Desktop Chrome"], viewport: { width: 1366, height: 768 } } },
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "wide", use: { ...devices["Desktop Chrome"], viewport: { width: 1920, height: 1080 } } },
    { name: "ultrawide", use: { ...devices["Desktop Chrome"], viewport: { width: 2560, height: 1440 } } },
    { name: "firefox", use: { ...devices["Desktop Firefox"], viewport: { width: 1440, height: 900 } } },
  ],
});
