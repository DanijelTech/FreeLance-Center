/**
 * Stripe Payment Integration Component
 * Plačila, fakture in transakcije
 */

import { useState } from 'react';
import { 
  CreditCard, DollarSign, FileText, Download, 
  Check, Clock, AlertCircle, Plus, ArrowUpRight,
  Receipt, Building, User
} from 'lucide-react';

const transactions = [
  { id: 'TXN001', client: 'TechCorp d.o.o.', amount: 2500, date: '2024-01-15', status: 'completed', type: 'invoice' },
  { id: 'TXN002', client: 'StartupXYZ', amount: 850, date: '2024-01-14', status: 'pending', type: 'subscription' },
  { id: 'TXN003', client: 'Design Studio', amount: 1200, date: '2024-01-12', status: 'completed', type: 'invoice' },
  { id: 'TXN004', client: 'Marketing Pro', amount: 450, date: '2024-01-10', status: 'failed', type: 'payment' },
];

const invoices = [
  { id: 'INV-2024-001', client: 'TechCorp d.o.o.', amount: 2500, status: 'paid', date: '2024-01-01', dueDate: '2024-01-15' },
  { id: 'INV-2024-002', client: 'StartupXYZ', amount: 850, status: 'sent', date: '2024-01-10', dueDate: '2024-01-25' },
  { id: 'INV-2024-003', client: 'Design Studio', amount: 1200, status: 'paid', date: '2024-01-05', dueDate: '2024-01-12' },
  { id: 'INV-2024-004', client: 'Marketing Pro', amount: 3200, status: 'overdue', date: '2023-12-20', dueDate: '2024-01-05' },
];

