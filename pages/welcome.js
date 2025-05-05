import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti'; // Import the confetti library

const messages = {
  am: { title: "እንኳን ወደ Megashift በደህና መጡ!", description: "ኢሜልዎ ተረጋግጧል። አሁን ወደ መተግበሪያው ተመልሰው መግባት ይችላሉ።" }, // Amharic
  ar: { title: "مرحبًا بك في Megashift!", description: "تم تأكيد بريدك الإلكتروني. يمكنك الآن العودة إلى التطبيق وتسجيل الدخول." }, // Arabic
  bg: { title: "Добре дошли в Megashift!", description: "Имейлът ви е потвърден. Сега можете да се върнете в приложението и да влезете." }, // Bulgarian
  bn: { title: "Megashift-এ স্বাগতম!", description: "আপনার ইমেল নিশ্চিত করা হয়েছে। এখন আপনি অ্যাপে ফিরে গিয়ে লগ ইন করতে পারেন।" }, // Bengali
  cs: { title: "Vítejte v Megashiftu!", description: "Váš e-mail byl potvrzen. Nyní se můžete vrátit do aplikace a přihlásit se." }, // Czech
  da: { title: "Velkommen til Megashift!", description: "Din e-mail er blevet bekræftet. Du kan nu vende tilbage til appen og logge ind." }, // Danish
  de: { title: "Willkommen bei Megashift!", description: "Deine E-Mail wurde bestätigt. Du kannst jetzt zur App zurückkehren und dich einloggen." }, // German
  en: { title: "Welcome to Megashift!", description: "Your email has been confirmed. You can now return to the app and log in." }, // English
  es: { title: "¡Bienvenido a Megashift!", description: "Tu correo electrónico ha sido confirmado. Ahora puedes volver a la aplicación e iniciar sesión." }, // Spanish
  fa: { title: "به Megashift خوش آمدید!", description: "ایمیل شما تأیید شد. حالا می‌توانید به برنامه بازگردید و وارد شوید." }, // Persian
  fi: { title: "Tervetuloa Megashiftiin!", description: "Sähköpostisi on vahvistettu. Voit nyt palata sovellukseen ja kirjautua sisään." }, // Finnish
  fr: { title: "Bienvenue sur Megashift !", description: "Votre adresse e-mail a été confirmée. Vous pouvez maintenant retourner dans l’application et vous connecter." }, // French
  ha: { title: "Barka da zuwa Megashift!", description: "An tabbatar da imel ɗinku. Yanzu zaku iya komawa zuwa manhajar ku shiga." }, // Hausa
  he: { title: "ברוכים הבאים ל-Megashift!", description: "האימייל שלך אומת. כעת תוכל לחזור לאפליקציה ולהיכנס." }, // Hebrew
  hi: { title: "Megashift में आपका स्वागत है!", description: "आपका ईमेल पुष्टि हो चुका है। अब आप ऐप पर वापस जाकर लॉग इन कर सकते हैं।" }, // Hindi
  hr: { title: "Dobro došli u Megashift!", description: "Vaša e-pošta je potvrđena. Sada se možete vratiti u aplikaciju i prijaviti." }, // Croatian
  hu: { title: "Üdvözlünk a Megashiftben!", description: "Az e-mailed megerősítésre került. Most már visszatérhetsz az alkalmazáshoz, és bejelentkezhetsz." }, // Hungarian
  id: { title: "Selamat datang di Megashift!", description: "Email Anda telah dikonfirmasi. Sekarang Anda dapat kembali ke aplikasi dan masuk." }, // Indonesian
  it: { title: "Benvenuto su Megashift!", description: "La tua email è stata confermata. Ora puoi tornare all'app e accedere." }, // Italian
  ja: { title: "Megashiftへようこそ！", description: "メールアドレスが確認されました。アプリに戻ってログインできます。" }, // Japanese
  jv: { title: "Sugeng rawuh ing Megashift!", description: "Email sampeyan wis dikonfirmasi. Sampeyan saiki bisa bali menyang aplikasi lan mlebu." }, // Javanese
  ko: { title: "Megashift에 오신 것을 환영합니다!", description: "이메일이 확인되었습니다. 이제 앱으로 돌아가 로그인할 수 있습니다." }, // Korean
  ml: { title: "Megashift ലേക്ക് സ്വാഗതം!", description: "നിങ്ങളുടെ ഇമെയിൽ സ്ഥിരീകരിച്ചു. ഇപ്പോൾ ആപ്പിലേക്ക് മടങ്ങി ലോഗിൻ ചെയ്യാം." }, // Malayalam
  ms: { title: "Selamat datang ke Megashift!", description: "Emel anda telah disahkan. Anda kini boleh kembali ke aplikasi dan log masuk." }, // Malay
  my: { title: "Megashift သို့ ကြိုဆိုပါသည်!", description: "သင်၏အီးမေးလ်ကိုအတည်ပြုပြီးပါပြီ။ အက်ပ်ကိုပြန်သွားပြီး ဝင်ရောက်နိုင်ပါသည်။" }, // Burmese
  nl: { title: "Welkom bij Megashift!", description: "Je e-mailadres is bevestigd. Je kunt nu terugkeren naar de app en inloggen." }, // Dutch
  no: { title: "Velkommen til Megashift!", description: "E-postadressen din er bekreftet. Du kan nå gå tilbake til appen og logge inn." }, // Norwegian
  pa: { title: "Megashift ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ!", description: "ਤੁਹਾਡਾ ਈਮੇਲ ਪੁਸ਼ਟੀਕ੍ਰਿਤ ਕਰ ਦਿੱਤਾ ਗਿਆ ਹੈ। ਹੁਣ ਤੁਸੀਂ ਐਪ ਵਿੱਚ ਵਾਪਸ ਜਾ ਕੇ ਲੌਗ ਇਨ ਕਰ ਸਕਦੇ ਹੋ।" }, // Punjabi
  pl: { title: "Witamy w Megashift!", description: "Twój e-mail został potwierdzony. Możesz teraz wrócić do aplikacji i się zalogować." }, // Polish
  pt: { title: "Bem-vindo ao Megashift!", description: "O seu e-mail foi confirmado. Agora pode voltar à aplicação e iniciar sessão." }, // Portuguese
  'pt-br': { title: "Bem-vindo ao Megashift!", description: "Seu e-mail foi confirmado. Agora você pode voltar ao aplicativo e fazer login." }, // Portuguese (Brazil)
  ro: { title: "Bine ai venit la Megashift!", description: "Adresa ta de e-mail a fost confirmată. Poți acum să te întorci în aplicație și să te conectezi." }, // Romanian
  ru: { title: "Добро пожаловать в Megashift!", description: "Ваш адрес электронной почты подтвержден. Теперь вы можете вернуться в приложение и войти." }, // Russian
  sk: { title: "Vitajte v Megashift!", description: "Váš e-mail bol potvrdený. Teraz sa môžete vrátiť do aplikácie a prihlásiť sa." }, // Slovak
  sr: { title: "Добродошли у Megashift!", description: "Ваша е-пошта је потврђена. Сада се можете вратити у апликацију и пријавити." }, // Serbian
  sv: { title: "Välkommen till Megashift!", description: "Din e-postadress har bekräftats. Du kan nu återgå till appen och logga in." }, // Swedish
  sw: { title: "Karibu Megashift!", description: "Barua pepe yako imethibitishwa. Sasa unaweza kurudi kwenye programu na kuingia." }, // Swahili
  ta: { title: "Megashift இல் வரவேற்கின்றோம்!", description: "உங்கள் மின்னஞ்சல் உறுதிப்படுத்தப்பட்டது. இப்போது நீங்கள் பயன்பாட்டிற்குத் திரும்பி உள்நுழையலாம்." }, // Tamil
  te: { title: "Megashiftకి స్వాగతం!", description: "మీ ఇమెయిల్ ధృవీకరించబడింది. మీరు ఇప్పుడు యాప్‌కి తిరిగి వెళ్లి లాగిన్ చేయవచ్చు." }, // Telugu
  th: { title: "ยินดีต้อนรับสู่ Megashift!", description: "ยืนยันอีเมลของคุณแล้ว ตอนนี้คุณสามารถกลับไปที่แอปและเข้าสู่ระบบได้" }, // Thai
  tl: { title: "Maligayang pagdating sa Megashift!", description: "Nakumpirma na ang iyong email. Maaari ka nang bumalik sa app at mag-login." }, // Filipino
  tr: { title: "Megashift'e Hoş Geldiniz!", description: "E-postanız onaylandı. Şimdi uygulamaya geri dönüp giriş yapabilirsiniz." }, // Turkish
  uk: { title: "Ласкаво просимо до Megashift!", description: "Вашу електронну адресу підтверджено. Тепер ви можете повернутися до додатка та увійти." }, // Ukrainian
  ur: { title: "Megashift میں خوش آمدید!", description: "آپ کا ای میل تصدیق ہو چکا ہے۔ اب آپ ایپ میں واپس جا کر لاگ ان کر سکتے ہیں۔" }, // Urdu
  vi: { title: "Chào mừng đến với Megashift!", description: "Email của bạn đã được xác nhận. Giờ bạn có thể quay lại ứng dụng và đăng nhập." }, // Vietnamese
  'zh-cn': { title: "欢迎使用 Megashift！", description: "您的电子邮件已确认。您现在可以返回应用并登录。" },
  'zh-tw': { title: "歡迎使用 Megashift！", description: "您的電子郵件已確認。您現在可以返回應用並登錄。" }
};

