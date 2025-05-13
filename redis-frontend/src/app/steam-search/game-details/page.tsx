"use client";

import { getGameDetails } from "@/api/games";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
 
export default function Game() {
  const searchParams = useSearchParams()
 
  const selectedGame = searchParams.get('appid')

  const [data, setData] = useState<any>()

  useEffect(() => {
    if (!selectedGame || data) return
    getGameDetails(selectedGame).then((res) => {
      setData(res)
    })
  })

  return (
    <div>{data ? (
      <div>
        <h1 className="m-16 text-7xl font-bold">
          {data.name}
        </h1>
        <div className="m-10 font-bold text-2xl">
          <p>PRICE : {data.price}</p>
          <p>Required age : {data.required_age}</p>
        </div>
        <div className="m-12 font-normal text-sm flex flex-col"
          >{data.categories ? data.categories.map((cat: {description: string}) => {
            return <p>{cat.description}</p>
            }) : "no categories"}
        </div>
      </div>
    ) : "no data found"}
    </div>
  )
}