import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText, Download, Calendar, Printer, Mail, Share2, Clock, CheckCircle2,
  TrendingUp, Users, DollarSign, BarChart3, PieChart as PieChartIcon, LineChart,
  ArrowRight, ChevronRight, Filter, Search, Plus, Eye, Edit, Copy, Trash2,
  BookOpen, Briefcase, Target, Award, Clock as ClockIcon, Globe, MessageSquare
} from "lucide-react";

const REPORTS = [
  {
    id: 1,
    name: "Tedensko poročilo",
    description: "Povzetek vseh aktivnosti za tekoči teden",
    type: "weekly",
    lastGenerated: "2026-06-09",
    period: "3.6. - 9.6.2026",
    status: "ready",
    sections: ["Projekti v teku", "Časovni list", "Prihodek", "Online angažiranost"],
    size: "245 KB",
  },
  {
    id: 2,
    name: "Mesečno poročilo - maj",
    description: "Celostno poročilo za maj 2026",
    type: "monthly",
    lastGenerated: "2026-06-01",
    period: "Maj 2026",
    status: "ready",
    sections: ["Povzetek projektov", "Finančni pregled", "Časovna analiza", "Social media"],
    size: "1.2 MB",
  },
  {
    id: 3,
    name: "Kvartalno poročilo Q1 2026",
    description: "Pregled prvega četrtletja 2026",
    type: "quarterly",
    lastGenerated: "2026-04-01",
    period: "Jan - Mar 2026",
    status: "ready",
    sections: ["Poslovni pregled", "Prihodki", "Projekti", "Growth analiza"],
    size: "3.4 MB",
  },
  {
    id: 4,
    name: "Poročilo projekta ModaVida",
    description: "Status poročilo za E-commerce projekt",
    type: "project",
    lastGenerated: "2026-06-10",
    period: "Od začetka projekta",
    status: "ready",
    sections: ["Napredek", "Poraba proračuna", "Naloge", "Tveganja"],
    size: "890 KB",
  },
  {
    id: 5,
    name: "Finančno poročilo 2025",
    description: "Letno finančno poročilo za davčno potrebe",
    type: "financial",
    lastGenerated: "2026-01-15",
    period: "Leto 2025",
    status: "archived",
    sections: ["Prihodki", "Odhodki", "Davek", "Bilance"],
    size: "2.1 MB",
  },
];

const METRICS = [
  { label: "Skupni prihodek (letos)", value: "€48,450", change: "+23%", icon: DollarSign, color: "secondary" },
  { label: "Ure (ta mesec)", value: "186h 45m", change: "+8%", icon: ClockIcon, color: "primary" },
  { label: "Projekti končani", value: "12", change: "+3", icon: CheckCircle2, color: "warning" },
  { label: "Povprečen engagement", value: "6.8%", change: "+0.5%", icon: Globe, color: "danger" },
];

