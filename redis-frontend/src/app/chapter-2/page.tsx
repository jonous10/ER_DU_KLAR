"use client"

import Header from "@/components/ui/header";
import language_sup from "@/language-sup/language_sup.json"
import { useLanguage } from "@/contexts/language-context";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function Home() {
  const { lang, setLang } = useLanguage();
  const [failed, setFailed] = useState<boolean>(false);

  return (
    <div>
      <Header/>
      <div className="flex flex-col justify-center items-center m-10 mt-40">
        
        <Card className="max-w-180 p-8">
          <p className="text-3xl">{language_sup.test_failed_again[lang as keyof typeof language_sup.test_failed_again]}</p>
        </Card>
        <Card className="max-w-180 p-8">
          <div
            className="text-3xl"
            dangerouslySetInnerHTML={{
              __html: language_sup.trust_worthy_example[lang as keyof typeof language_sup.trust_worthy_example],
            }}
          />
        </Card>
      </div>
    </div>
  );
}
