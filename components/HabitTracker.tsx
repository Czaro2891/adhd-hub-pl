import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Check, Plus, Trash2, Flame, Trophy, ChevronDown, ChevronUp, Calendar as CalendarIcon, X } from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  history: string[]; // Array of ISO date strings (YYYY-MM-DD)
  // Legacy fields for migration
  streak?: number;
  lastCompleted?: string | null;
}

// Helper: Get local date string YYYY-MM-DD
const toDateString = (date: Date) => {
  const offset = date.getTimezoneOffset();
  const adjustedDate = new Date(date.getTime() - (offset*60*1000));
  return adjustedDate.toISOString().split('T')[0];
};

const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days: (Date | null)[] = [];
  
  // Pad start (Monday start)
  let firstDay = date.getDay(); 
  if (firstDay === 0) firstDay = 7; // Sunday is 7
  for (let i = 1; i < firstDay; i++) {
    days.push(null);
  }
  
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(toDateString(d));
  }
  return days;
};

const calculateStreak = (history: string[]) => {
  if (!history || history.length === 0) return 0;
  
  const sortedHistory = [...history].sort((a, b) => b.localeCompare(a)); // Descending
  const today = toDateString(new Date());
  const yesterday = toDateString(new Date(new Date().setDate(new Date().getDate() - 1)));
  
  let streak = 0;
  let currentCheck = today;
  
  // Check if today is done, if not start checking from yesterday
  if (!sortedHistory.includes(today)) {
    if (sortedHistory.includes(yesterday)) {
      currentCheck = yesterday;
    } else {
      return 0;
    }
  }

  // Count backwards
  while (true) {
    if (sortedHistory.includes(currentCheck)) {
      streak++;
      const d = new Date(currentCheck);
      d.setDate(d.getDate() - 1);
      currentCheck = toDateString(d);
    } else {
      break;
    }
  }
  return streak;
};

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useLocalStorage<Habit[]>('adhd-hub-habits', []);
  const [newHabitName, setNewHabitName] = useState('');
  const [expandedHabitId, setExpandedHabitId] = useState<string | null>(null);

  const todayStr = toDateString(new Date());

  const addHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName,
      history: []
    };
    
    setHabits([...habits, newHabit]);
    setNewHabitName('');
  };

  const toggleDate = (habitId: string, dateStr: string) => {
    setHabits(habits.map(habit => {
      if (habit.id !== habitId) return habit;
      
      const history = habit.history || []; // Handle legacy data
      const exists = history.includes(dateStr);
      
      let newHistory;
      if (exists) {
        newHistory = history.filter(d => d !== dateStr);
      } else {
        newHistory = [...history, dateStr];
      }
      
      return { ...habit, history: newHistory };
    }));
  };

  const removeHabit = (id: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć ten nawyk?')) {
      setHabits(habits.filter(h => h.id !== id));
    }
  };

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const monthDays = getDaysInMonth(currentYear, currentMonth);
  const last7Days = getLast7Days();

  // Polish month names
  const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-warm-200 p-6 md:p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
          <Trophy size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-warm-900">Nawykownik</h2>
          <p className="text-sm text-warm-500">Buduj łańcuch sukcesów.</p>
        </div>
      </div>

      <form onSubmit={addHabit} className="flex gap-2 mb-8">
        <input
          type="text"
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          placeholder="Nowy nawyk (np. leki, 5 min spaceru)"
          className="flex-1 rounded-xl border-warm-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 py-3 px-4"
        />
        <button
          type="submit"
          disabled={!newHabitName.trim()}
          className="bg-orange-500 text-white px-4 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          <Plus size={24} />
        </button>
      </form>

      {habits.length === 0 ? (
        <div className="text-center py-12 bg-warm-50 rounded-xl border border-dashed border-warm-200 text-warm-400">
          Dodaj swój pierwszy nawyk powyżej!
        </div>
      ) : (
        <ul className="space-y-4">
          {habits.map(habit => {
            const history = habit.history || [];
            // Migration logic for old data format if needed
            if (!habit.history && habit.lastCompleted === todayStr) {
               history.push(todayStr);
            }

            const isDoneToday = history.includes(todayStr);
            const streak = calculateStreak(history);
            const isExpanded = expandedHabitId === habit.id;

            return (
              <li 
                key={habit.id}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isDoneToday 
                    ? 'bg-orange-50/50 border-orange-200' 
                    : 'bg-white border-warm-100 hover:border-warm-300'
                }`}
              >
                <div className="p-4 flex items-center gap-4">
                  {/* Main Checkbox */}
                  <button
                    onClick={() => toggleDate(habit.id, todayStr)}
                    className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center transition-all ${
                      isDoneToday 
                        ? 'bg-orange-500 text-white shadow-md scale-105' 
                        : 'bg-warm-100 text-warm-300 hover:bg-orange-100 hover:text-orange-400'
                    }`}
                  >
                    {isDoneToday && <Check size={24} strokeWidth={3} />}
                  </button>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-semibold text-lg truncate ${isDoneToday ? 'text-warm-800' : 'text-warm-700'}`}>
                        {habit.name}
                      </span>
                      {streak > 0 && (
                        <span className="text-xs font-bold text-orange-600 flex items-center gap-1 bg-orange-100 px-2 py-0.5 rounded-full">
                          <Flame size={12} className="fill-current" />
                          {streak} dni
                        </span>
                      )}
                    </div>
                    
                    {/* Weekly Mini-View */}
                    <div className="flex items-center gap-1">
                      {last7Days.map((date, i) => {
                        const isDone = history.includes(date);
                        const isToday = date === todayStr;
                        return (
                          <div 
                            key={date}
                            className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
                              isDone ? 'bg-orange-400' : 'bg-warm-200'
                            } ${isToday ? 'ring-2 ring-orange-200' : ''}`}
                            title={date}
                          />
                        );
                      })}
                      <span className="text-xs text-warm-400 ml-2 hidden md:inline">Ostatnie 7 dni</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setExpandedHabitId(isExpanded ? null : habit.id)}
                      className={`p-2 rounded-lg transition-colors ${isExpanded ? 'bg-warm-100 text-warm-600' : 'text-warm-400 hover:bg-warm-50'}`}
                      title={isExpanded ? "Zwiń kalendarz" : "Pokaż kalendarz"}
                    >
                      {isExpanded ? <ChevronUp size={20} /> : <CalendarIcon size={20} />}
                    </button>
                    <button
                      onClick={() => removeHabit(habit.id)}
                      className="p-2 rounded-lg text-warm-300 hover:bg-red-50 hover:text-red-500 transition-colors"
                      title="Usuń nawyk"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Expanded Calendar View */}
                {isExpanded && (
                  <div className="border-t border-warm-100 bg-warm-50/50 p-4 animate-fade-in">
                    <div className="flex justify-between items-center mb-4 px-2">
                      <h4 className="font-semibold text-warm-700">{monthNames[currentMonth]} {currentYear}</h4>
                      <button onClick={() => setExpandedHabitId(null)} className="text-warm-400 hover:text-warm-600">
                        <X size={16} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2 text-center">
                      {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'].map(day => (
                        <div key={day} className="text-xs font-medium text-warm-400">{day}</div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 md:gap-2">
                      {monthDays.map((date, i) => {
                        if (!date) return <div key={`empty-${i}`} className="aspect-square" />;
                        
                        const dateStr = toDateString(date);
                        const isDone = history.includes(dateStr);
                        const isToday = dateStr === todayStr;
                        const isFuture = date > new Date();

                        return (
                          <button
                            key={dateStr}
                            onClick={() => !isFuture && toggleDate(habit.id, dateStr)}
                            disabled={isFuture}
                            className={`
                              aspect-square rounded-lg text-xs md:text-sm font-medium flex items-center justify-center transition-all relative
                              ${isFuture ? 'opacity-30 cursor-default' : 'cursor-pointer hover:scale-105'}
                              ${isDone 
                                ? 'bg-orange-500 text-white shadow-sm' 
                                : 'bg-white text-warm-600 border border-warm-200 hover:border-orange-300'
                              }
                              ${isToday ? 'ring-2 ring-orange-300 ring-offset-1' : ''}
                            `}
                          >
                            {date.getDate()}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-center text-xs text-warm-400 mt-4">
                      Kliknij w dzień, aby oznaczyć/odznaczyć wykonanie nawyku.
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default HabitTracker;