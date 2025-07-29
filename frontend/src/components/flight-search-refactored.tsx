"use client";

import React, { useState, useEffect } from "react";
import { FlightInput } from "./ui/flight-input";
import { FlightDatePicker, RoundTripDatePicker } from "./ui/flight-date-picker";
import { SwapButton } from "./ui/swap-button";
import { AddRemoveButton } from "./ui/add-remove-button";
import { FlightSearchProps, FlightSegment, CityData } from "./ui/flight-types";
import { getFilteredCities, getToday, getTomorrow } from "./ui/flight-utils";

export default function FlightSearch({
  fromValue = "Jakarta, Indonesia (JKT)",
  toValue = "Kuala Lumpur, Malaysia (KUL)",
  onFromChange,
  onToChange,
  onSwap,
  isMultiCity = false,
  segments = [],
  onSegmentsChange,
  departureDate,
  returnDate,
  onDepartureDateChange,
  onReturnDateChange,
  isRoundTrip = false,
}: FlightSearchProps) {
  const today = getToday();
  const tomorrow = getTomorrow();

  const defaultDepartureDate = departureDate || today;
  const defaultReturnDate = returnDate || tomorrow;
  
  // State for single city mode
  const [swapRotation, setSwapRotation] = useState<"clockwise" | "counterclockwise">("clockwise");
  const [focusedDateInput, setFocusedDateInput] = useState<"departure" | "return" | null>(null);
  const [fromInput, setFromInput] = useState(fromValue);
  const [toInput, setToInput] = useState(toValue);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);  

  // State for multi-city mode
  const [localSegments, setLocalSegments] = useState<FlightSegment[]>(
    segments.length > 0
      ? segments
      : [
          { id: "1", from: fromValue, to: toValue, departureDate: today },
          { id: "2", from: "", to: "", departureDate: today },
        ]
  );
  

  const [segmentRotations, setSegmentRotations] = useState<Record<string, "clockwise" | "counterclockwise">>({});
  const [segmentDropdowns, setSegmentDropdowns] = useState<Record<string, { from: boolean; to: boolean }>>({});

  // Update parent on change
  useEffect(() => {
    onFromChange?.(fromInput);
  }, [fromInput, onFromChange]);
  
  useEffect(() => {
    onToChange?.(toInput);
  }, [toInput, onToChange]);

  // Click outside handler for multi-city segment dropdowns
  useEffect(() => {
    if (!isMultiCity) return;
    
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const clickedOutsideAllSegments = localSegments.every(segment => {
        const fromInput = document.getElementById(`from-${segment.id}`);
        const toInput = document.getElementById(`to-${segment.id}`);
        
        return !fromInput?.contains(target) && !toInput?.contains(target);
      });
      
      // Also check if click is on dropdown elements
      const dropdowns = document.querySelectorAll('.flight-suggestion-dropdown, .city-drawer');
      const clickedOnDropdown = Array.from(dropdowns).some(dropdown => 
        dropdown.contains(target)
      );
      
      if (clickedOutsideAllSegments && !clickedOnDropdown) {
        setSegmentDropdowns({});
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMultiCity, localSegments]);

  // Single city handlers
  const handleSwap = () => {
    setSwapRotation((prev) => (prev === "clockwise" ? "counterclockwise" : "clockwise"));
    setFromInput(toInput);
    setToInput(fromInput);
    setShowFromSuggestions(false);
    setShowToSuggestions(false);
    onSwap?.();
  };

  const handleFromInputChange = (value: string) => {
    setFromInput(value);
    setShowFromSuggestions(true);
  };

  const handleToInputChange = (value: string) => {
    setToInput(value);
    setShowToSuggestions(true);
  };

  const handleCitySelect = (city: CityData, isFrom: boolean) => {
    if (isFrom) {
      setFromInput(city.fullName);
      setShowFromSuggestions(false);
    } else {
      setToInput(city.fullName);
      setShowToSuggestions(false);
    }
  };

  // Multi-city handlers
  const addSegment = () => {
    if (localSegments.length < 5) {
      const newSegment: FlightSegment = {
        id: Date.now().toString(),
        from: "",
        to: "",
        departureDate: today,
      };
      const updatedSegments = [...localSegments, newSegment];
      setLocalSegments(updatedSegments);
      onSegmentsChange?.(updatedSegments);
    }
  };

  const removeSegment = (id: string) => {
    if (localSegments.length > 2) {
      const updatedSegments = localSegments.filter((segment) => segment.id !== id);
      setLocalSegments(updatedSegments);
      onSegmentsChange?.(updatedSegments);
    }
  };

  const updateSegment = (id: string, field: "from" | "to" | "departureDate", value: string) => {
    const updatedSegments = localSegments.map((segment) =>
      segment.id === id ? { ...segment, [field]: value } : segment
    );
    setLocalSegments(updatedSegments);
    onSegmentsChange?.(updatedSegments);
  };

  const swapSegment = (id: string) => {
    setSegmentRotations((prev) => ({
      ...prev,
      [id]: prev[id] === "counterclockwise" ? "clockwise" : "counterclockwise",
    }));
    const updatedSegments = localSegments.map((segment) =>
      segment.id === id ? { ...segment, from: segment.to, to: segment.from } : segment
    );
    setLocalSegments(updatedSegments);
    onSegmentsChange?.(updatedSegments);
  };

  // Multi-city mode
  if (isMultiCity) {
    return (
      <div className="flight-search">
        <div className="flight-search__form flight-search__form--multi-city">
          {localSegments.map((segment) => (
            <div key={segment.id} className="flight-segment">
              <div className="flight-segment__inputs">
                <div className="flight-segment__route">
                  <FlightInput
                    id={`from-${segment.id}`}
                    label="Dari"
                    value={segment.from}
                    onChange={(value) => updateSegment(segment.id, "from", value)}
                    onFocus={() => {
                      // Add a small delay to prevent immediate closing
                      setTimeout(() => {
                        setSegmentDropdowns(prev => ({ ...prev, [segment.id]: { ...prev[segment.id], from: true } }));
                      }, 10);
                    }}
                    showDropdown={!!segmentDropdowns[segment.id]?.from}
                    onCitySelect={(city) => {
                      // Update the segment with the selected city
                      updateSegment(segment.id, "from", city.fullName);
                      // Close the dropdown
                      setSegmentDropdowns(prev => ({ ...prev, [segment.id]: { ...prev[segment.id], from: false } }));
                    }}
                    onDropdownClose={() => setSegmentDropdowns(prev => ({ ...prev, [segment.id]: { ...prev[segment.id], from: false } }))}
                    getFilteredCities={getFilteredCities}
                  />
                  
                  <SwapButton
                    onClick={() => swapSegment(segment.id)}
                    rotation={segmentRotations[segment.id] || "clockwise"}
                    className="flight-segment__swap-btn"
                  />
                  
                  <FlightInput
                    id={`to-${segment.id}`}
                    label="Ke"
                    value={segment.to}
                    onChange={(value) => updateSegment(segment.id, "to", value)}
                    onFocus={() => {
                      // Add a small delay to prevent immediate closing
                      setTimeout(() => {
                        setSegmentDropdowns(prev => ({ ...prev, [segment.id]: { ...prev[segment.id], to: true } }));
                      }, 10);
                    }}
                    isTo={true}
                    showDropdown={!!segmentDropdowns[segment.id]?.to}
                    onCitySelect={(city) => {
                      // Update the segment with the selected city
                      updateSegment(segment.id, "to", city.fullName);
                      // Close the dropdown
                      setSegmentDropdowns(prev => ({ ...prev, [segment.id]: { ...prev[segment.id], to: false } }));
                    }}
                    onDropdownClose={() => setSegmentDropdowns(prev => ({ ...prev, [segment.id]: { ...prev[segment.id], to: false } }))}
                    getFilteredCities={getFilteredCities}
                  />
                </div>
                
                {segment.departureDate !== undefined && (
                  <FlightDatePicker
                    id={`departure-${segment.id}`}
                    label="Berangkat"
                    value={segment.departureDate || today}
                    onChange={(value) => updateSegment(segment.id, "departureDate", value)}
                    className="flight-date-picker--multi-city"
                  />
                )}
                
                <AddRemoveButton
                  type="remove"
                  onClick={() => removeSegment(segment.id)}
                  disabled={localSegments.length <= 2}
                  className="flight-segment__remove-btn"
                />
              </div>
            </div>
          ))}
          
          <AddRemoveButton
            type="add"
            onClick={addSegment}
            disabled={localSegments.length >= 5}
            className="flight-segment__add-btn"
          />
        </div>
      </div>
    );
  }

  // Single city mode
  return (
    <div className="flight-search">
      <div className="flight-search__form">
        <FlightInput
          id="outboundSearchQuery"
          label="Dari"
          value={fromInput}
          onChange={handleFromInputChange}
          onFocus={() => setShowFromSuggestions(true)}
          showDropdown={showFromSuggestions}
          onCitySelect={(city) => handleCitySelect(city, true)}
          onDropdownClose={() => setShowFromSuggestions(false)}
          getFilteredCities={getFilteredCities}
        />

        <SwapButton
          onClick={handleSwap}
          rotation={swapRotation}
          className="flight-search__swap-btn"
        />

        <FlightInput
          id="inboundSearchQuery"
          label="Ke"
          value={toInput}
          onChange={handleToInputChange}
          onFocus={() => setShowToSuggestions(true)}
          isTo={true}
          showDropdown={showToSuggestions}
          onCitySelect={(city) => handleCitySelect(city, false)}
          onDropdownClose={() => setShowToSuggestions(false)}
          getFilteredCities={getFilteredCities}
        />
      </div>
      
      {departureDate !== undefined && (
        <>
          {isRoundTrip ? (
            <RoundTripDatePicker
              departureDate={defaultDepartureDate}
              returnDate={defaultReturnDate}
              onDepartureDateChange={(value) => onDepartureDateChange?.(value)}
              onReturnDateChange={(value) => onReturnDateChange?.(value)}
              onDepartureFocus={() => setFocusedDateInput("departure")}
              onReturnFocus={() => setFocusedDateInput("return")}
              onDepartureBlur={() => setFocusedDateInput(null)}
              onReturnBlur={() => setFocusedDateInput(null)}
              focusedInput={focusedDateInput}
              className="flight-date-picker--round-trip"
            />
          ) : (
            <FlightDatePicker
              id="departureDate"
              label="Berangkat"
              value={defaultDepartureDate}
              onChange={(value) => onDepartureDateChange?.(value)}
              className="flight-date-picker--single-trip"
            />
          )}
        </>
      )}
    </div>
  );
} 