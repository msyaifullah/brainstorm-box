"use client";

import React, { useRef, useEffect } from "react";
import { CityData } from "./flight-types";

interface CityDropdownProps {
  isVisible: boolean;
  inputValue: string;
  onCitySelect: (city: CityData) => void;
  onClose: () => void;
  position: 'left' | 'right';
  getFilteredCities: (input: string) => CityData[];
}

export const CityDropdown: React.FC<CityDropdownProps> = ({
  isVisible,
  inputValue,
  onCitySelect,
  onClose,
  position,
  getFilteredCities
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const filteredCities = getFilteredCities(inputValue);
  const isEmpty = inputValue.trim() === '';
  const hasResults = filteredCities.length > 0;

  return (
    <div className="flight-suggestion-dropdown" ref={dropdownRef}>
      <div className="flight-suggestion-dropdown__inner">
        <div className="flight-suggestion-dropdown__title">
          {isEmpty ? "Kota populer" : "Hasil pencarian"}
        </div>
        
        {isEmpty ? (
          <div className="flight-suggestion-dropdown__list flight-suggestion-dropdown__list--grid">
            {filteredCities.map((city) => (
              <div
                key={city.code || city.name}
                className="flight-suggestion-dropdown__item"
                onClick={() => onCitySelect(city)}
              >
                {city.name}
              </div>
            ))}
          </div>
        ) : (
          <div className="flight-suggestion-dropdown__list">
            {!hasResults ? (
              <div className="flight-suggestion-dropdown__item flight-suggestion-dropdown__item--no-results">
                Tidak ditemukan
              </div>
            ) : (
              filteredCities.map((city) => (
                <div
                  key={city.code || city.name}
                  className="flight-suggestion-dropdown__item"
                  onClick={() => onCitySelect(city)}
                >
                  <div className="flight-suggestion-dropdown__item-content">
                    <div className="flight-suggestion-dropdown__item-name">
                      {city.name}
                    </div>
                    <div className="flight-suggestion-dropdown__item-details">
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
  );
}; 