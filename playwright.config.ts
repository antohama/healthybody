import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/test',
  use: {
    headless: true
  }
});
