import { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { CUSTOMERS } from '../../data/customers.js';
import { TopBar } from './TopBar.js';
import { Queue } from '../queue/Queue.js';
import { CalibrationOverlay } from '../calibration/CalibrationOverlay.js';

export interface LayoutContext {
  role: 'analyst' | 'lead';
}

export function AppLayout() {
  const [role, setRole] = useState<'analyst' | 'lead'>('analyst');
  const [showCalib, setShowCalib] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [queueOpen, setQueueOpen] = useState(!!id);
  const c = id ? CUSTOMERS[id] : undefined;

  useEffect(() => {
    if (id) setQueueOpen(true);
  }, [id]);

  const context: LayoutContext = { role };

  return (
    <div className="app">
      <TopBar role={role} setRole={setRole} onCalibration={() => setShowCalib(true)} queueOpen={queueOpen} onToggleQueue={() => setQueueOpen(o => !o)} />
      <div className="body">
        <Queue isOpen={queueOpen} />
        <main className="main">
          <Outlet context={context} />
        </main>
      </div>
      {showCalib && <CalibrationOverlay c={c} onClose={() => setShowCalib(false)} />}
    </div>
  );
}
