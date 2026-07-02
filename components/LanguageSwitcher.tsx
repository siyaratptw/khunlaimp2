import { Lang } from "@/lib/types";

export function LanguageSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="lang">
      {(["th", "en", "ja"] as Lang[]).map((x) => (
        <button key={x} onClick={() => setLang(x)} className={lang === x ? "active" : ""}>
          {x === "th" ? "TH" : x === "en" ? "EN" : "JP"}
        </button>
      ))}
    </div>
  );
}
