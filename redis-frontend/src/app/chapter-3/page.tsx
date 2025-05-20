"use client"

import Header from "@/components/ui/header";
import language_sup from "@/language-sup/language_sup.json"
import { useLanguage } from "@/contexts/language-context";
import { Card } from "@/components/ui/card";

export default function Home() {
  const { lang, setLang } = useLanguage();

  return (
    <div>
      <Header/>
      <div className="flex flex-col justify-center items-center m-10 mt-40">
        
        <Card className="max-w-240 p-8">
            <p className="text-3xl">{language_sup.last_test[lang as keyof typeof language_sup.last_test]}</p>
        </Card>
      </div>
    </div>
  );
}
