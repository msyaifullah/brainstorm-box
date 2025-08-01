"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarFlight } from "./calendar-flight";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
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
  const [open, setOpen] = useState(false);
  const [activeInput, setActiveInput] = useState<"departure" | "return">("departure");
  const [departureDateState, setDepartureDateState] = useState<Date | undefined>(
    departureDate ? new Date(departureDate) : undefined
  );
  const [returnDateState, setReturnDateState] = useState<Date | undefined>(
    returnDate ? new Date(returnDate) : undefined
  );

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
    
    setOpen(false);
  };

  const handleDepartureFocus = () => {
    setActiveInput("departure");
    setOpen(true);
    onDepartureFocus?.();
  };

  const handleReturnFocus = () => {
    setActiveInput("return");
    setOpen(true);
    onReturnFocus?.();
  };

  const displayDepartureValue = departureDateState 
    ? format(departureDateState, "eee, dd MMM yyyy") 
    : null;

  const displayReturnValue = returnDateState 
    ? format(returnDateState, "eee, dd MMM yyyy") 
    : null;

  return (
    <div className={`flight-date-picker-group ${className}`}>
      <Popover open={open} onOpenChange={setOpen}>
        <div className="flight-input__container">
          <div className="flight-input__wrapper">
            <PopoverTrigger asChild>
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
            </PopoverTrigger>
            <label htmlFor="departure-date" className="flight-input__label">
              Berangkat
            </label>
          </div>
        </div>

        <div className="flight-input__container">
          <div className="flight-input__wrapper">
            <PopoverTrigger asChild>
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
            </PopoverTrigger>
            <label htmlFor="return-date" className="flight-input__label">
              Pulang Pergi
            </label>
          </div>
        </div>

        <PopoverContent className="w-auto p-0 bg-white text-black border-none" align="end">
          <CalendarFlight
            mode="range" 
            numberOfMonths={2}       
            selected={dateRange}
            onSelect={handleRangeSelect}
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
        </PopoverContent>
      </Popover>
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
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      onChange(formattedDate);
      onSelect?.(selectedDate);
    }
    setOpen(false);
  };



  const displayValue = date ? format(date, "eee, dd MMM yyyy") : placeholder;

  const renderCalendar = () => {
    return (
      <CalendarFlight
        mode="single"   
        numberOfMonths={2}       
        selected={selected as Date || date}
        onSelect={handleDateSelect}
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
    );
  };

  return (
    <div className={`flight-date-picker ${className}`}>
      <div className="flight-input__container">
        <div className="flight-input__wrapper">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button                
                className={cn(
                  "flight-date-input h-full w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                  inputClassName
                )}
                disabled={disabled}
                onFocus={onFocus}
                onBlur={onBlur}
              >                
                {displayValue}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white text-black border-none" align="end">
              {renderCalendar()}              
            </PopoverContent>
          </Popover>
          <label htmlFor={id} className={`flight-input__label ${labelClassName}`}>
            {label}
          </label>
        </div>
      </div>
    </div>
  );
}; 