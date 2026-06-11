/**
 * Workflow Automation Component
 * Zapier-style avtomatizacija workflow-ov
 */

import { useState } from 'react';
import { 
  Zap, Plus, Play, Pause, Trash2, Copy, 
  Settings, ChevronRight, ArrowRight, Clock,
  GitBranch, Filter, Mail, Bell, Database
} from 'lucide-react';

const workflowTemplates = [
  {
    id: 1,
    name: 'Nov lead → Obvestilo + CRM',
    description: 'Ko pride nov lead, pošlji obvestilo in dodaj v CRM',
    trigger: { type: 'form', name: 'Kontakt obrazec' },
    actions: [
      { type: 'notification', name: 'Email obvestilo' },
      { type: 'crm', name: 'Ustvari lead v CRM' },
    ],
    active: true,
    runs: 156,
  },
  {
    id: 2,
    name: 'Plačilo → Izdaj fakturo',
    description: 'Ob prejemu plačila avtomatsko izdaj fakturo',
    trigger: { type: 'payment', name: 'Stripe plačilo' },
    actions: [
      { type: 'invoice', name: 'Generiraj PDF fakturo' },
      { type: 'email', name: 'Pošlji stranki' },
    ],
    active: true,
    runs: 89,
  },
  {
    id: 3,
    name: 'Projekt končan → Poročilo',
    description: 'Ko se projekt zaključi, ustvari poročilo za stranko',
    trigger: { type: 'project', name: 'Projekt status = Končano' },
    actions: [
      { type: 'report', name: 'Generiraj poročilo' },
      { type: 'email', name: 'Pošlji stranki' },
    ],
    active: false,
    runs: 34,
  },
];

const triggerTypes = [
  { id: 'form', name: 'Kontakt obrazec', icon: '📝', description: 'Ko nekdo izpolni obrazec' },
  { id: 'payment', name: 'Plačilo', icon: '💳', description: 'Ob prejemu plačila' },
  { id: 'project', name: 'Projekt', icon: '📁', description: 'Sprememba statusa projekta' },
  { id: 'schedule', name: 'Časovnik', icon: '⏰', description: 'Na določen čas' },
  { id: 'email', name: 'Email', icon: '📧', description: 'Ob prejemu emaila' },
  { id: 'webhook', name: 'Webhook', icon: '🪝', description: 'Zunanji dogodek' },
];

const actionTypes = [
  { id: 'notification', name: 'Pošlji obvestilo', icon: Bell },
  { id: 'email', name: 'Pošlji email', icon: Mail },
  { id: 'crm', name: 'Posodobi CRM', icon: Database },
  { id: 'invoice', name: 'Ustvari fakturo', icon: '📄' },
  { id: 'delay', name: 'Počakaj', icon: Clock },
  { id: 'filter', name: 'Filter', icon: Filter },
];

