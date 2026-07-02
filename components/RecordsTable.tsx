import { useMemo, useState } from "react";
import { KhunlaRecord, Lang } from "@/lib/types";
import { t } from "@/lib/i18n";
import { eventTypes, typeMeta } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import * as XLSX from "xlsx";

export function RecordsTable({ lang, records, reload }: { lang: Lang; records: KhunlaRecord[]; reload: () => void }) {
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [month, setMonth] = useState("");

  const filtered = useMemo(() => records.filter((r) => {
    const text = `${r.employee_name || ""} ${r.event_type || ""} ${r.location || ""} ${r.reason || ""}`.toLowerCase();
    return (!q || text.includes(q.toLowerCase())) && (!type || r.event_type === type) && (!month || (r.start_date || "").startsWith(month));
  }), [records, q, type, month]);

  async function remove(id: string) {
    if (!confirm("ลบรายการนี้?")) return;
    const { error } = await supabase.from("khunla_records").delete().eq("id", id);
    if (error) alert(error.message);
    reload();
  }

  function exportExcel() {
    const rows = filtered.map(r => ({
      employee_name: r.employee_name,
      event_type: r.event_type,
      leave_mode: r.leave_mode,
      start_date: r.start_date,
      end_date: r.end_date,
      days: r.days,
      start_time: r.start_time,
      end_time: r.end_time,
      hours: r.hours,
      location: r.location,
      reason: r.reason,
      status: r.status,
      created_by: r.created_by,
      created_at: r.created_at,
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "khunla_records");
    XLSX.writeFile(wb, "khunla_records.xlsx");
  }

  return (
    <section className="card">
      <div style={{ display:"flex", justifyContent:"space-between", gap:12, flexWrap:"wrap", alignItems:"center" }}>
        <h2 className="section-title">🐾 {t(lang, "records")}</h2>
        <button className="secondary" onClick={exportExcel}>{t(lang, "exportExcel")}</button>
      </div>
      <div className="grid filters">
        <input className="input" placeholder={t(lang, "search")} value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">{t(lang, "all")}</option>
          {eventTypes.map(x => <option key={x}>{x}</option>)}
        </select>
        <input className="input" type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr>
            <th>{t(lang, "startDate")}</th><th>{t(lang, "employee")}</th><th>{t(lang, "type")}</th><th>{t(lang, "days")}</th><th>{t(lang, "hours")}</th><th>{t(lang, "location")}</th><th>{t(lang, "status")}</th><th></th>
          </tr></thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td>{r.start_date || "-"}</td>
                <td><b>{r.employee_name || "-"}</b></td>
                <td><span className="pill">{typeMeta[r.event_type || ""]?.emoji || "🐾"} {r.event_type}</span></td>
                <td>{r.days ?? "-"}</td>
                <td>{r.hours ?? "-"}</td>
                <td>{r.location || "-"}</td>
                <td>{r.status || "-"}</td>
                <td><button className="danger" onClick={() => remove(r.id)}>{t(lang, "delete")}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && <div className="empty">ยังไม่มีข้อมูล ขุนลานั่งรออยู่บนรถไถ 🚜</div>}
      </div>
    </section>
  );
}
