export const defaultLocale = 'en';

export const locales = [
  { slug: 'en', label: 'English', htmlLang: 'en', screenshot: 'en' },
  { slug: 'de', label: 'Deutsch', htmlLang: 'de-DE', screenshot: 'de' },
  { slug: 'es', label: 'Español', htmlLang: 'es-ES', screenshot: 'es' },
  { slug: 'fr', label: 'Français', htmlLang: 'fr-FR', screenshot: 'fr' },
  { slug: 'it', label: 'Italiano', htmlLang: 'it-IT', screenshot: 'it' },
  { slug: 'pt', label: 'Português', htmlLang: 'pt-PT', screenshot: 'pt' },
  { slug: 'pt-br', label: 'Português (Brasil)', htmlLang: 'pt-BR', screenshot: 'pt-br' },
  { slug: 'th', label: 'ไทย', htmlLang: 'th-TH', screenshot: 'th' },
  { slug: 'pl', label: 'Polski', htmlLang: 'pl-PL', screenshot: 'pl' },
  { slug: 'cs', label: 'Čeština', htmlLang: 'cs-CZ', screenshot: 'cs' },
  { slug: 'hi', label: 'हिन्दी', htmlLang: 'hi-IN', screenshot: 'hi' },
  { slug: 'hr', label: 'Hrvatski', htmlLang: 'hr-HR', screenshot: 'hr' },
  { slug: 'hu', label: 'Magyar', htmlLang: 'hu-HU', screenshot: 'hu' },
  { slug: 'ja', label: '日本語', htmlLang: 'ja-JP', screenshot: 'ja' },
  { slug: 'ko', label: '한국어', htmlLang: 'ko-KR', screenshot: 'ko' },
  { slug: 'ro', label: 'Română', htmlLang: 'ro-RO', screenshot: 'ro' },
  { slug: 'ru', label: 'Русский', htmlLang: 'ru-RU', screenshot: 'ru' },
  { slug: 'sk', label: 'Slovenčina', htmlLang: 'sk-SK', screenshot: 'sk' },
  { slug: 'sv', label: 'Svenska', htmlLang: 'sv-SE', screenshot: 'sv' },
  { slug: 'tr', label: 'Türkçe', htmlLang: 'tr-TR', screenshot: 'tr' },
  { slug: 'id', label: 'Bahasa Indonesia', htmlLang: 'id-ID', screenshot: 'id' },
  { slug: 'nb', label: 'Norsk bokmål', htmlLang: 'nb-NO', screenshot: 'nb' },
  { slug: 'nl', label: 'Nederlands', htmlLang: 'nl-NL', screenshot: 'nl' },
  { slug: 'bg', label: 'Български', htmlLang: 'bg-BG', screenshot: 'bg' },
  { slug: 'bn', label: 'বাংলা', htmlLang: 'bn-BD', screenshot: 'bn' },
  { slug: 'uk', label: 'Українська', htmlLang: 'uk-UA', screenshot: 'uk' },
  { slug: 'vi', label: 'Tiếng Việt', htmlLang: 'vi-VN', screenshot: 'vi' },
  { slug: 'fil', label: 'Filipino', htmlLang: 'fil-PH', screenshot: 'fil' },
  { slug: 'el', label: 'Ελληνικά', htmlLang: 'el-GR', screenshot: 'el' },
  { slug: 'sr', label: 'Srpski', htmlLang: 'sr-Latn', screenshot: 'sr' },
  { slug: 'sl', label: 'Slovenščina', htmlLang: 'sl-SI', screenshot: 'sl' },
  { slug: 'fi', label: 'Suomi', htmlLang: 'fi-FI', screenshot: 'fi' },
  { slug: 'ms', label: 'Bahasa Melayu', htmlLang: 'ms-MY', screenshot: 'ms' },
  { slug: 'da', label: 'Dansk', htmlLang: 'da-DK', screenshot: 'da' },
  { slug: 'sw', label: 'Kiswahili', htmlLang: 'sw', screenshot: 'sw' },
  { slug: 'zh-cn', label: '简体中文', htmlLang: 'zh-Hans-CN', screenshot: 'zh-cn' },
  { slug: 'zh-tw', label: '繁體中文', htmlLang: 'zh-Hant-TW', screenshot: 'zh-tw' },
];

export const localeBySlug = Object.fromEntries(locales.map(locale => [locale.slug, locale]));
export const localizedSlugs = locales.filter(locale => locale.slug !== defaultLocale).map(locale => locale.slug);

export function localePath(slug, hash = '') {
  return slug === defaultLocale ? `/${hash}` : `/${slug}${hash}`;
}
