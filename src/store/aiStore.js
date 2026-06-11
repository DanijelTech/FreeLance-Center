/**
 * AI Store - Redux state management za AI funkcionalnosti
 */

import { configureStore, createSlice } from '@reduxjs/toolkit';

// AI State Slice
const aiSlice = createSlice({
  name: 'ai',
  initialState: {
    // Povezava z LM Studio
    lmStudio: {
      connected: false,
      models: [],
      error: null,
      loading: false,
    },
    
    // Hermes Agent
    hermes: {
      connected: false,
      sessionId: null,
      tools: [],
      error: null,
    },
    
    // Aktivni agenti
    agents: {
      active: null, // Trenutno aktiven agent
      profiles: [], // Profili z agenti
      tasks: [], // Čakajoče naloge
      history: [], // Zgodovina interakcij
    },
    
    // Konverzacije
    conversations: {
      current: null,
      messages: [],
      loading: false,
    },
    
    // Prompts
    prompts: {
      templates: [],
      active: null,
      editing: false,
    },
    
    // Nastavitve
    settings: {
      defaultTemperature: 0.7,
      defaultMaxTokens: 4096,
      autoMonitor: true,
      monitorInterval: 300000, // 5 minut
    },
  },
  reducers: {
    // LM Studio reducers
    setLMStudioConnection: (state, action) => {
      state.lmStudio.connected = action.payload.connected;
      state.lmStudio.models = action.payload.models || [];
      state.lmStudio.error = action.payload.error || null;
    },
    setLMStudioLoading: (state, action) => {
      state.lmStudio.loading = action.payload;
    },
    
    // Hermes reducers
    setHermesConnection: (state, action) => {
      state.hermes.connected = action.payload.connected;
      state.hermes.sessionId = action.payload.sessionId || null;
      state.hermes.tools = action.payload.tools || [];
      state.hermes.error = action.payload.error || null;
    },
    
    // Agent reducers
    setActiveAgent: (state, action) => {
      state.agents.active = action.payload;
    },
    addProfile: (state, action) => {
      state.agents.profiles.push(action.payload);
    },
    updateProfile: (state, action) => {
      const index = state.agents.profiles.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.agents.profiles[index] = action.payload;
      }
    },
    removeProfile: (state, action) => {
      state.agents.profiles = state.agents.profiles.filter(p => p.id !== action.payload);
    },
    addTask: (state, action) => {
      state.agents.tasks.push({
        ...action.payload,
        id: Date.now(),
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
    },
    updateTask: (state, action) => {
      const index = state.agents.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.agents.tasks[index] = { ...state.agents.tasks[index], ...action.payload };
      }
    },
    removeTask: (state, action) => {
      state.agents.tasks = state.agents.tasks.filter(t => t.id !== action.payload);
    },
    
    // Conversation reducers
    setCurrentConversation: (state, action) => {
      state.conversations.current = action.payload;
    },
    addMessage: (state, action) => {
      state.conversations.messages.push({
        ...action.payload,
        id: Date.now(),
        timestamp: new Date().toISOString(),
      });
    },
    setMessages: (state, action) => {
      state.conversations.messages = action.payload;
    },
    setConversationLoading: (state, action) => {
      state.conversations.loading = action.payload;
    },
    clearConversation: (state) => {
      state.conversations.messages = [];
    },
    
    // Prompt reducers
    setPromptTemplates: (state, action) => {
      state.prompts.templates = action.payload;
    },
    addPromptTemplate: (state, action) => {
      state.prompts.templates.push(action.payload);
    },
    updatePromptTemplate: (state, action) => {
      const index = state.prompts.templates.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.prompts.templates[index] = action.payload;
      }
    },
    removePromptTemplate: (state, action) => {
      state.prompts.templates = state.prompts.templates.filter(p => p.id !== action.payload);
    },
    setActivePrompt: (state, action) => {
      state.prompts.active = action.payload;
    },
    setPromptEditing: (state, action) => {
      state.prompts.editing = action.payload;
    },
    
    // Settings reducers
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    
    // Add to history
    addToHistory: (state, action) => {
      state.agents.history.unshift({
        ...action.payload,
        id: Date.now(),
        timestamp: new Date().toISOString(),
      });
      // Omeji na zadnjih 100
      if (state.agents.history.length > 100) {
        state.agents.history = state.agents.history.slice(0, 100);
      }
    },
  },
});

export const {
  setLMStudioConnection,
  setLMStudioLoading,
  setHermesConnection,
  setActiveAgent,
  addProfile,
  updateProfile,
  removeProfile,
  addTask,
  updateTask,
  removeTask,
  setCurrentConversation,
  addMessage,
  setMessages,
  setConversationLoading,
  clearConversation,
  setPromptTemplates,
  addPromptTemplate,
  updatePromptTemplate,
  removePromptTemplate,
  setActivePrompt,
  setPromptEditing,
  updateSettings,
  addToHistory,
} = aiSlice.actions;

// Selectors
export const selectLMStudio = (state) => state.ai.lmStudio;
export const selectHermes = (state) => state.ai.hermes;
export const selectAgents = (state) => state.ai.agents;
export const selectConversations = (state) => state.ai.conversations;
export const selectPrompts = (state) => state.ai.prompts;
export const selectSettings = (state) => state.ai.settings;

// Store setup
export const store = configureStore({
  reducer: {
    ai: aiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;