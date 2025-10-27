import { chromium, Browser, Page } from "playwright";

export async function captureSerpScreenshot(keyword: string, location: string = "", headless: boolean = true): Promise<{ screenshotPath: string; crowding: any }> {
  let browser: Browser | undefined;
  try {
    browser = await chromium.launch({ headless });
    const context = await browser.newContext({
      viewport: { width: 1280, height: 2000 },
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0 Safari/537.36", // Consistent User-Agent
      locale: "en-US",
    });
    const page: Page = await context.newPage();

    const query = encodeURIComponent(keyword + " " + location);
    const url = `https://www.google.com/search?q=${query}`;
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000); // Wait for 2 seconds to ensure content loads

    // Ensure the screenshots directory exists
    const screenshotDir = "./screenshots";
    // This part would typically involve Node.js 'fs' module to create directory,
    // but since we are in a cloud function environment, we might not have direct file system access
    // or it might be handled by the environment. For local testing, this would be:
    // import * as fs from 'fs';
    // if (!fs.existsSync(screenshotDir)) {
    //   fs.mkdirSync(screenshotDir, { recursive: true });
    // }

    const screenshotPath = `${screenshotDir}/${keyword.replace(/\s+/g, "_")}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });

    // Due to Google's anti-bot measures, direct scraping for crowding metrics is unreliable.
    // Returning placeholder data for now.
    const crowding = {
      ads: 0,
      maps: 0,
      shopping: 0,
      organic: 0,
      crowdingPct: 0, // Placeholder
    };

    return {
      screenshotPath,
      crowding,
    };
  } catch (error: any) {
    console.error(`Error capturing SERP screenshot for "${keyword}":`, error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
