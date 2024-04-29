import { Given, When, Then } from '@cucumber/cucumber'
import { page } from './world'
import { expect } from '@playwright/test'

const productData = [
  {
    productSku: 'gymshark-speed-t-shirt-black-aw23',
    productId: '39654522814667',
  },
  {
    productSku: 'gymshark-speed-t-shirt-artificial-teal-ss24',
    productId: '39654820577483',
  },
  {
    productSku: 'gymshark-speed-t-shirt-titanium-blue-ss24',
    productId: '39654815924427',
  },
]

Given('the user is on a product page', async () => {
  await page.goto(
    'https://uk.gymshark.com/products/gymshark-speed-t-shirt-black-aw23',
  )
  await page.locator('#onetrust-accept-btn-handler').click()
})

Given('multiple products are in my bag', async () => {
  for (let i = 0; i < productData.length; i += 1) {
    const productSku = productData[i].productSku
    await page.goto(`https://uk.gymshark.com/products/${productSku}`)
    if (i === 0) {
      await page.locator('#onetrust-accept-btn-handler').click()
    }
    await page.locator("[data-locator-id='pdp-size-s-select']").click()
    await page.locator("[data-locator-id='pdp-addToBag-submit']").click()
    await page.waitForSelector(`text=${i + 1}`)
  }
})

When('adding the product to the bag', async () => {
  await page.locator("[data-locator-id='pdp-size-s-select']").click()
  await page.locator("[data-locator-id='pdp-addToBag-submit']").click()
})

When('I remove the first product in my bag', async () => {
  await page.locator("[data-locator-id*='miniBag-remove-']").first().click()
})

Then('the first product should no longer appear in the bag', async () => {
  await expect(
    page.locator(
      `[data-locator-id="miniBag-productImage-${productData[0].productId}-select"]`,
    ),
  ).not.toBeVisible({
    timeout: 20000,
  })
})

Then('the other products in the bag remain', async () => {
  for (let i = 1; i < productData.length; i += 1) {
    await expect(
      page.locator(
        `[data-locator-id="miniBag-productImage-${productData[i].productId}-select"]`,
      ),
    ).toBeVisible({
      timeout: 20000,
    })
  }
})

Then('the product should appear in the bag', async () => {
  const miniBagIcon = page.locator("[data-locator-id='header-miniBag-select']")
  if (await miniBagIcon.isVisible()) {
    await miniBagIcon.click()
  }

  await expect(
    page.locator(
      `[data-locator-id="miniBag-productImage-${productData[0].productId}-select"]`,
    ),
  ).toBeVisible({
    timeout: 20000,
  })
})
