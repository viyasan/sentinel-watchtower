import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CUSTOMERS } from '../../data/customers.js';
import { getSlaRemaining } from '../../utils/sla.js';
import { Score } from '../common/Score.js';
import { Tag } from '../common/Tag.js';
import type { Customer, ActiveCustomer } from '../../types/index.js';

interface QueueProps {
  isOpen: boolean;
}

export function Queue({ isOpen }: QueueProps) {
  const navigate = useNavigate();
  const { id: sel } = useParams<{ id: string }>();
  const [showR, setShowR] = useState(false);

  const cases = Object.values(CUSTOMERS);
  const active = cases.filter((c): c is ActiveCustomer => c.tier !== "low");
  const resolved = cases.filter(c => c.tier === "low");

  const isOverview = !sel;

  const onSel = (id: string | null) => {
    if (id === null) {
      navigate('/dashboard');
    } else {
      navigate(`/case/${id}`);
    }
  };

  return (
    <nav className={`queue ${!isOpen ? 'collapsed' : ''}`}>
      <div className="queue-inner">
        <button
          className={`queue-header ${isOverview ? "queue-header-active" : ""}`}
          onClick={() => onSel(null)}
        >
          <span className="queue-title">{isOverview ? "\u25C9 Overview" : "\u2190 Overview"}</span>
          <span className="queue-count">{active.length} active</span>
        </button>
        <div className="queue-list">
          {active.map(c => {
            const sla = c.slaTier ? getSlaRemaining(c.slaAssigned, c.slaTier) : null;
            return (
              <button key={c.id} className={`queue-item ${sel === c.id ? "active" : ""}`} onClick={() => onSel(c.id)}>
                <div className="qi-top">
                  <span className="qi-name">
                    {c.name}
                    {c.qaStatus === "pending" && <span className="qa-badge qa-pending">{"\u23F3"}</span>}
                    {c.qaStatus === "approved" && <span className="qa-badge qa-approved">{"\u2713"}</span>}
                    {c.calibration?.active && <span className="qa-badge qa-calib">{"\uD83D\uDCCB"}</span>}
                  </span>
                  <Score score={c.riskScore} small />
                </div>
                <div className="qi-bottom">
                  <Tag tag={c.typologyTag} />
                  <span className="qi-type">{c.typology}</span>
                </div>
                {sla && (
                  <div className="sla-row">
                    <span className="sla-icon" style={{ color: sla.color }}>{sla.breached ? "\u26A0" : "\u23F1"}</span>
                    <span className="sla-text" style={{ color: sla.color }}>{sla.text}{sla.breached ? "" : " remaining"}</span>
                  </div>
                )}
              </button>
            );
          })}
          <button className="queue-divider" onClick={() => setShowR(!showR)}>
            <span className="qd-dot" />
            <span>Auto-resolved {"\u00B7"} {resolved.length}</span>
            <span className="qd-arrow">{showR ? "\u2212" : "+"}</span>
          </button>
          {showR && resolved.map((c: Customer) => (
            <button key={c.id} className={`queue-item resolved ${sel === c.id ? "active" : ""}`} onClick={() => onSel(c.id)}>
              <div className="qi-top">
                <span className="qi-name">{c.name}</span>
                <Score score={c.riskScore} small />
              </div>
              <div className="qi-sub">{c.summary}</div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
