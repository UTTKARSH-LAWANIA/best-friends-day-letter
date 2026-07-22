import React from 'react';
import { motion } from 'framer-motion';

// Import local assets
import shivika2 from '../assets/shivika_2.jpg';
import shivika3 from '../assets/shivika_3.jpg';
import shivika4 from '../assets/shivika_4.jpg';

const MEMORIES = [
  {
    image: shivika2,
    position: "center 25%",
    number: "01",
    subtitle: "The Quiet Moments",
    title: "A calm space, a warm smile.",
    desc: "Finding comfort in beautiful, tucked-away garden cafes. Laughter echoes loudest in the most peaceful places, turning ordinary days into unforgettable memories."
  },
  {
    image: shivika3,
    position: "center",
    number: "02",
    subtitle: "The Adventures",
    title: "Chasing the sun, finding peace.",
    desc: "Sitting on a rock in the middle of a flowing river under the open sky. You have a natural way of reminding everyone to live wild, free, and completely in the present."
  },
  {
    image: shivika4,
    position: "center 80%",
    number: "03",
    subtitle: "The Memories",
    title: "Frozen in time, warm in spirit.",
    desc: "A freezing morning in the mountains of Pauri Garhwal. A simple camera frame that captures raw happiness, fresh air, and the promise of endless horizons ahead."
  }
];

export default function CinematicStorySection() {
  return (
    <div className="relative bg-[#050505]">
      {/* Sticky/Scroll Story Container */}
      {MEMORIES.map((memory, index) => (
        <section 
          key={index} 
          className="relative min-h-screen flex flex-col justify-end py-24 px-6 md:px-16 overflow-hidden border-b border-white/5"
        >
          {/* Background Image with Depth Effect */}
          <div className="absolute inset-0 z-0">
            <motion.div
              initial={{ scale: 1.1, opacity: 0.4 }}
              whileInView={{ scale: 1.0, opacity: 0.7 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full bg-cover filter brightness-[0.6] saturate-[0.95] contrast-[1.1]"
              style={{ 
                backgroundImage: `url(${memory.image})`,
                backgroundPosition: memory.position || 'center'
              }}
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/35 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/65 via-transparent to-transparent hidden md:block" />
          </div>

          {/* Typography Content */}
          <div className="relative z-10 max-w-2xl w-full space-y-6 md:mb-12">
            <div className="flex items-center gap-4">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-xs font-mono font-bold text-[#8B5CF6] tracking-widest"
              >
                {memory.number} / 03
              </motion.span>
              <div className="h-[1px] w-12 bg-white/20" />
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-xs uppercase tracking-[0.25em] text-[#B4B4B4] font-medium"
              >
                {memory.subtitle}
              </motion.span>
            </div>

            <motion.h3
              initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight font-sans"
            >
              {memory.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#B4B4B4] text-sm md:text-base font-light leading-relaxed tracking-wide font-serif max-w-lg"
            >
              {memory.desc}
            </motion.p>
          </div>
        </section>
      ))}
    </div>
  );
}
