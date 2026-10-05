import { test, expect, USERS, PASSWORD } from '../pages/fixtures';

test('TC8 Problem user', async ({ loginPage, inventoryPage }) => {
  test.fail(true, 'Known bug: problem_user sees the same broken image for every product');

  await loginPage.goto();
  await loginPage.login(USERS.problem, PASSWORD);
  await expect(inventoryPage.items).toHaveCount(6);

  const images = await inventoryPage.imageFileNames();
  expect(new Set(images).size, `image files: ${images.join(', ')}`).toBe(6);
});

test.describe('TC9 Visual regression', () => {
  // Both tests compare the first product's image with the same baseline,
  // taken from standard_user. Only the image is compared, so font rendering
  // differences between machines don't matter.
  const baseline = 'first-product-image.png';

  test('TC9 standard_user matches baseline', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard, PASSWORD);
    await expect(inventoryPage.itemImages.first()).toHaveScreenshot(baseline);
  });

  test('TC9 visual_user differs from baseline', async ({ loginPage, inventoryPage }) => {
    test.fail(true, 'visual_user is expected to render differently from the baseline');

    await loginPage.goto();
    await loginPage.login(USERS.visual, PASSWORD);
    await expect(inventoryPage.itemImages.first()).toHaveScreenshot(baseline, { timeout: 3_000 });
  });
});

const LOGIN_OUTCOMES = [
  { user: USERS.standard, error: null },
  { user: USERS.lockedOut, error: 'Sorry, this user has been locked out.' },
  { user: USERS.problem, error: null },
  { user: USERS.performanceGlitch, error: null },
  { user: USERS.error, error: null },
  { user: USERS.visual, error: null },
];

for (const { user, error } of LOGIN_OUTCOMES) {
  test(`TC10 Data-driven login: ${user}`, async ({ page, loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(user, PASSWORD);

    if (error) {
      await expect(loginPage.error).toContainText(error);
      await expect(page).toHaveURL('/');
    } else {
      // performance_glitch_user takes about 5 seconds to log in.
      await expect(page).toHaveURL(/\/inventory\.html$/, { timeout: 15_000 });
      await expect(inventoryPage.items).toHaveCount(6);
    }
  });
}
