import type { ChainalysisEntry } from '../../types/index.js';
import { IR } from '../common/IR.js';

export function ChainPanel({ d }: { d?: ChainalysisEntry[] }) {
  if (!d?.length) return null;
  return (
    <div className="ipanel">
      {d.map((w, i) => (
        <div key={i} className={`chain-intel level-${w.risk === "SEVERE" ? 3 : w.risk === "HIGH" ? 2 : w.risk === "MEDIUM" ? 1 : 0}`}>
          <div className="ci-header">
            <span className="mono" style={{ fontWeight: 600, fontSize: 12 }}>{w.wallet}</span>
            <span className={`ci-badge ci-${w.risk.toLowerCase()}`}>{w.risk}</span>
          </div>
          <div className="ipanel-grid" style={{ marginTop: 8 }}>
            <IR label="Alert" value={w.alertType} />
            <IR label="Direct" value={w.direct} />
            <IR label="Indirect" value={w.indirect} warn={parseFloat(w.indirect || "0") > 10} />
            <IR label="Categories" value={w.categories} warn />
            <IR label="Counterparty" value={w.counterparty} />
            <IR label="Cross-Chain" value={w.crossChain} warn={w.crossChain !== "None"} />
            <IR label="Cluster" value={w.cluster} />
          </div>
          {i < d.length - 1 && <div className="ipanel-divider" />}
        </div>
      ))}
    </div>
  );
}
