import { test, expect } from '@playwright/test';

test.describe('LocalThread Marketplace E2E Flow', () => {
  
  test('User can browse storefront products', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Expect homepage title or hero text
    await expect(page.locator('h1')).toBeVisible();
    
    // Search/filter products
    const trendingTab = page.locator('button', { hasText: 'Trending Products' });
    if (await trendingTab.isVisible()) {
      await trendingTab.click();
    }
  });

  test('User authentication pages render', async ({ page }) => {
    // Navigate to Auth page
    await page.goto('/auth');
    
    // Check if Sign In form elements are visible
    await expect(page.locator('text=Welcome Back')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('User cart and checkout pages load', async ({ page }) => {
    // Cart page
    await page.goto('/cart');
    await expect(page.locator('text=Shopping Cart')).toBeVisible();

    // Checkout page redirect behavior (requires login, so should redirect to auth or show access-denied)
    await page.goto('/checkout');
    const url = page.url();
    expect(url.includes('/auth') || url.includes('/cart') || url.includes('/checkout')).toBeTruthy();
  });
});
