"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Keyboard from "../components/Keyboard";
import { AppHeader } from "../components/app-header";
import { clearServiceWorkerCache, getCacheInfo } from "../lib/cache-utils";

export default function HomePage() {
  const { t } = useTranslation();
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
        alert(t('common.success'));
      } else {
        alert(t('common.error'));
      }
    } catch (error) {
      console.error('Error clearing cache:', error);
      alert(t('common.error'));
    } finally {
      setIsClearingCache(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <AppHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4">BrainBox</h1>
          <p className="text-xl text-gray-300 mb-8">{t('app.description')}</p>

          <div className="flex justify-center space-x-4 mb-8">
            <a href="/demo" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors">
              {t('navigation.demo')}
            </a>
            <a href="/examples" className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg transition-colors">
              {t('navigation.examples')}
            </a>
            <button
              onClick={handleClearCache}
              disabled={isClearingCache}
              className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed px-6 py-3 rounded-lg transition-colors"
            >
              {isClearingCache ? t('app.loading') : t('app.delete')}
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('common.welcome')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="font-semibold mb-2">{t('app.title')}</h3>
                <p className="text-gray-300">
                  {t('app.description')}
                </p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="font-semibold mb-2">{t('navigation.demo')}</h3>
                <p className="text-gray-300">{t('common.welcome')}</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="font-semibold mb-2">{t('navigation.examples')}</h3>
                <p className="text-gray-300">{t('common.hello')}</p>
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
          <p>{t('common.welcome')} - {t('app.description')}</p>
          <div className="mt-4 p-4 bg-gray-800 rounded-lg max-w-md mx-auto">
            <p className="text-xs text-gray-300 mb-2">{t('app.loading')}</p>
            <p className="text-xs text-gray-400">
              {t('common.welcome')}: {cacheInfo.cacheCount} 
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
