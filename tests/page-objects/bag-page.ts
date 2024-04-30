import { Locator, Page, expect } from '@playwright/test'
import { ProductData } from '../data/product'

const NOT_VISIBLE_TIMEOUT_MS = 15000

export class BagPage {
  private readonly page: Page
  private readonly firstProductRemove: Locator
  private readonly miniBag: Locator

  constructor(page: Page) {
    this.page = page
    this.firstProductRemove = page
      .locator("[data-locator-id*='miniBag-remove-']")
      .first()
    this.miniBag = this.page.locator(
      "[data-locator-id='header-miniBag-select']",
    )
  }

  public async expectProductNotInBag(productId: string) {
    await expect(
      this.page.locator(
        `[data-locator-id="miniBag-productImage-${productId}-select"]`,
      ),
    ).not.toBeVisible({
      timeout: NOT_VISIBLE_TIMEOUT_MS,
    })
  }

  public async expectRemainingProductsInBag(productData: ProductData) {
    for (let i = 1; i < productData.length; i += 1) {
      await expect(
        this.page.locator(
          `[data-locator-id="miniBag-productImage-${productData[i].productId}-select"]`,
        ),
      ).toBeVisible({
        timeout: NOT_VISIBLE_TIMEOUT_MS,
      })
    }
  }

  public async expectProductInBag(productId: string) {
    // Had to put this here as sometimes the automatic bag preview wouldn't show on add
    if (await this.miniBag.isVisible()) {
      await this.miniBag.click()
    }

    await expect(
      this.page.locator(
        `[data-locator-id="miniBag-productImage-${productId}-select"]`,
      ),
    ).toBeVisible({
      timeout: NOT_VISIBLE_TIMEOUT_MS,
    })
  }

  public async removeFirstProduct() {
    await this.firstProductRemove.click()
  }
}
