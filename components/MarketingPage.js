import Image from 'next/image';
import SiteLayout from '@/components/SiteLayout';
import Seo from '@/components/Seo';
import StoreButtons from '@/components/StoreButtons';
import LocalizedVisual from '@/components/LocalizedVisual';
import Phone from '@/components/Phone';
import { site } from '@/lib/site';
import styles from '@/styles/Home.module.css';

export default function MarketingPage({ locale, content }) {
  const localizedPath = locale.slug === 'en' ? '/' : `/${locale.slug}`;
  return (
    <SiteLayout locale={locale} content={content}>
      <Seo
        title={content.seo.title}
        description={content.seo.description}
        path={localizedPath}
        locale={locale}
      />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
            <h1>
              {content.hero.lines.map((line, index) => (
                <span key={line} className={index === content.hero.lines.length - 1 ? styles.heroAccent : undefined}>
                  {line}{index < content.hero.lines.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className={styles.lead}>{content.hero.lead}</p>
            <StoreButtons locale={locale} />
            <p className={styles.meta}>{content.hero.meta}</p>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.glow} />
            <div className={styles.backPhone}>
              <Phone locale={locale} view="reports" alt={content.insights.title} priority />
            </div>
            <div className={styles.frontPhone}>
              <Phone locale={locale} view="calendar" alt={content.features[0][0]} priority />
            </div>
          </div>
        </div>
        <div className={styles.audience}>
          <span>{content.audience.label}</span>
          <p>{content.audience.text}</p>
        </div>
      </section>

      <section id="features" className={styles.features}>
        <div className={styles.sectionTitle}>
          <p>{content.calendar.kicker}</p>
          <h2>{content.calendar.title}<br /><span>{content.calendar.accent}</span></h2>
          <p>{content.calendar.intro}</p>
        </div>
        <div className={styles.featureGrid}>
          {content.features.map(([title, text], i) => (
            <article key={title}>
              <div className={styles.featureNumber}>{String(i + 1).padStart(2, '0')}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.insights}>
        <div className={styles.insightVisual}>
          <Phone locale={locale} view="reports" alt={content.insights.title} />
        </div>
        <div className={styles.insightCopy}>
          <p className={styles.sectionKicker}>{content.insights.kicker}</p>
          <h2>{content.insights.title}<br /><span>{content.insights.accent}</span></h2>
          <p>{content.insights.intro}</p>
          <ul>
            {content.insights.items.map(([title, text]) => (
              <li key={title}><strong>{title}</strong><span>{text}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section id="pro" className={styles.proSection}>
        <div className={styles.sectionTitle}>
          <p>{content.pro.kicker}</p>
          <h2>{content.pro.title}<br /><span>{content.pro.accent}</span></h2>
          <p>{content.pro.intro}</p>
        </div>
        <div className={styles.proGrid}>
          <article>
            <div className={styles.proCopy}><span>PRO</span><h3>{content.pro.cloudTitle}</h3><p>{content.pro.cloudDesc}</p></div>
            <LocalizedVisual locale={locale} view="cloud" alt={content.pro.cloudTitle} className={styles.proVisual} />
          </article>
          <article>
            <div className={styles.proCopy}><span>PRO</span><h3>{content.pro.pdfTitle}</h3><p>{content.pro.pdfDesc}</p></div>
            <LocalizedVisual locale={locale} view="pdf" alt={content.pro.pdfTitle} className={styles.proVisual} />
          </article>
        </div>
      </section>

      <section className={styles.calendarSection}>
        <div className={styles.calendarCopy}>
          <p className={styles.sectionKicker}>{content.appointments.kicker}</p>
          <h2>{content.appointments.title}<br /><span>{content.appointments.accent}</span></h2>
          <p>{content.appointments.desc}</p>
          <p className={styles.small}>{content.appointments.small}</p>
        </div>
        <div className={styles.calendarPhones}>
          <div className={styles.calendarPrimary}><Phone locale={locale} view="appointments" alt={content.appointments.title} /></div>
          <div className={styles.calendarSecondary}><Phone locale={locale} view="calendar" decorative /></div>
        </div>
      </section>

      <section className={styles.faq}>
        <div>
          <p className={styles.sectionKicker}>{content.faq.kicker}</p>
          <h2>{content.faq.title}<br /><span>{content.faq.accent}</span></h2>
          <p>{content.faq.need} <a href={`mailto:${site.supportEmail}`}>{content.faq.contact}</a>.</p>
        </div>
        <div className={styles.faqList}>
          {content.faq.items.map(([question, answer]) => (
            <details key={question}><summary>{question}</summary><p>{answer}</p></details>
          ))}
        </div>
      </section>

      <section id="download" className={styles.download}>
        <Image src="/images/megashift-icon.svg" alt="Megashift app icon" width={84} height={84} unoptimized />
        <p>{content.download.kicker}</p>
        <h2>{content.download.title}<br /><span>{content.download.accent}</span></h2>
        <p className={styles.downloadLead}>{content.download.lead}</p>
        <StoreButtons locale={locale} />
        <small>{content.download.small}</small>
      </section>
    </SiteLayout>
  );
}