const QUICK_STATS = {
  thisWeek: { hours: 42.5, revenue: 8450, projects: 4, tasks: 23 },
  thisMonth: { hours: 186, revenue: 32400, projects: 8, tasks: 89 },
  thisYear: { hours: 1245, revenue: 48450, projects: 23, tasks: 345 },
};

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [showNewReport, setShowNewReport] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredReports = REPORTS.filter(report => {
    if (filterType !== "all" && report.type !== filterType) return false;
    if (searchQuery && !report.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const generatePDF = (report) => {
    alert(`Generiram PDF za: ${report.name}`);
  };

  const shareReport = (report) => {
    alert(`Deljenje poročila: ${report.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text sm:text-3xl">Poročila in dokumentacija</h1>
          <p className="mt-1 text-sm text-muted">Ustvari, si ogledaj in deli profesionalna poročila.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNewReport(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
          >
            <Plus size={18} />
            Ustvari poročilo
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 lg:grid-cols-3">
        {[
          { label: "Ta teden", stats: QUICK_STATS.thisWeek, color: "primary" },
          { label: "Ta mesec", stats: QUICK_STATS.thisMonth, color: "secondary" },
          { label: "Letos", stats: QUICK_STATS.thisYear, color: "warning" },
        ].map((period, idx) => (
          <motion.div
            key={period.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg"
          >
            <h3 className="text-sm font-semibold text-muted">{period.label}</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/5 p-3">
                <p className="font-mono text-lg font-bold text-text">{period.stats.hours}h</p>
                <p className="text-xs text-muted">Ure</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <p className="font-mono text-lg font-bold text-text">€{period.stats.revenue.toLocaleString()}</p>
                <p className="text-xs text-muted">Prihodek</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <p className="font-mono text-lg font-bold text-text">{period.stats.projects}</p>
                <p className="text-xs text-muted">Projekti</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <p className="font-mono text-lg font-bold text-text">{period.stats.tasks}</p>
                <p className="text-xs text-muted">Naloge</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {METRICS.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl border border-white/5 bg-card p-4 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${metric.color}/15 text-${metric.color}`}>
                  <Icon size={20} />
                </div>
                <span className="text-xs font-semibold text-secondary">{metric.change}</span>
              </div>
              <p className="mt-3 font-mono text-2xl font-bold text-text">{metric.value}</p>
              <p className="text-xs text-muted">{metric.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Iskanje poročil..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-muted/50 focus:border-primary focus:outline-none"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-text focus:border-primary focus:outline-none"
          >
            <option value="all">Vsi tipi</option>
            <option value="weekly">Tedenska</option>
            <option value="monthly">Mesečna</option>
            <option value="quarterly">Kvartalna</option>
            <option value="project">Projektna</option>
            <option value="financial">Finančna</option>
          </select>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report, idx) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group rounded-2xl border border-white/5 bg-card p-5 shadow-lg transition-all hover:border-primary/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-text group-hover:text-primary transition-colors">{report.name}</h3>
                  <p className="mt-1 text-sm text-muted">{report.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <Clock size={12} />
                      {report.period}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <BarChart3 size={12} />
                      {report.size}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted">
                      Zadnja generacija: {new Date(report.lastGenerated).toLocaleDateString("sl-SI")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  report.status === "ready" ? "bg-secondary/15 text-secondary" : "bg-white/5 text-muted"
                }`}>
                  {report.status === "ready" ? "Pripravljeno" : "Arhivirano"}
                </span>
              </div>
            </div>

            {/* Sections */}
            <div className="mt-4 flex flex-wrap gap-2">
              {report.sections.map((section) => (
                <span key={section} className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-muted">
                  {section}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center gap-3 border-t border-white/5 pt-4">
              <button
                onClick={() => setSelectedReport(report)}
                className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
              >
                <Eye size={16} />
                Ogled
              </button>
              <button
                onClick={() => generatePDF(report)}
                className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-white/10"
              >
                <Download size={16} />
                PDF
              </button>
              <button
                onClick={() => shareReport(report)}
                className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-white/10"
              >
                <Share2 size={16} />
                Deli
              </button>
              <button className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-white/10 hover:text-text ml-auto">
                <Printer size={16} />
                Natisni
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Templates Section */}
      <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
        <h2 className="flex items-center gap-2 text-lg font-bold text-text">
          <BookOpen size={20} className="text-primary" />
          Predloge poročil
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Tedensko poročilo", icon: Calendar, desc: "Standardni format" },
            { name: "Projektno poročilo", icon: Briefcase, desc: "Za posamezne projekte" },
            { name: "Finančno poročilo", icon: DollarSign, desc: "Za računovodstvo" },
            { name: "Analiza engagementa", icon: Globe, desc: "Social media" },
          ].map((template, idx) => {
            const Icon = template.icon;
            return (
              <motion.button
                key={template.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setShowNewReport(true)}
                className="flex items-center gap-3 rounded-xl bg-white/5 p-4 text-left transition-colors hover:bg-white/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-medium text-text">{template.name}</p>
                  <p className="text-xs text-muted">{template.desc}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <ReportDetailModal report={selectedReport} onClose={() => setSelectedReport(null)} />
      )}

      {/* New Report Modal */}
      {showNewReport && (
        <NewReportModal onClose={() => setShowNewReport(false)} />
      )}
    </div>
  );
}

function ReportDetailModal({ report, onClose }) {
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <FileText size={28} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text">{report.name}</h2>
              <p className="text-sm text-muted">{report.period}</p>
            </div>
          </div>
          <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-muted hover:bg-white/10 hover:text-text">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="rounded-xl bg-white/5 p-4 text-center">
            <p className="font-mono text-2xl font-bold text-text">42.5h</p>
            <p className="text-xs text-muted">Ure</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4 text-center">
            <p className="font-mono text-2xl font-bold text-text">€8,450</p>
            <p className="text-xs text-muted">Prihodek</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4 text-center">
            <p className="font-mono text-2xl font-bold text-text">4</p>
            <p className="text-xs text-muted">Projekti</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4 text-center">
            <p className="font-mono text-2xl font-bold text-text">23</p>
            <p className="text-xs text-muted">Naloge</p>
          </div>
        </div>

        {/* Sections */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-text">Vsebina poročila</h3>
          <div className="mt-3 space-y-2">
            {report.sections.map((section, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    {idx + 1}
                  </div>
                  <span className="font-medium text-text">{section}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text">
                    <Eye size={14} />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text">
                    <Edit size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90">
            <Download size={16} />
            Prenesi PDF
          </button>
          <button className="flex items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-semibold text-text hover:bg-white/10">
            <Printer size={16} />
            Natisni
          </button>
          <button className="flex items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-semibold text-text hover:bg-white/10">
            <Share2 size={16} />
            Deli
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function NewReportModal({ onClose }) {
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
        className="w-full max-w-lg rounded-2xl border border-white/10 bg-card p-6 shadow-2xl"
      >
        <h2 className="text-xl font-bold text-text">Ustvari novo poročilo</h2>
        
        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-muted">Tip poročila</label>
            <select className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-text focus:border-primary focus:outline-none">
              <option>Tedensko poročilo</option>
              <option>Mesečno poročilo</option>
              <option>Kvartalno poročilo</option>
              <option>Projektno poročilo</option>
              <option>Finančno poročilo</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted">Obdobje</label>
            <div className="grid grid-cols-2 gap-3">
              <input type="date" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-text focus:border-primary focus:outline-none" />
              <input type="date" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-text focus:border-primary focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted">Vključi sekcije</label>
            <div className="space-y-2">
              {["Projekti", "Časovni list", "Finance", "Online prisotnost", "CRM"].map((section) => (
                <label key={section} className="flex items-center gap-3 rounded-xl bg-white/5 p-3 cursor-pointer hover:bg-white/10 transition-colors">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary" />
                  <span className="text-sm text-text">{section}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button onClick={onClose} className="flex-1 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium text-text hover:bg-white/10">
            Prekliči
          </button>
          <button className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90">
            Ustvari
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}