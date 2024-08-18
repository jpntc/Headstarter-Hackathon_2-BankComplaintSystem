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
  const [showGeneral, setShowGeneral] = useState(false);
  const [showSpecific, setShowSpecific] = useState(false);
  const [buttonName, setButtonName] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);

  function setButton(event) {
    const name = event.target.name;
    setButtonName(name);
  }

  async function updateComplaints() {
    //Serverside function to grab all entries in complaints table
    // const result = function to grab all entries
    // setComplaints(dbComplaints);
    try {
      const response = await fetch(
        "http://localhost:5000/api/complaints/employee/history"
      );
      const data = await response.json();
      console.log(data);
      setComplaints(data);
    } catch (error) {
      alert("Error fetching complaints");
    }
  }

  useEffect(() => {
    updateComplaints();
  }, []);

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
  }, [buttonName, complaints]);
  //when filter is selected, have useeffect function to change whenever state is updated from filter
  //    populate filteredComplaints with all complaints that pass filter criteria
  //    map filteredComplaints

  function toggleDisplayGeneral() {
    if (showSpecific === true) {
      setShowSpecific(false);
    }
    setShowGeneral(!showGeneral);
  }

  function toggleDisplaySpecific() {
    if (showGeneral === true) {
      setShowGeneral(false);
    }
    setShowSpecific(!showSpecific);
  }

  return (
    <div className="w-screen h-screen bg-amber-50 text-black overflow-auto">
      <Navbar />
      <div>
        <div className="w-full flex justify-center">
          <div>
            <button
              onClick={toggleDisplayGeneral}
              className="font-bold text-md text-md ml-5 p-2 h-full hover:bg-amber-200 rounded-lg duration-300"
            >
              General Filter
            </button>
            <button
              onClick={toggleDisplaySpecific}
              className="font-bold text-md text-md ml-5 p-2 h-full hover:bg-amber-200 rounded-lg duration-300"
            >
              Specific Filter
            </button>
          </div>
          <button
            onClick={setButton}
            name=""
            className="font-bold text-md text-md ml-5 p-2 h-full hover:bg-amber-200 rounded-lg duration-300"
          >
            Remove Filters
          </button>
        </div>

        <div className="flex w-full p-2 rounded-lg text-black items-center justify-center space-x-2 flex-wrap">
          {showGeneral && (
            <div className="w-full h-full flex justify-center space-x-8">
              <button
                onClick={setButton}
                name="Products"
                className="bg-white rounded-lg p-2 border-solid border-2 hover:bg-amber-200 duration-300"
              >
                Products
              </button>
              <button
                onClick={setButton}
                name="Solutions"
                className="bg-white rounded-lg p-2 border-solid border-2 hover:bg-amber-200 duration-300"
              >
                Solutions
              </button>
              <button
                onClick={setButton}
                name="Account"
                className="bg-white rounded-lg p-2 border-solid border-2 hover:bg-amber-200 duration-300"
              >
                Account
              </button>
              <button
                onClick={setButton}
                name="Website"
                className="bg-white rounded-lg p-2 border-solid border-2 hover:bg-amber-200 duration-300"
              >
                Website
              </button>
            </div>
          )}
          {showSpecific && (
            <div className="flex w-full rounded-lg text-black items-center justify-center space-x-2 flex-wrap">
              {problems.map((problem, index) => (
                <button
                  onClick={setButton}
                  className="bg-white rounded-lg p-2 border-solid border-2 hover:bg-amber-200 duration-300"
                  key={index}
                  name={problem}
                >
                  {problem}
                </button>
              ))}
              {solutions.map((problem, index) => (
                <button
                  onClick={setButton}
                  className="bg-white rounded-lg p-2 border-solid border-2 hover:bg-amber-200 duration-300"
                  key={index}
                  name={problem}
                >
                  {problem}
                </button>
              ))}
            </div>
          )}
        </div>
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
