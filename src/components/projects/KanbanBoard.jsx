/**
 * Kanban Board Component
 * Trello-style projekt management
 */

import { useState } from 'react';
import { 
  Plus, MoreHorizontal, GripVertical, 
  Calendar, AlertCircle, CheckCircle
} from 'lucide-react';

const initialColumns = {
  todo: {
    id: 'todo',
    title: 'Načrtovanje',
    color: 'bg-muted',
    tasks: [
      { id: '1', title: 'Raziskava trga', priority: 'high', due: '2024-01-15', assignee: 'A' },
      { id: '2', title: 'Wireframes za mobilno aplikacijo', priority: 'medium', due: '2024-01-18', assignee: 'M' },
    ],
  },
  inProgress: {
    id: 'inProgress',
    title: 'V delu',
    color: 'bg-primary',
    tasks: [
      { id: '3', title: 'Design sistema', priority: 'high', due: '2024-01-12', assignee: 'M' },
      { id: '4', title: 'API integracija', priority: 'medium', due: '2024-01-14', assignee: 'P' },
    ],
  },
  review: {
    id: 'review',
    title: 'Pregled',
    color: 'bg-warning',
    tasks: [
      { id: '5', title: 'Homepage redesign', priority: 'low', due: '2024-01-10', assignee: 'A' },
    ],
  },
  done: {
    id: 'done',
    title: 'Končano',
    color: 'bg-success',
    tasks: [
      { id: '6', title: 'Logo design', priority: 'medium', due: '2024-01-05', assignee: 'M' },
    ],
  },
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialColumns);
  const [showAddTask, setShowAddTask] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const handleDragStart = (e, columnId, taskIndex) => {
    setDraggedTask({ columnId, taskIndex });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    if (!draggedTask || draggedTask.columnId === targetColumnId) {
      setDraggedTask(null);
      setDragOverColumn(null);
      return;
    }

    const newColumns = { ...columns };
    const sourceColumn = newColumns[draggedTask.columnId];
    const targetColumn = newColumns[targetColumnId];
    
    const [movedTask] = sourceColumn.tasks.splice(draggedTask.taskIndex, 1);
    targetColumn.tasks.push(movedTask);

    setColumns(newColumns);
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const priorityColors = {
    high: 'bg-danger/15 text-danger',
    medium: 'bg-warning/15 text-warning',
    low: 'bg-muted/15 text-muted',
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {Object.values(columns).map(column => (
        <div
          key={column.id}
          className={`flex-shrink-0 w-80 bg-white/5 rounded-2xl p-4 transition-colors ${
            dragOverColumn === column.id ? 'bg-primary/10 ring-2 ring-primary/50' : ''
          }`}
          onDragOver={(e) => handleDragOver(e, column.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          {/* Column Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${column.color}`} />
              <h3 className="font-medium">{column.title}</h3>
              <span className="text-xs text-muted bg-white/5 px-2 py-0.5 rounded-full">
                {column.tasks.length}
              </span>
            </div>
            <button
              onClick={() => setShowAddTask(column.id)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Tasks */}
          <div className="space-y-3 min-h-[200px]">
            {column.tasks.map((task, index) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, column.id, index)}
                onDragEnd={handleDragEnd}
                className={`bg-card rounded-xl p-4 border border-white/5 cursor-grab active:cursor-grabbing transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                  draggedTask?.columnId === column.id && draggedTask?.taskIndex === index
                    ? 'opacity-50 rotate-2'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{task.title}</h4>
                  <button className="text-muted hover:text-text">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${priorityColors[task.priority]}`}>
                    {task.priority === 'high' ? 'Nujno' : task.priority === 'medium' ? 'Srednje' : 'Nizko'}
                  </span>
                  {task.due && (
                    <span className="flex items-center gap-1 text-xs text-muted">
                      <Calendar size={12} />
                      {new Date(task.due).toLocaleDateString('sl-SI')}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-white">
                    {task.assignee}
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle size={14} className="text-success" />
                    <span className="text-xs text-muted">#{task.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Add Column Button */}
      <button className="flex-shrink-0 w-80 h-32 flex items-center justify-center rounded-2xl border-2 border-dashed border-white/10 text-muted hover:border-primary/50 hover:text-primary transition-colors">
        <Plus size={20} className="mr-2" />
        Dodaj stolpec
      </button>

      {/* Add Task Modal */}
      {showAddTask && (
        <AddTaskModal 
          columnId={showAddTask} 
          onClose={() => setShowAddTask(null)}
          onAdd={(task) => {
            setColumns(prev => ({
              ...prev,
              [showAddTask]: {
                ...prev[showAddTask],
                tasks: [...prev[showAddTask].tasks, { ...task, id: Date.now().toString() }],
              },
            }));
            setShowAddTask(null);
          }}
        />
      )}
    </div>
  );
}

function AddTaskModal({ columnId, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, priority, due: dueDate, assignee: 'T' });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-card rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-medium mb-4">Dodaj nalogo</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Naslov</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Naslov naloge..."
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Prioriteta</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full bg-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="low">Nizka</option>
              <option value="medium">Srednja</option>
              <option value="high">Visoka</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Rok</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-muted hover:text-text transition-colors"
            >
              Prekliči
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors"
            >
              Dodaj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}