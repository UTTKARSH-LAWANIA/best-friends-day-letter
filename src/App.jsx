import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Custom Components
import AmbientSynthesizer from './components/AmbientSynthesizer';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import EnvelopeSection from './components/EnvelopeSection';
import CinematicStorySection from './components/CinematicStorySection';
import GlassCardsSection from './components/GlassCardsSection';
import UnforgettableSection from './components/UnforgettableSection';
import SurpriseSection from './components/SurpriseSection';
import CakeSection from './components/CakeSection';
import EndingSection from './components/EndingSection';

export default function App() {
  const [step, setStep] = useState('loading'); // 'loading', 'main'
  const [name, setName] = useState('Shivika');
  const [isAudioStarted, setIsAudioStarted] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Initialize Name from URL parameters (?name=Shivika or ?to=Shivika)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlName = urlParams.get('name') || urlParams.get('to');
    if (urlName && urlName.trim().length > 0) {
      setName(urlName.trim());
    } else {
      setName('Shivika'); // Fallback default
    }
  }, []);

  // Sync cursor coordinates for glowing backdrop node
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBegin = () => {
    setIsAudioStarted(true);
    // Smooth scroll down to envelope section
    const element = document.getElementById('note');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#B4B4B4] overflow-hidden">
      {/* Premium custom mouse glow node */}
      <div 
        className="glow-cursor-follow" 
        style={{ 
          left: `${mousePos.x}px`, 
          top: `${mousePos.y}px` 
        }} 
      />

      {/* Procedural soundscape synthesiser */}
      <AmbientSynthesizer isStarted={isAudioStarted} isEnding={isEnding} />

      <AnimatePresence mode="wait">
        {step === 'loading' ? (
          <LoadingScreen 
            key="loading" 
            initialName={name} 
            onFinished={(finalName) => {
              setName(finalName);
              setStep('main');
            }} 
          />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full relative"
          >
            {/* SECTION 1: Cinematic Hero */}
            <HeroSection name={name} onBegin={handleBegin} />

            {/* SECTION 2: The Envelope & Handwritten Letter */}
            <div id="note" className="scroll-mt-0">
              <EnvelopeSection name={name} />
            </div>

            {/* SECTION 3: Cinematic Story Scroll */}
            <div id="stories">
              <CinematicStorySection />
            </div>

            {/* SECTION 4: Glass Qualities Flip Cards */}
            <div id="qualities">
              <GlassCardsSection />
            </div>

            {/* SECTION 5: Things that make you unforgettable */}
            <div id="unforgettable">
              <UnforgettableSection />
            </div>

            {/* SECTION 6: Hidden Surprise (Gift Box) */}
            <div id="surprise">
              <SurpriseSection />
            </div>

            {/* SECTION 7: Interactive Birthday Cake */}
            <div id="cake">
              <CakeSection onBlowOut={() => console.log('Candles blown out!')} />
            </div>

            {/* SECTION 8: Quiet Ending Screen */}
            <div id="ending">
              <EndingSection onVisible={() => setIsEnding(true)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
