import React, { useState } from 'react';
import TaskBreakerTool from '../components/TaskBreakerTool';
import FocusTimer from '../components/FocusTimer';
import HabitTracker from '../components/HabitTracker';
import TaskManager from '../components/TaskManager';
import DayPlanner from '../components/DayPlanner';
import MedicationManager from '../components/MedicationManager';
import GlassIcon from '../components/GlassIcon';
import { Sparkles, CheckCircle2, Trophy, Clock, Calendar, Pill, ArrowLeft } from 'lucide-react';

type ToolId = 'TASK_BREAKER' | 'FOCUS' | 'HABITS' | 'TASKS' | 'DAY_PLANNER' | 'MEDICATIONS' | null;

const Tools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolId>(null);

  const tools = [
    {
      id: 'TASK_BREAKER' as const,
      title: 'Odciążacz Zadań',
      desc: 'Paraliż decyzyjny? AI pomoże Ci rozbić zadanie na małe kroki.',
      icon: <Sparkles className="w-full h-full" />,
      color: 'purple' as const,
      component: <TaskBreakerTool />
    },
    {
      id: 'TASKS' as const,
      title: 'Lista Zadań',
      desc: 'Elastyczna lista z priorytetami i planowaniem dnia.',
      icon: <CheckCircle2 className="w-full h-full" />,
      color: 'blue' as const,
      component: <TaskManager />
    },
    {
      id: 'FOCUS' as const,
      title: 'Focus Timer',
      desc: 'Pracuj w blokach bez rozpraszaczy. Elastyczne Pomodoro.',
      icon: <Clock className="w-full h-full" />,
      color: 'brand' as const,
      component: <FocusTimer />
    },
    {
      id: 'HABITS' as const,
      title: 'Nawykownik',
      desc: 'Śledź swoje postępy i buduj rutynę metodą małych kroków.',
      icon: <Trophy className="w-full h-full" />,
      color: 'orange' as const,
      component: <HabitTracker />
    },
    {
      id: 'DAY_PLANNER' as const,
      title: 'Planer Dnia',
      desc: 'Wizualny rozkład dnia. Widzisz, ile fizycznie się mieści w 24 godzinach.',
      icon: <Calendar className="w-full h-full" />,
      color: 'green' as const,
      component: <DayPlanner />
    },
    {
      id: 'MEDICATIONS' as const,
      title: 'Magazynier Leków',
      desc: 'Śledź zapasy leków i otrzymuj powiadomienia przed skończeniem się.',
      icon: <Pill className="w-full h-full" />,
      color: 'pink' as const,
      component: <MedicationManager />
    }
  ];

  const ActiveComponent = tools.find(t => t.id === activeTool)?.component;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {!activeTool ? (
        // Dashboard View
        <div className="animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-warm-900 dark:text-warm-50 mb-4">Twój Przybornik</h1>
            <p className="text-lg text-warm-600 dark:text-warm-300 max-w-2xl mx-auto">
              Wybierz narzędzie, które pomoże Ci w tej chwili. 
              Zaprojektowane, by wspierać, a nie przytłaczać.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className="flex items-start text-left bg-white dark:bg-warm-900 p-6 rounded-3xl border border-warm-200 dark:border-warm-800 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-xl transition-all group relative overflow-hidden"
              >
                {/* Subtle background gradient */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${tool.color === 'brand' ? 'teal' : tool.color}-500/5 blur-3xl rounded-full translate-x-10 -translate-y-10 pointer-events-none`} />

                <div className="mr-6 flex-shrink-0">
                  <GlassIcon icon={tool.icon} color={tool.color} size="md" />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-warm-900 dark:text-warm-100 mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-warm-500 dark:text-warm-400 leading-relaxed text-sm">
                    {tool.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        // Active Tool View
        <div className="animate-fade-in">
          <button 
            onClick={() => setActiveTool(null)}
            className="flex items-center text-warm-500 dark:text-warm-400 hover:text-brand-600 dark:hover:text-brand-400 mb-6 font-medium transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Wróć do przybornika
          </button>
          
          <div className="bg-warm-50/50 dark:bg-warm-900/50 rounded-2xl">
            {ActiveComponent}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tools;