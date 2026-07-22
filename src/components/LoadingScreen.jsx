import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onFinished, initialName }) {
  const [subStep, setSubStep] = useState(0); // 0: Line 1, 1: Line 2, 2: Input (if needed) or Transition
  const [nameInput, setNameInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (subStep === 0) {
      const timer = setTimeout(() => {
        setSubStep(1);
      }, 3500); // Show line 1 for 3.5s (includes fade time)
      return () => clearTimeout(timer);
    } else if (subStep === 1) {
      const timer = setTimeout(() => {
        if (initialName && initialName.trim().length > 0) {
          // If name is already present (e.g. "Shivika" from URL/settings), reveal site
          onFinished(initialName);
        } else {
          // Otherwise, ask for name
          setSubStep(2);
        }
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [subStep, initialName, onFinished]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalName = nameInput.trim();
    if (finalName.length > 0) {
      onFinished(finalName);
    } else {
      onFinished("Shivika"); // Default fallback to Shivika if empty
    }
  };

  // Focus input automatically on step 2
  useEffect(() => {
    if (subStep === 2 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [subStep]);

  return (
    <div className="fixed inset-0 bg-[#050505] flex items-center justify-center p-6 z-[999] select-none overflow-hidden">
      <div className="max-w-2xl w-full text-center relative px-4">
        <AnimatePresence mode="wait">
          {subStep === 0 && (
            <motion.div
              key="line1"
              initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(10px)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl font-light tracking-widest text-[#B4B4B4] font-sans"
            >
              For someone who deserves more than just a message.
            </motion.div>
          )}

          {subStep === 1 && (
            <motion.div
              key="line2"
              initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(10px)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl font-light tracking-widest text-[#B4B4B4] font-sans"
            >
              So I built something instead.
            </motion.div>
          )}

          {subStep === 2 && (
            <motion.div
              key="input-form"
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center"
            >
              <h2 className="text-sm uppercase tracking-[0.2em] text-[#8B5CF6] mb-8 font-semibold">
                Identify Yourself
              </h2>
              <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col items-center gap-6">
                <div className="relative w-full border-b border-white/10 py-3 transition-colors duration-300 focus-within:border-[#8B5CF6]">
                  <input
                    ref={inputRef}
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Enter your name..."
                    className="w-full bg-transparent border-none outline-none text-center text-xl md:text-2xl font-light tracking-wider text-white placeholder-white/20 select-text"
                    maxLength={20}
                  />
                  {nameInput.length === 0 && !isFocused && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-white/20 text-xl font-light tracking-wider">
                      Enter name
                    </div>
                  )}
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 text-xs uppercase tracking-widest text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-6 py-2.5 rounded-full bg-white/5 transition-all duration-300"
                >
                  Enter Experience
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
