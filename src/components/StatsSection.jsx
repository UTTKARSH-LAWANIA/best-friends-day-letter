import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Activity, ShieldCheck, Smile } from 'lucide-react';

function AnimatedCounter({ to, duration = 2.5, suffix = '', isInfinity = false, isForever = false }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = parseInt(to, 10);
    if (isNaN(end)) return;

    const totalFrames = duration * 60;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easedProgress = progress * (2 - progress);
      const currentValue = Math.floor(easedProgress * end);
      
      setCount(currentValue);

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(end);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className="font-extrabold text-4xl md:text-5xl font-mono text-[var(--text-title)] select-none">
      {isInfinity && count >= to ? "∞" : isForever && count >= to ? "Forever" : `${count}${suffix}`}
    </span>
  );
}

const STATS_DATA = [
  {
    icon: ShieldCheck,
    title: "Trust Level",
    color: "text-emerald-500",
    bgColor: "bg-emerald-100/50 dark:bg-emerald-900/20",
    borderColor: "border-emerald-200/50 dark:border-emerald-900/30",
    to: "100",
    suffix: "%",
    desc: "Built on absolute secrecy, shared late-night rants, and never judging each other."
  },
  {
    icon: Heart,
    title: "Support Level",
    color: "text-pink-500",
    bgColor: "bg-pink-100/50 dark:bg-pink-900/20",
    borderColor: "border-pink-200/50 dark:border-pink-900/30",
    to: "100",
    isInfinity: true,
    desc: "Infinite capacity to pick each other up, back each other up, and believe in each other."
  },
  {
    icon: Smile,
    title: "Laughter Generated",
    color: "text-amber-500",
    bgColor: "bg-amber-100/50 dark:bg-amber-900/20",
    borderColor: "border-amber-200/50 dark:border-amber-900/30",
    to: "9999",
    suffix: "+",
    desc: "Calculated in stomach aches, tears run dry, and inside jokes that sound like gibberish."
  },
  {
    icon: Activity,
    title: "Friendship Duration",
    color: "text-blue-500",
    bgColor: "bg-blue-100/50 dark:bg-blue-900/20",
    borderColor: "border-blue-200/50 dark:border-blue-900/30",
    to: "100",
    isForever: true,
    desc: "A permanent lifetime subscription with absolutely no cancellation terms allowed."
  }
];

export default function StatsSection({ onNext }) {
  return (
    <section className="min-h-screen py-24 px-4 max-w-5xl mx-auto flex flex-col justify-center">
      <div className="text-center mb-16 space-y-3">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/30 text-blue-500 border border-blue-200/30"
        >
          By The Numbers
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold font-sans text-[var(--text-title)]"
        >
          Friendship <span className="gradient-text-purple-blue">Statistics</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[var(--text-muted)] text-base max-w-md mx-auto"
        >
          A highly scientific and data-driven analysis of our bond. (Margin of error: 0.0%)
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS_DATA.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: 'spring', stiffness: 100 }}
              className={`glass-panel p-6 border border-slate-200/50 flex flex-col items-center text-center shadow-lg relative overflow-hidden`}
            >
              <div className={`p-4 rounded-2xl ${stat.bgColor} border ${stat.borderColor} ${stat.color} mb-6`}>
                <Icon className="w-8 h-8" />
              </div>

              <div className="mb-2">
                <AnimatedCounter
                  to={stat.to}
                  suffix={stat.suffix}
                  isInfinity={stat.isInfinity}
                  isForever={stat.isForever}
                />
              </div>

              <h3 className="text-lg font-bold text-[var(--text-title)] mb-3">{stat.title}</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{stat.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-16 flex justify-center"
      >
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="py-3.5 px-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold shadow-xl hover:shadow-purple-500/20 border border-white/10 cursor-pointer transition-all animate-pulse-slow"
        >
          Claim Final Surprise 🎁
        </motion.button>
      </motion.div>
    </section>
  );
}
