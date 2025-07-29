"use client";

import React, { useRef, useState, useEffect } from "react";
import { CityDropdown } from "./city-dropdown";
import { CityDrawer } from "./city-drawer";
import { CityData } from "./flight-types";

interface FlightInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  isTo?: boolean;
  showDropdown?: boolean;
  onCitySelect?: (city: CityData) => void;
  onDropdownClose?: () => void;
  getFilteredCities: (input: string) => CityData[];
  disabled?: boolean;
}

export const FlightInput: React.FC<FlightInputProps> = ({
  id,
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  className = "",
  inputClassName = "",
  labelClassName = "",
  isTo = false,
  showDropdown = false,
  onCitySelect,
  onDropdownClose,
  getFilteredCities,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSelectingCity, setIsSelectingCity] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Don't call onChange if we're in the process of selecting a city
    if (!isSelectingCity) {
      onChange(e.target.value);
    }
  };

  const handleCitySelect = (city: CityData) => {
    setIsSelectingCity(true);
    // Only call onCitySelect, let the parent handle the value update
    onCitySelect?.(city);
    // Reset the flag after a short delay
    setTimeout(() => setIsSelectingCity(false), 100);
  };

  return (
    <div className={`flight-input ${isTo ? 'flight-input--to' : 'flight-input--from'} ${className}`}>
      <div className={`flight-input__container ${isTo ? 'flight-input__container--to' : ''}`}>
        <div className={`flight-input__wrapper ${isTo ? 'flight-input__wrapper--to' : ''}`}>
          <input
            ref={inputRef}
            autoComplete="off"
            id={id}
            inputMode="text"
            spellCheck="false"
            type="text"
            tabIndex={2}
            value={value}
            onChange={handleInputChange}
            onFocus={onFocus}
            onBlur={() => {
              // Don't call onBlur if we're selecting a city
              if (!isSelectingCity) {
                onBlur?.();
              }
            }}
            placeholder={placeholder}
            className={`flight-input__field ${inputClassName}`}
            disabled={disabled}
          />
          <label htmlFor={id} className={`flight-input__label ${labelClassName}`}>
            {label}
          </label>
          <div className="flight-input__indicator"></div>
        </div>
      </div>
      
            {showDropdown && onCitySelect && (
        <>
          {!isMobile && (
            <CityDropdown
              isVisible={showDropdown}
              inputValue={value}
              onCitySelect={handleCitySelect}
              onClose={onDropdownClose || (() => {})}
              position="left"
              getFilteredCities={getFilteredCities}
            />
          )}
          {isMobile && (
            <CityDrawer
              isVisible={showDropdown}
              inputValue={value}
              onCitySelect={handleCitySelect}
              onClose={onDropdownClose || (() => {})}
              getFilteredCities={getFilteredCities}
            />
          )}
        </>
      )}
    </div>
  );
}; 