import React, { useState, useEffect } from 'react';
import { GripVertical, X, Plus, Clock, AlertCircle } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';

interface ScheduledTask {
  id: string;
  title: string;
  duration: number; // in minutes
  startHour: number; // 0-23
  startMinute: number; // 0-59
  color: string;
  completed: boolean;
}

interface UnscheduledTask {
  id: string;
  title: string;
  estimatedMinutes: number;
}

const HOUR_HEIGHT = 60; // pixels per hour
const COLORS = [
  'bg-blue-100 dark:bg-blue-900/30 border-blue-400',
  'bg-purple-100 dark:bg-purple-900/30 border-purple-400',
  'bg-pink-100 dark:bg-pink-900/30 border-pink-400',
  'bg-green-100 dark:bg-green-900/30 border-green-400',
  'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-400',
  'bg-orange-100 dark:bg-orange-900/30 border-orange-400',
];

const DayPlanner: React.FC = () => {
  const [scheduledTasks, setScheduledTasks] = useLocalStorage<ScheduledTask[]>('adhd-hub-scheduled-tasks', []);
  const [unscheduledTasks, setUnscheduledTasks] = useLocalStorage<UnscheduledTask[]>('adhd-hub-unscheduled-tasks', []);
  const [draggedTask, setDraggedTask] = useState<UnscheduledTask | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskMinutes, setNewTaskMinutes] = useState(30);
  const [showAddTask, setShowAddTask] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const task: UnscheduledTask = {
        id: Date.now().toString(),
        title: newTaskTitle,
        estimatedMinutes: newTaskMinutes,
      };
      setUnscheduledTasks([...unscheduledTasks, task]);
      setNewTaskTitle('');
      setNewTaskMinutes(30);
      setShowAddTask(false);
    }
  };

  const deleteUnscheduledTask = (id: string) => {
    setUnscheduledTasks(unscheduledTasks.filter(t => t.id !== id));
  };

  const deleteScheduledTask = (id: string) => {
    setScheduledTasks(scheduledTasks.filter(t => t.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setScheduledTasks(scheduledTasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const handleDragStart = (task: UnscheduledTask) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (hour: number, e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedTask) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const y = e.clientY - rect.top;
    const minute = Math.round((y / HOUR_HEIGHT) * 60) % 60;

    // Check for conflicts
    const newTask: ScheduledTask = {
      id: draggedTask.id,
      title: draggedTask.title,
      duration: draggedTask.estimatedMinutes,
      startHour: hour,
      startMinute: minute,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      completed: false,
    };

    const conflictExists = checkConflict(newTask, scheduledTasks);
    if (!conflictExists) {
      setScheduledTasks([...scheduledTasks, newTask]);
      deleteUnscheduledTask(draggedTask.id);
    } else {
      alert('⚠️ Konflikt czasowy! To zadanie zachodzi na inne.');
    }

    setDraggedTask(null);
  };

  const checkConflict = (newTask: ScheduledTask, existing: ScheduledTask[]): boolean => {
    const newStart = newTask.startHour * 60 + newTask.startMinute;
    const newEnd = newStart + newTask.duration;

    return existing.some(task => {
      const existingStart = task.startHour * 60 + task.startMinute;
      const existingEnd = existingStart + task.duration;
      return !(newEnd <= existingStart || newStart >= existingEnd);
    });
  };

  const calculateTotalScheduledTime = () => {
    return scheduledTasks.reduce((sum, task) => sum + task.duration, 0);
  };

  const calculateTotalUnscheduledTime = () => {
    return unscheduledTasks.reduce((sum, task) => sum + task.estimatedMinutes, 0);
  };

  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentPixelPosition = (currentHour + currentMinute / 60) * HOUR_HEIGHT;

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="bg-white dark:bg-warm-900 rounded-2xl shadow-sm border border-warm-200 dark:border-warm-800 p-6 md:p-10 transition-colors">
      <h2 className="text-2xl font-bold text-warm-900 dark:text-warm-100 mb-6">Wizualny Planer Dnia</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Timeline Column */}
        <div className="lg:col-span-3 bg-warm-50 dark:bg-warm-800/50 rounded-xl p-4 border border-warm-200 dark:border-warm-700 overflow-y-auto max-h-[800px] relative">
          <div className="relative" style={{ height: `${24 * HOUR_HEIGHT}px` }}>
            
            {/* Current time indicator */}
            <div
              className="absolute left-0 right-0 h-0.5 bg-red-500 z-10 pointer-events-none transition-all duration-200"
              style={{ top: `${currentPixelPosition}px` }}
            >
              <div className="absolute -left-2 w-4 h-4 bg-red-500 rounded-full -top-1.5" />
              <div className="absolute left-6 -top-2.5 text-xs font-bold text-red-500 whitespace-nowrap">
                Teraz: {currentTime.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {/* Hour columns */}
            {hours.map((hour) => (
              <div
                key={hour}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(hour, e)}
                className="relative border-t border-warm-300 dark:border-warm-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors cursor-grab active:cursor-grabbing"
                style={{ height: `${HOUR_HEIGHT}px` }}
              >
                <div className="absolute -left-12 top-0 text-xs font-bold text-warm-500 dark:text-warm-400 w-10 text-right">
                  {hour.toString().padStart(2, '0')}:00
                </div>

                {/* Scheduled tasks in this hour */}
                {scheduledTasks
                  .filter(task => task.startHour === hour)
                  .map((task) => {
                    const topOffset = (task.startMinute / 60) * HOUR_HEIGHT;
                    const height = (task.duration / 60) * HOUR_HEIGHT;
                    return (
                      <div
                        key={task.id}
                        className={`absolute left-12 right-2 ${task.color} border-2 rounded-lg p-2 text-xs font-medium shadow-sm transition-all hover:shadow-md overflow-hidden flex flex-col justify-between group`}
                        style={{
                          top: `${topOffset}px`,
                          height: `${Math.max(height, 30)}px`,
                          opacity: task.completed ? 0.6 : 1,
                          textDecoration: task.completed ? 'line-through' : 'none',
                        }}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                            className="mt-0.5 cursor-pointer"
                          />
                          <span className="flex-1 line-clamp-2">{task.title}</span>
                        </div>
                        <div className="text-xs opacity-70 flex items-center gap-1">
                          <Clock size={12} /> {task.duration}m
                        </div>
                        <button
                          onClick={() => deleteScheduledTask(task.id)}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-200 dark:hover:bg-red-900/50 rounded"
                        >
                          <X size={14} className="text-red-600" />
                        </button>
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Unscheduled Tasks */}
        <div className="bg-warm-50 dark:bg-warm-800/50 rounded-xl p-4 border border-warm-200 dark:border-warm-700 flex flex-col">
          <h3 className="font-bold text-warm-900 dark:text-warm-100 mb-4">Do Zaplanowania</h3>

          {/* Stats */}
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">
              <AlertCircle size={14} className="inline mr-1" />
              Zaplanowane: {calculateTotalScheduledTime()} min
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
              Do zaplanowania: {calculateTotalUnscheduledTime()} min
            </p>
          </div>

          {/* Add Task Form */}
          {showAddTask ? (
            <div className="mb-4 p-3 bg-white dark:bg-warm-900 rounded-lg border border-warm-200 dark:border-warm-700 space-y-2">
              <input
                type="text"
                placeholder="Nazwa zadania"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                className="w-full px-2 py-1 text-sm border border-warm-200 dark:border-warm-700 rounded bg-warm-50 dark:bg-warm-800 text-warm-900 dark:text-warm-100"
                autoFocus
              />
              <input
                type="number"
                min="5"
                max="480"
                step="5"
                placeholder="Czas (min)"
                value={newTaskMinutes}
                onChange={(e) => setNewTaskMinutes(Math.max(5, parseInt(e.target.value) || 30))}
                className="w-full px-2 py-1 text-sm border border-warm-200 dark:border-warm-700 rounded bg-warm-50 dark:bg-warm-800 text-warm-900 dark:text-warm-100"
              />
              <div className="flex gap-2">
                <button
                  onClick={addTask}
                  className="flex-1 px-2 py-1 bg-brand-600 text-white text-sm rounded font-medium hover:bg-brand-700"
                >
                  Dodaj
                </button>
                <button
                  onClick={() => setShowAddTask(false)}
                  className="px-2 py-1 bg-warm-200 dark:bg-warm-700 text-warm-700 dark:text-warm-300 text-sm rounded"
                >
                  Anuluj
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddTask(true)}
              className="mb-4 w-full px-3 py-2 bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 rounded-lg font-medium text-sm hover:bg-brand-200 dark:hover:bg-brand-900/50 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Nowe zadanie
            </button>
          )}

          {/* Task List */}
          <div className="space-y-2 flex-1 overflow-y-auto">
            {unscheduledTasks.map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={() => handleDragStart(task)}
                className="p-3 bg-white dark:bg-warm-900 rounded-lg border-2 border-warm-300 dark:border-warm-700 cursor-grab active:cursor-grabbing hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-2 mb-1">
                  <GripVertical size={14} className="text-warm-400 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-sm font-medium text-warm-900 dark:text-warm-100 flex-1">{task.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-warm-500 dark:text-warm-400 flex items-center gap-1">
                    <Clock size={12} /> {task.estimatedMinutes} min
                  </span>
                  <button
                    onClick={() => deleteUnscheduledTask(task.id)}
                    className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
            {unscheduledTasks.length === 0 && (
              <p className="text-xs text-warm-500 dark:text-warm-400 text-center py-8">
                Brak zadań do zaplanowania.<br />Przeciągnij tutaj lub dodaj nowe.
              </p>
            )}
          </div>

          {/* Tips */}
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-xs text-yellow-700 dark:text-yellow-300">
            💡 Przeciągnij zadanie na oś czasu, aby je zaplanować.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayPlanner;
