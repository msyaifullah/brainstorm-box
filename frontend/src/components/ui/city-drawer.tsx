"use client";

import React, { useRef, useEffect, useState } from "react";
import { CityData } from "./flight-types";

interface CityDrawerProps {
  isVisible: boolean;
  inputValue: string;
  onCitySelect: (city: CityData) => void;
  onClose: () => void;
  getFilteredCities: (input: string) => CityData[];
}

export const CityDrawer: React.FC<CityDrawerProps> = ({
  isVisible,
  inputValue,
  onCitySelect,
  onClose,
  getFilteredCities
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState(inputValue);
  const [filteredCities, setFilteredCities] = useState<CityData[]>([]);

  // Sync searchValue with inputValue when drawer becomes visible
  useEffect(() => {
    if (isVisible) {
      setSearchValue(inputValue);
      setFilteredCities(getFilteredCities(inputValue));
      
      // Focus the input after a short delay to ensure proper rendering on mobile
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          // Ensure the input value is properly set and trigger input event
          inputRef.current.value = inputValue;
          // Trigger a change event to ensure React state is updated
          const event = new Event('input', { bubbles: true });
          inputRef.current.dispatchEvent(event);
        }
      }, 150);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, inputValue, getFilteredCities]);

  // Additional effect to handle input value changes
  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.value = searchValue;
    }
  }, [searchValue, isVisible]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible, onClose]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setFilteredCities(getFilteredCities(value));
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setSearchValue(value);
    setFilteredCities(getFilteredCities(value));
  };

  const handleCitySelect = (city: CityData) => {
    onCitySelect(city);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  if (!isVisible) return null;

  const isEmpty = searchValue.trim() === '';
  const hasResults = filteredCities.length > 0;

  return (
    <>
      {/* Backdrop */}
      <div className="city-drawer-backdrop" onClick={handleClose} />
      
      {/* Drawer */}
      <div className="city-drawer" ref={drawerRef}>
        {/* Header */}
        <div className="city-drawer__header">
          <button className="city-drawer__close-btn" onClick={handleClose}>
            <svg viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
          <h3 className="city-drawer__title">Pilih Kota</h3>
        </div>

        {/* Search Input */}
        <div className="city-drawer__search">
          <input
            ref={inputRef}
            type="text"
            placeholder="Cari kota..."
            value={searchValue}
            onChange={handleSearchChange}
            onInput={handleInput}
            className="city-drawer__search-input"
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            inputMode="text"
          />
        </div>

        {/* Content */}
        <div className="city-drawer__content">
          <div className="city-drawer__section">
            <div className="city-drawer__section-title">
              {isEmpty ? "Kota Populer" : "Hasil Pencarian"}
            </div>
            
            {isEmpty ? (
              <div className="city-drawer__grid">
                {filteredCities.map((city) => (
                  <div
                    key={city.code || city.name}
                    className="city-drawer__item"
                    onClick={() => handleCitySelect(city)}
                  >
                    <div className="city-drawer__item-name">{city.name}</div>
                    <div className="city-drawer__item-details">
                      {city.country} • {city.code}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="city-drawer__list">
                {!hasResults ? (
                  <div className="city-drawer__no-results">
                    Tidak ditemukan
                  </div>
                ) : (
                  filteredCities.map((city) => (
                    <div
                      key={city.code || city.name}
                      className="city-drawer__item"
                      onClick={() => handleCitySelect(city)}
                    >
                      <div className="city-drawer__item-content">
                        <div className="city-drawer__item-name">
                          {city.name}
                        </div>
                        <div className="city-drawer__item-details">
                          {city.country} • {city.code}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}; 