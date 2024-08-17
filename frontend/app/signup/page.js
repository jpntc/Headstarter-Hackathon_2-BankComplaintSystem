"use client";
import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleEmail(event) {
    const input = event.target.value;
    setEmail(input);
  }

  function handlePassword(event) {
    const input = event.target.value;
    setPassword(input);
  }

  function handleConfirmPassword(event) {
    const input = event.target.value;
    setConfirmPassword(input);
  }

  function handleSubmit(event) {
    event.preventDefault;
    try {
      //await create user
      //If user isnt in database AND password === confirmPassword
      //    Add user to database
      //    Automatically Log User In With Member Functionality (Load their data and whatnot)
    } catch (error) {
      alert("Failed to create account. Ensure all fields are satisfied");
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col w-8/12 items-center bg-neutral-900 rounded-lg p-10">
        <header className="text-4xl mb-10">Create Account</header>
        <form
          className="w-8/12 flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <input
            className="rounded-lg mb-2 text-center bg-neutral-500 p-2"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
          ></input>
          <input
            className="rounded-lg mb-2 text-center bg-neutral-500 p-2"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          ></input>
          <input
            className="rounded-lg mb-2 text-center bg-neutral-500 p-2"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          ></input>
          <button className="bg-neutral-700 rounded-lg mt-2 w-4/12">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
