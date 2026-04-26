/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Simulation from './pages/Simulation';
import Games from './pages/Games';
import Encyclopedia from './pages/Encyclopedia';
import EmergencyKit from './pages/EmergencyKit';
import OfficeWorkersHome from './pages/OfficeWorkersHome';
import SiteHeader from './components/SiteHeader';
import { AppProvider, useAppContext } from './context/AppContext';

function AppContent() {
  const { t } = useAppContext();
  const location = useLocation();
  const isOfficeWorkersHome = location.pathname === '/';
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {!isOfficeWorkersHome && <SiteHeader />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<OfficeWorkersHome />} />
          <Route path="/legacy-home" element={<Home />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/games/*" element={<Games />} />
          <Route path="/encyclopedia" element={<Encyclopedia />} />
          <Route path="/kit" element={<EmergencyKit />} />
        </Routes>
      </main>
      {!isOfficeWorkersHome && (
        <footer className="bg-[#222] text-white py-20 mt-auto">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="font-bold tracking-widest mb-4">
              {t(
                'Smart Emergency - Resilient Communities under Climate Change',
                '智慧应急——气候变化背景下的韧性社区'
              )}
            </p>
            <p className="text-[14px] text-white/70 tracking-widest">
              {t(
                'May 12-18, 2026 · The 18th National Disaster Prevention and Reduction Week',
                '2026年5月12日-5月18日 · 第18个全国防灾减灾周'
              )}
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}
