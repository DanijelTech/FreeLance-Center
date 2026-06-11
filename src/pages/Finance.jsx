import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Receipt, Plus, Search, Filter, Download, Send, Copy, MoreVertical, DollarSign,
  CreditCard, TrendingUp, Wallet, Calendar, CheckCircle2, Clock, AlertCircle, XCircle,
  FileText, Building, User, ArrowUpRight, ArrowDownRight, PieChart, Banknote,
  Receipt as InvoiceIcon, FileSignature, CreditCard as CardIcon
} from "lucide-react";

const INVOICES = [
  { id: "INV-2026-0042", client: "ModaVida d.o.o.", project: "E-commerce platforma", amount: 4250.00, status: "paid", date: "2026-06-01", dueDate: "2026-06-15", items: 5 },
  { id: "INV-2026-0041", client: "BioGourmet", project: "Brand identity", amount: 1800.00, status: "sent", date: "2026-05-28", dueDate: "2026-06-11", items: 3 },
  { id: "INV-2026-0040", client: "SalesPro d.o.o.", project: "CRM sistem", amount: 5600.00, status: "overdue", date: "2026-05-15", dueDate: "2026-05-30", items: 8 },
  { id: "INV-2026-0039", client: "FitTrack Inc.", project: "Mobile app", amount: 3200.00, status: "draft", date: "2026-06-10", dueDate: "2026-07-01", items: 4 },
  { id: "INV-2026-0038", client: "Računovodstvo Novak", project: "Spletna stran", amount: 1900.00, status: "paid", date: "2026-05-10", dueDate: "2026-05-25", items: 3 },
  { id: "INV-2026-0037", client: "TechStart d.o.o.", project: "API integracija", amount: 2400.00, status: "paid", date: "2026-04-28", dueDate: "2026-05-12", items: 4 },
];

const EXPENSES = [
  { id: 1, category: "Software", description: "Adobe Creative Cloud - letna naročnina", amount: 599.88, date: "2026-06-01", receipt: true },
  { id: 2, category: "Pisarna", description: "Stroški spletnega gostovanja - junij", amount: 49.99, date: "2026-06-01", receipt: true },
  { id: 3, category: "Potni stroški", description: "Gorivo - pot na sestanek z ModaVida", amount: 85.00, date: "2026-05-28", receipt: true },
  { id: 4, category: "Marketing", description: "Facebook ads - kampanja FitTrack", amount: 250.00, date: "2026-05-25", receipt: true },
  { id: 5, category: "Software", description: "Figma Pro mesečna naročnina", amount: 45.00, date: "2026-05-20", receipt: true },
  { id: 6, category: "Izobraževanje", description: "Udeležba na konferenci WebDev Summit", amount: 380.00, date: "2026-05-15", receipt: true },
];

const CLIENTS = [
  { id: 1, name: "ModaVida d.o.o.", contact: "Ana Kovač", email: "ana@modavida.si", projects: 2, totalBilled: 12400, outstanding: 4200 },
  { id: 2, name: "BioGourmet", contact: "Marko Horvat", email: "marko@biogourmet.si", projects: 1, totalBilled: 4500, outstanding: 1800 },
  { id: 3, name: "SalesPro d.o.o.", contact: "Petra Zupan", email: "petra@salespro.si", projects: 1, totalBilled: 9800, outstanding: 5600 },
  { id: 4, name: "FitTrack Inc.", contact: "John Smith", email: "john@fittrack.com", projects: 1, totalBilled: 3200, outstanding: 3200 },
  { id: 5, name: "Računovodstvo Novak", contact: "Tomaž Novak", email: "racunovodstvo@novak.si", projects: 1, totalBilled: 3800, outstanding: 0 },
];

