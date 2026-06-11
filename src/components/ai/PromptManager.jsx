/**
 * Prompt Manager Component
 * Upravljanje sistemskih promp-ov za AI agente
 */

import { useState } from 'react';
import { 
  Code, Plus, Edit2, Trash2, Copy, Check, 
  ChevronDown, ChevronRight, Save, X, Play
} from 'lucide-react';
import { AGENT_PROMPTS, getAllAgents, getAgentConfig } from '../../services/ai/systemPrompts';
import { AGENT_TYPES } from '../../services/ai/aiConfig';
import aiService from '../../services/ai/aiService';

export default function PromptManager() {
  const [selectedAgent, setSelectedAgent] = useState(AGENT_TYPES.CONTENT);
  const [prompts, setPrompts] = useState(AGENT_PROMPTS);
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [testPrompt, setTestPrompt] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showNewPrompt, setShowNewPrompt] = useState(false);

  const agents = getAllAgents();
  const currentPrompt = prompts[selectedAgent];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSavePrompt = () => {
    if (editingPrompt) {
      setPrompts(prev => ({
        ...prev,
        [selectedAgent]: {
          ...prev[selectedAgent],
          systemPrompt: editingPrompt
        }
      }));
      setEditingPrompt(null);
    }
  };

  const handleTestPrompt = async () => {
    if (!testPrompt.trim()) return;
    
    setTestResult({ loading: true });
    
    const response = await aiService.chat(selectedAgent, testPrompt);
    
    setTestResult({
      loading: false,
      ...response
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
            <Code className="text-primary" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">System Prompt Manager</h2>
            <p className="text-sm text-muted">Upravljaj sistemske prompte za AI agente</p>
          </div>
        </div>
        <button
          onClick={() => setShowNewPrompt(true)}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          <Plus size={16} />
          Nov Prompt Template
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Agent Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          <h3 className="text-sm font-medium text-muted mb-3">AI Agenti</h3>
          {agents.map(agent => (
            <button
              key={agent.type}
              onClick={() => setSelectedAgent(agent.type)}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors ${
                selectedAgent === agent.type
                  ? 'bg-primary/15 text-primary'
                  : 'bg-white/5 text-muted hover:bg-white/10 hover:text-text'
              }`}
            >
              <BotIcon type={agent.type} />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{agent.name}</p>
                <p className="text-xs opacity-70 truncate">{agent.role}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Prompt Editor */}
        <div className="lg:col-span-3 space-y-4">
          {currentPrompt && (
            <>
              {/* Agent Info */}
              <div className="bg-card rounded-2xl border border-white/5 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <BotIcon type={selectedAgent} size={32} />
                    <div>
                      <h3 className="text-lg font-bold">{currentPrompt.name}</h3>
                      <p className="text-sm text-muted">{currentPrompt.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(currentPrompt.systemPrompt)}
                      className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-sm text-muted hover:bg-white/10 hover:text-text transition-colors"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? 'Kopirano!' : 'Kopiraj'}
                    </button>
                    <button
                      onClick={() => setEditingPrompt(currentPrompt.systemPrompt)}
                      className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-sm text-muted hover:bg-white/10 hover:text-text transition-colors"
                    >
                      <Edit2 size={14} />
                      Uredi
                    </button>
                  </div>
                </div>

                {/* Personality */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="text-xs text-muted">Osebnost:</span>
                  {Object.entries(currentPrompt.personality).map(([key, value]) => (
                    <span key={key} className="text-xs bg-white/5 px-2 py-1 rounded-lg">
                      {key}: {Math.round(value * 100)}%
                    </span>
                  ))}
                </div>
              </div>

              {/* System Prompt Display */}
              <div className="bg-card rounded-2xl border border-white/5 overflow-hidden">
                <button
                  onClick={() => toggleSection('prompt')}
                  className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium">System Prompt</span>
                  {expandedSections.prompt ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                
                {expandedSections.prompt !== false && (
                  <div className="border-t border-white/5">
                    {editingPrompt !== null ? (
                      <div className="p-4 space-y-4">
                        <textarea
                          value={editingPrompt}
                          onChange={(e) => setEditingPrompt(e.target.value)}
                          className="w-full h-64 bg-bg rounded-xl p-4 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="Vnesi sistemski prompt..."
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingPrompt(null)}
                            className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-muted hover:bg-white/10 transition-colors"
                          >
                            <X size={14} />
                            Prekliči
                          </button>
                          <button
                            onClick={handleSavePrompt}
                            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                          >
                            <Save size={14} />
                            Shrani
                          </button>
                        </div>
                      </div>
                    ) : (
                      <pre className="p-4 text-sm font-mono whitespace-pre-wrap bg-bg max-h-96 overflow-y-auto">
                        {currentPrompt.systemPrompt}
                      </pre>
                    )}
                  </div>
                )}
              </div>

              {/* Test Section */}
              <div className="bg-card rounded-2xl border border-white/5 overflow-hidden">
                <button
                  onClick={() => toggleSection('test')}
                  className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium">Test Prompt</span>
                  {expandedSections.test ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                
                {expandedSections.test !== false && (
                  <div className="border-t border-white/5 p-4 space-y-4">
                    <textarea
                      value={testPrompt}
                      onChange={(e) => setTestPrompt(e.target.value)}
                      className="w-full h-24 bg-bg rounded-xl p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Vnesi testno sporočilo za agenta..."
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted">
                        Testiraj ta prompt z LM Studio
                      </span>
                      <button
                        onClick={handleTestPrompt}
                        disabled={!testPrompt.trim() || testResult?.loading}
                        className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white hover:bg-secondary/90 disabled:opacity-50 transition-colors"
                      >
                        <Play size={14} />
                        {testResult?.loading ? 'Testiram...' : 'Testiraj'}
                      </button>
                    </div>
                    
                    {testResult && !testResult.loading && (
                      <div className={`rounded-xl p-4 ${testResult.success ? 'bg-secondary/10' : 'bg-danger/10'}`}>
                        <p className="text-sm font-medium mb-2">
                          {testResult.success ? 'Rezultat:' : 'Napaka:'}
                        </p>
                        <pre className="text-sm whitespace-pre-wrap">
                          {testResult.success ? testResult.content : testResult.error}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper component for bot icons
function BotIcon({ type, size = 20 }) {
  const colors = {
    [AGENT_TYPES.CONTENT]: 'text-pink-500',
    [AGENT_TYPES.SOCIAL]: 'text-blue-500',
    [AGENT_TYPES.CRM]: 'text-green-500',
    [AGENT_TYPES.FINANCE]: 'text-yellow-500',
    [AGENT_TYPES.PROJECTS]: 'text-purple-500',
    [AGENT_TYPES.COMMUNICATION]: 'text-cyan-500',
    [AGENT_TYPES.ANALYTICS]: 'text-orange-500',
    [AGENT_TYPES.SUPPORT]: 'text-red-500',
  };
  
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={colors[type] || 'text-primary'}>
      <path d="M12 2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="currentColor"/>
      <path d="M12 7v2m0 0a3 3 0 0 0 3 3h1a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1a4 4 0 0 1 4-4h1a3 3 0 0 0 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="9" cy="13" r="1" fill="currentColor"/>
      <circle cx="15" cy="13" r="1" fill="currentColor"/>
    </svg>
  );
}