import React from 'react';
import { MOCK_SPECIALISTS } from '../../data/mockData';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Specialist } from '../../types';
import { Check, X, Trash2, ShieldCheck, Download } from 'lucide-react';

const AdminSpecialists: React.FC = () => {
  const [specialists, setSpecialists] = useLocalStorage<Specialist[]>('adhd-hub-specialists', MOCK_SPECIALISTS);

  const toggleVerification = (id: string) => {
    setSpecialists(specialists.map(s => s.id === id ? { ...s, isVerified: !s.isVerified } : s));
  };

  const deleteSpecialist = (id: string) => {
    if (confirm("Usunąć tego specjalistę z bazy?")) {
      setSpecialists(specialists.filter(s => s.id !== id));
    }
  };

  return (
    <div className="animate-fade-in">
       <div className="flex justify-between items-center mb-6">
        <div>
           <h1 className="text-2xl font-bold text-warm-900 dark:text-warm-100">Katalog Specjalistów</h1>
           <p className="text-warm-500">Weryfikuj zgłoszenia i zarządzaj bazą lekarzy/terapeutów.</p>
        </div>
        <button className="bg-warm-100 dark:bg-warm-800 text-warm-700 dark:text-warm-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-warm-200">
          <Download size={18} /> Eksportuj CSV
        </button>
      </div>

      <div className="grid gap-4">
        {specialists.map(spec => (
          <div key={spec.id} className="bg-white dark:bg-warm-900 p-6 rounded-2xl border border-warm-200 dark:border-warm-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-start gap-4">
               <div className={`p-3 rounded-full ${spec.isVerified ? 'bg-green-100 text-green-600' : 'bg-warm-100 text-warm-400'}`}>
                 <ShieldCheck size={24} />
               </div>
               <div>
                 <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-warm-900 dark:text-warm-100">{spec.name}</h3>
                    {spec.isNFZ && <span className="text-[10px] bg-blue-100 text-blue-700 px-2 rounded-full font-bold">NFZ</span>}
                 </div>
                 <p className="text-brand-600 text-sm font-medium">{spec.title}</p>
                 <p className="text-warm-500 text-sm">{spec.city} • {spec.specialization.join(', ')}</p>
               </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
               {spec.isVerified ? (
                 <button 
                  onClick={() => toggleVerification(spec.id)}
                  className="flex-1 md:flex-none px-4 py-2 border border-warm-200 text-warm-600 rounded-lg hover:bg-warm-50 text-sm"
                 >
                   Cofnij weryfikację
                 </button>
               ) : (
                 <button 
                   onClick={() => toggleVerification(spec.id)}
                   className="flex-1 md:flex-none px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center justify-center gap-2"
                 >
                   <Check size={16} /> Zatwierdź
                 </button>
               )}
               <button 
                onClick={() => deleteSpecialist(spec.id)}
                className="p-2 text-warm-400 hover:text-red-600 rounded-lg hover:bg-red-50"
               >
                 <Trash2 size={20} />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSpecialists;