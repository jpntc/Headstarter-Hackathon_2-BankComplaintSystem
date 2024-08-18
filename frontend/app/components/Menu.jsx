"use client";
import React, { useState } from "react";

const Menu = ({ method, options, currentPane }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative bg-amber-100 p-2 rounded-lg h-fit w-fit text-nowrap border-solid border-2"
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
