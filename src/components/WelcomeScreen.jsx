import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Heart, Sparkles, MailOpen } from 'lucide-react';

export default function WelcomeScreen({ onStart }) {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const controls = useAnimation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError(true);
      await controls.start({
        x: [0, -10, 10, -10, 10, -5, 5, 0],
        transition: { duration: 0.4 }
      });
      return;
    }
    setError(false);
    onStart(trimmed);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-pink-400/20 dark:bg-pink-500/10 blur-[60px] animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-400/20 dark:bg-purple-500/10 blur-[80px] animate-float-medium" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-blue-400/20 dark:bg-blue-500/10 blur-[70px] animate-float-fast" style={{ animationDelay: '4s' }} />

      <motion.div
        animate={controls}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        className="w-full max-w-md p-8 glass-panel relative z-10 text-center"
      >
        <div className="absolute top-4 left-6 text-pink-400 animate-pulse">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="absolute bottom-6 right-6 text-blue-400 animate-bounce">
          <Heart className="w-4 h-4 fill-current" />
        </div>

        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-xl shadow-pink-500/20 mb-6"
        >
          <Heart className="w-8 h-8 fill-current text-white/90" />
        </motion.div>

        <h1 className="text-3xl font-extrabold font-sans tracking-tight mb-2 text-[var(--text-title)]">
          Hey Best Friend <span className="inline-block animate-bounce">❤️</span>
        </h1>
        <p className="text-sm mb-8 text-[var(--text-muted)] font-medium">
          I've created something special for you. Let me know who is opening this!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Enter your name..."
              className={`w-full px-5 py-4 rounded-xl outline-none text-base transition-all font-semibold
                bg-white/50 dark:bg-slate-900/50 text-[var(--text-main)] placeholder-slate-400 dark:placeholder-slate-500
                border-2 ${
                  error 
                    ? 'border-rose-400 focus:border-rose-500 shadow-rose-400/20' 
                    : 'border-pink-200/50 dark:border-purple-900/20 focus:border-pink-400 dark:focus:border-purple-500 focus:shadow-pink-400/15'
                } focus:shadow-lg focus:bg-white dark:focus:bg-slate-950`}
            />
            {error && (
              <span className="absolute left-2 -bottom-5 text-xs text-rose-500 font-bold">
                Please enter your name so I can customize the letter!
              </span>
            )}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-6 rounded-xl text-white font-bold text-base shadow-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:shadow-pink-500/25 border border-white/10 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <MailOpen className="w-5 h-5" />
            Open Letter
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
