import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useLocalStorage from './hooks/useLocalStorage';

// Components
import FloatingElements from './components/FloatingElements';
import BackgroundMusic from './components/BackgroundMusic';
import LoadingScreen from './components/LoadingScreen';
import WelcomeScreen from './components/WelcomeScreen';
import Navbar from './components/Navbar';
import LetterSection from './components/LetterSection';
import ReasonsSection from './components/ReasonsSection';
import StatsSection from './components/StatsSection';
import FinalSurprise from './components/FinalSurprise';
import Footer from './components/Footer';

export default function App() {
  const [step, setStep] = useState('loading'); // 'loading', 'welcome', 'main'
  const [name, setName] = useLocalStorage('friend_name', '');
  const [darkMode, setDarkMode] = useLocalStorage('theme_dark', true); // cinematic dark default
  
  // Progressive reveal index: 0 = Letter, 1 = Reasons, 2 = Stats, 3 = Surprise
  const [unlockedIndex, setUnlockedIndex] = useState(0);

  // Mouse coordinates for cursor glow backdrop
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Sync dark mode class with HTML tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle auto-scrolling to newly unlocked sections
  useEffect(() => {
    if (step === 'main' && unlockedIndex > 0) {
      const sectionIds = ['letter', 'reasons', 'stats', 'surprise'];
      const nextSectionId = sectionIds[unlockedIndex];
      
      const timer = setTimeout(() => {
        const element = document.getElementById(nextSectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [unlockedIndex, step]);

  const handleStart = (visitorName) => {
    setName(visitorName);
    setStep('main');
  };

  const unlockNextSection = (currentIndex) => {
    if (unlockedIndex === currentIndex) {
      setUnlockedIndex(currentIndex + 1);
    } else {
      const sectionIds = ['letter', 'reasons', 'stats', 'surprise'];
      const nextSectionId = sectionIds[currentIndex + 1];
      const element = document.getElementById(nextSectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="relative min-h-screen text-[var(--text-main)] transition-colors duration-300">
      {step !== 'loading' && <FloatingElements />}
      {step !== 'loading' && <BackgroundMusic isStarted={step === 'main'} />}
      
      <div 
        className="custom-glow-cursor" 
        style={{ 
          left: `${mousePos.x}px`, 
          top: `${mousePos.y}px` 
        }} 
      />

      <AnimatePresence mode="wait">
        {step === 'loading' && (
          <LoadingScreen key="loading" onFinished={() => setStep('welcome')} />
        )}

        {step === 'welcome' && (
          <WelcomeScreen key="welcome" onStart={handleStart} />
        )}

        {step === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="pt-16"
          >
            <Navbar 
              name={name} 
              darkMode={darkMode} 
              setDarkMode={setDarkMode} 
            />

            <main className="space-y-4 md:space-y-0">
              
              <div id="letter" className="min-h-screen scroll-mt-16">
                <LetterSection 
                  name={name} 
                  onNext={() => unlockNextSection(0)} 
                />
              </div>

              {unlockedIndex >= 1 && (
                <div id="reasons" className="min-h-screen scroll-mt-16">
                  <ReasonsSection onNext={() => unlockNextSection(1)} />
                </div>
              )}

              {unlockedIndex >= 2 && (
                <div id="stats" className="min-h-screen scroll-mt-16">
                  <StatsSection onNext={() => unlockNextSection(2)} />
                </div>
              )}

              {unlockedIndex >= 3 && (
                <div id="surprise" className="min-h-screen scroll-mt-16">
                  <FinalSurprise />
                </div>
              )}

            </main>

            <Footer name={name} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
