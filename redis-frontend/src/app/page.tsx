"use client"

import Header from "@/components/ui/header";
import { LanguageSelector } from "@/components/ui/language-select";
import language_sup from "@/language-sup/language_sup.json"
import { useEffect, useState } from "react";

export default function Home() {
  const [lang, setLang] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    setLang(saved ?? "en");
  }, [])

  // This langUpdate() will only be used in the language selector later
  const langUpdate = (input: string) => {
    localStorage.setItem("lang", input);
    setLang(input);
  };

  return (
    <div>
      <Header/>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h1 className="text-9xl">
          {language_sup.ARE_YOU_READY[lang as keyof typeof language_sup.start_course]}
        </h1>
      </div>

      <LanguageSelector updateLanguage={langUpdate}/>
      
      <button onClick={() => window.location.href = "/chapter-1/page.tsx"}>
        {language_sup.start_course[
          lang as keyof typeof language_sup.start_course
        ] 
        || "Language unsupported"}
      </button>

    </div>
  );
}
