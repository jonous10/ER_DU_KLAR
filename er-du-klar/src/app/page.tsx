"use client"

import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import dataTEST from "@/data-test/data.json"
import { useEffect, useState } from "react";

export default function Home() {
  const [language, setLanguage] = useState<string>("en")
  return (
    <div>
      <Header lan={language}/>
    </div>
  );
}