const STATUS_CONFIG = {
  draft: { label: "Osnutek", color: "muted", bg: "bg-white/5", icon: FileText },
  sent: { label: "Poslano", color: "primary", bg: "bg-primary/15", icon: Send },
  paid: { label: "Plačano", color: "secondary", bg: "bg-secondary/15", icon: CheckCircle2 },
  overdue: { label: "Zapadlo", color: "danger", bg: "bg-danger/15", icon: AlertCircle },
};

const CATEGORY_ICONS = {
  Software: CreditCard,
  Pisarna: Building,
  "Potni stroški": Wallet,
  Marketing: TrendingUp,
  Izobraževanje: BookOpen,
};

const stats = {
  totalRevenue: 28450.00,
  outstandingAmount: 14800.00,
  expensesThisMonth: 1409.87,
  netIncome: 27040.13,
  paidThisMonth: 8450.00,
  pendingInvoices: 3,
};

export default function Finance() {
  const [activeTab, setActiveTab] = useState("invoices"); // invoices | expenses | clients
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const filteredInvoices = INVOICES.filter(inv => {
    if (filterStatus !== "all" && inv.status !== filterStatus) return false;
    if (searchQuery && !inv.client.toLowerCase().includes(searchQuery.toLowerCase()) && !inv.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const totalOutstanding = INVOICES.filter(i => i.status !== "paid").reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text sm:text-3xl">Finance</h1>
          <p className="mt-1 text-sm text-muted">Upravljaj fakture, stroške in plačila.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-white/10">
            <Download size={18} />
            Izvozi
          </button>
          <button
            onClick={() => setShowNewInvoice(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
          >
            <Plus size={18} />
            Nova faktura
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/5 bg-card p-4 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
              <TrendingUp size={18} />
            </div>
          </div>
          <p className="mt-3 font-mono text-xl font-bold text-text">€{stats.totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-muted">Skupni prihodek</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl border border-white/5 bg-card p-4 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-warning/15 text-warning">
              <Clock size={18} />
            </div>
          </div>
          <p className="mt-3 font-mono text-xl font-bold text-text">€{stats.outstandingAmount.toLocaleString()}</p>
          <p className="text-xs text-muted">Neporavnano</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-white/5 bg-card p-4 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-danger/15 text-danger">
              <Receipt size={18} />
            </div>
          </div>
          <p className="mt-3 font-mono text-xl font-bold text-text">€{stats.expensesThisMonth.toLocaleString()}</p>
          <p className="text-xs text-muted">Stroški (ta mesec)</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-white/5 bg-card p-4 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Wallet size={18} />
            </div>
          </div>
          <p className="mt-3 font-mono text-xl font-bold text-text">€{stats.paidThisMonth.toLocaleString()}</p>
          <p className="text-xs text-muted">Plačano (ta mesec)</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-white/5 bg-card p-4 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
              <Banknote size={18} />
            </div>
          </div>
          <p className="mt-3 font-mono text-xl font-bold text-text">€{stats.netIncome.toLocaleString()}</p>
          <p className="text-xs text-muted">Čisti dobiček</p>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1">
        {[
          { id: "invoices", label: "Fakture", icon: Receipt },
          { id: "expenses", label: "Stroški", icon: CreditCard },
          { id: "clients", label: "Stranke", icon: Building },
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

      {/* Invoices Tab */}
      {activeTab === "invoices" && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Iskanje faktur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-muted/50 focus:border-primary focus:outline-none"
              />
            </div>
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

          {/* Invoices Table */}
          <div className="rounded-2xl border border-white/5 bg-card shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5 bg-white/2">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">Št. fakture</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">Stranka</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">Projekt</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">Znesek</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">Datum</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">Rok</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice, idx) => {
                    const statusConfig = STATUS_CONFIG[invoice.status];
                    const Icon = statusConfig.icon;
                    const isOverdue = invoice.status === "overdue";
                    
                    return (
                      <motion.tr
                        key={invoice.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="border-b border-white/5 transition-colors hover:bg-white/5 cursor-pointer"
                        onClick={() => setSelectedInvoice(invoice)}
                      >
                        <td className="px-4 py-4">
                          <span className="font-mono text-sm font-semibold text-primary">{invoice.id}</span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                              <Building size={16} />
                            </div>
                            <span className="font-medium text-text">{invoice.client}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-muted">{invoice.project}</td>
                        <td className="px-4 py-4">
                          <span className="font-mono text-sm font-bold text-text">€{invoice.amount.toLocaleString()}</span>
                        </td>
                        <td className="px-4 py-4 text-sm text-muted">{new Date(invoice.date).toLocaleDateString("sl-SI")}</td>
                        <td className="px-4 py-4">
                          <span className={`text-sm ${isOverdue ? "text-danger font-semibold" : "text-muted"}`}>
                            {new Date(invoice.dueDate).toLocaleDateString("sl-SI")}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusConfig.bg} ${statusConfig.color === "muted" ? "text-muted" : statusConfig.color === "primary" ? "text-primary" : statusConfig.color === "secondary" ? "text-secondary" : "text-danger"}`}>
                            <Icon size={12} />
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Expenses Tab */}
      {activeTab === "expenses" && (
        <div className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Summary */}
            <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
              <h3 className="text-lg font-bold text-text">Povzetek stroškov</h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-xs text-muted">Ta mesec</p>
                  <p className="mt-1 font-mono text-2xl font-bold text-danger">€{stats.expensesThisMonth.toLocaleString()}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-xs text-muted">Povprečje/mesec</p>
                  <p className="mt-1 font-mono text-2xl font-bold text-text">€1,245</p>
                </div>
              </div>
              
              {/* Category Breakdown */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-muted">Po kategorijah</h4>
                <div className="mt-3 space-y-3">
                  {["Software", "Pisarna", "Marketing", "Potni stroški", "Izobraževanje"].map((cat, idx) => {
                    const amounts = [644.88, 49.99, 250, 85, 380];
                    const total = amounts.reduce((a, b) => a + b, 0);
                    const pct = Math.round((amounts[idx] / total) * 100);
                    const Icon = CATEGORY_ICONS[cat] || CreditCard;
                    return (
                      <div key={cat} className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-muted">
                          <Icon size={14} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-text">{cat}</span>
                            <span className="font-mono text-sm text-text">€{amounts[idx].toFixed(2)}</span>
                          </div>
                          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Add Expense */}
            <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
              <h3 className="text-lg font-bold text-text">Dodaj strošek</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-muted">Opis</label>
                  <input type="text" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-text focus:border-primary focus:outline-none" placeholder="Naziv stroška" />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-muted">Znesek</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">€</span>
                    <input type="number" className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-8 pr-4 font-mono text-text focus:border-primary focus:outline-none" placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-muted">Kategorija</label>
                  <select className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-text focus:border-primary focus:outline-none">
                    <option>Izberi kategorijo</option>
                    <option>Software</option>
                    <option>Pisarna</option>
                    <option>Potni stroški</option>
                    <option>Marketing</option>
                    <option>Izobraževanje</option>
                  </select>
                </div>
                <button className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary/90">
                  Dodaj strošek
                </button>
              </div>
            </div>
          </div>

          {/* Recent Expenses */}
          <div className="rounded-2xl border border-white/5 bg-card shadow-lg overflow-hidden">
            <div className="p-5 border-b border-white/5">
              <h3 className="text-lg font-bold text-text">Zadnji stroški</h3>
            </div>
            <div className="divide-y divide-white/5">
              {EXPENSES.map((expense) => {
                const Icon = CATEGORY_ICONS[expense.category] || CreditCard;
                return (
                  <div key={expense.id} className="flex items-center gap-4 p-4 transition-colors hover:bg-white/5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-muted">
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-text truncate">{expense.description}</p>
                      <p className="text-xs text-muted">{expense.category} • {new Date(expense.date).toLocaleDateString("sl-SI")}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {expense.receipt && (
                        <span className="flex items-center gap-1 rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-semibold text-secondary">
                          <FileText size={10} />
                          Račun
                        </span>
                      )}
                      <span className="font-mono font-semibold text-danger">-€{expense.amount.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Clients Tab */}
      {activeTab === "clients" && (
        <div className="grid gap-4 lg:grid-cols-2">
          {CLIENTS.map((client, idx) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Building size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text">{client.name}</h3>
                    <p className="text-sm text-muted">{client.contact}</p>
                    <p className="text-xs text-muted">{client.email}</p>
                  </div>
                </div>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text">
                  <MoreVertical size={16} />
                </button>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-muted">Projekti</p>
                  <p className="mt-1 font-mono text-lg font-bold text-text">{client.projects}</p>
                </div>
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-muted">Skupaj</p>
                  <p className="mt-1 font-mono text-lg font-bold text-text">€{client.totalBilled.toLocaleString()}</p>
                </div>
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-muted">Odprto</p>
                  <p className={`mt-1 font-mono text-lg font-bold ${client.outstanding > 0 ? "text-warning" : "text-secondary"}`}>
                    €{client.outstanding.toLocaleString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Invoice Detail Modal */}
      <AnimatePresence>
        {selectedInvoice && (
          <InvoiceDetailModal invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
        )}
      </AnimatePresence>

      {/* New Invoice Modal */}
      <AnimatePresence>
        {showNewInvoice && (
          <NewInvoiceModal onClose={() => setShowNewInvoice(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function InvoiceDetailModal({ invoice, onClose }) {
  const statusConfig = STATUS_CONFIG[invoice.status];
  
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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-text">{invoice.id}</h2>
            <p className="text-sm text-muted">{invoice.client}</p>
          </div>
          <span className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${statusConfig.bg} ${statusConfig.color === "muted" ? "text-muted" : statusConfig.color === "primary" ? "text-primary" : statusConfig.color === "secondary" ? "text-secondary" : "text-danger"}`}>
            {statusConfig.label}
          </span>
        </div>

        {/* Invoice Details */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-xs text-muted">Znesek</p>
            <p className="mt-1 font-mono text-2xl font-bold text-text">€{invoice.amount.toLocaleString()}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-xs text-muted">Projekt</p>
            <p className="mt-1 text-sm font-semibold text-text">{invoice.project}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-xs text-muted">Datum izdaje</p>
            <p className="mt-1 text-sm font-semibold text-text">{new Date(invoice.date).toLocaleDateString("sl-SI")}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-xs text-muted">Rok plačila</p>
            <p className="mt-1 text-sm font-semibold text-text">{new Date(invoice.dueDate).toLocaleDateString("sl-SI")}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
          {invoice.status === "draft" && (
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90">
              <Send size={16} />
              Pošlji stranki
            </button>
          )}
          <button className="flex items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-semibold text-text hover:bg-white/10">
            <Download size={16} />
            PDF
          </button>
          <button className="flex items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-semibold text-text hover:bg-white/10">
            <Copy size={16} />
            Kopiraj
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function NewInvoiceModal({ onClose }) {
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
        className="w-full max-w-2xl rounded-2xl border border-white/10 bg-card p-6 shadow-2xl"
      >
        <h2 className="text-xl font-bold text-text">Nova faktura</h2>
        
        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-muted">Stranka</label>
            <select className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-text focus:border-primary focus:outline-none">
              <option>Izberi stranko</option>
              {CLIENTS.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted">Projekt</label>
            <input type="text" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-text focus:border-primary focus:outline-none" placeholder="Naziv projekta" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm text-muted">Znesek</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">€</span>
                <input type="number" className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-8 pr-4 font-mono text-text focus:border-primary focus:outline-none" placeholder="0.00" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted">Rok plačila</label>
              <input type="date" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-text focus:border-primary focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button onClick={onClose} className="flex-1 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium text-text hover:bg-white/10">
            Prekliči
          </button>
          <button className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90">
            Ustvari fakturo
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}