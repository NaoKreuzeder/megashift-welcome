import MarketingPage from '@/components/MarketingPage';
import content from '@/content/locales/en';
import { localeBySlug } from '@/lib/i18n/locales';

export default function Home() {
  return <MarketingPage locale={localeBySlug.en} content={content} />;
}
