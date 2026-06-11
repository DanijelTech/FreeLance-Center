import { useState } from "react";
import { Lock, Globe, ShieldCheck, Gauge } from "lucide-react";
import ProxyManager from "../components/ProxyManager";
import AddProxyModal from "../components/modals/AddProxyModal";
import { proxies as initialProxies } from "../data/mockData";

export default function ProxyPage() {
  const [proxies, setProxies] = useState(initialProxies);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAdd = (newProxy) => {
    const nextId = Math.max(0, ...proxies.map((p) => p.id)) + 1;
    setProxies((prev) => [...prev, { id: nextId, ...newProxy }]);
  };

  const activeCount = proxies.filter((p) => p.status === "active").length;
  const avgSpeed = (() => {
    const speeds = proxies
      .map((p) => parseInt(p.speed))
      .filter((n) => !Number.isNaN(n));
    if (!speeds.length) return "-";
    return `${Math.round(speeds.reduce((a, b) => a + b, 0) / speeds.length)}ms`;
  })();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text sm:text-3xl">Proxy Manager</h1>
        <p className="mt-1 text-sm text-muted">
          Upravljaj proxy strežnike za varno in anonimno upravljanje socialnih računov.
        </p>
      </div>

      {/* Hitri pregled */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <InfoCard icon={Globe} label="Skupno proxyjev" value={proxies.length} color="text-primary" bg="bg-primary/15" />
        <InfoCard icon={ShieldCheck} label="Trenutno aktivni" value={activeCount} color="text-secondary" bg="bg-secondary/15" />
        <InfoCard icon={Gauge} label="Povprečna hitrost" value={avgSpeed} color="text-warning" bg="bg-warning/15" />
      </div>

      {/* Glavna kartica */}
      <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
        <ProxyManager
          proxies={proxies}
          onProxiesChange={setProxies}
          onAddClick={() => setModalOpen(true)}
          compact
        />
      </div>

      {/* Nasveti */}
      <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
        <h2 className="flex items-center gap-2 text-lg font-bold text-text">
          <Lock className="text-primary" size={20} />
          Nasveti za varno uporabo proxyjev
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          <li>• Za vsak socialni račun uporabi ločen proxy, da preprečiš povezovanje računov.</li>
          <li>• Redno testiraj proxyje - neaktivni proxy lahko povzroči odjavo iz računa.</li>
          <li>• SOCKS5 proxyji so priporočeni za boljšo zasebnost pri avtomatizaciji.</li>
          <li>• Izogibaj se brezplačnim javnim proxyjem za pomembne račune.</li>
        </ul>
      </div>

      <AddProxyModal open={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAdd} />
    </div>
  );
}

function InfoCard({ icon: Icon, label, value, color, bg }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-card p-4 shadow-lg">
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${bg} ${color}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="font-mono text-xl font-bold text-text">{value}</p>
        <p className="text-xs text-muted">{label}</p>
      </div>
    </div>
  );
}
