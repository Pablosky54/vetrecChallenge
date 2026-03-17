import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  retries: 0,
  use: {
    baseURL: 'https://app.vetrec.io',
    headless: true,
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    // Add default permissions for microphone; tests can also grant more specific permissions as needed.
    permissions: ['microphone'],
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
};

export default config;
