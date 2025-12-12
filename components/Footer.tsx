import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-warm-900 border-t border-warm-200 dark:border-warm-800 py-12 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-warm-600 dark:text-warm-400 mb-2">
          Stworzone z empatią dla społeczności ADHD w Polsce.
        </p>
        <p className="text-sm text-warm-400 dark:text-warm-500">
          Treści mają charakter edukacyjny i nie zastępują porady lekarskiej.
        </p>
      </div>
    </footer>
  );
};

export default Footer;