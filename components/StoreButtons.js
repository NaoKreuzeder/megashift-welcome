import { site } from '@/lib/site';
import styles from '@/styles/Site.module.css';

export default function StoreButtons({ light = false }) {
  return (
    <div className={styles.storeButtons}>
      <a className={`${styles.storeButton} ${light ? styles.storeLight : ''}`} href={site.appStore} target="_blank" rel="noreferrer">
        <span className={styles.storeGlyph} aria-hidden="true"></span>
        <span><small>Download on the</small><strong>App Store</strong></span>
      </a>
      <a className={`${styles.storeButton} ${light ? styles.storeLight : ''}`} href={site.googlePlay} target="_blank" rel="noreferrer">
        <span className={styles.playGlyph} aria-hidden="true">▶</span>
        <span><small>Get it on</small><strong>Google Play</strong></span>
      </a>
    </div>
  );
}
