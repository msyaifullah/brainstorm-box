"use client";

import { useState, useEffect } from "react";
import Keyboard from "../components/Keyboard";
import { clearServiceWorkerCache, getCacheInfo } from "../lib/cache-utils";

export default function HomePage() {
  const [glowingKeys, setGlowingKeys] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingSequence, setTypingSequence] = useState<string[]>([]);
  const [cacheInfo, setCacheInfo] = useState<{ cacheCount: number; cacheNames: string[] }>({ cacheCount: 0, cacheNames: [] });
  const [isClearingCache, setIsClearingCache] = useState(false);

  // Auto-demo effect
  useEffect(() => {
    const demoSequence = [
      { keys: ["h"], delay: 1000 },
      { keys: ["e"], delay: 2000 },
      { keys: ["l"], delay: 3000 },
      { keys: ["l"], delay: 4000 },
      { keys: ["o"], delay: 5000 },
      { keys: [" "], delay: 6000 },
      { keys: ["w"], delay: 7000 },
      { keys: ["o"], delay: 8000 },
      { keys: ["r"], delay: 9000 },
      { keys: ["l"], delay: 10000 },
      { keys: ["d"], delay: 11000 },
      { keys: [], delay: 12000 }, // Clear
    ];

    const timers = demoSequence.map(({ keys, delay }) => setTimeout(() => setGlowingKeys(keys), delay));

    // Start typing demo after 2 seconds
    setTimeout(() => {
      setTypingSequence(["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]);
      setIsTyping(true);
    }, 2000);

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const handleTypingComplete = () => {
    setIsTyping(false);
    setTypingSequence([]);
  };

  // Load cache info on component mount
  useEffect(() => {
    const loadCacheInfo = async () => {
      const info = await getCacheInfo();
      setCacheInfo(info);
    };
    loadCacheInfo();
  }, []);

  const handleClearCache = async () => {
    setIsClearingCache(true);
    try {
      const success = await clearServiceWorkerCache();
      if (success) {
        // Reload cache info after clearing
        const newInfo = await getCacheInfo();
        setCacheInfo(newInfo);
        alert('Cache cleared successfully!');
      } else {
        alert('Failed to clear cache. Please try again.');
      }
    } catch (error) {
      console.error('Error clearing cache:', error);
      alert('Error clearing cache. Please try again.');
    } finally {
      setIsClearingCache(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4">BrainBox</h1>
          <p className="text-xl text-gray-300 mb-8">Interactive Keyboard with Glowing Keys and Typing Animations</p>

          <div className="flex justify-center space-x-4 mb-8">
            <a href="/demo" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors">
              View Full Demo
            </a>
            <a href="/examples" className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg transition-colors">
              Examples
            </a>
            <button
              onClick={handleClearCache}
              disabled={isClearingCache}
              className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed px-6 py-3 rounded-lg transition-colors"
            >
              {isClearingCache ? 'Clearing...' : 'Clear Cache'}
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="font-semibold mb-2">Glowing Keys</h3>
                <p className="text-gray-300">
                  Highlight individual keys or key combinations with a beautiful glow effect
                </p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="font-semibold mb-2">Typing Animation</h3>
                <p className="text-gray-300">Watch realistic typing animations with customizable speed and sequences</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="font-semibold mb-2">Interactive</h3>
                <p className="text-gray-300">Fully responsive with hover effects and smooth transitions</p>
              </div>
            </div>
          </div>
        </div>
        <Keyboard
          glowingKeys={glowingKeys}
          typingSequence={typingSequence}
          isTyping={isTyping}
          typingSpeed={300}
          onTypingComplete={handleTypingComplete}
        />

        <div className="text-center mt-8 text-sm text-gray-400">
          <p>Watch the demo above - keys will glow and typing animation will play automatically</p>
          <div className="mt-4 p-4 bg-gray-800 rounded-lg max-w-md mx-auto">
            <p className="text-xs text-gray-300 mb-2">Cache Status</p>
            <p className="text-xs text-gray-400">
              Active caches: {cacheInfo.cacheCount} 
              {cacheInfo.cacheNames.length > 0 && (
                <span className="block mt-1">
                  ({cacheInfo.cacheNames.join(', ')})
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
