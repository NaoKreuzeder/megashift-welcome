import { useRouter } from 'next/router';
import { locales, localePath } from '@/lib/i18n/locales';
import styles from '@/styles/Site.module.css';

export default function LanguageSelector({ locale }) {
  const router = useRouter();

  const changeLanguage = event => {
    const slug = event.target.value;
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const onSupportPage = router.pathname.endsWith('/support');
    const target = onSupportPage
      ? `${slug === 'en' ? '/support' : `/${slug}/support`}${hash}`
      : localePath(slug, hash);
    router.push(target);
  };

  return (
    <label className={styles.languageSelect}>
      <select value={locale.slug} onChange={changeLanguage} aria-label="Language">
        {locales.map(item => <option key={item.slug} value={item.slug}>{item.label}</option>)}
      </select>
    </label>
  );
}
