import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../lib/language-context";

interface LanguageSelectorProps {
  value?: "ID" | "EN" | "CN";
  onChange?: (value: "ID" | "EN" | "CN") => void;
}

const getLanguageDisplay = (language: "ID" | "EN" | "CN", t: (key: string) => string) => {
  switch (language) {
    case "ID":
      return t('languages.indonesia');
    case "EN":
      return t('languages.english');
    case "CN":
      return t('languages.chinese');
    default:
      return t('languages.indonesia');
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

// Map language codes
const languageMap = {
  "ID": "id",
  "EN": "en", 
  "CN": "cn"
} as const;

const reverseLanguageMap = {
  "id": "ID",
  "en": "EN",
  "cn": "CN"
} as const;

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  value: propValue, 
  onChange: propOnChange 
}) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { language, setLanguage, isLoading } = useLanguage();

  // Use context language if no prop provided
  const currentLanguage = propValue || reverseLanguageMap[language as keyof typeof reverseLanguageMap] || "ID";

  const handleLanguageSelect = (languageCode: "ID" | "EN" | "CN") => {
    const mappedLanguage = languageMap[languageCode];
    
    // Update context if no prop onChange provided
    if (!propOnChange) {
      setLanguage(mappedLanguage);
    } else {
      propOnChange(languageCode);
    }
    
    setOpen(false);
  };

  if (isLoading) {
    return (
      <button 
        type="button" 
        className="px-4 py-2 rounded-md min-w-[120px] h-12 flex items-center justify-center text-left text-black hover:bg-gray-100 transition-colors mt-4"
        disabled
      >
        Loading...
      </button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button 
          type="button" 
          className="px-4 py-2 rounded-md min-w-[120px] h-12 flex items-center justify-between text-left text-black hover:bg-gray-100 transition-colors mt-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{getLanguageFlag(currentLanguage)}</span>
            <span className="font-medium">{getLanguageDisplay(currentLanguage, t)}</span>
          </div>
          
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-48 bg-white shadow-md border border-gray-200">
        <div className="flex flex-col gap-1">
          <button
            type="button"
            className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors ${
              currentLanguage === "ID" ? "bg-blue-50 text-blue-700" : "text-gray-700"
            }`}
            onClick={() => handleLanguageSelect("ID")}
          >
            <span className="text-lg">🇮🇩</span>
            <span className="font-medium">{t('languages.indonesia')}</span>
          </button>
          <button
            type="button"
            className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors ${
              currentLanguage === "EN" ? "bg-blue-50 text-blue-700" : "text-gray-700"
            }`}
            onClick={() => handleLanguageSelect("EN")}
          >
            <span className="text-lg">🇺🇸</span>
            <span className="font-medium">{t('languages.english')}</span>
          </button>
          <button
            type="button"
            className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors ${
              currentLanguage === "CN" ? "bg-blue-50 text-blue-700" : "text-gray-700"
            }`}
            onClick={() => handleLanguageSelect("CN")}
          >
            <span className="text-lg">🇨🇳</span>
            <span className="font-medium">{t('languages.chinese')}</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}; 