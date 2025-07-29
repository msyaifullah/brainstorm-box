export interface CityData {
  name: string;
  country: string;
  code: string;
  fullName: string;
}

export interface FlightSegment {
  id: string;
  from: string;
  to: string;
  departureDate?: string;
}

export interface FlightSearchProps {
  fromValue?: string;
  toValue?: string;
  onFromChange?: (value: string) => void;
  onToChange?: (value: string) => void;
  onSwap?: () => void;
  isMultiCity?: boolean;
  segments?: FlightSegment[];
  onSegmentsChange?: (segments: FlightSegment[]) => void;
  departureDate?: string;
  returnDate?: string;
  onDepartureDateChange?: (value: string) => void;
  onReturnDateChange?: (value: string) => void;
  isRoundTrip?: boolean;
} 