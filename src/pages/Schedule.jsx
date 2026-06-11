import { useState } from "react";
import { Calendar, Plus, Clock, CheckCircle2, FileEdit, Trash2 } from "lucide-react";
import Modal from "../components/Modal";
import { scheduledPosts as initialPosts } from "../data/mockData";
import { InstagramIcon, YoutubeIcon, XIcon, LinkedinIcon, FacebookIcon } from "../components/icons/BrandIcons";
import TikTokIcon from "../components/icons/TikTokIcon";

const DAYS = ["Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned"];

const PLATFORM_CONFIG = {
  instagram: { icon: InstagramIcon, gradient: "from-[#feda75] via-[#d62976] to-[#962fbf]", label: "Instagram" },
  youtube: { icon: YoutubeIcon, gradient: "from-[#FF0000] to-[#cc0000]", label: "YouTube" },
  tiktok: { icon: TikTokIcon, gradient: "from-[#00f2ea] via-[#000000] to-[#ff0050]", label: "TikTok" },
  twitter: { icon: XIcon, gradient: "from-[#000000] to-[#1a1a1a]", label: "X (Twitter)" },
  linkedin: { icon: LinkedinIcon, gradient: "from-[#0A66C2] to-[#004182]", label: "LinkedIn" },
  facebook: { icon: FacebookIcon, gradient: "from-[#1877F2] to-[#0a4ea8]", label: "Facebook" },
};

const STATUS_CONFIG = {
  published: { label: "Objavljeno", color: "text-secondary", icon: CheckCircle2 },
  scheduled: { label: "Načrtovano", color: "text-primary", icon: Clock },
  draft: { label: "Osnutek", color: "text-warning", icon: FileEdit },
};

// Datumi tekočega tedna (ponedeljek -> nedelja)
function getWeekDates() {
  const now = new Date();
  const dayIdx = (now.getDay() + 6) % 7; // 0 = ponedeljek
  const monday = new Date(now);
  monday.setDate(now.getDate() - dayIdx);
  return DAYS.map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.getDate() + "." + (d.getMonth() + 1) + ".";
  });
}

const EMPTY_FORM = { platform: "instagram", title: "", day: 0, time: "12:00" };

export default function Schedule() {
  const [posts, setPosts] = useState(initialPosts);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const weekDates = getWeekDates();

  const removePost = (id) => setPosts((prev) => prev.filter((p) => p.id !== id));

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const nextId = Math.max(0, ...posts.map((p) => p.id)) + 1;
    setPosts((prev) => [...prev, { id: nextId, ...form, status: "scheduled" }]);
    setForm(EMPTY_FORM);
    setModalOpen(false);
  };

  const stats = {
    scheduled: posts.filter((p) => p.status === "scheduled").length,
    published: posts.filter((p) => p.status === "published").length,
    draft: posts.filter((p) => p.status === "draft").length,
  };

  const sorted = [...posts].sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text sm:text-3xl">Urnik objav</h1>
          <p className="mt-1 text-sm text-muted">Pregled in načrtovanje objav na vseh socialnih omrežjih.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary/80"
        >
          <Plus size={16} />
          Nova objava
        </button>
      </div>

      {/* Statistika */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={Clock} label="Načrtovane" value={stats.scheduled} color="text-primary" bg="bg-primary/15" />
        <StatCard icon={CheckCircle2} label="Objavljene (ta teden)" value={stats.published} color="text-secondary" bg="bg-secondary/15" />
        <StatCard icon={FileEdit} label="Osnutki" value={stats.draft} color="text-warning" bg="bg-warning/15" />
      </div>

      {/* Tedenski koledar */}
      <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
        <h2 className="flex items-center gap-2 text-lg font-bold text-text">
          <Calendar className="text-primary" size={20} />
          Ta teden
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-7">
          {DAYS.map((day, idx) => (
            <div key={day} className="rounded-xl bg-white/5 p-2">
              <p className="text-center text-xs font-semibold text-muted">
                {day} <span className="text-text/50">{weekDates[idx]}</span>
              </p>
              <div className="mt-2 space-y-1.5">
                {posts
                  .filter((p) => p.day === idx)
                  .map((post) => {
                    const cfg = PLATFORM_CONFIG[post.platform];
                    const Icon = cfg.icon;
                    return (
                      <div
                        key={post.id}
                        title={post.title}
                        className="flex items-center gap-1.5 rounded-lg bg-card p-1.5 text-[11px]"
                      >
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${cfg.gradient} text-white`}>
                          <Icon size={11} />
                        </span>
                        <span className="truncate text-text">{post.time}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seznam objav */}
      <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
        <h2 className="text-lg font-bold text-text">Vse objave</h2>
        <div className="mt-3 divide-y divide-white/5">
          {sorted.map((post) => {
            const platform = PLATFORM_CONFIG[post.platform];
            const status = STATUS_CONFIG[post.status];
            const PIcon = platform.icon;
            const SIcon = status.icon;
            return (
              <div key={post.id} className="flex flex-wrap items-center gap-3 py-3">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${platform.gradient} text-white`}>
                  <PIcon size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-text">{post.title}</p>
                  <p className="text-xs text-muted">
                    {platform.label} · {DAYS[post.day]} {weekDates[post.day]} ob {post.time}
                  </p>
                </div>
                <span className={`flex items-center gap-1.5 text-xs font-medium ${status.color}`}>
                  <SIcon size={14} />
                  {status.label}
                </span>
                <button
                  onClick={() => removePost(post.id)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-muted transition-colors hover:bg-danger/10 hover:text-danger"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal za novo objavo */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nova objava" icon={Calendar}>
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-medium text-muted">Platforma</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(PLATFORM_CONFIG).map(([id, cfg]) => {
                const Icon = cfg.icon;
                const selected = form.platform === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, platform: id }))}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-medium transition-colors ${
                      selected ? "border-primary/60 bg-primary/10 text-text" : "border-white/10 bg-white/5 text-muted hover:bg-white/10"
                    }`}
                  >
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${cfg.gradient} text-white`}>
                      <Icon size={16} />
                    </span>
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Naslov objave</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="npr. Reel: Nov projekt v izdelavi"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-text placeholder:text-muted/60 focus:border-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">Dan</label>
              <select
                value={form.day}
                onChange={(e) => setForm((f) => ({ ...f, day: Number(e.target.value) }))}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-text focus:border-primary focus:outline-none"
              >
                {DAYS.map((d, i) => (
                  <option key={d} value={i} className="bg-card">
                    {d} {weekDates[i]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">Čas</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-sm text-text focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-white/10 hover:text-text"
            >
              Prekliči
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/80"
            >
              <Plus size={16} />
              Dodaj v urnik
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, bg }) {
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
