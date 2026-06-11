/**
 * Marketplace Page
 * Template marketplace, app integracije in freelancer directory
 */

import { useState } from 'react';
import { 
  Store, Search, Star, Download, ExternalLink,
  Layers, Palette, Code, FileText, BarChart, Users,
  Zap, Globe, Shield, Smartphone
} from 'lucide-react';

const categories = [
  { id: 'all', name: 'Vse', icon: Store, count: 48 },
  { id: 'templates', name: 'Predloge', icon: Layers, count: 15 },
  { id: 'integrations', name: 'Integracije', icon: Zap, count: 12 },
  { id: 'tools', name: 'Orodja', icon: Code, count: 8 },
  { id: 'freelancers', name: 'Freelancerji', icon: Users, count: 13 },
];

const templates = [
  {
    id: 1,
    name: 'Portfolio predloga',
    description: 'Profesionalna portfolio predloga za kreativce',
    author: 'DesignPro',
    rating: 4.8,
    downloads: 1250,
    price: 'Brezplačno',
    category: 'templates',
    icon: Palette,
  },
  {
    id: 2,
    name: 'Invoice Generator Pro',
    description: 'Avtomatsko generiranje profesionalnih faktur',
    author: 'FinanceTools',
    rating: 4.9,
    downloads: 890,
    price: '€19/mesečno',
    category: 'templates',
    icon: FileText,
  },
  {
    id: 3,
    name: 'CRM Dashboard Kit',
    description: 'Komplet komponent za CRM nadzorno ploščo',
    author: 'UI Master',
    rating: 4.7,
    downloads: 670,
    price: '€49',
    category: 'templates',
    icon: BarChart,
  },
];

const integrations = [
  {
    id: 1,
    name: 'Slack',
    description: 'Integracija s Slack za takojšnja obvestila',
    icon: '💬',
    connected: true,
    category: 'integrations',
  },
  {
    id: 2,
    name: 'Stripe',
    description: 'Plačilna integracija za Stripe',
    icon: '💳',
    connected: true,
    category: 'integrations',
  },
  {
    id: 3,
    name: 'Google Calendar',
    description: 'Sinhronizacija dogodkov s koledarjem',
    icon: '📅',
    connected: false,
    category: 'integrations',
  },
  {
    id: 4,
    name: 'QuickBooks',
    description: 'Avtomatska sinhronizacija računovodstva',
    icon: '📊',
    connected: false,
    category: 'integrations',
  },
  {
    id: 5,
    name: 'GitHub',
    description: 'Sledenje projektom preko GitHub',
    icon: '🐙',
    connected: true,
    category: 'integrations',
  },
  {
    id: 6,
    name: 'Zoom',
    description: 'Video konference integracija',
    icon: '🎥',
    connected: false,
    category: 'integrations',
  },
];

