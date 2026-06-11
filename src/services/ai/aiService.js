/**
 * AI Service - Komunikacija z LM Studio in Hermes Agent
 * Centraliziran API za vse AI operacije
 */

import { AI_CONFIG, AGENT_TYPES } from './aiConfig.js';
import { getAgentSystemPrompt, createUserPrompt } from './systemPrompts.js';

class AIService {
  constructor() {
    this.lmStudioUrl = AI_CONFIG.lmStudio.baseUrl;
    this.apiKey = AI_CONFIG.lmStudio.apiKey;
    this.defaults = AI_CONFIG.defaults;
    this.conversations = new Map(); // Shranjevanje kontekstov
  }

  /**
   * Pošlji zahtevo k LM Studio API
   */
  async sendToLMStudio(messages, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), AI_CONFIG.lmStudio.timeout);

    try {
      const response = await fetch(`${this.lmStudioUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: AI_CONFIG.lmStudio.model,
          messages,
          temperature: options.temperature ?? this.defaults.temperature,
          max_tokens: options.maxTokens ?? this.defaults.maxTokens,
          top_p: options.topP ?? this.defaults.topP,
          frequency_penalty: options.frequencyPenalty ?? this.defaults.frequencyPenalty,
          presence_penalty: options.presencePenalty ?? this.defaults.presencePenalty,
          stream: options.stream ?? false,
        }),
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`LM Studio API napaka: ${response.status} - ${error}`);
      }

      const data = await response.json();
      return {
        success: true,
        content: data.choices?.[0]?.message?.content || '',
        usage: data.usage,
        model: data.model,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        return {
          success: false,
          error: 'Časovna omejitev (timeout) - LM Studio ne odgovarja',
        };
      }
      
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Kompletiraj besedilo (completion)
   */
  async complete(prompt, options = {}) {
    const messages = [
      { role: 'user', content: prompt }
    ];
    
    return this.sendToLMStudio(messages, options);
  }

  /**
   * Klepetaj z AI agentom
   */
  async chat(agentType, userMessage, context = {}) {
    // Pridobi sistemski prompt za agenta
    const systemPrompt = getAgentSystemPrompt(agentType);
    
    // Pridobi ali ustvari konverzacijo
    const conversationId = context.conversationId || `conv_${Date.now()}`;
    if (!this.conversations.has(conversationId)) {
      this.conversations.set(conversationId, []);
    }
    
    const conversation = this.conversations.get(conversationId);
    
    // Dodaj sistemski in uporabniški message
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversation.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user', content: createUserPrompt(userMessage, context) },
    ];

    const response = await this.sendToLMStudio(messages, {
      temperature: options?.temperature,
      maxTokens: options?.maxTokens,
    });

    // Shrani v zgodovino
    if (response.success) {
      conversation.push(
        { role: 'user', content: userMessage },
        { role: 'assistant', content: response.content }
      );
      
      // Omeji zgodovino na zadnjih 20 sporočil
      if (conversation.length > 40) {
        conversation.splice(0, conversation.length - 40);
      }
    }

    return {
      ...response,
      conversationId,
    };
  }

  /**
   * Klic specifičnega agenta za nalogo
   */
  async callAgent(agentType, task, profileContext = {}) {
    const agentConfig = this.getAgentSystemPrompt(agentType);
    
    // Specifični prompt glede na nalogo in profil
    let taskPrompt = '';
    
    switch (agentType) {
      case AGENT_TYPES.CONTENT:
        taskPrompt = this.getContentTaskPrompt(task, profileContext);
        break;
      case AGENT_TYPES.SOCIAL:
        taskPrompt = this.getSocialTaskPrompt(task, profileContext);
        break;
      case AGENT_TYPES.CRM:
        taskPrompt = this.getCRMTaskPrompt(task, profileContext);
        break;
      case AGENT_TYPES.FINANCE:
        taskPrompt = this.getFinanceTaskPrompt(task, profileContext);
        break;
      default:
        taskPrompt = task;
    }

    return this.chat(agentType, taskPrompt, profileContext);
  }

  /**
   * Prompt za Content naloge
   */
  getContentTaskPrompt(task, profileContext) {
    const { platform, topic, tone, targetAudience } = profileContext;
    return `
NALOGA: ${task}

PLATFORMA: ${platform || 'Instagram'}
TEMATIKA: ${topic || 'Splošno'}
TON: ${tone || 'Profesionalen'}
CILJNA PUBLIKA: ${targetAudience || 'Splošna javnost'}

Prosim ustvari:
1. Besedilo objave (caption)
2. Seznam hashtagov
3. Predlagan čas objave
4. Call-to-action (CTA)

Odgovori v JSON formatu.
`;
  }

  /**
   * Prompt za Social Media naloge
   */
  getSocialTaskPrompt(task, profileContext) {
    const { accountType, engagementGoal } = profileContext;
    return `
NALOGA: ${task}

TIP RAČUNA: ${accountType || 'Poslovni'}
CILJ ANGAŽIRANOSTI: ${engagementGoal || 'Povečanje sledilcev'}

Analiziraj in pripravi akcijski načrt za socialna omrežja.
`;
  }

  /**
   * Prompt za CRM naloge
   */
  getCRMTaskPrompt(task, profileContext) {
    const { clientName, dealValue, pipelineStage } = profileContext;
    return `
NALOGA: ${task}

STRANKA: ${clientName || 'Neznana'}
VREDNOST POSLA: ${dealValue || 'TBD'} EUR
FAZA PIPELINE-A: ${pipelineStage || 'Lead'}

Pripravi odgovor, ponudbo ali follow-up sporočilo.
`;
  }

  /**
   * Prompt za Finance naloge
   */
  getFinanceTaskPrompt(task, profileContext) {
    const { invoiceDetails, clientInfo } = profileContext;
    return `
NALOGA: ${task}

DETAJLI FAKTURE: ${JSON.stringify(invoiceDetails || {})}
STRANKA: ${JSON.stringify(clientInfo || {})}

Izračunaj in pripravi finančni dokument.
Upoštevaj slovenski davčni sistem (DDV 22%).
`;
  }

  /**
   * Preveri povezavo z LM Studio
   */
  async checkConnection() {
    try {
      const response = await fetch(`${this.lmStudioUrl}/models`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        return {
          connected: true,
          models: data.data || [],
        };
      }
      
      return {
        connected: false,
        error: `Status: ${response.status}`,
      };
    } catch (error) {
      return {
        connected: false,
        error: error.message,
      };
    }
  }

  /**
   * Počisti zgodovino konverzacije
   */
  clearConversation(conversationId) {
    if (conversationId && this.conversations.has(conversationId)) {
      this.conversations.delete(conversationId);
      return true;
    }
    return false;
  }

  /**
   * Streaming odgovor (za future implementacijo)
   */
  async *streamChat(agentType, userMessage, context = {}) {
    const systemPrompt = getAgentSystemPrompt(agentType);
    
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: createUserPrompt(userMessage, context) },
    ];

    const controller = new AbortController();
    
    try {
      const response = await fetch(`${this.lmStudioUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: AI_CONFIG.lmStudio.model,
          messages,
          stream: true,
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') return;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) yield content;
            } catch {}
          }
        }
      }
    } finally {
      controller.abort();
    }
  }
}

// Singleton instanca
const aiService = new AIService();
export default aiService;

// Named exports za posamezne funkcije
export const sendToLMStudio = (messages, options) => aiService.sendToLMStudio(messages, options);
export const complete = (prompt, options) => aiService.complete(prompt, options);
export const chat = (agentType, message, context) => aiService.chat(agentType, message, context);
export const callAgent = (agentType, task, context) => aiService.callAgent(agentType, task, context);
export const checkConnection = () => aiService.checkConnection();
export const clearConversation = (id) => aiService.clearConversation(id);