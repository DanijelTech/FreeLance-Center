import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Plus, Search, Filter, MoreVertical, Mail, Phone, MapPin, Building,
  Calendar, DollarSign, MessageSquare, FileText, CheckCircle2, Clock, AlertCircle,
  Edit, Trash2, Eye, UserPlus, ChevronRight, Star, Briefcase, Send, User,
  X, Filter as FilterIcon, Download, Upload, Phone as PhoneIcon, Video
} from "lucide-react";

const CLIENTS = [
  {
    id: 1,
    name: "ModaVida d.o.o.",
    contact: "Ana Kovač",
    email: "ana.kovac@modavida.si",
    phone: "+386 1 234 5678",
    location: "Ljubljana, Slovenija",
    avatar: "AK",
    status: "active",
    rating: 5,
    totalRevenue: 12400,
    outstanding: 4200,
    projects: 2,
    lastContact: "2026-06-10",
    notes: "Pomemben stranka za dolgoročno sodelovanje. Plačujejo redno.",
    tags: ["E-commerce", "Razvoj"],
  },
  {
    id: 2,
    name: "BioGourmet",
    contact: "Marko Horvat",
    email: "marko.horvat@biogourmet.si",
    phone: "+386 2 345 6789",
    location: "Maribor, Slovenija",
    avatar: "MH",
    status: "active",
    rating: 4,
    totalRevenue: 4500,
    outstanding: 1800,
    projects: 1,
    lastContact: "2026-06-08",
    notes: "Ekološka živilska znamka. Potrebujejo celostno grafično podobo.",
    tags: ["Branding", "Design"],
  },
  {
    id: 3,
    name: "SalesPro d.o.o.",
    contact: "Petra Zupan",
    email: "petra.zupan@salespro.si",
    phone: "+386 3 456 7890",
    location: "Celje, Slovenija",
    avatar: "PZ",
    status: "active",
    rating: 4,
    totalRevenue: 9800,
    outstanding: 5600,
    projects: 1,
    lastContact: "2026-06-05",
    notes: "CRM projekt v teku. Začetek je bil zahteven, zdaj dobro napreduje.",
    tags: ["CRM", "Razvoj"],
  },
  {
    id: 4,
    name: "FitTrack Inc.",
    contact: "John Smith",
    email: "john.smith@fittrack.com",
    phone: "+1 555 123 4567",
    location: "San Francisco, ZDA",
    avatar: "JS",
    status: "lead",
    rating: 3,
    totalRevenue: 3200,
    outstanding: 3200,
    projects: 1,
    lastContact: "2026-06-01",
    notes: "Ameriški startup. Plačilni pogoji daljši. Komunikacija v angleščini.",
    tags: ["Mobile", "Fitness"],
  },
  {
    id: 5,
    name: "Računovodstvo Novak",
    contact: "Tomaž Novak",
    email: "tomaz.novak@racunovodstvo-novak.si",
    phone: "+386 4 567 8901",
    location: "Koper, Slovenija",
    avatar: "TN",
    status: "completed",
    rating: 5,
    totalRevenue: 3800,
    outstanding: 0,
    projects: 1,
    lastContact: "2026-05-15",
    notes: "Odličen stranka. Projekt končan, možnost novega sodelovanja.",
    tags: ["WordPress", "SEO"],
  },
  {
    id: 6,
    name: "TechStart d.o.o.",
    contact: "Luka Krajnc",
    email: "luka.krajnc@techstart.si",
    phone: "+386 5 678 9012",
    location: "Nova Gorica, Slovenija",
    avatar: "LK",
    status: "active",
    rating: 4,
    totalRevenue: 5200,
    outstanding: 0,
    projects: 2,
    lastContact: "2026-04-28",
    notes: "Startup z inovativnimi idejami. Potrebujejo API integracijo.",
    tags: ["API", "Integracija"],
  },
];

