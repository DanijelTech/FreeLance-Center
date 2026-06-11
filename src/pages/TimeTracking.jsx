import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock, Play, Pause, Square, RotateCcw, Plus, Calendar, ChevronDown, ChevronUp,
  Coffee, Utensils, Briefcase, Moon, Sun, DollarSign, TrendingUp, Target,
  CheckCircle2, AlertCircle, Filter, Download, BarChart3, Timer,
  Coffee as CoffeeIcon, Users, Globe, Zap
} from "lucide-react";

const PRESET_PROJECTS = [
  { id: 1, name: "ModaVida E-commerce", color: "#6C63FF", client: "ModaVida d.o.o." },
  { id: 2, name: "BioGourmet Branding", color: "#00D4AA", client: "BioGourmet" },
  { id: 3, name: "FitTrack Mobile", color: "#FF6B6B", client: "FitTrack Inc." },
  { id: 4, name: "SalesPro CRM", color: "#4ECDC4", client: "SalesPro d.o.o." },
  { id: 5, name: "Računovodstvo Novak", color: "#45B7D1", client: "Računovodstvo Novak" },
];

const BREAK_TYPES = [
  { id: "coffee", label: "Pavza", icon: CoffeeIcon, duration: 15 },
  { id: "lunch", label: "Kosilo", icon: Utensils, duration: 60 },
  { id: "meeting", label: "Sestanek", icon: Users, duration: 30 },
];

const timeEntries = [
  { id: 1, project: 1, task: "Implementacija Stripe gateway", date: "2026-06-11", start: "09:00", end: "11:30", duration: 2.5, billable: true, description: "Stripe integracija za plačila" },
  { id: 2, project: 2, task: "Dizajn logotipa", date: "2026-06-11", start: "13:00", end: "15:00", duration: 2, billable: true, description: "Končan logotip in barvna paleta" },
  { id: 3, project: 3, task: "Setup Firebase projekta", date: "2026-06-10", start: "10:00", end: "12:00", duration: 2, billable: true, description: "Firebase init in auth setup" },
  { id: 4, project: 4, task: "CRM API dokumentacija", date: "2026-06-10", start: "14:00", end: "17:00", duration: 3, billable: true, description: "OpenAPI spec za REST endpoints" },
  { id: 5, project: 1, task: "Code review", date: "2026-06-10", start: "08:30", end: "09:30", duration: 1, billable: false, description: "Review pull request-ov" },
  { id: 6, project: 5, task: "WordPress optimizacija", date: "2026-06-09", start: "11:00", end: "15:00", duration: 4, billable: true, description: "SEO in hitrost" },
];

const weeklyStats = {
  total: 42.5,
  billable: 38,
  nonBillable: 4.5,
  projects: 4,
  avgPerDay: 7.1,
  efficiency: 89,
};

