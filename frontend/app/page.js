"use client"
import React, {useState} from"react"
import Navbar from "./components/Navbar"
import Menu from "./components/Menu";
import Input from "./components/Input"
import ComplaintsPane from "./components/ComplaintsPane";
const panes = ["Enter Complaint", "Processed Complaints"]
const inputOptions = ["text", "audio"]

export default function Home() {
 const [pane, setPane] = useState(panes[0])
 const [inputPane, setCurrentInputPane] = useState(inputOptions[0])
  return (
    <main className="flex min-h-screen flex-col md:px-24">
      <Navbar className="fixed top-0 left-0 border" />
        <div className="flex px-4 mt-10">
          <Menu method={setPane} options={panes} currentPane={pane} />
          {pane == panes[0] ? (
            <Input />
          ) : (
            <ComplaintsPane />
          )}
        </div>
    </main>
  );
}
