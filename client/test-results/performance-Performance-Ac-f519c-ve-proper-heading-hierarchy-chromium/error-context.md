# Test info

- Name: Performance & Accessibility Tests >> should have proper heading hierarchy
- Location: C:\Users\AB\Documents\New folder\client\tests\performance.spec.ts:64:3

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 1
Received:    0
    at C:\Users\AB\Documents\New folder\client\tests\performance.spec.ts:73:21
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
   23 |     expect(title).toBeTruthy();
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
>  73 |     expect(h1Count).toBeGreaterThanOrEqual(1);
      |                     ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
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
  124 |           // Kiểm tra có color được set
  125 |           expect(styles.color).toBeTruthy();
  126 |           expect(styles.color).not.toBe('rgba(0, 0, 0, 0)');
  127 |         }
  128 |       }
  129 |     }
  130 |   });
  131 |
  132 |   test('should have form labels and accessibility', async ({ page }) => {
  133 |     await page.goto('/');
  134 |     await page.waitForLoadState('networkidle');
  135 |     
  136 |     // Tìm form inputs
  137 |     const inputs = page.locator('input[type="text"], input[type="email"], input[type="password"], textarea, select');
  138 |     const inputCount = await inputs.count();
  139 |     
  140 |     if (inputCount > 0) {
  141 |       for (let i = 0; i < Math.min(inputCount, 5); i++) {
  142 |         const input = inputs.nth(i);
  143 |         if (await input.isVisible()) {
  144 |           // Kiểm tra có label hoặc placeholder
  145 |           const id = await input.getAttribute('id');
  146 |           const placeholder = await input.getAttribute('placeholder');
  147 |           const ariaLabel = await input.getAttribute('aria-label');
  148 |           
  149 |           let hasLabel = false;
  150 |           
  151 |           if (id) {
  152 |             const label = page.locator(`label[for="${id}"]`);
  153 |             hasLabel = await label.count() > 0;
  154 |           }
  155 |           
  156 |           // Input should have label, placeholder, or aria-label
  157 |           expect(hasLabel || placeholder || ariaLabel).toBeTruthy();
  158 |         }
  159 |       }
  160 |     }
  161 |   });
  162 |
  163 |   test('should handle errors gracefully', async ({ page }) => {
  164 |     // Test với network offline
  165 |     await page.context().setOffline(true);
  166 |     
  167 |     const response = await page.goto('/', { waitUntil: 'domcontentloaded' }).catch(() => null);
  168 |     
  169 |     if (!response) {
  170 |       // Nếu không load được, kiểm tra có error page
  171 |       const errorElements = page.locator(':has-text("Error"), :has-text("Offline"), :has-text("Network")');
  172 |       const hasErrorMessage = await errorElements.count() > 0;
  173 |       
```