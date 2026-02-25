import type { FlinksIntel } from '../../types/index.js';
import { IR } from '../common/IR.js';

export function FlinksPanel({ d }: { d?: FlinksIntel }) {
  if (!d) return null;
  return (
    <div className="ipanel">
      <div className="ipanel-grid">
        <IR label="Income" value={d.incomeSource} />
        <IR label="Monthly" value={d.monthlyIncome} />
        <IR label="Frequency" value={d.frequency} />
        <IR label="Cash Flow" value={d.cashFlow} />
      </div>
      <div className="ipanel-divider" />
      <div className="ipanel-grid">
        <IR label="Liabilities" value={d.liabilities} />
        <IR label="NSF" value={d.nsf} />
        <IR label="Large Deposits" value={d.largeDeposits} warn={d.largeDeposits?.includes("\u26A0")} />
        <IR label="Crypto" value={d.cryptoTransfers} />
      </div>
      {d.anomaly && (
        <div className={`ipanel-alert ${d.anomaly.includes("CRITICAL") ? "alert-critical" : "alert-warn"}`}>
          {d.anomaly}
        </div>
      )}
    </div>
  );
}
