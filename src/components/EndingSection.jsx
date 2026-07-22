import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function EndingSection({ onVisible }) {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    // Notify parent that we are in the ending section to trigger music fade
    if (onVisible) onVisible();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const stars = [];
    const starCount = 60;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2 + 0.3,
        vy: Math.random() * 0.2 + 0.05,
        alpha: Math.random(),
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        twinkleDirection: Math.random() > 0.5 ? 1 : -1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((s) => {
        // Move star upwards slowly
        s.y -= s.vy;
        if (s.y < 0) {
          s.y = canvas.height;
          s.x = Math.random() * canvas.width;
        }

        // Twinkle alpha
        s.alpha += s.twinkleSpeed * s.twinkleDirection;
        if (s.alpha >= 1) {
          s.alpha = 1;
          s.twinkleDirection = -1;
        } else if (s.alpha <= 0.2) {
          s.alpha = 0.2;
          s.twinkleDirection = 1;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [onVisible]);

  return (
    <section className="relative min-h-screen flex flex-col justify-between py-20 px-4 bg-[#050505] overflow-hidden select-none">
      {/* Twilight canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Spacer to push content center */}
      <div className="h-10" />

      <div className="z-10 text-center max-w-3xl mx-auto space-y-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-snug font-sans">
            I hope this year gives you
            <span className="block mt-2 bg-gradient-to-r from-white via-[#8B5CF6] to-[#38BDF8] bg-clip-text text-transparent">
              everything you've been hoping for.
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-lg md:text-2xl font-light font-serif italic text-[#B4B4B4] leading-relaxed">
            Thank you for being part of my story.
          </p>
        </motion.div>
      </div>

      {/* Tiny Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 2.0 }}
        className="z-10 text-center text-[10px] tracking-[0.25em] text-[#B4B4B4] uppercase space-y-1.5"
      >
        <p>Made with love</p>
        <p className="font-mono text-[9px] opacity-75">one line of code at a time</p>
      </motion.div>
    </section>
  );
}
