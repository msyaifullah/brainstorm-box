'use client';

import { useEffect, useState, useRef } from 'react';

interface KeyboardProps {
  className?: string;
  containerClassName?: string;
  glowingKeys?: string[]; // Array of keys that should glow
  typingSequence?: string[]; // Array of keys to animate typing
  typingSpeed?: number; // Speed of typing animation in ms
  isTyping?: boolean; // Whether to show typing animation
  onTypingComplete?: () => void; // Callback when typing animation completes
  showMask?: boolean; // Whether to show the radial gradient mask
}

// Key mapping for special keys
const keyMap: { [key: string]: string } = {
  ' ': 'space',
  'Control': 'control',
  'Alt': 'option',
  'Meta': 'command',
  'Shift': 'shift',
  'Enter': 'enter',
  'Backspace': 'backspace',
  'Tab': 'tab',
  'Escape': 'esc',
  'ArrowUp': 'arrowup',
  'ArrowDown': 'arrowdown',
  'ArrowLeft': 'arrowleft',
  'ArrowRight': 'arrowright',
};

// Function to determine which modifier key to use based on letter position
const getModifierKey = (letterKey: string, modifierType: 'command' | 'option' | 'control'): string => {
  const leftSideKeys = ['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v', 'b'];
  const isLeftSide = leftSideKeys.includes(letterKey.toLowerCase());
  
  if (modifierType === 'control') {
    // We only have left control, so always use left
    return 'control-left';
  } else if (isLeftSide) {
    return `${modifierType}-right`;
  } else {
    return `${modifierType}-left`;
  }
};

// Function to get the appropriate modifier keys for a combination
const getModifierKeys = (keys: string[]): string[] => {
  const letterKeys = keys.filter(key => /^[a-z]$/i.test(key));
  const modifierKeys = keys.filter(key => ['command', 'option', 'control', 'shift'].includes(key));
  const otherKeys = keys.filter(key => !letterKeys.includes(key) && !modifierKeys.includes(key));
  
  if (letterKeys.length === 0) {
    return [...modifierKeys, ...otherKeys];
  }
  
  const letterKey = letterKeys[0]; // Use first letter key for positioning
  const result: string[] = [];
  
  // Add the letter keys
  result.push(...letterKeys);
  
  // Process modifier keys
  modifierKeys.forEach(modifier => {
    if (modifier === 'command') {
      result.push(getModifierKey(letterKey, 'command'));
    } else if (modifier === 'option') {
      result.push(getModifierKey(letterKey, 'option'));
    } else if (modifier === 'control') {
      result.push(getModifierKey(letterKey, 'control'));
    } else {
      result.push(modifier); // Keep shift as is
    }
  });
  
  // Add other keys (like 'delete', 'space', etc.)
  result.push(...otherKeys);
  
  return result;
};

// Function to normalize key names
const normalizeKey = (key: string): string => {
  const normalized = keyMap[key] || key.toLowerCase();
  return normalized;
};

// Function to check if a key should glow
const shouldGlow = (keyName: string, glowingKeys: string[]): boolean => {
  const processedKeys = getModifierKeys(glowingKeys);
  return processedKeys.some(key => normalizeKey(key) === normalizeKey(keyName));
};

