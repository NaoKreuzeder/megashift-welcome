import { locales } from '@/lib/i18n/locales';
import styles from '@/styles/Site.module.css';

const visualConfig = {
  calendar: {
    atlas: '/images/screenshots-phone.avif',
    column: 0,
    columns: 3,
    kind: 'phone',
    fallback: '/images/calendar.svg',
  },
  appointments: {
    atlas: '/images/screenshots-phone.avif',
    column: 1,
    columns: 3,
    kind: 'phone',
    fallback: '/images/appointments.svg',
  },
  reports: {
    atlas: '/images/screenshots-phone.avif',
    column: 2,
    columns: 3,
    kind: 'phone',
    fallback: '/images/reports.svg',
  },
  pdf: {
    atlas: '/images/screenshots-pdf.avif',
    column: 0,
    columns: 1,
    kind: 'pdf',
    fallback: '/images/pdf.svg',
  },
  cloud: {
    atlas: '/images/screenshots-cloud.avif',
    column: 0,
    columns: 1,
    kind: 'cloud',
    fallback: '/images/cloud.svg',
  },
};

export default function LocalizedVisual({ locale, view, alt = '', className = '', phone = false }) {
  const config = visualConfig[view] || visualConfig.calendar;
  const row = Math.max(0, locales.findIndex(item => item.slug === locale.slug));
  const x = config.columns > 1 ? `${(config.column / (config.columns - 1)) * 100}%` : '0%';
  const y = `${(row / Math.max(1, locales.length - 1)) * 100}%`;
  const kindClass = config.kind === 'phone'
    ? styles.localizedPhone
    : config.kind === 'pdf'
      ? styles.localizedPdf
      : styles.localizedCloud;

  const visual = (
    <div
      className={`${styles.localizedVisual} ${kindClass} ${className}`}
      style={{
        '--screenshot-atlas': `url(${config.atlas})`,
        '--screenshot-fallback': `url(${config.fallback})`,
        '--screenshot-position-x': x,
        '--screenshot-position-y': y,
      }}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    />
  );

  return phone ? <div className={styles.phone}>{visual}</div> : visual;
}
