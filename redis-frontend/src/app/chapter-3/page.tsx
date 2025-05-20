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

  return (
    <div>
      <Header/>
      <div className="flex flex-col justify-center items-center m-10 mt-40">
        
        <Card></Card>
      </div>
    </div>
  );
}
