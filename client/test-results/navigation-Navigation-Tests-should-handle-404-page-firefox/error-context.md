# Test info

- Name: Navigation Tests >> should handle 404 page
- Location: C:\Users\AB\Documents\New folder\client\tests\navigation.spec.ts:112:3

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
    at C:\Users\AB\Documents\New folder\client\tests\navigation.spec.ts:123:45
```

# Page snapshot

```yaml
- text: Upgrade Required
```

# Test source

```ts
   23 |           // Kiểm tra URL đã thay đổi
   24 |           const currentUrl = page.url();
   25 |           expect(currentUrl).toContain(href.replace('#', ''));
   26 |           
   27 |           // Quay lại trang chủ
   28 |           await page.goto('/');
   29 |           await page.waitForLoadState('networkidle');
   30 |         }
   31 |       }
   32 |     }
   33 |   });
   34 |
   35 |   test('should navigate to product details', async ({ page }) => {
   36 |     // Tìm sản phẩm đầu tiên
   37 |     const firstProduct = page.locator('[data-testid="product"], .product, .product-card').first();
   38 |     
   39 |     if (await firstProduct.isVisible()) {
   40 |       await firstProduct.click();
   41 |       await page.waitForLoadState('networkidle');
   42 |       
   43 |       // Kiểm tra đã chuyển đến trang chi tiết sản phẩm
   44 |       const productTitle = page.locator('h1, .product-title, [data-testid="product-title"]');
   45 |       const productPrice = page.locator('.price, .product-price, [data-testid="product-price"]');
   46 |       const productDescription = page.locator('.description, .product-description, [data-testid="product-description"]');
   47 |       
   48 |       // Ít nhất một trong các element này phải hiển thị
   49 |       const hasTitleVisible = await productTitle.isVisible().catch(() => false);
   50 |       const hasPriceVisible = await productPrice.isVisible().catch(() => false);
   51 |       const hasDescriptionVisible = await productDescription.isVisible().catch(() => false);
   52 |       
   53 |       expect(hasTitleVisible || hasPriceVisible || hasDescriptionVisible).toBeTruthy();
   54 |     }
   55 |   });
   56 |
   57 |   test('should navigate to categories', async ({ page }) => {
   58 |     // Tìm link categories
   59 |     const categoryLinks = page.locator('a:has-text("Categories"), a:has-text("Danh mục"), [data-testid="category-link"]');
   60 |     
   61 |     if (await categoryLinks.first().isVisible()) {
   62 |       await categoryLinks.first().click();
   63 |       await page.waitForLoadState('networkidle');
   64 |       
   65 |       // Kiểm tra có hiển thị danh sách categories
   66 |       const categoryList = page.locator('[data-testid="category-list"], .category-list, .categories');
   67 |       const categoryItems = page.locator('[data-testid="category-item"], .category-item, .category');
   68 |       
   69 |       const hasListVisible = await categoryList.isVisible().catch(() => false);
   70 |       const hasItemsVisible = await categoryItems.first().isVisible().catch(() => false);
   71 |       
   72 |       expect(hasListVisible || hasItemsVisible).toBeTruthy();
   73 |     }
   74 |   });
   75 |
   76 |   test('should navigate to about page', async ({ page }) => {
   77 |     // Tìm link About
   78 |     const aboutLink = page.locator('a:has-text("About"), a:has-text("Về chúng tôi"), [data-testid="about-link"]');
   79 |     
   80 |     if (await aboutLink.isVisible()) {
   81 |       await aboutLink.click();
   82 |       await page.waitForLoadState('networkidle');
   83 |       
   84 |       // Kiểm tra có nội dung about
   85 |       const aboutContent = page.locator('h1:has-text("About"), h1:has-text("Về chúng tôi"), .about-content');
   86 |       
   87 |       if (await aboutContent.isVisible()) {
   88 |         await expect(aboutContent).toBeVisible();
   89 |       }
   90 |     }
   91 |   });
   92 |
   93 |   test('should navigate to contact page', async ({ page }) => {
   94 |     // Tìm link Contact
   95 |     const contactLink = page.locator('a:has-text("Contact"), a:has-text("Liên hệ"), [data-testid="contact-link"]');
   96 |     
   97 |     if (await contactLink.isVisible()) {
   98 |       await contactLink.click();
   99 |       await page.waitForLoadState('networkidle');
  100 |       
  101 |       // Kiểm tra có form liên hệ hoặc thông tin liên hệ
  102 |       const contactForm = page.locator('form, .contact-form, [data-testid="contact-form"]');
  103 |       const contactInfo = page.locator('.contact-info, [data-testid="contact-info"]');
  104 |       
  105 |       const hasFormVisible = await contactForm.isVisible().catch(() => false);
  106 |       const hasInfoVisible = await contactInfo.isVisible().catch(() => false);
  107 |       
  108 |       expect(hasFormVisible || hasInfoVisible).toBeTruthy();
  109 |     }
  110 |   });
  111 |
  112 |   test('should handle 404 page', async ({ page }) => {
  113 |     // Truy cập một URL không tồn tại
  114 |     await page.goto('/nonexistent-page-12345');
  115 |     
  116 |     // Kiểm tra có hiển thị trang 404 hoặc redirect về trang chủ
  117 |     const notFoundText = page.locator(':has-text("404"), :has-text("Not Found"), :has-text("Page not found")');
  118 |     const homeRedirect = page.locator('h1, .logo, nav');
  119 |     
  120 |     const has404Visible = await notFoundText.isVisible().catch(() => false);
  121 |     const hasHomeVisible = await homeRedirect.isVisible().catch(() => false);
  122 |     
> 123 |     expect(has404Visible || hasHomeVisible).toBeTruthy();
      |                                             ^ Error: expect(received).toBeTruthy()
  124 |   });
  125 |
  126 |   test('should have working breadcrumbs', async ({ page }) => {
  127 |     // Điều hướng đến một trang con
  128 |     const firstProduct = page.locator('[data-testid="product"], .product, .product-card').first();
  129 |     
  130 |     if (await firstProduct.isVisible()) {
  131 |       await firstProduct.click();
  132 |       await page.waitForLoadState('networkidle');
  133 |       
  134 |       // Kiểm tra có breadcrumbs
  135 |       const breadcrumbs = page.locator('.breadcrumb, .breadcrumbs, [data-testid="breadcrumb"]');
  136 |       
  137 |       if (await breadcrumbs.isVisible()) {
  138 |         // Kiểm tra có link về trang chủ
  139 |         const homeLink = breadcrumbs.locator('a:has-text("Home"), a:has-text("Trang chủ")');
  140 |         
  141 |         if (await homeLink.isVisible()) {
  142 |           await homeLink.click();
  143 |           await page.waitForLoadState('networkidle');
  144 |           
  145 |           // Kiểm tra đã về trang chủ
  146 |           expect(page.url()).toMatch(/\/$|index/);
  147 |         }
  148 |       }
  149 |     }
  150 |   });
  151 |
  152 |   test('should have working back button', async ({ page }) => {
  153 |     // Điều hướng đến trang khác
  154 |     const firstProduct = page.locator('[data-testid="product"], .product, .product-card').first();
  155 |     
  156 |     if (await firstProduct.isVisible()) {
  157 |       await firstProduct.click();
  158 |       await page.waitForLoadState('networkidle');
  159 |       
  160 |       const productPageUrl = page.url();
  161 |       
  162 |       // Sử dụng back button của browser
  163 |       await page.goBack();
  164 |       await page.waitForLoadState('networkidle');
  165 |       
  166 |       // Kiểm tra đã quay lại trang trước
  167 |       const currentUrl = page.url();
  168 |       expect(currentUrl).not.toBe(productPageUrl);
  169 |     }
  170 |   });
  171 | });
```