# FreeLance Center API Reference

Celovita dokumentacija vseh API endpointov in konfiguracij.

---

## 📋 Kazalo
- [Environment Variables](#environment-variables)
- [AI Services](#ai-services)
- [Hermes Agent API](#hermes-agent-api)
- [LM Studio Integration](#lm-studio-integration)
- [Stripe / Payments](#stripe--payments)

---

## 🔧 Environment Variables

Vse konfiguracije so v `.env` datoteki (glej `.env.example`).

| Spremenljivka                | Opis                                   | Privzeta vrednost          |
|------------------------------|----------------------------------------|----------------------------|
| `VITE_LM_STUDIO_URL`         | Naslov LM Studio strežnika             | `http://localhost:1234/v1` |
| `VITE_LM_MODEL`              | Ime lokalnega LLM modela               | `local-model`              |
| `VITE_LM_STUDIO_API_KEY`     | Ključ za LM Studio (če je potrebno)    | `lm-studio`                |
| `VITE_HERMES_ENDPOINT`       | Naslov Hermes Agent strežnika          | `http://localhost:8000`    |
| `VITE_STRIPE_PUBLIC_KEY`     | Stripe javni ključ                     | `pk_test_xxx`              |
| `VITE_API_URL`               | Naslov backend API-ja                  | `http://localhost:3001/api`|

---

## 🤖 AI Services

AI storitve so centralizirane v `src/services/ai/`.

### 1. System Prompts (`systemPrompts.js`)

Definira vlogo in vedenje vsakega AI agenta.

**Agent Tipi:**
- `content`: Pisanje objav, opisov, blogov
- `social`: Upravljanje socialnih omrežij, engagement
- `crm`: Prodaja, lead scoring, email sequences
- `finance`: Računi, DDV, finančna poročila
- `projects`: Projektni management, Gantt/Kanban
- `communication`: Chat, odgovori na komentarje
- `analytics`: Poročila, OKR tracking
- `support`: Podpora strankam

**Struktura Prompta:**
```json
{
  "role": "system",
  "content": "Ti si AI pomočnik za [TIPO]. Tvoja naloga je...",
  "personality": {
    "creativity": 0.8,
    "formality": 0.5,
    "humor": 0.4,
    "empathy": 0.6
  }
}
```

### 2. AI Service (`aiService.js`)

Glavni posrednik za komunikacijo z LM Studio.

**Ključne metode:**
- `sendPrompt(agentType, message, context)` — pošlje sporočilo AI agentu
- `getConversationHistory(agentId)` — vrne zgodovino konverzacije (max 20 msg)
- `generateResponse(task, profile)` — generira odgovor glede na nalogo

**Omejitev konteksta:**
Sistem omeji zgodovino na zadnjih **20 sporočil**, da zmanjša porabo tokenov in izboljša odzivnost.

### 3. Profile Agents (`profileAgents.js`)

Upravljanje ločenih AI profilov za različne uporabnike ali stranke.

**Uporaba:**
```js
import { createProfileAgent } from '@/services/ai/profileAgents';

const agent = createProfileAgent({
  name: 'Marketing Agent',
  type: 'content',
  model: 'llama-3.1'
});
```

---

## 🦊 Hermes Agent API

Hermes Agent je samostojna storitev (`localhost:8000`), ki avtomatizira odgovore na socialnih omrežjih.

### Endpoints

#### `POST /api/hermes/chat`
Posredovanje novega sporočila za obdelavo.

**Body:**
```json
{
  "platform": "instagram",
  "message": "Koliko staja paket Premium?",
  "context": {
    "userId": "user_123",
    "conversationId": "conv_456"
  }
}
```

**Response:**
```json
{
  "reply": "Paket Premium staja 49€ na mesec...",
  "confidence": 0.92,
  "suggestedAction": "send_offer"
}
```

#### `POST /api/hermes/social-tools`
Avtomatsko upravljanje socialnih orodij.

**Body:**
```json
{
  "tool": "hashtag_research",
  "query": "digitalni marketing"
}
```

**Response:**
```json
{
  "hashtags": ["#marketing", "#digital", "#seo"],
  "trendingScore": 0.85
}
```

#### `POST /api/hermes/crm-tools`
CRM orodja za prodajne agente.

**Body:**
```json
{
  "tool": "lead_score",
  "leadData": { "email": "test@example.com", "source": "linkedin" }
}
```

---

## 🧠 LM Studio Integration

LM Studio strežnik ponuja OpenAI-compatibilne endpoint-e.

### `POST /v1/chat/completions`

**Header:**
```
Authorization: Bearer lm-studio
Content-Type: application/json
```

**Body:**
```json
{
  "model": "local-model",
  "messages": [
    { "role": "system", "content": "Ti si pomočnik za freelancere." },
    { "role": "user", "content": "Kako naj optimiziram svoj projekt?" }
  ],
  "temperature": 0.7,
  "max_tokens": 500
}
```

**Response:**
```json
{
  "choices": [{
    "message": {
      "role": "assistant",
      "content": "Za optimizacijo projekta priporočam naslednje korake..."
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 45,
    "completion_tokens": 120
  }
}
```

---

## 💳 Stripe / Payments

Stripe integracija je konfigurirana preko `VITE_STRIPE_PUBLIC_KEY`.

### Ključne funkcije (`src/pages/Payments.jsx`)
- `initiatePayment(amount, currency)` — zagon plačila
- `generateInvoice(clientId, items)` — generiranje PDF računa
- `trackTransaction(transactionId)` — sledenje transakciji

**DDV Izračun (Slovenija):**
```js
const calculateVAT = (amount) => {
  const vatRate = 0.22; // 22% DDV v Sloveniji
  return {
    net: amount,
    vat: amount * vatRate,
    gross: amount * (1 + vatRate)
  };
};
```

---

## 📊 Mock Data Structure (`src/data/mockData.js`)

Trenutno se uporabljajo statični podatki za demo.

**Struktura Stranke:**
```js
{
  id: number,
  name: string,
  lastContact: string (ISO date),
  notes: string,
  tags: string[]
}
```

**Struktura Deala (CRM):**
```js
{
  id: number,
  clientId: number,
  title: string,
  value: number,
  stage: 'lead' | 'proposal' | 'negotiation' | 'closed',
  probability: number (0-100),
  closeDate: string (ISO date)
}
```

---

*Zadnja posodobitev: 2026-10-01*
