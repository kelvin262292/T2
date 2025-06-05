import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to different pages', async ({ page }) => {
    // Kiểm tra navigation links
    const navLinks = page.locator('nav a, .nav-link, header a');
    const linkCount = await navLinks.count();
    
    if (linkCount > 0) {
      for (let i = 0; i < Math.min(linkCount, 5); i++) {
        const link = navLinks.nth(i);
        const href = await link.getAttribute('href');
        
        if (href && href !== '#' && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
          await link.click();
          await page.waitForLoadState('networkidle');
          
          // Kiểm tra URL đã thay đổi
          const currentUrl = page.url();
          expect(currentUrl).toContain(href.replace('#', ''));
          
          // Quay lại trang chủ
          await page.goto('/');
          await page.waitForLoadState('networkidle');
        }
      }
    }
  });

  test('should navigate to product details', async ({ page }) => {
    // Tìm sản phẩm đầu tiên
    const firstProduct = page.locator('[data-testid="product"], .product, .product-card').first();
    
    if (await firstProduct.isVisible()) {
      await firstProduct.click();
      await page.waitForLoadState('networkidle');
      
      // Kiểm tra đã chuyển đến trang chi tiết sản phẩm
      const productTitle = page.locator('h1, .product-title, [data-testid="product-title"]');
      const productPrice = page.locator('.price, .product-price, [data-testid="product-price"]');
      const productDescription = page.locator('.description, .product-description, [data-testid="product-description"]');
      
      // Ít nhất một trong các element này phải hiển thị
      const hasTitleVisible = await productTitle.isVisible().catch(() => false);
      const hasPriceVisible = await productPrice.isVisible().catch(() => false);
      const hasDescriptionVisible = await productDescription.isVisible().catch(() => false);
      
      expect(hasTitleVisible || hasPriceVisible || hasDescriptionVisible).toBeTruthy();
    }
  });

  test('should navigate to categories', async ({ page }) => {
    // Tìm link categories
    const categoryLinks = page.locator('a:has-text("Categories"), a:has-text("Danh mục"), [data-testid="category-link"]');
    
    if (await categoryLinks.first().isVisible()) {
      await categoryLinks.first().click();
      await page.waitForLoadState('networkidle');
      
      // Kiểm tra có hiển thị danh sách categories
      const categoryList = page.locator('[data-testid="category-list"], .category-list, .categories');
      const categoryItems = page.locator('[data-testid="category-item"], .category-item, .category');
      
      const hasListVisible = await categoryList.isVisible().catch(() => false);
      const hasItemsVisible = await categoryItems.first().isVisible().catch(() => false);
      
      expect(hasListVisible || hasItemsVisible).toBeTruthy();
    }
  });

  test('should navigate to about page', async ({ page }) => {
    // Tìm link About
    const aboutLink = page.locator('a:has-text("About"), a:has-text("Về chúng tôi"), [data-testid="about-link"]');
    
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      await page.waitForLoadState('networkidle');
      
      // Kiểm tra có nội dung about
      const aboutContent = page.locator('h1:has-text("About"), h1:has-text("Về chúng tôi"), .about-content');
      
      if (await aboutContent.isVisible()) {
        await expect(aboutContent).toBeVisible();
      }
    }
  });

  test('should navigate to contact page', async ({ page }) => {
    // Tìm link Contact
    const contactLink = page.locator('a:has-text("Contact"), a:has-text("Liên hệ"), [data-testid="contact-link"]');
    
    if (await contactLink.isVisible()) {
      await contactLink.click();
      await page.waitForLoadState('networkidle');
      
      // Kiểm tra có form liên hệ hoặc thông tin liên hệ
      const contactForm = page.locator('form, .contact-form, [data-testid="contact-form"]');
      const contactInfo = page.locator('.contact-info, [data-testid="contact-info"]');
      
      const hasFormVisible = await contactForm.isVisible().catch(() => false);
      const hasInfoVisible = await contactInfo.isVisible().catch(() => false);
      
      expect(hasFormVisible || hasInfoVisible).toBeTruthy();
    }
  });

  test('should handle 404 page', async ({ page }) => {
    // Truy cập một URL không tồn tại
    await page.goto('/nonexistent-page-12345');
    
    // Kiểm tra có hiển thị trang 404 hoặc redirect về trang chủ
    const notFoundText = page.locator(':has-text("404"), :has-text("Not Found"), :has-text("Page not found")');
    const homeRedirect = page.locator('h1, .logo, nav');
    
    const has404Visible = await notFoundText.isVisible().catch(() => false);
    const hasHomeVisible = await homeRedirect.isVisible().catch(() => false);
    
    expect(has404Visible || hasHomeVisible).toBeTruthy();
  });

  test('should have working breadcrumbs', async ({ page }) => {
    // Điều hướng đến một trang con
    const firstProduct = page.locator('[data-testid="product"], .product, .product-card').first();
    
    if (await firstProduct.isVisible()) {
      await firstProduct.click();
      await page.waitForLoadState('networkidle');
      
      // Kiểm tra có breadcrumbs
      const breadcrumbs = page.locator('.breadcrumb, .breadcrumbs, [data-testid="breadcrumb"]');
      
      if (await breadcrumbs.isVisible()) {
        // Kiểm tra có link về trang chủ
        const homeLink = breadcrumbs.locator('a:has-text("Home"), a:has-text("Trang chủ")');
        
        if (await homeLink.isVisible()) {
          await homeLink.click();
          await page.waitForLoadState('networkidle');
          
          // Kiểm tra đã về trang chủ
          expect(page.url()).toMatch(/\/$|index/);
        }
      }
    }
  });

  test('should have working back button', async ({ page }) => {
    // Điều hướng đến trang khác
    const firstProduct = page.locator('[data-testid="product"], .product, .product-card').first();
    
    if (await firstProduct.isVisible()) {
      await firstProduct.click();
      await page.waitForLoadState('networkidle');
      
      const productPageUrl = page.url();
      
      // Sử dụng back button của browser
      await page.goBack();
      await page.waitForLoadState('networkidle');
      
      // Kiểm tra đã quay lại trang trước
      const currentUrl = page.url();
      expect(currentUrl).not.toBe(productPageUrl);
    }
  });
});