const CONTACTS = [
  { id: 1, clientId: 1, name: "Ana Kovač", role: "Direktorica", email: "ana.kovac@modavida.si", phone: "+386 1 234 5678", isPrimary: true },
  { id: 2, clientId: 1, name: "Peter Kos", role: "IT manager", email: "peter.kos@modavida.si", phone: "+386 1 234 5679", isPrimary: false },
  { id: 3, clientId: 2, name: "Marko Horvat", role: "Direktor", email: "marko.horvat@biogourmet.si", phone: "+386 2 345 6789", isPrimary: true },
  { id: 4, clientId: 3, name: "Petra Zupan", role: "Vodja projekta", email: "petra.zupan@salespro.si", phone: "+386 3 456 7890", isPrimary: true },
  { id: 5, clientId: 4, name: "John Smith", role: "CEO", email: "john.smith@fittrack.com", phone: "+1 555 123 4567", isPrimary: true },
];

const DEALS = [
  { id: 1, clientId: 4, title: "FitTrack Mobile App - faza 2", value: 15000, stage: "proposal", probability: 60, closeDate: "2026-07-15" },
  { id: 2, clientId: 1, title: "ModaVida - nadgradnja platforme", value: 8000, stage: "negotiation", probability: 80, closeDate: "2026-06-30" },
  { id: 3, clientId: 2, title: "BioGourmet - spletna trgovina", value: 6500, stage: "qualified", probability: 40, closeDate: "2026-08-01" },
  { id: 4, clientId: 6, title: "TechStart - AI integracija", value: 12000, stage: "discovery", probability: 20, closeDate: "2026-09-01" },
];

const ACTIVITIES = [
  { id: 1, clientId: 1, type: "call", content: "Pogovor o nadgradnji platforme", date: "2026-06-10 14:30", user: "DC" },
  { id: 2, clientId: 2, type: "email", content: "Poslana ponudba za spletno trgovino", date: "2026-06-08 10:15", user: "DC" },
  { id: 3, clientId: 3, type: "meeting", content: "Sestanek o napredku CRM projekta", date: "2026-06-05 09:00", user: "DC" },
  { id: 4, clientId: 4, type: "email", content: "Pozdravno sporočilo in predstavitev", date: "2026-06-01 11:00", user: "DC" },
  { id: 5, clientId: 5, type: "call", content: "Povratne informacije o projektu", date: "2026-05-15 16:00", user: "DC" },
];

const STAGES = {
  discovery: { label: "Odkrivanje", color: "muted", probability: 10 },
  qualified: { label: "Kvalificiran", color: "primary", probability: 30 },
  proposal: { label: "Ponudba", color: "warning", probability: 60 },
  negotiation: { label: "Pogajanje", color: "secondary", probability: 80 },
  won: { label: "Zmagano", color: "success", probability: 100 },
  lost: { label: "Izgubljeno", color: "danger", probability: 0 },
};

const STATUS_CONFIG = {
  active: { label: "Aktiven", color: "secondary", bg: "bg-secondary/15" },
  lead: { label: "Potencial", color: "warning", bg: "bg-warning/15" },
  completed: { label: "Končano", color: "muted", bg: "bg-white/5" },
  inactive: { label: "Neaktiven", color: "danger", bg: "bg-danger/15" },
};

