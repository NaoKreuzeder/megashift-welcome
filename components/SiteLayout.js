import { useRef, useState } from 'react';
import Link from 'next/link';
import Brand from './Brand';
import { site } from '@/lib/site';
import styles from '@/styles/Site.module.css';

export default function SiteLayout({ children }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  const close = () => setOpen(false);
  const keyDown = event => {
    if (event.key === 'Escape' && open) {
      close();
      menuButton.current?.focus();
    }
  };
  return (
    <div className={styles.site}>
      <a href="#main" className={styles.skipLink}>Skip to content</a>
      <header className={styles.header} onKeyDown={keyDown}>
        <div className={styles.headerInner}>
          <Brand />
          <button ref={menuButton} type="button" className={styles.menuButton} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(v => !v)}>
            <span /><span />
          </button>
          <nav id="site-navigation" className={`${styles.nav} ${open ? styles.navOpen : ''}`} aria-label="Main navigation">
            <Link href="/#features" onClick={close}>Features</Link>
            <Link href="/#pro" onClick={close}>Megashift PRO</Link>
            <Link href="/support" onClick={close}>Support</Link>
            <Link href="/#download" onClick={close} className={styles.headerCta}>Get Megashift</Link>
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div><Brand /><p>Plan your shifts. Understand your time.<br />Make room for everything else.</p></div>
          <nav aria-label="Footer navigation">
            <div><span>EXPLORE</span><Link href="/#features">Features</Link><Link href="/#pro">PRO</Link><Link href="/#download">Download</Link></div>
            <div><span>HELP &amp; LEGAL</span><Link href="/support">Support</Link><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Service</Link></div>
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
