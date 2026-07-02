export function Mascot({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const cls = `mascot ${size === "lg" ? "large" : size === "sm" ? "small" : ""}`;
  return <div className={cls}><span className="cap">ขุนลา</span><span>🐱</span></div>;
}
