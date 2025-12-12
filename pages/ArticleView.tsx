import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_ARTICLES } from '../data/mockData';
import { ArrowLeft, Clock, Tag, Share2, ThumbsUp } from 'lucide-react';

const ArticleView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const article = MOCK_ARTICLES.find(a => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-warm-500">
        <p className="text-xl mb-4">Nie znaleziono artykułu.</p>
        <button onClick={() => navigate('/knowledge')} className="text-brand-600 hover:underline">
          Wróć do bazy wiedzy
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
      <button 
        onClick={() => navigate('/knowledge')}
        className="flex items-center text-warm-500 dark:text-warm-400 hover:text-brand-600 dark:hover:text-brand-400 mb-8 font-medium transition-colors group"
      >
        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Wróć do bazy wiedzy
      </button>

      <header className="mb-8 md:mb-12 text-center">
        <div className="flex justify-center gap-2 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 bg-brand-100 dark:bg-brand-900/50 px-3 py-1 rounded-full">
                {article.category}
            </span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-warm-900 dark:text-warm-100 mb-6 leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center justify-center gap-6 text-warm-500 dark:text-warm-400 text-sm">
          <span className="flex items-center gap-1.5">
            <Clock size={16} /> {article.readTime} czytania
          </span>
          <span className="hidden sm:inline-block w-1 h-1 bg-warm-300 rounded-full"></span>
          <span>Autor: Redakcja ADHD Hub</span>
        </div>
      </header>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-warm-900 rounded-3xl p-8 md:p-12 shadow-sm border border-warm-100 dark:border-warm-800">
        <div 
            className="prose prose-lg dark:prose-invert prose-warm max-w-none 
            prose-headings:font-bold prose-headings:text-warm-900 dark:prose-headings:text-warm-100
            prose-p:text-warm-700 dark:prose-p:text-warm-300 prose-p:leading-relaxed
            prose-li:text-warm-700 dark:prose-li:text-warm-300
            prose-strong:text-brand-700 dark:prose-strong:text-brand-400
            marker:text-brand-500"
            dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        <div className="mt-12 pt-8 border-t border-warm-100 dark:border-warm-800">
            <h4 className="text-sm font-bold text-warm-400 uppercase tracking-wider mb-4">Tagi</h4>
            <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-warm-50 dark:bg-warm-800 text-warm-600 dark:text-warm-300 text-sm font-medium">
                        <Tag size={14} /> {tag}
                    </span>
                ))}
            </div>
        </div>
      </div>

      {/* Engagement */}
      <div className="mt-8 flex justify-center gap-4">
        <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-warm-900 border border-warm-200 dark:border-warm-800 rounded-full text-warm-600 dark:text-warm-300 hover:border-brand-300 hover:text-brand-600 transition-all shadow-sm">
            <ThumbsUp size={20} />
            <span>To było pomocne</span>
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-warm-900 border border-warm-200 dark:border-warm-800 rounded-full text-warm-600 dark:text-warm-300 hover:border-brand-300 hover:text-brand-600 transition-all shadow-sm">
            <Share2 size={20} />
            <span>Udostępnij</span>
        </button>
      </div>
    </article>
  );
};

export default ArticleView;