import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, TrendingUp, TrendingDown, Users, Heart, MessageCircle, Share2, Eye,
  Bell, BellOff, Search, Filter, RefreshCw, ExternalLink, MoreVertical, CheckCircle2, AlertCircle, Clock,
  Sparkles, Zap, BarChart3, Activity, Target, Megaphone, Rss, Calendar, Hash,
  AtSign, Heart as HeartIcon, Bookmark, BookmarkPlus, Clock as ClockIcon,
  AlertTriangle, ThumbsUp, MessageSquare, Share, Eye as ViewIcon, Send,
  BarChart2, PieChart as PieChartIcon, LineChart, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { InstagramIcon, YoutubeIcon, XIcon, LinkedinIcon, FacebookIcon } from "../components/icons/BrandIcons";
import TikTokIcon from "../components/icons/TikTokIcon";

const SOCIAL_PLATFORMS = [
  { id: "instagram", name: "Instagram", color: "#E4405F", gradient: "from-[#feda75] via-[#d62976] to-[#962fbf]", icon: InstagramIcon },
  { id: "youtube", name: "YouTube", color: "#FF0000", gradient: "from-[#FF0000] to-[#cc0000]", icon: YoutubeIcon },
  { id: "twitter", name: "X (Twitter)", color: "#1DA1F2", gradient: "from-[#1DA1F2] to-[#0d8ecf]", icon: XIcon },
  { id: "linkedin", name: "LinkedIn", color: "#0A66C2", gradient: "from-[#0A66C2] to-[#004182]", icon: LinkedinIcon },
  { id: "facebook", name: "Facebook", color: "#1877F2", gradient: "from-[#1877F2] to-[#0a4ea8]", icon: FacebookIcon },
  { id: "tiktok", name: "TikTok", color: "#00f2ea", gradient: "from-[#00f2ea] via-[#000000] to-[#ff0050]", icon: TikTokIcon },
];

const POSTS = [
  { id: 1, platform: "instagram", type: "reel", content: "5 trikov za hitrejši React razvoj ⚛️", date: "2026-06-10", views: 45600, likes: 3420, comments: 234, shares: 89, engagement: 8.2 },
  { id: 2, platform: "youtube", type: "video", content: "Kako sem zgradil dashboard v enem dnevu", date: "2026-06-08", views: 23100, likes: 1840, comments: 156, shares: 45, engagement: 6.7 },
  { id: 3, platform: "tiktok", type: "video", content: "Behind the scenes - moj delovni prostor 🎨", date: "2026-06-09", views: 89200, likes: 7840, comments: 456, shares: 234, engagement: 9.1 },
  { id: 4, platform: "linkedin", type: "article", content: "Zakaj se freelancerji morajo naučiti Tailwind CSS", date: "2026-06-07", views: 3200, likes: 289, comments: 34, shares: 12, engagement: 5.1 },
  { id: 5, platform: "twitter", type: "thread", content: "Nit o tem, kako sem pridobil prve stranke 🧵", date: "2026-06-06", views: 1800, likes: 234, comments: 67, shares: 89, engagement: 4.4 },
  { id: 6, platform: "facebook", type: "post", content: "Nova storitev na voljo - spletne strani po meri", date: "2026-06-05", views: 1240, likes: 89, comments: 23, shares: 8, engagement: 3.2 },
];

const ENGAGEMENT_HISTORY = [
  { date: "5.6", instagram: 2900, youtube: 1800, tiktok: 5200, twitter: 900, linkedin: 600, facebook: 1100 },
  { date: "6.6", instagram: 3100, youtube: 1750, tiktok: 5400, twitter: 950, linkedin: 620, facebook: 1150 },
  { date: "7.6", instagram: 3050, youtube: 1900, tiktok: 5800, twitter: 1000, linkedin: 640, facebook: 1180 },
  { date: "8.6", instagram: 3300, youtube: 2000, tiktok: 6100, twitter: 1020, linkedin: 660, facebook: 1200 },
  { date: "9.6", instagram: 3250, youtube: 2100, tiktok: 6400, twitter: 1080, linkedin: 700, facebook: 1250 },
  { date: "10.6", instagram: 3400, youtube: 2050, tiktok: 6700, twitter: 1100, linkedin: 720, facebook: 1280 },
  { date: "11.6", instagram: 3550, youtube: 2200, tiktok: 7000, twitter: 1150, linkedin: 740, facebook: 1300 },
];

