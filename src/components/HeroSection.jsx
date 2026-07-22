import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection({ name, onBegin }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Cinematic Glowing Background Nodes */}
      <div className="bg-glow w-[350px] h-[350px] bg-[#8B5CF6]/10 top-[20%] left-[15%]" />
      <div className="bg-glow w-[400px] h-[400px] bg-[#38BDF8]/5 bottom-[15%] right-[10%] [animation-delay:4s]" />

      <div className="max-w-4xl w-full z-10 space-y-12">
        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#8B5CF6] font-semibold"
          >
            A Dedicated Celebration
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-extrabold tracking-tight text-white font-sans leading-none"
          >
            Happy Birthday,
            <span className="block mt-2 bg-gradient-to-r from-white via-white to-[#8B5CF6] bg-clip-text text-transparent">
              {name}
            </span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md mx-auto space-y-4"
        >
          <p className="text-[#B4B4B4] text-base md:text-lg font-light leading-relaxed tracking-wide font-serif italic">
            "Some gifts are bought. Some are built. This one was built for you."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6"
        >
          <button
            onClick={onBegin}
            className="premium-btn text-xs tracking-[0.2em] font-sans"
          >
            Begin
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 select-none">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white font-sans">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-1 h-3 rounded-full bg-white"
        />
      </div>
    </div>
  );
}
