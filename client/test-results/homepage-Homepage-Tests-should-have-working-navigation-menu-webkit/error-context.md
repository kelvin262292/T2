# Test info

- Name: Homepage Tests >> should have working navigation menu
- Location: C:\Users\AB\Documents\New folder\client\tests\homepage.spec.ts:39:3

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
    at C:\Users\AB\Documents\New folder\client\tests\homepage.spec.ts:46:23
```

# Page snapshot

```yaml
- text: Upgrade Required
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Homepage Tests', () => {
   4 |   test('should load homepage successfully', async ({ page }) => {
   5 |     await page.goto('/');
   6 |     
   7 |     // Kiểm tra title của trang
   8 |     await expect(page).toHaveTitle(/E-Commerce/i);
   9 |     
  10 |     // Kiểm tra header navigation
  11 |     await expect(page.locator('nav')).toBeVisible();
  12 |     
  13 |     // Kiểm tra logo hoặc brand name
  14 |     await expect(page.locator('[data-testid="logo"], .logo, h1')).toBeVisible();
  15 |   });
  16 |
  17 |   test('should display product categories', async ({ page }) => {
  18 |     await page.goto('/');
  19 |     
  20 |     // Chờ trang load xong
  21 |     await page.waitForLoadState('networkidle');
  22 |     
  23 |     // Kiểm tra có hiển thị danh mục sản phẩm
  24 |     const categories = page.locator('[data-testid="category"], .category, .product-category');
  25 |     await expect(categories.first()).toBeVisible({ timeout: 10000 });
  26 |   });
  27 |
  28 |   test('should display featured products', async ({ page }) => {
  29 |     await page.goto('/');
  30 |     
  31 |     // Chờ trang load xong
  32 |     await page.waitForLoadState('networkidle');
  33 |     
  34 |     // Kiểm tra có hiển thị sản phẩm nổi bật
  35 |     const products = page.locator('[data-testid="product"], .product, .product-card');
  36 |     await expect(products.first()).toBeVisible({ timeout: 10000 });
  37 |   });
  38 |
  39 |   test('should have working navigation menu', async ({ page }) => {
  40 |     await page.goto('/');
  41 |     
  42 |     // Kiểm tra menu navigation
  43 |     const navLinks = page.locator('nav a, .nav-link');
  44 |     const linkCount = await navLinks.count();
  45 |     
> 46 |     expect(linkCount).toBeGreaterThan(0);
     |                       ^ Error: expect(received).toBeGreaterThan(expected)
  47 |     
  48 |     // Kiểm tra ít nhất một link có thể click được
  49 |     if (linkCount > 0) {
  50 |       await expect(navLinks.first()).toBeVisible();
  51 |     }
  52 |   });
  53 |
  54 |   test('should be responsive on mobile', async ({ page }) => {
  55 |     // Set mobile viewport
  56 |     await page.setViewportSize({ width: 375, height: 667 });
  57 |     await page.goto('/');
  58 |     
  59 |     // Kiểm tra trang vẫn hiển thị tốt trên mobile
  60 |     await expect(page.locator('body')).toBeVisible();
  61 |     
  62 |     // Kiểm tra không có horizontal scroll
  63 |     const bodyWidth = await page.locator('body').evaluate(el => el.scrollWidth);
  64 |     expect(bodyWidth).toBeLessThanOrEqual(375);
  65 |   });
  66 | });
```