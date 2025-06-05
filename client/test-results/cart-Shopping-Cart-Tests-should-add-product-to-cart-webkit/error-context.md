# Test info

- Name: Shopping Cart Tests >> should add product to cart
- Location: C:\Users\AB\Documents\New folder\client\tests\cart.spec.ts:9:3

# Error details

```
Error: Timed out 10000ms waiting for expect(locator).toBeVisible()

Locator: locator('[data-testid="product"], .product, .product-card').first()
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 10000ms
  - waiting for locator('[data-testid="product"], .product, .product-card').first()

    at C:\Users\AB\Documents\New folder\client\tests\cart.spec.ts:12:32
```

# Page snapshot

```yaml
- text: Upgrade Required
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Shopping Cart Tests', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     await page.goto('/');
   6 |     await page.waitForLoadState('networkidle');
   7 |   });
   8 |
   9 |   test('should add product to cart', async ({ page }) => {
   10 |     // Tìm sản phẩm đầu tiên
   11 |     const firstProduct = page.locator('[data-testid="product"], .product, .product-card').first();
>  12 |     await expect(firstProduct).toBeVisible({ timeout: 10000 });
      |                                ^ Error: Timed out 10000ms waiting for expect(locator).toBeVisible()
   13 |     
   14 |     // Click vào sản phẩm để xem chi tiết
   15 |     await firstProduct.click();
   16 |     
   17 |     // Tìm nút "Add to Cart" hoặc "Thêm vào giỏ hàng"
   18 |     const addToCartBtn = page.locator('button:has-text("Add to Cart"), button:has-text("Thêm vào giỏ"), [data-testid="add-to-cart"]');
   19 |     
   20 |     if (await addToCartBtn.isVisible()) {
   21 |       await addToCartBtn.click();
   22 |       
   23 |       // Kiểm tra thông báo thành công hoặc cart icon có số lượng
   24 |       const cartIcon = page.locator('[data-testid="cart-icon"], .cart-icon, .shopping-cart');
   25 |       await expect(cartIcon).toBeVisible({ timeout: 5000 });
   26 |     }
   27 |   });
   28 |
   29 |   test('should open cart modal/page', async ({ page }) => {
   30 |     // Tìm và click vào cart icon
   31 |     const cartIcon = page.locator('[data-testid="cart-icon"], .cart-icon, .shopping-cart, button:has-text("Cart")');
   32 |     
   33 |     if (await cartIcon.isVisible()) {
   34 |       await cartIcon.click();
   35 |       
   36 |       // Kiểm tra cart modal hoặc trang cart được mở
   37 |       const cartModal = page.locator('[data-testid="cart-modal"], .cart-modal, .cart-sidebar');
   38 |       const cartPage = page.locator('[data-testid="cart-page"], .cart-page, h1:has-text("Cart")');
   39 |       
   40 |       const isModalVisible = await cartModal.isVisible().catch(() => false);
   41 |       const isPageVisible = await cartPage.isVisible().catch(() => false);
   42 |       
   43 |       expect(isModalVisible || isPageVisible).toBeTruthy();
   44 |     }
   45 |   });
   46 |
   47 |   test('should update product quantity in cart', async ({ page }) => {
   48 |     // Thêm sản phẩm vào cart trước
   49 |     const firstProduct = page.locator('[data-testid="product"], .product, .product-card').first();
   50 |     if (await firstProduct.isVisible()) {
   51 |       await firstProduct.click();
   52 |       
   53 |       const addToCartBtn = page.locator('button:has-text("Add to Cart"), button:has-text("Thêm vào giỏ"), [data-testid="add-to-cart"]');
   54 |       if (await addToCartBtn.isVisible()) {
   55 |         await addToCartBtn.click();
   56 |         await page.waitForTimeout(1000);
   57 |       }
   58 |     }
   59 |     
   60 |     // Mở cart
   61 |     const cartIcon = page.locator('[data-testid="cart-icon"], .cart-icon, .shopping-cart, button:has-text("Cart")');
   62 |     if (await cartIcon.isVisible()) {
   63 |       await cartIcon.click();
   64 |       
   65 |       // Tìm nút tăng số lượng
   66 |       const increaseBtn = page.locator('button:has-text("+"), [data-testid="increase-quantity"], .quantity-increase');
   67 |       if (await increaseBtn.first().isVisible()) {
   68 |         await increaseBtn.first().click();
   69 |         
   70 |         // Kiểm tra số lượng đã tăng
   71 |         const quantityInput = page.locator('input[type="number"], [data-testid="quantity"], .quantity-input');
   72 |         if (await quantityInput.first().isVisible()) {
   73 |           const quantity = await quantityInput.first().inputValue();
   74 |           expect(parseInt(quantity)).toBeGreaterThan(1);
   75 |         }
   76 |       }
   77 |     }
   78 |   });
   79 |
   80 |   test('should remove product from cart', async ({ page }) => {
   81 |     // Thêm sản phẩm vào cart trước
   82 |     const firstProduct = page.locator('[data-testid="product"], .product, .product-card').first();
   83 |     if (await firstProduct.isVisible()) {
   84 |       await firstProduct.click();
   85 |       
   86 |       const addToCartBtn = page.locator('button:has-text("Add to Cart"), button:has-text("Thêm vào giỏ"), [data-testid="add-to-cart"]');
   87 |       if (await addToCartBtn.isVisible()) {
   88 |         await addToCartBtn.click();
   89 |         await page.waitForTimeout(1000);
   90 |       }
   91 |     }
   92 |     
   93 |     // Mở cart
   94 |     const cartIcon = page.locator('[data-testid="cart-icon"], .cart-icon, .shopping-cart, button:has-text("Cart")');
   95 |     if (await cartIcon.isVisible()) {
   96 |       await cartIcon.click();
   97 |       
   98 |       // Tìm nút xóa sản phẩm
   99 |       const removeBtn = page.locator('button:has-text("Remove"), button:has-text("Xóa"), [data-testid="remove-item"], .remove-item');
  100 |       if (await removeBtn.first().isVisible()) {
  101 |         await removeBtn.first().click();
  102 |         
  103 |         // Kiểm tra sản phẩm đã bị xóa
  104 |         await page.waitForTimeout(1000);
  105 |         const cartItems = page.locator('[data-testid="cart-item"], .cart-item');
  106 |         const itemCount = await cartItems.count();
  107 |         expect(itemCount).toBe(0);
  108 |       }
  109 |     }
  110 |   });
  111 |
  112 |   test('should calculate total price correctly', async ({ page }) => {
```