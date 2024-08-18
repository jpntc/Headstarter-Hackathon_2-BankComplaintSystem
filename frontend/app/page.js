"use client";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Pane from "./components/Pane";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  bg-amber-50 text-black">
      <Navbar />
      <div className="flex px-4 md:px-24">
        <Pane />
      </div>
    </main>
  );
}
