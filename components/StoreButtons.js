import { site } from '@/lib/site';
import styles from '@/styles/Site.module.css';

const APPLE_BADGE = 'https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83';
const GOOGLE_BADGE = 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png';

export default function StoreButtons() {
  return (
    <div className={styles.storeButtons}>
      <a className={styles.storeBadgeLink} href={site.appStore} target="_blank" rel="noreferrer" aria-label="Download Megashift on the App Store">
        <img className={styles.storeBadge} src={APPLE_BADGE} alt="Download on the App Store" />
      </a>
      <a className={styles.storeBadgeLink} href={site.googlePlay} target="_blank" rel="noreferrer" aria-label="Get Megashift on Google Play">
        <img className={styles.storeBadge} src={GOOGLE_BADGE} alt="Get it on Google Play" />
      </a>
    </div>
  );
}
