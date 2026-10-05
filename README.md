# sauce-tests
Test of sauce from claude code

Playwright + TypeScript tests for https://www.saucedemo.com, implementing TC1–TC12 from `testcases.md` with the page object pattern.

```
npm ci
npx playwright install chromium   # first time only
npx playwright test               # run all tests
npx playwright show-report        # open the HTML report
```

- `pages/` – page objects (`LoginPage`, `InventoryPage`, `CartPage`, `CheckoutPage`) and the `fixtures.ts` that injects them into tests
- `tests/` – specs, each named with its TC ID
- `.github/workflows/playwright.yml` – runs the suite on every push and uploads the HTML report as an artifact
