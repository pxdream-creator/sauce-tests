import { test, expect, USERS, PASSWORD } from '../pages/fixtures';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
});

test('TC1 Valid login', async ({ page, loginPage, inventoryPage }) => {
  await loginPage.login(USERS.standard, PASSWORD);

  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(inventoryPage.title).toHaveText('Products');
  await expect(inventoryPage.items).toHaveCount(6);
});

test('TC2 Locked-out user', async ({ loginPage }) => {
  await loginPage.login(USERS.lockedOut, PASSWORD);

  await expect(loginPage.error).toBeVisible();
  await expect(loginPage.error).toContainText('Sorry, this user has been locked out.');
});

test('TC3 Wrong password', async ({ page, loginPage }) => {
  await loginPage.login(USERS.standard, 'wrong_password');

  await expect(loginPage.error).toContainText(
    'Username and password do not match any user in this service',
  );
  await expect(page).toHaveURL('/');
  await expect(loginPage.loginButton).toBeVisible();
});
