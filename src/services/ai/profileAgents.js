/**
 * AI Profile Agents
 * Specifični AI agenti za posamezne profile/uporabnike
 * Vsak profil ima svojega agenta z unikatnim sistemskim promtom
 */

import { AGENT_TYPES } from './aiConfig.js';
import { getAgentSystemPrompt, getAgentConfig } from './systemPrompts.js';
import aiService from './aiService.js';

/**
 * Profile Agent - centralni nadzornik vseh računov
 */
export class ProfileAgent {
  constructor(profileConfig) {
    this.id = profileConfig.id;
    this.name = profileConfig.name;
    this.type = AGENT_TYPES.CONTENT;
    this.config = profileConfig;
    this.conversationHistory = [];
  }

  /**
   * Sistemski prompt za ta profil
   */
  getSystemPrompt() {
    return `${getAgentSystemPrompt(AGENT_TYPES.CONTENT)}

PROFIL SPECIFIKA:
- Ime profila: ${this.name}
- Tip: ${this.config.type || 'Splošen'}
- Socialna omrežja: ${this.config.socialAccounts?.join(', ') || 'Ni določeno'}
- Ciljna publika: ${this.config.targetAudience || 'Splošna javnost'}
- Blagovna znamka: ${this.config.brand || 'Osebna'}
- Tone glasu: ${this.config.tone || 'Profesionalen'}

VEDNO upoštevaj specifike tega profila pri ustvarjanju vsebin.
`;
  }

  /**
   * Nadzoruj vse račune tega profila
   */
  async monitorAccounts() {
    const prompt = `
Preglej vse račune za profil "${this.name}" in pripravi poročilo o:
1. Novih sporočilih in komentarjih
2. Engagement metrikah
3. Aktivnostih, ki zahtevajo pozornost
4. Predlogih za izboljšanje

Bodisi proaktiven in predlagaj vsebine ter odgovore.
`;

    return this.chat(prompt);
  }

  /**
   * Ustvari vsebino za ta profil
   */
  async generateContent(task, options = {}) {
    const prompt = `
NALOGA: ${task}
PLATFORMA: ${options.platform || 'Instagram'}
STIL: ${this.config.tone || 'Profesionalen'}

Ustvari vsebino prilagojeno za ta profil.
`;

    return this.chat(prompt);
  }

  /**
   * Odgovori na sporočilo/komentar
   */
  async respondToInteraction(interaction) {
    const { type, platform, content, sentiment } = interaction;
    
    let prompt = '';
    
    if (type === 'comment') {
      prompt = `
Na "${platform}" je nekdo komentiral: "${content}"
Čustvo: ${sentiment || 'nevtralno'}

Napiši odgovor na komentar:
- Ustrezen ton glede na čustvo
- Profesionalen
- Spodbujaj engagement
`;
    } else if (type === 'message') {
      prompt = `
Prejel si DM na "${platform}": "${content}"

Napiši odgovor:
- Prijazen in profesionalen
- Ustrezen za ${this.config.tone || 'poslovni'} ton
`;
    }

    return this.chat(prompt);
  }

  /**
   * Pripravi objavo za vse platforme
   */
  async crossPost(content, platforms = []) {
    const platformList = platforms.length > 0 
      ? platforms.join(', ') 
      : this.config.socialAccounts?.join(', ') || 'Instagram';

    const prompt = `
VSEBINA: ${content}
PLATFORME: ${platformList}

Prilagodi vsebino za vsako platformo posebej:
1. Instagram - caption + hashtags
2. Facebook - daljši opis
3. LinkedIn - profesionalen ton
4. X/Twitter - jedrnat thread
5. TikTok - hook + CTA

Odgovori v strukturiranem JSON formatu.
`;

    return this.chat(prompt);
  }

  /**
   * Klepet z agentom
   */
  async chat(message) {
    const messages = [
      { role: 'system', content: this.getSystemPrompt() },
      ...this.conversationHistory,
      { role: 'user', content: message },
    ];

    const response = await aiService.sendToLMStudio(messages);
    
    if (response.success) {
      this.conversationHistory.push(
        { role: 'user', content: message },
        { role: 'assistant', content: response.content }
      );
      
      // Omeji zgodovino
      if (this.conversationHistory.length > 30) {
        this.conversationHistory = this.conversationHistory.slice(-30);
      }
    }

    return response;
  }

  /**
   * Počisti zgodovino
   */
  clearHistory() {
    this.conversationHistory = [];
  }
}

/**
 * Profile Manager - upravlja vse profile
 */
class ProfileManager {
  constructor() {
    this.profiles = new Map();
    this.initialized = false;
  }

  /**
   * Inicializiraj profile iz shranjenih podatkov
   */
  initializeProfiles(profileConfigs) {
    this.profiles.clear();
    
    profileConfigs.forEach(config => {
      const agent = new ProfileAgent(config);
      this.profiles.set(config.id, agent);
    });
    
    this.initialized = true;
  }

  /**
   * Dodaj nov profil
   */
  addProfile(profileConfig) {
    const agent = new ProfileAgent(profileConfig);
    this.profiles.set(profileConfig.id, agent);
    return agent;
  }

  /**
   * Odstrani profil
   */
  removeProfile(profileId) {
    return this.profiles.delete(profileId);
  }

  /**
   * Pridobi agenta za profil
   */
  getProfileAgent(profileId) {
    return this.profiles.get(profileId);
  }

  /**
   * Pridobi vse profile
   */
  getAllProfiles() {
    return Array.from(this.profiles.values()).map(agent => ({
      id: agent.id,
      name: agent.name,
      type: agent.type,
      config: agent.config,
    }));
  }

  /**
   * Nadzoruj vse profile
   */
  async monitorAllAccounts() {
    const results = [];
    
    for (const [id, agent] of this.profiles) {
      const result = await agent.monitorAccounts();
      results.push({
        profileId: id,
        profileName: agent.name,
        ...result,
      });
    }
    
    return results;
  }

  /**
   * Centraliziran AI nadzor vseh računov
   */
  async centralControl(command) {
    const prompt = `
CENTRALNI NADZOR - Komanda: ${command}

Preglej vse profile in izvedi zahtevano akcijo.
Poročaj o rezultatih za vsak profil posebej.
`;

    const systemPrompt = `${getAgentSystemPrompt(AGENT_TYPES.SOCIAL)}

SI CENTRALNI AI NADZORNIK - imaš dostop do vseh profilov:
${Array.from(this.profiles.values()).map(a => `- ${a.name}: ${a.config.socialAccounts?.join(', ')}`).join('\n')}

Koordiniraj aktivnosti med profili.
`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt },
    ];

    return aiService.sendToLMStudio(messages);
  }
}

// Singleton instanca
export const profileManager = new ProfileManager();

// Named exports
export const createProfileAgent = (config) => new ProfileAgent(config);
export const getProfileManager = () => profileManager;