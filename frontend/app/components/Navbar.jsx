"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const problems = [
  "Banking",
  "Chargeback Resolution",
  "Analytics",
  "Spend Management",
  "Audits & Reimbursements",
  "Accounting",
  "Account Payable",
  "Integrations",
];

const solutions = ["E-commerce", "Small Business", "Enterprise Business"];

const Navbar = ({stateFunction}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
  const [option, setOption] = useState("");

  const handleMouseEnter = (category) => {
    setShowDiv(true);
    setOption(category);
  };

  const handleMouseLeave = () => {
    setShowDiv(false);
    setOption("");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

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
      className={`sticky p-2 flex justify-between w-full mb-20 border-b${
        showDiv ? " bg-white" : ""
      }`}
    >
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
      <div className="flex justify-between font-bold items-center">
        <p
          className="p-2 relative"
          onMouseEnter={() => handleMouseEnter("problems")}
        >
          Products
        </p>
        <p
          className="p-2 relative"
          onMouseEnter={() => handleMouseEnter("solutions")}
        >
          Solutions
        </p>
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
      {showDiv && (
        <div
          className="absolute top-36 w-full bg-white shadow-lg p-4  justify-center grid grid-cols-3 border"
          onMouseLeave={handleMouseLeave}
          style={{ top: "100%", left: 0 }}
        >
          {option === "problems"
            ? problems.map((problem, index) => (
                <div
                  key={index}
                  className="p-2"
                  onClick={() => stateFunction(problem)}
                >
                  {problem}
                </div>
              ))
            : solutions.map((solution, index) => (
                <div
                  key={index}
                  className="p-2"
                  onClick={() => stateFunction(solution)}
                >
                  {solution}
                </div>
              ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
