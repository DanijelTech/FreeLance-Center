# FreeLance Center

Profesionalni sistem za upravljanje freelancer dejavnosti. Popolna nadzorna plošča za sprotno spremljanje projektov, časa, financ in spletne prisotnosti.

## 🚀 Funkcije

### 🧠 AI Upravljanje (HERMES-AGENT INTEGRACIJA)
- **System Prompt Manager** - Centralizirano upravljanje sistemskih promp-ov
- **Profile Agents** - Ločeni AI agenti za vsak profil z unikatnim sistemskim promtom
- **LM Studio Integration** - Povezava z lastnim LLM modelom
- **Hermes Agent** - NousResearch hermes-agent za napredne AI operacije
- **KOMUNIKACIJA & SODELOVANJE:**
  - Real-time chat med člani tima
  - Video konference integracija (Zoom, Meet)
  - Komentarji na naloge in projekte
  - @mentions in obvestila
  - Deljenje datotek
  - Whiteboard za brainstorming

### 📊 Nadzorna plošča
- Statistične kartice z real-time podatki
- Prikaz vseh socialnih omrežij (Instagram, YouTube, TikTok, X, LinkedIn, Facebook)
- Proxy manager za upravljanje strežnikov
- Prejemanje sporočil in komentarjev

### 📁 Projekt Management
- **Kanban Board** (Trello-style) z drag & drop funkcijo
- **Gantt Chart** timeline za projektno načrtovanje
- Grid/List/Board view za projekte
- Statusi: Načrtovanje, V delu, Pregled, Končano, Na čakanju
- Prioritete: Nizka, Srednja, Visoka, Nujno
- Sledenje napredka in proračuna
- Team management

### ⚡ Avtomatizacija & Workflow
- **Zapier-style Workflow Builder** - Vizualno ustvarjanje avtomatizacij
- Trigger + Action sistem
- Predloge za pogoste workflow-e
- Avtomatsko generiranje dokumentov
- Smart scheduling

### 💰 Finance & Plačila (Stripe integracija)
- **Stripe/PayPal integracija** za direktna plačila
- Avtomatsko generiranje faktur (PDF)
- Sledenje transakcijam
- Davčni izračuni (slovenski sistem - DDV 22%)
- E-transakcije in digitalni podpisi

### 👥 CRM & Prodaja
- Upravljanje strank in kontaktov
- Lead scoring in qualification
- Email sequences in campaigns
- Deal forecasting
- Quote builder
- Integracija z LinkedIn Sales Navigator

### ⏱️ Časovni list (Stripčet)
- Live timer z start/pause/stop funkcijo
- Izbor projekta in naloge
- Hitra pavza (Kava, Kosilo, Sestanek)
- Tedenski in mesečni pregled statistik
- Zaračunljive/nerezervirane ure

### 🌐 Online prisotnost (Onlifens)
- Spodbujanje engagementa na vseh platformah
- Trend angažiranosti skozi čas
- Trende teme (#hashtags)
- Obvestila in opozorila
- Načrtovanje objav

### 📄 Poročila
- Tedenska, mesečna, kvartalna poročila
- Projektna in finančna poročila
- PDF generiranje
- Deljenje in tiskanje

### 📚 Knowledge Base & Wiki
- Wiki / knowledge base
- Project briefs templates
- Contract templates
- Meeting notes z action items
- API dokumentacija

### 🛒 Marketplace
- Template marketplace
- App integrations marketplace
- Freelancer directory
- Job board integration

### 📈 Reporting & Analitika
- Customizable dashboards
- Goal tracking (OKR)
- ROI kalkulator
- Benchmarking proti industriji
- Executive summaries za kliente

### 🔗 Integracije
- Slack, Teams integracija
- Google Calendar sync
- QuickBooks/Xero accounting
- GitHub/GitLab za developerje
- Mobile app (iOS/Android) struktura
- API za custom integracije

### 🎨 Uporabniška izkušnja
- Onboarding wizard
- Tooltips in guided tours
- Dark/light mode
- Multi-language support
- Accessibility (WCAG)
- Keyboard shortcuts

### 🔒 Varnost & Administracija
- SSO (Google, Microsoft login)
- 2FA avtentikacija
- Role-based permissions
- Audit logs
- Data export (GDPR compliance)
- Backup and recovery

## 🛠️ Namestitev

```bash
# Kloniranje repozitorija
git clone https://github.com/DanijelTech/FreeLance-Center.git

# Namestitev odvisnosti
npm install

# Zagon razvojnega strežnika
npm run dev

# Build za produkcijo
npm run build
```

### AI & LM Studio Setup

1. **Namestite LM Studio**
   - Prenesite z https://lmstudio.ai/
   - Naložite želeni LLM model
   - Zaženite lokalni strežnik (gumb "Start Server")
   
2. **Konfigurirajte .env datoteko**
   ```bash
   cp .env.example .env
   # Editirajte .env z vašimi nastavitvami
   ```

3. **Hermes Agent (opcijsko)**
   ```bash
   # Za napredne AI funkcije
   pip install hermes-agent
   hermes-agent serve
   ```

## 📋 Tehnologije

- **React 19** - UI framework
- **Vite 8** - Build tool
- **Tailwind CSS 4** - CSS framework
- **Framer Motion** - Animacije
- **Recharts** - Grafi in analitika
- **React Router 7** - Routing
- **Lucide React** - Ikone
- **React Redux** - State management

## 🎨 Dizajn

- Temna tema z profesionalnim dizajnom
- Responsive design za vse naprave
- Custom SVG ikone za socialna omrežja
- Gladke animacije in prehodi

## 🚀 Prioritete razvoja

### FAZA 1 - Kritično (MVP za enterprise):
- ✅ Real-time kolaboracija (chat, comments)
- ✅ Kanban/Gantt za projekt management
- ✅ Mobile responsive design
- ✅ Stripe integracija za plačila

### FAZA 2 - Pomembno:
- ✅ Workflow avtomatizacije
- ✅ Client portal
- ✅ API integracije
- ✅ Email campaigns

### FAZA 3 - Diferenciatorji:
- ✅ AI assistant z custom LLM (LM Studio)
- ✅ Predictive analytics
- ✅ Freelancer marketplace
- ⬜ White-label options

## 📝 Licenca

MIT License - Prosto za uporabo v osebnih in komercialnih projektih.

---

Narejeno z ❤️ za freelancerje