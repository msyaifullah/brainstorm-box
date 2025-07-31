"use client";

import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n';

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for i18n to be initialized
    if (i18n.isInitialized) {
      setIsReady(true);
    } else {
      const handleInitialized = () => {
        setIsReady(true);
      };
      
      i18n.on('initialized', handleInitialized);
      
      return () => {
        i18n.off('initialized', handleInitialized);
      };
    }
  }, []);

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
} 