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
      <div className="flex flex-col justify-center items-center m-10 sm:mt-40 text-1xl sm:text-3xl">
        
        <Card className="max-w-240 p-8">
            <p>{language_sup.last_test[lang as keyof typeof language_sup.last_test]}</p>
        </Card>

        <div className="w-full flex flex-col sm:flex-row gap-4 m-10">
            <Card className="m-auto max-w-200 p-10">
              <Button 
              className="max-w-80 m-auto"
              onClick={() => window.location.href = "/fail/"}
              >{language_sup.sus[lang as keyof typeof language_sup.sus]}</Button>
              <p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: language_sup.not_sus_email.from[lang as keyof typeof language_sup.not_sus_email.from],
                  }}
                />
              </p>
              <p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: language_sup.not_sus_email.subject[lang as keyof typeof language_sup.not_sus_email.subject],
                  }}
                />
              </p>
              <p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: language_sup.not_sus_email.body[lang as keyof typeof language_sup.not_sus_email.body],
                  }}
                />
              </p>
            </Card>
            <Card className="m-auto max-w-200 p-10">
              <Button 
              className="max-w-80 m-auto"
              onClick={() => window.location.href = "/success/"}
              >{language_sup.sus[lang as keyof typeof language_sup.sus]}</Button>
                  <p>
                  <div
                    dangerouslySetInnerHTML={{
                    __html: language_sup.sus_email.from[lang as keyof typeof language_sup.sus_email.from],
                    }}
                  />
                  </p>
                  <p>
                  <div
                    dangerouslySetInnerHTML={{
                    __html: language_sup.sus_email.subject[lang as keyof typeof language_sup.sus_email.subject],
                    }}
                  />
                  </p>
                  <p>
                  <div
                    dangerouslySetInnerHTML={{
                    __html: language_sup.sus_email.body[lang as keyof typeof language_sup.sus_email.body],
                    }}
                  />
                  </p>
            </Card>
        </div>
      </div>
    </div>
  );
}
