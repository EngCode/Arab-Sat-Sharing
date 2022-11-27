import { chromium as chromiumDev } from 'playwright-chromium';
import { chromium as chromiumProd } from 'playwright-core';
import bundledChromium from 'chrome-aws-lambda';

const args = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-infobars',
  '--single-process',
  '--no-zygote',
  '--window-position=0,0',
  '--ignore-certificate-errors',
  '--ignore-certificate-errors-skip-list',
  '--disable-dev-shm-usage',
  '--disable-accelerated-2d-canvas',
  '--disable-gpu',
  '--disable-notifications',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-component-extensions-with-background-pages',
  '--disable-extensions',
  '--disable-features=TranslateUI,BlinkGenPropertyTrees',
  '--disable-ipc-flooding-protection',
  '--disable-renderer-backgrounding',
  '--enable-features=NetworkService,NetworkServiceInProcess',
  '--metrics-recording-only',
  '--mute-audio',
];

export async function initPlaywrightBrowser() {
  const executablePath = await bundledChromium.executablePath;

  return executablePath
    ? await chromiumProd.launch({ executablePath, headless: true, args })
    : await chromiumDev.launch({ headless: false, args });
}
