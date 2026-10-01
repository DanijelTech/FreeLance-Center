# FreeLance Center Architecture

Arhitekturni pregled sistema FreeLance Center.

---

## 🏗️ Overview Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                       │
├─────────────────────────────────────────────────────────────┤
│  React 19 + Vite 8 + TailwindCSS 4                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │   Pages     │  │ Components   │  │ Services         │   │
│  │ - Dashboard │  │ - AI/        │  │ - aiService.js   │   │
│  │ - CRM       │  │   PromptMgr  │  │ - hermesAgent.js │   │
│  │ - Projects  │  │ - Projects/  │  │ - profileAgents  │   │
│  │ - Finance   │  │   Kanban     │  │ - systemPrompts  │   │
│  │ - Settings  │  │ - Modals     │  └────────┬─────────┘   │
│  └─────────────┘  └──────────────┘           │             │
├─────────────────────────────────────────────────────────────┤
│  State: aiStore.js (Zustand/Context)                        │
├─────────────────────────────────────────────────────────────┤
│  Data: src/data/mockData.js (Demo)                          │
└─────────────────────────────────────────────────────────────┘
         │                      │                      │
         ▼                      ▼                      ▼
┌─────────────────┐  ┌──────────────────┐  ┌────────────────────┐
│  LM Studio      │  │  Hermes Agent    │  │  Stripe / External │
│  (localhost:1234) │  │ (localhost:8000) │  │  APIs              │
└─────────────────┘  └──────────────────┘  └────────────────────┘
```

---

## 🧠 AI System Flow

1. **User Input** → `AIAssistant.jsx` / `PromptManager.jsx`
2. **Request Routing** → `aiService.js` določi tip agenta (content, social, CRM...)
3. **Prompt Assembly** → `systemPrompts.js` doda kontekst in personality profil
4. **External Call** → `aiService.js` pošlje zahtevo na LM Studio (`/v1/chat/completions`) ali Hermes Agent
5. **Response Handling** → Odgovor se shrani v konverzacijski zgodovini (max 20 msg) in vrne UI

### AI Agent Hierarchy

```
AI Service (aiService.js)
├── System Prompts (systemPrompts.js)
│   ├── Content Agent
│   ├── Social Agent
│   ├── CRM Agent
│   └── Finance Agent
├── Profile Agents (profileAgents.js)
│   ├── User-specific profiles
│   └── Client-specific profiles
└── Hermes Agent (hermesAgent.js)
    ├── Social Tools (hashtags, scheduling)
    ├── CRM Tools (lead scoring)
    └── Project Tools (status updates)
```

---

## 📦 State Management

Trenutno se uporablja `aiStore.js` za stanje AI komponent. Za prihodnjo širitev se priporoča **Zustand** ali **Redux Toolkit**.

### Trenutna struktura state-a:
```js
{
  ai: {
    agents: [],          // Seznam aktivnih AI agentov
    conversations: {},   // Map userId -> messages[]
    activeProfile: null, // Trenutno izbran AI profil
    isGenerating: false  // Loading stanje
  }
}
```

---

## 🗄️ Data Flow

### Demo Faza (Trenutno)
```
mockData.js (Static JSON) → React Components → UI Render
```

### Production Faza (Pričakovano)
```
Backend API (Node/Express) → Database (PostgreSQL/MongoDB)
       ↑
Frontend (fetch/axios) → State Management → UI
```

---

## 🎨 Component Hierarchy

```
App.jsx (Router)
└── Layout (Header + Sidebar)
    └── Pages/
        ├── Dashboard
        │   └── StatsCards, SocialNetworkCard
        ├── Projects
        │   └── KanbanBoard, GanttChart
        ├── AI Management
        │   └── AIAssistant, PromptManager
        └── Settings
            └── ProxyManager, AddAccountModal
```

---

*Zadnja posodobitev: 2026-10-01*
