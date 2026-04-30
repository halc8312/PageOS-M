import { expect, test } from '@playwright/test';

test('boots into desktop mode on wide viewports', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto('/');
  await expect(page.getByTestId('pageos-logo')).toBeVisible();
  await expect(page.getByTestId('desktop-shell')).toBeVisible({ timeout: 15_000 });
  await expect(page.getByRole('heading', { name: 'Shell' })).toBeVisible();
});

test('boots into mobile mode on narrow viewports', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByTestId('mobile-shell')).toBeVisible({ timeout: 15_000 });
  await page.getByRole('button', { name: 'Shell session://tty0' }).click();
  await expect(page.getByTestId('mobile-active-app')).toBeVisible();
});
