import { useState } from "react";
import { PASSWORD } from "@/lib/constants";
import { Lang } from "@/lib/types";
import { t } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Mascot } from "./Mascot";

export function Login({ lang, setLang, onLogin }: { lang: Lang; setLang: (l: Lang) => void; onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password === PASSWORD) {
      localStorage.setItem("khunla-auth", "yes");
      onLogin();
    } else {
      setError(t(lang, "wrongPassword"));
    }
  }

  return (
    <main className="login-page">
      <section className="card login-box">
        <div className="login-top" />
        <div className="login-mascot"><Mascot size="lg" /></div>
        <div style={{ position: "absolute", right: 16, top: 16 }}><LanguageSwitcher lang={lang} setLang={setLang} /></div>
        <h1 style={{ fontSize: 58, margin: "14px 0 4px", color: "var(--kubota-dark)", fontWeight: 900 }}>ขุนลา</h1>
        <p style={{ fontWeight: 900 }}>{t(lang, "loginTitle")}</p>
        <form onSubmit={submit} className="grid" style={{ marginTop: 20, textAlign: "left" }}>
          <div className="field">
            <label>{t(lang, "password")}</label>
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="imp2" />
          </div>
          {error && <div className="error">{error}</div>}
          <button className="primary">{t(lang, "enter")}</button>
        </form>
      </section>
    </main>
  );
}
