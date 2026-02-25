import type { TRMEntry } from '../../types/index.js';
import { IR } from '../common/IR.js';

export function TRMPanel({ d }: { d?: TRMEntry[] }) {
  if (!d?.length) return null;
  return (
    <div className="ipanel">
      {d.map((w, i) => (
        <div key={i}>
          <div className="ci-header">
            <span className="mono" style={{ fontWeight: 600, fontSize: 12 }}>{w.wallet}</span>
            <span className={`ci-badge ci-${w.rl.toLowerCase()}`}>{w.rl} ({w.riskScore})</span>
          </div>
          <div className="ipanel-grid" style={{ marginTop: 8 }}>
            <IR label="Ownership" value={w.ownership} />
            <IR label="Counterparty" value={w.counterparty} warn={w.counterparty?.includes("High") || w.counterparty?.includes("Severe")} />
            <IR label="Indirect" value={w.indirect} />
            <IR label="VASP" value={w.vasp} />
            <IR label="Volume 30d" value={w.volume30d} />
            <IR label="Risk Vol %" value={w.riskVolPct} warn={parseFloat(w.riskVolPct || "0") > 20} />
            <IR label="Cross-Chain" value={w.crossChain} warn={w.crossChain !== "None"} />
          </div>
          {i < d.length - 1 && <div className="ipanel-divider" />}
        </div>
      ))}
    </div>
  );
}
