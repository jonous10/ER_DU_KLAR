"use client"

import Header from "@/components/ui/header";
import language_sup from "@/language-sup/language_sup.json"
import { useLanguage } from "@/contexts/language-context";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { lang, setLang } = useLanguage();

  return (
    <div>
        <Header/>
            <Card className="max-w-240 p-8 m-auto mt-10 text-1xl sm:text-3xl">
                <h3 className="text-2xl sm:text-5xl">{language_sup.correct[lang as keyof typeof language_sup.correct]}</h3>
                <p className="text-1xl sm:text-4xl m-10">{language_sup.diploma[lang as keyof typeof language_sup.diploma]}</p>
                <Button
                className="max-w-50 text-2xl m-auto"
                onClick={() => window.location.href = "/"} 
                >{language_sup.go_home[lang as keyof typeof language_sup.go_home]}</Button>
        </Card>
    </div>
  );
}
