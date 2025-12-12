import React from 'react';
import { Users, FileText, AlertTriangle, UserCheck, TrendingUp, Activity } from 'lucide-react';
import { MOCK_ARTICLES, MOCK_THREADS, MOCK_SPECIALISTS } from '../../data/mockData';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-white dark:bg-warm-900 p-6 rounded-2xl border border-warm-200 dark:border-warm-800 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-warm-500 dark:text-warm-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-warm-900 dark:text-warm-100">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-warm-900 dark:text-warm-100 mb-2">Witaj w centrum dowodzenia</h1>
        <p className="text-warm-500">Oto podsumowanie aktywności w portalu.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Użytkownicy" 
          value="1,248" 
          icon={<Users size={24} className="text-blue-600" />} 
          color="bg-blue-100 dark:bg-blue-900/20" 
        />
        <StatCard 
          title="Artykuły" 
          value={MOCK_ARTICLES.length} 
          icon={<FileText size={24} className="text-brand-600" />} 
          color="bg-brand-100 dark:bg-brand-900/20" 
        />
        <StatCard 
          title="Specjaliści (Oczekujący)" 
          value={MOCK_SPECIALISTS.filter(s => !s.isVerified).length} 
          icon={<UserCheck size={24} className="text-orange-600" />} 
          color="bg-orange-100 dark:bg-orange-900/20" 
        />
        <StatCard 
          title="Zgłoszenia na forum" 
          value="3" 
          icon={<AlertTriangle size={24} className="text-red-600" />} 
          color="bg-red-100 dark:bg-red-900/20" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-warm-900 rounded-2xl border border-warm-200 dark:border-warm-800 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-warm-900 dark:text-warm-100 flex items-center gap-2">
              <Activity size={20} /> Ostatnia aktywność
            </h3>
            <button className="text-sm text-brand-600 hover:underline">Zobacz wszystko</button>
          </div>
          <div className="space-y-4">
             {[
               { text: "Nowy użytkownik zarejestrowany: Anna_K", time: "5 min temu" },
               { text: "Zgłoszono post w wątku 'Leki...'", time: "1 godz. temu" },
               { text: "Dr Nowak zaktualizował profil", time: "2 godz. temu" },
               { text: "Artykuł 'Wypalenie' osiągnął 1k wyświetleń", time: "5 godz. temu" },
             ].map((item, i) => (
               <div key={i} className="flex justify-between items-center py-2 border-b border-warm-100 dark:border-warm-800 last:border-0">
                 <span className="text-warm-700 dark:text-warm-300 text-sm">{item.text}</span>
                 <span className="text-xs text-warm-400">{item.time}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-warm-900 rounded-2xl border border-warm-200 dark:border-warm-800 p-6">
           <h3 className="font-bold text-lg text-warm-900 dark:text-warm-100 mb-6 flex items-center gap-2">
              <TrendingUp size={20} /> Szybkie akcje
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 rounded-xl bg-brand-50 dark:bg-brand-900/20 hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors text-left">
                <span className="block font-bold text-brand-700 dark:text-brand-300 mb-1">Dodaj artykuł</span>
                <span className="text-xs text-brand-600 dark:text-brand-400">Edytor treści</span>
              </button>
              <button className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors text-left">
                <span className="block font-bold text-orange-700 dark:text-orange-300 mb-1">Moderuj forum</span>
                <span className="text-xs text-orange-600 dark:text-orange-400">3 zgłoszenia</span>
              </button>
              <button className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-left">
                <span className="block font-bold text-blue-700 dark:text-blue-300 mb-1">Newsletter</span>
                <span className="text-xs text-blue-600 dark:text-blue-400">Generuj nowy</span>
              </button>
              <button className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-left">
                <span className="block font-bold text-purple-700 dark:text-purple-300 mb-1">System</span>
                <span className="text-xs text-purple-600 dark:text-purple-400">Status: Online</span>
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;