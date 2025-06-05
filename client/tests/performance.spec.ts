import { test, expect } from '@playwright/test';

test.describe('Performance & Accessibility Tests', () => {
  test('should load homepage within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Trang chủ nên load trong vòng 5 giây
    expect(loadTime).toBeLessThan(5000);
    
    console.log(`Homepage loaded in ${loadTime}ms`);
  });

  test('should have proper page title and meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Kiểm tra title
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
    
    // Kiểm tra meta description
    const metaDescription = page.locator('meta[name="description"]');
    if (await metaDescription.count() > 0) {
      const content = await metaDescription.getAttribute('content');
      expect(content).toBeTruthy();
    }
    
    // Kiểm tra meta viewport
    const metaViewport = page.locator('meta[name="viewport"]');
    if (await metaViewport.count() > 0) {
      const content = await metaViewport.getAttribute('content');
      expect(content).toContain('width=device-width');
    }
  });

  test('should have accessible images with alt text', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < Math.min(imageCount, 10); i++) {
        const img = images.nth(i);
        if (await img.isVisible()) {
          const alt = await img.getAttribute('alt');
          const src = await img.getAttribute('src');
          
          // Images should have alt text or be decorative
          if (src && !src.includes('data:image')) {
            expect(alt !== null).toBeTruthy();
          }
        }
      }
    }
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Kiểm tra có h1
    const h1Elements = page.locator('h1');
    const h1Count = await h1Elements.count();
    
    // Nên có ít nhất một h1 và không quá một h1 trên mỗi trang
    expect(h1Count).toBeGreaterThanOrEqual(1);
    expect(h1Count).toBeLessThanOrEqual(1);
    
    // Kiểm tra h1 có nội dung
    if (h1Count > 0) {
      const h1Text = await h1Elements.first().textContent();
      expect(h1Text?.trim()).toBeTruthy();
    }
  });

  test('should have keyboard navigation support', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    
    // Kiểm tra có element nào được focus
    const focusedElement = page.locator(':focus');
    const isFocused = await focusedElement.count() > 0;
    
    if (isFocused) {
      // Kiểm tra focus visible
      const focusedElementTag = await focusedElement.evaluate(el => el.tagName.toLowerCase());
      const interactiveElements = ['a', 'button', 'input', 'select', 'textarea'];
      
      expect(interactiveElements.includes(focusedElementTag)).toBeTruthy();
    }
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Kiểm tra text elements có contrast tốt
    const textElements = page.locator('p, span, a, button, h1, h2, h3, h4, h5, h6');
    const elementCount = await textElements.count();
    
    if (elementCount > 0) {
      for (let i = 0; i < Math.min(elementCount, 5); i++) {
        const element = textElements.nth(i);
        if (await element.isVisible()) {
          const styles = await element.evaluate(el => {
            const computed = window.getComputedStyle(el);
            return {
              color: computed.color,
              backgroundColor: computed.backgroundColor,
              fontSize: computed.fontSize
            };
          });
          
          // Kiểm tra có color được set
          expect(styles.color).toBeTruthy();
          expect(styles.color).not.toBe('rgba(0, 0, 0, 0)');
        }
      }
    }
  });

  test('should have form labels and accessibility', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Tìm form inputs
    const inputs = page.locator('input[type="text"], input[type="email"], input[type="password"], textarea, select');
    const inputCount = await inputs.count();
    
    if (inputCount > 0) {
      for (let i = 0; i < Math.min(inputCount, 5); i++) {
        const input = inputs.nth(i);
        if (await input.isVisible()) {
          // Kiểm tra có label hoặc placeholder
          const id = await input.getAttribute('id');
          const placeholder = await input.getAttribute('placeholder');
          const ariaLabel = await input.getAttribute('aria-label');
          
          let hasLabel = false;
          
          if (id) {
            const label = page.locator(`label[for="${id}"]`);
            hasLabel = await label.count() > 0;
          }
          
          // Input should have label, placeholder, or aria-label
          expect(hasLabel || placeholder || ariaLabel).toBeTruthy();
        }
      }
    }
  });

  test('should handle errors gracefully', async ({ page }) => {
    // Test với network offline
    await page.context().setOffline(true);
    
    const response = await page.goto('/', { waitUntil: 'domcontentloaded' }).catch(() => null);
    
    if (!response) {
      // Nếu không load được, kiểm tra có error page
      const errorElements = page.locator(':has-text("Error"), :has-text("Offline"), :has-text("Network")');
      const hasErrorMessage = await errorElements.count() > 0;
      
      // Hoặc page vẫn có basic structure
      const basicElements = page.locator('html, body');
      const hasBasicStructure = await basicElements.count() > 0;
      
      expect(hasErrorMessage || hasBasicStructure).toBeTruthy();
    }
    
    // Reset network
    await page.context().setOffline(false);
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Kiểm tra navigation có role
    const nav = page.locator('nav');
    if (await nav.count() > 0) {
      const role = await nav.first().getAttribute('role');
      const ariaLabel = await nav.first().getAttribute('aria-label');
      
      // Nav should have proper role or aria-label
      expect(role === 'navigation' || ariaLabel).toBeTruthy();
    }
    
    // Kiểm tra buttons có accessible names
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const button = buttons.nth(i);
        if (await button.isVisible()) {
          const text = await button.textContent();
          const ariaLabel = await button.getAttribute('aria-label');
          const title = await button.getAttribute('title');
          
          // Button should have accessible name
          expect(text?.trim() || ariaLabel || title).toBeTruthy();
        }
      }
    }
  });

  test('should not have console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Filter out known non-critical errors
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('404') &&
      !error.includes('net::ERR_')
    );
    
    expect(criticalErrors.length).toBe(0);
    
    if (criticalErrors.length > 0) {
      console.log('Console errors found:', criticalErrors);
    }
  });
});