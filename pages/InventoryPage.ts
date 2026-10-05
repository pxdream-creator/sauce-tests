import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly title: Locator;
  readonly items: Locator;
  readonly itemImages: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(readonly page: Page) {
    this.title = page.getByTestId('title');
    this.items = page.getByTestId('inventory-item');
    this.itemImages = this.items.locator('img');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  async addFirstProductToCart() {
    await this.items.first().getByRole('button', { name: 'Add to cart' }).click();
  }

  async addProductsToCart(count: number) {
    for (let i = 0; i < count; i++) {
      await this.items.nth(i).getByRole('button', { name: 'Add to cart' }).click();
    }
  }

  async imageFileNames(): Promise<string[]> {
    return this.itemImages.evaluateAll((imgs) =>
      imgs.map((img) => new URL((img as HTMLImageElement).src).pathname.split('/').pop() ?? ''),
    );
  }

  async openCart() {
    await this.cartLink.click();
  }
}
