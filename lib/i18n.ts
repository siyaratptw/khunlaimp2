import { Lang } from "./types";

export const dict = {
  th: {
    appName: "ขุนลา", subtitle: "บอทสรุปการลา มาสาย WFH OT ประจำทีม",
    loginTitle: "เข้าสู่ระบบขุนลา", password: "รหัสผ่าน", enter: "เข้าใช้งาน", wrongPassword: "รหัสผ่านไม่ถูกต้อง",
    dashboard: "หน้าหลัก", add: "แจ้งข้อมูล", records: "ประวัติทั้งหมด", employees: "พนักงาน", analytics: "Dashboard", ai: "AI Assistant", settings: "ตั้งค่า", logout: "ออกจากระบบ",
    save: "บันทึก", delete: "ลบ", exportExcel: "Export Excel", employee: "ชื่อพนักงาน", type: "ประเภท", leaveMode: "รูปแบบ", startDate: "ตั้งแต่วันที่", endDate: "ถึงวันที่", days: "จำนวนวัน", startTime: "เวลาเริ่ม", endTime: "เวลาสิ้นสุด", hours: "จำนวนชั่วโมง", location: "สถานที่", reason: "เหตุผล / รายละเอียด", status: "สถานะ", reporter: "ผู้แจ้ง", all: "ทั้งหมด", search: "ค้นหา", latest: "รายการล่าสุด",
    todayTotal: "วันนี้ลาทั้งหมด", wfhToday: "WFH วันนี้", lateToday: "มาสายวันนี้", tripToday: "Business Trip", otToday: "OT วันนี้"
  },
  en: {
    appName: "Khunla", subtitle: "Team leave, WFH, late, OT and business trip dashboard",
    loginTitle: "Enter Khunla", password: "Password", enter: "Enter", wrongPassword: "Incorrect password",
    dashboard: "Home", add: "Add record", records: "All records", employees: "Employees", analytics: "Dashboard", ai: "AI Assistant", settings: "Settings", logout: "Log out",
    save: "Save", delete: "Delete", exportExcel: "Export Excel", employee: "Employee", type: "Type", leaveMode: "Mode", startDate: "Start date", endDate: "End date", days: "Days", startTime: "Start time", endTime: "End time", hours: "Hours", location: "Location", reason: "Reason / Detail", status: "Status", reporter: "Reporter", all: "All", search: "Search", latest: "Latest records",
    todayTotal: "Today total", wfhToday: "WFH today", lateToday: "Late today", tripToday: "Business Trip", otToday: "OT today"
  },
  ja: {
    appName: "クンラー", subtitle: "チームの休暇・WFH・遅刻・OT・出張ダッシュボード",
    loginTitle: "クンラーにログイン", password: "パスワード", enter: "ログイン", wrongPassword: "パスワードが正しくありません",
    dashboard: "ホーム", add: "入力", records: "履歴", employees: "社員", analytics: "ダッシュボード", ai: "AIアシスタント", settings: "設定", logout: "ログアウト",
    save: "保存", delete: "削除", exportExcel: "Excel出力", employee: "社員名", type: "種類", leaveMode: "区分", startDate: "開始日", endDate: "終了日", days: "日数", startTime: "開始時間", endTime: "終了時間", hours: "時間", location: "場所", reason: "理由 / 詳細", status: "ステータス", reporter: "報告者", all: "すべて", search: "検索", latest: "最新記録",
    todayTotal: "本日の合計", wfhToday: "本日のWFH", lateToday: "本日の遅刻", tripToday: "出張", otToday: "本日のOT"
  }
} as const;

export function t(lang: Lang, key: keyof typeof dict.th) {
  return dict[lang][key] || dict.th[key];
}
