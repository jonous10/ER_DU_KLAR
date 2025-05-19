"use client"

import Header from "@/components/ui/header";
import language_sup from "@/language-sup/language_sup.json"
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
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
        
        { !failed && 
        <>
        <Card className="max-w-180 p-8">
          <p className="text-3xl">{language_sup.psswrd_tempter[lang as keyof typeof language_sup.psswrd_tempter]}</p>
        </Card>
        <Input 
        className="max-w-80 m-10"
        type="password"
        placeholder={language_sup.password_input[lang as keyof typeof language_sup.password_input]}
        onChange={(e) => {
          if (e.target.value.length > 5) {
            setFailed(true);
          }
        }}
        ></Input>
        </>}
        { failed && 
        <Card className="max-w-180 p-8">
          <p className="text-3xl">{language_sup.test_failed[lang as keyof typeof language_sup.test_failed]}</p>
          <Separator/>
          <p className="text-3xl">{language_sup.click_malicious_link[lang as keyof typeof language_sup.click_malicious_link]}</p>
          <Separator/>
          <p
          onClick={() => window.location.href = "/chapter-2/"}
          >https://youtube.com@safeweb-world.id/link-inject/secure-world</p>
        </Card>}
      </div>
    </div>
  );
}
