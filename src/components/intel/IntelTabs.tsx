import { useState } from 'react';
import type { CaseIntel } from '../../types/index.js';
import { TABS } from '../../data/constants.js';
import { PersonaPanel } from './PersonaPanel.js';
import { PlaidPanel } from './PlaidPanel.js';
import { FlinksPanel } from './FlinksPanel.js';
import { ChainPanel } from './ChainPanel.js';
import { TRMPanel } from './TRMPanel.js';
import { EllipticPanel } from './EllipticPanel.js';
import { ScreeningPanel } from './ScreeningPanel.js';

interface IntelTabsProps {
  intel: CaseIntel | undefined;
}

export function IntelTabs({ intel }: IntelTabsProps) {
  const [tab, setTab] = useState("persona");
  if (!intel) return null;

  const panels: Record<string, React.ReactNode> = {
    persona: <PersonaPanel d={intel.persona} />,
    plaid: <PlaidPanel d={intel.plaid} />,
    flinks: <FlinksPanel d={intel.flinks} />,
    chainalysis: <ChainPanel d={intel.chainalysis} />,
    trm: <TRMPanel d={intel.trm} />,
    elliptic: <EllipticPanel d={intel.elliptic} />,
    screening: <ScreeningPanel d={intel.screening} />,
  };

  return (
    <section className="intel-section">
      <p className="section-label">Intelligence Sources</p>
      <div className="intel-tabs">
        {TABS.map(t => (
          <button
            key={t.key}
            className={`intel-tab ${tab === t.key ? "active" : ""}`}
            onClick={() => setTab(t.key)}
          >
            <span className="it-label">{t.label}</span>
            <span className="it-sub">{t.sub}</span>
          </button>
        ))}
      </div>
      <div className="intel-content">{panels[tab]}</div>
    </section>
  );
}
