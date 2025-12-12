import React, { useState, useEffect } from 'react';
import { MOCK_ARTICLES } from '../data/mockData';
import { useLocation, useNavigate } from 'react-router-dom';
import { PersonaType } from '../types';
import { BookOpen, Clock, Tag, X } from 'lucide-react';

const Knowledge: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Wszystkie");
  
  // Mapping categories to user-friendly labels including Personas
  const filters = [
    { label: "Wszystkie", value: "Wszystkie" },
    { label: "Dla Dorosłych", value: PersonaType.ADULT },
    { label: "Dla Rodziców", value: PersonaType.PARENT },
    { label: "Dla Bliskich", value: PersonaType.PARTNER },
    { label: "Strategie", value: "Strategie" },
    { label: "Podstawy", value: "Podstawy" },
    { label: "Leczenie", value: "Leczenie" },
    { label: "Szkoła", value: "Dla Rodziców" }, // Map School to Parent persona/category roughly or treat separate
    { label: "Praca", value: "Praca" }
  ];

  // Handle incoming navigation state (e.g. from Home persona cards)
  useEffect(() => {
    if (location.state?.persona) {
      setActiveCategory(location.state.persona);
    }
  }, [location.state]);

  const filteredArticles = MOCK_ARTICLES.filter(article => {
    if (activeCategory === "Wszystkie") return true;
    
    // Check if category matches direct category string
    if (article.category === activeCategory) return true;

    // Check if category matches one of the target personas
    if (Object.values(PersonaType).includes(activeCategory as PersonaType)) {
      return article.targetPersona.includes(activeCategory as PersonaType);
    }
    
    // Special handling for "Szkoła" logic if article has "Szkoła" tag or Category "Dla Rodziców"
    if (activeCategory === "Szkoła") {
       return article.tags.includes("Szkoła") || article.category === "Dla Rodziców";
    }

    return false;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-warm-900 dark:text-warm-100 mb-4">Baza Wiedzy</h1>
        <p className="text-lg text-warm-600 dark:text-warm-300 max-w-2xl">
          Sprawdzone informacje, które pomogą Ci zrozumieć mechanizmy ADHD. 
          Wybierz kategorię lub przeglądaj polecane artykuły.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-10">
        {filters.map(filter => {
          const isActive = activeCategory === filter.value;
          return (
            <button 
              key={filter.label} 
              onClick={() => setActiveCategory(filter.value)}
              className={`px-5 py-2 rounded-full border transition-all duration-200 ${
                isActive 
                  ? 'bg-brand-600 text-white border-brand-600 shadow-md transform scale-105' 
                  : 'bg-white dark:bg-warm-900 text-warm-600 dark:text-warm-300 border-warm-200 dark:border-warm-700 hover:border-brand-500 hover:text-brand-700 dark:hover:text-brand-300'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
        {activeCategory !== "Wszystkie" && (
          <button 
            onClick={() => setActiveCategory("Wszystkie")}
            className="px-3 py-2 text-warm-500 hover:text-warm-800 dark:hover:text-warm-200 flex items-center"
          >
            <X size={18} /> <span className="text-sm ml-1 hidden sm:inline">Wyczyść</span>
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredArticles.map((article) => (
            <article 
              key={article.id} 
              onClick={() => navigate(`/knowledge/${article.id}`)}
              className="group flex flex-col h-full bg-white dark:bg-warm-900 p-6 rounded-2xl border border-warm-200 dark:border-warm-800 hover:border-brand-300 dark:hover:border-brand-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 px-2 py-1 rounded-md">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-warm-400 dark:text-warm-500">
                  <Clock size={12} /> {article.readTime}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-warm-900 dark:text-warm-100 mb-3 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
                {article.title}
              </h3>
              
              <p className="text-warm-500 dark:text-warm-400 text-sm mb-6 flex-grow leading-relaxed">
                {article.summary}
              </p>
              
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] bg-warm-100 dark:bg-warm-800 text-warm-500 dark:text-warm-400 px-2 py-1 rounded-md flex items-center gap-1">
                      <Tag size={10} /> {tag}
                    </span>
                  ))}
                </div>
                <div className="text-brand-600 dark:text-brand-400 text-sm font-medium flex items-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                  <BookOpen size={16} className="mr-2" /> Czytaj artykuł
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-warm-50 dark:bg-warm-900/50 rounded-2xl border border-dashed border-warm-200 dark:border-warm-800">
          <p className="text-warm-500 dark:text-warm-400 text-lg">Brak artykułów w tej kategorii.</p>
          <button onClick={() => setActiveCategory("Wszystkie")} className="text-brand-600 font-medium mt-2 hover:underline">
            Pokaż wszystkie
          </button>
        </div>
      )}
    </div>
  );
};

export default Knowledge;