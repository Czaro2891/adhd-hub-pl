import React, { useState } from 'react';
import { MOCK_THREADS } from '../data/mockData';
import { MessageCircle, ThumbsUp, MessageSquare, Search, PenSquare, Tag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Community: React.FC = () => {
  const { user, login } = useAuth();
  const [filter, setFilter] = useState('Wszystkie');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Wszystkie', 'Wsparcie', 'Leki', 'Strategie', 'Rodzina', 'Praca'];

  const filteredThreads = MOCK_THREADS.filter(thread => {
    const matchesCategory = filter === 'Wszystkie' || thread.category === filter;
    const matchesSearch = thread.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          thread.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800">
        <h1 className="text-3xl font-bold text-warm-900 dark:text-warm-100 mb-2">Społeczność</h1>
        <p className="text-lg text-warm-600 dark:text-warm-300 mb-6">
          Bezpieczna przestrzeń do wymiany doświadczeń. Zero hejtu, samo zrozumienie.
        </p>
        
        {!user ? (
          <div className="bg-white/80 dark:bg-warm-900/80 backdrop-blur-sm p-4 rounded-xl border border-blue-200 dark:border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-warm-700 dark:text-warm-300 font-medium">Dołącz do dyskusji i zadaj pytanie.</span>
            <button 
              onClick={login}
              className="bg-brand-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-700 transition-colors shadow-sm"
            >
              Zaloguj się
            </button>
          </div>
        ) : (
          <button className="flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-700 transition-colors shadow-sm hover:shadow-md">
            <PenSquare size={20} />
            Rozpocznij nowy wątek
          </button>
        )}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 sticky top-20 z-10 bg-warm-50/90 dark:bg-warm-950/90 backdrop-blur-md py-4 -mx-4 px-4 border-b border-warm-200 dark:border-warm-800 md:border-none md:bg-transparent md:backdrop-blur-none">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-400" size={20} />
          <input
            type="text"
            placeholder="Szukaj wątków..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-200 dark:border-warm-700 dark:bg-warm-900 dark:text-warm-100 focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                filter === cat
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white dark:bg-warm-900 text-warm-600 dark:text-warm-300 border-warm-200 dark:border-warm-700 hover:border-brand-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Thread List */}
      <div className="space-y-4">
        {filteredThreads.length > 0 ? (
          filteredThreads.map(thread => (
            <div key={thread.id} className="bg-white dark:bg-warm-900 p-6 rounded-2xl border border-warm-200 dark:border-warm-800 hover:border-brand-300 dark:hover:border-brand-700 transition-all hover:shadow-md cursor-pointer group">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 px-2 py-0.5 rounded-md">
                      {thread.category}
                    </span>
                    <span className="text-xs text-warm-400">
                      • {thread.author} • {thread.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-warm-900 dark:text-warm-100 mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {thread.title}
                  </h3>
                  <p className="text-warm-600 dark:text-warm-400 text-sm line-clamp-2 mb-4">
                    {thread.content}
                  </p>
                  
                  <div className="flex gap-4">
                    {thread.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-xs text-warm-500 dark:text-warm-500 bg-warm-100 dark:bg-warm-800 px-2 py-1 rounded-md">
                        <Tag size={12} /> {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 text-warm-400">
                  <div className="flex flex-col items-center p-2 rounded-lg bg-warm-50 dark:bg-warm-800/50">
                    <ThumbsUp size={18} />
                    <span className="text-xs font-bold mt-1">{thread.likes}</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg">
                    <MessageSquare size={18} />
                    <span className="text-xs font-bold mt-1">{thread.replies}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-warm-500 dark:text-warm-400">
            Nie znaleziono dyskusji pasujących do filtrów.
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;