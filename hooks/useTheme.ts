import { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

export const useTheme = () => {
  // Use local storage to persist preference, default to false (light mode)
  const [isDark, setIsDark] = useLocalStorage<boolean>('adhd-hub-theme', false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return { isDark, toggleTheme };
};