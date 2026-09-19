import { screenshotLocales, screenshotViews } from './screenshot-assets.mjs';

/** Resolve only known local asset paths; invalid locales use high-resolution English. */
export function getScreenshot(locale = 'en', view = 'calendar') {
  const requested = typeof locale === 'string' ? locale : (locale?.screenshot || locale?.slug);
  const slug = screenshotLocales.includes(requested) ? requested : 'en';
  const name = Object.hasOwn(screenshotViews, view) ? view : 'calendar';
  return {
    ...screenshotViews[name],
    locale: slug,
    view: name,
    src: `/images/screenshots/${slug}/${name}.webp`,
  };
}
