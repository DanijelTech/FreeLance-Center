import { useState } from "react";
import { UserPlus, Loader2, CheckCircle2 } from "lucide-react";
import Modal from "../Modal";
import { InstagramIcon, YoutubeIcon, XIcon, LinkedinIcon, FacebookIcon } from "../icons/BrandIcons";
import TikTokIcon from "../icons/TikTokIcon";

const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: InstagramIcon, gradient: "from-[#feda75] via-[#d62976] to-[#962fbf]" },
  { id: "youtube", label: "YouTube", icon: YoutubeIcon, gradient: "from-[#FF0000] to-[#cc0000]" },
  { id: "tiktok", label: "TikTok", icon: TikTokIcon, gradient: "from-[#00f2ea] via-[#000000] to-[#ff0050]" },
  { id: "twitter", label: "X (Twitter)", icon: XIcon, gradient: "from-[#000000] to-[#1a1a1a]" },
  { id: "linkedin", label: "LinkedIn", icon: LinkedinIcon, gradient: "from-[#0A66C2] to-[#004182]" },
  { id: "facebook", label: "Facebook", icon: FacebookIcon, gradient: "from-[#1877F2] to-[#0a4ea8]" },
];

export default function AddAccountModal({ open, onClose, onAdd }) {
  const [platform, setPlatform] = useState(PLATFORMS[0].id);
  const [handle, setHandle] = useState("");
  const [status, setStatus] = useState("idle"); // idle | connecting | success

  const handleClose = () => {
    setHandle("");
    setStatus("idle");
    setPlatform(PLATFORMS[0].id);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handle.trim() || status === "connecting") return;

    setStatus("connecting");
    // Simulacija OAuth povezave z izbrano platformo
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        const config = PLATFORMS.find((p) => p.id === platform);
        onAdd({
          id: platform,
          name: config.label,
          handle: handle.startsWith("@") ? handle : `@${handle}`,
          gradient: config.gradient,
        });
        handleClose();
      }, 700);
    }, 1400);
  };

  return (
    <Modal open={open} onClose={handleClose} title="Dodaj nov račun" icon={UserPlus}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-xs font-medium text-muted">Platforma</label>
          <div className="grid grid-cols-3 gap-2">
            {PLATFORMS.map((p) => {
              const Icon = p.icon;
              const selected = platform === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatform(p.id)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-medium transition-colors ${
                    selected
                      ? "border-primary/60 bg-primary/10 text-text"
                      : "border-white/10 bg-white/5 text-muted hover:bg-white/10"
                  }`}
                >
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${p.gradient} text-white`}>
                    <Icon size={16} />
                  </span>
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Uporabniško ime / handle</label>
          <input
            type="text"
            placeholder="@mojracun"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-sm text-text placeholder:text-muted/60 focus:border-primary focus:outline-none"
          />
          <p className="mt-1.5 text-xs text-muted">
            Povezava poteka prek uradnega OAuth prijavnega okna platforme (simulacija).
          </p>
        </div>

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
            disabled={status !== "idle"}
            className="flex min-w-[140px] items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/80 disabled:opacity-80"
          >
            {status === "idle" && (
              <>
                <UserPlus size={16} />
                Poveži račun
              </>
            )}
            {status === "connecting" && (
              <>
                <Loader2 size={16} className="animate-spin" />
                Povezujem...
              </>
            )}
            {status === "success" && (
              <>
                <CheckCircle2 size={16} className="text-secondary" />
                Povezano!
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
