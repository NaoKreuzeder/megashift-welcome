/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import LegalLayout from '@/components/LegalLayout';
import { site } from '@/lib/site';
import release from '@/content/release.json';

const sections = [
  { id: 'provider', title: 'Provider & scope' },
  { id: 'service', title: 'Service & calculations' },
  { id: 'license', title: 'Store terms & license' },
  { id: 'account', title: 'Accounts & your data' },
  { id: 'calendar', title: 'Device calendars' },
  { id: 'pro', title: 'PRO & purchases' },
  { id: 'cloud', title: 'Cloud Sync & Backup' },
  { id: 'third-party', title: 'Third-party services' },
  { id: 'acceptable-use', title: 'Acceptable use & IP' },
  { id: 'availability', title: 'Availability & termination' },
  { id: 'liability', title: 'Warranty & liability' },
  { id: 'law', title: 'Law & changes' },
  { id: 'contact', title: 'Contact' },
];

export default function Terms() {
  return (
    <LegalLayout
      title="Terms of Service"
      description="The terms that govern use of the Megashift app, website, accounts, purchases and cloud features."
      path="/terms"
      sections={sections}
      draft={!release.termsApproved}
    >
      <section id="provider">
        <h2>1. Provider and scope</h2>
        <p><strong>Last updated: September 18, 2026</strong></p>
        <p>
          These Terms of Service ("Terms") govern your use of the Megashift mobile application, the website at <a href={site.url}>{site.url}</a>, and Megashift account, cloud and related services (together, the "Service").
        </p>
        <p>
          By downloading, accessing or using Megashift, creating a Megashift account, or purchasing a Megashift feature, you agree to these Terms to the extent permitted by applicable law. If you do not agree, do not use the Service.
        </p>
        <p>
          <strong>Provider:</strong><br />
          Pattarachanok Klinjan<br />
          1020 Green House Moo 7<br />
          Tambon Nokmuang, Ampur MuangSurin<br />
          Surin 32000<br />
          Thailand
        </p>
        <p>
          <strong>Support:</strong> <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a><br />
          <strong>Website:</strong> <a href={site.url}>{site.url}</a>
        </p>
      </section>

      <section id="service">
        <h2>2. What Megashift provides</h2>
        <p>Megashift is a personal shift calendar, work-hours and schedule planning application. Depending on your device, plan and current app version, features may include:</p>
        <ul>
          <li>work calendars and color-coded shifts;</li>
          <li>reusable shift templates and rotating schedules;</li>
          <li>work-hour, target/actual-hour and overtime calculations;</li>
          <li>reports and statistics;</li>
          <li>income estimates and allowance calculations based on settings you provide;</li>
          <li>notes, holidays and alarms;</li>
          <li>integration with calendars available through your device;</li>
          <li>home-screen widgets;</li>
          <li>PDF export, sharing and printing; and</li>
          <li>account, Cloud Sync &amp; Backup and other PRO features.</li>
        </ul>
        <p>Feature availability can vary by platform, device, region, store, app version and purchase entitlement.</p>

        <h3>Megashift is a planning tool</h3>
        <p>
          Megashift is intended to help you organize and understand your own schedule. It is not an employer timekeeping system, payroll system, accounting service, tax service, legal service or official employment record.
        </p>
        <p>
          Calculations such as work hours, target/actual balances, overtime, income, allowances, night/weekend/holiday allocations and similar results depend on the entries, settings and rules you provide. They may not match an employer's payroll system, collective agreement, employment contract, tax rules, labor law or other official calculation.
        </p>
        <p>
          You are responsible for checking important schedules, working-time records, pay calculations, deadlines and other information against the relevant official source. Do not rely on Megashift as the sole record where an error could have significant employment, financial, legal, medical, safety or other consequences.
        </p>
      </section>

      <section id="license">
        <h2>3. App-store terms and application license</h2>
        <p>
          Megashift is distributed through third-party app stores, including Apple's App Store and Google Play. Your use of those stores, downloads and purchases is also subject to the applicable store terms.
        </p>
        <p>
          For Megashift obtained through Apple's App Store, Apple's <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Licensed Application End User License Agreement (Standard EULA)</a> applies to the license to use the application unless a different valid EULA is expressly provided through Apple. These Terms supplement the applicable Apple terms for Megashift's account, cloud, website and service features; they are not intended to replace Apple's Standard EULA.
        </p>
        <p>
          For Megashift obtained through Google Play, the <a href="https://play.google.com/about/play-terms/">Google Play Terms of Service</a> and applicable Google Play purchase/subscription terms also apply to the store transaction and use of Google Play.
        </p>
        <p>
          Subject to those store terms and these Terms, you receive a personal, limited, non-exclusive, non-transferable and non-sublicensable right to use Megashift on devices you own or control for your own lawful purposes. Any rights that applicable law does not allow us to restrict remain unaffected.
        </p>
      </section>

      <section id="account">
        <h2>4. Accounts, sign-in and your data</h2>
        <p>
          Some features require or benefit from a Megashift account. You may be able to sign in with email/password or supported third-party identity providers such as Google, Apple or X.
        </p>
        <p>You are responsible for:</p>
        <ul>
          <li>providing information that is reasonably accurate when creating or using an account;</li>
          <li>keeping your sign-in credentials and devices secure;</li>
          <li>not sharing authentication links, passwords or tokens with others; and</li>
          <li>notifying us at <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> if you believe your account has been compromised.</li>
        </ul>
        <p>Third-party sign-in services are also governed by the terms and policies of the relevant identity provider.</p>

        <h3>Your data and content</h3>
        <p>
          You retain your rights in the schedules, notes and other content you enter into Megashift ("User Data"). You grant us only the rights reasonably necessary to host, synchronize, back up, process and transmit User Data for the purpose of operating the features you choose to use.
        </p>
        <p>
          How Megashift handles personal information and User Data is described in the <Link href="/privacy">Megashift Privacy Policy</Link>.
        </p>
        <p>You must not use Megashift to store or process content that is unlawful or that you do not have the right to use.</p>
      </section>

      <section id="calendar">
        <h2>5. Device calendars and third-party calendar services</h2>
        <p>
          If you grant calendar permission, Megashift can display calendars and appointments made available through the calendar interfaces of Android or iOS. Megashift can also create, edit or delete calendar events when you initiate those actions.
        </p>
        <p>
          If a device calendar is synchronized with a third-party service such as Google Calendar, Outlook or iCloud, the operating system or calendar provider may synchronize those changes under your account settings and the provider's own terms. Megashift does not control the availability, synchronization timing, accuracy or continued operation of those third-party calendar services.
        </p>
        <p>You should verify important calendar changes in the relevant calendar provider where necessary.</p>
      </section>

      <section id="pro">
        <h2>6. Free version, advertising and PRO features</h2>
        <p>
          Megashift can offer a free version and optional paid features. The free version may include advertising. PRO or other paid entitlements can unlock features and/or remove advertising as indicated in the app at the time of purchase.
        </p>
        <p>
          The exact included features can evolve as Megashift is updated. We will not intentionally remove a paid entitlement in a way that overrides mandatory consumer rights, but individual features can be changed, replaced or discontinued when reasonably necessary for technical, security, legal, platform, product or third-party-service reasons.
        </p>

        <h3>Purchases and subscriptions</h3>
        <p>
          Megashift currently supports purchase options that can include monthly subscriptions, yearly subscriptions and a non-recurring lifetime purchase. The options actually available to you, including price, currency, taxes, eligibility and any free trial, are displayed by the App Store or Google Play and/or in the purchase screen before you confirm the transaction.
        </p>
        <p>
          Monthly and yearly subscriptions automatically renew according to the rules of the store through which you purchased them unless you cancel them before the applicable renewal deadline. Your app store account is charged by Apple or Google, not directly by Megashift.
        </p>
        <p>
          You can manage or cancel a subscription through the subscription-management area of the store account used for the purchase. Uninstalling Megashift, signing out, or requesting deletion of a Megashift account does <strong>not</strong> by itself cancel an App Store or Google Play subscription.
        </p>
        <p>After cancellation, access normally continues until the end of the period already paid for, subject to the applicable store rules and mandatory consumer rights.</p>

        <h3>Free trials</h3>
        <p>
          If a free trial is offered, the duration, eligibility and price after the trial are shown before purchase. Unless the store states otherwise, the trial converts to the selected paid subscription if it is not cancelled within the period required by the applicable store. Trial eligibility can be limited by Apple, Google or the applicable offer terms.
        </p>

        <h3>Lifetime purchase</h3>
        <p>
          A Megashift PRO Lifetime purchase is a one-time, non-recurring purchase and is not a subscription. It is intended to unlock the applicable Megashift PRO entitlement without recurring subscription charges for as long as Megashift and the relevant entitlement remain available and technically supported on the applicable platform. A lifetime purchase does not guarantee that every individual feature, third-party integration or platform capability will remain unchanged or available indefinitely.
        </p>

        <h3>Purchase restoration and refunds</h3>
        <p>
          Purchase restoration depends on the records and rules of Apple, Google and the purchase-management service used by Megashift. You may need to use the same store account and/or Megashift account associated with the original purchase. Legacy purchases may continue to be recognized where supported by the relevant store and entitlement records.
        </p>
        <p>
          Refunds, reversals and billing disputes for App Store or Google Play transactions are generally handled under the policies and procedures of the store that processed the payment. Nothing in these Terms limits any refund, withdrawal or other consumer right that you have under mandatory law.
        </p>
      </section>

      <section id="cloud">
        <h2>7. Cloud Sync &amp; Backup</h2>
        <p>
          Where available and enabled, Cloud Sync &amp; Backup synchronizes selected Megashift data with the cloud so that it can be restored or used across supported devices associated with your account.
        </p>
        <p>
          Ongoing Cloud Sync &amp; Backup is an entitlement-controlled feature. As described in the Privacy Policy, the current app can temporarily perform an initial synchronization for approximately 15 minutes after the first sign-in on a device, including for a user who does not have an ongoing Cloud Sync entitlement. After that initial period, continued synchronization requires the applicable entitlement.
        </p>
        <p>
          Cloud Sync &amp; Backup is designed as a convenience and recovery feature, but no storage or synchronization service can guarantee uninterrupted availability or absolute protection against all data loss, corruption, conflicts or third-party outages. If a schedule or record is especially important, keep or verify an independent copy where appropriate.
        </p>
      </section>

      <section id="third-party">
        <h2>8. Advertising and third-party services</h2>
        <p>
          Megashift uses third-party services for functions such as authentication, cloud storage/synchronization, analytics, crash diagnostics, advertising, purchases, app distribution and website hosting. These can include Supabase, Google/Firebase, Google Mobile Ads, RevenueCat, Apple, Google Play, X and Vercel.
        </p>
        <p>
          Your use of a third-party service may also be subject to that provider's terms and policies. Megashift is not responsible for third-party services outside its reasonable control, including outages, account restrictions, policy changes or discontinued third-party functionality.
        </p>
      </section>

      <section id="acceptable-use">
        <h2>9. Acceptable use and intellectual property</h2>
        <p>You must not:</p>
        <ul>
          <li>use Megashift for unlawful, fraudulent or abusive purposes;</li>
          <li>attempt to gain unauthorized access to Megashift accounts, systems or data;</li>
          <li>interfere with, overload, damage or circumvent security or technical restrictions of the Service;</li>
          <li>use automated means to scrape, probe or abuse the Service in a way that materially disrupts it; or</li>
          <li>copy, reverse engineer, modify, distribute or create derivative works of the app except where and to the extent such restriction is prohibited by applicable law or permitted by applicable open-source licenses.</li>
        </ul>

        <h3>Intellectual property</h3>
        <p>
          Megashift, its software, design, branding, logos, website content and other materials provided by us are owned by or licensed to the provider and are protected by applicable intellectual-property laws. These Terms do not transfer ownership of Megashift or its intellectual property to you.
        </p>
        <p>Open-source components included in Megashift remain subject to their respective licenses. Your User Data remains yours as described above.</p>
      </section>

      <section id="availability">
        <h2>10. Availability, updates, account deletion and termination</h2>
        <p>
          We may release updates, bug fixes, security changes, redesigns and new or changed features. Certain updates can be required for security, compatibility with operating systems/app stores, legal compliance or continued use of online features.
        </p>
        <p>
          We aim to keep Megashift available, but we do not promise uninterrupted or error-free operation. The Service can be temporarily unavailable because of maintenance, software defects, network conditions, third-party outages, platform changes or events outside our reasonable control.
        </p>
        <p>If we materially discontinue a paid online service, we will handle existing paid entitlements consistently with applicable store rules and mandatory consumer law.</p>

        <h3>Account deletion</h3>
        <p>
          You can stop using Megashift at any time. At present, you can request deletion of your Megashift account and associated cloud data by contacting <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>. We may need to verify your identity before processing the request.
        </p>
        <p>Deleting a Megashift account does not automatically cancel an active App Store or Google Play subscription. You must cancel subscriptions through the store account used for the purchase.</p>
        <p>
          We may suspend or restrict access to account/cloud features if reasonably necessary to address fraud, security threats, unlawful use, serious or repeated breach of these Terms, or legal requirements. Where appropriate and legally required, we will provide notice and a reasonable opportunity to resolve the issue.
        </p>
      </section>

      <section id="liability">
        <h2>11. Warranty, liability and privacy</h2>
        <p>
          We exercise reasonable care in developing and operating Megashift. However, software can contain errors and can depend on operating systems, app stores, networks and third-party services outside our control.
        </p>
        <p>
          To the maximum extent permitted by applicable law, Megashift is provided on an "as available" basis and we do not guarantee that every calculation, synchronization, notification, alarm, calendar entry, report or estimate will always be complete, current, uninterrupted or error-free.
        </p>
        <p>
          To the maximum extent permitted by law, we are not liable for indirect, incidental, special or consequential losses that were not reasonably foreseeable, or for losses caused solely by circumstances outside our reasonable control.
        </p>
        <p>
          Nothing in these Terms excludes or limits liability where such exclusion or limitation is prohibited by law, including mandatory consumer rights or liability that cannot legally be excluded or limited.
        </p>

        <h3>Privacy</h3>
        <p>
          Our processing of personal information is governed by the <Link href="/privacy">Megashift Privacy Policy</Link>. The Privacy Policy does not reduce any rights you have under applicable privacy law.
        </p>
      </section>

      <section id="law">
        <h2>12. Governing law, changes and severability</h2>
        <p>
          These Terms are governed by the laws of Thailand, without regard to conflict-of-law rules, <strong>except</strong> that this choice does not deprive you of mandatory consumer protections that apply under the law of your country of habitual residence.
        </p>
        <p>
          Any mandatory right to bring a claim before a court or authority in your country of residence remains unaffected. Where the law permits the parties to choose jurisdiction, the competent courts of Thailand may have jurisdiction.
        </p>

        <h3>Changes to these Terms</h3>
        <p>
          We may update these Terms when the Service, purchase options, applicable laws, platform requirements or business practices change. For material changes that adversely affect existing users, we will provide notice in a reasonable manner where required, for example through the app or website.
        </p>
        <p>
          The current version will be published at <a href={`${site.url}/terms`}>{site.url}/terms</a> with the revision date shown at the top. Continued use after an effective change can constitute acceptance where permitted by law; where affirmative consent is legally required, we will request it.
        </p>

        <h3>Severability and no waiver</h3>
        <p>
          If a provision of these Terms is found unenforceable, the remaining provisions remain in effect to the extent permitted by law. A failure to enforce a provision in one instance does not waive the right to enforce it later.
        </p>
      </section>

      <section id="contact">
        <h2>13. Contact</h2>
        <p>Questions about these Terms or Megashift can be sent to:</p>
        <p>
          <strong>Pattarachanok Klinjan</strong><br />
          1020 Green House Moo 7<br />
          Tambon Nokmuang, Ampur MuangSurin<br />
          Surin 32000<br />
          Thailand
        </p>
        <p>
          <strong>Email:</strong> <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a><br />
          <strong>Website:</strong> <a href={site.url}>{site.url}</a>
        </p>
      </section>
    </LegalLayout>
  );
}
