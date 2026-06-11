import { useState } from "react";
import { Lock, Plus } from "lucide-react";
import Modal from "../Modal";

const PROTOCOLS = ["HTTP", "HTTPS", "SOCKS5"];

const COUNTRIES = [
  { label: "Slovenija", flag: "🇸🇮" },
  { label: "Nemčija", flag: "🇩🇪" },
  { label: "Nizozemska", flag: "🇳🇱" },
  { label: "ZDA", flag: "🇺🇸" },
  { label: "Japonska", flag: "🇯🇵" },
  { label: "UK", flag: "🇬🇧" },
  { label: "Francija", flag: "🇫🇷" },
];

const EMPTY_FORM = { address: "", port: "", protocol: "HTTPS", country: "Slovenija" };

export default function AddProxyModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.address.trim() || !form.port.trim()) {
      setError("Naslov in port sta obvezna polja.");
      return;
    }
    const country = COUNTRIES.find((c) => c.label === form.country);
    onAdd({
      address: form.address.trim(),
      port: form.port.trim(),
      protocol: form.protocol,
      location: country.label,
      flag: country.flag,
      status: "checking",
      speed: "...",
    });
    setForm(EMPTY_FORM);
    setError("");
    onClose();
  };

  const handleClose = () => {
    setForm(EMPTY_FORM);
    setError("");
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Dodaj nov proxy" icon={Lock}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <label className="mb-1 block text-xs font-medium text-muted">Naslov</label>
            <input
              type="text"
              placeholder="185.234.219.90"
              value={form.address}
              onChange={update("address")}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-sm text-text placeholder:text-muted/60 focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Port</label>
            <input
              type="text"
              placeholder="8080"
              value={form.port}
              onChange={update("port")}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-sm text-text placeholder:text-muted/60 focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Protokol</label>
            <select
              value={form.protocol}
              onChange={update("protocol")}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-text focus:border-primary focus:outline-none"
            >
              {PROTOCOLS.map((p) => (
                <option key={p} value={p} className="bg-card">
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Lokacija</label>
            <select
              value={form.country}
              onChange={update("country")}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-text focus:border-primary focus:outline-none"
            >
              {COUNTRIES.map((c) => (
                <option key={c.label} value={c.label} className="bg-card">
                  {c.flag} {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="text-sm text-danger">{error}</p>}

        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-white/10 hover:text-text"
          >
            Prekliči
          </button>
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/80"
          >
            <Plus size={16} />
            Dodaj proxy
          </button>
        </div>
      </form>
    </Modal>
  );
}
