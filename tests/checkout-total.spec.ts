import { test, expect, USERS, PASSWORD } from '../pages/fixtures';

test('TC7 Checkout total', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage }) => {
  await loginPage.goto();
  await loginPage.login(USERS.standard, PASSWORD);
  await inventoryPage.addProductsToCart(3);
  await expect(inventoryPage.cartBadge).toHaveText('3');

  await inventoryPage.openCart();
  await cartPage.checkout();
  await checkoutPage.fillInformation('Test', 'User', '12345');
  await checkoutPage.continue();
  await expect(page).toHaveURL(/\/checkout-step-two\.html$/);

  const { itemPrices, itemTotal, tax, total } = await checkoutPage.summary();
  expect(itemPrices).toHaveLength(3);
  expect(itemTotal).toBe(itemPrices.reduce((sum, price) => sum + price, 0));
  expect(tax).toBeGreaterThan(0);
  expect(total).toBe(itemTotal + tax);
});
