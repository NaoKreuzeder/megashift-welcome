import { useRef, useState } from 'react';
import Link from 'next/link';
import Brand from './Brand';
import LanguageSelector from './LanguageSelector';
import { site } from '@/lib/site';
import { localePath, localeBySlug } from '@/lib/i18n/locales';
import enContent from '@/content/locales/en';
import styles from '@/styles/Site.module.css';

export default function SiteLayout({ children, locale = localeBySlug.en, content = enContent }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  const close = () => setOpen(false);
  const keyDown = event => {
    if (event.key === 'Escape' && open) {
      close();
      menuButton.current?.focus();
    }
  };
  const featuresHref = localePath(locale.slug, '#features');
  const proHref = localePath(locale.slug, '#pro');
  const downloadHref = localePath(locale.slug, '#download');
  const supportHref = locale.slug === 'en' ? '/support' : `/${locale.slug}/support`;

  return (
    <div className={styles.site}>
      <a href="#main" className={styles.skipLink}>Skip to content</a>
      <header className={styles.header} onKeyDown={keyDown}>
        <div className={styles.headerInner}>
          <Brand href={localePath(locale.slug)} />
          <button ref={menuButton} type="button" className={styles.menuButton} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(v => !v)}>
            <span /><span />
          </button>
          <nav id="site-navigation" className={`${styles.nav} ${open ? styles.navOpen : ''}`} aria-label="Main navigation">
            <Link href={featuresHref} onClick={close}>{content.nav.features}</Link>
            <Link href={proHref} onClick={close}>{content.nav.pro}</Link>
            <Link href={supportHref} onClick={close}>{content.nav.support}</Link>
            <LanguageSelector locale={locale} />
            <Link href={downloadHref} onClick={close} className={styles.headerCta}>{content.nav.get}</Link>
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div><Brand href={localePath(locale.slug)} /><p>{content.footer.tagline}</p></div>
          <nav aria-label="Footer navigation">
            <div>
              <span>{content.footer.explore}</span>
              <Link href={featuresHref}>{content.footer.features}</Link>
              <Link href={proHref}>{content.footer.pro}</Link>
              <Link href={downloadHref}>{content.footer.download}</Link>
            </div>
            <div>
              <span>{content.footer.help}</span>
              <Link href={supportHref}>{content.footer.support}</Link>
              <Link href="/privacy">{content.footer.privacy}</Link>
              <Link href="/terms">{content.footer.terms}</Link>
            </div>
          </nav>
        </div>
        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} Megashift · Pattarachanok Klinjan</span>
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
        </div>
      </footer>
    </div>
  );
}
