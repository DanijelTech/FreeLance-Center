/**
 * AI Assistant Component
 * Glavni AI pomočnik v aplikaciji
 */

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, Loader2, X, Settings, Trash2 } from 'lucide-react';
import aiService from '../../services/ai/aiService';
import { AGENT_TYPES } from '../../services/ai/aiConfig';

export default function AIAssistant({ agentType = AGENT_TYPES.CONTENT, compact = false }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = input.trim();
    setInput('');
    setLoading(true);
    
    // Dodaj uporabnikovo sporočilo
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    try {
      const response = await aiService.chat(agentType, userMessage);
      
      if (response.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: response.content }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `Napaka: ${response.error}. Preveri povezavo z LM Studio.`,
          isError: true 
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Napaka: ${error.message}`,
        isError: true 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([]);
    aiService.clearConversation();
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Bot className="text-primary" size={20} />
        <span className="text-sm text-muted">AI Asistent</span>
        <div className="flex h-2 w-2">
          <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-card rounded-2xl border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
            <Sparkles className="text-primary" size={20} />
          </div>
          <div>
            <h3 className="font-semibold">AI Asistent</h3>
            <p className="text-xs text-muted">Powered by LM Studio</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text transition-colors"
          >
            <Settings size={16} />
          </button>
          <button
            onClick={clearChat}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-danger transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Bot className="text-muted mb-4" size={48} />
            <h4 className="font-medium mb-2">Pozdravljen! 👋</h4>
            <p className="text-sm text-muted max-w-xs">
              Sem AI asistent, ki ti lahko pomaga pri ustvarjanju vsebin, 
              upravljanju socialnih omrežij in še veliko več.
            </p>
          </div>
        )}
        
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-primary text-white rounded-br-md'
                  : msg.isError
                  ? 'bg-danger/20 text-danger'
                  : 'bg-white/5 text-text rounded-bl-md'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2 text-xs text-muted">
                  <Bot size={14} />
                  <span>AI Asistent</span>
                </div>
              )}
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/5 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-2 text-muted">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-sm">Razmišljam...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/5 p-4">
        <div className="flex items-end gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Vprašaj me karkoli..."
            className="flex-1 bg-white/5 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-xs text-muted mt-2">
          Pritisni Enter za pošiljanje, Shift+Enter za novo vrstico
        </p>
      </div>
    </div>
  );
}