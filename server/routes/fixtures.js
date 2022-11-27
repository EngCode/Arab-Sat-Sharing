import { initPlaywrightBrowser } from '../utils/initPlaywrightBrowser';
import { initPlaywrightPage } from '../utils/initPlaywrightPage';
import { getPageLink } from '../helpers/getPageLink';
import { getSupportedCompetitons } from '../helpers/getSupportedCompetitons';
import { scrapeFixtures } from '../utils/scrapeFixtures';

// Config
const liveOnSatPageUrl = getPageLink(); // Could be live or sample page,depending on procces.env
const supportedCompetitons = getSupportedCompetitons();

export default defineEventHandler(async () => {
  try {
    // Setting up a browser and navigating to the page
    const browser = await initPlaywrightBrowser();
    const page = await initPlaywrightPage(browser);
    await page.goto(liveOnSatPageUrl, { timeout: 60000 });

    // Scraping fixtures data
    const fixtures = await scrapeFixtures(page, supportedCompetitons);

    // Closing the browser
    await browser.close();

    //Returning data
    return fixtures;
  } catch (error) {
    console.log(error);
    return error;
  }
});
