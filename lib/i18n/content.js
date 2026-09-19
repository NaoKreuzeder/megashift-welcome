import en from '@/content/locales/en';

const loaders = {
  de: () => import('@/content/locales/de').then(m => m.default),
  es: () => import('@/content/locales/es').then(m => m.default),
  fr: () => import('@/content/locales/fr').then(m => m.default),
  it: () => import('@/content/locales/it').then(m => m.default),
  pt: () => import('@/content/locales/pt').then(m => m.default),
  'pt-br': () => import('@/content/locales/pt-br').then(m => m.default),
  th: () => import('@/content/locales/th').then(m => m.default),
  pl: () => import('@/content/locales/pl').then(m => m.default),
  cs: () => import('@/content/locales/cs').then(m => m.default),
  hi: () => import('@/content/locales/hi').then(m => m.default),
  hr: () => import('@/content/locales/hr').then(m => m.default),
  hu: () => import('@/content/locales/hu').then(m => m.default),
  ja: () => import('@/content/locales/ja').then(m => m.default),
  ko: () => import('@/content/locales/ko').then(m => m.default),
  ro: () => import('@/content/locales/ro').then(m => m.default),
  ru: () => import('@/content/locales/ru').then(m => m.default),
  sk: () => import('@/content/locales/sk').then(m => m.default),
  sv: () => import('@/content/locales/sv').then(m => m.default),
  tr: () => import('@/content/locales/tr').then(m => m.default),
  id: () => import('@/content/locales/id').then(m => m.default),
  nb: () => import('@/content/locales/nb').then(m => m.default),
  nl: () => import('@/content/locales/nl').then(m => m.default),
  bg: () => import('@/content/locales/bg').then(m => m.default),
  bn: () => import('@/content/locales/bn').then(m => m.default),
  uk: () => import('@/content/locales/uk').then(m => m.default),
  vi: () => import('@/content/locales/vi').then(m => m.default),
  fil: () => import('@/content/locales/fil').then(m => m.default),
  el: () => import('@/content/locales/el').then(m => m.default),
  sr: () => import('@/content/locales/sr').then(m => m.default),
  sl: () => import('@/content/locales/sl').then(m => m.default),
  fi: () => import('@/content/locales/fi').then(m => m.default),
  ms: () => import('@/content/locales/ms').then(m => m.default),
  da: () => import('@/content/locales/da').then(m => m.default),
  sw: () => import('@/content/locales/sw').then(m => m.default),
  'zh-cn': () => import('@/content/locales/zh-cn').then(m => m.default),
  'zh-tw': () => import('@/content/locales/zh-tw').then(m => m.default),
};

export async function loadContent(slug = 'en') {
  if (slug === 'en') return en;
  const loader = loaders[slug];
  return loader ? loader() : null;
}
