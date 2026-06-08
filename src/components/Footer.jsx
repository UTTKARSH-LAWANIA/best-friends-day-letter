import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';

export default function Footer({ name }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200/30 dark:border-slate-800/30 bg-white/20 dark:bg-slate-950/20 py-12 px-4 relative z-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
        <div className="p-3.5 rounded-full bg-pink-100/50 dark:bg-pink-900/15 border border-pink-200/20 text-pink-500 animate-pulse">
          <Heart className="w-5 h-5 fill-current" />
        </div>

        <div className="space-y-1.5">
          <p className="text-sm font-bold text-[var(--text-title)]">
            Made with ❤️ for {name}
          </p>
          <p className="text-xs text-[var(--text-muted)] font-semibold tracking-wide">
            Happy Best Friends Day • A friendship that lasts forever.
          </p>
        </div>

        <button
          onClick={scrollToTop}
          className="p-3.5 rounded-full bg-white dark:bg-slate-900 text-[var(--text-main)] border border-pink-100 dark:border-slate-800 shadow-md hover:scale-110 hover:-translate-y-1 cursor-pointer transition-all flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
