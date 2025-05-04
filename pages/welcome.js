import { useEffect, useState } from 'react';

const WelcomePage = () => {
  const [content, setContent] = useState({ title: '', description: '' });
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const messages = {
      am: { title: "እንኳን ወደ Megashift በደህና መጡ!", description: "ኢሜልዎ ተረጋግጧል። አሁን ወደ መተግበሪያው ተመልሰው መግባት ይችላሉ።" }, // Amharic
      ar: { title: "مرحبًا بك في Megashift!", description: "تم تأكيد بريدك الإلكتروني. يمكنك الآن العودة إلى التطبيق وتسجيل الدخول." }, // Arabic
      // Add other languages here...
      en: { title: "Welcome to Megashift!", description: "Your email has been confirmed. You can now return to the app and log in." } // English
    };

    const langMap = {
      'zh-hk': 'zh-tw',
      'zh-tw': 'zh-tw',
      'zh': 'zh-cn',
      'pt-br': 'pt-br'
    };

    let userLang = (navigator.language || 'en').toLowerCase();
    userLang = langMap[userLang] || userLang.split('-')[0];

    setLang(userLang);
    setContent(messages[userLang] || messages['en']);
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif', minHeight: '100vh', background: '#f9f9f9', textAlign: 'center' }}>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', fontSize: '0.85rem', color: '#888' }}>
        {lang.toUpperCase()}
      </div>
    </div>
  );
};

export default WelcomePage;
