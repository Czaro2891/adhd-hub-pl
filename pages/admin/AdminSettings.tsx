import React, { useState } from 'react';
import { Settings, Save, Power, Search } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [maintenance, setMaintenance] = useState(false);
  const [seoTitle, setSeoTitle] = useState('ADHD Hub PL - Zrozumieć Neuroróżnorodność');
  const [seoDesc, setSeoDesc] = useState('Centralny polski hub wiedzy i narzędzi dla osób z ADHD.');

  return (
    <div className="animate-fade-in max-w-3xl">
      <h1 className="text-2xl font-bold text-warm-900 dark:text-warm-100 mb-6 flex items-center gap-2">
        <Settings className="text-warm-600" /> Ustawienia Systemu
      </h1>

      <div className="space-y-6">
        {/* Maintenance Mode */}
        <div className="bg-white dark:bg-warm-900 p-6 rounded-2xl border border-warm-200 dark:border-warm-800 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg text-warm-900 dark:text-warm-100">Tryb Konserwacji (Maintenance)</h3>
            <p className="text-sm text-warm-500">Wyłącza dostęp do portalu dla użytkowników. Widoczny tylko dla Admina.</p>
          </div>
          <button 
            onClick={() => setMaintenance(!maintenance)}
            className={`
              w-14 h-8 rounded-full p-1 transition-colors flex items-center
              ${maintenance ? 'bg-red-500 justify-end' : 'bg-warm-200 justify-start'}
            `}
          >
            <div className="w-6 h-6 bg-white rounded-full shadow-sm" />
          </button>
        </div>

        {/* SEO Settings */}
        <div className="bg-white dark:bg-warm-900 p-6 rounded-2xl border border-warm-200 dark:border-warm-800">
           <h3 className="font-bold text-lg text-warm-900 dark:text-warm-100 mb-4 flex items-center gap-2">
             <Search size={20} /> SEO & Meta Dane
           </h3>
           <div className="space-y-4">
             <div>
               <label className="block text-sm font-medium mb-1">Globalny Tytuł (Meta Title)</label>
               <input 
                 value={seoTitle}
                 onChange={e => setSeoTitle(e.target.value)}
                 className="w-full p-2 border rounded-lg dark:bg-warm-800 dark:border-warm-700"
               />
             </div>
             <div>
               <label className="block text-sm font-medium mb-1">Globalny Opis (Meta Description)</label>
               <textarea 
                 value={seoDesc}
                 onChange={e => setSeoDesc(e.target.value)}
                 className="w-full p-2 border rounded-lg dark:bg-warm-800 dark:border-warm-700 h-24"
               />
             </div>
             <div className="flex justify-end">
               <button className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 flex items-center gap-2">
                 <Save size={18} /> Zapisz zmiany
               </button>
             </div>
           </div>
        </div>

        {/* PDF Resources (Placeholder for file upload logic) */}
        <div className="bg-white dark:bg-warm-900 p-6 rounded-2xl border border-warm-200 dark:border-warm-800 opacity-60">
           <h3 className="font-bold text-lg text-warm-900 dark:text-warm-100 mb-2">Zarządzanie PDFami</h3>
           <p className="text-sm text-warm-500 mb-4">Moduł przesyłania plików jest obecnie wyłączony (wymaga backendu).</p>
           <button disabled className="px-4 py-2 border border-dashed border-warm-300 w-full rounded-lg text-warm-400">
             Przeciągnij pliki tutaj...
           </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;