"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { KhunlaRecord, Lang, Tab } from "@/lib/types";
import { t } from "@/lib/i18n";
import { Login } from "@/components/Login";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { DashboardHome } from "@/components/DashboardHome";
import { RecordForm } from "@/components/RecordForm";
import { RecordsTable } from "@/components/RecordsTable";

export default function Page() {
  const [authed, setAuthed] = useState(false);
  const [lang, setLang] = useState<Lang>("th");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [records, setRecords] = useState<KhunlaRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAuthed(localStorage.getItem("khunla-auth") === "yes");
    const saved = localStorage.getItem("khunla-lang") as Lang | null;
    if (saved) setLang(saved);
  }, []);

  useEffect(() => { localStorage.setItem("khunla-lang", lang); }, [lang]);
  useEffect(() => { if (authed) loadRecords(); }, [authed]);

  async function loadRecords() {
    setLoading(true);
    const { data, error } = await supabase.from("khunla_records").select("*").order("created_at", { ascending: false });
    setLoading(false);
    if (error) alert(error.message);
    setRecords(data || []);
  }

  function logout() {
    localStorage.removeItem("khunla-auth");
    setAuthed(false);
  }

  const tabs: Tab[] = ["dashboard", "add", "records", "employees", "analytics", "ai", "settings"];

  if (!authed) return <Login lang={lang} setLang={setLang} onLogin={() => setAuthed(true)} />;

  return (
    <main className="app">
      <Sidebar tab={tab} setTab={setTab} lang={lang} />
      <div className="main">
        <Header lang={lang} setLang={setLang} logout={logout} />
        <div className="content">
          <div className="mobile-nav">
            {tabs.map(x => <button key={x} className={tab === x ? "active" : ""} onClick={() => setTab(x)}>{labelFor(x, lang)}</button>)}
          </div>
          {loading && <div className="notice" style={{ marginBottom: 16 }}>ขุนลากำลังโหลดข้อมูล...</div>}
          {tab === "dashboard" && <DashboardHome lang={lang} records={records} setTab={setTab} />}
          {tab === "add" && <RecordForm lang={lang} onAdded={loadRecords} />}
          {tab === "records" && <RecordsTable lang={lang} records={records} reload={loadRecords} />}
          {tab === "employees" && <Placeholder title={t(lang, "employees")} text="เพิ่มรายชื่อพนักงาน แผนก สีประจำตัว และ LINE User ID ในเวอร์ชันถัดไป" />}
          {tab === "analytics" && <DashboardHome lang={lang} records={records} setTab={setTab} />}
          {tab === "ai" && <Placeholder title={t(lang, "ai")} text="อนาคตจะให้ AI ช่วยอ่านประโยค เช่น ดาวลาป่วยบ่ายพรุ่งนี้ แล้วกรอกข้อมูลให้อัตโนมัติ" />}
          {tab === "settings" && <Placeholder title={t(lang, "settings")} text="ตั้งค่าภาษา ทีม รหัสผ่าน และการเชื่อมต่อ LINE Bot" />}
        </div>
      </div>
    </main>
  );
}

function labelFor(tab: Tab, lang: Lang) {
  const map: Record<Tab, any> = { dashboard: "dashboard", add: "add", records: "records", employees: "employees", analytics: "analytics", ai: "ai", settings: "settings" };
  return t(lang, map[tab]);
}

function Placeholder({ title, text }: { title: string; text: string }) {
  return <section className="card placeholder"><div className="big">🐱🚜</div><h2>{title}</h2><p>{text}</p></section>;
}
