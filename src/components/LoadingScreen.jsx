import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TERMINAL_LINES = [
  { text: "Initializing Friendship Protocol...", delay: 200 },
  { text: "Loading Memories Database...", delay: 1000 },
  { text: "Checking Trust Levels...", delay: 1800 },
  { text: "Trust Level: 100% ✓", delay: 2600, color: "text-emerald-400 font-bold" },
  { text: "Best Friend Detected ❤️", delay: 3400, color: "text-rose-400 font-bold animate-pulse" }
];

export default function LoadingScreen({ onFinished }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    TERMINAL_LINES.forEach((line) => {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
      }, line.delay);
      return () => clearTimeout(timer);
    });

    const intervalTime = 40;
    const totalSteps = 4200 / intervalTime;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min((currentStep / totalSteps) * 100, 100);
      setProgress(currentProgress);

      if (currentStep >= totalSteps) {
        clearInterval(progressInterval);
        const finishTimer = setTimeout(() => {
          onFinished();
        }, 1000);
        return () => clearTimeout(finishTimer);
      }
    }, intervalTime);

    return () => {
      clearInterval(progressInterval);
    };
  }, [onFinished]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#07040d] p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.5 } }}
        className="w-full max-w-lg rounded-xl overflow-hidden shadow-2xl border border-purple-900/30 bg-[#0f0b1a]/90 backdrop-blur-xl"
      >
        <div className="bg-[#171128] px-4 py-3 border-b border-purple-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <span className="text-xs font-mono text-purple-400/60 select-none">
            friendship_protocol.sh
          </span>
          <div className="w-10" />
        </div>

        <div className="p-6 font-mono text-sm leading-relaxed min-h-[260px] flex flex-col justify-between text-purple-300">
          <div className="space-y-3">
            {visibleLines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={line.color || "text-purple-300"}
              >
                <span className="text-purple-500 mr-2">&gt;</span>
                {line.text}
              </motion.div>
            ))}
          </div>

          <div className="mt-8 space-y-2">
            <div className="flex justify-between text-xs text-purple-400/80">
              <span>Status: {progress >= 100 ? "Ready" : "Loading..."}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            
            <div className="w-full h-4 bg-purple-950/50 rounded-full border border-purple-900/40 p-0.5 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full"
                style={{ width: `${progress}%` }}
                layoutId="progressBar"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
