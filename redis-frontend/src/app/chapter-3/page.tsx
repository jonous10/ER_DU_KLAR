"use client"

import Header from "@/components/ui/header";
import language_sup from "@/language-sup/language_sup.json"
import { useLanguage } from "@/contexts/language-context";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const { lang, setLang } = useLanguage();

  return (
    <div>
      <Header/>
      <div className="flex flex-col justify-center items-center m-10 mt-40">
        
        <Card className="max-w-240 p-8">
            <p className="text-3xl">{language_sup.last_test[lang as keyof typeof language_sup.last_test]}</p>
        </Card>

        <div className="w-full flex flex-row gap-4 m-10">
            <Card className="m-auto w-180">
                {language_sup.sus_email[lang as keyof typeof language_sup.sus_email].map((section, index) => (
                    <div key={index}>
                        <div dangerouslySetInnerHTML={{ __html: section }} />
                        {index < language_sup.sus_email[lang as keyof typeof language_sup.sus_email].length - 1 && <Separator />}
                    </div>
                ))}
            </Card>

            <Card className="m-auto w-180">

            </Card>
        </div>
      </div>
    </div>
  );
}
