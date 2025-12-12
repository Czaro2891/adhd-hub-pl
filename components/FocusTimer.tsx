import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Zap, Brain, Settings, X, Volume2, VolumeX } from 'lucide-react';

type AmbientSoundType = 'none' | 'rain' | 'forest' | 'ocean' | 'coffee' | 'pink-noise';

interface SoundConfig {
  id: AmbientSoundType;
  label: string;
  emoji: string;
}

const AMBIENT_SOUNDS: SoundConfig[] = [
  { id: 'none', label: 'Brak dźwięku', emoji: '🔇' },
  { id: 'rain', label: 'Deszcz', emoji: '🌧️' },
  { id: 'forest', label: 'Las', emoji: '🌲' },
  { id: 'ocean', label: 'Ocean', emoji: '🌊' },
  { id: 'coffee', label: 'Kawiarnia', emoji: '☕' },
  { id: 'pink-noise', label: 'Szum różowy', emoji: '📻' },
];

const FocusTimer: React.FC = () => {
  // Default 25 minutes
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'FOCUS' | 'BREAK'>('FOCUS');
  const [initialTime, setInitialTime] = useState(25 * 60);
  
  // Custom intervals
  const [customFocusTime, setCustomFocusTime] = useState(25);
  const [customBreakTime, setCustomBreakTime] = useState(5);
  const [showSettings, setShowSettings] = useState(false);
  
  // Ambient sound
  const [selectedSound, setSelectedSound] = useState<AmbientSoundType>('none');
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      playCompletionSound();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Play/pause ambient sound
  useEffect(() => {
    if (selectedSound === 'none' || !isActive) {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsSoundPlaying(false);
      }
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    // Create or use data URLs for ambient sounds (placeholder URLs - in production, use actual sound files)
    const soundUrls: Record<AmbientSoundType, string> = {
      'none': '',
      'rain': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder
      'forest': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Placeholder
      'ocean': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', // Placeholder
      'coffee': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', // Placeholder
      'pink-noise': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', // Placeholder
    };

    const soundUrl = soundUrls[selectedSound];
    if (soundUrl && audioRef.current.src !== soundUrl) {
      audioRef.current.src = soundUrl;
    }

    audioRef.current.play().catch(() => {
      // Autoplay may be blocked by browser
      console.warn('Ambient sound autoplay blocked by browser');
    });
    setIsSoundPlaying(true);
  }, [selectedSound, isActive]);

  const playCompletionSound = () => {
    // Simple notification sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

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

  const applyCustomSettings = () => {
    const seconds = mode === 'FOCUS' ? customFocusTime * 60 : customBreakTime * 60;
    setInitialTime(seconds);
    setTimeLeft(seconds);
    setIsActive(false);
    setShowSettings(false);
  };

  const switchMode = (newMode: 'FOCUS' | 'BREAK') => {
    const seconds = newMode === 'FOCUS' ? customFocusTime * 60 : customBreakTime * 60;
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
    <div className="bg-white dark:bg-warm-900 rounded-2xl shadow-sm border border-warm-200 dark:border-warm-800 p-6 md:p-10 flex flex-col items-center justify-center min-h-[500px] transition-colors relative">
      
      {/* Settings Button */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="absolute top-6 right-6 p-2 rounded-full bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-400 hover:bg-warm-200 dark:hover:bg-warm-700 transition-colors"
        aria-label="Ustawienia"
      >
        {showSettings ? <X size={20} /> : <Settings size={20} />}
      </button>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-14 right-6 bg-white dark:bg-warm-900 rounded-xl shadow-xl border border-warm-200 dark:border-warm-800 p-6 w-80 z-20">
          <h3 className="text-lg font-bold text-warm-900 dark:text-warm-100 mb-4">Ustawienia</h3>
          
          {/* Work interval */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-2">
              Czas skupienia (minuty)
            </label>
            <input
              type="number"
              min="1"
              max="120"
              value={customFocusTime}
              onChange={(e) => setCustomFocusTime(Math.max(1, parseInt(e.target.value) || 25))}
              className="w-full px-3 py-2 border border-warm-200 dark:border-warm-700 rounded-lg bg-warm-50 dark:bg-warm-800 text-warm-900 dark:text-warm-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Break interval */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-2">
              Czas przerwy (minuty)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={customBreakTime}
              onChange={(e) => setCustomBreakTime(Math.max(1, parseInt(e.target.value) || 5))}
              className="w-full px-3 py-2 border border-warm-200 dark:border-warm-700 rounded-lg bg-warm-50 dark:bg-warm-800 text-warm-900 dark:text-warm-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Ambient sound selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-3">
              Dźwięk otoczenia
            </label>
            <div className="grid grid-cols-3 gap-2">
              {AMBIENT_SOUNDS.map((sound) => (
                <button
                  key={sound.id}
                  onClick={() => setSelectedSound(sound.id)}
                  className={`p-2 rounded-lg text-center transition-colors text-xs font-medium ${
                    selectedSound === sound.id
                      ? 'bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500'
                      : 'bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-400 hover:bg-warm-200 dark:hover:bg-warm-700'
                  }`}
                  title={sound.label}
                >
                  <span className="block text-lg mb-1">{sound.emoji}</span>
                  <span className="line-clamp-2">{sound.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={applyCustomSettings}
            className="w-full mt-6 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors"
          >
            Zastosuj
          </button>
        </div>
      )}

      {/* Presets and Mode */}
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
          onClick={() => switchMode('BREAK')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
            mode === 'BREAK' 
              ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 ring-2 ring-green-500' 
              : 'bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-400 hover:bg-warm-200 dark:hover:bg-warm-700'
          }`}
        >
          <Coffee size={16} /> Przerwa ({customBreakTime}m)
        </button>
      </div>

      {/* Sound indicator */}
      {selectedSound !== 'none' && (
        <div className="mb-6 flex items-center gap-2 text-sm font-medium text-warm-600 dark:text-warm-400">
          {isSoundPlaying && isActive ? (
            <>
              <Volume2 size={16} className="animate-pulse" />
              <span>Odtwarzanie: {AMBIENT_SOUNDS.find(s => s.id === selectedSound)?.label}</span>
            </>
          ) : (
            <>
              <VolumeX size={16} />
              <span>{AMBIENT_SOUNDS.find(s => s.id === selectedSound)?.label} (gotowy)</span>
            </>
          )}
        </div>
      )}

      {/* Timer Display */}
      <div className="relative mb-8">
        <div 
          className="w-64 h-64 rounded-full flex items-center justify-center shadow-inner relative transition-all duration-1000"
          style={{
            background: `conic-gradient(${mode === 'FOCUS' ? '#14b8a6' : '#22c55e'} ${progress}%, var(--tw-gradient-stop, #f5f5f4) 0)`
          }}
        >
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

      {/* Controls */}
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