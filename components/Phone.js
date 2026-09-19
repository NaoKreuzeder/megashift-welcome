import Image from 'next/image';
import LocalizedVisual from '@/components/LocalizedVisual';
import styles from '@/styles/Site.module.css';

const meta = {
  calendar: { width: 420, height: 908, alt: 'Megashift monthly shift calendar' },
  appointments: { width: 420, height: 908, alt: 'Megashift calendar showing shifts and appointments' },
  reports: { width: 420, height: 929, alt: 'Megashift reports and work-time statistics' },
  hours: { width: 420, height: 908, alt: 'Megashift working-time overview' },
  themes: { width: 420, height: 908, alt: 'Megashift color themes' },
};

export default function Phone({ locale = 'en', view = 'calendar', priority = false, decorative = false, alt, className = '' }) {
  const data = meta[view] || meta.calendar;
  const description = decorative ? '' : (alt ?? data.alt);
  // Retain the legacy, currently unused views for other callers. All three
  // marketing phone views use the new localized assets, including English.
  const legacy = view === 'hours' || view === 'themes';
  return (
    <div className={`${styles.phone} ${className}`} aria-hidden={decorative || undefined}>
      {legacy ? (
        <Image src={`/images/${view}.svg`} width={data.width} height={data.height} alt={description} priority={priority} unoptimized className={styles.phoneImage} />
      ) : (
        <LocalizedVisual locale={locale} view={view} alt={description} priority={priority} className={styles.phoneImage} />
      )}
    </div>
  );
}
