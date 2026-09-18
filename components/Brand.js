import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Site.module.css';

export default function Brand({ large = false, href = '/' }) {
  return (
    <Link href={href} className={`${styles.brand} ${large ? styles.brandLarge : ''}`} aria-label="Megashift home">
      <Image src="/images/megashift-icon.svg" width={large ? 72 : 42} height={large ? 72 : 42} alt="" priority={large} unoptimized />
      <span>Megashift<span className={styles.brandDot}>.</span></span>
    </Link>
  );
}
