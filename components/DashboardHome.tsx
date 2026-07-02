import { KhunlaRecord, Lang } from "@/lib/types";
import { t } from "@/lib/i18n";
import { typeMeta } from "@/lib/constants";
import { StatCard } from "./StatCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export function DashboardHome({ lang, records, setTab }: { lang: Lang; records: KhunlaRecord[]; setTab: (t: any) => void }) {
  const today = new Date().toISOString().slice(0, 10);
  const todayRecords = records.filter(r => r.start_date === today);
  const chart = Object.keys(typeMeta).map(type => ({ name: type, value: records.filter(r => r.event_type === type).length }));

  return (
    <div className="grid" style={{ gap: 20 }}>
      <div className="grid stats">
        <StatCard title={t(lang, "todayTotal")} value={todayRecords.length} icon="👥" />
        <StatCard title={t(lang, "wfhToday")} value={todayRecords.filter(r => r.event_type === "WFH").length} icon="🏠" />
        <StatCard title={t(lang, "lateToday")} value={todayRecords.filter(r => r.event_type === "มาสาย").length} icon="⏰" />
        <StatCard title={t(lang, "tripToday")} value={todayRecords.filter(r => r.event_type === "Business Trip").length} icon="✈️" />
        <StatCard title={t(lang, "otToday")} value={todayRecords.filter(r => r.event_type === "OT").length} icon="⏱️" />
      </div>

      <section className="card">
        <h2 className="section-title">🐾 แจ้งข้อมูล (คลิกเลือกประเภท)</h2>
        <div className="grid type-grid">
          {Object.keys(typeMeta).map(type => (
            <button key={type} className="type-card" onClick={() => setTab("add")}>
              <span className="emoji">{typeMeta[type].emoji}</span>{type}
            </button>
          ))}
        </div>
      </section>

      <div className="grid two-cols">
        <section className="card">
          <h2 className="section-title">📊 สถิติแยกตามประเภท</h2>
          <div style={{ height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={chart} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100}>
                  {chart.map((_, i) => <Cell key={i} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="card">
          <h2 className="section-title">🐾 {t(lang, "latest")}</h2>
          <div className="grid">
            {records.slice(0, 7).map(r => (
              <div key={r.id} className="notice" style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div><b>{r.employee_name || "-"}</b> <span>{r.event_type}</span><br/><small>{r.start_date} {r.location || ""}</small></div>
                <span style={{ fontSize: 26 }}>{typeMeta[r.event_type || ""]?.emoji || "🐾"}</span>
              </div>
            ))}
            {!records.length && <div className="empty">ยังไม่มีข้อมูล ขุนลานั่งรออยู่บนรถไถ 🚜</div>}
          </div>
        </section>
      </div>
    </div>
  );
}
