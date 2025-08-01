"use client";

import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { CalendarFlight } from "./calendar-flight";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

interface FlightDatePickerProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
  placeholder?: string;
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
}

interface RoundTripDatePickerProps {
  departureDate: string;
  returnDate: string;
  onDepartureDateChange: (value: string) => void;
  onReturnDateChange: (value: string) => void;
  onDepartureFocus?: () => void;
  onReturnFocus?: () => void;
  onDepartureBlur?: () => void;
  onReturnBlur?: () => void;
  className?: string;
  departureClassName?: string;
  returnClassName?: string;
  focusedInput?: "departure" | "return" | null;
  min?: string;
  max?: string;
}

// Date Drawer Component for Mobile
interface DateDrawerProps {
  isVisible: boolean;
  onClose: () => void;
  mode: "single" | "range";
  selected?: Date | DateRange;
  onSelect: (date: Date | DateRange | undefined) => void;
  min?: string;
  max?: string;
  title: string;
}

const DateDrawer: React.FC<DateDrawerProps> = ({
  isVisible,
  onClose,
  mode,
  selected,
  onSelect,
  min,
  max,
  title
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

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

  const handleDateSelect = (date: Date | DateRange | undefined) => {
    onSelect(date);
    onClose();
  };

  const handleSingleDateSelect = (date: Date | undefined) => {
    onSelect(date);
    onClose();
  };

  const handleRangeDateSelect = (range: DateRange | undefined) => {
    onSelect(range);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="city-drawer-backdrop" onClick={onClose} />
      
      {/* Drawer */}
      <div className="city-drawer" ref={drawerRef}>
        {/* Header */}
        <div className="city-drawer__header">
          <button className="city-drawer__close-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
          <h3 className="city-drawer__title">{title}</h3>
        </div>

        {/* Calendar Content */}
        <div className="city-drawer__content">
          <div className="city-drawer__section">
            {mode === "single" ? (
              <CalendarFlight
                mode="single"
                numberOfMonths={1}
                selected={selected as Date}
                onSelect={handleSingleDateSelect}
                disabled={(date) => {
                  if (min) {
                    const minDate = new Date(min);
                    if (date < minDate) return true;
                  }
                  if (max) {
                    const maxDate = new Date(max);
                    if (date > maxDate) return true;
                  }
                  return false;
                }}
                className="rounded-md"
              />
            ) : (
              <CalendarFlight
                mode="range"
                numberOfMonths={1}
                selected={selected as DateRange}
                onSelect={handleRangeDateSelect}
                disabled={(date) => {
                  if (min) {
                    const minDate = new Date(min);
                    if (date < minDate) return true;
                  }
                  if (max) {
                    const maxDate = new Date(max);
                    if (date > maxDate) return true;
                  }
                  return false;
                }}
                className="rounded-md"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Date Dropdown Component for Desktop
interface DateDropdownProps {
  isVisible: boolean;
  onClose: () => void;
  mode: "single" | "range";
  selected?: Date | DateRange;
  onSelect: (date: Date | DateRange | undefined) => void;
  min?: string;
  max?: string;
  position: 'left' | 'right';
}

const DateDropdown: React.FC<DateDropdownProps> = ({
  isVisible,
  onClose,
  mode,
  selected,
  onSelect,
  min,
  max,
  position
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

  return (
    <div className="flight-date-dropdown" ref={dropdownRef}>
      <div className="flight-date-dropdown__inner">
        {mode === "single" ? (
          <CalendarFlight
            mode="single"
            numberOfMonths={2}
            selected={selected as Date}
            onSelect={onSelect as (date: Date | undefined) => void}
            disabled={(date) => {
              if (min) {
                const minDate = new Date(min);
                if (date < minDate) return true;
              }
              if (max) {
                const maxDate = new Date(max);
                if (date > maxDate) return true;
              }
              return false;
            }}
            className="rounded-md"
          />
        ) : (
          <CalendarFlight
            mode="range"
            numberOfMonths={2}
            selected={selected as DateRange}
            onSelect={onSelect as (date: DateRange | undefined) => void}
            disabled={(date) => {
              if (min) {
                const minDate = new Date(min);
                if (date < minDate) return true;
              }
              if (max) {
                const maxDate = new Date(max);
                if (date > maxDate) return true;
              }
              return false;
            }}
            className="rounded-md"
          />
        )}
      </div>
    </div>
  );
};

export const RoundTripDatePicker: React.FC<RoundTripDatePickerProps> = ({
  departureDate,
  returnDate,
  onDepartureDateChange,
  onReturnDateChange,
  onDepartureFocus,
  onReturnFocus,
  onDepartureBlur,
  onReturnBlur,
  className = "",
  departureClassName = "",
  returnClassName = "",
  focusedInput,
  min,
  max,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [activeInput, setActiveInput] = useState<"departure" | "return" | null>(null);
  
  const [departureDateState, setDepartureDateState] = useState<Date | undefined>(
    departureDate ? new Date(departureDate) : undefined
  );
  const [returnDateState, setReturnDateState] = useState<Date | undefined>(
    returnDate ? new Date(returnDate) : undefined
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Create DateRange for the calendar
  const dateRange: DateRange | undefined = departureDateState && returnDateState 
    ? { from: departureDateState, to: returnDateState }
    : departureDateState 
    ? { from: departureDateState, to: undefined }
    : undefined;

  const handleRangeSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      const formattedDepartureDate = format(range.from, "yyyy-MM-dd");
      setDepartureDateState(range.from);
      onDepartureDateChange(formattedDepartureDate);
    }
    
    if (range?.to) {
      const formattedReturnDate = format(range.to, "yyyy-MM-dd");
      setReturnDateState(range.to);
      onReturnDateChange(formattedReturnDate);
    }
    
    if (isMobile) {
      setShowDrawer(false);
    } else {
      setShowDropdown(false);
    }
  };

  const handleDepartureFocus = () => {    
    setActiveInput("departure");
    if (isMobile) {
      setShowDrawer(true);
    } else {
      setShowDropdown(true);
    }
    onDepartureFocus?.();
  };

  const handleReturnFocus = () => {
    setActiveInput("return");
    if (isMobile) {
      setShowDrawer(true);
    } else {
      setShowDropdown(true);
    }
    onReturnFocus?.();
  };

  const handleClose = () => {
    if (isMobile) {
      setShowDrawer(false);
    } else {
      setShowDropdown(false);
    }
    setActiveInput(null);
  };

  const displayDepartureValue = departureDateState 
    ? format(departureDateState, "eee, dd MMM yyyy") 
    : null;

  const displayReturnValue = returnDateState 
    ? format(returnDateState, "eee, dd MMM yyyy") 
    : null;

  return (
    <div className={`flight-date-picker-group ${className}`} style={{ position: 'relative' }}>
      <div className="flight-input__container">
        <div className="flight-input__wrapper">
          <button                
            id="departure-date"
            className={cn(
              "flight-date-input h-full w-full justify-start text-left font-normal",
              !departureDateState && "text-muted-foreground",
              departureClassName,
              focusedInput === "departure" ? "flight-date-input--focused" : ""
            )}
            onFocus={handleDepartureFocus}
            onBlur={onDepartureBlur}
          >                
            {displayDepartureValue}
          </button>
          <label htmlFor="departure-date" className="flight-input__label">
            Berangkat
          </label>
        </div>
      </div>

      <div className="flight-input__container">
        <div className="flight-input__wrapper">
          <button                
            id="return-date"
            className={cn(
              "flight-date-input h-full w-full justify-start text-left font-normal",
              !returnDateState && "text-muted-foreground",
              returnClassName,
              focusedInput === "return" ? "flight-date-input--focused" : ""
            )}
            onFocus={handleReturnFocus}
            onBlur={onReturnBlur}
          >                
            {displayReturnValue}
          </button>
          <label htmlFor="return-date" className="flight-input__label">
            Pulang Pergi
          </label>
        </div>
      </div>

      {/* Desktop Dropdown */}
      {!isMobile && showDropdown && (
        <DateDropdown
          isVisible={showDropdown}
          onClose={handleClose}
          mode="range"
          selected={dateRange}
          onSelect={handleRangeSelect as (date: Date | DateRange | undefined) => void}
          min={min}
          max={max}
          position="left"
        />
      )}

      {/* Mobile Drawer */}
      {isMobile && showDrawer && (
        <DateDrawer
          isVisible={showDrawer}
          onClose={handleClose}
          mode="range"
          selected={dateRange}
          onSelect={handleRangeSelect as (date: Date | DateRange | undefined) => void}
          min={min}
          max={max}
          title="Pilih Tanggal"
        />
      )}
    </div>
  );
};

export const FlightDatePicker: React.FC<FlightDatePickerProps> = ({
  id,
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  className = "",
  inputClassName = "",
  labelClassName = "",
  disabled = false,
  min,
  max,
  placeholder = "Select date",
  selected,
  onSelect,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      onChange(formattedDate);
      onSelect?.(selectedDate);
    }
    
    if (isMobile) {
      setShowDrawer(false);
    } else {
      setShowDropdown(false);
    }
  };

  const handleFocus = () => {
    if (isMobile) {
      setShowDrawer(true);
    } else {
      setShowDropdown(true);
    }
    onFocus?.();
  };

  const handleClose = () => {
    if (isMobile) {
      setShowDrawer(false);
    } else {
      setShowDropdown(false);
    }
  };

  const displayValue = date ? format(date, "eee, dd MMM yyyy") : placeholder;

  return (
    <div className={`flight-date-picker ${className}`}>
      <div className="flight-input__container">
        <div className="flight-input__wrapper">
          <button                
            className={cn(
              "flight-date-input h-full w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              inputClassName
            )}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={onBlur}
          >                
            {displayValue}
          </button>
          <label htmlFor={id} className={`flight-input__label ${labelClassName}`}>
            {label}
          </label>
        </div>
      </div>

      {/* Desktop Dropdown */}
      {!isMobile && showDropdown && (
        <DateDropdown
          isVisible={showDropdown}
          onClose={handleClose}
          mode="single"
          selected={selected as Date || date}
          onSelect={handleDateSelect as (date: Date | DateRange | undefined) => void}
          min={min}
          max={max}
          position="left"
        />
      )}

      {/* Mobile Drawer */}
      {isMobile && showDrawer && (
        <DateDrawer
          isVisible={showDrawer}
          onClose={handleClose}
          mode="single"
          selected={selected as Date || date}
          onSelect={handleDateSelect as (date: Date | DateRange | undefined) => void}
          min={min}
          max={max}
          title="Pilih Tanggal"
        />
      )}
    </div>
  );
}; 