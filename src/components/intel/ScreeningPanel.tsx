import type { ScreeningIntel } from '../../types/index.js';
import { IR } from '../common/IR.js';

export function ScreeningPanel({ d }: { d?: ScreeningIntel }) {
  if (!d) return null;
  return (
    <div className="ipanel">
      <div className="ipanel-grid">
        <IR label="Sanctions" value={d.sanctions} warn={!d.sanctions?.includes("None")} />
        <IR label="Lists" value={d.lists} />
        <IR label="PEP" value={d.pep} warn={d.pep ? !d.pep.includes("Not") : false} />
        <IR label="Adverse Media" value={d.adverseMedia} />
        <IR label="Last Screened" value={d.lastScreened} />
        <IR label="Monitoring" value={d.monitoring} />
      </div>
    </div>
  );
}
