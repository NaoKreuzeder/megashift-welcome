import Head from 'next/head';
import { site } from '@/lib/site';
import { locales } from '@/lib/i18n/locales';

export default function Seo({
  title = 'Megashift — Shift calendar & work hours',
  description = 'Plan shifts, track working hours, view reports and keep your work schedule in one clear calendar. Megashift is available for iOS and Android.',
  path = '/',
  noindex = false,
  locale,
}) {
  const canonical = `${site.url}${path}`;
  const isLocalizedHome = locale && (path === '/' || path === `/${locale.slug}`);
  const isLocalizedSupport = locale && path.endsWith('/support');

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#081024" />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonical} />
      {isLocalizedHome && locales.map(item => (
        <link key={item.slug} rel="alternate" hrefLang={item.htmlLang} href={`${site.url}${item.slug === 'en' ? '/' : `/${item.slug}`}`} />
      ))}
      {isLocalizedHome && <link rel="alternate" hrefLang="x-default" href={`${site.url}/`} />}
      {isLocalizedSupport && locales.map(item => (
        <link key={item.slug} rel="alternate" hrefLang={item.htmlLang} href={`${site.url}${item.slug === 'en' ? '/support' : `/${item.slug}/support`}`} />
      ))}
      {isLocalizedSupport && <link rel="alternate" hrefLang="x-default" href={`${site.url}/support`} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Megashift" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${site.url}/images/megashift-icon.svg`} />
      <meta name="twitter:card" content="summary" />
    </Head>
  );
}
