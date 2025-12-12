import React, { useState } from 'react';
import { MOCK_SPECIALISTS } from '../data/mockData';
import GlassIcon from '../components/GlassIcon';
import { MapPin, Phone, Globe, ShieldCheck, Filter, Stethoscope } from 'lucide-react';

const Diagnosis: React.FC = () => {
  const [cityFilter, setCityFilter] = useState('');
  const [nfzOnly, setNfzOnly] = useState(false);

  const filteredSpecialists = MOCK_SPECIALISTS.filter(spec => {
    const matchesCity = spec.city.toLowerCase().includes(cityFilter.toLowerCase()) || cityFilter === '';
    const matchesNFZ = nfzOnly ? spec.isNFZ : true;
    return matchesCity && matchesNFZ;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-warm-900 dark:text-warm-100 mb-2">Ścieżka Diagnostyczna i Specjaliści</h1>
        <p className="text-lg text-warm-600 dark:text-warm-300 max-w-2xl">
          Znajdź zaufanego specjalistę. Wszyscy wymienieni tutaj lekarze i terapeuci są weryfikowani pod kątem aktualnej wiedzy o ADHD.
        </p>
      </div>

      {/* Info Card with Glass Icon */}
      <div className="bg-yellow-50/50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/30 rounded-3xl p-8 mb-8 flex flex-col md:flex-row gap-6 items-start backdrop-blur-sm">
        <div className="flex-shrink-0">
          <GlassIcon 
            icon={<Stethoscope className="w-full h-full" />} 
            color="yellow" 
            size="lg" 
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-yellow-900 dark:text-yellow-100 mb-2">Jak wygląda diagnoza?</h3>
          <p className="text-yellow-800 dark:text-yellow-200/80 leading-relaxed mb-4">
            Standardem w Polsce jest wizyta u psychiatry (lekarz) w celu postawienia diagnozy medycznej. 
            Często wymagana jest też opinia psychologa (testy DIVA-5, MOXO). 
            Proces zajmuje zazwyczaj od 2 do 4 wizyt.
          </p>
          <div className="flex gap-2">
             <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 rounded-lg text-sm font-semibold">1. Wywiad kliniczny</span>
             <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 rounded-lg text-sm font-semibold">2. Testy</span>
             <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 rounded-lg text-sm font-semibold">3. Diagnoza</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-warm-900 p-4 rounded-xl shadow-sm border border-warm-200 dark:border-warm-800 mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-400" size={18} />
          <input 
            type="text" 
            placeholder="Miasto (np. Warszawa, Online)" 
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-warm-300 dark:border-warm-700 dark:bg-warm-800 dark:text-warm-100 focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="nfz" 
            checked={nfzOnly}
            onChange={(e) => setNfzOnly(e.target.checked)}
            className="w-5 h-5 rounded border-warm-300 text-brand-600 focus:ring-brand-500"
          />
          <label htmlFor="nfz" className="text-warm-700 dark:text-warm-300 font-medium cursor-pointer select-none">
            Tylko na NFZ
          </label>
        </div>
      </div>

      {/* List */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredSpecialists.length > 0 ? (
          filteredSpecialists.map(spec => (
            <div key={spec.id} className="bg-white dark:bg-warm-900 rounded-2xl p-6 border border-warm-200 dark:border-warm-800 hover:shadow-md transition-shadow relative overflow-hidden group">
              {spec.isVerified && (
                <div className="absolute top-0 right-0 bg-brand-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider z-10">
                  Zweryfikowany
                </div>
              )}
              
              <div className="mb-4 relative">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-warm-900 dark:text-warm-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{spec.name}</h3>
                    <p className="text-brand-600 dark:text-brand-400 font-medium">{spec.title}</p>
                  </div>
                  <div className="bg-warm-50 dark:bg-warm-800 p-2 rounded-lg text-warm-400">
                    <ShieldCheck size={20} />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-warm-500 dark:text-warm-400 text-sm mt-2">
                  <MapPin size={14} />
                  {spec.city}
                  {spec.isNFZ && (
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] px-2 py-0.5 rounded-full font-bold ml-2">
                      NFZ
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-sm text-warm-600 dark:text-warm-300 leading-relaxed">
                  {spec.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {spec.specialization.map((tag, i) => (
                    <span key={i} className="text-xs bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-400 px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-warm-100 dark:border-warm-800">
                {spec.contact.phone && (
                  <a href={`tel:${spec.contact.phone}`} className="flex items-center gap-2 text-sm font-medium text-warm-700 dark:text-warm-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    <Phone size={16} />
                    {spec.contact.phone}
                  </a>
                )}
                {spec.contact.website && (
                  <a href={`https://${spec.contact.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-warm-700 dark:text-warm-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    <Globe size={16} />
                    WWW
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-warm-500 dark:text-warm-400">
            Nie znaleziono specjalistów dla wybranych kryteriów.
          </div>
        )}
      </div>
    </div>
  );
};

export default Diagnosis;