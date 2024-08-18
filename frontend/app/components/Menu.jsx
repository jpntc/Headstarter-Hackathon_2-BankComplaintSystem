"use client";
import React, { useState } from "react";

const Menu = ({ method, options, currentPane }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative bg-white p-2 rounded-lg h-fit w-2/12 text-nowrap border-solid border-2 min-w-44 hover:bg-amber-200 duration-300 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="rounded-md font-bold w-fit">{currentPane}</div>
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 bg-white shadow-lg border rounded z-50"
          style={{ minWidth: "100%" }}
        >
          {options.map((option, index) => (
            <div
              className="p-2 text-sm hover:bg-gray-200 cursor-pointer"
              key={index}
              onClick={() => {
                method(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