export default function Keyboard({ 
  className = "", 
  containerClassName = "",
  glowingKeys = [],
  typingSequence = [],
  typingSpeed = 200,
  isTyping = false,
  onTypingComplete,
  showMask = true
}: KeyboardProps) {
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const onTypingCompleteRef = useRef(onTypingComplete);

  // Update ref when callback changes
  useEffect(() => {
    onTypingCompleteRef.current = onTypingComplete;
  }, [onTypingComplete]);

  // Handle typing animation
  useEffect(() => {
    if (isTyping && typingSequence.length > 0) {
      setIsAnimating(true);
      setCurrentTypingIndex(0);
      
      const interval = setInterval(() => {
        setCurrentTypingIndex(prev => {
          if (prev >= typingSequence.length - 1) {
            setIsAnimating(false);
            return 0;
          }
          return prev + 1;
        });
      }, typingSpeed);

      return () => clearInterval(interval);
    }
  }, [isTyping, typingSequence, typingSpeed]);

  // Handle completion callback
  useEffect(() => {
    if (!isAnimating && currentTypingIndex === 0 && typingSequence.length > 0) {
      onTypingCompleteRef.current?.();
    }
  }, [isAnimating, currentTypingIndex, typingSequence.length]);

  // Get currently typing key
  const getCurrentTypingKey = (): string => {
    if (!isAnimating || currentTypingIndex >= typingSequence.length) return '';
    return typingSequence[currentTypingIndex];
  };

  // Check if a key should glow (either from props or typing animation)
  const isKeyGlowing = (keyName: string): boolean => {
    const typingKey = getCurrentTypingKey();
    return shouldGlow(keyName, glowingKeys) || normalizeKey(typingKey) === normalizeKey(keyName);
  };

  // Check if a key is currently being typed
  const isKeyTyping = (keyName: string): boolean => {
    const typingKey = getCurrentTypingKey();
    return normalizeKey(typingKey) === normalizeKey(keyName);
  };

  return (
    <div className={`text-center ${containerClassName}`}>
      <div className={`relative w-full h-[600px] lg:h-[800px] ${className}`}>
        <div className={`keyboard-container ${showMask ? 'mask-radial-faded' : ''}`}>
          <div className="keyboard-main">
            <div className="keyboard-layout">
              <div className="keyboard-row select-none">
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('esc') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">esc</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('F1') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">F1</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('F2') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">F2</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('F3') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">F3</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('F4') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">F4</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('F5') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">F5</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('F6') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">F6</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('F7') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">F7</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('F8') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">F8</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('F9') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">F9</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('F10') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">F10</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('F11') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">F11</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('F12') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">F12</span></div>
                </div>
              </div>
              <div className="keyboard-row select-none">
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('`') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content">
                    <span className="keyboard-alt">`</span><span className="keyboard-primary">~</span>
                  </div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('1') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content">
                    <span className="keyboard-alt">!</span><span className="keyboard-primary">1</span>
                  </div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('2') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content">
                    <span className="keyboard-alt">@</span><span className="keyboard-primary">2</span>
                  </div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('3') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content">
                    <span className="keyboard-alt">#</span><span className="keyboard-primary">3</span>
                  </div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('4') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content">
                    <span className="keyboard-alt">$</span><span className="keyboard-primary">4</span>
                  </div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('5') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content">
                    <span className="keyboard-alt">%</span><span className="keyboard-primary">5</span>
                  </div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('6') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content">
                    <span className="keyboard-alt">^</span><span className="keyboard-primary">6</span>
                  </div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('7') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content">
                    <span className="keyboard-alt">&amp;</span><span className="keyboard-primary">7</span>
                  </div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('8') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content">
                    <span className="keyboard-alt">*</span><span className="keyboard-primary">8</span>
                  </div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('9') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content">
                    <span className="keyboard-alt">(</span><span className="keyboard-primary">9</span>
                  </div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('0') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content">
                    <span className="keyboard-alt">)</span><span className="keyboard-primary">0</span>
                  </div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('-') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content">
                    <span className="keyboard-alt">_</span><span className="keyboard-primary">-</span>
                  </div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('=') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content">
                    <span className="keyboard-alt">+</span><span className="keyboard-primary">=</span>
                  </div>
                </div>
              </div>
              <div className="keyboard-row select-none">
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('q') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">Q</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('w') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">W</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('e') ? 'keyboard-key--glowing' : ''} ${isKeyTyping('e') ? 'keyboard-key--typing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">E</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('r') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">R</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('t') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">T</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('y') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">Y</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('u') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">U</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('i') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">I</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('o') ? 'keyboard-key--glowing' : ''} ${isKeyTyping('o') ? 'keyboard-key--typing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">O</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('p') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">P</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('[') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">[</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing(']') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">]</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('\\') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">\</span></div>
                </div>
              </div>
              <div className="keyboard-row select-none">
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('a') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">A</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('s') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">S</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('d') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">D</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('f') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">F</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('g') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">G</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('h') ? 'keyboard-key--glowing' : ''} ${isKeyTyping('h') ? 'keyboard-key--typing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">H</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('j') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">J</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('k') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">K</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('l') ? 'keyboard-key--glowing' : ''} ${isKeyTyping('l') ? 'keyboard-key--typing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">L</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing(';') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">;</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing("'") ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">&apos;</span></div>
                </div>
              </div>
              <div className="keyboard-row select-none">
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('z') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">Z</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('x') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">X</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('c') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">C</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('v') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">V</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('b') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content">
                    <span className="keyboard-primary">B</span>
                  </div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('n') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">N</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('m') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">M</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing(',') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">,</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('.') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">.</span></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key ${isKeyGlowing('/') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content"><span className="keyboard-primary">/</span></div>
                </div>
              </div>
              <div className="keyboard-row keyboard-row--bottom select-none">
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key keyboard-key--modifier ${isKeyGlowing('control-left') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content">
                    <div className="keyboard-command">
                      <span>control</span><span className="keyboard-icon">^</span>
                    </div>
                  </div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key keyboard-key--modifier ${isKeyGlowing('option-left') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content">
                    <div className="keyboard-command">
                      <span>option</span><span className="keyboard-icon">⌥</span>
                    </div>
                  </div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key keyboard-key--modifier ${isKeyGlowing('command-left') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content">
                    <div className="keyboard-command">
                      <span>command</span><span className="keyboard-icon">⌘</span>
                    </div>
                  </div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key keyboard-key--space ${isKeyGlowing(' ') ? 'keyboard-key--glowing' : ''} ${isKeyTyping(' ') ? 'keyboard-key--typing' : ''}`}>
                  <div className="keyboard-content"><div className="keyboard-primary"></div></div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key keyboard-key--modifier ${isKeyGlowing('command-right') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content">
                    <div className="keyboard-command">
                      <span>command</span><span className="keyboard-icon">⌘</span>
                    </div>
                  </div>
                </div>
                <div className={`hover:translate-y-[0.7px] active:translate-y-[1.5px] hover:border-zinc-900! active:border-zinc-900/50! active:shadow-inner keyboard-key keyboard-key--modifier ${isKeyGlowing('option-right') ? 'keyboard-key--glowing' : ''}`}>
                  <div className="keyboard-content">
                    <div className="keyboard-command">
                      <span>option</span><span className="keyboard-icon">⌥</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 