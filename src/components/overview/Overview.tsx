import { useNavigate, useOutletContext } from 'react-router-dom';
import { CUSTOMERS } from '../../data/customers.js';
import { getSlaRemaining } from '../../utils/sla.js';
import { Score } from '../common/Score.js';
import type { Customer, ActiveCustomer } from '../../types/index.js';
import type { LayoutContext } from '../layout/AppLayout.js';

export function Overview() {
  const navigate = useNavigate();
  useOutletContext<LayoutContext>();
  const cases = CUSTOMERS;
  const all = Object.values(cases);
  const high = all.filter((c): c is ActiveCustomer => c.tier === "high");
  const med = all.filter(c => c.tier === "medium");
  const low = all.filter(c => c.tier === "low");

  const typo: Record<string, number> = {};
  all.filter((c): c is ActiveCustomer => c.tier !== "low").forEach(c => {
    typo[c.typology || "Other"] = (typo[c.typology || "Other"] || 0) + 1;
  });

  const flagVol = all.filter((c): c is ActiveCustomer => 'transactions' in c && !!c.transactions).reduce((s, c) =>
    s + c.transactions.reduce((s2: number, t) => s2 + t.amount, 0), 0);

  const pendQA = all.filter((c): c is ActiveCustomer => 'qaStatus' in c && c.qaStatus === "pending").length;
  const slaBr = all.filter((c): c is ActiveCustomer => 'slaTier' in c && !!c.slaTier)
    .filter(c => getSlaRemaining(c.slaAssigned, c.slaTier).breached).length;

  const onSelect = (id: string) => navigate(`/case/${id}`);

  const metrics: [string | number, string, string][] = [
    [all.length, "Total", ""],
    [low.length, "Auto-Resolved", "ov-green"],
    [high.length + med.length, "Pending", "ov-amber"],
    ["$" + (flagVol / 1000).toFixed(0) + "K", "Flagged Vol", ""],
    [slaBr, "SLA Breaches", slaBr === 0 ? "ov-green" : "ov-red"],
  ];

  return (
    <div className="case-scroll">
      <div className="case-pad">
        <div className="ov-header">
          <div>
            <h2 className="ov-title">Daily Brief</h2>
            <p className="case-meta">February 23, 2026</p>
          </div>
          <div className="ov-badge-row">
            <span className="ov-badge critical">{high.length} Critical</span>
            <span className="ov-badge review">{med.length} Review</span>
            <span className="ov-badge resolved">{low.length} Resolved</span>
          </div>
        </div>

        <div className="ov-metrics">
          {metrics.map(([v, l, cls], i) => (
            <div key={i} className="ov-metric">
              <span className={`ov-metric-num ${cls}`}>{v}</span>
              <span className="ov-metric-label">{l}</span>
            </div>
          ))}
        </div>

        <div className="ov-grid">
          <div className="ov-section">
            <p className="section-label">Alert Breakdown</p>
            <div className="ov-typo-list">
              {Object.entries(typo).map(([name, count]) => {
                const total = high.length + med.length;
                const pct = Math.round((count / total) * 100);
                const isH = high.some(c => c.typology === name);
                return (
                  <div key={name} className="ov-typo-row">
                    <div className="ov-typo-info">
                      <span className={`ov-typo-dot ${isH ? "dot-high" : "dot-med"}`} />
                      <span className="ov-typo-name">{name}</span>
                      <span className="ov-typo-count">{count}</span>
                    </div>
                    <div className="ov-typo-bar-track">
                      <div className={`ov-typo-bar-fill ${isH ? "fill-high" : "fill-med"}`} style={{ width: pct + "%" }} />
                    </div>
                  </div>
                );
              })}
              <div className="ov-typo-row">
                <div className="ov-typo-info">
                  <span className="ov-typo-dot dot-low" />
                  <span className="ov-typo-name">Auto-Resolved</span>
                  <span className="ov-typo-count">{low.length}</span>
                </div>
                <div className="ov-typo-bar-track">
                  <div className="ov-typo-bar-fill fill-low" style={{ width: Math.round((low.length / all.length) * 100) + "%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="ov-section">
            <p className="section-label">FINTRAC Filings</p>
            <div className="ov-filings">
              {([["STR", "str-type", 3, "Suspicious Transaction Reports"], ["LVCTR", "lvctr-type", 4, "Large Virtual Currency"], ["EFTR", "eftr-type", 1, "Electronic Funds Transfer"], ["Travel Rule", "travel-type", 1, "Incomplete originator/beneficiary"]] as const).map(([t, cls, n, d]) => (
                <div key={t} className="ov-filing">
                  <div className="ov-filing-top">
                    <span className={`ov-filing-type ${cls}`}>{t}</span>
                    <span className="ov-filing-count">{n}</span>
                  </div>
                  <p className="ov-filing-desc">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ov-grid">
          <div className="ov-section">
            <p className="section-label">SLA Status</p>
            <div className="ov-sla-list">
              {all.filter((c): c is ActiveCustomer => 'slaTier' in c && !!c.slaTier).map(c => {
                const sla = getSlaRemaining(c.slaAssigned, c.slaTier);
                return (
                  <div key={c.id} className="ov-sla-row">
                    <span className="ov-sla-dot" style={{ background: sla.color }} />
                    <span className="ov-sla-name">{c.id}: {c.name}</span>
                    <span className="ov-sla-tier">({c.slaTier})</span>
                    <span className="ov-sla-time" style={{ color: sla.color }}>{sla.breached ? "\u26A0 " : ""}{sla.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="ov-section">
            <p className="section-label">QA Pipeline</p>
            <div className="ov-qa-grid">
              {([[pendQA, "Pending", "var(--risk-med)"], [1, "Approved", "var(--risk-low)"], [0, "Returned", ""], ["18m", "Avg Time", ""]] as const).map(([v, l, clr], i) => (
                <div key={i} className="ov-qa-stat">
                  <span className="ov-qa-num" style={{ color: clr || "inherit" }}>{v}</span>
                  <span className="ov-qa-label">{l}</span>
                </div>
              ))}
            </div>
            {all.filter((c): c is ActiveCustomer => 'calibration' in c && !!c.calibration?.active).length > 0 && (
              <>
                <div className="ipanel-divider" style={{ margin: "12px 0" }} />
                <p className="label-sm">Active Calibrations</p>
                {all.filter((c): c is ActiveCustomer => 'calibration' in c && !!c.calibration?.active).map(c => (
                  <div key={c.id} className="ov-calib-card">
                    <p className="ov-calib-name">{c.id}: {c.name}</p>
                    <p className="ov-calib-q">{c.calibration!.question.slice(0, 80)}{"\u2026"}</p>
                    <p className="ov-calib-status">{c.calibration!.responses.filter(r => r.decision).length}/{c.calibration!.responses.length} responded</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="ov-section" style={{ marginTop: 4 }}>
          <p className="section-label">Priority Cases</p>
          <div className="ov-priority-list">
            {high.map(c => (
              <button key={c.id} className="ov-priority-card" onClick={() => onSelect(c.id)}>
                <div className="ov-pc-left">
                  <Score score={c.riskScore} />
                  <div>
                    <p className="ov-pc-name">{c.name}</p>
                    <p className="ov-pc-type">{c.typology}</p>
                  </div>
                </div>
                <div className="ov-pc-right">
                  <p className="ov-pc-summary">{c.summary}</p>
                  <span className="ov-pc-arrow">{"\u2192"}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
