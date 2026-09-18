import Head from 'next/head';
import { site } from '@/lib/site';

export default function Seo({
  title = 'Megashift — Shift calendar & work hours',
  description = 'Plan shifts, track working hours, view reports and keep your work schedule in one clear calendar. Megashift is available for iOS and Android.',
  path = '/',
  noindex = false,
}) {
  const canonical = `${site.url}${path}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#081024" />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonical} />
      <link rel="icon" href="/images/megashift-icon.svg" />
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
