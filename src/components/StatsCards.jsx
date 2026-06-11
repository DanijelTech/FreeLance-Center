import { motion } from "framer-motion";
import { TrendingUp, Heart, MessageCircle, Users, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { statsCards } from "../data/mockData";
import CardSkeleton from "./CardSkeleton";

const ICONS = {
  "trending-up": TrendingUp,
  heart: Heart,
  "message-circle": MessageCircle,
  users: Users,
};

const COLOR_MAP = {
  primary: { text: "text-primary", bg: "bg-primary/15", stroke: "#6C63FF" },
  pink: { text: "text-pink-400", bg: "bg-pink-400/15", stroke: "#f472b6" },
  secondary: { text: "text-secondary", bg: "bg-secondary/15", stroke: "#00D4AA" },
  blue: { text: "text-blue-400", bg: "bg-blue-400/15", stroke: "#60a5fa" },
};

export default function StatsCards({ loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((stat) => {
        const Icon = ICONS[stat.icon];
        const colors = COLOR_MAP[stat.color];
        return (
          <motion.div
            key={stat.id}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative overflow-hidden rounded-2xl border border-white/5 bg-card p-5 shadow-lg hover:shadow-primary/10 hover:border-white/10"
          >
            <div className="flex items-start justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}>
                <Icon size={20} />
              </div>
              <div className="flex items-center gap-1 rounded-full bg-secondary/10 px-2 py-1 text-xs font-semibold text-secondary">
                <ArrowUpRight size={14} />
                {stat.change}
              </div>
            </div>

            <p className="mt-4 text-sm text-muted">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-text font-mono">{stat.value}</p>

            <div className="absolute bottom-0 left-0 right-0 h-12 opacity-70">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stat.sparkline}>
                  <defs>
                    <linearGradient id={`grad-${stat.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={colors.stroke} stopOpacity={0.4} />
                      <stop offset="100%" stopColor={colors.stroke} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke={colors.stroke}
                    strokeWidth={2}
                    fill={`url(#grad-${stat.id})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
