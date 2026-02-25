import type { PlaidIntel } from '../../types/index.js';
import { IR } from '../common/IR.js';

export function PlaidPanel({ d }: { d?: PlaidIntel }) {
  if (!d) return null;
  return (
    <div className="ipanel">
      <div className="ipanel-grid">
        <IR label="Institution" value={d.institution} />
        <IR label="Account" value={d.accountType} />
        <IR label="Balance" value={d.balance} />
      </div>
      <div className="ipanel-divider" />
      <div className="ipanel-grid">
        <IR label="Name Match" value={d.nameScore} />
        <IR label="Email Match" value={d.emailScore} />
        <IR label="Phone Match" value={d.phoneScore} />
        <IR label="Addr Match" value={d.addressScore} />
      </div>
      <div className="ipanel-divider" />
      <div className="ipanel-grid">
        <IR label="Trust Index" value={d.trustIndex} warn={typeof d.trustIndex === "number" && d.trustIndex < 65} />
        {d.networkSignals && <IR label="Network" value={d.networkSignals} warn={d.networkSignals?.includes("\u26A0")} />}
      </div>
    </div>
  );
}
