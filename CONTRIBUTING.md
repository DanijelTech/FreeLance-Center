# Contributing to FreeLance Center

Hvala, da želiš prispevati k FreeLance Center! Ta dokumentacija vodi skozi proces sodelovanja.

---

## 📋 Kazalo
- [Kako začeti](#kako-začeti)
- [Arhitektura projekta](#arhitektura-projekta)
- [Konvencije za kodo](#konvencije-za-kodo)
- [Git Commit Messages](#git-commit-messages)
- [Postopek Pull Request](#postopek-pull-request)

---

## 🚀 Kako začeti

1. **Fork** repozitorij na svoj GitHub račun
2. **Kloniraj** svojo kopijo lokalno:
   ```bash
   git clone https://github.com/TvojeIme/FreeLance-Center.git
   cd FreeLance-Center
   ```
3. **Namesti odvisnosti**:
   ```bash
   npm install
   ```
4. **Uredi okoljske spremenljivke**:
   ```bash
   cp .env.example .env
   # Uredi .env z ustreznimi vrednostmi
   ```
5. **Začni razvojni strežnik**:
   ```bash
   npm run dev
   ```

> ⚠️ **Pomembno:** Ker `node_modules` že sta v repozitoriju, lahko preskočiš `npm install`, če želiš hitreje začeti.

---

## 🏗️ Arhitektura projekta

Projekt je razdeljen na naslednje glavne cone:

```
src/
├── components/      # Ponovno uporabne UI komponente
│   ├── ai/          # AI specifične komponente (PromptManager, AIAssistant)
│   ├── modals/      # Splošna modalna okna
│   └── projects/    # KanbanBoard, GanttChart
├── pages/           # Glavne strani aplikacije (Route-ji)
├── services/        # Poslovna logika in API klici
│   └── ai/          # AI storitve (hermesAgent, aiService, systemPrompts)
├── store/           # State management (Zustand / Context)
├── data/            # Mock podatki (demo faza)
└── App.jsx          # Glavna konfiguracija routinga
```

### Ključne odločitve
- **State Management:** Uporablja se `aiStore.js` za AI stanje. Za globalno stanje uporabljaj React Context ali Zustand.
- **Stiliranje:** TailwindCSS v4 z PostCSS. Ne uporabljaš inline styles kjer koli je mogoče.
- **AI Integracija:** Vse AI klice posluša `aiService.js`. Hermes agent se povezuje na `localhost:8000`.

---

## 📝 Konvencije za kodo

### JavaScript / JSX
- Uporabljaj **arrow functions** in **const** kjer koli je mogoče.
- Komponente naj bodo **functional components** z hooks.
- Poskrbi za **accessibility** (aria-labels, alt text).
- Komentarji naj bodo v **slovenščini** ali angleščini, odvisno od okolja.

### Komponente
```jsx
// ✅ DOBER PRIMER
export const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

// ❌ SLAB PRIMER
function StatsCard(props) {
  return <div><h3>{props.title}</h3></div>
}
```

### AI Storitve
- Vse storitve naj uporabljajo **Singleton pattern**, kjer je primerno.
- Omeji zgodovino konverzacij na zadnjih 20 sporočil (`maxHistory: 20`).

---

## 🐙 Git Commit Messages

Uporabljamo **Conventional Commits** standard:

```
<type>(<scope>): <description>

[optional body]
```

### Vrste (Types):
- `feat`: nova funkcija
- `fix`: popravek hrošča
- `docs`: sprememba dokumentacije
- `style`: formatiranje, manjkajoči semičniki (brez spremembe kode)
- `refactor`: prestrukturiranje kode (brez novih funkcij ali popravkov)
- `test`: dodajanje ali popravljanje testov
- `chore`: posodobitev build procesov, pomožnih orodij

### Primeri:
```bash
git commit -m "feat(ai): dodan nov sistemski prompt za CRM agenta"
git commit -m "fix(projects): popravljen drag-and-drop na Kanban tabli"
git commit -m "docs(readme): posodobljeni navodila za namestitev"
```

---

## 🔄 Postopek Pull Request

1. Ustvari novo **branch** iz `main`:
   ```bash
   git checkout -b feat/tvoje-spremembe
   ```
2. Naredi spremembe in commitaj po zgornjih konvencijah.
3. Potisni branch na GitHub:
   ```bash
   git push origin feat/tvoje-spremembe
   ```
4. Odpravi **Pull Request** proti `main`.
5. Izpolni predlogo PR-ja:
   - Kaj je spremenjeno?
   - Kako testirati spremembo?
   - Ali so bile uvedene nove odvisnosti?

---

## 🧪 Testiranje (prihodnost)

Trenutno projekt nima setupa za avtomatske teste. Priporočamo:
- **Vitest** ali **Jest** za unit teste komponent.
- **React Testing Library** za testiranje interakcij.
- **Cypress** ali **Playwright** za end-to-end teste.

> 💡 *Nasvet: Preden dodajaš novo funkcijo, napiši vsaj osnovni test za edge case.*

---

## 📞 Pomoč

Če imaš vprašanja o arhitekturi ali kodi:
- Preglej `docs/api-reference.md` za podrobnosti o AI storitvah.
- Oglej si `docs/architecture.md` za vizualne diagrame.
