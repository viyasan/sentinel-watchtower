import { useState } from 'react';
import type { Customer, ActiveCustomer } from '../../types/index.js';

interface CalibrationOverlayProps {
  c: Customer | undefined;
  onClose: () => void;
}

export function CalibrationOverlay({ c, onClose }: CalibrationOverlayProps) {
  const [myD, setMyD] = useState<string | null>(null);

  if (!c || c.tier === 'low') return null;
  const ac = c as ActiveCustomer;
  if (!ac.calibration?.active) return null;

  const cal = ac.calibration;
  const resp = cal.responses.filter(r => r.decision);
  const cons: Record<string, number> = {};
  resp.forEach(r => { if (r.decision) cons[r.decision] = (cons[r.decision] || 0) + 1; });
  const top = Object.entries(cons).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="calib-overlay" onClick={onClose}>
      <div className="calib-modal" onClick={e => e.stopPropagation()}>
        <div className="calib-header">
          <span>{"\uD83D\uDCCB"}</span>
          <span className="calib-title">Calibration {"\u2014"} {ac.id}: {ac.name}</span>
          <button className="calib-close" onClick={onClose}>{"\u00D7"}</button>
        </div>
        <div className="calib-body">
          <div className="calib-question">
            <p className="label-sm">Question</p>
            <p className="calib-q-text">{cal.question}</p>
          </div>
          <div className="calib-my">
            <p className="label-sm">Your Recommendation</p>
            <div className="calib-options">
              {["File STR", "LVCTR only", "Dismiss", "Escalate"].map(d => (
                <button key={d} className={`calib-opt ${myD === d ? "active" : ""}`} onClick={() => setMyD(d)}>{d}</button>
              ))}
            </div>
          </div>
          <div className="calib-responses">
            <p className="label-sm">Team ({resp.length}/{cal.responses.length})</p>
            {cal.responses.map((r, i) => (
              <div key={i} className={`calib-resp ${r.decision ? "" : "pending"}`}>
                <div className="calib-resp-top">
                  <span className="calib-resp-name">{r.analyst} ({r.role})</span>
                  <span className="calib-resp-status">{r.decision || "Pending\u2026"}</span>
                </div>
                {r.note && <p className="calib-resp-note">{r.note}</p>}
              </div>
            ))}
          </div>
          {top && (
            <div className="calib-consensus">Consensus: <strong>{top[0]}</strong> ({top[1]}/{resp.length})</div>
          )}
        </div>
        <div className="calib-footer">
          <button className="calib-btn-close" onClick={onClose}>Close</button>
          <button className="calib-btn-apply" onClick={onClose} disabled={!myD}>Apply</button>
        </div>
      </div>
    </div>
  );
}
