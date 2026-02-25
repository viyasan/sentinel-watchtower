import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.js';
import { LoginScreen } from './components/login/LoginScreen.js';
import { AppLayout } from './components/layout/AppLayout.js';
import { Overview } from './components/overview/Overview.js';
import { CaseRoute } from './components/case/CaseRoute.js';

export function App() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Overview />} />
        <Route path="case/:id" element={<CaseRoute />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
