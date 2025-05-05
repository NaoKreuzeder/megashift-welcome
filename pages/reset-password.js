import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import Head from "next/head";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const token = hashParams.get("access_token");

    if (token) {
      setAccessToken(token);
      supabase.auth.setSession({ access_token: token, refresh_token: "" });
    } else {
      setMessage("Invalid or expired link.");
    }
  }, []);

  const handlePasswordReset = async () => {
    if (!accessToken) {
      setMessage("Error: No valid session.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setMessage(`❌ ${error.message}`);
    } else {
      setMessage("✅ Password updated! Redirecting...");
      setTimeout(() => router.push("/"), 3000);
    }
  };

  return (
    <>
      <Head>
        <title>Reset Password | Megashift</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Reset Your Password</h1>

          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={styles.input}
            autoComplete="new-password"
          />

          <button onClick={handlePasswordReset} style={styles.button}>
            Update Password
          </button>

          {message && <p style={styles.message}>{message}</p>}
        </div>
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
};
