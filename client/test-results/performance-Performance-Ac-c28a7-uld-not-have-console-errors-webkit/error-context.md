# Test info

- Name: Performance & Accessibility Tests >> should not have console errors
- Location: C:\Users\AB\Documents\New folder\client\tests\performance.spec.ts:218:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 0
Received: 1
    at C:\Users\AB\Documents\New folder\client\tests\performance.spec.ts:237:35
```

# Page snapshot

```yaml
- text: Upgrade Required
```

# Test source

```ts
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
  174 |       // Hoặc page vẫn có basic structure
  175 |       const basicElements = page.locator('html, body');
  176 |       const hasBasicStructure = await basicElements.count() > 0;
  177 |       
  178 |       expect(hasErrorMessage || hasBasicStructure).toBeTruthy();
  179 |     }
  180 |     
  181 |     // Reset network
  182 |     await page.context().setOffline(false);
  183 |   });
  184 |
  185 |   test('should have proper ARIA attributes', async ({ page }) => {
  186 |     await page.goto('/');
  187 |     await page.waitForLoadState('networkidle');
  188 |     
  189 |     // Kiểm tra navigation có role
  190 |     const nav = page.locator('nav');
  191 |     if (await nav.count() > 0) {
  192 |       const role = await nav.first().getAttribute('role');
  193 |       const ariaLabel = await nav.first().getAttribute('aria-label');
  194 |       
  195 |       // Nav should have proper role or aria-label
  196 |       expect(role === 'navigation' || ariaLabel).toBeTruthy();
  197 |     }
  198 |     
  199 |     // Kiểm tra buttons có accessible names
  200 |     const buttons = page.locator('button');
  201 |     const buttonCount = await buttons.count();
  202 |     
  203 |     if (buttonCount > 0) {
  204 |       for (let i = 0; i < Math.min(buttonCount, 5); i++) {
  205 |         const button = buttons.nth(i);
  206 |         if (await button.isVisible()) {
  207 |           const text = await button.textContent();
  208 |           const ariaLabel = await button.getAttribute('aria-label');
  209 |           const title = await button.getAttribute('title');
  210 |           
  211 |           // Button should have accessible name
  212 |           expect(text?.trim() || ariaLabel || title).toBeTruthy();
  213 |         }
  214 |       }
  215 |     }
  216 |   });
  217 |
  218 |   test('should not have console errors', async ({ page }) => {
  219 |     const consoleErrors: string[] = [];
  220 |     
  221 |     page.on('console', msg => {
  222 |       if (msg.type() === 'error') {
  223 |         consoleErrors.push(msg.text());
  224 |       }
  225 |     });
  226 |     
  227 |     await page.goto('/');
  228 |     await page.waitForLoadState('networkidle');
  229 |     
  230 |     // Filter out known non-critical errors
  231 |     const criticalErrors = consoleErrors.filter(error => 
  232 |       !error.includes('favicon') && 
  233 |       !error.includes('404') &&
  234 |       !error.includes('net::ERR_')
  235 |     );
  236 |     
> 237 |     expect(criticalErrors.length).toBe(0);
      |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  238 |     
  239 |     if (criticalErrors.length > 0) {
  240 |       console.log('Console errors found:', criticalErrors);
  241 |     }
  242 |   });
  243 | });
```