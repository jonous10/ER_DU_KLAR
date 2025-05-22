"use client"

import Header from "@/components/ui/header";
import language_sup from "@/language-sup/language_sup.json"
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { lang, setLang } = useLanguage();

  return (
    <div>
      <Header/>
      <div className="m-auto w-min mt-40">
        <h1
          className="text-5xl sm:text-9xl m-auto text-center min-w-screen"
          style={{ fontFamily: '"Jersey 10", sans-serif' }}
        >
          {language_sup.ARE_YOU_READY[lang as keyof typeof language_sup.start_course]}
        </h1>
      </div>
      
      <div className="flex justify-center m-40 ">
        <Button
          className="text-2xl p-8"
          onClick={() => window.location.href = "/chapter-1/"}
        >
          {language_sup.start_course[
        lang as keyof typeof language_sup.start_course
          ] 
          || "Language unsupported"}
        </Button>
      </div>

    </div>
  );
}
