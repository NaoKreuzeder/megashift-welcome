import SupportPage from '@/components/SupportPage';
import content from '@/content/locales/en';
import { localeBySlug } from '@/lib/i18n/locales';

export default function Support() {
  return <SupportPage locale={localeBySlug.en} content={content} />;
}
