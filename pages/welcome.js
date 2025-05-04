import { useEffect, useState } from 'react';

const messages = {
  am: { title: "እንኳን ወደ Megashift በደህና መጡ!", description: "ኢሜልዎ ተረጋግጧል። አሁን ወደ መተግበሪያው ተመልሰው መግባት ይችላሉ።" },
  ar: { title: "مرحبًا بك في Megashift!", description: "تم تأكيد بريدك الإلكتروني. يمكنك الآن العودة إلى التطبيق وتسجيل الدخول." },
  en: { title: "Welcome to Megashift!", description: "Your email has been confirmed. You can now return to the app and log in." },
  // Add more languages here...
};

const langMap = {
  'zh-hk': 'zh-tw',
  'zh-tw': 'zh-tw',
  'zh': 'zh-cn',
  'pt-br': 'pt-br',
};

export default function WelcomePage() {
  const [content, setContent] = useState({ title: '', description: '' });
  const [lang, setLang] = useState('en');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let userLang = (navigator.language || 'en').toLowerCase();
    userLang = langMap[userLang] || userLang.split('-')[0];
    setLang(userLang);
    setContent(messages[userLang] || messages['en']);

    // Check dark mode preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);

    // Listen to changes in system theme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      setDarkMode(e.matches);
    });

    return () => mediaQuery.removeEventListener('change', (e) => setDarkMode(e.matches));
  }, []);

  return (
    <div style={{ ...styles.container, backgroundColor: darkMode ? '#121212' : '#f9f9f9', color: darkMode ? '#f9f9f9' : '#333' }}>
      <h1 style={{ ...styles.title, color: darkMode ? '#fff' : '#000' }}>{content.title}</h1>
      <p style={styles.description}>{content.description}</p>
      <div style={styles.langTag}>{lang.toUpperCase()}</div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: '-apple-system, BlinkMac
