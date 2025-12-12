import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Zap, Brain } from 'lucide-react';

const FocusTimer: React.FC = () => {
  // Default 25 minutes
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'FOCUS' | 'BREAK'>('FOCUS');
  const [initialTime, setInitialTime] = useState(25 * 60);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play sound or notification logic could go here
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(initialTime);
  };

  const setPreset = (minutes: number, newMode: 'FOCUS' | 'BREAK') => {
    const seconds = minutes * 60;
    setMode(newMode);
    setInitialTime(seconds);
    setTimeLeft(seconds);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((initialTime - timeLeft) / initialTime) * 100;
  
  // Dynamic gradient colors based on mode and theme could be complex, keeping simpler for now
  // Using hardcoded hex for conic gradient logic in style prop, but updating container bg
  
  return (
    <div className="bg-white dark:bg-warm-900 rounded-2xl shadow-sm border border-warm-200 dark:border-warm-800 p-6 md:p-10 flex flex-col items-center justify-center min-h-[400px] transition-colors">
      <div className="flex gap-2 mb-8 flex-wrap justify-center">
        <button
          onClick={() => setPreset(25, 'FOCUS')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
            mode === 'FOCUS' && initialTime === 25 * 60 
              ? 'bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500' 
              : 'bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-400 hover:bg-warm-200 dark:hover:bg-warm-700'
          }`}
        >
          <Zap size={16} /> Pomodoro (25m)
        </button>
        <button
          onClick={() => setPreset(45, 'FOCUS')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
            mode === 'FOCUS' && initialTime === 45 * 60 
              ? 'bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500' 
              : 'bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-400 hover:bg-warm-200 dark:hover:bg-warm-700'
          }`}
        >
          <Brain size={16} /> Deep Work (45m)
        </button>
        <button
          onClick={() => setPreset(5, 'BREAK')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
            mode === 'BREAK' 
              ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 ring-2 ring-green-500' 
              : 'bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-400 hover:bg-warm-200 dark:hover:bg-warm-700'
          }`}
        >
          <Coffee size={16} /> Przerwa (5m)
        </button>
      </div>

      <div className="relative mb-8">
        {/* Simple Ring Visualization using CSS conic-gradient */}
        <div 
          className="w-64 h-64 rounded-full flex items-center justify-center shadow-inner relative transition-all duration-1000"
          style={{
            background: `conic-gradient(${mode === 'FOCUS' ? '#14b8a6' : '#22c55e'} ${progress}%, var(--tw-gradient-stop, #f5f5f4) 0)`
          }}
        >
          {/* Inner circle covers the center of conic gradient */}
          <div className="w-[240px] h-[240px] bg-white dark:bg-warm-900 rounded-full flex flex-col items-center justify-center z-10 transition-colors">
            <span className={`text-6xl font-bold font-mono tracking-tighter ${mode === 'FOCUS' ? 'text-brand-900 dark:text-brand-100' : 'text-green-800 dark:text-green-100'}`}>
              {formatTime(timeLeft)}
            </span>
            <span className="text-warm-400 dark:text-warm-500 mt-2 font-medium uppercase tracking-widest text-sm">
              {isActive ? (mode === 'FOCUS' ? 'Skupienie' : 'Relaks') : 'Pauza'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 active:scale-95 ${
            mode === 'FOCUS' ? 'bg-brand-600 hover:bg-brand-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isActive ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
        </button>
        <button
          onClick={resetTimer}
          className="w-16 h-16 rounded-full bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-400 flex items-center justify-center hover:bg-warm-200 dark:hover:bg-warm-700 transition-colors"
        >
          <RotateCcw size={24} />
        </button>
      </div>
      
      {timeLeft === 0 && (
        <div className="mt-6 animate-bounce text-center">
          <p className="text-xl font-bold text-brand-700 dark:text-brand-300">Czas minął! 🎉</p>
          <p className="text-warm-500 dark:text-warm-400">Zrób sobie chwilę przerwy lub wróć do zadania.</p>
        </div>
      )}
    </div>
  );
};

export default FocusTimer;