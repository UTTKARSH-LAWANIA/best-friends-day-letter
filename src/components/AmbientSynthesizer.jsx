import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AmbientSynthesizer({ isStarted, isEnding }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const oscillatorsRef = useRef([]);

  // Chords progression (frequencies in Hz)
  // Cmaj9: C3 (130.81), E3 (164.81), G3 (196.00), B3 (246.94), D4 (293.66)
  // Amin9: A2 (110.00), C3 (130.81), E3 (164.81), G3 (196.00), B3 (246.94)
  // Fmaj9: F2 (87.31), A3 (220.00), C4 (261.63), E4 (329.63), G4 (392.00)
  // Gsus4: G2 (98.00), C3 (130.81), D3 (146.83), G3 (196.00), D4 (293.66)
  const progressions = [
    [130.81, 164.81, 196.00, 246.94, 293.66], // Cmaj9
    [110.00, 130.81, 164.81, 196.00, 246.94], // Amin9
    [87.31, 220.00, 261.63, 329.63, 392.00],  // Fmaj9
    [98.00, 130.81, 146.83, 196.00, 293.66]   // Gsus4
  ];

  const initAudio = () => {
    if (audioCtxRef.current) return;

    // Create audio context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    // Master Gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(isMuted ? 0 : 0.15, ctx.currentTime);
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    // Delay effect node
    const delay = ctx.createDelay();
    delay.delayTime.value = 0.6;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.4;
    
    delay.connect(feedback);
    feedback.connect(delay);
    
    // Connect delay to master
    delay.connect(masterGain);

    // Filter Node (Warm Low-Pass Filter)
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400; // Warm, non-harsh tone
    filter.Q.value = 1;
    filter.connect(masterGain);
    filter.connect(delay);

    // Spawn oscillators
    const chords = progressions[0];
    const oscillators = chords.map((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle'; // Smooth, organic waveform
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Add a subtle LFO to each oscillator for drift/swelling feeling
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.05 + Math.random() * 0.05, ctx.currentTime);
      lfoGain.gain.setValueAtTime(2, ctx.currentTime); // Frequency modulation depth
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      // Slow volume swells
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      
      osc.connect(gain);
      gain.connect(filter);
      osc.start();

      // Store references to oscillate/swell
      return { osc, gain, baseFreq: freq, lfo };
    });

    oscillatorsRef.current = oscillators;
    setIsPlaying(true);

    // Evolve Chord Progression
    let chordIdx = 0;
    const interval = setInterval(() => {
      if (ctx.state === 'suspended' || isEnding) return;
      chordIdx = (chordIdx + 1) % progressions.length;
      const nextChords = progressions[chordIdx];

      oscillatorsRef.current.forEach((item, index) => {
        const nextFreq = nextChords[index] || item.baseFreq;
        // Glide frequency to next chord frequency over 4 seconds
        item.osc.frequency.exponentialRampToValueAtTime(nextFreq, ctx.currentTime + 4.0);
        // Swell gain
        const randomGain = 0.02 + Math.random() * 0.03;
        item.gain.gain.setValueAtTime(item.gain.gain.value, ctx.currentTime);
        item.gain.gain.linearRampToValueAtTime(randomGain, ctx.currentTime + 3.0);
      });
    }, 8000);

    return () => clearInterval(interval);
  };

  // Start playing sound when user begins
  useEffect(() => {
    if (isStarted && !isPlaying) {
      initAudio();
    }
  }, [isStarted, isPlaying]);

  // Handle Mute/Unmute
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      if (isMuted) {
        masterGainRef.current.gain.linearRampToValueAtTime(0, now + 1.0);
      } else {
        masterGainRef.current.gain.linearRampToValueAtTime(0.12, now + 1.0);
      }
    }
  }, [isMuted]);

  // Slow fade out at Ending
  useEffect(() => {
    if (isEnding && masterGainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, now);
      masterGainRef.current.gain.exponentialRampToValueAtTime(0.001, now + 6.0);
      setTimeout(() => {
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
        }
      }, 7000);
    }
  }, [isEnding]);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    setIsMuted(!isMuted);
  };

  if (!isStarted) return null;

  return (
    <div 
      className="mute-control-badge select-none"
      onClick={toggleMute}
      style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
    >
      <span className="relative flex h-2 w-2 mr-1">
        {isPlaying && !isMuted ? (
          <>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </>
        ) : (
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
        )}
      </span>
      <span className="mr-1">Ambient Synth:</span>
      {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5 text-purple-400" />}
    </div>
  );
}
