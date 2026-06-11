import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import TikTokIcon from "./icons/TikTokIcon";
import { InstagramIcon, YoutubeIcon, XIcon, LinkedinIcon, FacebookIcon } from "./icons/BrandIcons";
import CardSkeleton from "./CardSkeleton";

const PLATFORM_ICON = {
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  tiktok: TikTokIcon,
  twitter: XIcon,
  linkedin: LinkedinIcon,
  facebook: FacebookIcon,
};

// Glavne (poudarjene) statistike za vsako platformo
function getHeroStats(network) {
  switch (network.id) {
    case "instagram":
      return [
        { label: "Sledilci", value: network.followers },
        { label: "Sledim", value: network.following },
      ];
    case "youtube":
      return [
        { label: "Naročniki", value: network.subscribers },
        { label: "Ogledi (mesec)", value: network.views },
      ];
    case "tiktok":
      return [
        { label: "Sledilci", value: network.followers },
        { label: "Všečki", value: network.likes },
      ];
    case "twitter":
      return [
        { label: "Sledilci", value: network.followers },
        { label: "Tviti (mesec)", value: network.tweetsThisMonth },
      ];
    case "linkedin":
      return [
        { label: "Povezave", value: network.connections },
        { label: "Ogledi profila", value: network.profileViews },
      ];
    case "facebook":
      return [
        { label: "Všečki strani", value: network.pageLikes },
        { label: "Doseg (teden)", value: network.reach },
      ];
    default:
      return [];
  }
}

// Dodatne podrobne statistike (spodnji seznam)
function getDetailRows(network) {
  switch (network.id) {
    case "instagram":
      return [
        { label: "Všečki (ta mesec)", value: network.likes },
        { label: "Komentarji (ta mesec)", value: network.comments },
        { label: "Zadnja objava pred", value: network.lastPost },
      ];
    case "youtube":
      return [
        { label: "Komentarji čakajo", value: network.pendingComments },
        { label: "Všečki skupaj", value: network.totalLikes },
        { label: "Novi naročniki danes", value: network.newSubsToday, positive: true },
      ];
    case "tiktok":
      return [
        { label: "Ogledi (ta teden)", value: network.views },
        { label: "Komentarji", value: network.comments },
        { label: "Delitve", value: network.shares },
      ];
    case "twitter":
      return [
        { label: "Všečki prejeti", value: network.likes },
        { label: "Retviti", value: network.retweets },
        { label: "Omembe", value: network.mentions },
        { label: "DM-ji", value: network.dms },
      ];
    case "linkedin":
      return [
        { label: "Všečki objav", value: network.postLikes },
        { label: "Komentarji", value: network.comments },
        { label: "Prošnje za povezavo", value: network.pendingRequests, accent: true },
      ];
    case "facebook":
      return [
        { label: "Komentarji", value: network.comments },
        { label: "Deljenja", value: network.shares },
      ];
    default:
      return [];
  }
}

export default function SocialNetworkCard({ network, loading }) {
  if (loading) return <CardSkeleton className="h-72" />;

  const Icon = PLATFORM_ICON[network.id];
  const heroStats = getHeroStats(network);
  const detailRows = getDetailRows(network);

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 20px 40px -20px rgba(108,99,255,0.35)" }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="flex flex-col rounded-2xl border border-white/5 bg-card p-5 shadow-lg transition-colors hover:border-primary/30"
    >
      {/* Glava kartice */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${network.gradient} text-white shadow-md`}
          >
            <Icon size={22} />
          </div>
          <div>
            <p className="font-semibold text-text">{network.name}</p>
            <p className="text-xs text-muted font-mono">{network.handle}</p>
          </div>
        </div>

        {/* Status / badge */}
        <div className="flex flex-col items-end gap-1.5">
          {network.status === "active" && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-secondary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
              </span>
              Aktivno
            </span>
          )}
          {network.newDMs && (
            <span className="rounded-full bg-danger px-2 py-0.5 text-[11px] font-bold text-white">
              {network.newDMs} novih DM
            </span>
          )}
          {network.trend && (
            <span
              className={`flex items-center gap-1 text-xs font-semibold ${
                network.trend === "up" ? "text-secondary" : "text-danger"
              }`}
            >
              {network.trend === "up" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
              {network.trendPercent}
            </span>
          )}
        </div>
      </div>

      {/* Glavni KPI-ji */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {heroStats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-white/5 px-3 py-2">
            <p className="text-[11px] uppercase tracking-wide text-muted">{stat.label}</p>
            <p className="mt-0.5 font-mono text-lg font-bold text-text">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Sparkline graf rasti */}
      {network.sparkline && (
        <div className="mt-3 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={network.sparkline}>
              <defs>
                <linearGradient id={`spark-${network.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6C63FF" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#6C63FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke="#6C63FF"
                strokeWidth={2}
                fill={`url(#spark-${network.id})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Podrobne vrstice */}
      <div className="mt-3 flex-1 space-y-2 border-t border-white/5 pt-3 text-sm">
        {detailRows.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span className="text-muted">{row.label}</span>
            <span
              className={`font-mono font-medium ${
                row.positive ? "text-secondary" : row.accent ? "text-warning" : "text-text"
              }`}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
