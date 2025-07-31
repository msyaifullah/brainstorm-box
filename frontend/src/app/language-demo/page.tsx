"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../lib/language-context';
import { AppHeader } from '../../components/app-header';
import { LanguageSelector } from '../../components/language-selector';

export default function LanguageDemoPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white">
      <AppHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{t('app.title')}</h1>
          <p className="text-xl text-gray-300 mb-8">
            {t('common.welcome')} - {t('search.language')}: {language.toUpperCase()}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* App Translations */}
            <div className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">{t('app.title')}</h2>
              <div className="space-y-3 text-sm">
                <p><strong>{t('app.loading')}:</strong> {t('app.loading')}</p>
                <p><strong>{t('app.error')}:</strong> {t('app.error')}</p>
                <p><strong>{t('app.success')}:</strong> {t('app.success')}</p>
                <p><strong>{t('app.cancel')}:</strong> {t('app.cancel')}</p>
                <p><strong>{t('app.save')}:</strong> {t('app.save')}</p>
                <p><strong>{t('app.delete')}:</strong> {t('app.delete')}</p>
                <p><strong>{t('app.edit')}:</strong> {t('app.edit')}</p>
                <p><strong>{t('app.close')}:</strong> {t('app.close')}</p>
              </div>
            </div>

            {/* Navigation Translations */}
            <div className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">{t('navigation.home')}</h2>
              <div className="space-y-3 text-sm">
                <p><strong>{t('navigation.home')}:</strong> {t('navigation.home')}</p>
                <p><strong>{t('navigation.demo')}:</strong> {t('navigation.demo')}</p>
                <p><strong>{t('navigation.examples')}:</strong> {t('navigation.examples')}</p>
                <p><strong>{t('navigation.terminal')}:</strong> {t('navigation.terminal')}</p>
                <p><strong>{t('navigation.flightDemo')}:</strong> {t('navigation.flightDemo')}</p>
                <p><strong>{t('navigation.destinationDemo')}:</strong> {t('navigation.destinationDemo')}</p>
              </div>
            </div>

            {/* Common Translations */}
            <div className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">{t('common.welcome')}</h2>
              <div className="space-y-3 text-sm">
                <p><strong>{t('common.welcome')}:</strong> {t('common.welcome')}</p>
                <p><strong>{t('common.hello')}:</strong> {t('common.hello')}</p>
                <p><strong>{t('common.goodbye')}:</strong> {t('common.goodbye')}</p>
                <p><strong>{t('common.thankYou')}:</strong> {t('common.thankYou')}</p>
                <p><strong>{t('common.please')}:</strong> {t('common.please')}</p>
                <p><strong>{t('common.sorry')}:</strong> {t('common.sorry')}</p>
                <p><strong>{t('common.ok')}:</strong> {t('common.ok')}</p>
                <p><strong>{t('common.done')}:</strong> {t('common.done')}</p>
              </div>
            </div>

            {/* Language Selector Demo */}
            <div className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">{t('search.language')}</h2>
              <div className="space-y-4">
                <p className="text-sm text-gray-300">
                  {t('common.welcome')} - {t('search.language')}: {language.toUpperCase()}
                </p>
                <div className="flex justify-center">
                  <LanguageSelector />
                </div>
                <div className="text-xs text-gray-400 mt-4">
                  <p>{t('common.welcome')} - {t('app.description')}</p>
                  <p>{t('common.hello')} - {t('common.goodbye')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Flight Search Translations */}
          <div className="mt-8 p-6 bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{t('search.searchFlights')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold">{t('search.from')}</h3>
                <p className="text-sm text-gray-300">{t('search.departure')}</p>
                <p className="text-sm text-gray-300">{t('search.return')}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">{t('passengers.passengers')}</h3>
                <p className="text-sm text-gray-300">{t('passengers.adults')} ({t('passengers.adultsDesc')})</p>
                <p className="text-sm text-gray-300">{t('passengers.children')} ({t('passengers.childrenDesc')})</p>
                <p className="text-sm text-gray-300">{t('passengers.infants')} ({t('passengers.infantsDesc')})</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">{t('tripTypes.roundTrip')}</h3>
                <p className="text-sm text-gray-300">{t('tripTypes.oneWay')}</p>
                <p className="text-sm text-gray-300">{t('tripTypes.multiCity')}</p>
              </div>
            </div>
          </div>

          {/* Current Language Info */}
          <div className="mt-8 p-6 bg-blue-900 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{t('search.language')} Info</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Current Language:</strong> {language.toUpperCase()}</p>
              <p><strong>HTML Lang Attribute:</strong> {typeof document !== 'undefined' ? document.documentElement.lang : 'Loading...'}</p>
              <p><strong>LocalStorage Value:</strong> {typeof window !== 'undefined' ? localStorage.getItem('app-language') || 'Not set' : 'Loading...'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 