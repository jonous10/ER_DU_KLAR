"use client"

import Header from "@/components/ui/header";
import language_sup from "@/language-sup/language_sup.json"
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const { lang, setLang } = useLanguage();

  return (
    <div>
      <Header/>
      <div className="flex justify-center items-center m-10">
        <Card className="max-w-180 p-8">
          <p className="text-3xl">{language_sup.psswrd_tempter[lang as keyof typeof language_sup.psswrd_tempter]}</p>
        </Card>
      </div>
    </div>
  );
}
