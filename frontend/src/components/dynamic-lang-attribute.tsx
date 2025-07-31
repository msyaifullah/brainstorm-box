"use client";

import { useEffect } from 'react';
import { useLanguage } from '../lib/language-context';

export function DynamicLangAttribute() {
  const { language } = useLanguage();

  useEffect(() => {
    // Update the HTML lang attribute based on current language
    document.documentElement.lang = language;
  }, [language]);

  return null; // This component doesn't render anything
} 