import { Sparkles, Sun, Moon, ChevronDown, Menu } from "lucide-react";

export default function Header({ darkMode, onToggleDarkMode, onOpenMobileMenu }) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-white/5 bg-card/60 px-4 py-4 backdrop-blur sm:px-6">
      {/* Logotip + hamburger za mobilni meni */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-muted hover:bg-white/10 hover:text-text lg:hidden"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Sparkles size={20} />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Freelance<span className="text-primary">Hub</span>
          </span>
        </div>
      </div>

      {/* Desna stran: status, dark mode, avatar */}
      <div className="flex items-center gap-4">
        {/* Status indikator */}
        <div className="hidden items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-sm sm:flex">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary"></span>
          </span>
          <span className="text-text font-medium">Online</span>
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={onToggleDarkMode}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-muted transition-colors hover:bg-white/10 hover:text-text"
          title="Preklopi temo"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Avatar uporabnika */}
        <button className="flex items-center gap-2 rounded-xl bg-white/5 px-2 py-1.5 transition-colors hover:bg-white/10">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white">
            DC
          </div>
          <span className="hidden text-sm font-medium md:inline">Danijel C.</span>
          <ChevronDown size={16} className="hidden text-muted md:inline" />
        </button>
      </div>
    </header>
  );
}
