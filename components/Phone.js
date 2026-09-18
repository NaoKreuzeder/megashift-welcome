import Image from 'next/image';
import styles from '@/styles/Site.module.css';

const meta = {
  calendar: { width: 420, height: 908, alt: 'Megashift monthly shift calendar' },
  appointments: { width: 420, height: 908, alt: 'Megashift calendar showing shifts and appointments' },
  reports: { width: 420, height: 929, alt: 'Megashift reports and work-time statistics' },
  hours: { width: 420, height: 908, alt: 'Megashift working-time overview' },
  themes: { width: 420, height: 908, alt: 'Megashift color themes' },
};

export default function Phone({ view = 'calendar', priority = false, decorative = false, className = '' }) {
  const data = meta[view];
  return (
    <div className={`${styles.phone} ${className}`} aria-hidden={decorative || undefined}>
      <Image src={`/images/${view}.svg`} width={data.width} height={data.height} alt={decorative ? '' : data.alt} priority={priority} unoptimized className={styles.phoneImage} />
    </div>
  );
}
