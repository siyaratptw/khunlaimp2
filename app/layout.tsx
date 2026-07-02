import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ขุนลา IMP2",
  description: "Khunla HR Dashboard for IMP2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
