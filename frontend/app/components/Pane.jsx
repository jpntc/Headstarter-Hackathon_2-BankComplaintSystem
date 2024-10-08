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
  const [userId, setUserId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
      }
    });
  }, []);

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

    if (input === "") {
      alert(
        "Select the complaint category and type, and enter a complaint then submit."
      );
      return;
    }
    if (subCategory === "Problem Type" || category === "Problem Category") {
      alert(
        "Make sure to select a category and subcategory for your complaint so we can better assist you."
      );
      return;
    }
    if (userId === "") {
      console.log("Error with the user id returned by firebase");
      return;
    }
    const data = {
      user_id: userId,
      main_type: category,
      sub_type: subCategory,
      description: input,
      created_at: dateNTime,
    };

    const endpoint = "http://localhost:5000/api/complaints";
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
        console.log(responseObj.message);
        setSubmitted("Submitted");
        alert("Your complaint has been submitted.");
        return;
      } else {
        console.log("Error: " + response.error);
      }
    } catch (error) {
      console.log("Error making the request to db: " + error);
    }
    return;
  };

  const getHistory = async () => {
    try {
      const endpoint = `http://localhost:5000/api/complaints/history?user_id=${userId}`;
      console.log(endpoint);
      const response = await fetch(endpoint);
      const data = await response.json();
      if (response.status === 200) {
        console.log("history data", data);
        setHistory(data);
        setIsOpen(true);
      } else {
        console.log(response.error);
      }
    } catch (error) {
      console.log("Error getting user history: " + error);
    }
  //  const complaints = [
  //    {
  //      main_type: "Products",
  //      sub_type: "Banking",
  //      created_at: "2024-08-18 10:30 AM",
  //      description:
  //        "Issue with the banking feature not processing transactions correctly.",
  //    },
  //    {
  //      main_type: "Solutions",
  //      sub_type: "E-commerce",
  //      created_at: "2024-08-17 02:15 PM",
  //      description:
  //        "E-commerce integration is causing delays in product listing updates.",
  //    },
  //    {
  //      main_type: "Account",
  //      sub_type: "Email",
  //      created_at: "2024-08-16 09:45 AM",
  //      description:
  //        "Unable to update the email address associated with the account.",
  //    },
  //    {
  //      main_type: "Website",
  //      sub_type: "Website",
  //      created_at: "2024-08-15 11:00 AM",
  //      description:
  //        "The website is experiencing slow loading times on mobile devices.",
  //    },
  //    {
  //      main_type: "Products",
  //      sub_type: "Analytics",
  //      created_at: "2024-08-14 03:20 PM",
  //      description:
  //        "Analytics dashboard is not showing the correct data for the last quarter.",
  //    },
  //    {
  //      main_type: "Solutions",
  //      sub_type: "Enterprise Business",
  //      created_at: "2024-08-13 01:10 PM",
  //      description:
  //        "Enterprise-level solution is not scaling well with increased user load.",
  //    },
  //    {
  //      main_type: "Account",
  //      sub_type: "Password",
  //      created_at: "2024-08-12 04:55 PM",
  //      description: "Password reset emails are not being received by users.",
  //    },
  //    {
  //      main_type: "Products",
  //      sub_type: "Chargeback Resolution",
  //      created_at: "2024-08-11 07:35 AM",
  //      description:
  //        "Chargeback cases are taking too long to resolve in the system.",
  //    },
  //    {
  //      main_type: "Website",
  //      sub_type: "Website",
  //      created_at: "2024-08-10 08:20 PM",
  //      description: "Website navigation menu is broken on certain browsers.",
  //    },
  //    {
  //      main_type: "Products",
  //      sub_type: "Integrations",
  //      created_at: "2024-08-09 05:50 PM",
  //      description:
  //        "Third-party integrations are not syncing data as expected.",
  //    },
  //  ];

  };

  const closeModal = () => setIsOpen(false);

  return (
    <div className="p-2 mx-2 flex flex-col h-full w-full rounded-lg">
      <p className="text-xl md:text-5xl font-extrabold text-center mb-4">
        File a Complaint
      </p>
      <div className="w-full border-4 rounded-md border-neutral-300 flex h-96 border-solid border-2">
        <div className="flex flex-col min-w-1/4 h-full justify-between p-8">
          <div className="flex flex-col">
            <Menu
              method={setCategory}
              options={categories}
              currentPane={category}
              className="bg-amber-100 p-2"
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
              className="bg-white rounded-md font-bold h-16 p-2 w-full mt-2 border-solid border-2 hover:bg-amber-200 duration-300 min-w-44"
              onClick={getHistory}
            >
              Complaint History
            </button>
          </div>

          <button
            className="bg-white rounded-md font-bold h-16 p-2 w-full mt-2 border-solid border-2 hover:bg-amber-200 duration-300 min-w-44"
            onClick={submitComplaint}
          >
            Submit
          </button>
        </div>
        <div className="flex flex-col w-full h-full">
          <textarea
            className="overflow-y-auto w-full h-full rounded-sm border-solid border-2 p-2"
            type="text"
            placeholder={"Enter a complaint to be processed here."}
            onChange={handleInput}
            value={input}
          ></textarea>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 w-full">
          <div className="bg-white w-screen h-3/4 mx-44 rounded-lg shadow-lg p-4 relative border border-red-300 overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-600 font-bold text-lg"
              onClick={closeModal}
            >
             X
            </button>
            <h2 className="text-xl font-extra-bold mb-4 text-center">
              Complaint History
            </h2>
            <div className="flex flex-col w-full   ">
              {history.length > 0 ? (
                history.map((complaint, index) => (
                  <div className="flex flex-col p-2 border-2 m-2" key={index}>
                    <div>Main Type: {complaint.main_type}</div>
                    <div>Sub Type: {complaint.sub_type}</div>
                    <div>Created At: {complaint.created_at}</div>
                    <div className="flex">
                      <p>Description:</p>
                      <p>{complaint.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No history found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pane;
