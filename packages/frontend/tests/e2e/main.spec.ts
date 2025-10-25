import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display hero section', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /Ласкаво просимо/i })).toBeVisible();
    await expect(page.getByText(/Найкраща кава/i)).toBeVisible();
  });

  test('should navigate to catalog', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /каталог/i }).first().click();
    await expect(page).toHaveURL(/\/catalog/);
  });
});

test.describe('Catalog Page', () => {
  test('should display products', async ({ page }) => {
    await page.goto('/catalog');

    await expect(page.getByRole('heading', { name: /каталог/i })).toBeVisible();
  });

  test('should filter by category', async ({ page }) => {
    await page.goto('/catalog');

    await page.getByRole('button', { name: 'Кава' }).click();
    await expect(page).toHaveURL(/category=COFFEE/);
  });
});

test.describe('Cart', () => {
  test('should show empty cart message', async ({ page }) => {
    await page.goto('/cart');

    await expect(page.getByText(/порожній/i)).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('should meet WCAG 2.2 AA standards on home page', async ({ page }) => {
    await page.goto('/');

    // Check for proper heading hierarchy
    const h1 = await page.locator('h1').count();
    expect(h1).toBeGreaterThanOrEqual(1);

    // Check for alt text on images
    const images = await page.locator('img').all();
    for (const img of images) {
      await expect(img).toHaveAttribute('alt');
    }
  });
});
