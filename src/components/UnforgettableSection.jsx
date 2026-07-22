import React from 'react';
import { motion } from 'framer-motion';

const UNFORGETTABLE_LINES = [
  "How effortlessly you make a room feel warmer the second you smile.",
  "Your unfiltered, genuine honesty in a world full of sugarcoated noise.",
  "The quiet grace and composure you maintain even when everything feels hectic.",
  "The way you remember small details about people, making them feel seen and valued.",
  "Your spontaneous plans and infectious energy that lead to the most memorable adventures."
];

export default function UnforgettableSection() {
  return (
    <section className="min-h-screen py-24 px-4 flex flex-col justify-center items-center relative bg-[#070707]">
      {/* Slow glowing light */}
      <div className="bg-glow w-[350px] h-[350px] bg-[#8B5CF6]/5 top-[30%] right-[15%]" />

      <div className="max-w-4xl w-full z-10 space-y-16">
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-[#8B5CF6] font-semibold">Section 05</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Things That Make You Unforgettable
          </h2>
          <p className="text-[#B4B4B4] font-light text-sm max-w-sm mx-auto">
            A few silent reminders of the footprint you leave in the lives of others.
          </p>
        </div>

        <div className="space-y-10 max-w-3xl mx-auto pt-6">
          {UNFORGETTABLE_LINES.map((line, idx) => (
            <div key={idx} className="relative">
              {/* Thin line separating items */}
              {idx > 0 && <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5" />}
              
              <motion.div
                initial={{ opacity: 0, y: 25, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="pt-10 flex flex-col md:flex-row items-baseline gap-4 md:gap-8 group"
              >
                <span className="text-xs font-mono text-[#8B5CF6]/60 font-semibold group-hover:text-[#8B5CF6] transition-colors duration-300">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p className="text-lg md:text-xl font-light text-[#B4B4B4] group-hover:text-white transition-colors duration-300 leading-relaxed font-sans">
                  {line}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
