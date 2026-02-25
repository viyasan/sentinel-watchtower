import { useState } from 'react';
import type { LogEntry } from '../../types/index.js';

interface ActivityLogProps {
  caseId: string;
  logs: LogEntry[] | undefined;
  extraEntries?: LogEntry[];
}

export function ActivityLog({ logs, extraEntries }: ActivityLogProps) {
  const [open, setOpen] = useState(false);
  const allLogs = [...(logs || []), ...(extraEntries || [])];
  if (!allLogs.length) return null;

  const today = allLogs.filter(l => l.date === "Feb 23");
  const earlier = allLogs.filter(l => l.date !== "Feb 23");

  return (
    <section className="alog-section">
      <button className="alog-toggle" onClick={() => setOpen(!open)}>
        <span className="alog-title">{"\uD83D\uDCCB"} Case Activity Log</span>
        <span className="alog-count">{allLogs.length} events</span>
        <span>{open ? "\u25B2" : "\u25BC"}</span>
      </button>
      {open && (
        <div className="alog-list">
          {today.length > 0 && (
            <>
              <div className="alog-date-sep">Feb 23, 2026</div>
              {today.map((l, i) => (
                <div key={"t" + i} className={`alog-entry alog-${l.type}`}>
                  <span className="alog-time">{l.time}</span>
                  <span className="alog-icon">{l.icon}</span>
                  <div className="alog-content">
                    <span className="alog-action"><strong>{l.actor}</strong> {l.action}</span>
                    {l.detail && <span className="alog-detail">{l.detail}</span>}
                  </div>
                </div>
              ))}
            </>
          )}
          {earlier.length > 0 && (
            <>
              <div className="alog-date-sep">Earlier</div>
              {earlier.map((l, i) => (
                <div key={"e" + i} className={`alog-entry alog-${l.type}`}>
                  <span className="alog-time">{l.date} {l.time}</span>
                  <span className="alog-icon">{l.icon}</span>
                  <div className="alog-content">
                    <span className="alog-action"><strong>{l.actor}</strong> {l.action}</span>
                    {l.detail && <span className="alog-detail">{l.detail}</span>}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </section>
  );
}
