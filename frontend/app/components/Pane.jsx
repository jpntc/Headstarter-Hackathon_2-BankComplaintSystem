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
  const [category, setCategory] = useState("Problem Category");
  const [subCategory, setSubCategory] = useState("Problem Type");
  const [userId, setUserId] = useState(-999);
  const [open, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState("");


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const uid = user.uid;
      setUserId(uid);
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
    console.log(data)
    const endpoint = "http://localhost:5000/api/complaints";
    try{
      const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (response.status === 200){
      const responseObj = await response.json();
      console.log(response.message)
      setSubmitted("Submitted")
      alert("Your complaint has been submitted.")
      return
    }else{
      console.log("Error" + response.error)
    }
    }catch(error){
      console.log("Error making the request to db: " + error)
    }
    return
  };

  return (
    <div className="p-2 mx-2 flex flex-col h-full w-full rounded-lg">
      <p className="text-xl md:text-2xl font-bold text-center mb-8">
        File a Complaint
      </p>
      <div className="w-full border-4 rounded-md border-amber-300 flex h-96 p-2 ">
        <div className="flex flex-col w-1/4 h-full justify-between p-8">
          <div className="flex flex-col">
            <Menu
              method={setCategory}
              options={categories}
              currentPane={category}
              className="bg-amber-100 p-2 "
            />
            {category && (
              <Menu
                className="bg-amber-100 p-2"
                method={setSubCategory}
                options={getSubCategories(category)}
                currentPane={subCategory}
              />
            )}
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
            className="overflow-y-auto w-full h-full mx-2 rounded-sm border-solid border-2 p-2"
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
