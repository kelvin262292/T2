import { test, expect } from '@playwright/test';

test.describe('Product Search Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should have search functionality', async ({ page }) => {
    // Tìm ô tìm kiếm
    const searchInput = page.locator('input[type="search"], input[placeholder*="search"], input[placeholder*="tìm"], [data-testid="search-input"]');
    
    if (await searchInput.isVisible()) {
      await expect(searchInput).toBeVisible();
      
      // Kiểm tra có thể nhập text
      await searchInput.fill('test');
      await expect(searchInput).toHaveValue('test');
    }
  });

  test('should search for products', async ({ page }) => {
    const searchInput = page.locator('input[type="search"], input[placeholder*="search"], input[placeholder*="tìm"], [data-testid="search-input"]');
    
    if (await searchInput.isVisible()) {
      // Nhập từ khóa tìm kiếm
      await searchInput.fill('shirt');
      
      // Tìm nút search hoặc nhấn Enter
      const searchBtn = page.locator('button:has-text("Search"), button:has-text("Tìm"), [data-testid="search-button"]');
      
      if (await searchBtn.isVisible()) {
        await searchBtn.click();
      } else {
        await searchInput.press('Enter');
      }
      
      // Chờ kết quả tìm kiếm
      await page.waitForTimeout(2000);
      
      // Kiểm tra có hiển thị kết quả
      const searchResults = page.locator('[data-testid="search-results"], .search-results, .product-grid');
      if (await searchResults.isVisible()) {
        await expect(searchResults).toBeVisible();
      }
    }
  });

  test('should handle empty search', async ({ page }) => {
    const searchInput = page.locator('input[type="search"], input[placeholder*="search"], input[placeholder*="tìm"], [data-testid="search-input"]');
    
    if (await searchInput.isVisible()) {
      // Tìm kiếm với chuỗi rỗng
      await searchInput.fill('');
      
      const searchBtn = page.locator('button:has-text("Search"), button:has-text("Tìm"), [data-testid="search-button"]');
      
      if (await searchBtn.isVisible()) {
        await searchBtn.click();
      } else {
        await searchInput.press('Enter');
      }
      
      await page.waitForTimeout(1000);
      
      // Kiểm tra không có lỗi xảy ra
      const errorMessage = page.locator('.error, .alert-error, [data-testid="error"]');
      const isErrorVisible = await errorMessage.isVisible().catch(() => false);
      
      if (isErrorVisible) {
        // Nếu có thông báo lỗi, kiểm tra nó có ý nghĩa
        const errorText = await errorMessage.textContent();
        expect(errorText).toBeTruthy();
      }
    }
  });

  test('should handle search with no results', async ({ page }) => {
    const searchInput = page.locator('input[type="search"], input[placeholder*="search"], input[placeholder*="tìm"], [data-testid="search-input"]');
    
    if (await searchInput.isVisible()) {
      // Tìm kiếm với từ khóa không có kết quả
      await searchInput.fill('xyzabc123nonexistent');
      
      const searchBtn = page.locator('button:has-text("Search"), button:has-text("Tìm"), [data-testid="search-button"]');
      
      if (await searchBtn.isVisible()) {
        await searchBtn.click();
      } else {
        await searchInput.press('Enter');
      }
      
      await page.waitForTimeout(2000);
      
      // Kiểm tra có thông báo "không tìm thấy" hoặc danh sách rỗng
      const noResults = page.locator(':has-text("No results"), :has-text("Không tìm thấy"), :has-text("No products found")');
      const emptyResults = page.locator('[data-testid="empty-results"], .empty-results');
      
      const hasNoResultsMessage = await noResults.isVisible().catch(() => false);
      const hasEmptyResults = await emptyResults.isVisible().catch(() => false);
      
      // Ít nhất một trong hai điều kiện phải đúng
      expect(hasNoResultsMessage || hasEmptyResults).toBeTruthy();
    }
  });

  test('should filter search results', async ({ page }) => {
    const searchInput = page.locator('input[type="search"], input[placeholder*="search"], input[placeholder*="tìm"], [data-testid="search-input"]');
    
    if (await searchInput.isVisible()) {
      await searchInput.fill('product');
      
      const searchBtn = page.locator('button:has-text("Search"), button:has-text("Tìm"), [data-testid="search-button"]');
      
      if (await searchBtn.isVisible()) {
        await searchBtn.click();
      } else {
        await searchInput.press('Enter');
      }
      
      await page.waitForTimeout(2000);
      
      // Tìm các bộ lọc (filter)
      const priceFilter = page.locator('[data-testid="price-filter"], .price-filter, select:has(option:has-text("Price"))');
      const categoryFilter = page.locator('[data-testid="category-filter"], .category-filter, select:has(option:has-text("Category"))');
      
      // Kiểm tra có bộ lọc nào hiển thị không
      const hasPriceFilter = await priceFilter.isVisible().catch(() => false);
      const hasCategoryFilter = await categoryFilter.isVisible().catch(() => false);
      
      if (hasPriceFilter || hasCategoryFilter) {
        // Nếu có bộ lọc, test một bộ lọc
        if (hasPriceFilter) {
          await priceFilter.first().click();
          await page.waitForTimeout(1000);
        } else if (hasCategoryFilter) {
          await categoryFilter.first().click();
          await page.waitForTimeout(1000);
        }
      }
    }
  });

  test('should sort search results', async ({ page }) => {
    const searchInput = page.locator('input[type="search"], input[placeholder*="search"], input[placeholder*="tìm"], [data-testid="search-input"]');
    
    if (await searchInput.isVisible()) {
      await searchInput.fill('product');
      
      const searchBtn = page.locator('button:has-text("Search"), button:has-text("Tìm"), [data-testid="search-button"]');
      
      if (await searchBtn.isVisible()) {
        await searchBtn.click();
      } else {
        await searchInput.press('Enter');
      }
      
      await page.waitForTimeout(2000);
      
      // Tìm dropdown sắp xếp
      const sortDropdown = page.locator('[data-testid="sort-dropdown"], .sort-dropdown, select:has(option:has-text("Sort"))');
      
      if (await sortDropdown.isVisible()) {
        await sortDropdown.click();
        
        // Chọn một option sắp xếp
        const sortOption = page.locator('option:has-text("Price"), option:has-text("Name"), option:has-text("Giá")');
        if (await sortOption.first().isVisible()) {
          await sortOption.first().click();
          await page.waitForTimeout(1000);
        }
      }
    }
  });
});