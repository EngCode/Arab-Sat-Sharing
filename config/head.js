import settings from './settings';
import meta from './meta/meta';
import link from './link/link';

const head = {
  title: settings.title,
  htmlAttrs: { lang: settings.lang },
  link,
  meta,
};
export default head;
