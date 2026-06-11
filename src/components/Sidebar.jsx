import { NavLink } from "react-router-dom";
import {
  Home,
  BarChart3,
  MessageCircle,
  Lock,
  Calendar,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  X,
  FolderKanban,
  Clock,
  DollarSign,
  Globe,
  Users,
  FileText,
  Briefcase,
  PieChart,
  Sparkles,
  UsersRound,
  Zap,
  CreditCard,
  Store,
  BookOpen,
} from "lucide-react";

const navItems = [
  { id: "home", label: "Nadzorna plošča", icon: Home, to: "/" },
  { id: "ai", label: "AI Upravljanje", icon: Sparkles, to: "/ai" },
  { id: "collaboration", label: "Sodelovanje", icon: UsersRound, to: "/collaboration" },
  { id: "automation", label: "Avtomatizacija", icon: Zap, to: "/automation" },
  { id: "projects", label: "Projekti", icon: FolderKanban, to: "/projects", badge: 4 },
  { id: "timetracking", label: "Časovni list", icon: Clock, to: "/timetracking" },
  { id: "finance", label: "Finance", icon: DollarSign, to: "/finance", badge: 3 },
  { id: "payments", label: "Plačila", icon: CreditCard, to: "/payments" },
  { id: "crm", label: "CRM", icon: Users, to: "/crm" },
  { id: "online", label: "Online prisotnost", icon: Globe, to: "/online" },
  { id: "reports", label: "Poročila", icon: FileText, to: "/reports" },
  { id: "analytics", label: "Analitika", icon: PieChart, to: "/analytics" },
  { id: "messages", label: "Sporočila", icon: MessageCircle, badge: 7, to: "/messages" },
  { id: "schedule", label: "Urnik", icon: Calendar, to: "/schedule" },
  { id: "marketplace", label: "Marketplace", icon: Store, to: "/marketplace" },
  { id: "knowledge", label: "Knowledge Base", icon: BookOpen, to: "/knowledge" },
  { id: "settings", label: "Nastavitve", icon: Settings, to: "/settings" },
  { id: "help", label: "Pomoč", icon: HelpCircle, to: "/help" },
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onCloseMobile }) {
  return (
    <>
      {/* Temno ozadje za mobilni meni */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-white/5 bg-card py-4 transition-transform duration-300 lg:static lg:translate-x-0 lg:transition-[width] ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Zapri gumb na mobilnem */}
        <div className="mb-2 flex items-center justify-between px-3 lg:hidden">
          <span className="text-sm font-semibold text-muted">Meni</span>
          <button
            onClick={onCloseMobile}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.to}
                end={item.to === "/"}
                onClick={onCloseMobile}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-muted hover:bg-white/5 hover:text-text"
                  }
                  ${collapsed ? "lg:justify-center" : ""}`
                }
              >
                <Icon size={20} className="shrink-0" />
                <span className={`truncate ${collapsed ? "lg:hidden" : ""}`}>{item.label}</span>
                {item.badge && (
                  <span
                    className={`flex items-center justify-center rounded-full bg-danger text-white text-[11px] font-bold leading-none
                      ${collapsed ? "ml-auto h-5 min-w-5 px-1 lg:absolute lg:-top-1 lg:-right-1 lg:ml-0 lg:h-5 lg:w-5 lg:px-0" : "ml-auto h-5 min-w-5 px-1"}`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="hidden px-3 mt-2 lg:block">
          <button
            onClick={onToggle}
            className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:bg-white/5 hover:text-text transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            {!collapsed && <span>Skrči meni</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
