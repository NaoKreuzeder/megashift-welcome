import Image from 'next/image';
import { useState } from 'react';
import { getScreenshot } from '@/lib/screenshots.mjs';
import styles from '@/styles/Site.module.css';

/** One lossless, native-resolution asset — never a locale atlas or CSS sprite. */
export default function LocalizedVisual({ locale, view = 'calendar', alt = '', className = '', priority = false }) {
  const requested = getScreenshot(locale, view);
  const fallback = getScreenshot('en', view);
  const [failedSrc, setFailedSrc] = useState(null);
  // Key the failure to the requested URL so client-side language changes do not
  // retain an English fallback for a different, healthy localized image.
  const image = failedSrc === requested.src ? fallback : requested;

  return (
    <Image
      src={image.src}
      width={image.width}
      height={image.height}
      alt={alt}
      className={`${styles.localizedVisual} ${className}`}
      priority={priority}
      unoptimized
      onError={() => {
        if (requested.src !== fallback.src) setFailedSrc(requested.src);
      }}
    />
  );
}
