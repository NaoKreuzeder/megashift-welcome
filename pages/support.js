import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import Seo from '@/components/Seo';
import { site } from '@/lib/site';
import styles from '@/styles/Support.module.css';

export default function Support() {
  return (
    <SiteLayout>
      <Seo title="Support | Megashift" description="Contact Megashift support for help with the app, account, purchases or your schedule." path="/support" />
      <section className={styles.hero}>
        <p className={styles.kicker}>MEGASHIFT SUPPORT</p>
        <h1>A little help?<br /><span>We’re here.</span></h1>
        <p>Questions, feedback or something not working as expected? Send us an email and we’ll take a look.</p>
        <a className={styles.emailButton} href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
      </section>
      <section className={styles.grid}>
        <article><h2>Reporting a problem</h2><p>Please include your device model, Android or iOS version, Megashift app version, and a short description of what happened.</p><p>Screenshots can help. Please hide private appointments, account details or other sensitive information first.</p></article>
        <article><h2>Account &amp; privacy requests</h2><p>You can also use the support address for account or privacy questions, including a request to delete your Megashift account and associated cloud data.</p><p>Never send us your password, authentication tokens or payment-card information.</p></article>
        <article><h2>Purchases</h2><p>For subscription cancellation or store billing issues, use the subscription and purchase tools in the App Store or Google Play. If a PRO entitlement is not recognized, contact us with the platform and purchase type.</p></article>
        <article><h2>Looking for the basics?</h2><p><Link href="/#features">Explore Megashift features</Link>, read the <Link href="/privacy">Privacy Policy</Link> or review the <Link href="/terms">Terms of Service</Link>.</p></article>
      </section>
    </SiteLayout>
  );
}
