import { After, Before, setDefaultTimeout } from '@cucumber/cucumber'
import { Browser, chromium, Page } from 'playwright'

let page: Page
let browser: Browser

setDefaultTimeout(60000)

Before(async () => {
  try {
    browser = await chromium.launch({ headless: false })
    const context = await browser.newContext()
    page = await context.newPage()
  } catch (e) {
    console.error('Something went wrong when starting the browser')
  }
  return page
})

After(async () => {
  await browser.close()
})

export { page, browser }
