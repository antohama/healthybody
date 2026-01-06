import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/test',
  timeout: 30_000,

  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
  },

  webServer: [
    {
      command: 'npm run dev --workspace backend',
      port: 3000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run dev --workspace frontend',
      port: 5173,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
