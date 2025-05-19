"use client"

import Header from "@/components/ui/header";
import language_sup from "@/language-sup/language_sup.json"
import { useLanguage } from "@/contexts/language-context";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Separator } from "@radix-ui/react-separator";

export default function Home() {
  const { lang, setLang } = useLanguage();
  const [failed, setFailed] = useState<boolean>(false);

  return (
    <div>
      <Header/>
      <div className="flex flex-col justify-center items-center m-10 mt-40">
        
        <Card className="max-w-180 p-8">
          <p className="text-3xl">{language_sup[lang as keyof typeof language_sup]}</p>
        </Card>
      </div>
    </div>
  );
}
