import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FinalSurprise() {
  const [hugSent, setHugSent] = useState(false);

  const handleSendHug = () => {
    setHugSent(true);

    const end = Date.now() + 2 * 1000;
    const colors = ['#ec4899', '#a855f7', '#3b82f6', '#f43f5e', '#10b981'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <section className="min-h-screen py-24 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-pink-500/10 dark:bg-purple-500/10 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-lg p-8 glass-panel text-center relative z-10"
      >
        <div className="absolute top-4 right-6 text-yellow-400/80 animate-pulse">
          <Sparkles className="w-5 h-5" />
        </div>

        <div className="relative flex justify-center mb-8">
          <motion.div
            animate={{ 
              scale: [1, 1.18, 1],
              filter: [
                'drop-shadow(0 0 10px rgba(236,72,153,0.3))',
                'drop-shadow(0 0 25px rgba(236,72,153,0.6))',
                'drop-shadow(0 0 10px rgba(236,72,153,0.3))'
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: 'easeInOut'
            }}
            className="cursor-pointer text-pink-500"
            onClick={handleSendHug}
          >
            <Heart className="w-24 h-24 fill-current" />
          </motion.div>
        </div>

        <h2 className="text-3xl font-extrabold text-[var(--text-title)] mb-6">
          The Final Surprise
        </h2>

        <div className="bg-slate-950/80 rounded-xl p-5 mb-8 border border-purple-900/30 text-left font-mono text-xs md:text-sm text-purple-400 space-y-2 select-none">
          <div className="flex justify-between text-purple-300">
            <span>Friendship Status</span>
            <span>100%</span>
          </div>
          <div className="text-pink-500 tracking-wider">
            ██████████████████████
          </div>
          <div className="text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
            <span>✓</span> Permanent Access Granted
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!hugSent ? (
            <motion.div
              key="hug-button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-4"
            >
              <p className="text-sm text-[var(--text-muted)] font-medium max-w-sm mx-auto mb-6">
                Click below to send a virtual hug and unlock our friendship certificate!
              </p>
              
              <motion.button
                onClick={handleSendHug}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mx-auto py-4 px-8 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-extrabold text-base shadow-xl hover:shadow-pink-500/25 border border-white/10 flex items-center gap-2 cursor-pointer transition-all"
              >
                Send Virtual Hug 🤗
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="hug-sent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="space-y-4"
            >
              <motion.div 
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="inline-block p-4 rounded-full bg-pink-100/50 dark:bg-pink-900/20 text-pink-500 border border-pink-200/20"
              >
                <Sparkles className="w-8 h-8" />
              </motion.div>
              
              <h3 className="text-2xl md:text-3xl font-extrabold gradient-text-full font-serif italic py-2">
                ❤️ Thank You For Being You ❤️
              </h3>
              
              <p className="text-xs text-[var(--text-muted)] italic font-semibold pt-2">
                Virtual hug successfully dispatched! You are the best.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
