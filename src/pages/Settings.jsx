import { useState } from "react";
import {
  User,
  Bot,
  Server,
  Plug,
  CheckCircle2,
  XCircle,
  Loader2,
  Plus,
  Unlink,
  Bell,
  Save,
  Sparkles,
  MessageSquareReply,
  Smile,
  FileText,
} from "lucide-react";
import Toggle from "../components/Toggle";
import AddAccountModal from "../components/modals/AddAccountModal";
import { socialNetworks, lmStudioModels, agentLogs } from "../data/mockData";
import { InstagramIcon, YoutubeIcon, XIcon, LinkedinIcon, FacebookIcon } from "../components/icons/BrandIcons";
import TikTokIcon from "../components/icons/TikTokIcon";

const PLATFORM_ICON = {
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  tiktok: TikTokIcon,
  twitter: XIcon,
  linkedin: LinkedinIcon,
  facebook: FacebookIcon,
};

const LOG_ICON = {
  reply: MessageSquareReply,
  sentiment: Smile,
  comment: MessageSquareReply,
  summary: FileText,
};

export default function Settings() {
  // Profil
  const [profile, setProfile] = useState({
    name: "Danijel C.",
    email: "cvijetic.danijel@gmail.com",
    bio: "Freelance razvijalec in ustvarjalec vsebin. Pomagam podjetjem zgraditi spletne strani in rasti na socialnih omrežjih.",
  });
  const [savedMsg, setSavedMsg] = useState(false);

  // Povezani računi
  const [accounts, setAccounts] = useState(
    socialNetworks.map((n) => ({ id: n.id, name: n.name, handle: n.handle, gradient: n.gradient }))
  );
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  // LM Studio
  const [lmUrl, setLmUrl] = useState("http://localhost:1234/v1");
  const [lmStatus, setLmStatus] = useState("idle"); // idle | testing | connected | error
  const [lmModel, setLmModel] = useState("");

  // Hermes Agent
  const [hermesUrl, setHermesUrl] = useState("http://localhost:8765");
  const [hermesKey, setHermesKey] = useState("");
  const [hermesStatus, setHermesStatus] = useState("idle");

  // Avtomatizacije
  const [automations, setAutomations] = useState({
    autoReplyDM: true,
    autoReplyComments: false,
    sentimentAnalysis: true,
    dailySummary: true,
  });

  // Obvestila
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weeklyReport: true,
  });

  const testLmStudio = () => {
    setLmStatus("testing");
    setTimeout(() => {
      const success = Math.random() > 0.15;
      setLmStatus(success ? "connected" : "error");
      if (success) setLmModel(lmStudioModels[0]);
    }, 1300);
  };

  const testHermes = () => {
    setHermesStatus("testing");
    setTimeout(() => {
      setHermesStatus(Math.random() > 0.15 ? "connected" : "error");
    }, 1300);
  };

  const disconnectAccount = (idx) => setAccounts((prev) => prev.filter((_, i) => i !== idx));

  const addAccount = (account) => setAccounts((prev) => [...prev, account]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text sm:text-3xl">Nastavitve</h1>
        <p className="mt-1 text-sm text-muted">Upravljaj svoj profil, povezane račune in AI avtomatizacijo.</p>
      </div>

      {/* Profil */}
      <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
        <h2 className="flex items-center gap-2 text-lg font-bold text-text">
          <User className="text-primary" size={20} />
          Profil
        </h2>
        <form onSubmit={handleSaveProfile} className="mt-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xl font-bold text-white">
              DC
            </div>
            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted">Ime</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-text focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted">E-pošta</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-text focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Bio</label>
            <textarea
              rows={3}
              value={profile.bio}
              onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
              className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-text focus:border-primary focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/80"
            >
              <Save size={16} />
              Shrani spremembe
            </button>
            {savedMsg && <span className="text-sm text-secondary">Spremembe shranjene!</span>}
          </div>
        </form>
      </div>

      {/* Povezani računi */}
      <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-bold text-text">
            <Plug className="text-primary" size={20} />
            Povezani računi
          </h2>
          <button
            onClick={() => setAccountModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary/80"
          >
            <Plus size={16} />
            Dodaj račun
          </button>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {accounts.map((acc, idx) => {
            const Icon = PLATFORM_ICON[acc.id];
            return (
              <div key={`${acc.id}-${idx}`} className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${acc.gradient} text-white`}>
                  <Icon size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-text">{acc.name}</p>
                  <p className="truncate text-xs text-muted font-mono">{acc.handle}</p>
                </div>
                <button
                  onClick={() => disconnectAccount(idx)}
                  title="Prekini povezavo"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-muted transition-colors hover:bg-danger/10 hover:text-danger"
                >
                  <Unlink size={14} />
                </button>
              </div>
            );
          })}
          {accounts.length === 0 && (
            <p className="text-sm text-muted">Ni povezanih računov. Dodaj prvi račun zgoraj.</p>
          )}
        </div>
      </div>

      {/* AI Integracija - Hermes Agent + LM Studio */}
      <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
        <h2 className="flex items-center gap-2 text-lg font-bold text-text">
          <Sparkles className="text-primary" size={20} />
          AI Integracija - Hermes Agent &amp; LM Studio
        </h2>
        <p className="mt-1 text-sm text-muted">
          Poveži lokalnega Hermes agenta z LM Studio strežnikom za avtomatske odgovore, analizo komentarjev in povzetke.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* LM Studio */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-text">
              <Server size={16} className="text-secondary" />
              LM Studio strežnik
            </h3>
            <div className="mt-3 space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Base URL</label>
                <input
                  type="text"
                  value={lmUrl}
                  onChange={(e) => setLmUrl(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-bg px-3 py-2 font-mono text-sm text-text focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={testLmStudio}
                  disabled={lmStatus === "testing"}
                  className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-text transition-colors hover:bg-white/20 disabled:opacity-60"
                >
                  {lmStatus === "testing" ? <Loader2 size={14} className="animate-spin" /> : <Plug size={14} />}
                  Testiraj povezavo
                </button>
                <ConnectionBadge status={lmStatus} />
              </div>

              {lmStatus === "connected" && (
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted">Aktivni model</label>
                  <select
                    value={lmModel}
                    onChange={(e) => setLmModel(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-bg px-3 py-2 font-mono text-sm text-text focus:border-primary focus:outline-none"
                  >
                    {lmStudioModels.map((m) => (
                      <option key={m} value={m} className="bg-card">
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Hermes Agent */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-text">
              <Bot size={16} className="text-primary" />
              Hermes Agent
            </h3>
            <div className="mt-3 space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Agent URL</label>
                <input
                  type="text"
                  value={hermesUrl}
                  onChange={(e) => setHermesUrl(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-bg px-3 py-2 font-mono text-sm text-text focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">API ključ (neobvezno)</label>
                <input
                  type="password"
                  value={hermesKey}
                  onChange={(e) => setHermesKey(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-lg border border-white/10 bg-bg px-3 py-2 font-mono text-sm text-text placeholder:text-muted/60 focus:border-primary focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={testHermes}
                  disabled={hermesStatus === "testing"}
                  className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-text transition-colors hover:bg-white/20 disabled:opacity-60"
                >
                  {hermesStatus === "testing" ? <Loader2 size={14} className="animate-spin" /> : <Plug size={14} />}
                  Testiraj povezavo
                </button>
                <ConnectionBadge status={hermesStatus} />
              </div>
            </div>
          </div>
        </div>

        {/* Avtomatizacije */}
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="text-sm font-bold text-text">Avtomatizacije agenta</h3>
          <div className="mt-1 divide-y divide-white/5">
            <Toggle
              label="Samodejni odgovori na zasebna sporočila"
              description="Hermes pripravi predlog odgovora na nove DM-je z uporabo izbranega modela."
              checked={automations.autoReplyDM}
              onChange={(v) => setAutomations((a) => ({ ...a, autoReplyDM: v }))}
            />
            <Toggle
              label="Samodejni odgovori na komentarje"
              description="Agent predlaga odgovore na komentarje pod objavami."
              checked={automations.autoReplyComments}
              onChange={(v) => setAutomations((a) => ({ ...a, autoReplyComments: v }))}
            />
            <Toggle
              label="Analiza razpoloženja (sentiment)"
              description="Vsak nov komentar se samodejno označi kot pozitiven, nevtralen ali negativen."
              checked={automations.sentimentAnalysis}
              onChange={(v) => setAutomations((a) => ({ ...a, sentimentAnalysis: v }))}
            />
            <Toggle
              label="Dnevni povzetek aktivnosti"
              description="Vsak dan ob 20h prejmi povzetek dogajanja na vseh kanalih."
              checked={automations.dailySummary}
              onChange={(v) => setAutomations((a) => ({ ...a, dailySummary: v }))}
            />
          </div>
        </div>

        {/* Dnevnik agenta */}
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="text-sm font-bold text-text">Nedavna dejanja agenta</h3>
          <div className="mt-2 space-y-2">
            {agentLogs.map((log) => {
              const Icon = LOG_ICON[log.type] || FileText;
              return (
                <div key={log.id} className="flex items-center gap-3 text-sm">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Icon size={14} />
                  </span>
                  <span className="flex-1 text-text/90">{log.text}</span>
                  <span className="shrink-0 text-xs text-muted">{log.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Obvestila */}
      <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
        <h2 className="flex items-center gap-2 text-lg font-bold text-text">
          <Bell className="text-primary" size={20} />
          Obvestila
        </h2>
        <div className="mt-2 divide-y divide-white/5">
          <Toggle
            label="E-poštna obvestila"
            description="Prejemaj obvestila o novih sporočilih in komentarjih po e-pošti."
            checked={notifications.email}
            onChange={(v) => setNotifications((n) => ({ ...n, email: v }))}
          />
          <Toggle
            label="Push obvestila"
            description="Takojšnja obvestila v brskalniku."
            checked={notifications.push}
            onChange={(v) => setNotifications((n) => ({ ...n, push: v }))}
          />
          <Toggle
            label="Tedensko poročilo"
            description="Vsak ponedeljek prejmi povzetek statistik prejšnjega tedna."
            checked={notifications.weeklyReport}
            onChange={(v) => setNotifications((n) => ({ ...n, weeklyReport: v }))}
          />
        </div>
      </div>

      <AddAccountModal open={accountModalOpen} onClose={() => setAccountModalOpen(false)} onAdd={addAccount} />
    </div>
  );
}

function ConnectionBadge({ status }) {
  if (status === "connected")
    return (
      <span className="flex items-center gap-1 text-xs font-medium text-secondary">
        <CheckCircle2 size={14} />
        Povezano
      </span>
    );
  if (status === "error")
    return (
      <span className="flex items-center gap-1 text-xs font-medium text-danger">
        <XCircle size={14} />
        Napaka pri povezavi
      </span>
    );
  if (status === "testing")
    return <span className="text-xs font-medium text-warning">Preverjanje...</span>;
  return <span className="text-xs font-medium text-muted">Ni testirano</span>;
}
