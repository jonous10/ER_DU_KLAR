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
        <h1 className="text-3xl sm:text-8xl m-auto text-center min-w-screen">
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
