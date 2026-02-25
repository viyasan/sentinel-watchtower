import { useParams, useOutletContext } from 'react-router-dom';
import { CUSTOMERS } from '../../data/customers.js';
import { INTEL } from '../../data/intel.js';
import { CaseView } from './CaseView.js';
import { AIPanel } from '../ai/AIPanel.js';
import { DecisionBar } from '../ai/DecisionBar.js';
import type { LayoutContext } from '../layout/AppLayout.js';

export function CaseRoute() {
  const { id } = useParams<{ id: string }>();
  const { role } = useOutletContext<LayoutContext>();
  const c = id ? CUSTOMERS[id] : undefined;
  const intel = id ? INTEL[id] : undefined;

  if (!c) return <div className="case-empty">Select a case</div>;

  return (
    <>
      <CaseView c={c} intel={intel} role={role} />
      <AIPanel c={c} intel={intel} />
      <DecisionBar c={c} role={role} />
    </>
  );
}
