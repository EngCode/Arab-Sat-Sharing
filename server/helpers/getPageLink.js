import path from 'path';
import { getDate } from './getDate';
import { isProduction } from './isProduction';

// Use Testing Sample in dev for a faster response. Use Live Page in Production
const samplePage = path.resolve(process.env.PLAYWRIGHT_SAMPLE_PAGE_PATH);

export function getPageLink() {
  const { en } = getDate().today();

  const liveOnSatLink = 'https://liveonsat.com/2day.php';
  const todaysLink = `${liveOnSatLink}?start_dd=${en.day}&start_mm=${en.month}&start_yyyy=${en.year}&end_dd=${en.day}&end_mm=${en.month}&end_yyyy=${en.year}`;

  return isProduction() ? todaysLink : samplePage;
}
