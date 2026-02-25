import { useState } from 'react';
import type { Customer, CaseIntel, ActiveCustomer } from '../../types/index.js';
import { LOGS } from '../../data/logs.js';
import { getSlaRemaining } from '../../utils/sla.js';
import { exportCaseFile } from '../../utils/export.js';
import { Score } from '../common/Score.js';
import { IntelTabs } from '../intel/IntelTabs.js';
import { BehavioralDelta } from './BehavioralDelta.js';
import { ActivityLog } from './ActivityLog.js';

interface CaseViewProps {
  c: Customer;
  intel: CaseIntel | undefined;
  role: 'analyst' | 'lead';
}

export function CaseView({ c, intel }: CaseViewProps) {
  const [exported, setExported] = useState(false);

  if (c.tier === "low") {
    return (
      <div className="case-scroll">
        <div className="case-pad">
          <header className="case-header">
            <div>
              <h2 className="case-name">{c.name}</h2>
              <p className="case-resolved-label">Auto-resolved by WatchTowr</p>
            </div>
            <Score score={c.riskScore} />
          </header>
          <div className="resolved-card">
            <span className="resolved-icon">{"\u2713"}</span>
            <div>
              <p className="label-sm">AI Resolution</p>
              <p className="body-text">{c.resolution}</p>
            </div>
          </div>
          <div className="info-card">
            <p className="label-sm">Original Alert</p>
            <p className="body-text muted">{c.summary}</p>
          </div>
        </div>
      </div>
    );
  }

  const ac = c as ActiveCustomer;
  const sla = ac.slaTier ? getSlaRemaining(ac.slaAssigned, ac.slaTier) : null;
  const doExport = () => {
    exportCaseFile(c, intel);
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div className="case-scroll">
      <div className="case-pad">
        <header className="case-header">
          <div>
            <h2 className="case-name">{ac.name}</h2>
            <p className="case-meta">{ac.age ? ac.age + " \u00B7 " : ""}{ac.location} {"\u00B7"} Opened {ac.accountOpened}</p>
            {sla && (
              <p className="sla-header" style={{ color: sla.color }}>
                {sla.breached ? "\u26A0 SLA BREACHED" : "\u23F1 SLA"}: {sla.text}{sla.breached ? "" : " remaining"}
              </p>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <button className={`export-btn ${exported ? "exported" : ""}`} onClick={doExport}>
              {exported ? "\u2713 Exported" : "\u2193 Export"}
            </button>
            <div style={{ textAlign: "right" }}>
              <Score score={ac.riskScore} />
              <p className="case-meta" style={{ marginTop: 4 }}>{ac.typology}</p>
            </div>
          </div>
        </header>

        {ac.linked && (
          <div className="network-card">
            <p className="label-sm" style={{ color: "var(--risk-high)" }}>Network Detected {"\u2014"} 3 Linked Accounts</p>
            <div className="network-grid">
              {ac.linked.map((a, i) => (
                <div key={i} className="network-person">
                  <div className="np-avatar">{a.name.split(" ").map(n => n[0]).join("")}</div>
                  <div>
                    <p className="np-name">{a.name}</p>
                    <p className="np-detail">{a.age}y {"\u00B7"} {a.bank}</p>
                  </div>
                </div>
              ))}
              <div className="network-line" style={{ textAlign: "center", padding: "8px 0", fontSize: 10, color: "var(--risk-high)", fontFamily: "var(--mono)" }}>
                {"\u2195"} Source: 0xaaaa...1111 (142-address cluster)
              </div>
            </div>
          </div>
        )}

        <div className="summary-card">
          <p className="label-sm" style={{ color: "var(--gold-dark)" }}>AI Assessment</p>
          <p className="body-text">{ac.summary}</p>
        </div>

        <BehavioralDelta c={c} />
        <IntelTabs intel={intel} />

        {ac.transactions && (
          <section>
            <p className="section-label">Transaction Timeline</p>
            <div className="tx-table-wrap">
              <table className="tx-table">
                <thead>
                  <tr><th>Date</th><th>Type</th><th style={{ textAlign: "right" }}>Amount</th><th>Dir</th></tr>
                </thead>
                <tbody>
                  {ac.transactions.map((t, i) => (
                    <tr key={i} className={t.flag ? "flagged" : ""}>
                      <td className="mono">{t.date}</td>
                      <td>{t.type}</td>
                      <td className="mono" style={{ textAlign: "right", fontWeight: 600 }}>${t.amount.toLocaleString()}</td>
                      <td><span className={`dir ${t.dir}`}>{t.dir === "in" ? "\u2193" : "\u2191"}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {ac.flags && (
          <section>
            <p className="section-label">FINTRAC Indicators</p>
            <div className="flags-list">
              {ac.flags.map((f, i) => (
                <div key={i} className="flag-item">
                  <span className="flag-icon">{"\u2691"}</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {ac.report && (
          <div className="report-card">
            <p className="label-sm">Filing Requirement</p>
            <p style={{ fontWeight: 600, fontSize: 14 }}>{ac.report}</p>
          </div>
        )}

        <ActivityLog caseId={ac.id} logs={LOGS[ac.id]} />
      </div>
    </div>
  );
}
