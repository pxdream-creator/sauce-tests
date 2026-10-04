import { test, expect, USERS, PASSWORD } from '../pages/fixtures';

test.beforeEach(async ({ loginPage, inventoryPage }) => {
  await loginPage.goto();
  await loginPage.login(USERS.standard, PASSWORD);
  await expect(inventoryPage.items).toHaveCount(6);
});

test('TC4 Add to cart', async ({ inventoryPage }) => {
  await expect(inventoryPage.cartBadge).toBeHidden();

  await inventoryPage.addFirstProductToCart();

  await expect(inventoryPage.cartBadge).toHaveText('1');
});

test('TC5 Checkout without info', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
  await inventoryPage.addFirstProductToCart();
  await inventoryPage.openCart();
  await cartPage.checkout();
  await expect(page).toHaveURL(/\/checkout-step-one\.html$/);

  await checkoutPage.continue();

  await expect(checkoutPage.error).toHaveText('Error: First Name is required');
  await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
});

test('TC6 Full purchase', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
  await inventoryPage.addFirstProductToCart();
  await inventoryPage.openCart();
  await expect(cartPage.items).toHaveCount(1);
  await cartPage.checkout();

  await checkoutPage.fillInformation('Test', 'User', '12345');
  await checkoutPage.continue();
  await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
  await checkoutPage.finish();

  await expect(page).toHaveURL(/\/checkout-complete\.html$/);
  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
});
