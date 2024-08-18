"use client";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Signup = () => {
  // const [name, setName] = useState({
  //   first: "",
  //   last: "",
  // });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // function handleName(event) {
  //   const input = event.target.value;
  //   const fieldName = event.target.name;

  //   switch (fieldName) {
  //     case "firstName":
  //       setName((prev) => {
  //         return {
  //           first: input,
  //           last: prev.last,
  //         };
  //       });
  //       break;
  //     case "lastName":
  //       setName((prev) => {
  //         return {
  //           first: prev.first,
  //           last: input,
  //         };
  //       });
  //       break;
  //   }
  // }

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

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = "/";
      //await create user
      //If user isnt in database AND password === confirmPassword
      //    Add user to database
      //    Automatically Log User In With Member Functionality (Load their data and whatnot)
    } catch (error) {
      alert("Failed to create account. Ensure all fields are satisfied");
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-amber-50">
      <div className="flex flex-col w-3/12 min-w-96 items-center bg-white rounded-full p-10 text-black border-solid border-2">
        <header className="text-4xl mb-10 font-medium">Create Account</header>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          {/* <input
            className="rounded-lg mb-2 text-center bg-neutral-500 p-2"
            placeholder="First Name"
            name="firstName"
            value={name.first}
            onChange={handleName}
          ></input>
          <input
            className="rounded-lg mb-2 text-center bg-neutral-500 p-2"
            placeholder="Last Name"
            name="lastName"
            value={name.last}
            onChange={handleName}
          ></input> */}
          <input
            className="rounded-lg mb-2 text-center bg-white p-2 border-solid border-2"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
          ></input>
          <input
            className="rounded-lg mb-2 text-center bg-white p-2 border-solid border-2"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          ></input>
          <input
            className="rounded-lg mb-2 text-center bg-white p-2 border-solid border-2"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          ></input>
          <button className="bg-amber-100 rounded-lg mt-2 w-4/12 border-solid border-2 hover:bg-amber-300 duration-300 rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
