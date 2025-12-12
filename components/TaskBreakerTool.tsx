import React, { useState } from 'react';
import { breakDownTask } from '../services/geminiService';
import { Sparkles, CheckCircle2, Circle, RefreshCw } from 'lucide-react';
import { TaskStep } from '../types';

const TaskBreakerTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [steps, setSteps] = useState<TaskStep[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBreakDown = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setSteps([]); // Clear previous

    try {
      const result = await breakDownTask(input);
      const taskSteps: TaskStep[] = result.map(text => ({ text, isComplete: false }));
      setSteps(taskSteps);
    } catch (err) {
      setError('Wystąpił błąd podczas łączenia z asystentem. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStep = (index: number) => {
    setSteps(prev => prev.map((step, i) => 
      i === index ? { ...step, isComplete: !step.isComplete } : step
    ));
  };

  const progress = steps.length > 0 
    ? Math.round((steps.filter(s => s.isComplete).length / steps.length) * 100) 
    : 0;

  return (
    <div className="bg-white dark:bg-warm-900 rounded-2xl shadow-sm border border-warm-200 dark:border-warm-800 p-6 md:p-8 max-w-2xl mx-auto transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg text-purple-600 dark:text-purple-300">
          <Sparkles size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-warm-900 dark:text-warm-100">Odciążacz Zadań</h2>
          <p className="text-sm text-warm-500 dark:text-warm-400">Paraliż decyzyjny? Rozbijmy to na kawałki.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="taskInput" className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-2">
            Co Cię teraz przytłacza?
          </label>
          <div className="flex gap-2">
            <input
              id="taskInput"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="np. posprzątanie kuchni, napisanie maila..."
              className="flex-1 rounded-xl border-warm-300 dark:border-warm-700 dark:bg-warm-800 dark:text-warm-100 shadow-sm focus:border-brand-500 focus:ring-brand-500 py-3 px-4 placeholder-warm-400"
              onKeyDown={(e) => e.key === 'Enter' && handleBreakDown()}
            />
            <button
              onClick={handleBreakDown}
              disabled={isLoading || !input.trim()}
              className="bg-brand-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? <RefreshCw className="animate-spin" size={20} /> : 'Rozbij to'}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 rounded-xl text-sm">
            {error}
          </div>
        )}

        {steps.length > 0 && (
          <div className="mt-8 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-warm-800 dark:text-warm-200">Twój plan działania:</h3>
              <span className="text-xs font-medium bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 px-2 py-1 rounded-full">
                {progress}% gotowe
              </span>
            </div>
            
            <div className="h-2 bg-warm-100 dark:bg-warm-800 rounded-full mb-6 overflow-hidden">
              <div 
                className="h-full bg-brand-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <ul className="space-y-3">
              {steps.map((step, index) => (
                <li 
                  key={index}
                  onClick={() => toggleStep(index)}
                  className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all border ${
                    step.isComplete 
                      ? 'bg-brand-50 dark:bg-brand-900/10 border-brand-100 dark:border-brand-900/20 opacity-60' 
                      : 'bg-white dark:bg-warm-800 border-warm-100 dark:border-warm-700 hover:border-brand-200 dark:hover:border-brand-700 shadow-sm'
                  }`}
                >
                  <button className={`mt-0.5 flex-shrink-0 transition-colors ${step.isComplete ? 'text-brand-500' : 'text-warm-300 dark:text-warm-600'}`}>
                    {step.isComplete ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                  </button>
                  <span className={`text-warm-800 dark:text-warm-200 ${step.isComplete ? 'line-through decoration-brand-300 dark:decoration-brand-700' : ''}`}>
                    {step.text}
                  </span>
                </li>
              ))}
            </ul>
            
            {progress === 100 && (
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-xl text-center text-green-700 dark:text-green-300 font-medium animate-bounce">
                🎉 Brawo! Zadanie wykonane! Jesteś niesamowity/a!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskBreakerTool;