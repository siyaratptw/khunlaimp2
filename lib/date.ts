import { differenceInCalendarDays, parseISO } from "date-fns";
import { LeaveMode } from "./types";

export function calculateDays(startDate: string, endDate: string, mode: LeaveMode | string) {
  if (!startDate) return 0;
  if (mode === "half_morning" || mode === "half_afternoon") return 0.5;
  const end = endDate || startDate;
  return Math.max(1, differenceInCalendarDays(parseISO(end), parseISO(startDate)) + 1);
}

export function calculateHours(start?: string, end?: string) {
  if (!start || !end) return 0;
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const minutes = (eh * 60 + em) - (sh * 60 + sm);
  return Math.max(0, Math.round((minutes / 60) * 100) / 100);
}
