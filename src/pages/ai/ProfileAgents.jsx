/**
 * Profile Agents Management Page
 * Upravljanje posameznih profilov z AI agenti
 */

import { useState, useEffect } from 'react';
import { 
  Users, Plus, Bot, Settings, Activity, MessageSquare,
  TrendingUp, AlertCircle, CheckCircle, Clock, Trash2, Edit2, Eye
} from 'lucide-react';
import AIAssistant from '../../components/ai/AIAssistant';
import { profileManager, createProfileAgent } from '../../services/ai/profileAgents';
import { AGENT_TYPES } from '../../services/ai/aiConfig';

// Mock podatki za profile
const mockProfiles = [
  {
    id: '1',
    name: 'Poslovni profil',
    type: 'business',
    socialAccounts: ['Instagram', 'LinkedIn', 'Facebook'],
    targetAudience: 'Podjetja in podjetniki',
    brand: 'FreelanceHub Official',
    tone: 'Profesionalen',
    status: 'active',
  },
  {
    id: '2',
    name: 'Osebni profil',
    type: 'personal',
    socialAccounts: ['Instagram', 'TikTok', 'YouTube'],
    targetAudience: 'Digitalni nomadi in freelancerji',
    brand: 'Danijel Tech',
    tone: 'Prijazen',
    status: 'active',
  },
  {
    id: '3',
    name: 'Produktni profil',
    type: 'product',
    socialAccounts: ['Instagram', 'Facebook'],
    targetAudience: 'Startupi in tech podjetja',
    brand: 'SaaS Tools',
    tone: 'Informativen',
    status: 'paused',
  },
];

