import { NOW } from '../data/constants.js';

export interface SlaResult {
  text: string;
  color: string;
  pct: number;
  breached: boolean;
}

export function getSlaRemaining(assigned: string, tier: '4h' | '24h'): SlaResult {
  const hrs = tier === "4h" ? 4 : 24;
  const deadline = new Date(new Date(assigned).getTime() + hrs * 3600000);
  const diff = deadline.getTime() - NOW.getTime();
  if (diff <= 0) return { text: Math.abs(Math.floor(diff / 60000)) + "m overdue", color: "var(--risk-high)", pct: 0, breached: true };
  const h = Math.floor(diff / 3600000), m = Math.floor((diff % 3600000) / 60000);
  const pct = diff / (hrs * 3600000);
  const color = pct > 0.5 ? "var(--risk-low)" : pct > 0.25 ? "var(--risk-med)" : "var(--risk-high)";
  return { text: h > 0 ? h + "h " + m + "m" : m + "m", color, pct, breached: false };
}
