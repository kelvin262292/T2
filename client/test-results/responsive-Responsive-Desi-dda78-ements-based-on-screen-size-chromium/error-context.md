# Test info

- Name: Responsive Design Tests >> should hide/show elements based on screen size
- Location: C:\Users\AB\Documents\New folder\client\tests\responsive.spec.ts:53:3

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
    at C:\Users\AB\Documents\New folder\client\tests\responsive.spec.ts:72:56
```

# Page snapshot

```yaml
- text: Upgrade Required
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Responsive Design Tests', () => {
   4 |   const viewports = [
   5 |     { name: 'Mobile', width: 375, height: 667 },
   6 |     { name: 'Tablet', width: 768, height: 1024 },
   7 |     { name: 'Desktop', width: 1920, height: 1080 }
   8 |   ];
   9 |
   10 |   viewports.forEach(({ name, width, height }) => {
   11 |     test(`should display correctly on ${name}`, async ({ page }) => {
   12 |       await page.setViewportSize({ width, height });
   13 |       await page.goto('/');
   14 |       await page.waitForLoadState('networkidle');
   15 |       
   16 |       // Kiểm tra không có horizontal scroll
   17 |       const bodyWidth = await page.locator('body').evaluate(el => el.scrollWidth);
   18 |       expect(bodyWidth).toBeLessThanOrEqual(width + 20); // Cho phép sai số 20px
   19 |       
   20 |       // Kiểm tra header hiển thị
   21 |       const header = page.locator('header, nav, .header');
   22 |       if (await header.isVisible()) {
   23 |         await expect(header).toBeVisible();
   24 |       }
   25 |       
   26 |       // Kiểm tra content hiển thị
   27 |       const mainContent = page.locator('main, .main-content, .content');
   28 |       if (await mainContent.isVisible()) {
   29 |         await expect(mainContent).toBeVisible();
   30 |       }
   31 |     });
   32 |   });
   33 |
   34 |   test('should have mobile menu on small screens', async ({ page }) => {
   35 |     await page.setViewportSize({ width: 375, height: 667 });
   36 |     await page.goto('/');
   37 |     await page.waitForLoadState('networkidle');
   38 |     
   39 |     // Tìm mobile menu button (hamburger menu)
   40 |     const mobileMenuBtn = page.locator('button:has-text("☰"), .mobile-menu-btn, .hamburger, [data-testid="mobile-menu"]');
   41 |     
   42 |     if (await mobileMenuBtn.isVisible()) {
   43 |       await mobileMenuBtn.click();
   44 |       
   45 |       // Kiểm tra mobile menu hiển thị
   46 |       const mobileMenu = page.locator('.mobile-menu, .sidebar-menu, [data-testid="mobile-nav"]');
   47 |       if (await mobileMenu.isVisible()) {
   48 |         await expect(mobileMenu).toBeVisible();
   49 |       }
   50 |     }
   51 |   });
   52 |
   53 |   test('should hide/show elements based on screen size', async ({ page }) => {
   54 |     // Test trên desktop
   55 |     await page.setViewportSize({ width: 1920, height: 1080 });
   56 |     await page.goto('/');
   57 |     await page.waitForLoadState('networkidle');
   58 |     
   59 |     // Kiểm tra desktop navigation
   60 |     const desktopNav = page.locator('nav:not(.mobile-nav), .desktop-nav');
   61 |     const desktopNavVisible = await desktopNav.isVisible().catch(() => false);
   62 |     
   63 |     // Test trên mobile
   64 |     await page.setViewportSize({ width: 375, height: 667 });
   65 |     await page.waitForTimeout(1000);
   66 |     
   67 |     // Kiểm tra mobile elements
   68 |     const mobileElements = page.locator('.mobile-only, .mobile-menu-btn, .hamburger');
   69 |     const mobileElementsVisible = await mobileElements.first().isVisible().catch(() => false);
   70 |     
   71 |     // Ít nhất một trong hai phải có responsive behavior
>  72 |     expect(desktopNavVisible || mobileElementsVisible).toBeTruthy();
      |                                                        ^ Error: expect(received).toBeTruthy()
   73 |   });
   74 |
   75 |   test('should have touch-friendly buttons on mobile', async ({ page }) => {
   76 |     await page.setViewportSize({ width: 375, height: 667 });
   77 |     await page.goto('/');
   78 |     await page.waitForLoadState('networkidle');
   79 |     
   80 |     // Kiểm tra kích thước buttons
   81 |     const buttons = page.locator('button, .btn, a.button');
   82 |     const buttonCount = await buttons.count();
   83 |     
   84 |     if (buttonCount > 0) {
   85 |       for (let i = 0; i < Math.min(buttonCount, 5); i++) {
   86 |         const button = buttons.nth(i);
   87 |         if (await button.isVisible()) {
   88 |           const boundingBox = await button.boundingBox();
   89 |           if (boundingBox) {
   90 |             // Buttons should be at least 44px for touch targets
   91 |             expect(boundingBox.height).toBeGreaterThanOrEqual(30);
   92 |             expect(boundingBox.width).toBeGreaterThanOrEqual(30);
   93 |           }
   94 |         }
   95 |       }
   96 |     }
   97 |   });
   98 |
   99 |   test('should have readable text on all screen sizes', async ({ page }) => {
  100 |     for (const { width, height } of viewports) {
  101 |       await page.setViewportSize({ width, height });
  102 |       await page.goto('/');
  103 |       await page.waitForLoadState('networkidle');
  104 |       
  105 |       // Kiểm tra font size của text elements
  106 |       const textElements = page.locator('p, span, div:not(:empty), h1, h2, h3, h4, h5, h6');
  107 |       const elementCount = await textElements.count();
  108 |       
  109 |       if (elementCount > 0) {
  110 |         for (let i = 0; i < Math.min(elementCount, 10); i++) {
  111 |           const element = textElements.nth(i);
  112 |           if (await element.isVisible()) {
  113 |             const fontSize = await element.evaluate(el => {
  114 |               return window.getComputedStyle(el).fontSize;
  115 |             });
  116 |             
  117 |             const fontSizeNum = parseInt(fontSize.replace('px', ''));
  118 |             // Font size should be at least 12px for readability
  119 |             expect(fontSizeNum).toBeGreaterThanOrEqual(12);
  120 |           }
  121 |         }
  122 |       }
  123 |     }
  124 |   });
  125 |
  126 |   test('should handle orientation changes', async ({ page }) => {
  127 |     // Portrait mode
  128 |     await page.setViewportSize({ width: 375, height: 667 });
  129 |     await page.goto('/');
  130 |     await page.waitForLoadState('networkidle');
  131 |     
  132 |     const portraitBodyWidth = await page.locator('body').evaluate(el => el.scrollWidth);
  133 |     
  134 |     // Landscape mode
  135 |     await page.setViewportSize({ width: 667, height: 375 });
  136 |     await page.waitForTimeout(1000);
  137 |     
  138 |     const landscapeBodyWidth = await page.locator('body').evaluate(el => el.scrollWidth);
  139 |     
  140 |     // Both orientations should not have horizontal scroll
  141 |     expect(portraitBodyWidth).toBeLessThanOrEqual(375 + 20);
  142 |     expect(landscapeBodyWidth).toBeLessThanOrEqual(667 + 20);
  143 |   });
  144 |
  145 |   test('should have proper spacing on different screen sizes', async ({ page }) => {
  146 |     for (const { name, width, height } of viewports) {
  147 |       await page.setViewportSize({ width, height });
  148 |       await page.goto('/');
  149 |       await page.waitForLoadState('networkidle');
  150 |       
  151 |       // Kiểm tra margin và padding
  152 |       const containers = page.locator('.container, .wrapper, main, .content');
  153 |       
  154 |       if (await containers.first().isVisible()) {
  155 |         const padding = await containers.first().evaluate(el => {
  156 |           const styles = window.getComputedStyle(el);
  157 |           return {
  158 |             paddingLeft: parseInt(styles.paddingLeft),
  159 |             paddingRight: parseInt(styles.paddingRight)
  160 |           };
  161 |         });
  162 |         
  163 |         // Padding should be appropriate for screen size
  164 |         if (name === 'Mobile') {
  165 |           expect(padding.paddingLeft + padding.paddingRight).toBeLessThanOrEqual(40);
  166 |         } else {
  167 |           expect(padding.paddingLeft + padding.paddingRight).toBeGreaterThanOrEqual(0);
  168 |         }
  169 |       }
  170 |     }
  171 |   });
  172 |
```