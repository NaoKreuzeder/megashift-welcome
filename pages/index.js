import Image from 'next/image';
import SiteLayout from '@/components/SiteLayout';
import Seo from '@/components/Seo';
import StoreButtons from '@/components/StoreButtons';
import Phone from '@/components/Phone';
import { site } from '@/lib/site';
import styles from '@/styles/Home.module.css';

const features = [
  ['Shift calendar', 'Give early, late, night and off days their own look and understand your month at a glance.'],
  ['Templates & rotations', 'Create reusable shift templates and repeat rotating schedules instead of entering the same pattern again and again.'],
  ['Working hours', 'Let Megashift calculate hours from your shifts and breaks, including target/actual values and overtime.'],
  ['Reports & statistics', 'Review shift counts, working-time distribution and longer-term trends from your own entries and settings.'],
  ['Income estimates', 'Track hourly, monthly or per-shift income settings and allowances alongside your schedule.'],
  ['Device calendars', 'See appointments from calendars available on your device next to your work schedule.'],
];

export default function Home() {
  return (
    <SiteLayout>
      <Seo />
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>FOR LIFE BEYOND NINE TO FIVE</p>
            <h1>Your shifts.<br />Your time.<br /><span>Your life.</span></h1>
            <p className={styles.lead}>Plan your shifts, keep track of your working hours and make room for everything else. Megashift is your everyday work calendar.</p>
            <StoreButtons />
            <p className={styles.meta}>Free download · iOS &amp; Android · Optional PRO features</p>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.glow} />
            <div className={styles.backPhone}><Phone view="reports" priority /></div>
            <div className={styles.frontPhone}><Phone view="calendar" priority /></div>
          </div>
        </div>
        <div className={styles.audience}><span>Built for changing schedules</span><p>Healthcare · Emergency services · Production · Hospitality · Shift work</p></div>
      </section>

      <section id="features" className={styles.features}>
        <div className={styles.sectionTitle}><p>01 / YOUR WORK CALENDAR</p><h2>Every week is different.<br /><span>Your planning can stay simple.</span></h2><p>From the first early shift to your next day off, keep the important parts of your schedule together.</p></div>
        <div className={styles.featureGrid}>{features.map(([title,text],i)=><article key={title}><div className={styles.featureNumber}>{String(i+1).padStart(2,'0')}</div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className={styles.insights}>
        <div className={styles.insightVisual}><Phone view="reports" /></div>
        <div className={styles.insightCopy}><p className={styles.sectionKicker}>02 / HOURS &amp; INSIGHTS</p><h2>Less counting.<br /><span>More clarity.</span></h2><p>Megashift turns the schedule you already enter into useful totals and reports.</p><ul><li><strong>Working hours</strong><span>Automatic totals based on shifts and breaks.</span></li><li><strong>Actual vs. target</strong><span>Keep an eye on overtime and balances.</span></li><li><strong>Working-time distribution</strong><span>Understand day, night, weekend and holiday work.</span></li><li><strong>Income overview</strong><span>Estimate earnings using the rules you configure.</span></li></ul></div>
      </section>

      <section id="pro" className={styles.proSection}>
        <div className={styles.sectionTitle}><p>03 / MEGASHIFT PRO</p><h2>Take your schedule<br /><span>a little further.</span></h2><p>Optional features for people who want their calendar on more devices, on paper or connected with their personal plans.</p></div>
        <div className={styles.proGrid}>
          <article><div className={styles.proCopy}><span>PRO</span><h3>Cloud Sync &amp; Backup</h3><p>Keep your Megashift data synchronized and backed up across supported devices.</p></div><Image src="/images/cloud.svg" alt="Megashift cloud sync shown on phone and tablet" width={640} height={623} unoptimized /></article>
          <article><div className={styles.proCopy}><span>PRO</span><h3>Share &amp; Print</h3><p>Create PDF views of schedules and reports so you can save, share or print them.</p></div><Image src="/images/pdf.svg" alt="Megashift PDF exports" width={640} height={789} unoptimized /></article>
        </div>
      </section>

      <section className={styles.calendarSection}>
        <div className={styles.calendarCopy}><p className={styles.sectionKicker}>04 / WORK MEETS LIFE</p><h2>Your appointments.<br /><span>Alongside your shifts.</span></h2><p>With permission, Megashift can show appointments from calendars available through Android or iOS. The integration uses your device calendar system rather than the Google Calendar API.</p><p className={styles.small}>Calendar integration is an optional PRO feature. Calendar availability depends on your device and calendar accounts.</p></div>
        <div className={styles.calendarPhones}><Phone view="appointments" /><Phone view="themes" /></div>
      </section>

      <section className={styles.faq}>
        <div><p className={styles.sectionKicker}>GOOD TO KNOW</p><h2>A few things<br /><span>you might wonder.</span></h2><p>Need something else? <a href={`mailto:${site.supportEmail}`}>Contact support</a>.</p></div>
        <div className={styles.faqList}>
          <details><summary>Who is Megashift for?</summary><p>Megashift is designed for people with changing, rotating or irregular work schedules, including early, late, night and off days.</p></details>
          <details><summary>Can I use Megashift without PRO?</summary><p>Yes. Megashift is free to download. Optional paid entitlements unlock additional features such as ongoing Cloud Sync &amp; Backup, PDF sharing/printing and device-calendar integration.</p></details>
          <details><summary>Does Megashift connect directly to Google Calendar?</summary><p>No. Calendar appointments are accessed through the calendar interfaces provided by Android or iOS when you grant permission.</p></details>
          <details><summary>Are the income and work-hour calculations official payroll records?</summary><p>No. They are planning and estimation tools based on the data and rules you enter. Always compare important values with the relevant official source.</p></details>
        </div>
      </section>

      <section id="download" className={styles.download}>
        <Image src="/images/megashift-icon.svg" alt="Megashift app icon" width={84} height={84} unoptimized />
        <p>YOUR NEXT SHIFT. SORTED.</p><h2>More life.<br /><span>Less juggling.</span></h2><p className={styles.downloadLead}>Your work calendar is a download away.</p><StoreButtons light /><small>Available for iOS and Android. Free with optional in-app purchases.</small>
      </section>
    </SiteLayout>
  );
}
