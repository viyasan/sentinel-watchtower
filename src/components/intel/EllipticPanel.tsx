import type { EllipticEntry } from '../../types/index.js';
import { IR } from '../common/IR.js';

export function EllipticPanel({ d }: { d?: EllipticEntry[] }) {
  if (!d?.length) return null;
  return (
    <div className="ipanel">
      {d.map((w, i) => (
        <div key={i} className={`chain-intel level-${w.rl === "SEVERE" ? 3 : w.rl === "HIGH" ? 2 : w.rl === "MEDIUM" ? 1 : 0}`}>
          <div className="ci-header">
            <span className="mono" style={{ fontWeight: 600, fontSize: 12 }}>{w.wallet}</span>
            <span className={`ci-badge ci-${w.rl.toLowerCase()}`}>Holistic {w.hs}</span>
          </div>
          <div className="ipanel-grid" style={{ marginTop: 8 }}>
            <IR label="Wallet Risk" value={w.wr} warn={w.wr?.includes("Severe") || w.wr?.includes("High")} />
            <IR label="Tx Risk" value={w.tr} warn={w.tr?.includes("Severe")} />
            <IR label="Entity Risk" value={w.er} warn={w.er?.includes("Unknown")} />
            <IR label="Cross-Chain" value={w.crossChain} warn={w.crossChain !== "None" && !w.crossChain?.includes("None")} />
            <IR label="Nexus Entities" value={w.ne} />
          </div>
          {w.rf?.length > 0 && (
            <>
              <div className="ipanel-divider" />
              <p className="label-sm" style={{ marginBottom: 4 }}>Rules Fired ({w.rf.length}/{w.rt})</p>
              {w.rf.map((r, ri) => (
                <div key={ri} className="elliptic-rule">{"\u2691 " + r}</div>
              ))}
            </>
          )}
          {i < d.length - 1 && <div className="ipanel-divider" style={{ margin: "10px 0" }} />}
        </div>
      ))}
    </div>
  );
}
