import { useNavigate, useParams } from 'react-router-dom';
import { CUSTOMERS } from '../../data/customers.js';
import type { ActiveCustomer } from '../../types/index.js';

interface TopBarProps {
  role: 'analyst' | 'lead';
  setRole: (role: 'analyst' | 'lead') => void;
  onCalibration: () => void;
  queueOpen: boolean;
  onToggleQueue: () => void;
}

export function TopBar({ role, setRole, onCalibration, queueOpen, onToggleQueue }: TopBarProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const c = id ? CUSTOMERS[id] : undefined;
  const hasCalibration = c && c.tier !== 'low' && (c as ActiveCustomer).calibration?.active;

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="logo-btn" onClick={() => navigate('/dashboard')}>
          <div className="logo-mark"><span>W</span></div>
          <span className="logo-text">WatchTowr</span>
          <span className="logo-sub">Compliance</span>
        </button>
        <button className={`queue-toggle ${queueOpen ? 'queue-toggle-open' : ''}`} onClick={onToggleQueue}>
          <span className="queue-toggle-icon">{queueOpen ? '\u2039' : '\u203A'}</span>
          <span className="queue-toggle-label">{queueOpen ? 'Hide Queue' : 'Case Queue'}</span>
        </button>
      </div>
      <div className="topbar-right">
        {hasCalibration && (
          <button className="calib-trigger" onClick={onCalibration}>
            {"\uD83D\uDCCB"} Calibration
          </button>
        )}
        <div className="role-switcher">
          <span className="role-opt active">V. Ariyarathnam {"\u00B7"} Analyst</span>
        </div>
      </div>
    </header>
  );
}
