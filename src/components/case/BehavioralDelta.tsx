import type { Customer } from '../../types/index.js';

interface BehavioralDeltaProps {
  c: Customer;
}

export function BehavioralDelta({ c }: BehavioralDeltaProps) {
  if (!('behavioral' in c) || !c.behavioral) return null;
  const b = c.behavioral;

  const sevColors: Record<string, string> = { critical: "var(--risk-high)", warning: "var(--risk-med)", info: "var(--text-secondary)" };
  const sevBgs: Record<string, string> = { critical: "var(--risk-high-bg)", warning: "var(--risk-med-bg)", info: "var(--surface)" };
  const levelColors: Record<string, string> = { low: "var(--risk-low)", medium: "var(--risk-med)", high: "var(--risk-med)", severe: "var(--risk-high)" };

  return (
    <section className="delta-section" style={{ borderLeftColor: sevColors[b.severity] || "var(--text-tertiary)", background: sevBgs[b.severity] || "var(--surface)" }}>
      <div className="delta-header">
        <span className="delta-icon">{b.severity === "critical" ? "\u26A1" : b.severity === "warning" ? "\u26A0" : "\u2713"}</span>
        <span className="delta-title">{b.severity === "info" ? "Behavior Consistent" : "Behavioral Change Detected"}</span>
        <span className="delta-period">{b.cp}</span>
      </div>
      <div className="delta-grid">
        {b.metrics.map((m, i) => (
          <div key={i} className="delta-row">
            <span className="delta-label">{m.label}</span>
            <span className="delta-baseline">{m.baseline}</span>
            <span className="delta-arrow">{"\u2192"}</span>
            <span className="delta-current">{m.current}</span>
            <span className={`delta-change delta-${m.sev}`}>
              {m.dir === "up" ? "\u25B2" : m.dir === "down" ? "\u25BC" : m.dir === "new" ? "\u25C6" : ""} {m.change}
            </span>
          </div>
        ))}
      </div>
      <div className="delta-trajectory">
        <span className="delta-traj-label">Risk Trajectory</span>
        <div className="delta-traj-bar">
          {b.traj.map((t, i) => (
            <div key={i} className="delta-traj-point">
              <div className="delta-dot" style={{ background: levelColors[t.l] }} />
              <span className="delta-dot-label">{t.d}</span>
              <span className="delta-dot-level" style={{ color: levelColors[t.l] }}>{t.l.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="delta-footer">
        <span className="delta-conf">Confidence: <strong>{b.confidence}</strong></span>
        <span className="delta-break">Pattern break: {b.bd}</span>
      </div>
      <p className="delta-explain">{b.exp}</p>
    </section>
  );
}