export default function WorkflowAutomation() {
  const [workflows, setWorkflows] = useState(workflowTemplates);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [showBuilder, setShowBuilder] = useState(false);

  const toggleWorkflow = (id) => {
    setWorkflows(workflows.map(w => 
      w.id === id ? { ...w, active: !w.active } : w
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/15">
            <Zap className="text-warning" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Workflow Avtomatizacija</h1>
            <p className="text-sm text-muted">Avtomatiziraj rutinske naloge z Zapier-style workflow-i</p>
          </div>
        </div>
        <button
          onClick={() => setShowBuilder(true)}
          className="flex items-center gap-2 rounded-xl bg-warning px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-warning/90"
        >
          <Plus size={16} />
          Nov Workflow
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Aktivni workflow-i" value={workflows.filter(w => w.active).length} />
        <StatCard label="Skupni zagoni" value={workflows.reduce((acc, w) => acc + w.runs, 0)} />
        <StatCard label="Prihranjen čas" value="24h" />
        <StatCard label="Avtomatizirane naloge" value={workflows.length * 12} />
      </div>

      {/* Workflow List */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Workflow-i</h3>
        {workflows.map(workflow => (
          <div
            key={workflow.id}
            className={`bg-card rounded-2xl border transition-colors ${
              workflow.active ? 'border-white/5' : 'border-white/5 opacity-60'
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                    workflow.active ? 'bg-warning/15 text-warning' : 'bg-white/5 text-muted'
                  }`}>
                    <Zap size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{workflow.name}</h4>
                    <p className="text-sm text-muted mb-3">{workflow.description}</p>
                    
                    {/* Flow Visualization */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1 text-xs bg-primary/15 text-primary px-2 py-1 rounded">
                        <GitBranch size={12} />
                        {workflow.trigger.name}
                      </span>
                      <ArrowRight size={14} className="text-muted" />
                      {workflow.actions.map((action, i) => (
                        <span key={i} className="flex items-center gap-1 text-xs bg-white/5 text-muted px-2 py-1 rounded">
                          {action.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted">{workflow.runs} zagonov</span>
                  <button
                    onClick={() => toggleWorkflow(workflow.id)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      workflow.active ? 'bg-warning' : 'bg-white/10'
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                        workflow.active ? 'left-6' : 'left-1'
                      }`}
                    />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text transition-colors">
                    <Settings size={16} />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-danger transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Workflow Builder Modal */}
      {showBuilder && (
        <WorkflowBuilder onClose={() => setShowBuilder(false)} />
      )}
    </div>
  );
}

function WorkflowBuilder({ onClose }) {
  const [step, setStep] = useState(1);
  const [selectedTrigger, setSelectedTrigger] = useState(null);
  const [actions, setActions] = useState([]);

  const addAction = (actionType) => {
    setActions([...actions, { id: Date.now(), type: actionType, config: {} }]);
  };

  const removeAction = (id) => {
    setActions(actions.filter(a => a.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-card rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-xl font-bold">Ustvari Workflow</h2>
          <button onClick={onClose} className="text-muted hover:text-text">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Steps */}
          <div className="flex items-center gap-4 mb-8">
            <StepBadge number={1} label="Trigger" active={step >= 1} />
            <div className={`h-0.5 w-12 ${step >= 2 ? 'bg-warning' : 'bg-white/10'}`} />
            <StepBadge number={2} label="Akcije" active={step >= 2} />
            <div className={`h-0.5 w-12 ${step >= 3 ? 'bg-warning' : 'bg-white/10'}`} />
            <StepBadge number={3} label="Poimenuj" active={step >= 3} />
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-medium mb-4">Izberi trigger ( sprožilec )</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {triggerTypes.map(trigger => (
                  <button
                    key={trigger.id}
                    onClick={() => setSelectedTrigger(trigger)}
                    className={`p-4 rounded-xl border text-left transition-colors ${
                      selectedTrigger?.id === trigger.id
                        ? 'border-warning bg-warning/10'
                        : 'border-white/5 hover:border-white/20'
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{trigger.icon}</span>
                    <h4 className="font-medium text-sm">{trigger.name}</h4>
                    <p className="text-xs text-muted mt-1">{trigger.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                <div className="flex items-center gap-2">
                  <GitBranch className="text-primary" size={16} />
                  <span className="text-sm">Ko se zgodi: <strong>{selectedTrigger?.name}</strong></span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Dodaj akcije</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {actionTypes.map(action => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.id}
                        onClick={() => addAction(action)}
                        className="p-4 rounded-xl border border-white/5 hover:border-white/20 text-left transition-colors"
                      >
                        <div className="h-8 w-8 rounded-lg bg-warning/15 flex items-center justify-center mb-2">
                          {typeof action.icon === 'string' ? (
                            <span className="text-lg">{action.icon}</span>
                          ) : (
                            <Icon className="text-warning" size={16} />
                          )}
                        </div>
                        <h4 className="font-medium text-sm">{action.name}</h4>
                      </button>
                    );
                  })}
                </div>
              </div>

              {actions.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-medium">Dodane akcije:</h3>
                  {actions.map((action, index) => {
                    const ActionIcon = actionTypes.find(a => a.id === action.type)?.icon;
                    return (
                      <div key={action.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                        <span className="text-sm text-muted">{index + 1}.</span>
                        <div className="h-6 w-6 rounded bg-warning/15 flex items-center justify-center">
                          {typeof ActionIcon === 'string' ? (
                            <span>{ActionIcon}</span>
                          ) : (
                            <ActionIcon className="text-warning" size={14} />
                          )}
                        </div>
                        <span className="flex-1 text-sm">{actionTypes.find(a => a.id === action.type)?.name}</span>
                        <button
                          onClick={() => removeAction(action.id)}
                          className="text-muted hover:text-danger"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Ime workflow-a</label>
                  <input
                    type="text"
                    placeholder="npr.: Nov lead → Email obvestilo"
                    className="w-full bg-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-warning/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Opis (opcionalno)</label>
                  <textarea
                    placeholder="Kratek opis kaj ta workflow počne..."
                    className="w-full bg-white/5 rounded-xl px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-warning/50 h-24"
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="p-4 bg-white/5 rounded-xl">
                <h4 className="text-sm font-medium mb-3">Predogled:</h4>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1 text-xs bg-primary/15 text-primary px-2 py-1 rounded">
                    <GitBranch size={12} />
                    {selectedTrigger?.name}
                  </span>
                  <ArrowRight size={14} className="text-muted" />
                  {actions.map((action, i) => (
                    <span key={i} className="flex items-center gap-1 text-xs bg-warning/15 text-warning px-2 py-1 rounded">
                      {actionTypes.find(a => a.id === action.type)?.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-white/5">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-4 py-2 text-sm text-muted hover:text-text disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Nazaj
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-muted hover:text-text"
            >
              Prekliči
            </button>
            <button
              onClick={() => {
                if (step < 3) setStep(step + 1);
                else onClose();
              }}
              disabled={step === 2 && actions.length === 0}
              className="px-6 py-2 bg-warning text-white text-sm font-medium rounded-xl hover:bg-warning/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 3 ? 'Ustvari Workflow' : 'Naprej'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-card rounded-2xl border border-white/5 p-4">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

function StepBadge({ number, label, active }) {
  return (
    <div className={`flex items-center gap-2 ${active ? 'text-warning' : 'text-muted'}`}>
      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
        active ? 'bg-warning text-white' : 'bg-white/5'
      }`}>
        {number}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}