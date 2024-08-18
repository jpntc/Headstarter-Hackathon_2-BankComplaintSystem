"use client";
import React, { useState } from "react";
import Menu from "./Menu";

const categories = ["Products", "Solutions", "Account", "Website"];

const productProblems = [
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

const websiteProblems = ["Website"];

const accountProblems = ["Email", "Password"];

const Pane = () => {
  const [input, setInput] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [category, setCategory] = useState("Problem Category");
  const [subCategory, setSubCategory] = useState("Problem Type");

  const handleMouseEnter = (category) => {
    setShowDiv(true);
  };

  const handleMouseLeave = () => {
    setShowDiv(false);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const getSubCategories = (category) => {
    switch (category) {
      case "Products":
        return productProblems;
      case "Solutions":
        return solutions;
      case "Account":
        return accountProblems;
      case "Website":
        return websiteProblems;
      default:
        return [];
    }
  };

  return (
    <div className="p-2 mx-2 flex flex-col h-full w-full rounded-lg">
      <p className="text-xl md:text-2xl font-bold text-center">
        File a Complaint
      </p>
      <div className="w-full border border-amber-900 flex h-96">
        <div className="flex flex-col w-1/4 h-full justify-between p-8">
          <Menu
            method={setCategory}
            options={categories}
            currentPane={category}
            className="bg-amber-100 p-2"
          />
          <div
            className="relative mt-2 bg-amber-100 p-2"
            onMouseEnter={() => handleMouseEnter(category)}
          >
            {subCategory}
            {showDiv && (
              <div
                className="absolute top-full shadow-lg p-4 justify-center h-56 overflow-x-auto border "
                onMouseLeave={handleMouseLeave}
              >
                {getSubCategories(category).map((subCat, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-amber-500"
                    onClick={() => setSubCategory(subCat)}
                  >
                    {subCat}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            className="bg-amber-100 rounded-md font-bold h-16 p-2 w-full mt-2"
            onClick={() => {
              console.log(input);
            }}
          >
            Submit
          </button>
        </div>
        <div className="flex flex-col w-full h-full">
          <textarea
            className="overflow-y-auto w-full h-full mx-2 rounded-sm border-solid border-2 p-2"
            type="text"
            placeholder={"Enter a complaint to be processed here."}
            onChange={handleInput}
            value={input}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Pane;
