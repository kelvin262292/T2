# Test info

- Name: Performance & Accessibility Tests >> should have proper page title and meta tags
- Location: C:\Users\AB\Documents\New folder\client\tests\performance.spec.ts:18:3

# Error details

```
Error: expect(received).toBeTruthy()

Received: ""
    at C:\Users\AB\Documents\New folder\client\tests\performance.spec.ts:23:19
```

# Page snapshot

```yaml
- text: Upgrade Required
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Performance & Accessibility Tests', () => {
   4 |   test('should load homepage within acceptable time', async ({ page }) => {
   5 |     const startTime = Date.now();
   6 |     
   7 |     await page.goto('/');
   8 |     await page.waitForLoadState('networkidle');
   9 |     
   10 |     const loadTime = Date.now() - startTime;
   11 |     
   12 |     // Trang chủ nên load trong vòng 5 giây
   13 |     expect(loadTime).toBeLessThan(5000);
   14 |     
   15 |     console.log(`Homepage loaded in ${loadTime}ms`);
   16 |   });
   17 |
   18 |   test('should have proper page title and meta tags', async ({ page }) => {
   19 |     await page.goto('/');
   20 |     
   21 |     // Kiểm tra title
   22 |     const title = await page.title();
>  23 |     expect(title).toBeTruthy();
      |                   ^ Error: expect(received).toBeTruthy()
   24 |     expect(title.length).toBeGreaterThan(0);
   25 |     
   26 |     // Kiểm tra meta description
   27 |     const metaDescription = page.locator('meta[name="description"]');
   28 |     if (await metaDescription.count() > 0) {
   29 |       const content = await metaDescription.getAttribute('content');
   30 |       expect(content).toBeTruthy();
   31 |     }
   32 |     
   33 |     // Kiểm tra meta viewport
   34 |     const metaViewport = page.locator('meta[name="viewport"]');
   35 |     if (await metaViewport.count() > 0) {
   36 |       const content = await metaViewport.getAttribute('content');
   37 |       expect(content).toContain('width=device-width');
   38 |     }
   39 |   });
   40 |
   41 |   test('should have accessible images with alt text', async ({ page }) => {
   42 |     await page.goto('/');
   43 |     await page.waitForLoadState('networkidle');
   44 |     
   45 |     const images = page.locator('img');
   46 |     const imageCount = await images.count();
   47 |     
   48 |     if (imageCount > 0) {
   49 |       for (let i = 0; i < Math.min(imageCount, 10); i++) {
   50 |         const img = images.nth(i);
   51 |         if (await img.isVisible()) {
   52 |           const alt = await img.getAttribute('alt');
   53 |           const src = await img.getAttribute('src');
   54 |           
   55 |           // Images should have alt text or be decorative
   56 |           if (src && !src.includes('data:image')) {
   57 |             expect(alt !== null).toBeTruthy();
   58 |           }
   59 |         }
   60 |       }
   61 |     }
   62 |   });
   63 |
   64 |   test('should have proper heading hierarchy', async ({ page }) => {
   65 |     await page.goto('/');
   66 |     await page.waitForLoadState('networkidle');
   67 |     
   68 |     // Kiểm tra có h1
   69 |     const h1Elements = page.locator('h1');
   70 |     const h1Count = await h1Elements.count();
   71 |     
   72 |     // Nên có ít nhất một h1 và không quá một h1 trên mỗi trang
   73 |     expect(h1Count).toBeGreaterThanOrEqual(1);
   74 |     expect(h1Count).toBeLessThanOrEqual(1);
   75 |     
   76 |     // Kiểm tra h1 có nội dung
   77 |     if (h1Count > 0) {
   78 |       const h1Text = await h1Elements.first().textContent();
   79 |       expect(h1Text?.trim()).toBeTruthy();
   80 |     }
   81 |   });
   82 |
   83 |   test('should have keyboard navigation support', async ({ page }) => {
   84 |     await page.goto('/');
   85 |     await page.waitForLoadState('networkidle');
   86 |     
   87 |     // Test tab navigation
   88 |     await page.keyboard.press('Tab');
   89 |     
   90 |     // Kiểm tra có element nào được focus
   91 |     const focusedElement = page.locator(':focus');
   92 |     const isFocused = await focusedElement.count() > 0;
   93 |     
   94 |     if (isFocused) {
   95 |       // Kiểm tra focus visible
   96 |       const focusedElementTag = await focusedElement.evaluate(el => el.tagName.toLowerCase());
   97 |       const interactiveElements = ['a', 'button', 'input', 'select', 'textarea'];
   98 |       
   99 |       expect(interactiveElements.includes(focusedElementTag)).toBeTruthy();
  100 |     }
  101 |   });
  102 |
  103 |   test('should have proper color contrast', async ({ page }) => {
  104 |     await page.goto('/');
  105 |     await page.waitForLoadState('networkidle');
  106 |     
  107 |     // Kiểm tra text elements có contrast tốt
  108 |     const textElements = page.locator('p, span, a, button, h1, h2, h3, h4, h5, h6');
  109 |     const elementCount = await textElements.count();
  110 |     
  111 |     if (elementCount > 0) {
  112 |       for (let i = 0; i < Math.min(elementCount, 5); i++) {
  113 |         const element = textElements.nth(i);
  114 |         if (await element.isVisible()) {
  115 |           const styles = await element.evaluate(el => {
  116 |             const computed = window.getComputedStyle(el);
  117 |             return {
  118 |               color: computed.color,
  119 |               backgroundColor: computed.backgroundColor,
  120 |               fontSize: computed.fontSize
  121 |             };
  122 |           });
  123 |           
```