import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ChevronDown } from 'lucide-react';

export default function EnvelopeSection({ name, onNext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const letterRef = useRef(null);

  const letterText = `Dear ${name},

Happy Birthday. 

Some gifts are bought, some are built. I wanted to build something that actually lasts—something cinematic, elegant, and completely handcrafted, just like the beautiful energy you bring into this world.

This space is a small celebration of you. Your qualities, your unforgettable impact, and the stories that make you who you are.

Thank you for being such a wonderful part of my story.

Scroll down when you're ready. Let's take a look back.`;

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    // Expand letter after flap opens
    setTimeout(() => {
      setIsExpanded(true);
    }, 1200);
  };

  useEffect(() => {
    if (!isExpanded) return;

    let index = 0;
    let currentText = '';
    let timer;

    const type = () => {
      if (index < letterText.length) {
        const char = letterText.charAt(index);
        currentText += char;
        setTypedText(currentText);
        index++;

        let delay = 35;
        if (char === '.' || char === '!' || char === '?') {
          delay = 700; // Long pause on sentence end
        } else if (char === ',' || char === '\n') {
          delay = 300; // Medium pause on clauses/newlines
        }

        timer = setTimeout(type, delay);
      } else {
        setIsFinished(true);
        if (onNext) onNext();
      }
    };

    timer = setTimeout(type, 800);
    return () => clearTimeout(timer);
  }, [isExpanded, letterText, onNext]);

  return (
    <section className="min-h-screen py-24 px-4 flex flex-col items-center justify-center relative overflow-hidden bg-[#070707]">
      {/* Light ray backdrop */}
      <div className="bg-glow w-[350px] h-[350px] bg-[#A855F7]/5 top-[10%] right-[20%]" />
      
      <div className="z-10 w-full max-w-2xl flex flex-col items-center">
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-12 space-y-4"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#8B5CF6] font-semibold">Section 02</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              A Personal Note
            </h2>
            <p className="text-[#B4B4B4] font-light text-sm max-w-md mx-auto">
              Click the sealed envelope to reveal what was written for you.
            </p>
          </motion.div>
        )}

        <div className="relative flex items-center justify-center min-h-[400px] w-full">
          <motion.div
            layout
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`envelope-wrapper ${isOpen ? 'open' : ''} ${isExpanded ? 'expanded' : ''}`}
            onClick={handleOpen}
          >
            {/* The Envelope */}
            <div className="envelope-body">
              <div className="envelope-flap"></div>
              
              {/* Outer seal icon */}
              {!isOpen && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="w-12 h-12 rounded-full bg-[#1e1c24] border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] shadow-lg"
                  >
                    <Mail className="w-5 h-5" />
                  </motion.div>
                </div>
              )}

              <div className="envelope-pocket"></div>
              
              {/* The Letter inside */}
              <div 
                ref={letterRef}
                className="envelope-letter select-text font-serif overflow-y-auto leading-relaxed"
                style={{
                  backgroundImage: 'radial-gradient(#121212 0.5px, transparent 0.5px)',
                  backgroundSize: '24px 24px',
                  backgroundColor: '#f7f5f0',
                  color: '#1a1a1a',
                }}
              >
                <div className="whitespace-pre-wrap text-sm md:text-base tracking-wide font-medium font-serif leading-loose">
                  {typedText}
                  {!isFinished && isExpanded && <span className="type-cursor" />}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {isFinished && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              className="mt-16 text-center z-20"
            >
              <div className="flex flex-col items-center gap-3">
                <span className="text-xs uppercase tracking-[0.2em] text-[#8B5CF6] font-semibold">Scroll down to continue</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="p-2 rounded-full border border-white/5 bg-white/5 text-white/50"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
