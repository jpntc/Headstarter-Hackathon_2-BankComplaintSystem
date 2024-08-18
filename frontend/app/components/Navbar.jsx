"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    //onAuthStateChanged needs auth, and a callback function
    //the callback function takes a user object as an argument
    //if a user is signed in, user will contain details about the authenticated user
    //if a user is not signed in, user will contain null
    //triggered whenever user auth state changes (sign in, sign out, session restore)
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
  });
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
    <nav className="p-2 flex justify-between w-full mb-20">
      <div className="flex justify-between items-center ">
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
          <Link
            className="mr-2 hover:bg-amber-200 duration-300 rounded-lg p-2"
            href="/login"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="hover:bg-amber-200 duration-300 rounded-lg p-2"
          >
            Logout
          </button>
        )}
        {!user && (
          <Link
            href="/signup"
            className="hover:bg-amber-200 duration-300 rounded-lg p-2"
          >
            SignUp
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
