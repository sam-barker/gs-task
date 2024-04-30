import { Locator, Page, expect } from '@playwright/test'

const NOT_VISIBLE_TIMEOUT_MS = 10000

export class ProductPage {
  private readonly page: Page
  private readonly cookieConsentAcceptBtn: Locator
  private readonly sizeBtn: Locator
  private readonly addToBagBtn: Locator

  constructor(page: Page) {
    this.page = page
    this.cookieConsentAcceptBtn = this.page.locator(
      '#onetrust-accept-btn-handler',
    )
    this.sizeBtn = this.page.locator("[data-locator-id='pdp-size-s-select']")
    this.addToBagBtn = this.page.locator(
      "[data-locator-id='pdp-addToBag-submit']",
    )
  }

  public async navigateTo(productSku: string) {
    await this.page.goto(`https://uk.gymshark.com/products/${productSku}`)
  }

  public async dismissCookieBanner() {
    await this.cookieConsentAcceptBtn.click()
    await expect(this.cookieConsentAcceptBtn).not.toBeVisible({
      timeout: NOT_VISIBLE_TIMEOUT_MS,
    })
  }

  public async addToBag(expectedItemsInBag: number) {
    await this.sizeBtn.click()
    await this.addToBagBtn.click()
    await this.page.waitForSelector(`text=${expectedItemsInBag}`)
  }
}
