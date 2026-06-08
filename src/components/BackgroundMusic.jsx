import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';

const DEFAULT_MUSIC_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3';

export default function BackgroundMusic({ isStarted }) {
  const [isPlaying, setIsPlaying] = useLocalStorage('bg_music_playing', false);
  const [volume, setVolume] = useLocalStorage('bg_music_volume', 0.4);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(DEFAULT_MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    if (isPlaying) {
      playAudio();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isStarted && isPlaying) {
      playAudio();
    }
  }, [isStarted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playAudio = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.log("Autoplay blocked. Waiting for interaction.");
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      playAudio();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <AnimatePresence>
        {showVolumeSlider && (
          <motion.div
            initial={{ opacity: 0, x: 20, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 100 }}
            exit={{ opacity: 0, x: 20, width: 0 }}
            className="flex items-center bg-white/70 dark:bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-full border border-pink-200/50 dark:border-purple-900/30 shadow-lg"
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full accent-pink-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative group p-4 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 text-white shadow-xl hover:shadow-pink-500/25 border border-white/20 transition-all flex items-center justify-center cursor-pointer overflow-hidden"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        
        <div className="flex items-center gap-1.5 relative">
          {isPlaying ? (
            <>
              <div className="flex items-end gap-[3px] h-4 mr-0.5">
                <div className="w-[2.5px] bg-white rounded-full animate-[visualizer_0.6s_ease-in-out_infinite]" style={{ animationDelay: '0.1s' }} />
                <div className="w-[2.5px] bg-white rounded-full animate-[visualizer_0.8s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }} />
                <div className="w-[2.5px] bg-white rounded-full animate-[visualizer_0.7s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }} />
                <div className="w-[2.5px] bg-white rounded-full animate-[visualizer_0.9s_ease-in-out_infinite]" style={{ animationDelay: '0.5s' }} />
              </div>
              <Volume2 className="w-5 h-5" />
            </>
          ) : (
            <>
              <Music className="w-5 h-5 animate-pulse" />
              <VolumeX className="w-4 h-4 text-white/70" />
            </>
          )}
        </div>
      </motion.button>
      
      <style>{`
        @keyframes visualizer {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
      `}</style>
    </div>
  );
}
