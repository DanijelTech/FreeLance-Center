import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessagesSquare, Reply, X } from "lucide-react";
import TikTokIcon from "./icons/TikTokIcon";
import { InstagramIcon, YoutubeIcon, XIcon, FacebookIcon } from "./icons/BrandIcons";
import { comments as initialComments } from "../data/mockData";
import CardSkeleton from "./CardSkeleton";

const PLATFORM_CONFIG = {
  instagram: { icon: InstagramIcon, border: "border-pink-500/40", color: "text-pink-400" },
  youtube: { icon: YoutubeIcon, border: "border-red-500/40", color: "text-red-500" },
  tiktok: { icon: TikTokIcon, border: "border-cyan-400/40", color: "text-cyan-300" },
  facebook: { icon: FacebookIcon, border: "border-blue-500/40", color: "text-blue-400" },
  twitter: { icon: XIcon, border: "border-sky-400/40", color: "text-sky-400" },
};

export default function CommentsPanel({ loading }) {
  const [comments, setComments] = useState(initialComments);

  if (loading) return <CardSkeleton className="h-80" />;

  const dismiss = (id) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
      <h2 className="flex items-center gap-2 text-lg font-bold text-text">
        <MessagesSquare className="text-primary" size={20} />
        Komentarji čakajo na odgovor
      </h2>

      <div className="mt-3 space-y-2">
        <AnimatePresence>
          {comments.map((comment) => {
            const cfg = PLATFORM_CONFIG[comment.platform];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={comment.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`flex flex-wrap items-center gap-3 rounded-xl border-l-4 ${cfg.border} bg-white/5 px-3 py-2.5`}
              >
                <Icon size={18} className={`shrink-0 ${cfg.color}`} />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-text">{comment.content}</p>
                  <p className="text-xs text-muted">
                    <span className="font-medium text-text/70">{comment.author}</span> · {comment.time}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button className="flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary/80">
                    <Reply size={13} />
                    Odgovori
                  </button>
                  <button
                    onClick={() => dismiss(comment.id)}
                    className="flex items-center gap-1 rounded-lg bg-white/5 px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-white/10 hover:text-text"
                  >
                    <X size={13} />
                    Zavrzi
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {comments.length === 0 && (
          <p className="py-6 text-center text-sm text-muted">Ni komentarjev, ki čakajo na odgovor 🎉</p>
        )}
      </div>
    </div>
  );
}
