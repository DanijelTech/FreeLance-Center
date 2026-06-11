import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderKanban, Plus, Search, Filter, MoreVertical, Clock, Users, DollarSign,
  CheckCircle2, Circle, AlertCircle, ArrowRight, Calendar, Briefcase, Target,
  TrendingUp, Zap, ChevronRight, GripVertical, Flag, MessageSquare, Paperclip
} from "lucide-react";

const STATUS_CONFIG = {
  planning: { label: "Načrtovanje", color: "warning", bg: "bg-warning/15", text: "text-warning" },
  in_progress: { label: "V delu", color: "primary", bg: "bg-primary/15", text: "text-primary" },
  review: { label: "Pregled", color: "secondary", bg: "bg-secondary/15", text: "text-secondary" },
  completed: { label: "Končano", color: "muted", bg: "bg-white/5", text: "text-muted" },
  on_hold: { label: "Na čakanju", color: "danger", bg: "bg-danger/15", text: "text-danger" },
};

const PRIORITY_CONFIG = {
  low: { label: "Nizka", color: "muted" },
  medium: { label: "Srednja", color: "warning" },
  high: { label: "Visoka", color: "primary" },
  urgent: { label: "Nujno", color: "danger" },
};

const projects = [
  {
    id: 1,
    name: "E-commerce platforma za ModaVida",
    client: "ModaVida d.o.o.",
    status: "in_progress",
    priority: "high",
    progress: 68,
    deadline: "2026-06-25",
    budget: 12500,
    spent: 8400,
    team: ["DC", "MK", "JP"],
    tasks: { total: 24, completed: 16 },
    description: "Razvoj popolne e-commerce rešitve z integracijo plačilnih sistemov in naprednim CMS-jem.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    lastActivity: "pred 15 min",
  },
  {
    id: 2,
    name: "Brand identity za BioGourmet",
    client: "BioGourmet",
    status: "review",
    priority: "medium",
    progress: 95,
    deadline: "2026-06-18",
    budget: 4500,
    spent: 4200,
    team: ["DC", "TN"],
    tasks: { total: 12, completed: 11 },
    description: "Oblikovanje celostne grafične podobe za novo ekološko živilsko znamko.",
    tags: ["Design", "Branding", "Logo"],
    lastActivity: "pred 2 urah",
  },
  {
    id: 3,
    name: "Mobilna aplikacija FitTrack Pro",
    client: "FitTrack Inc.",
    status: "planning",
    priority: "high",
    progress: 15,
    deadline: "2026-08-30",
    budget: 28000,
    spent: 3200,
    team: ["DC", "MK", "JP", "LS"],
    tasks: { total: 48, completed: 7 },
    description: "Native mobilna aplikacija za sledenje fitnesa z AI osebnim trenerjem.",
    tags: ["React Native", "TensorFlow", "Firebase"],
    lastActivity: "pred 1 dan",
  },
  {
    id: 4,
    name: "Spletna stran za Računovodstvo Novak",
    client: "Računovodstvo Novak",
    status: "completed",
    priority: "medium",
    progress: 100,
    deadline: "2026-05-15",
    budget: 3800,
    spent: 3650,
    team: ["DC"],
    tasks: { total: 18, completed: 18 },
    description: "Informativna spletna stran za računovodski servis z obrazci in kontaktom.",
    tags: ["WordPress", "SEO"],
    lastActivity: "pred 3 dnevi",
  },
  {
    id: 5,
    name: "CRM sistem za SalesPro",
    client: "SalesPro d.o.o.",
    status: "in_progress",
    priority: "urgent",
    progress: 42,
    deadline: "2026-06-30",
    budget: 18000,
    spent: 9200,
    team: ["DC", "MK", "JP"],
    tasks: { total: 35, completed: 15 },
    description: "Prilagojen CRM za upravljanje prodaje z avtomatizacijo in analitiko.",
    tags: ["Vue.js", "Laravel", "MySQL"],
    lastActivity: "pred 30 min",
  },
];

