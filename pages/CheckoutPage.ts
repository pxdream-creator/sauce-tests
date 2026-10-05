import { type Locator, type Page } from '@playwright/test';
import { toCents } from './money';

export class CheckoutPage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly error: Locator;
  readonly completeHeader: Locator;
  readonly itemPrices: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  constructor(readonly page: Page) {
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');
    this.error = page.getByTestId('error');
    this.completeHeader = page.getByTestId('complete-header');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.subtotalLabel = page.getByTestId('subtotal-label');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label');
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  /** Reads the order overview amounts, in cents. */
  async summary() {
    const prices = await this.itemPrices.allTextContents();
    return {
      itemPrices: prices.map(toCents),
      itemTotal: toCents(await this.subtotalLabel.innerText()),
      tax: toCents(await this.taxLabel.innerText()),
      total: toCents(await this.totalLabel.innerText()),
    };
  }

  async finish() {
    await this.finishButton.click();
  }
}
