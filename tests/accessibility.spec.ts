import AxeBuilder from '@axe-core/playwright';
import { type Page, type TestInfo } from '@playwright/test';
import { test, expect, USERS, PASSWORD } from '../pages/fixtures';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

async function seriousViolations(page: Page, testInfo: TestInfo, name: string) {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  await testInfo.attach(`axe-${name}.json`, {
    body: JSON.stringify(results.violations, null, 2),
    contentType: 'application/json',
  });
  return results.violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map((v) => `${v.id} (${v.impact}, ${v.nodes.length} elements): ${v.help}`);
}

test('TC12 Accessibility', async ({ page, loginPage, inventoryPage }, testInfo) => {
  await loginPage.goto();
  expect(await seriousViolations(page, testInfo, 'login')).toEqual([]);

  await loginPage.login(USERS.standard, PASSWORD);
  await expect(inventoryPage.items).toHaveCount(6);
  expect(await seriousViolations(page, testInfo, 'inventory')).toEqual([]);
});
