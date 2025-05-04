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

  useEffect(() => {
    let userLang = (navigator.language || 'en').toLowerCase();
    userLang = langMap[userLang] || userLang.split('-')[0];
    setLang(userLang);
    setContent(messages[userLang] || messages['en']);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{content.title}</h1>
      <p style={styles.description}>{content.description}</p>
      <div style={styles.langTag}>{lang.toUpperCase()}</div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#0070f3',
  },
  description: {
    fontSize: '1.2rem',
    maxWidth: '500px',
    margin: 0,
  },
  langTag: {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    fontSize: '0.9rem',
    color: '#888',
  },
};
