import { Given, When, Then } from '@cucumber/cucumber'
import { productPage, bagPage } from './world'
import { productData } from '../data/product'

Given('the user is on a product page', async () => {
  await productPage.navigateTo(productData[0].productSku)
  await productPage.dismissCookieBanner()
})

Given('multiple products are in my bag', async () => {
  for (let i = 0; i < productData.length; i += 1) {
    const productSku = productData[i].productSku
    await productPage.navigateTo(productSku)
    if (i === 0) {
      await productPage.dismissCookieBanner()
    }
    await productPage.addToBag(i + 1)
  }
})

When('adding the product to the bag', async () => {
  await productPage.addToBag(1)
})

When('I remove the first product in my bag', async () => {
  await bagPage.removeFirstProduct()
})

Then('the first product should no longer appear in the bag', async () => {
  await bagPage.expectProductNotInBag(productData[0].productId)
})

Then('the other products in the bag remain', async () => {
  await bagPage.expectRemainingProductsInBag(productData)
})

Then('the product should appear in the bag', async () => {
  await bagPage.expectProductInBag(productData[0].productId)
})
