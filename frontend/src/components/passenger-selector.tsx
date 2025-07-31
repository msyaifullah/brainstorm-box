import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import { Plus, Minus } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PassengerSelectorProps {
  value: { adults: number; children: number; infants: number };
  onChange: (value: { adults: number; children: number; infants: number }) => void;
}

// const getSummary = (adults: number, children: number, infants: number) => {
//   let summary = `${adults} Adult${adults > 1 ? "s" : ""}`;
//   if (children > 0) summary += `, ${children} Child${children > 1 ? "ren" : ""}`;
//   if (infants > 0) summary += `, ${infants} Infant${infants > 1 ? "s" : ""}`;
//   return summary;
// };

const getTotalPassengers = (adults: number, children: number, infants: number) => adults + children + infants;

export const PassengerSelector: React.FC<PassengerSelectorProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState(value);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const maxAdults = 5;
  const maxChildrenInfants = 4;
  const childrenInfantsCount = local.children + local.infants;

  const handleChange = (type: "adults" | "children" | "infants", delta: number) => {
    setError("");
    setLocal((prev) => {
      const next = { ...prev };
      if (type === "adults") {
        next.adults = Math.max(1, Math.min(maxAdults, prev.adults + delta));
        if (next.adults > maxAdults) {
          setError(t('messages.maxAdultsError'));
        }
      } else {
        // children or infants
        const newValue = prev[type] + delta;
        const newTotal = (type === "children" ? newValue : prev.children) + (type === "infants" ? newValue : prev.infants);
        if (newValue < 0) return prev;
        if (newTotal > maxChildrenInfants) {
          setError(t('messages.maxChildrenInfantsError'));
          return prev;
        }
        next[type] = newValue;
      }
      return next;
    });
  };

  const handleApply = () => {
    onChange(local);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" className="px-4 py-2 rounded-md min-w-[120px] h-12 flex items-center text-left text-black hover:bg-gray-100 transition-colors mt-4">
          {getTotalPassengers(value.adults, value.children, value.infants)} Passenger{getTotalPassengers(value.adults, value.children, value.infants) > 1 ? 's' : ''}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-60 bg-gray-50 shadow-md border-none">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900">{t('passengers.adults')}</div>
              <div className="text-xs text-gray-600">{t('passengers.adultsDesc')}</div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                className={(local.adults <= 1
                  ? "bg-blue-50 cursor-not-allowed"
                  : "bg-[#1e3a8a] hover:bg-[#2563eb]") + " h-6 w-6 p-0 flex items-center justify-center"}
                variant="outline"
                onClick={() => handleChange("adults", -1)}
                disabled={local.adults <= 1}
                aria-label="Remove adult"
              >
                <Minus className={(local.adults <= 1 ? "text-[#1e293b]" : "text-white") + " h-3 w-3"} />
              </Button>
              <span className="w-6 text-center text-gray-900">{local.adults}</span>
              <Button
                type="button"
                size="sm"
                className={(local.adults >= maxAdults
                  ? "bg-blue-50 cursor-not-allowed"
                  : "bg-[#1e3a8a] hover:bg-[#2563eb]") + " h-6 w-6 p-0 flex items-center justify-center"}
                variant="outline"
                onClick={() => handleChange("adults", 1)}
                aria-label="Add adult"
                disabled={local.adults >= maxAdults}
              >
                <Plus className={(local.adults >= maxAdults ? "text-[#1e293b]" : "text-white") + " h-3 w-3"} />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900">{t('passengers.children')}</div>
              <div className="text-xs text-gray-600">{t('passengers.childrenDesc')}</div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                className={(local.children <= 0
                  ? "bg-blue-50 cursor-not-allowed"
                  : "bg-[#1e3a8a] hover:bg-[#2563eb]") + " h-6 w-6 p-0 flex items-center justify-center"}
                variant="outline"
                onClick={() => handleChange("children", -1)}
                disabled={local.children <= 0}
                aria-label="Remove child"
              >
                <Minus className={(local.children <= 0 ? "text-[#1e293b]" : "text-white") + " h-3 w-3"} />
              </Button>
              <span className="w-6 text-center text-gray-900">{local.children}</span>
              <Button
                type="button"
                size="sm"
                className={(childrenInfantsCount >= maxChildrenInfants
                  ? "bg-blue-50 cursor-not-allowed"
                  : "bg-[#1e3a8a] hover:bg-[#2563eb]") + " h-6 w-6 p-0 flex items-center justify-center"}
                variant="outline"
                onClick={() => handleChange("children", 1)}
                aria-label="Add child"
                disabled={childrenInfantsCount >= maxChildrenInfants}
              >
                <Plus className={(childrenInfantsCount >= maxChildrenInfants ? "text-[#1e293b]" : "text-white") + " h-3 w-3"} />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900">{t('passengers.infants')}</div>
              <div className="text-xs text-gray-600">{t('passengers.infantsDesc')}</div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                className={(local.infants <= 0
                  ? "bg-blue-50 cursor-not-allowed"
                  : "bg-[#1e3a8a] hover:bg-[#2563eb]") + " h-6 w-6 p-0 flex items-center justify-center"}
                variant="outline"
                onClick={() => handleChange("infants", -1)}
                disabled={local.infants <= 0}
                aria-label="Remove infant"
              >
                <Minus className={(local.infants <= 0 ? "text-[#1e293b]" : "text-white") + " h-3 w-3"} />
              </Button>
              <span className="w-6 text-center text-gray-900">{local.infants}</span>
              <Button
                type="button"
                size="sm"
                className={(childrenInfantsCount >= maxChildrenInfants
                  ? "bg-blue-50 cursor-not-allowed"
                  : "bg-[#1e3a8a] hover:bg-[#2563eb]") + " h-6 w-6 p-0 flex items-center justify-center"}
                variant="outline"
                onClick={() => handleChange("infants", 1)}
                aria-label="Add infant"
                disabled={childrenInfantsCount >= maxChildrenInfants}
              >
                <Plus className={(childrenInfantsCount >= maxChildrenInfants ? "text-[#1e293b]" : "text-white") + " h-3 w-3"} />
              </Button>
            </div>
          </div>
          <button
            className="mt-2 w-full bg-[#1e3a8a] text-white rounded-md py-2 font-semibold hover:bg-[#2563eb] transition"
            onClick={handleApply}
            type="button"
          >
            {t('passengers.apply')}
          </button>
        </div>
        {error && (
          <div className="text-red-500 text-xs mt-2 text-center">{error}</div>
        )}
      </PopoverContent>
    </Popover>
  );
}; 