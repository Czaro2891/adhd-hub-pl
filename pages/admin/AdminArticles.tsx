import React, { useState } from 'react';
import { MOCK_ARTICLES } from '../../data/mockData';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Article, PersonaType } from '../../types';
import { Edit, Trash2, Plus, Eye, Save, X } from 'lucide-react';

const AdminArticles: React.FC = () => {
  const [articles, setArticles] = useLocalStorage<Article[]>('adhd-hub-articles', MOCK_ARTICLES);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    category: 'Podstawy',
    readTime: '5 min',
    summary: '',
    content: '',
    targetPersona: [PersonaType.ADULT],
    tags: []
  });

  const handleEdit = (article: Article) => {
    setFormData(article);
    setEditingId(article.id);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setFormData({
       title: '',
       category: 'Podstawy',
       readTime: '5 min',
       summary: '',
       content: '<h3>Nagłówek</h3><p>Treść artykułu...</p>',
       targetPersona: [PersonaType.ADULT],
       tags: []
    });
    setEditingId(null);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Usunąć artykuł?')) {
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // Update
      setArticles(articles.map(a => a.id === editingId ? { ...a, ...formData } as Article : a));
    } else {
      // Create
      const newArticle: Article = {
        ...formData,
        id: Date.now().toString(),
        tags: formData.tags || [],
        targetPersona: formData.targetPersona || [PersonaType.ADULT]
      } as Article;
      setArticles([...articles, newArticle]);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="animate-fade-in bg-white dark:bg-warm-900 p-6 rounded-2xl border border-warm-200 dark:border-warm-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{editingId ? 'Edytuj artykuł' : 'Nowy artykuł'}</h2>
          <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-warm-100 rounded-full">
            <X />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Tytuł</label>
              <input 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full p-2 border rounded-lg dark:bg-warm-800 dark:border-warm-700" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Kategoria</label>
              <select 
                value={formData.category} 
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full p-2 border rounded-lg dark:bg-warm-800 dark:border-warm-700"
              >
                {['Podstawy', 'Leczenie', 'Praca', 'Relacje', 'Dla Rodziców', 'Psychoedukacja'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Krótkie podsumowanie (zajawka)</label>
            <textarea 
              value={formData.summary}
              onChange={e => setFormData({...formData, summary: e.target.value})}
              className="w-full p-2 border rounded-lg dark:bg-warm-800 dark:border-warm-700 h-20"
              required
            />
          </div>

          <div>
             <label className="block text-sm font-medium mb-1">Treść (HTML)</label>
             <textarea 
               value={formData.content}
               onChange={e => setFormData({...formData, content: e.target.value})}
               className="w-full p-2 border rounded-lg dark:bg-warm-800 dark:border-warm-700 h-64 font-mono text-sm"
               required
             />
             <p className="text-xs text-warm-500 mt-1">Używaj znaczników &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;.</p>
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-warm-600">Anuluj</button>
            <button type="submit" className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 flex items-center gap-2">
              <Save size={18} /> Zapisz
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-warm-900 dark:text-warm-100">Zarządzanie Artykułami</h1>
        <button onClick={handleCreate} className="bg-brand-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-700">
          <Plus size={20} /> Nowy artykuł
        </button>
      </div>

      <div className="bg-white dark:bg-warm-900 rounded-2xl border border-warm-200 dark:border-warm-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-warm-50 dark:bg-warm-800 text-warm-500 text-sm">
            <tr>
              <th className="p-4">Tytuł</th>
              <th className="p-4">Kategoria</th>
              <th className="p-4">Persona</th>
              <th className="p-4 text-right">Akcje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-warm-100 dark:divide-warm-800">
            {articles.map(article => (
              <tr key={article.id} className="hover:bg-warm-50 dark:hover:bg-warm-800/50 transition-colors">
                <td className="p-4 font-medium">{article.title}</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded text-xs bg-warm-100 dark:bg-warm-800 text-warm-600">{article.category}</span>
                </td>
                <td className="p-4 text-sm text-warm-500">{article.targetPersona.join(', ')}</td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <button className="p-2 text-warm-400 hover:text-brand-600"><Eye size={18} /></button>
                  <button onClick={() => handleEdit(article)} className="p-2 text-warm-400 hover:text-blue-600"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(article.id)} className="p-2 text-warm-400 hover:text-red-600"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminArticles;