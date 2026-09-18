import MarketingPage from '@/components/MarketingPage';
import { localizedSlugs, localeBySlug } from '@/lib/i18n/locales';
import { loadContent } from '@/lib/i18n/content';

export default function LocalizedHome({ locale, content }) {
  return <MarketingPage locale={locale} content={content} />;
}

export async function getStaticPaths() {
  return { paths: localizedSlugs.map(locale => ({ params: { locale } })), fallback: false };
}

export async function getStaticProps({ params }) {
  const locale = localeBySlug[params.locale];
  const content = await loadContent(params.locale);
  if (!locale || !content) return { notFound: true };
  return { props: { locale, content } };
}
