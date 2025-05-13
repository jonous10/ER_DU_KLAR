"use client";

import { create_user, fetchCarData, login, logout } from "@/api/users";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [kjennemerke, setKjennemerke] = useState("");
  const [message, setMessage] = useState("");

  const [carData, setCarData] = useState<{ dataCar: { make: string , model: string } } | null>(null);

  return (
    <div>
      <div className="m-40 flex flex-col items-center">
      <p>{message || "Welcome"}</p>
        <input className="w-80 m-4 p-2 bg-gray-800"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input className="w-80 m-4 p-2 bg-gray-800"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="Login-Logout">
          <button className="w-30 p-1 m-4 border-1 rounded-2xl"
            onClick={() => {
              login(username, password).then((res) => {
                console.log(res)
                setMessage(res.message);
              });
            }}
          >Log in</button>

          <button
            className="w-30 p-1 m-4 border-1 rounded-2xl"
            onClick={async () => {
              logout().then((res) => {
                console.log(res)
                setMessage(res.message);
              })
            }}
          >Log Out</button>
        </div>
        <div className="m-15 flex flex-col items-center">
          <h1>Are you new?</h1>
          <button className="w-40 p-3 m-4 border-1"
            onClick={() => {
              create_user(username, password).then((res) => {
                console.log(res);
                setMessage(res.message);
              });
            }}
          >Create User</button>
        </div>
        
      </div>
      
      <div className="CarSearcher flex flex-col items-center">
        <input className="m-10 p-2 bg-gray-800"
        type="text"
        placeholder="Kjennemerke"
        value={kjennemerke}
        onChange={(e) => setKjennemerke(e.target.value)}
        />
        <button className="w-50 p-1 m-4 border-1 rounded-2xl"
        onClick={() => {
          fetchCarData(kjennemerke).then((res) => {
            console.log(res);
            setCarData(res)
          })
        }}>FETCH CAR DATA
        </button>

        <div className="m-10">
          {carData ? (
            <>
              <div className="">
                <p>MAKE :</p>
                <p>{carData.dataCar.make}</p>
              </div>
              <div className="">
                <p>MODEL :</p>
                <p>{carData.dataCar.model}</p>
              </div>
            </>
          ) : (
            "Search to get a result"
          )}
        </div>
      </div>
    </div>
  );
}
