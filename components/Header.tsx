import { Lang } from "@/lib/types";
import { t } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Mascot } from "./Mascot";

export function Header({ lang, setLang, logout }: { lang: Lang; setLang: (l: Lang) => void; logout: () => void }) {
  return (
    <header className="hero">
      <div className="sky"><span className="sun">☀️</span><span className="cloud-a">☁️</span><span className="cloud-b">☁️</span><span className="birds">⌁⌁</span></div>
      <div className="hero-inner">
        <div className="hero-title">
          <Mascot />
          <div><h1>ขุนลา</h1><p>{t(lang, "subtitle")}</p></div>
        </div>
        <div className="top-actions">
          <LanguageSwitcher lang={lang} setLang={setLang} />
          <button className="logout" onClick={logout}>{t(lang, "logout")}</button>
        </div>
      </div>
    </header>
  );
}
