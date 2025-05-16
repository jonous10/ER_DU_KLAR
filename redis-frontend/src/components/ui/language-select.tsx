import * as React from "react"
import { useState, useEffect } from "react";

import { ScrollArea } from "@/components/ui/scroll-area"
import language_sup from "@/language-sup/language_sup.json"
import { Button } from "./button"


interface LanguageSelectorProps {
    updateLanguage: ( lang: string ) => void;
}
export function LanguageSelector({updateLanguage}: LanguageSelectorProps) {
    const [lang, setLang] = useState("en")

      useEffect(() => {
        const saved = localStorage.getItem("lang");
        setLang(saved ?? "en");
    }, [])
  return (
    <ScrollArea className="h-72 w-22 rounded-md border">
      <div className="p-4">
        {language_sup.supports.map((lang) => {
            return (
                <div key={lang} className="flex items-center justify-center">
                    <p
                    className="m-1 w-12 h-8 cursor-pointer hover:bg-gray-100 rounded-2xl text-2xl flex items-center justify-center text-center"
                    onClick={() => updateLanguage(lang)}
                    >{lang}</p>
                </div>
            )
        })}
      </div>
    </ScrollArea>
  )
}
