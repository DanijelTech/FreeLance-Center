# Changelog

Vse pomembne spremembe v tem projektu so dokumentirane tukaj.

Format sledi standardu [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
a projekt uporablja [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- (Ni novih funkcij)

### Changed
- (Ni sprememb)

### Fixed
- (Ni popravkov)

---

## [1.1.0] - 2026-10-01

### Added
- **AI/Hermes Integracija**: Poln sistem AI agentov z LM Studio podporo
- **Hermes Agent**: Samostojna storitev za avtomatizacijo odgovorov na socialna omrežja
- **System Prompt Manager**: Centralizirano upravljanje promptov za vse agente
- **Profile Agents**: Podpora za več ločenih AI profilov (Content, Social, CRM...)
- **Team Chat**: Real-time komunikacija med člani tima (komponenta `TeamChat`)
- **Workflow Builder**: Vizualni builder za avtomatizacijo delovnih tokov
- **Proxy Manager**: Upravljanje in testiranje proxyjev za socialna omrežja
- **Knowledge Base**: Stran za shranjevanje internih znanj in templateov
- **Marketplace**: Prikaz integracij in storitev

### Changed
- Refaktorirana AI storitvena plast (`src/services/ai/`)
- Posodobljen `package.json` na React 19, Vite 8, TailwindCSS 4
- Optimizirani mock podatki (`src/data/mockData.js`)

### Fixed
- Popravljeno navigacijsko stanje v `App.jsx`
- Usklajeni styling komponent z TailwindCSS v4 sintakso

---

## [1.0.1] - 2026-09-28

### Changed
- Vključeni `node_modules` v repozitorij za lažjo inicialno namestitev (5a84a9d)

---

## [1.0.0] - 2026-09-25

### Added
- **MVP Release**: Celoten sistem za freelancere
- **Dashboard**: Nadzorna plošča s KPI karticami in socialnimi omrežji
- **Project Management**: Kanban Board in Gantt Chart komponente
- **CRM Module**: Upravljanje strank, stikov in deal pipeline-a
- **Finance Module**: Računi, plačila (Stripe/PayPal), DDV izračuni
- **Time Tracking**: Live timer in tedenski pregledi
- **Online Presence**: Upravljanje socialnih računov in načrtovanje objav
- **Analytics**: Recharts grafi za engagement in promet
- **Settings & Help**: Nastavitve sistema in FAQ stran
- **Responsive Design**: Delovanje na vseh napravah

---

## [0.1.0] - 2026-09-20

### Added
- Initial skeleton: Vite + React + TailwindCSS setup
- Basic routing structure (`App.jsx`, `main.jsx`)
- Base layout components (Header, Sidebar)

---

## Comparison of Versions

| Version | Status | Features |
|---------|--------|----------|
| 1.1.0 | 🟢 Active | AI Agents, Workflow, Chat, Proxy |
| 1.0.1 | 🟡 Legacy | Node modules included |
| 1.0.0 | 🟢 Stable | Core MVP Features |
| 0.1.0 | 🔴 Deprecated | Initial Setup |

---

*Zadnja posodobitev: 2026-10-01*
