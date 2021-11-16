const puppeteer = require('puppeteer-extra')

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

// That's it, the rest is puppeteer usage as normal 😊
puppeteer.launch({ headless: true }).then(async browser => {
  const page = await browser.newPage()
  await page.setViewport({ width: 800, height: 600 })

  console.log(`Testing adblocker plugin..`)
  await page.goto('https://www.vanityfair.com')
  await page.waitForTimeout(1000)
  await page.screenshot({ path: 'adblocker.png', fullPage: true })

  console.log(`Testing the stealth plugin..`)
  await page.goto('https://bot.sannysoft.com')
  await page.waitForTimeout(5000)
  await page.screenshot({ path: 'stealth.png', fullPage: true })

  console.log(`All done, check the screenshots. ✨`)
  await browser.close()
})