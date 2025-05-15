"use client"

import Header from "@/components/ui/header";
import language_sup from "@/language-sup/language_sup.json"

// pages/index.tsx
import { useState, useEffect } from 'react';

export default function Home() {
  const [lang, setLang] = useState<string>("en");

  // Fetch selected language from memory storage
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved) setLang(saved);
  }, []);

  // This langUpdate() will only be used in the language selector later
  const langUpdate = (input: string) => {
    localStorage.setItem("lang", input);
    setLang(input);
  };

  return (
    <div>
      <Header/>
      <button onClick={() => window.location.href = "/chapter-1/page.tsx"}>{language_sup.start_course[lang as keyof typeof language_sup.start_course] || "Language unsupported"}</button>
      <input onChange={(e) => langUpdate(e.target.value)}></input>
    </div>
  );
}
