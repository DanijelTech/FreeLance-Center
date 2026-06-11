/**
 * Hermes Agent Integration
 * Povezava z nousresearch/hermes-agent za napredne AI operacije
 */

import { AI_CONFIG } from './aiConfig.js';

class HermesAgentService {
  constructor() {
    this.endpoint = AI_CONFIG.hermes.endpoint;
    this.sessionId = null;
    this.tools = this.initializeTools();
  }

  /**
   * Inicializiraj razpoložljiva orodja za agenta
   */
  initializeTools() {
    return {
      // Social Media orodja
      post_to_instagram: {
        name: 'post_to_instagram',
        description: 'Objavi vsebino na Instagram',
        parameters: {
          type: 'object',
          properties: {
            image_url: { type: 'string', description: 'URL slike' },
            caption: { type: 'string', description: 'Besedilo objave' },
            hashtags: { type: 'array', items: { type: 'string' } },
          },
          required: ['caption'],
        },
      },
      post_to_facebook: {
        name: 'post_to_facebook',
        description: 'Objavi vsebino na Facebook',
        parameters: {
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Besedilo objave' },
            link: { type: 'string', description: 'Povezava' },
          },
          required: ['message'],
        },
      },
      post_to_linkedin: {
        name: 'post_to_linkedin',
        description: 'Objavi vsebino na LinkedIn',
        parameters: {
          type: 'object',
          properties: {
            content: { type: 'string', description: 'Besedilo objave' },
            visibility: { type: 'string', enum: ['public', 'connections'] },
          },
          required: ['content'],
        },
      },
      post_to_twitter: {
        name: 'post_to_twitter',
        description: 'Objavi tweet na X/Twitter',
        parameters: {
          type: 'object',
          properties: {
            text: { type: 'string', description: 'Besedilo tweeta' },
          },
          required: ['text'],
        },
      },

      // CRM orodja
      send_email: {
        name: 'send_email',
        description: 'Pošlji email stranki',
        parameters: {
          type: 'object',
          properties: {
            to: { type: 'string', description: 'Email naslov' },
            subject: { type: 'string', description: 'Zadeva' },
            body: { type: 'string', description: 'Vsebina' },
          },
          required: ['to', 'subject', 'body'],
        },
      },
      create_invoice: {
        name: 'create_invoice',
        description: 'Ustvari fakturo',
        parameters: {
          type: 'object',
          properties: {
            client_id: { type: 'string' },
            items: { type: 'array' },
            due_date: { type: 'string' },
          },
          required: ['client_id', 'items'],
        },
      },
      update_crm_record: {
        name: 'update_crm_record',
        description: 'Posodobi CRM zapis',
        parameters: {
          type: 'object',
          properties: {
            record_id: { type: 'string' },
            field: { type: 'string' },
            value: { type: 'string' },
          },
          required: ['record_id', 'field', 'value'],
        },
      },

      // Projektna orodja
      create_task: {
        name: 'create_task',
        description: 'Ustvari nalogo v projektu',
        parameters: {
          type: 'object',
          properties: {
            project_id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            priority: { type: 'string', enum: ['low', 'medium', 'high', 'urgent'] },
            assignee: { type: 'string' },
          },
          required: ['project_id', 'title'],
        },
      },
      update_task_status: {
        name: 'update_task_status',
        description: 'Posodobi status naloge',
        parameters: {
          type: 'object',
          properties: {
            task_id: { type: 'string' },
            status: { type: 'string', enum: ['todo', 'in_progress', 'review', 'done'] },
          },
          required: ['task_id', 'status'],
        },
      },

      // Splošna orodja
      search_web: {
        name: 'search_web',
        description: 'Iskanje po spletu',
        parameters: {
          type: 'object',
          properties: {
            query: { type: 'string' },
            max_results: { type: 'number', default: 5 },
          },
          required: ['query'],
        },
      },
      analyze_sentiment: {
        name: 'analyze_sentiment',
        description: 'Analiziraj čustvo besedila',
        parameters: {
          type: 'object',
          properties: {
            text: { type: 'string' },
          },
          required: ['text'],
        },
      },
      translate_text: {
        name: 'translate_text',
        description: 'Prevedi besedilo',
        parameters: {
          type: 'object',
          properties: {
            text: { type: 'string' },
            target_language: { type: 'string' },
          },
          required: ['text', 'target_language'],
        },
      },
      generate_report: {
        name: 'generate_report',
        description: 'Ustvari poročilo',
        parameters: {
          type: 'object',
          properties: {
            type: { type: 'string', enum: ['daily', 'weekly', 'monthly', 'custom'] },
            sections: { type: 'array' },
            format: { type: 'string', enum: ['json', 'markdown', 'pdf'] },
          },
          required: ['type'],
        },
      },
    };
  }

  /**
   * Začni novo Hermes Agent sejo
   */
  async startSession(userId, initialContext = {}) {
    try {
      const response = await fetch(`${this.endpoint}/session/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          context: {
            ...initialContext,
            tools: Object.keys(this.tools),
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        this.sessionId = data.session_id;
        return {
          success: true,
          sessionId: this.sessionId,
          tools: this.tools,
        };
      }

      return {
        success: false,
        error: `Napaka pri začetku seje: ${response.status}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Pošlji sporočilo Hermes Agentu
   */
  async sendMessage(message, options = {}) {
    if (!this.sessionId) {
      return {
        success: false,
        error: 'Ni aktivne seje. Najprej kliči startSession().',
      };
    }

    try {
      const response = await fetch(`${this.endpoint}/session/${this.sessionId}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          stream: options.stream || false,
          context_window: options.contextWindow || 4096,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          response: data.response,
          tools_used: data.tools_used || [],
          metadata: data.metadata,
        };
      }

      return {
        success: false,
        error: `Napaka: ${response.status}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Izvedi akcijo preko agenta
   */
  async executeAction(action, params) {
    const tool = this.tools[action];
    if (!tool) {
      return {
        success: false,
        error: `Neznano orodje: ${action}`,
      };
    }

    try {
      const response = await fetch(`${this.endpoint}/tools/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool: action,
          parameters: params,
          session_id: this.sessionId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          result: data.result,
          logs: data.logs,
        };
      }

      return {
        success: false,
        error: `Napaka pri izvedbi: ${response.status}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Konec seje
   */
  async endSession() {
    if (!this.sessionId) return { success: true };

    try {
      await fetch(`${this.endpoint}/session/${this.sessionId}/end`, {
        method: 'POST',
      });
      this.sessionId = null;
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Preveri status povezave
   */
  async checkHealth() {
    try {
      const response = await fetch(`${this.endpoint}/health`);
      if (response.ok) {
        const data = await response.json();
        return {
          connected: true,
          status: data.status,
          version: data.version,
          available_tools: data.tools?.length || 0,
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
   * Pridobi seznam razpoložljivih orodij
   */
  getAvailableTools() {
    return Object.values(this.tools);
  }

  /**
   * Pridobi specifično orodje
   */
  getTool(toolName) {
    return this.tools[toolName] || null;
  }
}

// Singleton instanca
const hermesService = new HermesAgentService();
export default hermesService;

// Named exports
export const startHermesSession = (userId, context) => hermesService.startSession(userId, context);
export const sendToHermes = (message, options) => hermesService.sendMessage(message, options);
export const executeHermesAction = (action, params) => hermesService.executeAction(action, params);
export const endHermesSession = () => hermesService.endSession();
export const checkHermesHealth = () => hermesService.checkHealth();
export const getHermesTools = () => hermesService.getAvailableTools();