export default function TimeTracking() {
  const [activeTab, setActiveTab] = useState("timer"); // timer | entries | reports
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedProject, setSelectedProject] = useState(PRESET_PROJECTS[0]);
  const [taskName, setTaskName] = useState("");
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [todayTotal, setTodayTotal] = useState(2.5);
  const [activeBreak, setActiveBreak] = useState(null);
  const [breakTime, setBreakTime] = useState(0);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split("T")[0]);
  
  const timerRef = useRef(null);
  const breakRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setCurrentTime((t) => t + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (activeBreak) {
      breakRef.current = setInterval(() => {
        setBreakTime((t) => t + 1);
      }, 1000);
    } else {
      clearInterval(breakRef.current);
      setBreakTime(0);
    }
    return () => clearInterval(breakRef.current);
  }, [activeBreak]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const formatDuration = (hours) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const startTimer = () => {
    if (!taskName.trim()) {
      setTaskName("Neznana naloga");
    }
    setIsRunning(true);
  };

  const pauseTimer = () => setIsRunning(false);
  
  const stopTimer = () => {
    setIsRunning(false);
    setCurrentTime(0);
    setTaskName("");
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCurrentTime(0);
  };

  const startBreak = (breakType) => {
    setActiveBreak(breakType);
    setBreakTime(0);
  };

  const stopBreak = () => {
    setActiveBreak(null);
    setBreakTime(0);
  };

  const getTodayEntries = () => timeEntries.filter(e => e.date === "2026-06-11");
  const getWeekEntries = () => timeEntries;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text sm:text-3xl">Časovni list</h1>
          <p className="mt-1 text-sm text-muted">Sledi svojemu delovnemu času in projektom.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNewEntry(true)}
            className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-white/10"
          >
            <Plus size={18} />
            Dodaj vnos
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90">
            <Download size={18} />
            Izvozi poročilo
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1">
        {[
          { id: "timer", label: "Časovnik", icon: Timer },
          { id: "entries", label: "Vnosi", icon: Clock },
          { id: "reports", label: "Poročila", icon: BarChart3 },
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

      {/* Timer Tab */}
      {activeTab === "timer" && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Timer */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/5 bg-card p-6 shadow-lg">
              {/* Project Selector */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-muted">Projekt</label>
                <div className="relative">
                  <button
                    onClick={() => setShowProjectDropdown(!showProjectDropdown)}
                    className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition-colors hover:bg-white/10"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ backgroundColor: selectedProject.color }}>
                      <Briefcase size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-text">{selectedProject.name}</p>
                      <p className="text-xs text-muted">{selectedProject.client}</p>
                    </div>
                    <ChevronDown size={18} className="text-muted" />
                  </button>
                  <AnimatePresence>
                    {showProjectDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 mt-2 w-full rounded-xl border border-white/10 bg-card shadow-xl"
                      >
                        {PRESET_PROJECTS.map((project) => (
                          <button
                            key={project.id}
                            onClick={() => {
                              setSelectedProject(project);
                              setShowProjectDropdown(false);
                            }}
                            className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/5"
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg text-white" style={{ backgroundColor: project.color }}>
                              <Briefcase size={14} />
                            </div>
                            <div>
                              <p className="font-medium text-text">{project.name}</p>
                              <p className="text-xs text-muted">{project.client}</p>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Task Name */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-muted">Naloga</label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="Kaj delate trenutno?"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-text placeholder:text-muted/50 focus:border-primary focus:outline-none"
                />
              </div>

              {/* Timer Display */}
              <div className="flex flex-col items-center py-8">
                <div className="relative">
                  <div className="flex h-52 w-52 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20">
                    <div className="flex h-44 w-44 items-center justify-center rounded-full bg-card">
                      <span className="font-mono text-5xl font-bold tracking-tight text-text">
                        {formatTime(currentTime)}
                      </span>
                    </div>
                  </div>
                  {/* Pulse animation when running */}
                  {isRunning && (
                    <div className="absolute inset-0 rounded-full border-4 border-primary animate-pulse" />
                  )}
                </div>

                {/* Controls */}
                <div className="mt-8 flex items-center gap-4">
                  {!isRunning ? (
                    <>
                      <button
                        onClick={startTimer}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-white shadow-lg shadow-secondary/30 transition-transform hover:scale-105"
                      >
                        <Play size={28} className="ml-1" />
                      </button>
                      {currentTime > 0 && (
                        <button
                          onClick={resetTimer}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-muted transition-colors hover:bg-white/20 hover:text-text"
                        >
                          <RotateCcw size={20} />
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <button
                        onClick={pauseTimer}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-warning text-white shadow-lg shadow-warning/30 transition-transform hover:scale-105"
                      >
                        <Pause size={28} />
                      </button>
                      <button
                        onClick={stopTimer}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-danger text-white shadow-lg shadow-danger/30 transition-transform hover:scale-105"
                      >
                        <Square size={24} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Quick Break Buttons */}
              <div className="mt-6 border-t border-white/5 pt-6">
                <p className="mb-3 text-sm font-medium text-muted">Hitra pavza</p>
                <div className="flex flex-wrap gap-2">
                  {BREAK_TYPES.map((breakType) => {
                    const Icon = breakType.icon;
                    return (
                      <button
                        key={breakType.id}
                        onClick={() => activeBreak ? stopBreak() : startBreak(breakType)}
                        className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                          activeBreak === breakType.id
                            ? "bg-warning text-white"
                            : "bg-white/5 text-muted hover:bg-white/10 hover:text-text"
                        }`}
                      >
                        <Icon size={16} />
                        {breakType.label} ({breakType.duration}m)
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Today's Summary */}
            <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-text">
                <Calendar size={16} className="text-primary" />
                Današnji pregled
              </h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Skupaj danes</span>
                  <span className="font-mono text-lg font-bold text-text">{formatDuration(todayTotal + (currentTime / 3600))}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Projekti</span>
                  <span className="font-mono font-semibold text-text">{getTodayEntries().length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Prirejeno</span>
                  <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-xs font-semibold text-secondary">
                    {Math.round(((todayTotal + currentTime / 3600) / 8) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Weekly Stats */}
            <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-text">
                <TrendingUp size={16} className="text-secondary" />
                Ta teden
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-muted">Skupaj</p>
                  <p className="mt-1 font-mono text-lg font-bold text-text">{formatDuration(weeklyStats.total)}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-muted">Zaračunljivo</p>
                  <p className="mt-1 font-mono text-lg font-bold text-secondary">{formatDuration(weeklyStats.billable)}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-muted">Povprečje/dan</p>
                  <p className="mt-1 font-mono text-lg font-bold text-text">{formatDuration(weeklyStats.avgPerDay)}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-muted">Učinkovitost</p>
                  <p className="mt-1 font-mono text-lg font-bold text-primary">{weeklyStats.efficiency}%</p>
                </div>
              </div>
            </div>

            {/* Recent Entries */}
            <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-text">
                <Clock size={16} className="text-muted" />
                Zadnji vnosi
              </h3>
              <div className="mt-3 space-y-2">
                {getTodayEntries().slice(0, 3).map((entry) => {
                  const project = PRESET_PROJECTS.find(p => p.id === entry.project);
                  return (
                    <div key={entry.id} className="flex items-center gap-3 rounded-lg bg-white/5 p-2.5">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: project?.color }} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-text">{entry.task}</p>
                        <p className="text-[10px] text-muted">{entry.start} - {entry.end}</p>
                      </div>
                      <span className="font-mono text-xs font-semibold text-muted">{formatDuration(entry.duration)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Entries Tab */}
      {activeTab === "entries" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-muted" />
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-text focus:border-primary focus:outline-none"
              />
            </div>
            <select className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-text focus:border-primary focus:outline-none">
              <option>Vsi projekti</option>
              {PRESET_PROJECTS.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-muted">Skupaj: <span className="font-mono font-semibold text-text">{formatDuration(getWeekEntries().reduce((sum, e) => sum + e.duration, 0))}</span></span>
            </div>
          </div>

          {/* Entries List */}
          <div className="rounded-2xl border border-white/5 bg-card shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5 text-left">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted">Datum</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted">Projekt</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted">Naloga</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted">Čas</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted">Trajanje</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted">Zaračunljivo</th>
                  </tr>
                </thead>
                <tbody>
                  {getWeekEntries().map((entry) => {
                    const project = PRESET_PROJECTS.find(p => p.id === entry.project);
                    return (
                      <tr key={entry.id} className="border-b border-white/5 transition-colors hover:bg-white/5">
                        <td className="px-4 py-3 text-sm text-muted">{entry.date}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: project?.color }} />
                            <span className="text-sm font-medium text-text">{project?.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-text">{entry.task}</p>
                            <p className="text-xs text-muted">{entry.description}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono text-sm text-muted">{entry.start} - {entry.end}</td>
                        <td className="px-4 py-3 font-mono text-sm font-semibold text-text">{formatDuration(entry.duration)}</td>
                        <td className="px-4 py-3">
                          {entry.billable ? (
                            <span className="flex items-center gap-1 text-xs font-medium text-secondary">
                              <DollarSign size={14} />
                              Da
                            </span>
                          ) : (
                            <span className="text-xs text-muted">Ne</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === "reports" && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">Ta mesec</p>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Clock size={20} />
                </div>
              </div>
              <p className="mt-3 font-mono text-2xl font-bold text-text">186h 45m</p>
              <p className="mt-1 text-xs text-secondary">+12% od lani</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">Zaračunljive ure</p>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                  <DollarSign size={20} />
                </div>
              </div>
              <p className="mt-3 font-mono text-2xl font-bold text-text">162h</p>
              <p className="mt-1 text-xs text-muted">87% vsega časa</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">Prihodek/uro</p>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/15 text-warning">
                  <TrendingUp size={20} />
                </div>
              </div>
              <p className="mt-3 font-mono text-2xl font-bold text-text">€68.50</p>
              <p className="mt-1 text-xs text-secondary">+5€ ta mesec</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">Projekti letos</p>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-danger/15 text-danger">
                  <Briefcase size={20} />
                </div>
              </div>
              <p className="mt-3 font-mono text-2xl font-bold text-text">8</p>
              <p className="mt-1 text-xs text-muted">3 v teku</p>
            </div>
          </div>

          {/* Project Breakdown */}
          <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
            <h3 className="text-lg font-bold text-text">Porazdelitev po projektih</h3>
            <div className="mt-4 space-y-4">
              {PRESET_PROJECTS.slice(0, 5).map((project, idx) => {
                const projectEntries = getWeekEntries().filter(e => e.project === project.id);
                const totalHours = projectEntries.reduce((sum, e) => sum + e.duration, 0);
                const percentage = Math.round((totalHours / weeklyStats.total) * 100);
                
                return (
                  <div key={project.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: project.color }} />
                        <span className="font-medium text-text">{project.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm text-muted">{formatDuration(totalHours)}</span>
                        <span className="w-12 text-right font-mono text-sm font-semibold text-text">{percentage}%</span>
                      </div>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%`, backgroundColor: project.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Chart Placeholder */}
          <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
            <h3 className="text-lg font-bold text-text">Tedenski pregled</h3>
            <div className="mt-4 flex items-end justify-between gap-2" style={{ height: "200px" }}>
              {["Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned"].map((day, idx) => {
                const heights = [75, 60, 85, 90, 70, 20, 15];
                return (
                  <div key={day} className="flex flex-1 flex-col items-center gap-2">
                    <div className="w-full rounded-t-lg bg-gradient-to-t from-primary to-secondary transition-all" style={{ height: `${heights[idx]}%` }} />
                    <span className="text-xs text-muted">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Add Entry Modal */}
      <AnimatePresence>
        {showNewEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowNewEntry(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-card p-6 shadow-2xl"
            >
              <h2 className="text-xl font-bold text-text">Nov vnos</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-muted">Projekt</label>
                  <select className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-text focus:border-primary focus:outline-none">
                    {PRESET_PROJECTS.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-muted">Naloga</label>
                  <input type="text" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-text focus:border-primary focus:outline-none" placeholder="Ime naloge" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm text-muted">Začetek</label>
                    <input type="time" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-text focus:border-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-muted">Konec</label>
                    <input type="time" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-text focus:border-primary focus:outline-none" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="billable" className="h-4 w-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary" />
                  <label htmlFor="billable" className="text-sm text-muted">Zaračunljivo</label>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <button onClick={() => setShowNewEntry(false)} className="flex-1 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium text-text hover:bg-white/10">
                  Prekliči
                </button>
                <button className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90">
                  Shrani
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}