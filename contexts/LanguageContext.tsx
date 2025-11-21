"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { translations } from "../utils/translations";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface ProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<ProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("es");

  /** Load saved language from localStorage */
  useEffect(() => {
    const savedLang = localStorage.getItem("dolaractual-language") as Language;
    if (savedLang === "es" || savedLang === "en") {
      setLanguage(savedLang);
    }
  }, []);

  /** Save selected language */
  useEffect(() => {
    localStorage.setItem("dolaractual-language", language);
  }, [language]);

  /** Translation function */
  const t = (key: string): string => {
    const parts = key.split(".");
    let value: any = translations[language];

    for (const p of parts) {
      if (value && typeof value === "object") {
        value = value[p];
      } else {
        return key;
      }
    }

    return value || key;
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "❌ useLanguage must be used inside <LanguageProvider>"
    );
  }
  return context;
};
