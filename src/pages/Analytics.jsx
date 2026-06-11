import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { BarChart3 } from "lucide-react";
import StatsCards from "../components/StatsCards";
import { engagementHistory, platformComparison, topPosts } from "../data/mockData";
import { InstagramIcon, YoutubeIcon, XIcon, LinkedinIcon, FacebookIcon } from "../components/icons/BrandIcons";
import TikTokIcon from "../components/icons/TikTokIcon";

const PLATFORM_LINES = [
  { key: "instagram", label: "Instagram", color: "#d62976" },
  { key: "tiktok", label: "TikTok", color: "#00f2ea" },
  { key: "youtube", label: "YouTube", color: "#FF0000" },
  { key: "twitter", label: "X", color: "#94a3b8" },
  { key: "linkedin", label: "LinkedIn", color: "#0A66C2" },
  { key: "facebook", label: "Facebook", color: "#1877F2" },
];

const PLATFORM_ICON = {
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  tiktok: TikTokIcon,
  twitter: XIcon,
  linkedin: LinkedinIcon,
  facebook: FacebookIcon,
};

export default function Analytics() {
  const [visiblePlatforms, setVisiblePlatforms] = useState(
    Object.fromEntries(PLATFORM_LINES.map((p) => [p.key, true]))
  );

  const togglePlatform = (key) =>
    setVisiblePlatforms((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text sm:text-3xl">Analytics</h1>
        <p className="mt-1 text-sm text-muted">Podroben pregled rasti in angažiranosti na vseh kanalih.</p>
      </div>

      <StatsCards loading={false} />

      {/* Graf rasti angažiranosti */}
      <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-bold text-text">
            <BarChart3 className="text-primary" size={20} />
            Rast angažiranosti (zadnjih 14 dni)
          </h2>
          <div className="flex flex-wrap gap-2">
            {PLATFORM_LINES.map((p) => (
              <button
                key={p.key}
                onClick={() => togglePlatform(p.key)}
                className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
                  visiblePlatforms[p.key]
                    ? "border-white/10 bg-white/5 text-text"
                    : "border-white/5 bg-transparent text-muted/50"
                }`}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={engagementHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3148" />
              <XAxis dataKey="date" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "#1A1D2E", border: "1px solid #2d3148", borderRadius: 8 }}
                labelStyle={{ color: "#E2E8F0" }}
              />
              <Legend />
              {PLATFORM_LINES.filter((p) => visiblePlatforms[p.key]).map((p) => (
                <Line
                  key={p.key}
                  type="monotone"
                  dataKey={p.key}
                  name={p.label}
                  stroke={p.color}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Primerjava platform */}
        <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
          <h2 className="text-lg font-bold text-text">Primerjava sledilcev po platformah</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformComparison} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3148" horizontal={false} />
                <XAxis type="number" stroke="#64748B" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="#64748B" fontSize={12} width={90} />
                <Tooltip
                  contentStyle={{ background: "#1A1D2E", border: "1px solid #2d3148", borderRadius: 8 }}
                  labelStyle={{ color: "#E2E8F0" }}
                />
                <Bar dataKey="followers" radius={[0, 6, 6, 0]}>
                  {platformComparison.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Engagement rate tabela */}
          <div className="mt-4 space-y-2">
            {platformComparison.map((p) => (
              <div key={p.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
                  {p.name}
                </span>
                <span className="font-mono font-medium text-text">{p.engagement}% engagement</span>
              </div>
            ))}
          </div>
        </div>

        {/* Najbolj uspešne objave */}
        <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
          <h2 className="text-lg font-bold text-text">Najbolj uspešne objave</h2>
          <div className="mt-4 space-y-2">
            {topPosts.map((post, idx) => {
              const Icon = PLATFORM_ICON[post.platform];
              return (
                <div key={post.id} className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-sm font-bold text-primary">
                    {idx + 1}
                  </span>
                  <Icon size={18} className="shrink-0 text-text/70" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-text">{post.title}</p>
                    <p className="text-xs text-muted">{post.date}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-mono font-semibold text-text">{post.metric}</p>
                    <p className="text-xs text-secondary">{post.engagement}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
