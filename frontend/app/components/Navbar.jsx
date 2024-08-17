"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
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
      </div>
    </nav>
  );
};

export default Navbar;
