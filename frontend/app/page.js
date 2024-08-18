"use client";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Input from "./components/Input";
import ComplaintsPane from "./components/ComplaintsPane";
const panes = ["Enter Complaint", "Processed Complaints"];
const inputOptions = ["text", "audio"];

export default function Home() {
  const [pane, setPane] = useState(panes[0]);
  const [complaint, setComplaint] = useState("")
  return (
    <main className="flex min-h-screen flex-col  bg-amber-50 text-black">
      <Navbar stateFunction={setComplaint} />
      <div className="flex px-4 md:px-24">
        <Menu method={setPane} options={panes} currentPane={pane} />
        {pane == panes[0] ? <Input complaint={complaint}/> : <ComplaintsPane />}
      </div>
    </main>
  );
}
