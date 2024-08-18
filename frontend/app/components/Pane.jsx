"use client";
import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

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
  const [userId, setUserId] = useState('');

  const [submitted, setSubmitted] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
      }
    });
  }, []);

  const handleMouseEnter = () => {
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
  const submitComplaint = async () => {
    const currentDateTime = new Date();
    const dateNTime = currentDateTime.toLocaleString();

    if (input == "") {
      alert(
        "Select the complaint category and type, and enter a complaint then submit."
      );
      return;
    }
    if (subCategory == "Problem Type" || category == "Problem Category") {
      alert(
        "Make sure to select a category and subcategory for your complaint so we can better assist you."
      );
      return;
    }
    if (userId == -999) {
      console.log("Error with the user id returned by firebase");
      return;
    }
    console.log(userId);
    const data = {
      user_id: userId,
      main_type: category,
      sub_type: subCategory,
      description: input,
      created_at: dateNTime,
    };
    console.log(data);
    const endpoint = 'http://localhost:5000/api/complaints';

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (response.status === 200) {
        const responseObj = await response.json();
        setSubmitted("Submitted");
        alert("Your complaint has been submitted.");
        return;
      } else {
        console.log(response.error);
      }
    } catch (error) {
      console.log("Error making the request to db: " + error);
    }
    return;
  };

  return (
    <div className="p-2 mx-2 flex flex-col h-full w-full rounded-lg">
      <p className="text-xl md:text-2xl font-bold text-center mb-8">
        Complaint Form
      </p>
      <div className="w-full rounded-md border-solid border-neutral-200 border-4 flex h-96">
        <div className="flex flex-col w-1/4 h-full justify-between p-8">
          <div className="flex flex-col">
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
              {showDiv && category ? (
                <div
                  className="bg-white absolute top-full shadow-lg p-4 justify-center max-h-56 overflow-x-auto border w-fit"
                  onMouseLeave={handleMouseLeave}
                >
                  {getSubCategories(category).map((subCat, index) => (
                    <div
                      key={index}
                      className=" hover:bg-amber-100"
                      onClick={() => setSubCategory(subCat)}
                    >
                      {subCat}
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
            <button
              className="bg-amber-100 rounded-md font-bold h-16 p-2 w-full mt-2"
              onClick={console.log("User Complaint History")}
            >
              Complaint History
            </button>
          </div>

          <button
            className="bg-amber-100 rounded-md font-bold h-16 p-2 w-full mt-2"
            onClick={submitComplaint}
          >
            Submit
          </button>
        </div>
        <div className="flex flex-col w-full h-full">
          <textarea
            className="overflow-y-auto w-full h-full rounded-sm p-2"
            type="text"
            placeholder={"Enter a complaint to be processed here."}
            onChange={handleInput}
            value={input}
          ></textarea>
        </div>
      </div>
      <div>
        {/* {
          submitted &&
              <div className="absolute justify-center content-center p-2 bg-green-300">Your request has been submitted successfully</div>
        } */}
      </div>
    </div>
  );
};

export default Pane;
