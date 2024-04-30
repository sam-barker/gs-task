import { After, Before, setDefaultTimeout } from '@cucumber/cucumber'
import { Browser, chromium, Page } from 'playwright'
import { ProductPage } from '../page-objects/product-page'
import { BagPage } from '../page-objects/bag-page'

let page: Page
let browser: Browser
let productPage: ProductPage
let bagPage: BagPage

setDefaultTimeout(60000)

Before(async () => {
  try {
    browser = await chromium.launch({ headless: false })
    const context = await browser.newContext()
    page = await context.newPage()

    productPage = new ProductPage(page)
    bagPage = new BagPage(page)
  } catch (e) {
    console.error('Something went wrong when starting the browser')
  }
  return page
})

After(async () => {
  await browser.close()
})

export { page, browser, productPage, bagPage }
