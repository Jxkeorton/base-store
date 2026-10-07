import { defineConfig, devices } from '@playwright/test'

const PORT = 3100
// Set BASE_URL to run the suite against a deployed site (e.g. a Vercel preview) instead of a local build.
const BASE_URL = process.env.BASE_URL

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: {
    baseURL: BASE_URL ?? `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
    // Uses the Chrome already installed on the machine, so no browser download is needed.
    channel: 'chrome',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    { name: 'mobile', use: { ...devices['Pixel 7'], channel: 'chrome' } },
  ],
  // Tests run against the production build. Run `npm run build` first.
  webServer: BASE_URL
    ? undefined
    : {
        command: `npx next start -p ${PORT}`,
        url: `http://localhost:${PORT}`,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
})
