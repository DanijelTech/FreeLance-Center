/**
 * Knowledge Base & Wiki Page
 * Dokumentacija, predloge in team knowledge
 */

import { useState } from 'react';
import { 
  Book, Search, FileText, Folder, Plus, 
  Edit, Trash2, Clock, User, ChevronRight,
  Star, BookOpen, MessageSquare
} from 'lucide-react';

const docs = [
  {
    id: 1,
    title: 'Kako začeti s projektom',
    category: 'Getting Started',
    type: 'guide',
    views: 1250,
    lastUpdated: '2024-01-15',
    author: 'Ana K.',
    content: 'Ta vodič vas bo popeljal skozi osnovne korake za začetek novega projekta...',
  },
  {
    id: 2,
    title: 'API dokumentacija',
    category: 'Developers',
    type: 'api',
    views: 890,
    lastUpdated: '2024-01-14',
    author: 'Marko M.',
    content: 'Naša REST API omogoča integracijo z zunanjimi sistemi...',
  },
  {
    id: 3,
    title: 'Pogosta vprašanja (FAQ)',
    category: 'Support',
    type: 'faq',
    views: 2100,
    lastUpdated: '2024-01-10',
    author: 'Podpora',
    content: 'Odgovori na najpogostejša vprašanja uporabnikov...',
  },
  {
    id: 4,
    title: 'Varnostne smernice',
    category: 'Security',
    type: 'policy',
    views: 456,
    lastUpdated: '2024-01-05',
    author: 'Admin',
    content: 'Varnostne politike in najboljše prakse za varovanje podatkov...',
  },
];

const templates = [
  { id: 1, name: 'Projektni načrt', type: 'project', usage: 45 },
  { id: 2, name: 'Pogodba o delu', type: 'contract', usage: 32 },
  { id: 3, name: 'Ponudba za stranko', type: 'quote', usage: 28 },
  { id: 4, name: 'Sestanek zapisnik', type: 'meeting', usage: 56 },
  { id: 5, name: 'Poročilo o napredku', type: 'report', usage: 23 },
];

const categories = [
  { id: 'all', name: 'Vse', count: docs.length },
  { id: 'guides', name: 'Vodiči', count: 12 },
  { id: 'api', name: 'API', count: 8 },
  { id: 'policies', name: 'Politike', count: 5 },
  { id: 'templates', name: 'Predloge', count: 15 },
];

export default function KnowledgeBase() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);

  const filteredDocs = docs.filter(doc => {
    const matchesCategory = activeCategory === 'all' || doc.category.toLowerCase().includes(activeCategory);
    const matchesSearch = !searchQuery || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
            <Book className="text-primary" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Knowledge Base</h1>
            <p className="text-sm text-muted">Dokumentacija, vodiči in predloge</p>
          </div>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90">
          <Plus size={16} />
          Nov dokument
        </button>
      </div>

      {/* Search & Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Išči dokumentacijo..."
              className="w-full bg-white/5 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Categories */}
          <div className="bg-card rounded-2xl border border-white/5 p-4">
            <h3 className="text-sm font-medium mb-3">Kategorije</h3>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted hover:bg-white/5 hover:text-text'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-xs">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-card rounded-2xl border border-white/5 p-4">
            <h3 className="text-sm font-medium mb-3">Hitre povezave</h3>
            <div className="space-y-2">
              <QuickLink icon={FileText} label="Nov projekt vodič" />
              <QuickLink icon={BookOpen} label="API Reference" />
              <QuickLink icon={MessageSquare} label="Kontaktiraj podporo" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-4">
          {selectedDoc ? (
            <DocumentView doc={selectedDoc} onBack={() => setSelectedDoc(null)} />
          ) : (
            <>
              {/* Templates Section */}
              <div className="bg-card rounded-2xl border border-white/5 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Priljubljene predloge</h3>
                  <button className="text-sm text-primary hover:underline">Poglej vse</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {templates.map(template => (
                    <button
                      key={template.id}
                      className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-left"
                    >
                      <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center">
                        <FileText className="text-primary" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{template.name}</p>
                        <p className="text-xs text-muted">{template.usage} uporab</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Documents List */}
              <div className="bg-card rounded-2xl border border-white/5 overflow-hidden">
                <div className="p-4 border-b border-white/5">
                  <h3 className="font-medium">Dokumenti</h3>
                </div>
                <div className="divide-y divide-white/5">
                  {filteredDocs.map(doc => (
                    <button
                      key={doc.id}
                      onClick={() => setSelectedDoc(doc)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors text-left"
                    >
                      <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <FileText className="text-muted" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{doc.title}</h4>
                          <TypeBadge type={doc.type} />
                        </div>
                        <p className="text-sm text-muted line-clamp-1">{doc.content}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted">
                          <span className="flex items-center gap-1">
                            <User size={12} />
                            {doc.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {doc.lastUpdated}
                          </span>
                          <span>{doc.views.toLocaleString()} ogledov</span>
                        </div>
                      </div>
                      <ChevronRight className="text-muted shrink-0" size={20} />
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function DocumentView({ doc, onBack }) {
  return (
    <div className="bg-card rounded-2xl border border-white/5 overflow-hidden">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors"
        >
          ← Nazaj
        </button>
        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-muted hover:bg-white/10 hover:text-text transition-colors">
            <Edit size={14} />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-muted hover:bg-white/10 hover:text-danger transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <TypeBadge type={doc.type} large />
          <span className="text-sm text-muted">v {doc.category}</span>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">{doc.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-muted mb-6">
          <span className="flex items-center gap-1">
            <User size={14} />
            {doc.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            Posodobljeno: {doc.lastUpdated}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen size={14} />
            {doc.views.toLocaleString()} ogledov
          </span>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-muted leading-relaxed">{doc.content}</p>
          <p className="text-muted leading-relaxed mt-4">
            [Full documentation content would go here...]
          </p>
        </div>
        
        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5">
          <button className="flex items-center gap-2 text-sm text-primary hover:underline">
            <Star size={14} />
            Markiraj kot koristno
          </button>
          <button className="flex items-center gap-2 text-sm text-muted hover:text-text">
            <MessageSquare size={14} />
            Komentiraj
          </button>
        </div>
      </div>
    </div>
  );
}

function TypeBadge({ type, large }) {
  const styles = {
    guide: 'bg-primary/15 text-primary',
    api: 'bg-secondary/15 text-secondary',
    faq: 'bg-warning/15 text-warning',
    policy: 'bg-danger/15 text-danger',
  };
  
  const labels = {
    guide: 'Vodič',
    api: 'API',
    faq: 'FAQ',
    policy: 'Politika',
  };
  
  return (
    <span className={`${styles[type]} ${large ? 'text-xs px-2 py-1' : 'text-[10px] px-1.5 py-0.5'} rounded`}>
      {labels[type]}
    </span>
  );
}

function QuickLink({ icon: Icon, label }) {
  return (
    <button className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted hover:bg-white/5 hover:text-text transition-colors">
      <Icon size={14} />
      {label}
    </button>
  );
}