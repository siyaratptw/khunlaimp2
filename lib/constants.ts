import { EventType, LeaveMode, Status } from "./types";

export const PASSWORD = "imp2";

export const eventTypes: EventType[] = ["ลาป่วย", "ลากิจ", "ลาพักร้อน", "WFH", "มาสาย", "Business Trip", "OT", "ทำงานวันหยุด"];

export const leaveModes: { value: LeaveMode; label: string }[] = [
  { value: "full_day", label: "เต็มวัน" },
  { value: "half_morning", label: "ครึ่งวันเช้า" },
  { value: "half_afternoon", label: "ครึ่งวันบ่าย" },
];

export const statuses: { value: Status; label: string }[] = [
  { value: "pending", label: "รออนุมัติ" },
  { value: "approved", label: "อนุมัติแล้ว" },
  { value: "rejected", label: "ไม่อนุมัติ" },
  { value: "cancelled", label: "ยกเลิก" },
];

export const typeMeta: Record<string, { emoji: string; color: string }> = {
  "ลาป่วย": { emoji: "🤒", color: "#16a34a" },
  "ลากิจ": { emoji: "👜", color: "#f59e0b" },
  "ลาพักร้อน": { emoji: "🏖️", color: "#0284c7" },
  "WFH": { emoji: "🏠", color: "#14b8a6" },
  "มาสาย": { emoji: "⏰", color: "#f97316" },
  "Business Trip": { emoji: "✈️", color: "#7c3aed" },
  "OT": { emoji: "⏱️", color: "#dc2626" },
  "ทำงานวันหยุด": { emoji: "📅", color: "#be123c" },
};
