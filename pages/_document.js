import Document, { Html, Head, Main, NextScript } from "next/document";
import { localeBySlug } from "@/lib/i18n/locales";

export default function MegashiftDocument({ htmlLang }) {
  return (
    <Html lang={htmlLang || "en"}>
      <Head>
        <link rel="icon" href="/images/megashift-icon.svg" type="image/svg+xml" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MegashiftDocument.getInitialProps = async ctx => {
  const initialProps = await Document.getInitialProps(ctx);
  const slug = typeof ctx.query?.locale === "string" ? ctx.query.locale : "en";
  return {
    ...initialProps,
    htmlLang: localeBySlug[slug]?.htmlLang || "en",
  };
};