export default function CRM() {
  const [activeTab, setActiveTab] = useState("clients"); // clients | deals | activities
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedClient, setSelectedClient] = useState(null);
  const [showNewClient, setShowNewClient] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid | list

  const filteredClients = CLIENTS.filter(client => {
    if (filterStatus !== "all" && client.status !== filterStatus) return false;
    if (searchQuery && !client.name.toLowerCase().includes(searchQuery.toLowerCase()) && !client.contact.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const totalRevenue = CLIENTS.reduce((sum, c) => sum + c.totalRevenue, 0);
  const activeClients = CLIENTS.filter(c => c.status === "active").length;
  const totalOutstanding = CLIENTS.reduce((sum, c) => sum + c.outstanding, 0);
  const pipelineValue = DEALS.reduce((sum, d) => sum + (d.value * d.probability / 100), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text sm:text-3xl">CRM</h1>
          <p className="mt-1 text-sm text-muted">Upravljaj stranke, kontakte in prodajne priložnosti.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-white/10">
            <Download size={18} />
            Izvozi
          </button>
          <button
            onClick={() => setShowNewClient(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
          >
            <Plus size={18} />
            Nova stranka
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/5 bg-card p-4 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Users size={18} />
            </div>
          </div>
          <p className="mt-3 font-mono text-2xl font-bold text-text">{activeClients}</p>
          <p className="text-xs text-muted">Aktivnih strank</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl border border-white/5 bg-card p-4 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
              <DollarSign size={18} />
            </div>
          </div>
          <p className="mt-3 font-mono text-2xl font-bold text-text">€{totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-muted">Skupni prihodek</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-white/5 bg-card p-4 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-warning/15 text-warning">
              <Clock size={18} />
            </div>
          </div>
          <p className="mt-3 font-mono text-2xl font-bold text-text">€{totalOutstanding.toLocaleString()}</p>
          <p className="text-xs text-muted">Odprto za plačilo</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-white/5 bg-card p-4 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-danger/15 text-danger">
              <Briefcase size={18} />
            </div>
          </div>
          <p className="mt-3 font-mono text-2xl font-bold text-text">€{Math.round(pipelineValue).toLocaleString()}</p>
          <p className="text-xs text-muted">Pipeline vrednost</p>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1">
        {[
          { id: "clients", label: "Stranke", icon: Users },
          { id: "deals", label: "Priložnosti", icon: Briefcase },
          { id: "activities", label: "Aktivnosti", icon: Calendar },
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
            </button>
          );
        })}
      </div>

      {/* Clients Tab */}
      {activeTab === "clients" && (
        <>
          {/* Filters & View Toggle */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  placeholder="Iskanje strank..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-muted/50 focus:border-primary focus:outline-none"
                />
              </div>
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
            <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  viewMode === "grid" ? "bg-primary text-white" : "text-muted hover:text-text"
                }`}
              >
                Mreža
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  viewMode === "list" ? "bg-primary text-white" : "text-muted hover:text-text"
                }`}
              >
                Seznam
              </button>
            </div>
          </div>

          {/* Clients Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredClients.map((client, idx) => {
                const statusConfig = STATUS_CONFIG[client.status];
                return (
                  <motion.div
                    key={client.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedClient(client)}
                    className="group cursor-pointer rounded-2xl border border-white/5 bg-card p-5 shadow-lg transition-all hover:border-primary/30 hover:shadow-xl"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-lg font-bold text-white">
                          {client.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold text-text group-hover:text-primary transition-colors">{client.name}</h3>
                          <p className="text-sm text-muted">{client.contact}</p>
                        </div>
                      </div>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text">
                        <MoreVertical size={16} />
                      </button>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <Mail size={14} />
                        <span className="truncate">{client.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <PhoneIcon size={14} />
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <MapPin size={14} />
                        <span>{client.location}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {client.tags.map((tag) => (
                        <span key={tag} className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-medium text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="rounded-lg bg-white/5 p-2.5 text-center">
                        <p className="font-mono text-sm font-bold text-text">€{client.totalRevenue.toLocaleString()}</p>
                        <p className="text-[10px] text-muted">Prihodek</p>
                      </div>
                      <div className="rounded-lg bg-white/5 p-2.5 text-center">
                        <p className="font-mono text-sm font-bold text-text">{client.projects}</p>
                        <p className="text-[10px] text-muted">Projekti</p>
                      </div>
                      <div className="rounded-lg bg-white/5 p-2.5 text-center">
                        <div className="flex items-center justify-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} className={i < client.rating ? "text-warning fill-warning" : "text-muted/30"} />
                          ))}
                        </div>
                        <p className="text-[10px] text-muted mt-1">Ocena</p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                      <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusConfig.bg} ${statusConfig.color === "secondary" ? "text-secondary" : statusConfig.color === "warning" ? "text-warning" : statusConfig.color === "muted" ? "text-muted" : "text-danger"}`}>
                        {statusConfig.label}
                      </span>
                      <span className="text-xs text-muted">Zadnji stik: {new Date(client.lastContact).toLocaleDateString("sl-SI")}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/5 bg-card shadow-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5 bg-white/2">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">Stranka</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">Kontakt</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">Lokacija</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">Prihodek</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => {
                    const statusConfig = STATUS_CONFIG[client.status];
                    return (
                      <tr
                        key={client.id}
                        onClick={() => setSelectedClient(client)}
                        className="border-b border-white/5 cursor-pointer transition-colors hover:bg-white/5"
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white">
                              {client.avatar}
                            </div>
                            <div>
                              <p className="font-medium text-text">{client.name}</p>
                              <p className="text-xs text-muted">{client.projects} projektov</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-muted">{client.contact}</td>
                        <td className="px-4 py-4 text-sm text-muted">{client.location}</td>
                        <td className="px-4 py-4">
                          <span className="font-mono text-sm font-semibold text-text">€{client.totalRevenue.toLocaleString()}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusConfig.bg} ${statusConfig.color === "secondary" ? "text-secondary" : statusConfig.color === "warning" ? "text-warning" : statusConfig.color === "muted" ? "text-muted" : "text-danger"}`}>
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text">
                            <ChevronRight size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Deals Tab */}
      {activeTab === "deals" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/5 bg-card shadow-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5 bg-white/2">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">Priložnost</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">Stranka</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">Vrednost</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">Stopnja</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">Verjetnost</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">Rok</th>
                </tr>
              </thead>
              <tbody>
                {DEALS.map((deal) => {
                  const client = CLIENTS.find(c => c.id === deal.clientId);
                  const stageConfig = STAGES[deal.stage];
                  return (
                    <tr key={deal.id} className="border-b border-white/5 transition-colors hover:bg-white/5 cursor-pointer">
                      <td className="px-4 py-4">
                        <p className="font-medium text-text">{deal.title}</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-[10px] font-bold text-white">
                            {client?.avatar}
                          </div>
                          <span className="text-sm text-muted">{client?.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-mono text-sm font-bold text-text">€{deal.value.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          stageConfig.color === "muted" ? "bg-white/5 text-muted" :
                          stageConfig.color === "primary" ? "bg-primary/15 text-primary" :
                          stageConfig.color === "warning" ? "bg-warning/15 text-warning" :
                          stageConfig.color === "secondary" ? "bg-secondary/15 text-secondary" :
                          "bg-white/5 text-muted"
                        }`}>
                          {stageConfig.label}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-secondary" style={{ width: `${deal.probability}%` }} />
                          </div>
                          <span className="font-mono text-xs text-muted">{deal.probability}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-muted">
                        {new Date(deal.closeDate).toLocaleDateString("sl-SI")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pipeline Summary */}
          <div className="grid gap-4 lg:grid-cols-5">
            {Object.entries(STAGES).filter(([key]) => !["won", "lost"].includes(key)).map(([key, config]) => {
              const stageDeals = DEALS.filter(d => d.stage === key);
              const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);
              return (
                <div key={key} className="rounded-2xl border border-white/5 bg-card p-4 shadow-lg">
                  <p className="text-xs text-muted">{config.label}</p>
                  <p className="mt-1 font-mono text-xl font-bold text-text">€{totalValue.toLocaleString()}</p>
                  <p className="mt-1 text-xs text-muted">{stageDeals.length} ponudb</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Activities Tab */}
      {activeTab === "activities" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-text">Zgodovina aktivnosti</h3>
              <button className="flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90">
                <Plus size={16} />
                Dodaj aktivnost
              </button>
            </div>
            <div className="space-y-3">
              {ACTIVITIES.map((activity, idx) => {
                const client = CLIENTS.find(c => c.id === activity.clientId);
                const typeConfig = {
                  call: { icon: PhoneIcon, color: "secondary" },
                  email: { icon: Mail, color: "primary" },
                  meeting: { icon: Video, color: "warning" },
                }[activity.type] || { icon: Calendar, color: "muted" };
                
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-4 rounded-xl bg-white/5 p-4"
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-${typeConfig.color}/15 text-${typeConfig.color}`}>
                      <typeConfig.icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-text">{activity.content}</p>
                      <p className="text-sm text-muted">{client?.name} • {activity.date}</p>
                    </div>
                    <span className="text-xs text-muted">{activity.user}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Client Detail Modal */}
      <AnimatePresence>
        {selectedClient && (
          <ClientDetailModal client={selectedClient} onClose={() => setSelectedClient(null)} />
        )}
      </AnimatePresence>

      {/* New Client Modal */}
      <AnimatePresence>
        {showNewClient && (
          <NewClientModal onClose={() => setShowNewClient(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ClientDetailModal({ client, onClose }) {
  const statusConfig = STATUS_CONFIG[client.status];
  const clientContacts = CONTACTS.filter(c => c.clientId === client.id);
  
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
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-card p-6 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-2xl font-bold text-white">
              {client.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold text-text">{client.name}</h2>
              <p className="text-sm text-muted">{client.contact}</p>
              <span className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusConfig.bg} ${statusConfig.color === "secondary" ? "text-secondary" : statusConfig.color === "warning" ? "text-warning" : statusConfig.color === "muted" ? "text-muted" : "text-danger"}`}>
                {statusConfig.label}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-muted hover:bg-white/10 hover:text-text">
              <Edit size={18} />
            </button>
            <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-muted hover:bg-white/10 hover:text-text">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-xs text-muted">E-pošta</p>
            <p className="mt-1 text-sm font-medium text-text">{client.email}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-xs text-muted">Telefon</p>
            <p className="mt-1 text-sm font-medium text-text">{client.phone}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-xs text-muted">Lokacija</p>
            <p className="mt-1 text-sm font-medium text-text">{client.location}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-xs text-muted">Zadnji stik</p>
            <p className="mt-1 text-sm font-medium text-text">{new Date(client.lastContact).toLocaleDateString("sl-SI")}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-4 gap-3">
          <div className="rounded-xl bg-white/5 p-3 text-center">
            <p className="text-[10px] uppercase tracking-wide text-muted">Skupaj</p>
            <p className="mt-1 font-mono text-lg font-bold text-text">€{client.totalRevenue.toLocaleString()}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3 text-center">
            <p className="text-[10px] uppercase tracking-wide text-muted">Odprto</p>
            <p className="mt-1 font-mono text-lg font-bold text-warning">€{client.outstanding.toLocaleString()}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3 text-center">
            <p className="text-[10px] uppercase tracking-wide text-muted">Projekti</p>
            <p className="mt-1 font-mono text-lg font-bold text-text">{client.projects}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3 text-center">
            <p className="text-[10px] uppercase tracking-wide text-muted">Ocena</p>
            <div className="mt-1 flex items-center justify-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < client.rating ? "text-warning fill-warning" : "text-muted/30"} />
              ))}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-text">Opombe</h4>
          <p className="mt-2 text-sm text-muted">{client.notes}</p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm font-semibold text-white hover:bg-secondary/90">
            <PhoneIcon size={16} />
            Pokliči
          </button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90">
            <Mail size={16} />
            Pošlji email
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function NewClientModal({ onClose }) {
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
        <h2 className="text-xl font-bold text-text">Nova stranka</h2>
        
        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-muted">Ime podjetja</label>
            <input type="text" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-text focus:border-primary focus:outline-none" placeholder="Ime podjetja" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm text-muted">Kontaktna oseba</label>
              <input type="text" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-text focus:border-primary focus:outline-none" placeholder="Ime in priimek" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted">E-pošta</label>
              <input type="email" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-text focus:border-primary focus:outline-none" placeholder="email@primer.si" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm text-muted">Telefon</label>
              <input type="tel" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-text focus:border-primary focus:outline-none" placeholder="+386..." />
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted">Lokacija</label>
              <input type="text" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-text focus:border-primary focus:outline-none" placeholder="Mesto, država" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted">Opombe</label>
            <textarea rows={3} className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-text focus:border-primary focus:outline-none" placeholder="Dodatne informacije..." />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button onClick={onClose} className="flex-1 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium text-text hover:bg-white/10">
            Prekliči
          </button>
          <button className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90">
            Ustvari stranko
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}