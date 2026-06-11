/**
 * Real-time Chat Component
 * Timska komunikacija in sodelovanje
 */

import { useState, useRef, useEffect } from 'react';
import { 
  Send, Users, MessageSquare, Hash, AtSign, 
  Paperclip, Smile, MoreVertical, Search, Phone, Video
} from 'lucide-react';

export default function TeamChat() {
  const [activeChannel, setActiveChannel] = useState('general');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Ana', avatar: 'A', content: 'Pozdravljeni! Kako poteka projekt?', time: '10:23', channel: 'general' },
    { id: 2, user: 'Marko', avatar: 'M', content: 'Odlično! Zaključujem z dizajnom.', time: '10:25', channel: 'general' },
    { id: 3, user: 'Ana', avatar: 'A', content: '@Marko Super! Ali lahko deliš predogled?', time: '10:26', channel: 'general' },
    { id: 4, user: 'Marko', avatar: 'M', content: 'Seveda, tukaj je link: [predogled.pdf]', time: '10:28', channel: 'general' },
  ]);
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef(null);

  const channels = [
    { id: 'general', name: 'Splošno', icon: Hash },
    { id: 'projects', name: 'Projekti', icon: MessageSquare },
    { id: 'design', name: 'Dizajn', icon: MessageSquare },
    { id: 'random', name: 'Naključno', icon: MessageSquare },
  ];

  const users = [
    { id: 1, name: 'Ana K.', status: 'online', avatar: 'A' },
    { id: 2, name: 'Marko M.', status: 'online', avatar: 'M' },
    { id: 3, name: 'Petra S.', status: 'away', avatar: 'P' },
    { id: 4, name: 'Janez B.', status: 'offline', avatar: 'J' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages([...messages, {
      id: Date.now(),
      user: 'Ti',
      avatar: 'T',
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel: activeChannel,
    }]);
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const filteredMessages = messages.filter(m => m.channel === activeChannel);

  return (
    <div className="flex h-[600px] bg-card rounded-2xl border border-white/5 overflow-hidden">
      {/* Channels Sidebar */}
      <div className="w-64 border-r border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <h3 className="font-semibold mb-3">Kanali</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              type="text"
              placeholder="Iskanje..."
              className="w-full bg-white/5 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          {channels.map(channel => {
            const Icon = channel.icon;
            const unread = channel.id === 'projects' ? 3 : 0;
            return (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                  activeChannel === channel.id
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted hover:bg-white/5 hover:text-text'
                }`}
              >
                <Icon size={16} />
                <span className="flex-1 text-left">{channel.name}</span>
                {unread > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger text-white text-xs">
                    {unread}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Online Users */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <Users size={14} className="text-muted" />
            <span className="text-xs text-muted">Online ({users.filter(u => u.status === 'online').length})</span>
          </div>
          <div className="space-y-2">
            {users.filter(u => u.status === 'online').map(user => (
              <div key={user.id} className="flex items-center gap-2">
                <div className="relative">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-white">
                    {user.avatar}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-success border-2 border-card" />
                </div>
                <span className="text-sm">{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Hash size={20} className="text-muted" />
            <div>
              <h3 className="font-medium capitalize">{activeChannel}</h3>
              <p className="text-xs text-muted">{filteredMessages.length} sporočil</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text transition-colors">
              <Phone size={18} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text transition-colors">
              <Video size={18} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text transition-colors">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredMessages.map(msg => (
            <div key={msg.id} className="flex gap-3">
              <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-white">
                {msg.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-medium">{msg.user}</span>
                  <span className="text-xs text-muted">{msg.time}</span>
                </div>
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Napiši sporočilo..."
                className="w-full bg-white/5 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted"
                rows={1}
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-1">
                <button 
                  onClick={() => setShowEmoji(!showEmoji)}
                  className="flex h-7 w-7 items-center justify-center rounded text-muted hover:bg-white/5 hover:text-text transition-colors"
                >
                  <Smile size={18} />
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded text-muted hover:bg-white/5 hover:text-text transition-colors">
                  <Paperclip size={18} />
                </button>
              </div>
            </div>
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="flex items-center gap-4 mt-2 text-xs text-muted">
            <span><kbd className="bg-white/5 px-1 rounded">Enter</kbd> za pošiljanje</span>
            <span><kbd className="bg-white/5 px-1 rounded">@</kbd> za omenjanje</span>
          </div>
        </div>
      </div>

      {/* Emoji Picker */}
      {showEmoji && (
        <div className="absolute bottom-20 right-20 bg-card rounded-xl border border-white/5 p-4 shadow-xl">
          <div className="grid grid-cols-8 gap-2">
            {['😊', '👍', '❤️', '🎉', '🔥', '💯', '✅', '⭐', '🚀', '💪', '👏', '🎯', '💡', '🙏', '😎', '🤔'].map(emoji => (
              <button
                key={emoji}
                onClick={() => {
                  setMessage(prev => prev + emoji);
                  setShowEmoji(false);
                }}
                className="h-8 w-8 flex items-center justify-center text-xl hover:bg-white/5 rounded transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}