/**
 * AI Service Configuration
 * Centralna konfiguracija za LM Studio povezavo in AI agente
 * ZADNJE POSODOBLJENO: 2026-10-01 (AI Bot test)
 */
/**
 * AI Service Configuration
 * Centralna konfiguracija za LM Studio povezavo in AI agente
 */

export const AI_CONFIG = {
  // LM Studio lokalna konfiguracija
  lmStudio: {
    baseUrl: import.meta.env.VITE_LM_STUDIO_URL || 'http://localhost:1234/v1',
    model: import.meta.env.VITE_LM_MODEL || 'local-model',
    apiKey: import.meta.env.VITE_LM_STUDIO_API_KEY || 'lm-studio',
    timeout: 120000,
    maxRetries: 3,
  },
  
  // Hermens-Agent konfiguracija (nousresearch/hermes-agent)
  hermes: {
    enabled: true,
    endpoint: import.meta.env.VITE_HERMES_ENDPOINT || 'http://localhost:8000',
    version: '1.0.0',
  },

  // Privzete nastavitve
  defaults: {
    temperature: 0.7,
    maxTokens: 4096,
    topP: 0.9,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
  },

  // Razpoložljivi modeli
  models: [
    {
      id: 'local-default',
      name: 'Local LLM (LM Studio)',
      provider: 'lmstudio',
      description: 'Vaš lastni model preko LM Studio',
      capabilities: ['chat', 'completion', 'embedding'],
    },
    {
      id: 'hermes-agent',
      name: 'Hermes Agent',
      provider: 'hermes',
      description: 'AI agent za avtomatizacijo nalog',
      capabilities: ['agent', 'reasoning', 'tool-use'],
    },
  ],
};

// Agent tipi
export const AGENT_TYPES = {
  CONTENT: 'content',         // Pisanje objav, odgovorov
  SOCIAL: 'social',           // Upravljanje socialnih omrežij
  CRM: 'crm',                 // CRM in prodaja
  FINANCE: 'finance',         // Finance in računovodstvo
  PROJECTS: 'projects',       // Projektni management
  COMMUNICATION: 'communication', // Komunikacija in sodelovanje
  ANALYTICS: 'analytics',     // Analitika in poročila
  SUPPORT: 'support',         // Podpora strankam
};

// Prioritete agentov
export const AGENT_PRIORITIES = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent',
};

export default AI_CONFIG;