const freelancers = [
  {
    id: 1,
    name: 'Marko Horvat',
    title: 'Senior Full-Stack Developer',
    rating: 4.9,
    hourlyRate: '€65/uro',
    skills: ['React', 'Node.js', 'Python', 'AWS'],
    availability: 'Na voljo',
    avatar: 'MH',
  },
  {
    id: 2,
    name: 'Ana Kovač',
    title: 'UI/UX Designer',
    rating: 4.8,
    hourlyRate: '€55/uro',
    skills: ['Figma', 'Sketch', 'Prototyping', 'Research'],
    availability: 'Delno zaseden',
    avatar: 'AK',
  },
  {
    id: 3,
    name: 'Peter Novak',
    title: 'Digital Marketing Specialist',
    rating: 4.7,
    hourlyRate: '€45/uro',
    skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics'],
    availability: 'Na voljo',
    avatar: 'PN',
  },
];

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = () => {
    let items = [];
    
    if (activeCategory === 'all' || activeCategory === 'templates') {
      items = [...items, ...templates];
    }
    if (activeCategory === 'all' || activeCategory === 'integrations') {
      items = [...items, ...integrations];
    }
    if (activeCategory === 'all' || activeCategory === 'freelancers') {
      items = [...items, ...freelancers];
    }
    
    if (searchQuery) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return items;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/15">
            <Store className="text-secondary" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Marketplace</h1>
            <p className="text-sm text-muted">Predloge, integracije in freelancerji</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Išči predloge, integracije, freelancerje..."
          className="w-full bg-card rounded-xl pl-12 pr-4 py-3 text-sm border border-white/5 focus:outline-none focus:ring-2 focus:ring-secondary/50"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-secondary text-white'
                  : 'bg-white/5 text-muted hover:bg-white/10 hover:text-text'
              }`}
            >
              <Icon size={16} />
              {cat.name}
              <span className={`text-xs ${activeCategory === cat.id ? 'opacity-70' : ''}`}>
                ({cat.count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Templates */}
        {(activeCategory === 'all' || activeCategory === 'templates') && templates.map(template => (
          <TemplateCard key={template.id} template={template} />
        ))}

        {/* Integrations */}
        {(activeCategory === 'all' || activeCategory === 'integrations') && integrations.map(integration => (
          <IntegrationCard key={integration.id} integration={integration} />
        ))}

        {/* Freelancers */}
        {(activeCategory === 'all' || activeCategory === 'freelancers') && freelancers.map(freelancer => (
          <FreelancerCard key={freelancer.id} freelancer={freelancer} />
        ))}
      </div>
    </div>
  );
}

function TemplateCard({ template }) {
  const Icon = template.icon;
  
  return (
    <div className="bg-card rounded-2xl border border-white/5 p-6 hover:border-secondary/50 transition-colors group">
      <div className="flex items-start justify-between mb-4">
        <div className="h-12 w-12 rounded-xl bg-secondary/15 flex items-center justify-center">
          <Icon className="text-secondary" size={24} />
        </div>
        <div className="flex items-center gap-1">
          <Star className="text-warning fill-warning" size={14} />
          <span className="text-sm font-medium">{template.rating}</span>
        </div>
      </div>
      
      <h3 className="font-medium mb-1">{template.name}</h3>
      <p className="text-sm text-muted mb-4 line-clamp-2">{template.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">od {template.author}</span>
          <span className="text-xs text-muted">•</span>
          <span className="text-xs text-muted">{template.downloads.toLocaleString()} prenosov</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
        <span className="text-sm font-medium text-secondary">{template.price}</span>
        <button className="flex items-center gap-1 text-sm text-secondary hover:underline">
          <Download size={14} />
          Namesti
        </button>
      </div>
    </div>
  );
}

function IntegrationCard({ integration }) {
  return (
    <div className="bg-card rounded-2xl border border-white/5 p-6 hover:border-secondary/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{integration.icon}</span>
        {integration.connected && (
          <span className="text-xs bg-success/15 text-success px-2 py-0.5 rounded">Povezano</span>
        )}
      </div>
      
      <h3 className="font-medium mb-1">{integration.name}</h3>
      <p className="text-sm text-muted">{integration.description}</p>
      
      <div className="mt-4">
        <button className={`w-full rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
          integration.connected
            ? 'bg-white/5 text-muted hover:bg-white/10'
            : 'bg-secondary text-white hover:bg-secondary/90'
        }`}>
          {integration.connected ? 'Konfigurirano' : 'Poveži'}
        </button>
      </div>
    </div>
  );
}

function FreelancerCard({ freelancer }) {
  const availabilityColors = {
    'Na voljo': 'bg-success/15 text-success',
    'Delno zaseden': 'bg-warning/15 text-warning',
    'Zaseden': 'bg-danger/15 text-danger',
  };
  
  return (
    <div className="bg-card rounded-2xl border border-white/5 p-6 hover:border-secondary/50 transition-colors">
      <div className="flex items-start gap-4 mb-4">
        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-lg font-bold text-white">
          {freelancer.avatar}
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{freelancer.name}</h3>
          <p className="text-sm text-muted">{freelancer.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <Star className="text-warning fill-warning" size={12} />
            <span className="text-sm">{freelancer.rating}</span>
            <span className="text-sm text-muted">•</span>
            <span className={`text-xs px-2 py-0.5 rounded ${availabilityColors[freelancer.availability]}`}>
              {freelancer.availability}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {freelancer.skills.map(skill => (
          <span key={skill} className="text-xs bg-white/5 px-2 py-1 rounded">
            {skill}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <span className="text-sm font-medium text-secondary">{freelancer.hourlyRate}</span>
        <button className="flex items-center gap-1 text-sm text-secondary hover:underline">
          Kontaktiraj
          <ExternalLink size={12} />
        </button>
      </div>
    </div>
  );
}