const PLATFORM_STATS = {
  instagram: { followers: 12400, following: 892, posts: 156, avgLikes: 890, engagement: 7.8, growth: 3.2 },
  youtube: { subscribers: 8700, views: "45.2K", videos: 89, avgLikes: 456, engagement: 5.4, growth: 2.1 },
  tiktok: { followers: 34100, following: 234, videos: 234, avgLikes: 5600, engagement: 9.2, growth: 8.5 },
  twitter: { followers: 5200, following: 892, tweets: 1245, avgLikes: 89, engagement: 3.1, growth: 1.4 },
  linkedin: { connections: 1847, profileViews: 423, posts: 67, avgLikes: 56, engagement: 4.6, growth: 2.8 },
  facebook: { pageLikes: 4200, reach: "12.4K", posts: 89, avgLikes: 134, engagement: 2.9, growth: 0.9 },
};

const ALERTS = [
  { id: 1, type: "mention", platform: "twitter", content: "@mojracun omenjen v nitki o React razvoju", time: "5min", sentiment: "positive" },
  { id: 2, type: "comment", platform: "instagram", content: "Lep design! Kateri stack uporabljaš?", time: "15min", sentiment: "positive" },
  { id: 3, type: "mention", platform: "linkedin", content: "Oseba te je omenila v objavi o freelancerjih", time: "1h", sentiment: "neutral" },
  { id: 4, type: "engagement", platform: "youtube", content: "Padec engagementa za 15% na zadnjem videu", time: "2h", sentiment: "negative" },
];

const TRENDING_TOPICS = [
  { tag: "#ReactHooks", posts: 12400, trend: "up", change: "+12%" },
  { tag: "#TailwindCSS", posts: 8900, trend: "up", change: "+8%" },
  { tag: "#FreelancerLife", posts: 6700, trend: "stable", change: "0%" },
  { tag: "#WebDevelopment", posts: 15600, trend: "up", change: "+5%" },
];

