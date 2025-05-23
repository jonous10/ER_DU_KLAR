"use client"

import Header from "@/components/ui/header";
import language_sup from "@/language-sup/language_sup.json"
import { useLanguage } from "@/contexts/language-context";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const { lang, setLang } = useLanguage();
  const [next, setNext] = useState<boolean>(false);

  return (
    <div>
      <Header/>
      <div className="flex flex-col justify-center items-center m-10 sm:mt-40">
        { next ? 
        <div>
          <Card className="max-w-240 p-8 text-1xl sm:text-3xl">
            <div
              dangerouslySetInnerHTML={{
                __html: language_sup.trust_worthy_example[lang as keyof typeof language_sup.trust_worthy_example],
              }}
            />
            <Separator/>
            <p>{language_sup.are_you_ready[lang as keyof typeof language_sup.are_you_ready]}</p>
            <Button 
            className="m-auto"
            onClick={() => window.location.href = "/chapter-3/"}
            >
              {language_sup.i_am_ready[lang as keyof typeof language_sup.i_am_ready]}
            </Button>
          </Card>
          
        </div>
        :
        <><Card className="max-w-240 p-8">
          <div
              className="sm:text-4xl text-1xl"
              dangerouslySetInnerHTML={{
                __html: language_sup.test_failed_again[lang as keyof typeof language_sup.test_failed_again],
              }}
            />
          <a
            type="button"
            title={language_sup.dont_worry[lang as keyof typeof language_sup.dont_worry]}
            className="mt-4 text-blue-600 underline hover:cursor-pointer cursor-pointer px-4 py-2 rounded m-auto"
            onClick={() => {
              alert(language_sup.dont_worry[lang as keyof typeof language_sup.dont_worry])
              setNext(true)
            }}
          >
            {language_sup.next[lang as keyof typeof language_sup.next]}
          </a>
        </Card>
        </>
        }
      </div>
    </div>
  );
}
