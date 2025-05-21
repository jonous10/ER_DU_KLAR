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
            <Card className="max-w-240 p-8 m-auto mt-10">
                <h3 className="text-5xl">{language_sup.failed[lang as keyof typeof language_sup.failed]}</h3>
                <p className="text-4xl m-10">{language_sup.fail_explained[lang as keyof typeof language_sup.fail_explained]}</p>
                <Button
                className="max-w-50 text-2xl m-auto"
                onClick={() => window.location.href = "/chapter-3"}
                >{language_sup.retry[lang as keyof typeof language_sup.retry]}</Button>
        </Card>
    </div>
  );
}
