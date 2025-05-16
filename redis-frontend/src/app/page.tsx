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
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h1 className="text-3xl sm:text-7xl">
          {language_sup.ARE_YOU_READY[lang as keyof typeof language_sup.start_course]}
        </h1>
      </div>
      
      <div className="flex justify-center m-40">
        <Button
          className=""
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