const recentTasks = [
  { id: 1, title: "Implementacija Stripe plačilnega gateway-a", project: "ModaVida", status: "in_progress", priority: "high", due: "danes" },
  { id: 2, title: "Dokončanje logotipa in barvne palete", project: "BioGourmet", status: "review", priority: "medium", due: "jutri" },
  { id: 3, title: "Setup CI/CD pipeline za React Native", project: "FitTrack Pro", status: "todo", priority: "high", due: "20.6." },
  { id: 4, title: "API dokumentacija za SalesPro CRM", project: "SalesPro", status: "in_progress", priority: "medium", due: "22.6." },
  { id: 5, title: "Optimizacija mobilne navigacije", project: "ModaVida", status: "todo", priority: "low", due: "25.6." },
];

const stats = [
  { label: "Aktivni projekti", value: "4", icon: FolderKanban, trend: "+1 ta mesec", color: "primary" },
  { label: "Nalog v teku", value: "23", icon: Target, trend: "8 danes", color: "secondary" },
  { label: "Prihodek (ta mesec)", value: "€8,450", icon: TrendingUp, trend: "+23%", color: "warning" },
  { label: "Ure letos", value: "342h", icon: Clock, trend: "68% izkoriščenost", color: "danger" },
];

export default function Projects() {
  const [view, setView] = useState("grid"); // grid | list | board
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showNewProject, setShowNewProject] = useState(false);

  const filteredProjects = projects.filter(p => {
    if (filterStatus !== "all" && p.status !== filterStatus) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.client.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text sm:text-3xl">Projekti</h1>
          <p className="mt-1 text-sm text-muted">Upravljaj svoje projekte, naloge in sodelavce na enem mestu.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNewProject(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
          >
            <Plus size={18} />
            Nov projekt
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-white/5 bg-card p-4 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${stat.color}/15 text-${stat.color}`}>
                  <Icon size={20} />
                </div>
              </div>
              <p className="mt-3 font-mono text-2xl font-bold text-text">{stat.value}</p>
              <p className="text-xs text-muted">{stat.label}</p>
              <p className="mt-1 text-xs text-secondary">{stat.trend}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Filters & View Toggle */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Iskanje projektov..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-muted/50 focus:border-primary focus:outline-none"
            />
          </div>
          
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-muted" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-text focus:border-primary focus:outline-none"
            >
              <option value="all">Vsi statusi</option>
              {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1">
          {["grid", "list", "board"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                view === v ? "bg-primary text-white" : "text-muted hover:text-text"
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid/List */}
      <div className={view === "grid" ? "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3" : "space-y-3"}>
        {filteredProjects.map((project, idx) => {
          const statusConfig = STATUS_CONFIG[project.status];
          const priorityConfig = PRIORITY_CONFIG[project.priority];
          const budgetPercent = Math.round((project.spent / project.budget) * 100);
          
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedProject(project)}
              className={`group cursor-pointer rounded-2xl border border-white/5 bg-card p-5 shadow-lg transition-all hover:border-primary/30 hover:shadow-xl ${
                view === "list" ? "flex items-center gap-4" : ""
              }`}
            >
              {view === "grid" ? (
                <>
                  {/* Project Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text group-hover:text-primary transition-colors">{project.name}</h3>
                        <p className="text-xs text-muted">{project.client}</p>
                      </div>
                    </div>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text">
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-medium text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-white/5 p-3">
                      <p className="text-[10px] uppercase tracking-wide text-muted">Napredek</p>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${project.progress}%` }} />
                        </div>
                        <span className="text-xs font-mono font-semibold text-text">{project.progress}%</span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-white/5 p-3">
                      <p className="text-[10px] uppercase tracking-wide text-muted">Proračun</p>
                      <p className="mt-1 font-mono text-sm font-semibold text-text">€{project.budget.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Tasks Progress */}
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted">
                      <CheckCircle2 size={14} className="text-secondary" />
                      <span>{project.tasks.completed}/{project.tasks.total} nalog</span>
                    </div>
                    <span className="text-xs text-muted">Rok: {new Date(project.deadline).toLocaleDateString("sl-SI")}</span>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                    <div className="flex -space-x-2">
                      {project.team.map((member, i) => (
                        <div key={i} className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-[10px] font-bold text-white ring-2 ring-card">
                          {member}
                        </div>
                      ))}
                    </div>
                    <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                      <span className={`h-1.5 w-1.5 rounded-full bg-current`} />
                      {statusConfig.label}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Briefcase size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-text">{project.name}</h3>
                    <p className="text-sm text-muted">{project.client}</p>
                  </div>
                  <div className="hidden items-center gap-4 sm:flex">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-text">€{project.budget.toLocaleString()}</p>
                      <p className="text-xs text-muted">{budgetPercent}% porabljeno</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-text">{project.progress}%</p>
                      <p className="text-xs text-muted">{project.tasks.completed}/{project.tasks.total}</p>
                    </div>
                    <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                      {statusConfig.label}
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-muted" />
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Recent Tasks Section */}
      <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold text-text">
            <Target size={20} className="text-primary" />
            Zadnje naloge
          </h2>
          <button className="text-sm text-primary hover:underline">Prikaži vse</button>
        </div>
        <div className="space-y-2">
          {recentTasks.map((task) => (
            <div key={task.id} className="flex items-center gap-3 rounded-xl bg-white/5 p-3 transition-colors hover:bg-white/10">
              <button className="cursor-grab text-muted hover:text-text">
                <GripVertical size={16} />
              </button>
              <div className={`flex h-5 w-5 items-center justify-center rounded border ${
                task.status === "completed" ? "bg-secondary border-secondary text-white" : "border-white/20"
              }`}>
                {task.status === "completed" && <CheckCircle2 size={12} />}
                {task.status !== "completed" && <Circle size={12} className="text-muted" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-medium ${task.status === "completed" ? "text-muted line-through" : "text-text"}`}>
                  {task.title}
                </p>
                <p className="text-xs text-muted">{task.project} • {task.due}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                task.priority === "urgent" ? "bg-danger/15 text-danger" :
                task.priority === "high" ? "bg-primary/15 text-primary" :
                task.priority === "medium" ? "bg-warning/15 text-warning" :
                "bg-white/5 text-muted"
              }`}>
                {PRIORITY_CONFIG[task.priority].label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectDetailModal({ project, onClose }) {
  const statusConfig = STATUS_CONFIG[project.status];
  const budgetPercent = Math.round((project.spent / project.budget) * 100);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-card p-6 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <Briefcase size={28} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text">{project.name}</h2>
              <p className="text-sm text-muted">{project.client}</p>
            </div>
          </div>
          <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-muted hover:bg-white/10 hover:text-text">
            <MoreVertical size={18} />
          </button>
        </div>

        {/* Status & Priority */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${statusConfig.bg} ${statusConfig.text}`}>
            {statusConfig.label}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-danger/15 px-3 py-1.5 text-sm font-medium text-danger">
            <Flag size={14} />
            {PRIORITY_CONFIG[project.priority].label}
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm text-muted">{project.description}</p>

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-xs text-muted">Proračun</p>
            <p className="mt-1 font-mono text-lg font-bold text-text">€{project.budget.toLocaleString()}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-xs text-muted">Porabljeno</p>
            <p className="mt-1 font-mono text-lg font-bold text-text">€{project.spent.toLocaleString()}</p>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
              <div className={`h-full rounded-full ${budgetPercent > 90 ? "bg-danger" : budgetPercent > 75 ? "bg-warning" : "bg-secondary"}`} style={{ width: `${budgetPercent}%` }} />
            </div>
          </div>
          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-xs text-muted">Napredek</p>
            <p className="mt-1 font-mono text-lg font-bold text-text">{project.progress}%</p>
            <p className="text-xs text-muted">{project.tasks.completed}/{project.tasks.total} nalog</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-xs text-muted">Rok</p>
            <p className="mt-1 font-mono text-lg font-bold text-text">{new Date(project.deadline).toLocaleDateString("sl-SI", { day: "numeric", month: "short" })}</p>
          </div>
        </div>

        {/* Team */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-text">Ekipa</h3>
          <div className="mt-3 flex items-center gap-3">
            {project.team.map((member, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white">
                  {member}
                </div>
                <span className="text-sm text-muted">{member === "DC" ? "Danijel C." : member === "MK" ? "Marko K." : member === "JP" ? "Jure P." : "Luka S."}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90">
            <CheckCircle2 size={16} />
            Posodobi naloge
          </button>
          <button className="flex items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-semibold text-text hover:bg-white/10">
            <MessageSquare size={16} />
            Komentiraj
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}