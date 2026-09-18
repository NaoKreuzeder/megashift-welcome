import Link from 'next/link';
import SiteLayout from './SiteLayout';
import Seo from './Seo';
import styles from '@/styles/Legal.module.css';

export default function LegalLayout({ title, description, path, sections = [], children, draft = false }) {
  return (
    <SiteLayout>
      <Seo title={`${title} | Megashift`} description={description} path={path} noindex={draft} />
      <div className={styles.page}>
        <header className={styles.heading}>
          <Link href="/" className={styles.backLink}>← Back to Megashift</Link>
          <p className={styles.kicker}>MEGASHIFT / LEGAL</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>
        {draft && <div className={styles.draftBanner}><strong>Draft</strong><span>This page is not yet approved for publication.</span></div>}
        <div className={styles.contentGrid}>
          {sections.length > 0 && <nav className={styles.toc} aria-label="On this page"><span>ON THIS PAGE</span>{sections.map(section => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}</nav>}
          <article className={styles.content}>{children}</article>
        </div>
      </div>
    </SiteLayout>
  );
}
