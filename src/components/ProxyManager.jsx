import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Plus, Zap, Upload, Pencil, Trash2, RefreshCw } from "lucide-react";
import { proxies as initialProxies } from "../data/mockData";
import CardSkeleton from "./CardSkeleton";

const STATUS_CONFIG = {
  active: { label: "Aktiven", dot: "bg-secondary", text: "text-secondary" },
  inactive: { label: "Neaktiven", dot: "bg-danger", text: "text-danger" },
  checking: { label: "Preverjanje", dot: "bg-warning animate-pulse", text: "text-warning" },
};

export default function ProxyManager({ loading, proxies: proxiesProp, onProxiesChange, onAddClick, compact }) {
  const [internalProxies, setInternalProxies] = useState(initialProxies);
  const proxies = proxiesProp ?? internalProxies;
  const setProxies = onProxiesChange ?? setInternalProxies;

  if (loading) return <CardSkeleton className="h-96" />;

  const stats = {
    total: proxies.length,
    active: proxies.filter((p) => p.status === "active").length,
    inactive: proxies.filter((p) => p.status === "inactive").length,
    checking: proxies.filter((p) => p.status === "checking").length,
  };

  // Simulacija testiranja proxyja: preverjanje -> naključen rezultat
  const testProxy = (id) => {
    setProxies((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "checking", speed: "..." } : p))
    );

    setTimeout(() => {
      setProxies((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;
          const success = Math.random() > 0.25;
          return {
            ...p,
            status: success ? "active" : "inactive",
            speed: success ? `${Math.floor(30 + Math.random() * 150)}ms` : "-",
          };
        })
      );
    }, 1500);
  };

  const testAll = () => {
    proxies.forEach((p) => testProxy(p.id));
  };

  const removeProxy = (id) => {
    setProxies((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className={compact ? "" : "rounded-2xl border border-white/5 bg-card p-5 shadow-lg"}>
      {/* Naslov in akcije */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-bold text-text">
          <Lock className="text-primary" size={20} />
          Proxy Manager
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onAddClick}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary/80"
          >
            <Plus size={16} />
            Dodaj Proxy
          </button>
          <button
            onClick={testAll}
            className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-sm font-medium text-text transition-colors hover:bg-white/10"
          >
            <Zap size={16} />
            Testiraj Vse
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-sm font-medium text-text transition-colors hover:bg-white/10">
            <Upload size={16} />
            Uvozi .txt
          </button>
        </div>
      </div>

      {/* Statistika */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatPill label="Skupaj" value={stats.total} color="text-text" />
        <StatPill label="Aktivni" value={stats.active} color="text-secondary" />
        <StatPill label="Neaktivni" value={stats.inactive} color="text-danger" />
        <StatPill label="Preverjanje" value={stats.checking} color="text-warning" />
      </div>

      {/* Tabela proxyjev */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-muted">
              <th className="px-2 py-2">#</th>
              <th className="px-2 py-2">Naslov:Port</th>
              <th className="px-2 py-2">Protokol</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2">Hitrost</th>
              <th className="px-2 py-2">Lokacija</th>
              <th className="px-2 py-2 text-right">Akcije</th>
            </tr>
          </thead>
          <tbody>
            {proxies.map((proxy, idx) => {
              const cfg = STATUS_CONFIG[proxy.status];
              return (
                <motion.tr
                  key={proxy.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-t border-white/5 transition-colors hover:bg-white/5"
                >
                  <td className="px-2 py-3 text-muted">{idx + 1}</td>
                  <td className="px-2 py-3 font-mono text-text">
                    {proxy.address}:{proxy.port}
                  </td>
                  <td className="px-2 py-3">
                    <span className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-xs text-text">
                      {proxy.protocol}
                    </span>
                  </td>
                  <td className="px-2 py-3">
                    <span className={`flex items-center gap-1.5 font-medium ${cfg.text}`}>
                      <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </span>
                  </td>
                  <td className="px-2 py-3 font-mono text-text">{proxy.speed}</td>
                  <td className="px-2 py-3 text-text">
                    {proxy.flag} {proxy.location}
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex justify-end gap-1.5">
                      <ActionButton
                        icon={RefreshCw}
                        label="Test"
                        onClick={() => testProxy(proxy.id)}
                        spinning={proxy.status === "checking"}
                      />
                      <ActionButton icon={Pencil} label="Uredi" />
                      <ActionButton
                        icon={Trash2}
                        label="Briši"
                        danger
                        onClick={() => removeProxy(proxy.id)}
                      />
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatPill({ label, value, color }) {
  return (
    <div className="rounded-xl bg-white/5 px-3 py-2 text-center">
      <p className={`font-mono text-xl font-bold ${color}`}>{value}</p>
      <p className="text-[11px] uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick, danger, spinning }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 transition-colors hover:bg-white/10 ${
        danger ? "text-danger hover:bg-danger/10" : "text-muted hover:text-text"
      }`}
    >
      <Icon size={14} className={spinning ? "animate-spin" : ""} />
    </button>
  );
}
