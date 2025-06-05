import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Kiểm tra title của trang
    await expect(page).toHaveTitle(/E-Commerce/i);
    
    // Kiểm tra header navigation
    await expect(page.locator('nav')).toBeVisible();
    
    // Kiểm tra logo hoặc brand name
    await expect(page.locator('[data-testid="logo"], .logo, h1')).toBeVisible();
  });

  test('should display product categories', async ({ page }) => {
    await page.goto('/');
    
    // Chờ trang load xong
    await page.waitForLoadState('networkidle');
    
    // Kiểm tra có hiển thị danh mục sản phẩm
    const categories = page.locator('[data-testid="category"], .category, .product-category');
    await expect(categories.first()).toBeVisible({ timeout: 10000 });
  });

  test('should display featured products', async ({ page }) => {
    await page.goto('/');
    
    // Chờ trang load xong
    await page.waitForLoadState('networkidle');
    
    // Kiểm tra có hiển thị sản phẩm nổi bật
    const products = page.locator('[data-testid="product"], .product, .product-card');
    await expect(products.first()).toBeVisible({ timeout: 10000 });
  });

  test('should have working navigation menu', async ({ page }) => {
    await page.goto('/');
    
    // Kiểm tra menu navigation
    const navLinks = page.locator('nav a, .nav-link');
    const linkCount = await navLinks.count();
    
    expect(linkCount).toBeGreaterThan(0);
    
    // Kiểm tra ít nhất một link có thể click được
    if (linkCount > 0) {
      await expect(navLinks.first()).toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Kiểm tra trang vẫn hiển thị tốt trên mobile
    await expect(page.locator('body')).toBeVisible();
    
    // Kiểm tra không có horizontal scroll
    const bodyWidth = await page.locator('body').evaluate(el => el.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375);
  });
});