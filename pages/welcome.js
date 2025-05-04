import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti'; // Import the confetti library

const messages = {
  am: { title: "እንኳን ወደ Megashift በደህና መጡ!", description: "ኢሜልዎ ተረጋግጧል። አሁን ወደ መተግበሪያው ተመልሰው መግባት ይችላሉ።" },
  ar: { title: "مرحبًا بك في Megashift!", description: "تم تأكيد بريدك الإلكتروني. يمكنك الآن العودة إلى التطبيق وتسجيل الدخول." },
  en: { title: "Welcome to Megashift!", description: "Your email has been confirmed. You can now return to the app and log in." },
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

    // Delay the confetti animation by 1 second
    setTimeout(() => {
      confetti(); // Trigger the confetti animation after 1 second
    }, 1000);

    return () => mediaQuery.removeEventListener('change', (e) => setDarkMode(e.matches));
  }, []);

  return (
    <div style={{ ...styles.container, backgroundColor: darkMode ? '#121212' : '#f9f9f9', color: darkMode ? '#f9f9f9' : '#333' }}>
      <div style={styles.icon}>
        <i className="fas fa-check-circle" style={{ color: 'green', fontSize: '4rem' }}></i>
      </div>
      <h1 style={{ ...styles.title, color: darkMode ? '#fff' : '#000' }}>{content.title}</h1>
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  icon: {
    marginBottom: '1rem',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    fontWeight: '600',
    transition: 'color 0.3s ease',
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
