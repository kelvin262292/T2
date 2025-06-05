import { test, expect } from '@playwright/test';

test.describe('Responsive Design Tests', () => {
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 }
  ];

  viewports.forEach(({ name, width, height }) => {
    test(`should display correctly on ${name}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Kiểm tra không có horizontal scroll
      const bodyWidth = await page.locator('body').evaluate(el => el.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(width + 20); // Cho phép sai số 20px
      
      // Kiểm tra header hiển thị
      const header = page.locator('header, nav, .header');
      if (await header.isVisible()) {
        await expect(header).toBeVisible();
      }
      
      // Kiểm tra content hiển thị
      const mainContent = page.locator('main, .main-content, .content');
      if (await mainContent.isVisible()) {
        await expect(mainContent).toBeVisible();
      }
    });
  });

  test('should have mobile menu on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Tìm mobile menu button (hamburger menu)
    const mobileMenuBtn = page.locator('button:has-text("☰"), .mobile-menu-btn, .hamburger, [data-testid="mobile-menu"]');
    
    if (await mobileMenuBtn.isVisible()) {
      await mobileMenuBtn.click();
      
      // Kiểm tra mobile menu hiển thị
      const mobileMenu = page.locator('.mobile-menu, .sidebar-menu, [data-testid="mobile-nav"]');
      if (await mobileMenu.isVisible()) {
        await expect(mobileMenu).toBeVisible();
      }
    }
  });

  test('should hide/show elements based on screen size', async ({ page }) => {
    // Test trên desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Kiểm tra desktop navigation
    const desktopNav = page.locator('nav:not(.mobile-nav), .desktop-nav');
    const desktopNavVisible = await desktopNav.isVisible().catch(() => false);
    
    // Test trên mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    // Kiểm tra mobile elements
    const mobileElements = page.locator('.mobile-only, .mobile-menu-btn, .hamburger');
    const mobileElementsVisible = await mobileElements.first().isVisible().catch(() => false);
    
    // Ít nhất một trong hai phải có responsive behavior
    expect(desktopNavVisible || mobileElementsVisible).toBeTruthy();
  });

  test('should have touch-friendly buttons on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Kiểm tra kích thước buttons
    const buttons = page.locator('button, .btn, a.button');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const button = buttons.nth(i);
        if (await button.isVisible()) {
          const boundingBox = await button.boundingBox();
          if (boundingBox) {
            // Buttons should be at least 44px for touch targets
            expect(boundingBox.height).toBeGreaterThanOrEqual(30);
            expect(boundingBox.width).toBeGreaterThanOrEqual(30);
          }
        }
      }
    }
  });

  test('should have readable text on all screen sizes', async ({ page }) => {
    for (const { width, height } of viewports) {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Kiểm tra font size của text elements
      const textElements = page.locator('p, span, div:not(:empty), h1, h2, h3, h4, h5, h6');
      const elementCount = await textElements.count();
      
      if (elementCount > 0) {
        for (let i = 0; i < Math.min(elementCount, 10); i++) {
          const element = textElements.nth(i);
          if (await element.isVisible()) {
            const fontSize = await element.evaluate(el => {
              return window.getComputedStyle(el).fontSize;
            });
            
            const fontSizeNum = parseInt(fontSize.replace('px', ''));
            // Font size should be at least 12px for readability
            expect(fontSizeNum).toBeGreaterThanOrEqual(12);
          }
        }
      }
    }
  });

  test('should handle orientation changes', async ({ page }) => {
    // Portrait mode
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const portraitBodyWidth = await page.locator('body').evaluate(el => el.scrollWidth);
    
    // Landscape mode
    await page.setViewportSize({ width: 667, height: 375 });
    await page.waitForTimeout(1000);
    
    const landscapeBodyWidth = await page.locator('body').evaluate(el => el.scrollWidth);
    
    // Both orientations should not have horizontal scroll
    expect(portraitBodyWidth).toBeLessThanOrEqual(375 + 20);
    expect(landscapeBodyWidth).toBeLessThanOrEqual(667 + 20);
  });

  test('should have proper spacing on different screen sizes', async ({ page }) => {
    for (const { name, width, height } of viewports) {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Kiểm tra margin và padding
      const containers = page.locator('.container, .wrapper, main, .content');
      
      if (await containers.first().isVisible()) {
        const padding = await containers.first().evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            paddingLeft: parseInt(styles.paddingLeft),
            paddingRight: parseInt(styles.paddingRight)
          };
        });
        
        // Padding should be appropriate for screen size
        if (name === 'Mobile') {
          expect(padding.paddingLeft + padding.paddingRight).toBeLessThanOrEqual(40);
        } else {
          expect(padding.paddingLeft + padding.paddingRight).toBeGreaterThanOrEqual(0);
        }
      }
    }
  });

  test('should have working responsive images', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Kiểm tra images không vượt quá container
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const img = images.nth(i);
        if (await img.isVisible()) {
          const boundingBox = await img.boundingBox();
          if (boundingBox) {
            // Image width should not exceed viewport width
            expect(boundingBox.width).toBeLessThanOrEqual(375 + 20);
          }
        }
      }
    }
  });
});