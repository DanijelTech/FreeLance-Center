/**
 * Collaboration Page
 * Komunikacija, timska sodelovanja in integracije
 */

import { useState } from 'react';
import { 
  MessageSquare, Video, Users, FileText, 
  Calendar, Share2, Mic, Camera, Phone
} from 'lucide-react';
import TeamChat from '../components/collaboration/TeamChat';

export default function Collaboration() {
  const [activeTab, setActiveTab] = useState('chat');

  const tabs = [
    { id: 'chat', label: 'Timski Klepet', icon: MessageSquare },
    { id: 'meetings', label: 'Sestanki', icon: Video },
    { id: 'files', label: 'Datoteke', icon: FileText },
    { id: 'whiteboard', label: 'Whiteboard', icon: Share2 },
  ];

  const upcomingMeetings = [
    { id: 1, title: 'Sprint Review', time: '10:00', date: 'Danes', participants: 4, type: 'video' },
    { id: 2, title: '1:1 z Markotom', time: '14:00', date: 'Danes', participants: 2, type: 'call' },
    { id: 3, title: 'Product Planning', time: '09:00', date: 'Jutri', participants: 6, type: 'video' },
  ];

  const recentFiles = [
    { id: 1, name: 'Q1_Report_Final.pdf', size: '2.4 MB', modified: 'Pred 2 urama', type: 'pdf' },
    { id: 2, name: 'Design_Mockups_v2.fig', size: '15.8 MB', modified: 'Pred 5 urami', type: 'figma' },
    { id: 3, name: 'Meeting_Notes_Jan.docx', size: '156 KB', modified: 'Včeraj', type: 'doc' },
    { id: 4, name: 'Budget_Spreadsheet.xlsx', size: '890 KB', modified: 'Pred 3 dnevi', type: 'excel' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/15">
            <Users className="text-secondary" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Sodelovanje</h1>
            <p className="text-sm text-muted">Timska komunikacija in koordinacija</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-secondary/90">
            <Video size={16} />
            Začni sestanek
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10">
            <Share2 size={16} />
            Deli zaslon
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/5">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-muted hover:text-text'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {activeTab === 'chat' && (
        <TeamChat />
      )}

      {activeTab === 'meetings' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Meetings */}
            <div className="bg-card rounded-2xl border border-white/5 p-6">
              <h3 className="text-lg font-medium mb-4">Prihajajoči sestanki</h3>
              <div className="space-y-4">
                {upcomingMeetings.map(meeting => (
                  <div key={meeting.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                        meeting.type === 'video' ? 'bg-primary/15 text-primary' : 'bg-secondary/15 text-secondary'
                      }`}>
                        {meeting.type === 'video' ? <Video size={20} /> : <Phone size={20} />}
                      </div>
                      <div>
                        <h4 className="font-medium">{meeting.title}</h4>
                        <p className="text-sm text-muted">{meeting.date} ob {meeting.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {Array.from({ length: meeting.participants }).map((_, i) => (
                          <div key={i} className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-card flex items-center justify-center text-xs font-bold text-white">
                            {String.fromCharCode(65 + i)}
                          </div>
                        ))}
                      </div>
                      <button className="flex items-center gap-1 rounded-lg bg-secondary/15 px-3 py-1.5 text-sm text-secondary hover:bg-secondary/25 transition-colors">
                        Pridruži se
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Schedule */}
            <div className="bg-card rounded-2xl border border-white/5 p-6">
              <h3 className="text-lg font-medium mb-4">Hitro razporedi sestanek</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Naslov sestanka"
                  className="bg-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
                />
                <input
                  type="datetime-local"
                  className="bg-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
                />
                <select className="bg-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50">
                  <option>15 minut</option>
                  <option>30 minut</option>
                  <option>45 minut</option>
                  <option>1 uro</option>
                </select>
                <button className="flex items-center justify-center gap-2 rounded-xl bg-secondary text-white font-medium transition-colors hover:bg-secondary/90">
                  <Calendar size={16} />
                  Razporedi
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-white/5 p-6">
              <h4 className="font-medium mb-4">Video konference integracije</h4>
              <div className="space-y-3">
                <IntegrationButton icon="🎥" name="Zoom" connected />
                <IntegrationButton icon="📹" name="Google Meet" connected />
                <IntegrationButton icon="💬" name="Microsoft Teams" />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'files' && (
        <div className="bg-card rounded-2xl border border-white/5 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium">Nedavne datoteke</h3>
            <button className="flex items-center gap-2 rounded-xl bg-secondary/15 px-4 py-2 text-sm text-secondary hover:bg-secondary/25 transition-colors">
              <Share2 size={14} />
              Naloži datoteko
            </button>
          </div>
          <div className="space-y-3">
            {recentFiles.map(file => (
              <div key={file.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center text-lg">
                    {file.type === 'pdf' ? '📄' : file.type === 'figma' ? '🎨' : file.type === 'doc' ? '📝' : '📊'}
                  </div>
                  <div>
                    <h4 className="font-medium">{file.name}</h4>
                    <p className="text-sm text-muted">{file.size} • {file.modified}</p>
                  </div>
                </div>
                <button className="text-muted hover:text-text">
                  <Share2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'whiteboard' && (
        <div className="bg-card rounded-2xl border border-white/5 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium">Whiteboard za brainstorming</h3>
            <div className="flex items-center gap-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-muted hover:bg-white/10 hover:text-text">
                <Camera size={16} />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-muted hover:bg-white/10 hover:text-text">
                <Share2 size={16} />
              </button>
            </div>
          </div>
          <div className="aspect-video bg-white/5 rounded-xl flex items-center justify-center border-2 border-dashed border-white/10">
            <div className="text-center">
              <Share2 className="mx-auto text-muted mb-4" size={48} />
              <p className="text-muted mb-2">Whiteboard bo na voljo kmalu</p>
              <p className="text-xs text-muted">Integracija z Miro, FigJam ali Excalidraw</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function IntegrationButton({ icon, name, connected }) {
  return (
    <button className={`w-full flex items-center gap-3 rounded-xl p-3 transition-colors ${
      connected ? 'bg-success/10 text-success' : 'bg-white/5 text-muted hover:bg-white/10 hover:text-text'
    }`}>
      <span className="text-xl">{icon}</span>
      <span className="flex-1 text-left text-sm font-medium">{name}</span>
      {connected ? (
        <span className="text-xs bg-success/15 px-2 py-0.5 rounded">Povezano</span>
      ) : (
        <span className="text-xs">Poveži</span>
      )}
    </button>
  );
}