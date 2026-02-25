import { useState, useEffect } from 'react';
import type { Customer, ActiveCustomer } from '../../types/index.js';

interface DecisionBarProps {
  c: Customer;
  role: 'analyst' | 'lead';
}

export function DecisionBar({ c, role }: DecisionBarProps) {
  const [picked, setPicked] = useState<string | null>(null);
  const [qaAction, setQaAction] = useState<string | null>(null);
  const [qaNotes, setQaNotes] = useState("");

  useEffect(() => { setPicked(null); setQaAction(null); setQaNotes(""); }, [c?.id]);

  if (!c || c.tier === "low") return null;

  const ac = c as ActiveCustomer;

  if (role === "lead" && ac.qaStatus === "pending") {
    return (
      <div className="decision-bar qa-review-bar">
        <div className="decision-top">
          <span className="decision-dot" style={{ background: "var(--gold)" }} />
          <span className="decision-label">QA Review</span>
        </div>
        <div className="qa-info">
          <span className="qa-info-text">Analyst: V. Ariyarathnam {"\u00B7"} Decision: <strong>File STR</strong> {"\u00B7"} Feb 23 at 9:47 AM</span>
        </div>
        <div className="decision-buttons">
          <button className={`decision-btn qa-approve ${qaAction === "approve" ? "picked" : ""}`} onClick={() => setQaAction("approve")}>{"\u2713"} Approve</button>
          <button className={`decision-btn qa-return ${qaAction === "return" ? "picked" : ""}`} onClick={() => setQaAction("return")}>{"\u21A9"} Return</button>
          <button className={`decision-btn qa-override ${qaAction === "override" ? "picked" : ""}`} onClick={() => setQaAction("override")}>{"\u2717"} Override</button>
        </div>
        {qaAction && (
          <>
            <textarea className="qa-notes" placeholder="QA notes..." value={qaNotes} onChange={e => setQaNotes(e.target.value)} rows={2} />
            <div className="decision-confirm">
              {qaAction === "approve" ? "\u2713 Approved \u2014 STR proceeds to filing." : qaAction === "return" ? "\u21A9 Returned to V. Ariyarathnam." : "\u2717 Decision overridden."}
            </div>
          </>
        )}
      </div>
    );
  }

  const acts = [
    { k: "str", label: "File STR", msg: "STR draft queued." },
    { k: "lvctr", label: "File LVCTR", msg: "LVCTR form pre-filled." },
    { k: "eftr", label: "File EFTR", msg: "EFTR form pre-filled \u2014 5 day deadline." },
    { k: "dismiss", label: "Dismiss", msg: "Case archived." },
    { k: "escalate", label: "Escalate", msg: "Sent to Team Lead." },
  ];

  return (
    <div className="decision-bar">
      <div className="decision-top">
        <span className="decision-dot" />
        <span className="decision-label">Human Decision Required</span>
      </div>
      <div className="decision-buttons">
        {acts.map(a => (
          <button
            key={a.k}
            className={`decision-btn ${a.k} ${picked === a.k ? "picked" : ""}`}
            onClick={() => setPicked(a.k)}
          >
            {a.label}
          </button>
        ))}
      </div>
      {picked && (
        <div className="decision-confirm">
          {"\u2713"} {acts.find(a => a.k === picked)!.msg}{picked !== "dismiss" ? " Pending QA." : ""}
        </div>
      )}
    </div>
  );
}
