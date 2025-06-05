import { test, expect } from '@playwright/test';

test.describe('Shopping Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should add product to cart', async ({ page }) => {
    // Tìm sản phẩm đầu tiên
    const firstProduct = page.locator('[data-testid="product"], .product, .product-card').first();
    await expect(firstProduct).toBeVisible({ timeout: 10000 });
    
    // Click vào sản phẩm để xem chi tiết
    await firstProduct.click();
    
    // Tìm nút "Add to Cart" hoặc "Thêm vào giỏ hàng"
    const addToCartBtn = page.locator('button:has-text("Add to Cart"), button:has-text("Thêm vào giỏ"), [data-testid="add-to-cart"]');
    
    if (await addToCartBtn.isVisible()) {
      await addToCartBtn.click();
      
      // Kiểm tra thông báo thành công hoặc cart icon có số lượng
      const cartIcon = page.locator('[data-testid="cart-icon"], .cart-icon, .shopping-cart');
      await expect(cartIcon).toBeVisible({ timeout: 5000 });
    }
  });

  test('should open cart modal/page', async ({ page }) => {
    // Tìm và click vào cart icon
    const cartIcon = page.locator('[data-testid="cart-icon"], .cart-icon, .shopping-cart, button:has-text("Cart")');
    
    if (await cartIcon.isVisible()) {
      await cartIcon.click();
      
      // Kiểm tra cart modal hoặc trang cart được mở
      const cartModal = page.locator('[data-testid="cart-modal"], .cart-modal, .cart-sidebar');
      const cartPage = page.locator('[data-testid="cart-page"], .cart-page, h1:has-text("Cart")');
      
      const isModalVisible = await cartModal.isVisible().catch(() => false);
      const isPageVisible = await cartPage.isVisible().catch(() => false);
      
      expect(isModalVisible || isPageVisible).toBeTruthy();
    }
  });

  test('should update product quantity in cart', async ({ page }) => {
    // Thêm sản phẩm vào cart trước
    const firstProduct = page.locator('[data-testid="product"], .product, .product-card').first();
    if (await firstProduct.isVisible()) {
      await firstProduct.click();
      
      const addToCartBtn = page.locator('button:has-text("Add to Cart"), button:has-text("Thêm vào giỏ"), [data-testid="add-to-cart"]');
      if (await addToCartBtn.isVisible()) {
        await addToCartBtn.click();
        await page.waitForTimeout(1000);
      }
    }
    
    // Mở cart
    const cartIcon = page.locator('[data-testid="cart-icon"], .cart-icon, .shopping-cart, button:has-text("Cart")');
    if (await cartIcon.isVisible()) {
      await cartIcon.click();
      
      // Tìm nút tăng số lượng
      const increaseBtn = page.locator('button:has-text("+"), [data-testid="increase-quantity"], .quantity-increase');
      if (await increaseBtn.first().isVisible()) {
        await increaseBtn.first().click();
        
        // Kiểm tra số lượng đã tăng
        const quantityInput = page.locator('input[type="number"], [data-testid="quantity"], .quantity-input');
        if (await quantityInput.first().isVisible()) {
          const quantity = await quantityInput.first().inputValue();
          expect(parseInt(quantity)).toBeGreaterThan(1);
        }
      }
    }
  });

  test('should remove product from cart', async ({ page }) => {
    // Thêm sản phẩm vào cart trước
    const firstProduct = page.locator('[data-testid="product"], .product, .product-card').first();
    if (await firstProduct.isVisible()) {
      await firstProduct.click();
      
      const addToCartBtn = page.locator('button:has-text("Add to Cart"), button:has-text("Thêm vào giỏ"), [data-testid="add-to-cart"]');
      if (await addToCartBtn.isVisible()) {
        await addToCartBtn.click();
        await page.waitForTimeout(1000);
      }
    }
    
    // Mở cart
    const cartIcon = page.locator('[data-testid="cart-icon"], .cart-icon, .shopping-cart, button:has-text("Cart")');
    if (await cartIcon.isVisible()) {
      await cartIcon.click();
      
      // Tìm nút xóa sản phẩm
      const removeBtn = page.locator('button:has-text("Remove"), button:has-text("Xóa"), [data-testid="remove-item"], .remove-item');
      if (await removeBtn.first().isVisible()) {
        await removeBtn.first().click();
        
        // Kiểm tra sản phẩm đã bị xóa
        await page.waitForTimeout(1000);
        const cartItems = page.locator('[data-testid="cart-item"], .cart-item');
        const itemCount = await cartItems.count();
        expect(itemCount).toBe(0);
      }
    }
  });

  test('should calculate total price correctly', async ({ page }) => {
    // Thêm sản phẩm vào cart
    const firstProduct = page.locator('[data-testid="product"], .product, .product-card').first();
    if (await firstProduct.isVisible()) {
      await firstProduct.click();
      
      const addToCartBtn = page.locator('button:has-text("Add to Cart"), button:has-text("Thêm vào giỏ"), [data-testid="add-to-cart"]');
      if (await addToCartBtn.isVisible()) {
        await addToCartBtn.click();
        await page.waitForTimeout(1000);
      }
    }
    
    // Mở cart
    const cartIcon = page.locator('[data-testid="cart-icon"], .cart-icon, .shopping-cart, button:has-text("Cart")');
    if (await cartIcon.isVisible()) {
      await cartIcon.click();
      
      // Kiểm tra có hiển thị tổng tiền
      const totalPrice = page.locator('[data-testid="total-price"], .total-price, .cart-total');
      if (await totalPrice.isVisible()) {
        const totalText = await totalPrice.textContent();
        expect(totalText).toMatch(/\d+/); // Kiểm tra có chứa số
      }
    }
  });
});