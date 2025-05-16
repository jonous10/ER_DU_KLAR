import * as React from "react"
import { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area"
import language_sup from "@/language-sup/language_sup.json"
import { Button } from "./button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useLanguage } from "@/contexts/language-context";


export function LanguageSelector() {
  const { lang, setLang } = useLanguage();

  const handleLanguageChange = (input: string) => {
    setLang(input);
    localStorage.setItem("lang", input);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <h1>{lang}</h1>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <ScrollArea className="h-72 w-22 rounded-md border">
          <div className="p-4">
            {language_sup.supports.map((supportedLang: string) => (
              <div key={supportedLang} className="flex items-center justify-center">
                <p
                  className="m-1 w-12 h-8 cursor-pointer hover:bg-gray-100 rounded-2xl text-2xl flex items-center justify-center text-center"
                  onClick={() => handleLanguageChange(supportedLang)}
                >
                  {supportedLang}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
