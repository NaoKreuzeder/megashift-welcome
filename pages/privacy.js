/* eslint-disable react/no-unescaped-entities */
import LegalLayout from '@/components/LegalLayout';
import { site } from '@/lib/site';

const sections = [
  { id: 'contact', title: 'Who we are' },
  { id: 'local-data', title: 'Data on your device' },
  { id: 'calendar', title: 'Device calendars' },
  { id: 'account', title: 'Accounts & sign-in' },
  { id: 'cloud', title: 'Cloud sync & backup' },
  { id: 'purchases', title: 'Purchases' },
  { id: 'diagnostics', title: 'Analytics & diagnostics' },
  { id: 'ads', title: 'Advertising' },
  { id: 'website', title: 'Website & support' },
  { id: 'providers', title: 'Service providers' },
  { id: 'legal-bases', title: 'Legal bases' },
  { id: 'retention', title: 'Retention & your rights' },
  { id: 'transfers', title: 'Transfers & security' },
  { id: 'children', title: 'Children & changes' },
];

export default function Privacy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      description="How Megashift processes information in the app, account and cloud features, device-calendar integration and this website."
      path="/privacy"
      sections={sections}
      draft={false}
    >
      <section id="contact">
        <h2>1. Data Controller and Contact</h2>
        <p><strong>Last updated: September 18, 2026</strong></p>
        <p>This Privacy Policy explains how Megashift processes information when you use the Megashift mobile application, the website at <a href={site.url}>{site.url}</a>, and connected account, cloud, purchase, analytics, advertising and support services.</p>
        <p><strong>Data Controller:</strong><br />Pattarachanok Klinjan<br />1020 Green House Moo 7<br />Tambon Nokmuang, Ampur MuangSurin<br />Surin 32000<br />Thailand</p>
        <p><strong>Privacy and support contact:</strong> <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a></p>
        <p>If you have questions about this Privacy Policy or want to exercise a privacy right, contact us at the email address above.</p>
      </section>

      <section id="local-data">
        <h2>2. Information Stored on Your Device</h2>
        <p>Megashift is designed so that much of your schedule information is stored locally on your device. Depending on the features you use, local information may include:</p>
        <ul>
          <li>work calendars and shift schedules;</li>
          <li>shifts and additional work entries, including dates, titles, abbreviations, start/end times, durations, colors and overtime information;</li>
          <li>shift templates, break information, alarms and rotation patterns;</li>
          <li>notes you enter in the app;</li>
          <li>holiday settings and holiday entries;</li>
          <li>working-time settings, target/actual-hour settings and related balances;</li>
          <li>income settings such as hourly rates, monthly salary settings, currency, allowances and calculation rules;</li>
          <li>theme and other app preferences; and</li>
          <li>local information used to render home-screen widgets.</li>
        </ul>
        <p>Unless a feature described below sends information to a service provider, this information remains in the app's local storage on your device.</p>
      </section>

      <section id="calendar">
        <h2>3. Device Calendar Access</h2>
        <p>If you enable calendar access, Megashift uses the calendar interfaces provided by Android or iOS to show calendars and appointments that are available to your device. <strong>Megashift does not use the Google Calendar API to retrieve these appointments.</strong></p>
        <p>Depending on the information made available by your operating system and calendar provider, Megashift may process calendar metadata and event details such as calendar name/account information, event title and description, start/end time, all-day status, recurrence information, reminders and, where available, location, URL, attendee or availability/status information.</p>
        <p>Megashift can also create, edit or delete calendar events when you initiate those actions in the app. These actions are performed through the operating system's calendar interface. If a calendar belongs to a synchronized account, such as Google Calendar or iCloud, your operating system or calendar provider may synchronize the change according to your device and account settings.</p>
        <p>The list of device calendars and your selected-calendar settings are stored locally. <strong>Device-calendar events are not included in Megashift's Supabase cloud-sync tables.</strong></p>
        <p>Calendar access is optional. You can grant or revoke the relevant permission in your device settings. If you revoke it, calendar-related features may no longer work.</p>
      </section>

      <section id="account">
        <h2>4. Accounts and Authentication</h2>
        <p>Megashift offers account features using Supabase for authentication and account sessions.</p>
        <h3>Email and Password</h3>
        <p>If you register with email and password, Supabase processes your email address, authentication credentials, account identifier and session information. Password-reset requests are also handled through Supabase. Megashift does not store your plaintext account password in its own local app database.</p>
        <h3>Sign in with Google</h3>
        <p>If you choose Sign in with Google, Megashift requests basic Google identity/profile information for authentication. Depending on what Google makes available, this may include your Google account identifier, email address, display name, profile picture and authentication tokens used to complete sign-in.</p>
        <p>Megashift uses this information to authenticate you with Supabase, create or access your Megashift account, maintain your signed-in session and display account information in the app.</p>
        <p>Megashift does <strong>not</strong> use Google sign-in tokens to access the Google Calendar API and does <strong>not</strong> request Google Calendar OAuth scopes for the device-calendar feature.</p>
        <p>Google sign-in data is not used by Megashift for advertising and is not sold. Information required for authentication is shared with Supabase as part of the sign-in process.</p>
        <p>Megashift's use and transfer of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a>, including the Limited Use requirements where applicable.</p>
        <h3>Sign in with Apple and X</h3>
        <p>On supported platforms, Megashift also offers Sign in with Apple and Sign in with X. Depending on the provider and your settings, the provider may supply an account identifier, email address, name and profile information. Authentication tokens are exchanged with Supabase to establish your Megashift session. Each identity provider also processes information under its own privacy policy.</p>
      </section>

      <section id="cloud">
        <h2>5. Cloud Sync and Backup</h2>
        <p>When cloud synchronization is active, Megashift synchronizes selected app information between the local app database and a Supabase backend so that your Megashift data can be restored or used across devices.</p>
        <p>Synchronized information may include:</p>
        <ul>
          <li>work-calendar and schedule definitions;</li>
          <li>shift and work entries;</li>
          <li>breaks;</li>
          <li>templates and alarm-template settings;</li>
          <li>notes;</li>
          <li>working-time and workday-definition settings;</li>
          <li>theme and holiday settings;</li>
          <li>holidays;</li>
          <li>shift patterns and rotation values;</li>
          <li>target/actual working-time settings;</li>
          <li>hourly-rate and income settings; and</li>
          <li>income and allowance rules.</li>
        </ul>
        <p>Synchronized records are associated with your Megashift user ID. For multi-device synchronization, Megashift also uses an app-generated device identifier, last-active information and synchronization timestamps to coordinate changes between devices.</p>
        <p>Ongoing Cloud Sync &amp; Backup is an entitlement-controlled feature. <strong>After the first sign-in on a device, Megashift may temporarily enable an initial synchronization window for up to approximately 15 minutes even if the account does not have an ongoing Cloud Sync entitlement.</strong> This allows existing local data to be associated with the signed-in account and initially synchronized. After that window, ongoing synchronization is disabled unless the account has the required Cloud Sync entitlement.</p>
        <p>Device-calendar events obtained through Android or iOS calendar access are not included in these Megashift cloud-sync tables.</p>
      </section>

      <section id="purchases">
        <h2>6. Purchases and Subscriptions</h2>
        <p>Megashift uses RevenueCat to manage purchase and subscription entitlements. Apple App Store or Google Play processes the actual payment transaction.</p>
        <p>RevenueCat may process information such as an App User ID, subscription and entitlement status, purchase history, store receipt or purchase-token information, first-seen/last-seen information and technical information needed to provide the subscription service.</p>
        <p>When you are signed in, Megashift may associate RevenueCat with your Megashift/Supabase user ID so that subscription status can be associated with your account. When you are not signed in, RevenueCat may use an anonymous App User ID.</p>
        <p>Megashift does not receive your full payment-card or bank-account details from Apple or Google.</p>
      </section>

      <section id="diagnostics">
        <h2>7. Analytics and Crash Diagnostics</h2>
        <p>Megashift uses Google Firebase services to understand app operation and diagnose technical problems.</p>
        <h3>Firebase Analytics</h3>
        <p>Firebase Analytics is used for app-open and selected app events. Depending on the Firebase/Google configuration and platform, Firebase may process app-instance or installation identifiers, app/version information, device and operating-system information, approximate region derived from network information, and information about app events and interactions.</p>
        <p>The full provider-generated login error message is <strong>not</strong> sent as a Firebase Analytics event parameter.</p>
        <h3>Firebase Crashlytics</h3>
        <p>Firebase Crashlytics is used to receive crash and non-fatal error reports. Crash reports may include stack traces, exception/error messages, relevant app state, app/version details, device and operating-system metadata, and Firebase/Crashlytics installation identifiers.</p>
        <p>For authentication failures, Megashift may send the <strong>full provider-generated error message</strong> to Crashlytics, together with diagnostic context such as the sign-in provider, so that login problems can be investigated.</p>
        <p>For certain rare database-migration failures, Megashift may include values from the affected local database row in the Crashlytics diagnostic report. Depending on the affected table, this may include content you entered in Megashift, such as shift, note or settings values. This diagnostic information is used to understand the cause of the technical failure and improve reliability; it is not used for advertising.</p>
        <p>Because diagnostic information can contain information related to your account or app content, please do not intentionally enter passwords, authentication tokens, payment-card numbers or other highly sensitive secrets into free-text fields such as notes.</p>
      </section>

      <section id="ads">
        <h2>8. Advertising, Consent and Tracking Choices</h2>
        <p>Users who are eligible to see advertising may receive ads served through Google Mobile Ads (AdMob). Megashift uses Google's consent tools and, where applicable, IAB Transparency and Consent Framework information to determine advertising consent choices.</p>
        <p>Depending on your consent choices, jurisdiction, device settings and Google's configuration, advertising processing may include device/app information, advertising or app-instance identifiers, IP address and approximate location derived from it, ad interactions, consent status and contextual information about the app.</p>
        <p>Personalized advertising may use information about interests or prior activity where permitted and consented to. Non-personalized advertising may still use limited information for purposes such as contextual ad selection, fraud prevention, frequency capping and aggregated measurement.</p>
        <p>On iOS, Megashift uses Apple's App Tracking Transparency mechanism where required before accessing the advertising identifier for tracking or personalized advertising.</p>
        <p>Where available, you can review or change advertising/privacy choices through privacy options provided in the app or through your device settings.</p>
      </section>

      <section id="website">
        <h2>9. Website and Support Communication</h2>
        <p>The Megashift website is hosted through Vercel. Hosting infrastructure may process information needed to deliver and secure the website, such as IP address, request/connection metadata, browser/device information, requested URLs and timestamps, subject to Vercel's service configuration and policies.</p>
        <p>The public Megashift marketing pages do not intentionally add advertising tags, embedded marketing trackers, third-party web fonts or a custom contact-form backend. The password-reset page communicates with Supabase to complete the password-reset flow.</p>
        <p>If you contact <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>, we receive your email address, message content and any attachments or information you choose to provide. The mailbox is provided through Google/Gmail, so Google also processes that communication under its own terms and privacy policy. We use support correspondence to answer your request, troubleshoot problems, protect the service and maintain appropriate support records.</p>
      </section>

      <section id="providers">
        <h2>10. Service Providers and Recipients</h2>
        <p>Depending on the features you use, Megashift may use the following third-party providers:</p>
        <ul>
          <li><strong>Supabase</strong> — account authentication, sessions, cloud database, synchronization and backup;</li>
          <li><strong>Google / Firebase</strong> — Firebase Analytics, Firebase Crashlytics, Google sign-in, AdMob and related consent/advertising services;</li>
          <li><strong>RevenueCat</strong> — purchase and subscription entitlement management;</li>
          <li><strong>Apple</strong> — Sign in with Apple, App Store distribution and purchases;</li>
          <li><strong>Google Play</strong> — app distribution and purchases;</li>
          <li><strong>X</strong> — optional X sign-in;</li>
          <li><strong>Vercel</strong> — website hosting and delivery; and</li>
          <li><strong>Google/Gmail</strong> — support email hosting.</li>
        </ul>
        <p>These providers process information under their respective agreements and privacy policies. We may also disclose information if required by applicable law, valid legal process, or when reasonably necessary to protect users, the service or legal rights.</p>
      </section>

      <section id="legal-bases">
        <h2>11. Legal Bases for Processing</h2>
        <p>Where data-protection law requires a legal basis, the basis depends on the processing activity and applicable law. This may include:</p>
        <ul>
          <li><strong>Performance of a contract or steps at your request</strong> — for account access, authentication, cloud sync/backup, subscription features and functions you choose to use;</li>
          <li><strong>Consent</strong> — where required for personalized advertising, tracking technologies, optional device permissions or other consent-based processing;</li>
          <li><strong>Legitimate interests</strong> — where permitted, for service security, fraud prevention, reliability, crash diagnosis, troubleshooting and understanding/improving app operation, balanced against your rights and interests; and</li>
          <li><strong>Legal obligations</strong> — where processing or retention is required by law.</li>
        </ul>
        <p>Device permissions, such as calendar access, can be withdrawn through your operating-system settings. Withdrawal does not affect processing that was lawful before the withdrawal.</p>
      </section>

      <section id="retention">
        <h2>12. Data Retention, Account Deletion and Your Rights</h2>
        <p>Local app information normally remains on your device until you delete it, clear the app's data or uninstall the app, subject to operating-system behavior and device backups.</p>
        <p>Account and synchronized cloud information is retained for as long as needed to provide the account/cloud service, maintain security and integrity, resolve support issues, comply with legal obligations and handle deletion/synchronization. Service-provider backups and logs may be retained for additional periods according to the provider's retention and backup processes.</p>
        <p>Purchase and subscription records are retained as needed to provide and verify entitlements and as required by Apple, Google, RevenueCat or applicable law. Analytics, advertising and diagnostic information is retained according to the relevant service configuration and provider policies.</p>
        <h3>Account deletion</h3>
        <p>At present, account deletion requests are handled manually. You may request deletion of your <strong>Megashift account and associated Megashift cloud data</strong> by emailing <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> from the email address associated with your account, or by providing sufficient information for us to verify the account belongs to you.</p>
        <p>We may need to verify your identity before carrying out a deletion request. Information may be retained where required by law, for security or fraud prevention, or to establish, exercise or defend legal claims. Independent records maintained by Apple, Google, RevenueCat or other service providers may also be subject to their own legal or contractual retention requirements.</p>
        <p>Deleting a Megashift account does not automatically cancel an active App Store or Google Play subscription. Active subscriptions must be managed through the store where they were purchased.</p>
        <p>Depending on applicable law, you may also have rights such as access, correction, deletion, restriction, objection, data portability and withdrawal of consent. You may have the right to lodge a complaint with the competent data-protection authority in your country or region.</p>
      </section>

      <section id="transfers">
        <h2>13. International Data Transfers and Security</h2>
        <p>Some service providers used by Megashift operate internationally and may process information outside your country, including in the United States or other jurisdictions. Where required by applicable law, international transfers are handled using appropriate safeguards provided by law and the relevant service-provider agreements, such as adequacy decisions, standard contractual clauses or equivalent mechanisms.</p>
        <p>Megashift uses technical and organizational measures appropriate to the service, including platform security mechanisms, authenticated access for account/cloud information and encrypted network connections provided by the relevant services. No method of electronic storage or transmission can be guaranteed to be completely secure.</p>
      </section>

      <section id="children">
        <h2>14. Children, Policy Changes and Third-Party Privacy Information</h2>
        <p>Megashift is a work-schedule application and is not designed as a service directed to children. If you are a parent or guardian and believe that a child has provided personal information through a Megashift account, contact us at <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> so the matter can be reviewed.</p>
        <p>We may update this Privacy Policy when Megashift features, service providers, legal requirements or data practices change. The current version will be published at <a href={`${site.url}/privacy`}>{site.url}/privacy</a> with an updated revision date.</p>
        <h3>Third-party privacy information</h3>
        <ul>
          <li><a href="https://supabase.com/privacy">Supabase Privacy Policy</a></li>
          <li><a href="https://policies.google.com/privacy">Google Privacy Policy</a></li>
          <li><a href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a></li>
          <li><a href="https://firebase.google.com/support/privacy">Firebase Privacy and Security</a></li>
          <li><a href="https://www.revenuecat.com/privacy">RevenueCat Privacy Policy</a></li>
          <li><a href="https://www.apple.com/legal/privacy/">Apple Privacy Policy</a></li>
          <li><a href="https://x.com/en/privacy">X Privacy Policy</a></li>
          <li><a href="https://vercel.com/legal/privacy-notice">Vercel Privacy Notice</a></li>
        </ul>
      </section>
    </LegalLayout>
  );
}
