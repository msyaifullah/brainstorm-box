"use client";

import React, { useState } from "react";

import FlightSearch from "../../components/flight-search-refactored";
import "../../components/ui/flight-styles.css";
import { PassengerSelector } from "../../components/passenger-selector";
import { LanguageSelector } from "../../components/language-selector";

export default function FlightDemoPage() {
  const [fromValue, setFromValue] = useState("Jakarta, Indonesia (JKT)");
  const [toValue, setToValue] = useState("Kuala Lumpur, Malaysia (KUL)");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Add state for trip type selection
  const [tripType, setTripType] = useState<"one-way" | "round-trip" | "multi-city">("round-trip");

  const [multiCitySegmentsWithDates, setMultiCitySegmentsWithDates] = useState([
    {
      id: "1",
      from: "Jakarta, Indonesia (JKT)",
      to: "Singapore, Singapore (SIN)",
      departureDate: "2024-01-15",
    },
    {
      id: "2",
      from: "Singapore, Singapore (SIN)",
      to: "Bangkok, Thailand (BKK)",
      departureDate: "2024-01-20",
    },
    {
      id: "3",
      from: "Bangkok, Thailand (BKK)",
      to: "Tokyo, Japan (NRT)",
      departureDate: "2024-01-25",
    },
  ]);

  // Add state for passenger selector
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });

  // Add state for language selector
  const [language, setLanguage] = useState<"ID" | "EN" | "CN">("ID");

  const handleSwap = () => {
    const temp = fromValue;
    setFromValue(toValue);
    setToValue(temp);
  };

  const handleMultiCitySegmentsChange = (segments: any[]) => {
    console.log("Multi-city segments with dates changed:", segments);
    setMultiCitySegmentsWithDates(segments);
  };

  // Fake API call function
  const handleSearch = async (searchParams: any) => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Log the search parameters
      console.log("Search API called with parameters:", searchParams);

      // Simulate API response
      const mockResponse = {
        success: true,
        data: {
          flights: [
            {
              id: "1",
              airline: "Garuda Indonesia",
              flightNumber: "GA-123",
              from: searchParams.from,
              to: searchParams.to,
              departureTime: "08:00",
              arrivalTime: "10:30",
              price: 1500000,
              duration: "2h 30m",
            },
            {
              id: "2",
              airline: "Lion Air",
              flightNumber: "JT-456",
              from: searchParams.from,
              to: searchParams.to,
              departureTime: "12:00",
              arrivalTime: "14:30",
              price: 1200000,
              duration: "2h 30m",
            },
          ],
          totalResults: 2,
        },
      };

      console.log("API Response:", mockResponse);
      alert(`Found ${mockResponse.data.flights.length} flights! Check console for details.`);
    } catch (error) {
      console.error("Search failed:", error);
      alert("Search failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Search button click handler for round trip
  const handleRoundTripSearch = () => {
    const searchParams = {
      from: fromValue,
      to: toValue,
      departureDate,
      ...(tripType === "round-trip" && { returnDate }),
      type: tripType,
      passengers,
    };

    handleSearch(searchParams);
  };

  // Search button click handler for multi-city
  const handleMultiCitySearch = (segments: any[]) => {
    const searchParams = {
      segments,
      type: "multi-city",
      passengers,
    };
    handleSearch(searchParams);
  };

  // Handle trip type change
  const handleTripTypeChange = (type: "one-way" | "round-trip" | "multi-city") => {
    setTripType(type);
  };

  return (
    <div className="page-wrapper">
      <div className="demo-container">
        
        
        {/* New trip type selector with multicity option */}
        <div className="search-wrapper">
          <div style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "center" }}>
            <button
              type="button"
              onClick={() => handleTripTypeChange("one-way")}
              style={{
                background: tripType === "one-way" ? "#60A5FA" : "#fff",
                color: tripType === "one-way" ? "#1E3A8A" : "#1d1d1d",
                border: "1px solid #dfdfdf",
                borderRadius: 24,
                padding: "8px 24px",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Sekali jalan
            </button>
            <button
              type="button"
              onClick={() => handleTripTypeChange("round-trip")}
              style={{
                background: tripType === "round-trip" ? "#60A5FA" : "#fff",
                color: tripType === "round-trip" ? "#1E3A8A" : "#1d1d1d",
                border: "1px solid #dfdfdf",
                borderRadius: 24,
                padding: "8px 24px",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Pulang pergi
            </button>
            <button
              type="button"
              onClick={() => handleTripTypeChange("multi-city")}
              style={{
                background: tripType === "multi-city" ? "#60A5FA" : "#fff",
                color: tripType === "multi-city" ? "#1E3A8A" : "#1d1d1d",
                border: "1px solid #dfdfdf",
                borderRadius: 24,
                padding: "8px 24px",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Multi kota
            </button>
          </div>

          {tripType === "multi-city" ? (
            <>
              <FlightSearch
                isMultiCity={true}
                segments={multiCitySegmentsWithDates}
                onSegmentsChange={handleMultiCitySegmentsChange}
              />
            </>
          ) : (
            <>
              <FlightSearch
                fromValue={fromValue}
                toValue={toValue}
                onFromChange={setFromValue}
                onToChange={setToValue}
                onSwap={handleSwap}
                departureDate={departureDate}
                returnDate={returnDate}
                onDepartureDateChange={setDepartureDate}
                onReturnDateChange={setReturnDate}
                isRoundTrip={tripType === "round-trip"}
              />
            </>
          )}

          {/* Language selector, Passenger selector popup dropdown and Search button in the same row */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", justifyContent: "flex-end" }}>
            <LanguageSelector value={language} onChange={setLanguage} />
            <PassengerSelector value={passengers} onChange={setPassengers} />
            <button
              className="search-button"
              onClick={
                tripType === "multi-city"
                  ? () => handleMultiCitySearch(multiCitySegmentsWithDates)
                  : handleRoundTripSearch
              }
              disabled={isLoading}
              style={{ width: "25%" }}
            >
              {isLoading ? "Searching..." : "Search Flights"}
            </button>
          </div>
        </div>

        <style jsx global>{`
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            background: linear-gradient(
              to bottom,
              #00B4D8 0%,
              #0096C7 30%,
              #90E0EF 60%,
              #FFFFFF 80%,
              #FFFFFF 100%
            );
          }
        `}</style>
        
        <style jsx>{`
          .page-wrapper {
            min-height: 100vh;
            width: 100%;
            position: relative;
            margin: 0;
            padding: 0;
          }

          .page-wrapper::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 15%;
            background: linear-gradient(
              to bottom,
              rgba(160, 82, 45, 0.4) 0%,
              rgba(139, 69, 19, 0.7) 50%,
              rgba(101, 67, 33, 0.9) 100%
            );
            z-index: 1;
          }

          .demo-container {
            max-width: 1024px;
            margin: 0 auto;
            padding: 2rem;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            position: relative;
            z-index: 2;
            background: transparent;
          }

          @media (max-width: 768px) {
            .demo-container {
              padding: 0;
            }
          }

          h1 {
            color: #1d1d1d;
            margin-bottom: 1rem;
          }

          p {
            color: #666;
            margin-bottom: 2rem;
          }

          .search-wrapper {
            background: #f5f5f5;
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
          }

          @media (max-width: 768px) {
            .search-wrapper {
              padding: 1rem;
            }
          }

          .search-button {
            background: #1e3a8a;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 16px;
            width: 100%;
            transition: background-color 0.2s ease;
          }

          .search-button:hover:not(:disabled) {
            background: #2563eb;
          }

          .search-button:disabled {
            background: #cccccc;
            cursor: not-allowed;
          }

          .info {
            background: #fff;
            padding: 1.5rem;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
          }

          .info h3 {
            color: #1d1d1d;
            margin-bottom: 1rem;
          }

          .info ul {
            color: #666;
            line-height: 1.6;
          }

          .info li {
            margin-bottom: 0.5rem;
          }

          h3 {
            color: #1d1d1d;
            margin-bottom: 1rem;
            font-size: 1.25rem;
            font-weight: 600;
          }
        `}</style>
      </div>
    </div>
  );
}
