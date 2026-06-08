import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';

export default function Navbar({ name, darkMode, setDarkMode }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.pageYOffset / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md border-b border-white/20 dark:border-white/5 shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div 
          onClick={() => handleScrollTo('letter')}
          className="flex items-center gap-1.5 cursor-pointer font-extrabold text-lg tracking-tight text-[var(--text-title)]"
        >
          <Sparkles className="w-5 h-5 text-pink-500 animate-spin-slow" />
          <span>Besties Day</span>
        </div>

        {/* Updated Links list (Timeline and Gallery removed) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[var(--text-muted)]">
          {['Letter', 'Reasons', 'Stats', 'Surprise'].map((sec) => (
            <button
              key={sec}
              onClick={() => handleScrollTo(sec.toLowerCase())}
              className="hover:text-pink-500 cursor-pointer transition-colors relative py-1 group"
            >
              {sec}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {name && (
            <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-pink-100 dark:bg-pink-900/30 text-pink-500 border border-pink-200/20">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
              <span>For: {name}</span>
            </div>
          )}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 text-[var(--text-main)] hover:scale-105 border border-pink-100 dark:border-slate-800 shadow-sm cursor-pointer transition-all"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-purple-600 fill-purple-600" />
            )}
          </button>
        </div>
      </div>

      <div className="w-full h-[3px] bg-slate-200/20">
        <div 
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </motion.header>
  );
}