export default function OnlinePresence() {
  const [activeTab, setActiveTab] = useState("overview"); // overview | posts | engagement | alerts
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [showNewPost, setShowNewPost] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "instagram": return InstagramIcon;
      case "youtube": return YoutubeIcon;
      case "twitter": return XIcon;
      case "linkedin": return LinkedinIcon;
      case "facebook": return FacebookIcon;
      case "tiktok": return TikTokIcon;
      default: return Globe;
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const totalReach = POSTS.reduce((sum, p) => sum + p.views, 0);
  const totalEngagement = POSTS.reduce((sum, p) => sum + (p.likes + p.comments + p.shares), 0);
  const avgEngagementRate = (totalEngagement / totalReach * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text sm:text-3xl">Online prisotnost</h1>
          <p className="mt-1 text-sm text-muted">Spremljaj svojo digitalno prisotnost na vseh platformah.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
              autoRefresh ? "bg-secondary/15 text-secondary" : "bg-white/5 text-muted"
            }`}
          >
            {autoRefresh ? <RefreshCw size={16} className="animate-spin" /> : <RefreshCw size={16} />}
            {autoRefresh ? "Osveževanje" : "Osveži"}
          </button>
          <button
            onClick={() => setShowNewPost(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
          >
            <Plus size={18} />
            Nova objava
          </button>
        </div>
      </div>

      {/* Last Update */}
      <div className="flex items-center gap-2 text-sm text-muted">
        <ClockIcon size={14} />
        <span>Zadnja posodobitev: {lastUpdate.toLocaleTimeString("sl-SI")}</span>
        {autoRefresh && <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-secondary animate-pulse" /> Samodejno</span>}
      </div>

      {/* Platform Stats Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
        {SOCIAL_PLATFORMS.map((platform, idx) => {
          const stats = PLATFORM_STATS[platform.id];
          const Icon = platform.icon;
          const isSelected = selectedPlatform === platform.id || selectedPlatform === "all";
          
          return (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedPlatform(selectedPlatform === platform.id ? "all" : platform.id)}
              className={`cursor-pointer rounded-2xl border p-4 shadow-lg transition-all hover:scale-[1.02] ${
                isSelected ? "border-primary/50 bg-card" : "border-white/5 bg-card hover:border-white/10"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${platform.gradient} text-white`}>
                  <Icon size={16} />
                </div>
                <span className="text-xs font-medium text-muted">{platform.name}</span>
              </div>
              <p className="font-mono text-xl font-bold text-text">
                {formatNumber(platform.id === "instagram" ? stats.followers : platform.id === "youtube" ? stats.subscribers : platform.id === "tiktok" ? stats.followers : platform.id === "twitter" ? stats.followers : platform.id === "linkedin" ? stats.connections : stats.pageLikes)}
              </p>
              <div className="mt-2 flex items-center gap-1">
                {stats.growth > 0 ? (
                  <ArrowUpRight size={12} className="text-secondary" />
                ) : (
                  <ArrowDownRight size={12} className="text-danger" />
                )}
                <span className={`text-xs font-medium ${stats.growth > 0 ? "text-secondary" : "text-danger"}`}>
                  {stats.growth > 0 ? "+" : ""}{stats.growth}%
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1">
        {[
          { id: "overview", label: "Pregled", icon: BarChart3 },
          { id: "posts", label: "Objave", icon: Rss },
          { id: "engagement", label: "Angažiranost", icon: HeartIcon },
          { id: "alerts", label: "Obvestila", icon: Bell, badge: ALERTS.length },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab.id ? "bg-primary text-white" : "text-muted hover:text-text"
              }`}
            >
              <Icon size={18} />
              {tab.label}
              {tab.badge && (
                <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Stats */}
          <div className="lg:col-span-2 space-y-4">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-white/5 bg-card p-4 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Eye size={18} />
                  </div>
                </div>
                <p className="mt-3 font-mono text-2xl font-bold text-text">{formatNumber(totalReach)}</p>
                <p className="text-xs text-muted">Skupni doseg</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="rounded-2xl border border-white/5 bg-card p-4 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                    <HeartIcon size={18} />
                  </div>
                </div>
                <p className="mt-3 font-mono text-2xl font-bold text-text">{formatNumber(totalEngagement)}</p>
                <p className="text-xs text-muted">Skupaj všečkov</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-white/5 bg-card p-4 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-warning/15 text-warning">
                    <Activity size={18} />
                  </div>
                </div>
                <p className="mt-3 font-mono text-2xl font-bold text-text">{avgEngagementRate}%</p>
                <p className="text-xs text-muted">Povp. engagement</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-2xl border border-white/5 bg-card p-4 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-danger/15 text-danger">
                    <Users size={18} />
                  </div>
                </div>
                <p className="mt-3 font-mono text-2xl font-bold text-text">{formatNumber(66400)}</p>
                <p className="text-xs text-muted">Sledilci (skupaj)</p>
              </motion.div>
            </div>

            {/* Engagement Chart */}
            <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-text">Rast angažiranosti</h3>
                <div className="flex items-center gap-2">
                  {["7 dni", "30 dni", "90 dni"].map((period) => (
                    <button key={period} className="rounded-lg px-3 py-1 text-xs font-medium text-muted hover:bg-white/5 hover:text-text">
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 flex items-end justify-between gap-2" style={{ height: "200px" }}>
                {ENGAGEMENT_HISTORY.map((day, idx) => {
                  const maxVal = Math.max(...ENGAGEMENT_HISTORY.map(d => d.instagram + d.youtube + d.tiktok));
                  const total = day.instagram + day.youtube + day.tiktok;
                  return (
                    <div key={day.date} className="flex flex-1 flex-col items-center gap-2">
                      <div className="relative w-full">
                        <div className="absolute inset-0 flex items-end">
                          <div className="w-full rounded-t-lg bg-gradient-to-t from-primary/60 to-primary/20" style={{ height: `${(total / maxVal) * 100}%` }} />
                        </div>
                      </div>
                      <span className="text-xs text-muted">{day.date}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#d62976]" />
                  <span className="text-xs text-muted">Instagram</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#FF0000]" />
                  <span className="text-xs text-muted">YouTube</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#00f2ea]" />
                  <span className="text-xs text-muted">TikTok</span>
                </div>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
              <h3 className="text-lg font-bold text-text">Trende teme</h3>
              <div className="mt-4 space-y-3">
                {TRENDING_TOPICS.map((topic, idx) => (
                  <div key={topic.tag} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                        <Hash size={14} />
                      </span>
                      <div>
                        <p className="font-medium text-text">{topic.tag}</p>
                        <p className="text-xs text-muted">{formatNumber(topic.posts)} objav</p>
                      </div>
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-semibold ${
                      topic.trend === "up" ? "text-secondary" : "text-muted"
                    }`}>
                      {topic.trend === "up" ? <ArrowUpRight size={12} /> : null}
                      {topic.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
              <h3 className="text-sm font-semibold text-text">Hitra dejanja</h3>
              <div className="mt-4 space-y-2">
                <button className="flex w-full items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm font-medium text-text transition-colors hover:bg-white/10">
                  <Megaphone size={18} className="text-primary" />
                  Načrtuj objavo
                </button>
                <button className="flex w-full items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm font-medium text-text transition-colors hover:bg-white/10">
                  <BarChart2 size={18} className="text-secondary" />
                  Analitika platforme
                </button>
                <button className="flex w-full items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm font-medium text-text transition-colors hover:bg-white/10">
                  <Target size={18} className="text-warning" />
                  Postavi cilje
                </button>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-text">Zadnja obvestila</h3>
                <button className="text-xs text-primary hover:underline">Prikaži vse</button>
              </div>
              <div className="mt-3 space-y-2">
                {ALERTS.slice(0, 3).map((alert) => {
                  const Icon = getPlatformIcon(alert.platform);
                  const platformConfig = SOCIAL_PLATFORMS.find(p => p.id === alert.platform);
                  return (
                    <div key={alert.id} className="flex items-start gap-3 rounded-xl bg-white/5 p-3">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${platformConfig?.gradient} text-white`}>
                        <Icon size={14} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-text truncate">{alert.content}</p>
                        <p className="text-[10px] text-muted">{alert.time}</p>
                      </div>
                      <span className={`h-2 w-2 shrink-0 rounded-full ${
                        alert.sentiment === "positive" ? "bg-secondary" : alert.sentiment === "negative" ? "bg-danger" : "bg-warning"
                      }`} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Performing */}
            <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
              <h3 className="text-sm font-semibold text-text">Najuspešnejše objave</h3>
              <div className="mt-3 space-y-2">
                {POSTS.slice(0, 3).map((post) => {
                  const Icon = getPlatformIcon(post.platform);
                  const platformConfig = SOCIAL_PLATFORMS.find(p => p.id === post.platform);
                  return (
                    <div key={post.id} className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${platformConfig?.gradient} text-white`}>
                        <Icon size={14} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-text">{post.content}</p>
                        <p className="text-[10px] text-muted">{formatNumber(post.views)} ogledov</p>
                      </div>
                      <span className="text-xs font-semibold text-secondary">{post.engagement}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts Tab */}
      {activeTab === "posts" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Search size={16} className="text-muted" />
              <input
                type="text"
                placeholder="Iskanje objav..."
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-text placeholder:text-muted/50 focus:border-primary focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <select className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-text focus:border-primary focus:outline-none">
                <option value="all">Vse platforme</option>
                {SOCIAL_PLATFORMS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-muted">Povprečen engagement:</span>
              <span className="font-mono font-semibold text-secondary">{avgEngagementRate}%</span>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post, idx) => {
              const Icon = getPlatformIcon(post.platform);
              const platformConfig = SOCIAL_PLATFORMS.find(p => p.id === post.platform);
              
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group rounded-2xl border border-white/5 bg-card p-4 shadow-lg transition-all hover:border-primary/30 hover:shadow-xl"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${platformConfig?.gradient} text-white`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-text">{platformConfig?.name}</p>
                        <p className="text-xs text-muted">{post.type} • {new Date(post.date).toLocaleDateString("sl-SI")}</p>
                      </div>
                    </div>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text">
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  {/* Content */}
                  <p className="mt-4 text-sm text-text">{post.content}</p>

                  {/* Stats */}
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    <div className="flex items-center justify-center gap-1 rounded-lg bg-white/5 py-2">
                      <Eye size={12} className="text-muted" />
                      <span className="text-xs font-mono text-muted">{formatNumber(post.views)}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 rounded-lg bg-white/5 py-2">
                      <HeartIcon size={12} className="text-danger" />
                      <span className="text-xs font-mono text-muted">{formatNumber(post.likes)}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 rounded-lg bg-white/5 py-2">
                      <MessageSquare size={12} className="text-primary" />
                      <span className="text-xs font-mono text-muted">{formatNumber(post.comments)}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 rounded-lg bg-white/5 py-2">
                      <Share size={12} className="text-secondary" />
                      <span className="text-xs font-mono text-muted">{formatNumber(post.shares)}</span>
                    </div>
                  </div>

                  {/* Engagement Bar */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-secondary" style={{ width: `${post.engagement * 10}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-secondary">{post.engagement}%</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Engagement Tab */}
      {activeTab === "engagement" && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Engagement by Platform */}
          <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
            <h3 className="text-lg font-bold text-text">Angažiranost po platformah</h3>
            <div className="mt-6 space-y-4">
              {SOCIAL_PLATFORMS.map((platform) => {
                const stats = PLATFORM_STATS[platform.id];
                const Icon = platform.icon;
                return (
                  <div key={platform.id} className="flex items-center gap-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${platform.gradient} text-white`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-text">{platform.name}</span>
                        <span className="font-mono text-sm font-semibold text-text">{stats.engagement}%</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${stats.engagement * 10}%`, backgroundColor: platform.color }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Engagement Over Time */}
          <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
            <h3 className="text-lg font-bold text-text">Trend angažiranosti</h3>
            <div className="mt-6">
              <div className="flex items-end justify-between gap-2" style={{ height: "200px" }}>
                {ENGAGEMENT_HISTORY.map((day, idx) => {
                  const total = day.instagram + day.youtube + day.tiktok + day.twitter + day.linkedin + day.facebook;
                  const maxVal = Math.max(...ENGAGEMENT_HISTORY.map(d => d.instagram + d.youtube + d.tiktok + d.twitter + d.linkedin + d.facebook));
                  return (
                    <div key={day.date} className="flex flex-1 flex-col items-center gap-2">
                      <div className="w-full rounded-t-lg bg-gradient-to-t from-secondary/60 to-secondary/20" style={{ height: `${(total / maxVal) * 100}%` }} />
                      <span className="text-xs text-muted">{day.date}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alerts Tab */}
      {activeTab === "alerts" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-text">Obvestila in opozorila</h3>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm text-muted hover:bg-white/10 hover:text-text">
                <BellOff size={16} />
                Ignoriraj vse
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {ALERTS.map((alert, idx) => {
              const Icon = getPlatformIcon(alert.platform);
              const platformConfig = SOCIAL_PLATFORMS.find(p => p.id === alert.platform);
              const typeConfig = {
                mention: { icon: AtSign, color: "primary" },
                comment: { icon: MessageSquare, color: "secondary" },
                engagement: { icon: TrendingDown, color: "danger" },
              }[alert.type] || { icon: Bell, color: "muted" };
              
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-4 rounded-2xl border border-white/5 bg-card p-4 shadow-lg"
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${platformConfig?.gradient} text-white`}>
                    <Icon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`flex h-5 w-5 items-center justify-center rounded bg-${typeConfig.color}/15 text-${typeConfig.color}`}>
                        <typeConfig.icon size={12} />
                      </span>
                      <span className="text-xs font-medium text-muted uppercase">{alert.type}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-text">{alert.content}</p>
                    <p className="mt-1 text-xs text-muted">{alert.time}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`h-3 w-3 rounded-full ${
                      alert.sentiment === "positive" ? "bg-secondary" : alert.sentiment === "negative" ? "bg-danger" : "bg-warning"
                    }`} />
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text">
                      <CheckCircle2 size={16} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* New Post Modal */}
      <AnimatePresence>
        {showNewPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowNewPost(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-white/10 bg-card p-6 shadow-2xl"
            >
              <h2 className="text-xl font-bold text-text">Načrtuj novo objavo</h2>
              
              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-muted">Platforma</label>
                  <div className="flex flex-wrap gap-2">
                    {SOCIAL_PLATFORMS.map((platform) => {
                      const Icon = platform.icon;
                      return (
                        <button
                          key={platform.id}
                          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                            false ? "bg-primary text-white" : "bg-white/5 text-muted hover:bg-white/10 hover:text-text"
                          }`}
                        >
                          <Icon size={16} />
                          {platform.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-muted">Vsebina</label>
                  <textarea
                    rows={4}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-text placeholder:text-muted/50 focus:border-primary focus:outline-none"
                    placeholder="Kaj želite objaviti?"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-muted">Datum in čas objave</label>
                  <input
                    type="datetime-local"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-text focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button onClick={() => setShowNewPost(false)} className="flex-1 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium text-text hover:bg-white/10">
                  Prekliči
                </button>
                <button className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90">
                  Načrtuj objavo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}