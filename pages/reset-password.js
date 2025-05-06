import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Head from "next/head";
import { messages } from "../messages/reset-password-messages";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Map for language codes
const langMap = {
  "zh-hans": "zh-cn",
  "zh-hant": "zh-tw",
  "zh-hk": "zh-tw",
  "zh-mo": "zh-tw",
  "zh-tw": "zh-tw",
  "zh-cn": "zh-cn",
  "pt-br": "pt-br",
};

function detectZhScript() {
  if (typeof window === "undefined") return "zh-cn"; // Default for server
  const languages = navigator.languages || [navigator.language];
  for (const lang of languages) {
    if (lang.toLowerCase().includes("hans")) return "zh-hans";
    if (lang.toLowerCase().includes("hant")) return "zh-hant";
  }
  const region = navigator.language.toLowerCase();
  if (region === "zh-tw" || region === "zh-hk" || region === "zh-mo") return "zh-hant";
  return "zh-cn";
}

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(null); // null, true, or false
  const [passwordIsValid, setPasswordIsValid] = useState(null); // null, true, or false
  const [message, setMessage] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [lang, setLang] = useState("en"); // Default language
  const [content, setContent] = useState({
    title: "",
    placeholder: "",
    button: "",
    password_updated_msg: "Password updated!",
    invalid_link_msg: "Invalid or expired link",
    no_session_msg: "Error: No valid session",
    repeat_password_placeholder: "Repeat new password",
    passwords_match_msg: "Passwords match!",
    passwords_dont_match_msg: "Passwords don't match!",
    password_valid_msg: "Password is valid!",
    password_invalid_msg: "Password must be longer than 6 characters, include at least 1 digit, and 1 uppercase letter!"
  });

  // Update passwordsMatch and passwordIsValid states when passwords change
  useEffect(() => {
    // Check password match
    if (newPassword && repeatPassword) {
      setPasswordsMatch(newPassword === repeatPassword);
    } else {
      setPasswordsMatch(null); // No match message if either field is empty
    }

    // Check password strength
    if (newPassword) {
      // Regex: at least 7 chars, 1 digit, 1 uppercase
      const isValid = /(?=.*\d)(?=.*[A-Z]).{7,}/.test(newPassword);
      setPasswordIsValid(isValid);
    } else {
      setPasswordIsValid(null); // No validation message if password is empty
    }
  }, [newPassword, repeatPassword]);

  useEffect(() => {
    let userLang = (navigator.language || "en").toLowerCase();

    if (userLang.startsWith("zh")) {
      const zhScript = detectZhScript();
      userLang = zhScript;
    }

    const mappedLang = langMap[userLang] || userLang.split("-")[0];
    setLang(mappedLang);

    // Error handling for undefined messages
    if (!messages) {
      console.error("Messages object is undefined");
      setContent({
        title: "Change Password",
        placeholder: "Enter new password",
        button: "Update Password",
        password_updated_msg: "Password updated!",
        invalid_link_msg: "Invalid or expired link",
        no_session_msg: "Error: No valid session",
        repeat_password_placeholder: "Repeat new password",
        passwords_match_msg: "Passwords match!",
        passwords_dont_match_msg: "Passwords don't match!",
        password_valid_msg: "Password is valid!",
        password_invalid_msg: "Password must be longer than 6 characters, include at least 1 digit, and 1 uppercase letter!"
      });
      return;
    }

    setContent(messages[mappedLang] || messages["en"]);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const token = hashParams.get("access_token");

    if (token) {
      setAccessToken(token);
      supabase.auth.setSession({ access_token: token, refresh_token: "" });
    } else {
      setMessage(content.invalid_link_msg);
    }
  }, [content.invalid_link_msg]);

  const handlePasswordReset = async () => {
    if (!accessToken) {
      setMessage(content.no_session_msg);
      return;
    }

    if (newPassword !== repeatPassword) {
      setMessage(`❌ ${content.passwords_dont_match_msg}`);
      return;
    }

    if (!passwordIsValid) {
      setMessage(`❌ ${content.password_invalid_msg}`);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setMessage(`❌ ${error.message}`);
    } else {
      setMessage(`✅ ${content.password_updated_msg}`);
    }
  };

  return (
    <>
      <Head>
        <title>{content.title || "Change Password"} | Megashift</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>{content.title}</h1>

          <input
            type="password"
            placeholder={content.placeholder}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={styles.input}
            autoComplete="new-password"
          />

          <input
            type="password"
            placeholder={content.repeat_password_placeholder}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            style={styles.input}
            autoComplete="new-password"
          />

          <p
            style={{
              ...styles.message,
              color: passwordsMatch ? "green" : passwordsMatch === null ? "transparent" : "red",
              visibility: passwordsMatch === null ? "hidden" : "visible",
              height: "1.5rem", // Fixed height to prevent layout shift
              marginBottom: "1rem"
            }}
          >
            {passwordsMatch
              ? `✅ ${content.passwords_match_msg}`
              : `❌ ${content.passwords_dont_match_msg}`}
          </p>

          <p
            style={{
              ...styles.message,
              color: passwordIsValid ? "green" : passwordIsValid === null ? "transparent" : "red",
              visibility: passwordIsValid === null ? "hidden" : "visible",
              height: "1.5rem", // Fixed height to prevent layout shift
              marginBottom: "2rem"
            }}
          >
            {passwordIsValid
              ? `✅ ${content.password_valid_msg}`
              : `❌ ${content.password_invalid_msg}`}
          </p>

          <button
            onClick={handlePasswordReset}
            style={{
              ...styles.button,
              opacity: passwordsMatch && passwordIsValid && newPassword ? 1 : 0.3,
              cursor: passwordsMatch && passwordIsValid && newPassword ? "pointer" : "not-allowed"
            }}
            disabled={!passwordsMatch || !passwordIsValid || !newPassword}
          >
            {content.button}
          </button>

          {message && <p style={styles.message}>{message}</p>}
        </div>

        <p style={styles.langTag}>{lang.toUpperCase()}</p>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4",
    padding: "1rem",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    background: "#fff",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "1.5rem",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  message: {
    marginTop: "1rem",
    fontSize: "0.95rem",
    color: "#444",
  },
  langTag: {
    position: "absolute",
    bottom: "10px",
    right: "12px",
    fontSize: "0.95rem",
    color: "#888",
  },
};