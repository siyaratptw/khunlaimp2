import { BarChart3, Bot, ClipboardList, Home, PenLine, Settings, Users } from "lucide-react";
import { Lang, Tab } from "@/lib/types";
import { t } from "@/lib/i18n";
import { Mascot } from "./Mascot";

export function Sidebar({ tab, setTab, lang }: { tab: Tab; setTab: (t: Tab) => void; lang: Lang }) {
  const items = [
    { key: "dashboard", icon: Home, label: t(lang, "dashboard") },
    { key: "add", icon: PenLine, label: t(lang, "add") },
    { key: "records", icon: ClipboardList, label: t(lang, "records") },
    { key: "employees", icon: Users, label: t(lang, "employees") },
    { key: "analytics", icon: BarChart3, label: t(lang, "analytics") },
    { key: "ai", icon: Bot, label: t(lang, "ai") },
    { key: "settings", icon: Settings, label: t(lang, "settings") },
  ] as const;

  return (
    <aside className="sidebar">
      <div className="brand">
        <Mascot size="sm" />
        <div><div className="brand-title">ขุนลา</div><div className="brand-sub">HR DASHBOARD</div></div>
      </div>
      <nav className="nav">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.key} className={tab === item.key ? "active" : ""} onClick={() => setTab(item.key as Tab)}>
              <Icon size={20} /> {item.label}
              {item.key === "ai" && <span className="new">ใหม่!</span>}
            </button>
          );
        })}
      </nav>
      <div className="side-bottom">
        <div style={{ position: "relative" }}><Mascot size="sm" /></div>
        <h3>ขุนลาพร้อมลุย!</h3>
        <p>ให้ขุนลาช่วยดูแลทีมให้นะครับ</p>
      </div>
    </aside>
  );
}
