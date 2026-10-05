import { test, expect, USERS, PASSWORD } from '../pages/fixtures';

test('TC11 Images blocked', async ({ page, loginPage, inventoryPage }) => {
  const blocked: string[] = [];
  await page.route(/\.(jpe?g|png|svg|webp)(\?.*)?$/, (route) => {
    blocked.push(route.request().url());
    return route.abort();
  });

  await loginPage.goto();
  await loginPage.login(USERS.standard, PASSWORD);

  await expect(inventoryPage.items).toHaveCount(6);
  expect(blocked.length).toBeGreaterThan(0);
  const loadedWidths = await inventoryPage.itemImages.evaluateAll((imgs) =>
    imgs.map((img) => (img as HTMLImageElement).naturalWidth),
  );
  expect(loadedWidths).toEqual([0, 0, 0, 0, 0, 0]);

  await inventoryPage.addFirstProductToCart();
  await expect(inventoryPage.cartBadge).toHaveText('1');
});
