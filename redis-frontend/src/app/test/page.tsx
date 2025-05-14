"use client";

import { GetLanguageSup, SaveToRedis, GetFromRedis } from "@/api/language";
import { useState } from "react";

export default function Home() {

  const [inData, setInData] = useState<string>("")
  const [outData, setOutData] = useState<string>("")


  return (
    <div>
      <input 
      className="bg-amber-500"
      onChange={(e) => setInData(e.target.value)}></input>

      <button
      className="bg-blue-400"
      onClick={() => SaveToRedis("language", inData)}
      >SAVE TO REDIS</button>

      <button 
      className="bg-blue-400"
      onClick={() => GetFromRedis("languages").then((res) => {
        console.log(res)
      })}
      >GET FROM REDIS</button>
    </div>
  );
}
