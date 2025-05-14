"use client"

import { create_user, login, logout } from "@/api/users";
import Header from "@/components/ui/header";
import LoginCard from "@/components/ui/login-card";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState("en");

  return (
    <div>
      <Header lan="en"/>
      <LoginCard/>
    </div>
  );
}
