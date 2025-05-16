// contexts/LanguageContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type LanguageContextType = {
  lang: string;
  setLang: (lang: string) => void;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang) setLangState(storedLang);
  }, []);

  const setLang = (newLang: string) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
