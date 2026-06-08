import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PARTICLE_TYPES = ['heart', 'star', 'bubble', 'sparkle'];

const HeartIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-pink-400/30 dark:text-pink-400/20">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const StarIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-purple-400/30 dark:text-purple-400/20">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const SparkleIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-blue-400/30 dark:text-blue-400/20">
    <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z" />
  </svg>
);

const BubbleIcon = ({ size }) => (
  <div 
    style={{ width: size, height: size }} 
    className="rounded-full bg-indigo-300/20 dark:bg-indigo-400/10 border border-white/10"
  />
);

export default function FloatingElements() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate 35 particles with random settings
    const newParticles = Array.from({ length: 35 }).map((_, i) => {
      const type = PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)];
      const size = Math.floor(Math.random() * 20) + 8; // 8px to 28px
      const left = Math.random() * 100; // 0% to 100% of viewport width
      const initialY = Math.random() * 100 + 100; // start below viewport
      const duration = Math.random() * 15 + 15; // 15s to 30s
      const delay = Math.random() * -20; // negative delay to start immediately
      const swayAmplitude = Math.random() * 40 + 20; // horizontal sway amplitude

      return {
        id: i,
        type,
        size,
        left,
        initialY,
        duration,
        delay,
        swayAmplitude,
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => {
        let IconComponent = BubbleIcon;
        if (p.type === 'heart') IconComponent = HeartIcon;
        if (p.type === 'star') IconComponent = StarIcon;
        if (p.type === 'sparkle') IconComponent = SparkleIcon;

        return (
          <motion.div
            key={p.id}
            initial={{ 
              x: `${p.left}vw`, 
              y: '105vh',
              opacity: 0,
              scale: 0.8
            }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.8, 0.8, 0],
              scale: [0.8, 1.2, 1, 0.8],
              x: [
                `${p.left}vw`,
                `${p.left + (p.swayAmplitude / window.innerWidth) * 100}vw`,
                `${p.left - (p.swayAmplitude / window.innerWidth) * 100}vw`,
                `${p.left}vw`
              ]
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{ position: 'absolute' }}
          >
            <IconComponent size={p.size} />
          </motion.div>
        );
      })}
    </div>
  );
}
