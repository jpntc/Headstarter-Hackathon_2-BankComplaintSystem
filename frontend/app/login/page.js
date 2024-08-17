"use client";
import { useState } from "react";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(event) {
    const input = event.target.value;
    setEmail(input);
  }

  function handlePassword(event) {
    const input = event.target.value;
    setPassword(input);
  }

  function handleSubmit(event) {
    event.preventDefault;
    try {
      //await sign in
      //If successful, bring to home page with credentials
    } catch (error) {
      alert("Incorrect Username or Password");
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col w-8/12 items-center bg-neutral-900 rounded-lg p-10">
        <header className="text-4xl mb-10">Login Page</header>
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
          <button className="bg-neutral-700 rounded-lg mt-2 w-4/12">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