export default function ProfileAgents() {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('agents'); // agents, settings, monitor
  const [showNewProfile, setShowNewProfile] = useState(false);
  const [monitoringData, setMonitoringData] = useState(null);

  useEffect(() => {
    // Inicializiraj profile manager
    profileManager.initializeProfiles(profiles);
  }, []);

  const handleMonitorAll = async () => {
    setMonitoringData({ loading: true });
    
    // Simulacija monitoringa
    setTimeout(() => {
      setMonitoringData({
        loading: false,
        results: profiles.map(p => ({
          profileId: p.id,
          profileName: p.name,
          newMessages: Math.floor(Math.random() * 10),
          comments: Math.floor(Math.random() * 15),
          engagement: Math.floor(Math.random() * 100),
          alerts: Math.random() > 0.7 ? ['Potrebna pozornost'] : [],
          status: Math.random() > 0.3 ? 'healthy' : 'warning',
        })),
        timestamp: new Date().toISOString(),
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
            <Bot className="text-primary" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Profili & Agenti</h1>
            <p className="text-sm text-muted">Nadzoruj profile z ločenimi AI agenti</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleMonitorAll}
            className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-secondary/90"
          >
            <Activity size={16} />
            Nadzoruj vse
          </button>
          <button
            onClick={() => setShowNewProfile(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            <Plus size={16} />
            Nov profil
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Aktivni profili"
          value={profiles.filter(p => p.status === 'active').length}
          color="primary"
        />
        <StatCard
          icon={Bot}
          label="AI Agentov"
          value={profiles.length * 2}
          color="secondary"
        />
        <StatCard
          icon={MessageSquare}
          label="Neprebrana sporočila"
          value="24"
          color="warning"
        />
        <StatCard
          icon={TrendingUp}
          label="Povprečen engagement"
          value="78%"
          color="success"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/5">
        <TabButton 
          active={activeTab === 'agents'} 
          onClick={() => setActiveTab('agents')}
          icon={Bot}
          label="Agenti"
        />
        <TabButton 
          active={activeTab === 'monitor'} 
          onClick={() => setActiveTab('monitor')}
          icon={Activity}
          label="Nadzor"
        />
        <TabButton 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')}
          icon={Settings}
          label="Nastavitve"
        />
      </div>

      {/* Tab Content */}
      {activeTab === 'agents' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile List */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-sm font-medium text-muted">Profili</h3>
            {profiles.map(profile => (
              <button
                key={profile.id}
                onClick={() => setSelectedProfile(profile)}
                className={`w-full text-left rounded-xl p-4 transition-colors ${
                  selectedProfile?.id === profile.id
                    ? 'bg-primary/15 border border-primary/30'
                    : 'bg-card border border-white/5 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{profile.name}</span>
                  <StatusBadge status={profile.status} />
                </div>
                <div className="flex flex-wrap gap-1">
                  {profile.socialAccounts.map(account => (
                    <span key={account} className="text-xs bg-white/5 px-2 py-0.5 rounded">
                      {account}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Agent Chat Area */}
          <div className="lg:col-span-2">
            {selectedProfile ? (
              <div className="bg-card rounded-2xl border border-white/5 h-[600px]">
                <div className="flex items-center gap-3 p-4 border-b border-white/5">
                  <Bot className="text-primary" size={20} />
                  <div>
                    <h3 className="font-medium">{selectedProfile.name} - AI Agent</h3>
                    <p className="text-xs text-muted">
                      Sistemski prompt: {AGENT_TYPES.CONTENT}
                    </p>
                  </div>
                </div>
                <div className="p-4 h-[calc(100%-80px)]">
                  <AIAssistant agentType={AGENT_TYPES.CONTENT} />
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-2xl border border-white/5 h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <Bot className="mx-auto text-muted mb-4" size={48} />
                  <p className="text-muted">Izberi profil za začetek klepeta z agentom</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'monitor' && (
        <div className="space-y-6">
          {/* Monitoring Results */}
          {monitoringData?.loading ? (
            <div className="bg-card rounded-2xl border border-white/5 p-12 text-center">
              <Activity className="mx-auto text-primary mb-4 animate-pulse" size={48} />
              <p className="text-muted">Nadziram vse profile...</p>
            </div>
          ) : monitoringData?.results ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {monitoringData.results.map(result => (
                <div
                  key={result.profileId}
                  className="bg-card rounded-2xl border border-white/5 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">{result.profileName}</h4>
                    {result.status === 'healthy' ? (
                      <CheckCircle className="text-success" size={20} />
                    ) : (
                      <AlertCircle className="text-warning" size={20} />
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Nova sporočila</span>
                      <span className="font-medium">{result.newMessages}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Komentarji</span>
                      <span className="font-medium">{result.comments}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Engagement</span>
                      <span className="font-medium text-secondary">{result.engagement}%</span>
                    </div>
                    {result.alerts.length > 0 && (
                      <div className="pt-2 border-t border-white/5">
                        {result.alerts.map((alert, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-warning">
                            <AlertCircle size={14} />
                            {alert}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-2xl border border-white/5 p-12 text-center">
              <Activity className="mx-auto text-muted mb-4" size={48} />
              <p className="text-muted mb-4">Klikni "Nadzoruj vse" za pregled vseh profilov</p>
              <button
                onClick={handleMonitorAll}
                className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white mx-auto transition-colors hover:bg-primary/90"
              >
                <Activity size={16} />
                Začni nadzor
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-card rounded-2xl border border-white/5 p-6">
          <h3 className="text-lg font-medium mb-6">Globalne AI Nastavitve</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">LM Studio URL</label>
                <input
                  type="text"
                  defaultValue="http://localhost:1234/v1"
                  className="w-full bg-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Temperature</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  defaultValue="0.7"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted">
                  <span>Kreativno</span>
                  <span>Natanko</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Max Tokens</label>
                <input
                  type="number"
                  defaultValue="4096"
                  className="w-full bg-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Avtomatski nadzor</span>
                <Toggle />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Obvestila za nove naloge</span>
                <Toggle defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Streaming odgovori</span>
                <Toggle defaultChecked />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Components
function StatCard({ icon: Icon, label, value, color }) {
  const colors = {
    primary: 'bg-primary/15 text-primary',
    secondary: 'bg-secondary/15 text-secondary',
    warning: 'bg-warning/15 text-warning',
    success: 'bg-success/15 text-success',
  };
  
  return (
    <div className="bg-card rounded-2xl border border-white/5 p-4">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors[color]}`}>
          <Icon size={20} />
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted">{label}</p>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
        active
          ? 'border-primary text-primary'
          : 'border-transparent text-muted hover:text-text'
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

function StatusBadge({ status }) {
  const styles = {
    active: 'bg-success/15 text-success',
    paused: 'bg-warning/15 text-warning',
    inactive: 'bg-muted/15 text-muted',
  };
  
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${styles[status]}`}>
      {status === 'active' ? 'Aktiven' : status === 'paused' ? 'Pavzirano' : 'Neaktiven'}
    </span>
  );
}

function Toggle({ defaultChecked = false }) {
  const [checked, setChecked] = useState(defaultChecked);
  
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