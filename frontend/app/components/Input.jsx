"use client";
import React, { useState } from "react";

const Input = ({complaint}) => {
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="p-2 mx-2 flex flex-col bg-slate-300 w-full rounded-lg bg-white border-solid border-2">
      <div className="w-full">
        <div className="flex min-h-80 md:min-h-96 ">{complaint}</div>
        <div className="flex items-center">
          <textarea
            className="overflow-y-auto w-full mx-2 rounded-sm max-h-16 border-solid border-2 content-center p-2"
            type="text"
            placeholder={"Enter a complaint to be processed here."}
            onChange={(e) => handleInput(e)}
          ></textarea>
          <button
            className="bg-amber-100 rounded-md font-bold h-16 p-2 h-fit"
            onClick={() => {
              console.log(input);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default Input;
