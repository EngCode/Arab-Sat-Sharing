import path from 'path';
import { getDate } from './getDate';
import { isProduction } from './isProduction';

// Use Testing Sample in dev for a faster response. Use Live Page in Production
const samplePage = path.resolve(process.env.PLAYWRIGHT_SAMPLE_PAGE_PATH);

export function getPageLink() {
  const { _, day, month, year } = getDate().today();

  const liveOnSatLink = 'https://liveonsat.com/2day.php';
  const todaysLink = `${liveOnSatLink}?start_dd=${day}&start_mm=${month}&start_yyyy=${year}&end_dd=${day}&end_mm=${month}&end_yyyy=${year}`;

  return isProduction() ? todaysLink : samplePage;
}
