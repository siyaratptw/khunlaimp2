import { useMemo, useState } from "react";
import { eventTypes, leaveModes, statuses, typeMeta } from "@/lib/constants";
import { Lang, EventType, LeaveMode, Status } from "@/lib/types";
import { t } from "@/lib/i18n";
import { calculateDays, calculateHours } from "@/lib/date";
import { supabase } from "@/lib/supabase";

export function RecordForm({ lang, onAdded }: { lang: Lang; onAdded: () => void }) {
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({
    employee_name: "",
    event_type: "ลาป่วย" as EventType,
    leave_mode: "full_day" as LeaveMode,
    start_date: today,
    end_date: today,
    start_time: "",
    end_time: "",
    location: "",
    reason: "",
    status: "pending" as Status,
    created_by: "",
  });
  const [saving, setSaving] = useState(false);

  const isLeaveLike = ["ลาป่วย", "ลากิจ", "ลาพักร้อน", "WFH"].includes(form.event_type);
  const isLate = form.event_type === "มาสาย";
  const isTrip = form.event_type === "Business Trip";
  const isOT = form.event_type === "OT" || form.event_type === "ทำงานวันหยุด";

  const days = useMemo(() => calculateDays(form.start_date, form.end_date, form.leave_mode), [form.start_date, form.end_date, form.leave_mode]);
  const hours = useMemo(() => calculateHours(form.start_time, form.end_time), [form.start_time, form.end_time]);

  function update(key: string, value: string) {
    setForm((prev) => {
      const next: any = { ...prev, [key]: value };
      if (key === "leave_mode" && value !== "full_day") next.end_date = next.start_date;
      if (key === "start_date" && next.leave_mode !== "full_day") next.end_date = value;
      return next;
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      end_date: form.leave_mode === "full_day" ? form.end_date : form.start_date,
      days: isLeaveLike || isTrip ? days : null,
      hours: isOT ? hours : null,
    };
    const { error } = await supabase.from("khunla_records").insert(payload);
    setSaving(false);
    if (error) return alert(error.message);
    setForm((p) => ({ ...p, employee_name: "", start_time: "", end_time: "", location: "", reason: "", created_by: "" }));
    onAdded();
  }

  return (
    <section className="card">
      <h2 className="section-title">🐾 {t(lang, "add")}</h2>
      <div className="grid type-grid" style={{ marginBottom: 18 }}>
        {eventTypes.map((type) => (
          <button key={type} className={"type-card " + (form.event_type === type ? "active" : "")} onClick={() => update("event_type", type)} type="button">
            <span className="emoji">{typeMeta[type]?.emoji}</span>{type}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="grid form-grid">
        <div className="field"><label>{t(lang, "employee")}</label><input className="input" required value={form.employee_name} onChange={(e) => update("employee_name", e.target.value)} /></div>
        <div className="field"><label>{t(lang, "type")}</label><select className="input" value={form.event_type} onChange={(e) => update("event_type", e.target.value)}>{eventTypes.map(x => <option key={x}>{x}</option>)}</select></div>

        {isLeaveLike && <div className="field"><label>{t(lang, "leaveMode")}</label><select className="input" value={form.leave_mode} onChange={(e) => update("leave_mode", e.target.value)}>{leaveModes.map(x => <option key={x.value} value={x.value}>{x.label}</option>)}</select></div>}

        <div className="field"><label>{t(lang, "startDate")}</label><input className="input" type="date" value={form.start_date} onChange={(e) => update("start_date", e.target.value)} /></div>

        {(form.leave_mode === "full_day" && (isLeaveLike || isTrip)) && <div className="field"><label>{t(lang, "endDate")}</label><input className="input" type="date" value={form.end_date} onChange={(e) => update("end_date", e.target.value)} /></div>}

        {(isLate || isOT) && <div className="field"><label>{t(lang, "startTime")}</label><input className="input" type="time" value={form.start_time} onChange={(e) => update("start_time", e.target.value)} /></div>}
        {isOT && <div className="field"><label>{t(lang, "endTime")}</label><input className="input" type="time" value={form.end_time} onChange={(e) => update("end_time", e.target.value)} /></div>}
        {(isTrip || isOT) && <div className="field"><label>{t(lang, "location")}</label><input className="input" value={form.location} onChange={(e) => update("location", e.target.value)} /></div>}

        <div className="field"><label>{t(lang, "status")}</label><select className="input" value={form.status} onChange={(e) => update("status", e.target.value)}>{statuses.map(x => <option key={x.value} value={x.value}>{x.label}</option>)}</select></div>
        <div className="field"><label>{t(lang, "reporter")}</label><input className="input" value={form.created_by} onChange={(e) => update("created_by", e.target.value)} /></div>
        <div className="field full"><label>{t(lang, "reason")}</label><textarea className="input" style={{ minHeight: 92 }} value={form.reason} onChange={(e) => update("reason", e.target.value)} /></div>

        <div className="notice full">{isOT ? `⏱️ ${t(lang, "hours")}: ${hours}` : `📅 ${t(lang, "days")}: ${days}`}</div>
        <button className="primary full" disabled={saving}>{saving ? "กำลังบันทึก..." : t(lang, "save")}</button>
      </form>
    </section>
  );
}
