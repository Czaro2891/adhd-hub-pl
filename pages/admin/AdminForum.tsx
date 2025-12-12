import React from 'react';
import { MOCK_THREADS } from '../../data/mockData';
import { MessageSquare, AlertTriangle, EyeOff, CheckCircle } from 'lucide-react';

const AdminForum: React.FC = () => {
  // Mock Reported Items (In a real app, this would come from a 'reports' collection)
  const reportedThreads = [MOCK_THREADS[0]]; // Simulating one reported thread

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-warm-900 dark:text-warm-100 mb-6">Moderacja Forum</h1>

      <div className="space-y-6">
        {/* Reported Content Section */}
        <section>
          <h2 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
            <AlertTriangle size={20} /> Zgłoszone treści (1)
          </h2>
          
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl p-4">
            {reportedThreads.map(thread => (
              <div key={thread.id} className="bg-white dark:bg-warm-900 p-4 rounded-xl shadow-sm">
                 <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold">{thread.title}</h3>
                   <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Zgłoszenie: Spam</span>
                 </div>
                 <p className="text-sm text-warm-600 mb-4 italic">"{thread.content}"</p>
                 <div className="flex gap-3">
                   <button className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-red-700">
                     <EyeOff size={14} /> Ukryj / Usuń
                   </button>
                   <button className="px-3 py-1.5 border border-warm-300 rounded-lg text-sm flex items-center gap-2 hover:bg-warm-50">
                     <CheckCircle size={14} /> Ignoruj (Fałszywy alarm)
                   </button>
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="grid md:grid-cols-3 gap-6">
           <div className="bg-white dark:bg-warm-900 p-6 rounded-2xl border border-warm-200 dark:border-warm-800">
             <h4 className="text-warm-500 text-sm mb-1">Dzisiejsze posty</h4>
             <p className="text-3xl font-bold">24</p>
           </div>
           <div className="bg-white dark:bg-warm-900 p-6 rounded-2xl border border-warm-200 dark:border-warm-800">
             <h4 className="text-warm-500 text-sm mb-1">Aktywni użytkownicy</h4>
             <p className="text-3xl font-bold">18</p>
           </div>
           <div className="bg-white dark:bg-warm-900 p-6 rounded-2xl border border-warm-200 dark:border-warm-800">
             <h4 className="text-warm-500 text-sm mb-1">Automoderacja (AI)</h4>
             <p className="text-3xl font-bold text-green-600">99%</p>
           </div>
        </section>
      </div>
    </div>
  );
};

export default AdminForum;