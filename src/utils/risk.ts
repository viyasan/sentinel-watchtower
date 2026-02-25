export function riskColor(s: number): string {
  return s >= 70 ? "var(--risk-high)" : s >= 30 ? "var(--risk-med)" : "var(--risk-low)";
}

export function riskBg(s: number): string {
  return s >= 70 ? "var(--risk-high-bg)" : s >= 30 ? "var(--risk-med-bg)" : "var(--risk-low-bg)";
}
