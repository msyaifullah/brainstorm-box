"use client";

import { useState, useEffect } from "react";
import Keyboard from "../../components/Keyboard";

export default function TerminalPage() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingSequence, setTypingSequence] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [realTimeText, setRealTimeText] = useState("");
  const [realTimeKeys, setRealTimeKeys] = useState<string[]>([]);
  const [isRealTimeMode, setIsRealTimeMode] = useState(false);
  const [activeModifiers, setActiveModifiers] = useState<string[]>([]);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Handle typing animation
  useEffect(() => {
    if (isTyping && typingSequence.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev >= typingSequence.length) {
            setIsTyping(false);
            return 0;
          }
          const newText = typingSequence.slice(0, prev + 1).join("");
          setDisplayedText(newText);
          return prev + 1;
        });
      }, 150);

      return () => clearInterval(interval);
    }
  }, [isTyping, typingSequence]);

  // Handle real keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isRealTimeMode) return;
      
      event.preventDefault();
      
      let key = event.key;
      let displayKey = key;
      let modifierKeys: string[] = [];
      
      // Check for modifier keys
      if (event.metaKey) {
        modifierKeys.push('command');
      }
      if (event.altKey) {
        modifierKeys.push('option');
      }
      if (event.ctrlKey) {
        modifierKeys.push('control');
      }
      if (event.shiftKey) {
        modifierKeys.push('shift');
      }
      
      // Handle special keys
      if (event.key === ' ') {
        key = ' ';
        displayKey = ' ';
      } else if (event.key === 'Enter') {
        key = 'enter';
        displayKey = '\n';
      } else if (event.key === 'Backspace') {
        key = 'backspace';
        setRealTimeText(prev => prev.slice(0, -1));
        setRealTimeKeys([]);
        return;
      } else if (event.key === 'Escape') {
        key = 'esc';
        displayKey = '';
      } else if (event.key === 'Tab') {
        key = 'tab';
        displayKey = '\t';
      } else if (event.key === 'ArrowUp') {
        key = 'arrowup';
        displayKey = '';
      } else if (event.key === 'ArrowDown') {
        key = 'arrowdown';
        displayKey = '';
      } else if (event.key === 'ArrowLeft') {
        key = 'arrowleft';
        displayKey = '';
      } else if (event.key === 'ArrowRight') {
        key = 'arrowright';
        displayKey = '';
      } else if (event.key === 'Delete') {
        key = 'delete';
        setRealTimeText(prev => prev.slice(0, -1));
        setRealTimeKeys([]);
        return;
      } else if (event.key.length === 1) {
        // Regular character or special character
        displayKey = event.key;
        
        // Map special characters to their key names for keyboard display
        const specialCharMap: { [key: string]: string } = {
          '!': '1', '@': '2', '#': '3', '$': '4', '%': '5', '^': '6', '&': '7', '*': '8', '(': '9', ')': '0',
          '_': '-', '+': '=', '{': '[', '}': ']', '|': '\\', ':': ';', '"': "'", '<': ',', '>': '.', '?': '/',
          '~': '`'
        };
        
        if (specialCharMap[event.key]) {
          key = specialCharMap[event.key];
        }
      } else {
        // Other special keys - ignore
        return;
      }
      
      // Add to text if it's a displayable character
      if (displayKey && displayKey !== '') {
        setRealTimeText(prev => prev + displayKey);
      }
      
      // Combine modifier keys with the main key
      let keysToShow = [...modifierKeys, key];
      
      // Update active modifiers for display
      setActiveModifiers(modifierKeys);
      
      // Show key glow
      setRealTimeKeys(keysToShow);
      
      // Clear the glow after a short delay
      setTimeout(() => {
        setRealTimeKeys([]);
      }, 200);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!isRealTimeMode) return;
      
      // Clear modifiers when keys are released
      if (event.key === 'Meta' || event.key === 'Alt' || event.key === 'Control' || event.key === 'Shift') {
        setActiveModifiers([]);
      }
    };

    if (isRealTimeMode) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, [isRealTimeMode]);

  const startTyping = (text: string) => {
    const sequence = text.split("");
    setTypingSequence(sequence);
    setDisplayedText("");
    setCurrentIndex(0);
    setIsTyping(true);
  };

  const clearTerminal = () => {
    setDisplayedText("");
    setRealTimeText("");
    setCurrentIndex(0);
    setIsTyping(false);
    setTypingSequence([]);
    setRealTimeKeys([]);
    setActiveModifiers([]);
  };

  const toggleRealTimeMode = () => {
    setIsRealTimeMode(!isRealTimeMode);
    if (!isRealTimeMode) {
      // Switching to real-time mode, clear demo text
      setDisplayedText("");
      setRealTimeText("");
      setCurrentIndex(0);
      setIsTyping(false);
      setTypingSequence([]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Terminal Keyboard Demo</h1>

        {/* Terminal Screen */}
        <div className="mb-8">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 h-64 overflow-hidden">
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-4 text-gray-400 text-sm">Terminal</div>
            </div>
            
            <div className="font-mono text-green-400 text-lg leading-relaxed">
              <div className="mb-2">
                <span className="text-blue-400">$ </span>
                <span className="text-white">echo "Welcome to the terminal demo"</span>
              </div>
              <div className="mb-2 text-green-400">
                Welcome to the terminal demo
              </div>
              <div className="mb-2">
                <span className="text-blue-400">$ </span>
                <span className="text-white">type_message</span>
              </div>
              {isRealTimeMode && activeModifiers.length > 0 && (
                <div className="mb-2 text-yellow-400 text-sm">
                  Active modifiers: {activeModifiers.join(' + ')}
                </div>
              )}
              <div className="text-white">
                {isRealTimeMode ? realTimeText : displayedText}
                <span className={`text-green-400 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>|</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => startTyping("welcome in beda.id")}
              disabled={isTyping || isRealTimeMode}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-3 rounded-lg transition-colors font-semibold"
            >
              {isTyping ? "Typing..." : "Type: welcome in beda.id"}
            </button>
            
            <button
              onClick={() => startTyping("Hello World! This is a terminal demo.")}
              disabled={isTyping || isRealTimeMode}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-6 py-3 rounded-lg transition-colors font-semibold"
            >
              {isTyping ? "Typing..." : "Type: Hello World!"}
            </button>
            
            <button
              onClick={() => startTyping("The quick brown fox jumps over the lazy dog.")}
              disabled={isTyping || isRealTimeMode}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 px-6 py-3 rounded-lg transition-colors font-semibold"
            >
              {isTyping ? "Typing..." : "Type: Quick Brown Fox"}
            </button>
            
            <button
              onClick={toggleRealTimeMode}
              className={`px-6 py-3 rounded-lg transition-colors font-semibold ${
                isRealTimeMode 
                  ? 'bg-orange-600 hover:bg-orange-700' 
                  : 'bg-yellow-600 hover:bg-yellow-700'
              }`}
            >
              {isRealTimeMode ? "Exit Real-time Mode" : "Enable Real-time Typing"}
            </button>
            
            <button
              onClick={clearTerminal}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition-colors font-semibold"
            >
              Clear Terminal
            </button>
          </div>
        </div>

        {/* Status */}
        <div className="mb-8 text-center">
          <div className="inline-block bg-gray-800 px-4 py-2 rounded-lg">
            <span className="text-gray-400">Status: </span>
            <span className={isRealTimeMode ? "text-blue-400" : isTyping ? "text-yellow-400" : "text-green-400"}>
              {isRealTimeMode ? "Real-time Mode Active" : isTyping ? "Typing..." : "Ready"}
            </span>
            {isTyping && (
              <span className="text-gray-400 ml-2">
                ({currentIndex}/{typingSequence.length})
              </span>
            )}
            {isRealTimeMode && (
              <span className="text-gray-400 ml-2">
                (Type on your keyboard!)
              </span>
            )}
          </div>
        </div>

        {/* Keyboard */}
        <div className="mt-8">
          <Keyboard
            typingSequence={typingSequence}
            isTyping={isTyping}
            typingSpeed={150}
            glowingKeys={isRealTimeMode ? realTimeKeys : []}
            onTypingComplete={() => {
              setIsTyping(false);
              setCurrentIndex(0);
            }}
          />
        </div>
      </div>
    </div>
  );
} 