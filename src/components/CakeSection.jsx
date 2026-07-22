import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Sparkles } from 'lucide-react';

export default function CakeSection({ onBlowOut }) {
  const [isBlown, setIsBlown] = useState(false);
  const [micStatus, setMicStatus] = useState('idle'); // 'idle', 'listening', 'denied'
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const micStreamRef = useRef(null);
  const requestRef = useRef(null);
  const fireworkRequestRef = useRef(null);

  // Fireworks physics variables
  const fireworksRef = useRef([]);
  const particlesRef = useRef([]);

  // Microphone blow analyzer
  const startMicAnalysis = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      micStreamRef.current = stream;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      setMicStatus('listening');

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkBlow = () => {
        if (!analyserRef.current || isBlown) return;

        analyserRef.current.getByteFrequencyData(dataArray);
        
        // Calculate average volume
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;

        // Blowing creates a lot of white noise (high average amplitude)
        if (average > 105) {
          triggerBlowOut();
          return;
        }

        requestRef.current = requestAnimationFrame(checkBlow);
      };

      requestRef.current = requestAnimationFrame(checkBlow);
    } catch (err) {
      console.warn("Microphone access denied or unsupported", err);
      setMicStatus('denied');
    }
  };

  const stopMicAnalysis = () => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
    }
  };

  const triggerBlowOut = () => {
    setIsBlown(true);
    stopMicAnalysis();
    if (onBlowOut) onBlowOut();
    initFireworks();
  };

  const handleCandleClick = () => {
    if (isBlown) return;
    triggerBlowOut();
  };

  // Canvas Fireworks Show
  const initFireworks = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const colors = ['#A855F7', '#8B5CF6', '#38BDF8', '#FFD700', '#FF577F'];

    const spawnFirework = () => {
      // Spawn rocket
      const fx = Math.random() * canvas.width;
      const fy = canvas.height;
      const tx = fx + (Math.random() - 0.5) * 150;
      const ty = Math.random() * (canvas.height * 0.4) + 100;
      const speed = Math.random() * 3 + 4;
      const angle = Math.atan2(ty - fy, tx - fx);

      fireworksRef.current.push({
        x: fx,
        y: fy,
        tx: tx,
        ty: ty,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        sparkle: Math.random() > 0.5
      });
    };

    const explode = (x, y, color, sparkle) => {
      const count = sparkle ? 120 : 60;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1;
        particlesRef.current.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed + 0.5, // gravity bias
          radius: sparkle ? Math.random() * 1.5 + 0.5 : Math.random() * 2 + 1,
          color: color,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.01,
          sparkle: sparkle
        });
      }
    };

    // Spawn initial fireworks
    let spawnTimer = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // trailing effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Rocket updates
      fireworksRef.current.forEach((fw, idx) => {
        fw.x += fw.vx;
        fw.y += fw.vy;

        // Draw rocket spark
        ctx.fillStyle = fw.color;
        ctx.beginPath();
        ctx.arc(fw.x, fw.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Check if peak is reached
        const distanceToTarget = Math.hypot(fw.tx - fw.x, fw.ty - fw.y);
        if (distanceToTarget < 15 || fw.vy >= 0) {
          explode(fw.x, fw.y, fw.color, fw.sparkle);
          fireworksRef.current.splice(idx, 1);
        }
      });

      // Explosion particle updates
      particlesRef.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(idx, 1);
          return;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        
        if (p.sparkle && Math.random() > 0.4) {
          ctx.fillStyle = '#FFFFFF'; // sparkling white twinkle
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Periodic spawn
      spawnTimer++;
      if (spawnTimer % 45 === 0) {
        spawnFirework();
      }

      fireworkRequestRef.current = requestAnimationFrame(animate);
    };

    // Trigger first rocket
    spawnFirework();
    fireworkRequestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      stopMicAnalysis();
      if (fireworkRequestRef.current) {
        cancelAnimationFrame(fireworkRequestRef.current);
      }
    };
  }, []);

  return (
    <section 
      className={`min-h-screen py-24 px-4 flex flex-col justify-center items-center relative transition-colors duration-[2s] ${
        isBlown ? 'bg-[#000000]' : 'bg-[#070707]'
      }`}
    >
      {/* Canvas fireworks overlay */}
      {isBlown && <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />}

      {/* Glow Backdrop */}
      {!isBlown && (
        <div className="bg-glow w-[350px] h-[350px] bg-[#FFD700]/5 top-[20%] left-[30%]" />
      )}

      <div className="max-w-4xl w-full z-10 space-y-16 text-center">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-[#8B5CF6] font-semibold">Section 07</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Make A Wish
          </h2>
          <p className="text-[#B4B4B4] font-light text-sm max-w-sm mx-auto">
            {isBlown 
              ? "Your wish is cast. Watch the sparks light up the night sky." 
              : "Allow mic permissions to blow out the candles, or click them directly."}
          </p>
        </div>

        {/* Cake Container */}
        <div className="relative flex flex-col items-center justify-center min-h-[340px]">
          {/* Candle Blow / Mic Request Button */}
          {!isBlown && micStatus === 'idle' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startMicAnalysis}
              className="absolute top-0 px-4 py-2 border border-[#8B5CF6]/30 bg-[#8B5CF6]/5 text-xs text-[#8B5CF6] uppercase tracking-widest rounded-full flex items-center gap-2 hover:bg-[#8B5CF6]/15 transition-all"
            >
              <Mic className="w-3.5 h-3.5" /> Use Microphone
            </motion.button>
          )}

          {!isBlown && micStatus === 'listening' && (
            <div className="absolute top-0 px-4 py-2 border border-emerald-500/30 bg-emerald-500/5 text-xs text-emerald-400 uppercase tracking-widest rounded-full flex items-center gap-2 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" /> Listening for a blow...
            </div>
          )}

          {!isBlown && micStatus === 'denied' && (
            <div className="absolute top-0 px-4 py-2 border border-rose-500/30 bg-rose-500/5 text-xs text-rose-400 uppercase tracking-widest rounded-full flex items-center gap-2">
              <MicOff className="w-3.5 h-3.5" /> Mic blocked. Click candles to blow.
            </div>
          )}

          {/* Minimal 3D Cake CSS/SVG */}
          <div 
            className="relative w-64 h-64 mt-12 flex flex-col items-center justify-end cursor-pointer group"
            onClick={handleCandleClick}
          >
            {/* Candle Flames Layer */}
            <div className="absolute top-[48px] left-[52px] right-[52px] flex justify-between z-30">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="relative flex flex-col items-center">
                  {/* Flickering Flame */}
                  <AnimatePresence>
                    {!isBlown && (
                      <motion.div
                        exit={{ opacity: 0, scale: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="candle-flame"
                      />
                    )}
                  </AnimatePresence>
                  {/* Candle Wax Stand */}
                  <div className="w-2.5 h-16 bg-gradient-to-b from-[#8B5CF6] to-[#A855F7] border border-white/10 rounded-t shadow" />
                </div>
              ))}
            </div>

            {/* Cake Body 3D Layer */}
            <div className="relative w-48 h-28 bg-gradient-to-b from-[#181818] to-[#121212] border border-white/5 rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden group-hover:border-[#8B5CF6]/20 transition-all duration-500">
              {/* Dripping Frosting */}
              <div className="w-full h-8 bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#8B5CF6] rounded-b-xl opacity-90 shadow-md" />
              {/* Mid Layer strip */}
              <div className="w-full h-2 bg-[#38BDF8]/40" />
              {/* Bottom Base */}
              <div className="w-full h-4 bg-[#1e1c24] border-t border-white/5" />
            </div>

            {/* Cake Stand Plate */}
            <div className="w-56 h-3 bg-gradient-to-r from-[#202020] via-[#282828] to-[#202020] rounded-full border border-white/10 shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
