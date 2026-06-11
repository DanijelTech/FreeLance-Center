/**
 * Gantt Chart Component
 * Projektni timeline z Gantt diagrammom
 */

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar } from 'lucide-react';

export default function GanttChart() {
  const [viewRange, setViewRange] = useState({
    start: new Date(2024, 0, 1),
    end: new Date(2024, 0, 31),
  });

  const projects = [
    {
      id: 1,
      name: 'Website Redesign',
      start: new Date(2024, 0, 5),
      end: new Date(2024, 0, 20),
      progress: 65,
      color: '#8b5cf6',
      tasks: [
        { name: 'Raziskava', start: 0, duration: 3, progress: 100 },
        { name: 'Wireframes', start: 3, duration: 4, progress: 100 },
        { name: 'Design', start: 7, duration: 5, progress: 80 },
        { name: 'Razvoj', start: 12, duration: 6, progress: 40 },
        { name: 'Testiranje', start: 18, duration: 2, progress: 0 },
      ],
    },
    {
      id: 2,
      name: 'Mobile App',
      start: new Date(2024, 0, 10),
      end: new Date(2024, 0, 28),
      progress: 30,
      color: '#06b6d4',
      tasks: [
        { name: 'Specifikacija', start: 2, duration: 2, progress: 100 },
        { name: 'Prototip', start: 4, duration: 3, progress: 60 },
        { name: 'Razvoj iOS', start: 7, duration: 8, progress: 10 },
        { name: 'Razvoj Android', start: 7, duration: 8, progress: 5 },
      ],
    },
    {
      id: 3,
      name: 'Marketing Campaign',
      start: new Date(2024, 0, 15),
      end: new Date(2024, 0, 25),
      progress: 45,
      color: '#f59e0b',
      tasks: [
        { name: 'Strategija', start: 0, duration: 2, progress: 100 },
        { name: 'Vsebina', start: 2, duration: 4, progress: 70 },
        { name: 'Launch', start: 6, duration: 1, progress: 0 },
      ],
    },
  ];

  const days = [];
  const current = new Date(viewRange.start);
  while (current <= viewRange.end) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  const navigate = (direction) => {
    const newStart = new Date(viewRange.start);
    const newEnd = new Date(viewRange.end);
    const diff = 7 * (direction === 'next' ? 1 : -1);
    newStart.setDate(newStart.getDate() + diff);
    newEnd.setDate(newEnd.getDate() + diff);
    setViewRange({ start: newStart, end: newEnd });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('sl-SI', { day: 'numeric', month: 'short' });
  };

  const getDayWidth = () => {
    return 40;
  };

  return (
    <div className="bg-card rounded-2xl border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Calendar className="text-primary" size={20} />
          <h3 className="font-medium">Gantt Diagram</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('prev')}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm text-muted min-w-[180px] text-center">
            {formatDate(viewRange.start)} - {formatDate(viewRange.end)}
          </span>
          <button
            onClick={() => navigate('next')}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Timeline Header */}
          <div className="flex border-b border-white/5 sticky top-0 bg-card z-10">
            <div className="w-48 shrink-0 p-3 border-r border-white/5">
              <span className="text-xs font-medium text-muted">Projekt / Naloga</span>
            </div>
            <div className="flex">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`shrink-0 text-center py-2 border-r border-white/5 ${
                    day.getDay() === 0 || day.getDay() === 6 ? 'bg-white/[0.02]' : ''
                  }`}
                  style={{ width: getDayWidth() }}
                >
                  <span className="text-[10px] text-muted">{day.toLocaleDateString('sl-SI', { weekday: 'short' })}</span>
                  <span className="block text-xs">{day.getDate()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Rows */}
          {projects.map((project) => (
            <div key={project.id}>
              {/* Project Header */}
              <div className="flex border-b border-white/5 hover:bg-white/5 transition-colors">
                <div className="w-48 shrink-0 p-3 border-r border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: project.color }} />
                    <span className="font-medium text-sm truncate">{project.name}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${project.progress}%`, backgroundColor: project.color }}
                      />
                    </div>
                    <span className="text-xs text-muted">{project.progress}%</span>
                  </div>
                </div>
                <div className="flex relative">
                  {days.map((day, index) => (
                    <div
                      key={index}
                      className={`shrink-0 border-r border-white/5 ${
                        day.getDay() === 0 || day.getDay() === 6 ? 'bg-white/[0.02]' : ''
                      }`}
                      style={{ width: getDayWidth() }}
                    />
                  ))}
                </div>
              </div>

              {/* Tasks */}
              {project.tasks.map((task, taskIndex) => {
                const taskStartOffset = (task.start / days.length) * 100;
                const taskWidth = (task.duration / days.length) * 100;
                
                return (
                  <div key={taskIndex} className="flex border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <div className="w-48 shrink-0 p-3 pl-6 border-r border-white/5">
                      <span className="text-xs text-muted">{task.name}</span>
                    </div>
                    <div className="flex-1 relative">
                      <div
                        className="absolute top-1/2 -translate-y-1/2 h-6 rounded-md transition-all hover:shadow-lg cursor-pointer"
                        style={{
                          left: `${taskStartOffset}%`,
                          width: `calc(${taskWidth}% - 4px)`,
                          marginLeft: '2px',
                          backgroundColor: `${project.color}40`,
                          borderLeft: `3px solid ${project.color}`,
                        }}
                      >
                        <div
                          className="h-full rounded-md"
                          style={{
                            width: `${task.progress}%`,
                            backgroundColor: project.color,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 p-4 border-t border-white/5">
        <span className="text-xs text-muted">Legenda:</span>
        <div className="flex items-center gap-2">
          <div className="h-3 w-6 bg-white/10 rounded" />
          <span className="text-xs text-muted">Načrtovano</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-6 bg-primary rounded" />
          <span className="text-xs text-muted">Opravljeno</span>
        </div>
        <button className="flex items-center gap-1 text-xs text-primary hover:underline ml-auto">
          <Plus size={12} />
          Dodaj projekt
        </button>
      </div>
    </div>
  );
}