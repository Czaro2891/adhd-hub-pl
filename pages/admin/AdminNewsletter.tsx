import React, { useState } from 'react';
import { Mail, Sparkles, Send, FileText } from 'lucide-react';

const AdminNewsletter: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState('');

  const generateNewsletter = () => {
    setIsGenerating(true);
    // Mock AI generation
    setTimeout(() => {
      setContent(`
Cześć! 👋

W tym tygodniu w ADHD Hub skupiamy się na temacie: **${topic}**.

Czy wiesz, że...?
[Tu pojawiłaby się ciekawostka wygenerowana przez Gemini]

Polecane artykuły:
1. Jak radzić sobie z...
2. Narzędzia, które pomogą Ci w...

Pamiętaj, Twój mózg jest wyjątkowy! 🧠
Zespół ADHD Hub PL
      `);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="animate-fade-in max-w-4xl">
      <h1 className="text-2xl font-bold text-warm-900 dark:text-warm-100 mb-6 flex items-center gap-2">
        <Mail className="text-brand-600" /> Newsletter & Mailing
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Generator */}
        <div className="bg-white dark:bg-warm-900 p-6 rounded-2xl border border-warm-200 dark:border-warm-800">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Sparkles size={20} className="text-purple-600" /> Generator Treści (AI)
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Temat tygodnia</label>
              <input 
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="np. Prokrastynacja senna"
                className="w-full p-3 rounded-xl border border-warm-300 dark:bg-warm-800 dark:border-warm-700"
              />
            </div>
            <button 
              onClick={generateNewsletter}
              disabled={!topic || isGenerating}
              className="w-full py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isGenerating ? <Sparkles className="animate-spin" /> : <Sparkles />} 
              Generuj szkic
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-warm-50 dark:bg-warm-800 p-6 rounded-2xl border border-warm-200 dark:border-warm-700">
           <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FileText size={20} /> Podgląd
          </h2>
          {content ? (
            <div className="whitespace-pre-wrap text-sm font-mono text-warm-700 dark:text-warm-300">
              {content}
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center text-warm-400 text-sm italic">
              Tutaj pojawi się wygenerowana treść...
            </div>
          )}
          {content && (
            <button className="mt-6 w-full py-3 bg-brand-600 text-white rounded-xl hover:bg-brand-700 flex justify-center items-center gap-2">
              <Send size={18} /> Wyślij do 1,248 subskrybentów
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNewsletter;