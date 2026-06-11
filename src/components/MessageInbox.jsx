import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { InstagramIcon, YoutubeIcon, XIcon, LinkedinIcon } from "./icons/BrandIcons";
import { messages as initialMessages } from "../data/mockData";
import CardSkeleton from "./CardSkeleton";

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

export default function MessageInbox({ loading }) {
  const [activeTab, setActiveTab] = useState("all");
  const [messages, setMessages] = useState(initialMessages);

  if (loading) return <CardSkeleton className="h-96" />;

  const filtered =
    activeTab === "all" ? messages : messages.filter((m) => m.platform === activeTab);

  const markAsRead = (id) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  return (
    <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
      {/* Naslov */}
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-text">
          <MessageCircle className="text-primary" size={20} />
          Sporočila
        </h2>
        <span className="rounded-full bg-danger px-2.5 py-1 text-xs font-bold text-white">
          7 novih
        </span>
      </div>

      {/* Zavihki */}
      <div className="mt-3 flex gap-1 overflow-x-auto pb-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-primary/15 text-primary"
                : "text-muted hover:bg-white/5 hover:text-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Seznam sporočil */}
      <div className="mt-3 divide-y divide-white/5">
        {filtered.map((msg) => {
          const platform = PLATFORM_ICON[msg.platform];
          const Icon = platform?.icon;
          return (
            <motion.button
              key={msg.id}
              onClick={() => markAsRead(msg.id)}
              whileHover={{ x: 4 }}
              className="flex w-full items-center gap-3 py-3 text-left transition-colors hover:bg-white/5 rounded-lg px-2 -mx-2"
            >
              {/* Avatar */}
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white">
                {msg.avatar}
                {Icon && (
                  <span className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-card ${platform.color}`}>
                    <Icon size={12} />
                  </span>
                )}
              </div>

              {/* Vsebina */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className={`truncate text-sm ${!msg.read ? "font-bold text-text" : "font-medium text-text/80"}`}>
                    {msg.name}
                  </p>
                  {!msg.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                </div>
                <p className={`truncate text-sm ${!msg.read ? "text-text/90" : "text-muted"}`}>
                  {msg.preview}
                </p>
              </div>

              {/* Čas */}
              <span className="shrink-0 text-xs text-muted">{msg.time}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