const langMap = {
  'zh-hans': 'zh-cn',
  'zh-hant': 'zh-tw',
  'zh-hk': 'zh-tw',
  'zh-mo': 'zh-tw',
  'zh-tw': 'zh-tw',
  'zh-cn': 'zh-cn',
  'pt-br': 'pt-br',
};

function detectZhScript() {
  const languages = navigator.languages || [navigator.language];
  for (const lang of languages) {
    if (lang.toLowerCase().includes('hans')) return 'zh-hans';
    if (lang.toLowerCase().includes('hant')) return 'zh-hant';
  }

  // Fallback detection by region
  const region = navigator.language.toLowerCase();
  if (region === 'zh-tw' || region === 'zh-hk' || region === 'zh-mo') return 'zh-hant';
  return 'zh-hans';
}

export default function WelcomePage() {
  const [content, setContent] = useState({ title: '', description: '' });
  const [lang, setLang] = useState('en');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let userLang = (navigator.language || 'en').toLowerCase();

    if (userLang.startsWith('zh')) {
      const zhScript = detectZhScript();
      userLang = zhScript;
    }
      
    console.log('Detected userLang:', userLang);


    const mappedLang = langMap[userLang] || userLang.split('-')[0];
    setLang(mappedLang);
    setContent(messages[mappedLang] || messages['en']);

    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const darkModeListener = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', darkModeListener);

    setTimeout(() => {
      confetti({
        spread: 70,
        angle: 90,
        particleCount: 200,
        origin: { y: 0.6 },
        duration: 3000,
      });
    }, 1000);

    return () => mediaQuery.removeEventListener('change', darkModeListener);
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
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    transition: 'background-color 0.3s ease, color 0.3s ease',
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
