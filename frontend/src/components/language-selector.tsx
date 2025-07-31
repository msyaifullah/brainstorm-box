import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  value: "ID" | "EN" | "CN";
  onChange: (value: "ID" | "EN" | "CN") => void;
}

const getLanguageDisplay = (language: "ID" | "EN" | "CN") => {
  switch (language) {
    case "ID":
      return "Indonesia";
    case "EN":
      return "English";
    case "CN":
      return "中文";
    default:
      return "Indonesia";
  }
};

const getLanguageFlag = (language: "ID" | "EN" | "CN") => {
  switch (language) {
    case "ID":
      return "🇮🇩";
    case "EN":
      return "🇺🇸";
    case "CN":
      return "🇨🇳";
    default:
      return "🇮🇩";
  }
};

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const handleLanguageSelect = (language: "ID" | "EN" | "CN") => {
    onChange(language);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button 
          type="button" 
          className="px-4 py-2 rounded-md min-w-[120px] h-12 flex items-center justify-between text-left text-black hover:bg-gray-100 transition-colors mt-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{getLanguageFlag(value)}</span>
            <span className="font-medium">{getLanguageDisplay(value)}</span>
          </div>
          
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-48 bg-white shadow-md border border-gray-200">
        <div className="flex flex-col gap-1">
          <button
            type="button"
            className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors ${
              value === "ID" ? "bg-blue-50 text-blue-700" : "text-gray-700"
            }`}
            onClick={() => handleLanguageSelect("ID")}
          >
            <span className="text-lg">🇮🇩</span>
            <span className="font-medium">Indonesia</span>
          </button>
          <button
            type="button"
            className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors ${
              value === "EN" ? "bg-blue-50 text-blue-700" : "text-gray-700"
            }`}
            onClick={() => handleLanguageSelect("EN")}
          >
            <span className="text-lg">🇺🇸</span>
            <span className="font-medium">English</span>
          </button>
          <button
            type="button"
            className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors ${
              value === "CN" ? "bg-blue-50 text-blue-700" : "text-gray-700"
            }`}
            onClick={() => handleLanguageSelect("CN")}
          >
            <span className="text-lg">🇨🇳</span>
            <span className="font-medium">中文</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}; 