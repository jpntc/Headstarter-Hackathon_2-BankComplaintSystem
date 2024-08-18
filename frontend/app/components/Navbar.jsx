"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [employees, setEmployees] = useState([]);
  const user = auth.currentUser;

  async function checkEmployee(uid) {
    const result = await fetch("http://localhost:5000/employees");
    const data = await result.json();
    const employees = data.map((employee) => employee.user_id);
    console.log(employees);
    if (employees.includes(uid)) {
      setIsEmployee(true);
    } else {
      setIsEmployee(false);
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      if (user) {
        const uid = user.uid;
        checkEmployee(uid);
      }
    });
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      alert("Error signing out");
    }
  }

  return (
    <nav className="p-5 sticky p-2 flex justify-between w-full mb-20">
      <div className="flex justify-between items-center">
        <Image
          src="https://framerusercontent.com/images/2P2MY4z5tS0r6jWMJhGeq0QQpOs.svg"
          alt="logo"
          height={100}
          width={100}
          className="rounded-full mr-2"
        />
      </div>

      <div className="flex justify-evenly items-center text-md md:text-lg font-bold">
        {/* If the user is an admin, show this */}
        {isEmployee && (
          //Populate usestate variable with employee ID's
          //If user uid exists in employee uid array, show complaints
          <Link
            href="/complaints"
            className="hover:bg-amber-200 duration-300 rounded-lg p-2"
          >
            Complaints
          </Link>
        )}
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