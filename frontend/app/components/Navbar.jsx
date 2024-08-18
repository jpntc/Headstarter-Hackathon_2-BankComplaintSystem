"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";



const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const user = auth.currentUser;

  async function handleLogout() {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      alert("Error signing out");
    }
  }

  return (
    <nav
      className="sticky p-2 flex justify-between w-full mb-20 border-b">
      <div className="flex justify-between items-center">
        <Image
          src="/images/logo.jpg"
          alt="logo"
          height={100}
          width={80}
          className="rounded-full mr-2"
        />
        <p className="text-lg md:text-xl font-extrabold">Complaint System</p>
      </div>

      <div className="flex justify-evenly items-center text-md md:text-lg font-bold">
        {!user ? (
          <Link className="mr-2" href="/login">
            Login
          </Link>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
        {!user && <Link href="/signup">SignUp</Link>}
      </div>

    </nav>
  );
};

export default Navbar;
