import SiteLayout from '@/components/SiteLayout';
import Seo from '@/components/Seo';
import { site } from '@/lib/site';
import styles from '@/styles/Support.module.css';

export default function SupportPage({ locale, content }) {
  const path = locale.slug === 'en' ? '/support' : `/${locale.slug}/support`;
  return (
    <SiteLayout locale={locale} content={content}>
      <Seo title={content.support.seoTitle} description={content.support.seoDescription} path={path} locale={locale} />
      <section className={styles.hero}>
        <p className={styles.kicker}>{content.support.kicker}</p>
        <h1>{content.support.title}<br /><span>{content.support.accent}</span></h1>
        <p>{content.support.intro}</p>
        <a className={styles.emailButton} href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
      </section>
      <section className={styles.grid}>
        <article><h2>{content.support.problemTitle}</h2><p>{content.support.problem}</p></article>
        <article><h2>{content.support.privacyTitle}</h2><p>{content.support.privacy}</p></article>
        <article><h2>{content.support.purchasesTitle}</h2><p>{content.support.purchases}</p></article>
        <article><h2>{content.support.basicsTitle}</h2><p>{content.support.basics}</p></article>
      </section>
    </SiteLayout>
  );
}
