import { test, expect } from '@playwright/test';

test('user can add their weight', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const weightInput = page.getByLabel('weight');
  const submitButton = page.getByRole('button', { name: 'Add' });

  await weightInput.fill('80');
  await submitButton.click();

  await expect(page.getByText('Saved')).toBeVisible();
});

test('user sees error when invalid weight is added', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const weightInput = page.getByLabel('weight');
  const submitButton = page.getByRole('button', { name: 'Add' });

  await weightInput.fill('0');
  await submitButton.click();

  await expect(page.getByRole('alert')).toBeVisible();
});
