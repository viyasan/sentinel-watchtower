import type { PersonaIntel } from '../../types/index.js';
import { IR } from '../common/IR.js';

export function PersonaPanel({ d }: { d?: PersonaIntel }) {
  if (!d) return null;
  return (
    <div className="ipanel">
      <div className="ipanel-grid">
        <IR label="Status" value={d.status + " (" + d.date + ")"} />
        <IR label="ID Type" value={d.idType} />
        <IR label="Selfie Match" value={typeof d.selfieMatch === "number" ? d.selfieMatch + "%" : d.selfieMatch} />
        <IR label="Name" value={d.nameMatch} />
        <IR label="Address" value={d.addr} />
      </div>
      <div className="ipanel-divider" />
      <div className="ipanel-grid">
        <IR label="Watchlist" value={d.watchlist} />
        <IR label="PEP" value={d.pep} />
        <IR label="Adverse Media" value={d.adverseMedia} />
        <IR label="Tamper" value={d.tamperChecks} />
      </div>
      <div className="ipanel-divider" />
      <div className="ipanel-grid">
        <IR label="Behavioral" value={d.behavioral} warn={d.behavioral?.includes("\u26A0")} />
        <IR label="IP" value={d.ip} />
        <IR label="Device" value={d.device} />
      </div>
    </div>
  );
}
