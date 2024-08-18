"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Complaints = () => {
  const problems = [
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
  const [show, setShow] = useState(false);
  const [buttonName, setButtonName] = useState("");
  const [complaints, setComplaints] = useState([
    {
      userId: "test",
      main_type: "test",
      sub_type: "test",
      description: "test",
      created_at: "test",
    },
    {
      userId: "Products",
      main_type: "Products",
      sub_type: "Products",
      description: "Products",
      created_at: "Products",
    },
    {
      userId: "Solutions",
      main_type: "Solutions",
      sub_type: "Solutions",
      description: "Solutions",
      created_at: "Solutions",
    },
    {
      userId: "Accounting",
      main_type: "Accounting",
      sub_type: "Accounting",
      description: "Accounting",
      created_at: "Accounting",
    },
    {
      userId: "Integrations",
      main_type: "Integrations",
      sub_type: "Integrations",
      description: "Integrations",
      created_at: "Integrations",
    },
  ]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);

  function setButton(event) {
    const name = event.target.name;
    setButtonName(name);
  }

  //   async function updateComplaints() {
  //     //Serverside function to grab all entries in complaints table
  //     // const result = function to grab all entries
  //     // setComplaints(dbComplaints);
  //     try {
  //       const response = await fetch("/api/complaints/history");
  //       const data = await response.json();
  //       setComplaints(data);
  //     } catch (error) {
  //       alert("Error fetching complaints");
  //     }
  //   }

  //   useEffect(() => {
  //     updateComplaints();
  //   }, []);

  useEffect(() => {
    if (buttonName) {
      let filtered = complaints.filter((complaint) => {
        return (
          complaint.main_type === buttonName ||
          complaint.sub_type === buttonName
        );
      });
      setFilteredComplaints(filtered);
    } else {
      setFilteredComplaints(complaints);
    }
    console.log(buttonName);
  }, [buttonName]);
  //when filter is selected, have useeffect function to change whenever state is updated from filter
  //    populate filteredComplaints with all complaints that pass filter criteria
  //    map filteredComplaints

  function toggleDisplay() {
    setShow(!show);
  }

  return (
    <div className="w-screen h-screen bg-amber-50 text-black overflow-auto">
      <Navbar />
      <div>
        <div className="w-full flex justify-center">
          <button
            onClick={toggleDisplay}
            className="ml-5 p-2 bg-amber-100 h-full hover:bg-amber-200 rounded-lg"
          >
            Filter
          </button>
        </div>
        {show && (
          <div className="w-full bg-amber-100 rounded-lg text-black">
            <div className="w-full flex justify-center space-x-8">
              <button onClick={setButton} name="Products">
                Products
              </button>
              <button onClick={setButton} name="Solutions">
                Solutions
              </button>
              <button onClick={setButton} name="Account">
                Account
              </button>
              <button onClick={setButton} name="Website">
                Website
              </button>
              <button onClick={setButton} name="">
                Remove Filters
              </button>
            </div>
            <div className="flex w-full bg-amber-100 p-2 rounded-lg text-black items-center">
              {problems.map((problem, index) => (
                <button
                  onClick={setButton}
                  className="w-3/12 flex justify-center"
                  key={index}
                  name={problem}
                >
                  {problem}
                </button>
              ))}
              {solutions.map((problem, index) => (
                <button
                  onClick={setButton}
                  className="w-3/12 flex justify-center"
                  key={index}
                  name={problem}
                >
                  {problem}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        {/* <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card /> */}
        {filteredComplaints.map((filteredComplaint, index) => (
          <Card
            key={index}
            main={filteredComplaint.main_type}
            sub={filteredComplaint.sub_type}
            date={filteredComplaint.created_at}
            complaint={filteredComplaint.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Complaints;
