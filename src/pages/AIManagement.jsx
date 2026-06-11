/**
 * AI Management Page
 * Centralna stran za AI funkcionalnosti
 */

import { useState } from 'react';
import { 
  Bot, Sparkles, Network, Settings, Brain, 
  Activity, MessageSquare, FileText, Plug
} from 'lucide-react';
import AIAssistant from '../components/ai/AIAssistant';
import PromptManager from '../components/ai/PromptManager';
import ProfileAgents from './ai/ProfileAgents';
import { AI_CONFIG, AGENT_TYPES } from '../services/ai/aiConfig';
import aiService from '../services/ai/aiService';

export default function AIManagement() {
  const [activeSection, setActiveSection] = useState('overview');
  const [connectionStatus, setConnectionStatus] = useState(null);

  const checkLMStudioConnection = async () => {
    setConnectionStatus({ checking: true });
    const result = await aiService.checkConnection();
    setConnectionStatus(result);
  };

  const sections = [
    { id: 'overview', label: 'Pregled', icon: Brain },
    { id: 'chat', label: 'AI Klepet', icon: MessageSquare },
    { id: 'profiles', label: 'Profili & Agenti', icon: Network },
    { id: 'prompts', label: 'Prompt Manager', icon: FileText },
    { id: 'integrations', label: 'Integracije', icon: Plug },
    { id: 'settings', label: 'Nastavitve', icon: Settings },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
            <Sparkles className="text-primary" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Upravljanje</h1>
            <p className="text-sm text-muted">Nadzoruj AI agente in LLM modele</p>
          </div>
        </div>
        
        {/* Connection Status */}
        <button
          onClick={checkLMStudioConnection}
          className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm transition-colors hover:bg-white/10"
        >
          <Activity size={16} className={connectionStatus?.checking ? 'animate-pulse' : ''} />
          {connectionStatus?.checking ? 'Preverjam...' : 
           connectionStatus?.connected ? 'LM Studio: Povezan' : 
           'Preveri povezavo'}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {sections.map(section => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                activeSection === section.id
                  ? 'bg-primary text-white'
                  : 'bg-white/5 text-muted hover:bg-white/10 hover:text-text'
              }`}
            >
              <Icon size={16} />
              {section.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {activeSection === 'overview' && (
        <OverviewSection 
          connectionStatus={connectionStatus} 
          onCheckConnection={checkLMStudioConnection}
        />
      )}
      
      {activeSection === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-sm font-medium text-muted">Izberi agenta</h3>
            {Object.entries(AGENT_TYPES).map(([key, value]) => (
              <button
                key={value}
                className="w-full flex items-center gap-3 rounded-xl bg-white/5 p-3 text-left hover:bg-white/10 transition-colors"
              >
                <Bot size={20} className="text-primary" />
                <span className="text-sm">{key.charAt(0) + key.slice(1).toLowerCase()} Agent</span>
              </button>
            ))}
          </div>
          <div className="lg:col-span-3">
            <div className="bg-card rounded-2xl border border-white/5 h-[600px]">
              <AIAssistant />
            </div>
          </div>
        </div>
      )}
      
      {activeSection === 'profiles' && <ProfileAgents />}
      
      {activeSection === 'prompts' && <PromptManager />}
      
      {activeSection === 'integrations' && (
        <IntegrationsSection />
      )}
      
      {activeSection === 'settings' && (
        <SettingsSection />
      )}
    </div>
  );
}

// Overview Section
function OverviewSection({ connectionStatus, onCheckConnection }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Connection Card */}
      <div className="lg:col-span-2 bg-card rounded-2xl border border-white/5 p-6">
        <h3 className="text-lg font-medium mb-4">LM Studio Povezava</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${
                connectionStatus?.connected ? 'bg-success' : 'bg-danger'
              }`} />
              <span className="font-medium">
                {connectionStatus?.connected ? 'Povezano' : 'Nepovezano'}
              </span>
            </div>
            <button
              onClick={onCheckConnection}
              className="text-sm text-primary hover:underline"
            >
              Preveri
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl">
              <p className="text-sm text-muted mb-1">URL</p>
              <p className="font-mono text-sm">{AI_CONFIG.lmStudio.baseUrl}</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <p className="text-sm text-muted mb-1">Model</p>
              <p className="font-mono text-sm">{AI_CONFIG.lmStudio.model}</p>
            </div>
          </div>
          
          {connectionStatus?.models && (
            <div className="p-4 bg-white/5 rounded-xl">
              <p className="text-sm text-muted mb-2">Naloženi modeli:</p>
              <div className="flex flex-wrap gap-2">
                {connectionStatus.models.map((model, i) => (
                  <span key={i} className="text-xs bg-primary/15 text-primary px-2 py-1 rounded">
                    {model.id || model}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="space-y-4">
        <div className="bg-card rounded-2xl border border-white/5 p-6">
          <h4 className="text-sm font-medium text-muted mb-4">Aktivni agenti</h4>
          <div className="space-y-3">
            {Object.keys(AGENT_TYPES).slice(0, 4).map(type => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-sm">{type}</span>
                <div className="flex h-2 w-2">
                  <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-card rounded-2xl border border-white/5 p-6">
          <h4 className="text-sm font-medium text-muted mb-4">Hitri ukazi</h4>
          <div className="space-y-2">
            <button className="w-full text-left text-sm p-2 rounded-lg hover:bg-white/5 transition-colors">
              🔍 Nadzoruj vse profile
            </button>
            <button className="w-full text-left text-sm p-2 rounded-lg hover:bg-white/5 transition-colors">
              📝 Ustvari novo vsebino
            </button>
            <button className="w-full text-left text-sm p-2 rounded-lg hover:bg-white/5 transition-colors">
              📊 Analiziraj engagement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Integrations Section
function IntegrationsSection() {
  const integrations = [
    { name: 'LM Studio', status: 'connected', icon: '🖥️', description: 'Lokalni LLM model' },
    { name: 'Hermes Agent', status: 'available', icon: '🤖', description: 'NousResearch agent' },
    { name: 'Slack', status: 'not_configured', icon: '💬', description: 'Team komunikacija' },
    { name: 'Stripe', status: 'not_configured', icon: '💳', description: 'Plačilni sistem' },
    { name: 'Google Calendar', status: 'not_configured', icon: '📅', description: 'Koledar sinhronizacija' },
    { name: 'GitHub', status: 'not_configured', icon: '🐙', description: 'Developer integracija' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {integrations.map(integration => (
        <div key={integration.name} className="bg-card rounded-2xl border border-white/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{integration.icon}</span>
            <StatusBadge status={integration.status} />
          </div>
          <h4 className="font-medium mb-1">{integration.name}</h4>
          <p className="text-sm text-muted mb-4">{integration.description}</p>
          <button
            className={`w-full rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              integration.status === 'connected'
                ? 'bg-success/15 text-success'
                : integration.status === 'available'
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-white/5 text-muted hover:bg-white/10'
            }`}
          >
            {integration.status === 'connected' ? 'Konfigurirano' :
             integration.status === 'available' ? 'Poveži' : 'Nastavi'}
          </button>
        </div>
      ))}
    </div>
  );
}

// Settings Section
function SettingsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-card rounded-2xl border border-white/5 p-6">
        <h3 className="text-lg font-medium mb-6">LM Studio Nastavitve</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">API URL</label>
            <input
              type="text"
              defaultValue={AI_CONFIG.lmStudio.baseUrl}
              className="w-full bg-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Model ID</label>
            <input
              type="text"
              defaultValue={AI_CONFIG.lmStudio.model}
              className="w-full bg-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Temperature</label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              defaultValue={AI_CONFIG.defaults.temperature}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Max Tokens</label>
            <input
              type="number"
              defaultValue={AI_CONFIG.defaults.maxTokens}
              className="w-full bg-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-white/5 p-6">
        <h3 className="text-lg font-medium mb-6">Hermes Agent Nastavitve</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Endpoint</label>
            <input
              type="text"
              defaultValue={AI_CONFIG.hermes.endpoint}
              className="w-full bg-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Avtomatsko posodabljanje</span>
            <Toggle />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Debug logging</span>
            <Toggle />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    connected: 'bg-success/15 text-success',
    available: 'bg-primary/15 text-primary',
    not_configured: 'bg-white/5 text-muted',
  };
  
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${styles[status]}`}>
      {status === 'connected' ? 'Povezano' :
       status === 'available' ? 'Na voljo' : 'Ni nastavljeno'}
    </span>
  );
}

function Toggle() {
  const [checked, setChecked] = useState(true);
  
  return (
    <button
      onClick={() => setChecked(!checked)}
      className={`relative h-6 w-11 rounded-full transition-colors ${
        checked ? 'bg-primary' : 'bg-white/10'
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
          checked ? 'left-6' : 'left-1'
        }`}
      />
    </button>
  );
}