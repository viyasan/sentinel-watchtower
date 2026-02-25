import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js';
import { App } from './App.js';
import './styles/global.css';
import './styles/login.css';
import './styles/layout.css';
import './styles/queue.css';
import './styles/case.css';
import './styles/intel.css';
import './styles/ai.css';
import './styles/overview.css';
import './styles/calibration.css';
import './styles/delta.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
