"use client";

import {useEffect, useState} from "react";
import Link from "next/link";

export default function NavbarHomeComponent() {
  let [email, setEmail] = useState(null);

  useEffect(() => {
    if (email === null) {
      console.log(email);
      const userBySession = JSON.parse(localStorage.getItem("user"));
      console.log(userBySession)
      userBySession !== null && setEmail(userBySession.email);
      console.log(email);
    }
  }, []);

  return (
    <ul>
      <li><Link href={"users"}>Lista de usuario</Link></li>
      <li><Link href={`users/${email}`}>Perfil del usuario</Link></li>
      <li><Link href={"register"}>Registrarme</Link></li>
      <li><Link href={"login"}>Login</Link></li>
    </ul>
  );
}