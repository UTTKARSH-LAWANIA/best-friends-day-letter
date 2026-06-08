import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Sparkles, MessageCircle, HeartHandshake, ShieldCheck, ChevronRight } from 'lucide-react';

const REASONS = [
  {
    icon: MessageCircle,
    color: "from-pink-400 to-rose-500",
    shadow: "shadow-pink-500/10",
    title: "You always listen",
    desc: "No matter how late, how long, or how random the topic is, you always make time to listen. Your advice is gold, and your silence is comforting."
  },
  {
    icon: Sparkles,
    color: "from-purple-400 to-fuchsia-500",
    shadow: "shadow-purple-500/10",
    title: "You understand people",
    desc: "You have a natural gift of empathy. You can read my silence, decode my texts, and know exactly when I need a hug, a joke, or just space."
  },
  {
    icon: Smile,
    color: "from-amber-400 to-orange-500",
    shadow: "shadow-amber-500/10",
    title: "You make life more fun",
    desc: "The random late-night memes, inside jokes, and spontaneous plans. Even doing absolutely nothing becomes an adventure when we do it together."
  },
  {
    icon: HeartHandshake,
    color: "from-blue-400 to-indigo-500",
    shadow: "shadow-blue-500/10",
    title: "You support others",
    desc: "You are my loudest cheerleader and my safest anchor. You celebrate my wins like they are yours and carry me through my lows without hesitation."
  },
  {
    icon: ShieldCheck,
    color: "from-emerald-400 to-teal-500",
    shadow: "shadow-emerald-500/10",
    title: "You are genuinely yourself",
    desc: "You walk to the beat of your own drum. In a world full of copies, your authenticity is refreshing, and it inspires me to be myself too."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

export default function ReasonsSection({ onNext }) {
  return (
    <section className="min-h-screen py-24 px-4 max-w-5xl mx-auto flex flex-col justify-center">
      <div className="text-center mb-16 space-y-3">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-100 dark:bg-pink-900/30 text-pink-500 border border-pink-200/30"
        >
          Why You Are Amazing
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold font-sans text-[var(--text-title)]"
        >
          Reasons You're My <span className="gradient-text-pink-purple">Best Friend</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[var(--text-muted)] text-base max-w-md mx-auto"
        >
          Just a few simple reminders of why you make this world a much better place.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {REASONS.map((reason, idx) => {
          const Icon = reason.icon;
          return (
            <motion.div
              key={idx}
              variants={cardVariants}
              className={`glass-panel p-6 glass-panel-hover flex flex-col h-full relative overflow-hidden group shadow-lg ${reason.shadow}`}
            >
              <div className="absolute -right-10 -bottom-10 w-28 h-28 rounded-full bg-gradient-to-tr from-pink-500/5 to-purple-500/5 blur-xl group-hover:scale-150 transition-transform duration-500" />
              
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${reason.color} flex items-center justify-center text-white shadow-md mb-6 transition-transform duration-300 group-hover:scale-110`}>
                <Icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold mb-3 text-[var(--text-title)]">
                {reason.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-grow">
                {reason.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

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
          className="flex items-center gap-2 py-3.5 px-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold shadow-xl hover:shadow-purple-500/20 border border-white/10 cursor-pointer transition-all"
        >
          View Friendship Stats
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
}
