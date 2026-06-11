import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, ChevronDown, Mail, MessageSquare, BookOpen, LifeBuoy } from "lucide-react";

const FAQS = [
  {
    q: "Kako dodam nov socialni račun?",
    a: "Pojdi v Nastavitve → Povezani računi in klikni 'Dodaj račun'. Izberi platformo, vnesi uporabniško ime in potrdi povezavo prek OAuth okna platforme.",
  },
  {
    q: "Kako deluje testiranje proxyjev?",
    a: "V razdelku Proxy klikni 'Test' pri posameznem proxyju ali 'Testiraj Vse' za vse naenkrat. Sistem preveri odzivnost in posodobi status (Aktiven/Neaktiven) ter hitrost odziva.",
  },
  {
    q: "Kaj je Hermes Agent in kako ga povežem z LM Studio?",
    a: "Hermes Agent je tvoj lokalni AI pomočnik, ki avtomatizira odgovore na sporočila in komentarje. V Nastavitve → AI Integracija nastaviš naslov LM Studio strežnika (privzeto http://localhost:1234), izbereš model in vklopiš želene avtomatizacije.",
  },
  {
    q: "Ali so podatki na nadzorni plošči resnični?",
    a: "Trenutno gre za demo različico s simuliranimi (mock) podatki, namenjeno predstavitvi vmesnika. Povezava z dejanskimi API-ji socialnih omrežij sledi v naslednji fazi.",
  },
  {
    q: "Kako uredim urnik objav?",
    a: "V razdelku Urnik klikni 'Nova objava', izberi platformo, naslov, dan in uro. Objave se prikažejo v tedenskem koledarju in spodnjem seznamu.",
  },
  {
    q: "Kako preklopim med temno in svetlo temo?",
    a: "Klikni ikono sonca/lune v zgornjem desnem kotu glave aplikacije.",
  },
];

export default function Help() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text sm:text-3xl">Pomoč in podpora</h1>
        <p className="mt-1 text-sm text-muted">Odgovori na pogosta vprašanja in kontaktni podatki za podporo.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ContactCard icon={BookOpen} title="Dokumentacija" desc="Podroben vodič po vseh funkcijah nadzorne plošče." action="Odpri dokumentacijo" />
        <ContactCard icon={MessageSquare} title="Skupnost" desc="Pridruži se skupnosti slovenskih freelancerjev." action="Pridruži se" />
        <ContactCard icon={Mail} title="Kontakt podpora" desc="Pošlji sporočilo ekipi za podporo - odgovorimo v 24h." action="Pošlji email" />
      </div>

      <div className="rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
        <h2 className="flex items-center gap-2 text-lg font-bold text-text">
          <HelpCircle className="text-primary" size={20} />
          Pogosta vprašanja
        </h2>
        <div className="mt-3 divide-y divide-white/5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={faq.q}>
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="flex w-full items-center justify-between gap-4 py-3 text-left"
                >
                  <span className="text-sm font-medium text-text">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-muted transition-transform ${isOpen ? "rotate-180 text-primary" : ""}`}
                  />
                </button>
                {isOpen && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="overflow-hidden pb-3 text-sm text-muted"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <LifeBuoy size={24} />
        </div>
        <div>
          <p className="font-semibold text-text">Še vedno potrebuješ pomoč?</p>
          <p className="text-sm text-muted">Naša ekipa je na voljo od ponedeljka do petka, od 9h do 17h.</p>
        </div>
      </div>
    </div>
  );
}

function ContactCard({ icon: Icon, title, desc, action }) {
  return (
    <div className="flex flex-col rounded-2xl border border-white/5 bg-card p-5 shadow-lg">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <Icon size={20} />
      </div>
      <p className="mt-3 font-semibold text-text">{title}</p>
      <p className="mt-1 flex-1 text-sm text-muted">{desc}</p>
      <button className="mt-3 self-start rounded-lg bg-white/5 px-3 py-1.5 text-sm font-medium text-text transition-colors hover:bg-white/10">
        {action}
      </button>
    </div>
  );
}
