import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { messages as initialMessages, conversations } from "../data/mockData";
import { InstagramIcon, YoutubeIcon, XIcon, LinkedinIcon } from "../components/icons/BrandIcons";

const TABS = [
  { id: "all", label: "Vse" },
  { id: "instagram", label: "Instagram" },
  { id: "youtube", label: "YouTube" },
  { id: "twitter", label: "Twitter" },
  { id: "linkedin", label: "LinkedIn" },
];

const PLATFORM_ICON = {
  instagram: { icon: InstagramIcon, color: "text-pink-400" },
  youtube: { icon: YoutubeIcon, color: "text-red-500" },
  twitter: { icon: XIcon, color: "text-sky-400" },
  linkedin: { icon: LinkedinIcon, color: "text-blue-400" },
};

export default function Messages() {
  const [activeTab, setActiveTab] = useState("all");
  const [messages, setMessages] = useState(initialMessages);
  const [selectedId, setSelectedId] = useState(initialMessages[0].id);
  const [draft, setDraft] = useState("");
  const [threads, setThreads] = useState(conversations);

  const filtered = activeTab === "all" ? messages : messages.filter((m) => m.platform === activeTab);
  const selected = messages.find((m) => m.id === selectedId);
  const thread = threads[selectedId] || [];
  const unreadCount = messages.filter((m) => !m.read).length;

  const selectMessage = (id) => {
    setSelectedId(id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  const sendReply = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setThreads((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), { from: "me", text: draft.trim(), time: "zdaj" }],
    }));
    setDraft("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text sm:text-3xl">Sporočila</h1>
          <p className="mt-1 text-sm text-muted">Vsi pogovori iz tvojih povezanih socialnih omrežij na enem mestu.</p>
        </div>
        <span className="rounded-full bg-danger px-3 py-1 text-sm font-bold text-white">{unreadCount} novih</span>
      </div>

      <div className="grid grid-cols-1 gap-4 overflow-hidden rounded-2xl border border-white/5 bg-card shadow-lg lg:grid-cols-[340px_1fr]">
        {/* Levi seznam */}
        <div className="flex flex-col border-white/5 lg:border-r">
          <div className="flex gap-1 overflow-x-auto p-3">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeTab === tab.id ? "bg-primary/15 text-primary" : "text-muted hover:bg-white/5 hover:text-text"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="max-h-[60vh] divide-y divide-white/5 overflow-y-auto lg:max-h-[65vh]">
            {filtered.map((msg) => {
              const platform = PLATFORM_ICON[msg.platform];
              const Icon = platform?.icon;
              const isSelected = msg.id === selectedId;
              return (
                <button
                  key={msg.id}
                  onClick={() => selectMessage(msg.id)}
                  className={`flex w-full items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-white/5 ${
                    isSelected ? "bg-primary/10" : ""
                  }`}
                >
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white">
                    {msg.avatar}
                    {Icon && (
                      <span className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-card ${platform.color}`}>
                        <Icon size={12} />
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`truncate text-sm ${!msg.read ? "font-bold text-text" : "font-medium text-text/80"}`}>{msg.name}</p>
                      {!msg.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                    </div>
                    <p className={`truncate text-sm ${!msg.read ? "text-text/90" : "text-muted"}`}>{msg.preview}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted">{msg.time}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desni - pogovor */}
        <div className="flex flex-col">
          {selected ? (
            <>
              <div className="flex items-center gap-3 border-b border-white/5 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white">
                  {selected.avatar}
                </div>
                <div>
                  <p className="font-semibold text-text">{selected.name}</p>
                  <p className="text-xs text-muted">{TABS.find((t) => t.id === selected.platform)?.label || selected.platform}</p>
                </div>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {thread.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                        m.from === "me" ? "bg-primary text-white" : "bg-white/5 text-text"
                      }`}
                    >
                      <p>{m.text}</p>
                      <p className={`mt-1 text-[11px] ${m.from === "me" ? "text-white/70" : "text-muted"}`}>{m.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <form onSubmit={sendReply} className="flex items-center gap-2 border-t border-white/5 p-3">
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Napiši odgovor..."
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-text placeholder:text-muted/60 focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white transition-colors hover:bg-primary/80"
                >
                  <Send size={18} />
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 p-10 text-muted">
              <MessageCircle size={32} />
              <p>Izberi pogovor za prikaz</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
