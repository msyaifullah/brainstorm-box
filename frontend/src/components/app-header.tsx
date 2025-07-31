"use client";

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../lib/language-context';
import { LanguageSelector } from './language-selector';

export function AppHeader() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-bold">
            {t('app.title')}
          </h1>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-300 transition-colors">
              {t('navigation.home')}
            </Link>
            <Link href="/demo" className="hover:text-blue-300 transition-colors">
              {t('navigation.demo')}
            </Link>
            <Link href="/examples" className="hover:text-blue-300 transition-colors">
              {t('navigation.examples')}
            </Link>
            <Link href="/terminal" className="hover:text-blue-300 transition-colors">
              {t('navigation.terminal')}
            </Link>
            <Link href="/flight-demo" className="hover:text-blue-300 transition-colors">
              {t('navigation.flightDemo')}
            </Link>
            <Link href="/destination-demo" className="hover:text-blue-300 transition-colors">
              {t('navigation.destinationDemo')}
            </Link>
            <Link href="/language-demo" className="hover:text-blue-300 transition-colors">
              Language Demo
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-300">
            {t('common.welcome')} - {t('search.language')}: {language.toUpperCase()}
          </div>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
} 