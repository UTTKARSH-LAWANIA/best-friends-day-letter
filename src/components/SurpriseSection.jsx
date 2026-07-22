import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// Import local assets
import shivika1 from '../assets/shivika_1.png';

export default function SurpriseSection() {
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const particlesRef = useRef([]);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Fire high-fidelity confetti
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0.1, y: 0.8 },
        colors: ['#A855F7', '#8B5CF6', '#38BDF8', '#FFD700']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 0.9, y: 0.8 },
        colors: ['#A855F7', '#8B5CF6', '#38BDF8', '#FFD700']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // Initialize glowing sparks particle system
    initSparks();
  };

  const initSparks = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const particles = [];
    const colors = ['#A855F7', '#8B5CF6', '#38BDF8', '#FFD700', '#FFFFFF'];

    // Spawn 80 sparks
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 60,
        y: canvas.height / 2 + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 6,
        vy: -Math.random() * 8 - 3,
        radius: Math.random() * 3 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.015 + 0.008
      });
    }
    particlesRef.current = particles;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;

      particlesRef.current.forEach((p) => {
        if (p.alpha <= 0) return;

        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        // Apply slight gravity/drift
        p.vx *= 0.98;
        p.vy *= 0.98;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        active = true;
      });

      if (active) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <section className="min-h-screen py-24 px-4 flex flex-col justify-center items-center relative bg-[#050505] overflow-hidden">
      {/* Light ray backdrops */}
      <div className="bg-glow w-[400px] h-[400px] bg-[#8B5CF6]/5 top-[20%] left-[20%]" />
      
      <div className="max-w-4xl w-full z-10 space-y-12 text-center">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#8B5CF6] font-semibold">Section 06</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              A Hidden Surprise
            </h2>
            <p className="text-[#B4B4B4] font-light text-sm max-w-sm mx-auto">
              A locked gift box, loaded with reflections. Click to release the secret inside.
            </p>
          </motion.div>
        )}

        <div className="relative w-full min-h-[480px] flex items-center justify-center">
          {/* Canvas for sparks */}
          <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none" />

          {/* Light Rays behind */}
          {isOpen && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="w-[300px] h-[300px] bg-gradient-to-r from-purple-500/20 to-yellow-500/20 rounded-full blur-[100px] animate-pulse" />
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="ray-beam"
                  style={{
                    height: '600px',
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Handcrafted CSS 3D Gift Box */
              <motion.div
                key="giftbox"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative cursor-pointer group select-none w-56 h-56 flex flex-col justify-end"
                onClick={handleOpen}
              >
                {/* Float and sway wrapper */}
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 1, -1, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="relative w-full h-full"
                >
                  {/* Gift Box Lid */}
                  <div className="absolute top-[35px] left-0 w-full h-8 bg-[#181818] border border-white/10 rounded-t shadow-lg z-10 transition-transform group-hover:-translate-y-2">
                    {/* Gold Ribbon Cross Lid */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-8 h-full bg-gradient-to-b from-[#FFD700] to-[#E5C158]" />
                  </div>

                  {/* Gift Box Body */}
                  <div className="absolute bottom-0 left-2 w-[calc(100%-16px)] h-36 bg-[#101010] border border-white/5 rounded-b shadow-2xl">
                    {/* Gold Ribbon Cross Body */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-8 h-full bg-gradient-to-b from-[#E5C158] to-[#C2A347]" />
                    {/* Ribbon Bow */}
                    <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 flex items-center justify-center gap-1 z-20">
                      <div className="w-8 h-8 rounded-full border-4 border-[#FFD700] bg-transparent rotate-45 transform-origin-bottom-right" />
                      <div className="w-8 h-8 rounded-full border-4 border-[#FFD700] bg-transparent -rotate-45 transform-origin-bottom-left" />
                    </div>
                  </div>

                  {/* Soft Floor Reflection */}
                  <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 w-[80%] h-4 bg-[#8B5CF6]/10 rounded-full blur-[8px]" />
                </motion.div>
              </motion.div>
            ) : (
              /* Revealed Content (Shivika's Photo + Message) */
              <motion.div
                key="revealed"
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-lg w-full glass-card p-6 md:p-8 relative z-30 space-y-6 overflow-hidden"
              >
                {/* Photo frame */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group aspect-[9/16] max-h-[380px] mx-auto bg-[#070707]">
                  <img
                    src={shivika1}
                    alt="Shivika Surprise"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="text-[10px] tracking-[0.2em] font-mono text-[#8B5CF6] uppercase font-bold">Unfiltered Shivika</span>
                    <h4 className="text-white text-base font-bold">"I don't care."</h4>
                  </div>
                </div>

                {/* Heartfelt note */}
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight font-sans">
                    Never lose your edge.
                  </h3>
                  <p className="text-[#B4B4B4] text-sm font-light leading-relaxed font-serif italic max-w-sm mx-auto">
                    "No matter how many balloons are around or what the scene demands, keep that cool, authentic, unapologetic spark. You are completely one of a kind. Wishing you a year of absolute happiness, laughter, and staying exactly as you are."
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
