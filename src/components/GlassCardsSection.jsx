import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TRAITS = [
  {
    word: "Radiant",
    paragraph: "Your smile is a beacon. Even when things get heavy, you have this natural superpower to lift the room's energy and make everyone laugh without even trying. You bring light into every space you step in."
  },
  {
    word: "Resilient",
    paragraph: "You walk to the beat of your own drum. In a world full of duplicates, your raw authenticity is refreshing. You face life's currents with elegance and stay entirely true to who you are."
  },
  {
    word: "Compassionate",
    paragraph: "You listen in a way that makes people feel truly heard. Your support is quiet yet solid, showing up exactly when it's needed most. You are both a safety anchor and a loudest cheerleader."
  }
];

function Card({ word, paragraph }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    if (isFlipped) return; // Disable tilt when flipped

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within element
    const y = e.clientY - rect.top;  // y position within element

    // Calculate rotation limits: -15deg to 15deg
    const rotateX = -((y / rect.height) - 0.5) * 20;
    const rotateY = ((x / rect.width) - 0.5) * 20;

    // Subtle translation inside the card (magnetic effect)
    const translateX = ((x / rect.width) - 0.5) * 10;
    const translateY = ((y / rect.height) - 0.5) * 10;

    setTiltStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${translateX}px, ${translateY}px, 10px)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px)',
    });
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    // Reset tilt on click
    setTiltStyle({
      transform: 'rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px)',
    });
  };

  return (
    <div 
      className="tilt-container w-full h-[320px] cursor-pointer"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={`tilt-card w-full h-full glass-card relative rounded-3xl ${isFlipped ? 'flipped' : ''}`}
        style={{
          transformStyle: 'preserve-3d',
          transition: isFlipped ? 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.2s ease-out',
          ...tiltStyle
        }}
      >
        <div className="card-inner w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* Front of Card */}
          <div 
            className="card-front absolute inset-0 flex flex-col justify-between p-8 bg-[#101010]/80 backdrop-blur-md border border-white/5"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#8B5CF6] uppercase">Quality</span>
            <div className="flex-1 flex items-center justify-center">
              <h4 className="text-2xl md:text-3xl font-bold tracking-wider text-white uppercase font-sans">
                {word}
              </h4>
            </div>
            <span className="text-[10px] tracking-widest text-[#B4B4B4] uppercase text-center opacity-40">
              Click to flip
            </span>
          </div>

          {/* Back of Card */}
          <div 
            className="card-back absolute inset-0 p-8 bg-[#181818] border border-[#8B5CF6]/30 flex flex-col justify-between"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#8B5CF6] uppercase">Heart</span>
            <p className="text-[#B4B4B4] text-sm md:text-base font-light font-serif leading-relaxed italic text-center flex-1 flex items-center justify-center">
              "{paragraph}"
            </p>
            <span className="text-[10px] tracking-widest text-[#8B5CF6] uppercase text-center opacity-60">
              Click to reset
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function GlassCardsSection() {
  return (
    <section className="min-h-screen py-24 px-4 flex flex-col justify-center items-center relative bg-[#050505]">
      {/* Light ray backdrops */}
      <div className="bg-glow w-[300px] h-[300px] bg-[#38BDF8]/5 bottom-[20%] left-[10%]" />

      <div className="max-w-5xl w-full z-10 space-y-16">
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-[#8B5CF6] font-semibold">Section 04</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Things You Are
          </h2>
          <p className="text-[#B4B4B4] font-light text-sm max-w-md mx-auto">
            Hover to experience perspective, click to uncover heart-to-heart thoughts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRAITS.map((trait, idx) => (
            <Card key={idx} word={trait.word} paragraph={trait.paragraph} />
          ))}
        </div>
      </div>
    </section>
  );
}
