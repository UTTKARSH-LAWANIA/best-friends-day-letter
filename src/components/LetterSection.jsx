import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight } from 'lucide-react';

export default function LetterSection({ name, onNext }) {
  const [typedText, setTypedText] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const containerRef = useRef(null);

  const fullLetter = `Dear ${name},
  Happy Best Friends Day ❤️
  Thank you for all the memories, laughs, and good times. Life is better with good friends around, and I'm glad you're one of them.
  Wishing you lots of happiness and success ahead.
  Stay awesome! 🤝✨`;

  useEffect(() => {
    let index = 0;
    let currentText = '';
    let timer;

    const type = () => {
      if (index < fullLetter.length) {
        const char = fullLetter.charAt(index);
        currentText += char;
        setTypedText(currentText);
        index++;

        let delay = 35;
        if (char === '.' || char === '!' || char === '?') {
          delay = 500;
        } else if (char === ',' || char === '\n') {
          delay = 250;
        }

        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }

        timer = setTimeout(type, delay);
      } else {
        setIsFinished(true);
      }
    };

    timer = setTimeout(type, 500);

    return () => clearTimeout(timer);
  }, [name]);

  return (
    <div className="min-h-screen py-20 px-4 flex flex-col items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl glass-panel p-8 relative overflow-hidden"
      >
        <div className="absolute top-6 right-6 w-16 h-16 border-2 border-dashed border-pink-400/40 rounded flex items-center justify-center rotate-6 select-none pointer-events-none">
          <Heart className="w-8 h-8 text-pink-400/40 fill-current animate-pulse" />
        </div>

        <div 
          ref={containerRef}
          className="max-h-[500px] overflow-y-auto pr-2 relative font-serif text-lg leading-loose tracking-wide text-slate-800 dark:text-slate-200 select-text whitespace-pre-wrap"
          style={{
            backgroundImage: 'linear-gradient(rgba(236, 72, 153, 0.08) 1px, transparent 1px)',
            backgroundSize: '100% 2.5rem',
            lineHeight: '2.5rem',
            paddingTop: '0.2rem'
          }}
        >
          <span className={isFinished ? '' : 'typewriter-cursor'}>
            {typedText}
          </span>
        </div>

        <AnimatePresence>
          {isFinished && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-8 flex justify-center"
            >
              <motion.button
                onClick={onNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 py-3 px-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 text-white font-bold shadow-xl hover:shadow-pink-500/20 border border-white/10 cursor-pointer transition-all"
              >
                Continue to Reasons
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
