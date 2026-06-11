import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import TimeTracking from "./pages/TimeTracking";
import Finance from "./pages/Finance";
import OnlinePresence from "./pages/OnlinePresence";
import CRM from "./pages/CRM";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Messages from "./pages/Messages";
import Schedule from "./pages/Schedule";
import SettingsPage from "./pages/Settings";
import Help from "./pages/Help";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-bg text-text">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((d) => !d)}
          onOpenMobileMenu={() => setMobileOpen(true)}
        />

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1600px]">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/timetracking" element={<TimeTracking />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/online" element={<OnlinePresence />} />
              <Route path="/crm" element={<CRM />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
