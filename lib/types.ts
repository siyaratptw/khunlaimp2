export type Lang = "th" | "en" | "ja";
export type Tab = "dashboard" | "add" | "records" | "employees" | "analytics" | "ai" | "settings";

export type EventType = "ลาป่วย" | "ลากิจ" | "ลาพักร้อน" | "WFH" | "มาสาย" | "Business Trip" | "OT" | "ทำงานวันหยุด";
export type LeaveMode = "full_day" | "half_morning" | "half_afternoon";
export type Status = "pending" | "approved" | "rejected" | "cancelled";

export type KhunlaRecord = {
  id: string;
  created_at: string;
  employee_name: string | null;
  event_type: EventType | string | null;
  leave_mode: LeaveMode | string | null;
  start_date: string | null;
  end_date: string | null;
  days: number | null;
  start_time: string | null;
  end_time: string | null;
  hours: number | null;
  location: string | null;
  reason: string | null;
  status: Status | string | null;
  created_by: string | null;
};