export default function Payments() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNewInvoice, setShowNewInvoice] = useState(false);

  const stats = {
    totalRevenue: 15420,
    pendingPayments: 3850,
    overdueInvoices: 3200,
    monthlyGrowth: 12.5,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/15">
            <CreditCard className="text-success" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Plačila & Finance</h1>
            <p className="text-sm text-muted">Stripe integracija, fakture in transakcije</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10">
            <Download size={16} />
            Export
          </button>
          <button
            onClick={() => setShowNewInvoice(true)}
            className="flex items-center gap-2 rounded-xl bg-success px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-success/90"
          >
            <Plus size={16} />
            Nova faktura
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={DollarSign}
          label="Skupni prihodek"
          value={`€${stats.totalRevenue.toLocaleString()}`}
          trend="+12.5%"
          color="success"
        />
        <StatCard
          icon={Clock}
          label="Čakajoča plačila"
          value={`€${stats.pendingPayments.toLocaleString()}`}
          color="warning"
        />
        <StatCard
          icon={AlertCircle}
          label="Zapadla plačila"
          value={`€${stats.overdueInvoices.toLocaleString()}`}
          color="danger"
        />
        <StatCard
          icon={Receipt}
          label="Fakture ta mesec"
          value={invoices.length.toString()}
          color="primary"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/5">
        <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} label="Pregled" />
        <TabButton active={activeTab === 'transactions'} onClick={() => setActiveTab('transactions')} label="Transakcije" />
        <TabButton active={activeTab === 'invoices'} onClick={() => setActiveTab('invoices')} label="Fakture" />
        <TabButton active={activeTab === 'payments'} onClick={() => setActiveTab('payments')} label="Plačilne metode" />
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <div className="bg-card rounded-2xl border border-white/5 p-6">
            <h3 className="text-lg font-medium mb-4">Zadnje transakcije</h3>
            <div className="space-y-3">
              {transactions.slice(0, 4).map(txn => (
                <TransactionRow key={txn.id} transaction={txn} />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-2xl border border-white/5 p-6">
            <h3 className="text-lg font-medium mb-4">Hitre akcije</h3>
            <div className="grid grid-cols-2 gap-4">
              <QuickAction icon={FileText} label="Ustvari fakturo" color="primary" />
              <QuickAction icon={Download} label="Export poročila" color="secondary" />
              <QuickAction icon={CreditCard} label="Plačilne metode" color="success" />
              <QuickAction icon={Building} label="Stranke" color="warning" />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="bg-card rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/5">
                <tr className="text-left text-sm text-muted">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Stranka</th>
                  <th className="px-6 py-4">Znesek</th>
                  <th className="px-6 py-4">Datum</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(txn => (
                  <tr key={txn.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono">{txn.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-white">
                          {txn.client.charAt(0)}
                        </div>
                        <span className="text-sm">{txn.client}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">€{txn.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-muted">{txn.date}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={txn.status} />
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-muted hover:text-text">
                        <ArrowUpRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'invoices' && (
        <div className="space-y-4">
          {invoices.map(invoice => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PaymentMethodCard
            type="card"
            brand="Visa"
            last4="4242"
            expiry="12/25"
            default
          />
          <PaymentMethodCard
            type="card"
            brand="Mastercard"
            last4="5555"
            expiry="06/26"
          />
          <AddPaymentMethod />
        </div>
      )}

      {/* New Invoice Modal */}
      {showNewInvoice && (
        <NewInvoiceModal onClose={() => setShowNewInvoice(false)} />
      )}
    </div>
  );
}

// Helper Components
function StatCard({ icon: Icon, label, value, trend, color }) {
  const colors = {
    success: 'bg-success/15 text-success',
    warning: 'bg-warning/15 text-warning',
    danger: 'bg-danger/15 text-danger',
    primary: 'bg-primary/15 text-primary',
  };
  
  return (
    <div className="bg-card rounded-2xl border border-white/5 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className={`h-10 w-10 rounded-xl ${colors[color]}`}>
          <Icon size={20} className="m-2" />
        </div>
        {trend && (
          <span className="text-xs bg-success/15 text-success px-2 py-0.5 rounded">
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

function TabButton({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
        active ? 'border-success text-success' : 'border-transparent text-muted hover:text-text'
      }`}
    >
      {label}
    </button>
  );
}

function TransactionRow({ transaction }) {
  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-white">
          {transaction.client.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-sm">{transaction.client}</p>
          <p className="text-xs text-muted">{transaction.id}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">€{transaction.amount.toLocaleString()}</p>
        <StatusBadge status={transaction.status} small />
      </div>
    </div>
  );
}

function StatusBadge({ status, small }) {
  const styles = {
    completed: 'bg-success/15 text-success',
    paid: 'bg-success/15 text-success',
    pending: 'bg-warning/15 text-warning',
    sent: 'bg-warning/15 text-warning',
    failed: 'bg-danger/15 text-danger',
    overdue: 'bg-danger/15 text-danger',
  };
  
  return (
    <span className={`${styles[status]} ${small ? 'text-xs px-1.5 py-0.5' : 'text-xs px-2 py-1'} rounded-full`}>
      {status === 'completed' ? 'Končano' :
       status === 'paid' ? 'Plačano' :
       status === 'pending' ? 'Čaka' :
       status === 'sent' ? 'Poslano' :
       status === 'failed' ? 'Neuspelo' :
       status === 'overdue' ? 'Zapadlo' : status}
    </span>
  );
}

function QuickAction({ icon: Icon, label, color }) {
  const colors = {
    primary: 'bg-primary/15 text-primary hover:bg-primary/25',
    secondary: 'bg-secondary/15 text-secondary hover:bg-secondary/25',
    success: 'bg-success/15 text-success hover:bg-success/25',
    warning: 'bg-warning/15 text-warning hover:bg-warning/25',
  };
  
  return (
    <button className={`flex flex-col items-center gap-2 rounded-xl p-4 transition-colors ${colors[color]}`}>
      <Icon size={24} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function InvoiceCard({ invoice }) {
  return (
    <div className="bg-card rounded-2xl border border-white/5 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center">
            <FileText className="text-muted" size={24} />
          </div>
          <div>
            <h4 className="font-medium">{invoice.id}</h4>
            <p className="text-sm text-muted">{invoice.client}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xl font-bold">€{invoice.amount.toLocaleString()}</p>
            <p className="text-xs text-muted">Rok: {invoice.dueDate}</p>
          </div>
          <StatusBadge status={invoice.status} />
          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-muted hover:bg-white/10 hover:text-text transition-colors">
              <Download size={16} />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-muted hover:bg-white/10 hover:text-text transition-colors">
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentMethodCard({ type, brand, last4, expiry, default: isDefault }) {
  return (
    <div className="bg-card rounded-2xl border border-white/5 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <CreditCard className="text-muted" size={24} />
          <div>
            <p className="font-medium">{brand}</p>
            <p className="text-sm text-muted">•••• {last4}</p>
          </div>
        </div>
        {isDefault && (
          <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded">Privzeto</span>
        )}
      </div>
      <div className="flex items-center justify-between text-sm text-muted">
        <span>Potek: {expiry}</span>
        <button className="text-danger hover:underline">Odstrani</button>
      </div>
    </div>
  );
}

function AddPaymentMethod() {
  return (
    <button className="bg-card rounded-2xl border border-dashed border-white/10 p-6 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-colors">
      <Plus className="text-muted" size={24} />
      <span className="text-sm text-muted">Dodaj plačilno metodo</span>
    </button>
  );
}

function NewInvoiceModal({ onClose }) {
  const [items, setItems] = useState([{ description: '', quantity: 1, price: 0 }]);
  
  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }]);
  };

  const total = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  const vat = total * 0.22;
  const grandTotal = total + vat;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-xl font-bold">Nova faktura</h2>
          <button onClick={onClose} className="text-muted hover:text-text">✕</button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Stranka</label>
              <input
                type="text"
                placeholder="Ime stranke"
                className="w-full bg-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-success/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Rok plačila</label>
              <input
                type="date"
                className="w-full bg-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-success/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Postavke</label>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Opis storitve"
                    value={item.description}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index].description = e.target.value;
                      setItems(newItems);
                    }}
                    className="flex-1 bg-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-success/50"
                  />
                  <input
                    type="number"
                    placeholder="Kol"
                    value={item.quantity}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index].quantity = parseInt(e.target.value) || 0;
                      setItems(newItems);
                    }}
                    className="w-20 bg-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-success/50"
                  />
                  <input
                    type="number"
                    placeholder="Cena"
                    value={item.price}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index].price = parseFloat(e.target.value) || 0;
                      setItems(newItems);
                    }}
                    className="w-28 bg-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-success/50"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={addItem}
              className="mt-3 flex items-center gap-2 text-sm text-success hover:underline"
            >
              <Plus size={14} /> Dodaj postavko
            </button>
          </div>

          <div className="p-4 bg-white/5 rounded-xl space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Skupaj:</span>
              <span>€{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">DDV (22%):</span>
              <span>€{vat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t border-white/10">
              <span>Skupaj:</span>
              <span className="text-success">€{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-white/5">
          <button onClick={onClose} className="px-4 py-2 text-sm text-muted hover:text-text">
            Prekliči
          </button>
          <button className="px-6 py-2 bg-success text-white text-sm font-medium rounded-xl hover:bg-success/90">
            Ustvari fakturo
          </button>
        </div>
      </div>
    </div>
  );
}