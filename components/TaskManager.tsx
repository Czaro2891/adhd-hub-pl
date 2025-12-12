import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Plus, Trash2, Calendar, AlertCircle, Circle, CheckCircle2, List, Clock } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  done: boolean;
  time?: string; // HH:mm
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('adhd-hub-tasks', []);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('MEDIUM');
  const [time, setTime] = useState('');
  const [view, setView] = useState<'LIST' | 'AGENDA'>('LIST');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      text: newTask,
      priority,
      done: false,
      time: time || undefined
    };

    setTasks([...tasks, task]);
    setNewTask('');
    setTime('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by done status (done at bottom)
    if (a.done !== b.done) return a.done ? 1 : -1;
    
    if (view === 'AGENDA') {
       // Sort by time
       if (a.time && b.time) return a.time.localeCompare(b.time);
       if (a.time) return -1;
       if (b.time) return 1;
    } else {
       // Sort by priority
       const pMap = { HIGH: 0, MEDIUM: 1, LOW: 2 };
       if (pMap[a.priority] !== pMap[b.priority]) return pMap[a.priority] - pMap[b.priority];
    }
    return 0;
  });

  const PriorityBadge = ({ p }: { p: Task['priority'] }) => {
    const colors = {
      HIGH: 'bg-red-100 text-red-700',
      MEDIUM: 'bg-blue-100 text-blue-700',
      LOW: 'bg-gray-100 text-gray-700'
    };
    return (
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colors[p]}`}>
        {p === 'HIGH' ? 'PILNE' : p === 'MEDIUM' ? 'WAŻNE' : 'LUŹNE'}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-warm-200 p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-warm-900">Lista Zadań</h2>
            <p className="text-sm text-warm-500">Wyrzuć to z głowy.</p>
          </div>
        </div>
        
        {/* View Toggle */}
        <div className="flex bg-warm-100 p-1 rounded-lg">
          <button 
            onClick={() => setView('LIST')}
            className={`p-1.5 rounded-md transition-all ${view === 'LIST' ? 'bg-white shadow-sm text-brand-700' : 'text-warm-500'}`}
          >
            <List size={18} />
          </button>
          <button 
            onClick={() => setView('AGENDA')}
            className={`p-1.5 rounded-md transition-all ${view === 'AGENDA' ? 'bg-white shadow-sm text-brand-700' : 'text-warm-500'}`}
          >
            <Clock size={18} />
          </button>
        </div>
      </div>

      <form onSubmit={addTask} className="space-y-3 mb-8 bg-warm-50 p-4 rounded-xl border border-warm-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Co jest do zrobienia?"
            className="flex-1 rounded-lg border-warm-300 text-sm focus:border-brand-500 focus:ring-brand-500 py-2.5 px-3"
          />
          <button
            type="submit"
            disabled={!newTask.trim()}
            className="bg-brand-600 text-white px-4 rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-50"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="flex gap-3">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task['priority'])}
            className="text-sm rounded-lg border-warm-300 py-2 px-3 bg-white text-warm-700 focus:ring-brand-500 focus:border-brand-500"
          >
            <option value="HIGH">🔥 Pilne</option>
            <option value="MEDIUM">🔹 Ważne</option>
            <option value="LOW">☕ Luźne</option>
          </select>
          <input 
            type="time" 
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="text-sm rounded-lg border-warm-300 py-2 px-3 bg-white text-warm-700 focus:ring-brand-500 focus:border-brand-500"
          />
        </div>
      </form>

      {tasks.length === 0 ? (
        <div className="text-center py-8 text-warm-400 text-sm">
          Pusto! Ciesz się wolnym czasem lub zaplanuj coś.
        </div>
      ) : (
        <div className="space-y-2">
          {sortedTasks.map(task => (
            <div 
              key={task.id}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all group ${
                task.done 
                  ? 'bg-warm-50 border-transparent opacity-60' 
                  : 'bg-white border-warm-100 hover:border-brand-200 hover:shadow-sm'
              }`}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`flex-shrink-0 ${task.done ? 'text-brand-500' : 'text-warm-300 hover:text-brand-400'}`}
              >
                {task.done ? <CheckCircle2 size={22} /> : <Circle size={22} />}
              </button>
              
              <div className="flex-1 min-w-0">
                <div className={`flex items-center gap-2 mb-0.5 ${task.done ? 'line-through text-warm-400' : 'text-warm-800'}`}>
                  <span className="truncate font-medium">{task.text}</span>
                  {!task.done && <PriorityBadge p={task.priority} />}
                </div>
                {task.time && (
                  <div className="text-xs text-brand-600 flex items-center gap-1">
                    <Clock size={10} />
                    {task.time}
                  </div>
                )}
              </div>

              <button 
                onClick={() => deleteTask(task.id)}
                className="text-warm-300 hover:text-red-400 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskManager;