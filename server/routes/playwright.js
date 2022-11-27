import { initPlaywrightBrowser } from '../utils/initPlaywrightBrowser';
import { initPlaywrightPage } from '../utils/initPlaywrightPage';
import { getPageLink } from '../helpers/getPageLink';
import { getSupportedCompetitons } from '../helpers/getSupportedCompetitons';
import { scrapeCompetitions } from '../utils/scrapeCompetitions';
import { getDate } from '../helpers/getDate';

// Config
const liveOnSatPageUrl = getPageLink(); // Could be live or sample page,depending on procces.env
const supportedCompetitons = getSupportedCompetitons();
const timeout = Number(process.env.PLAYWRIGHT_TIMEOUT);
const date = getDate().today();

export default defineEventHandler(async () => {
  try {
    // Setting up a browser and navigating to the page
    const browser = await initPlaywrightBrowser();
    const page = await initPlaywrightPage(browser);
    await page.goto(liveOnSatPageUrl, { timeout });

    // Scraping fixtures data
    const competitions = await scrapeCompetitions(page, supportedCompetitons);

    // Closing the browser
    await browser.close();

    //Returning data
    return { date, competitions };
  } catch (error) {
    console.log(error);
    return error;
  }
});
