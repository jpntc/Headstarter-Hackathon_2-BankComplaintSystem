"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
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

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/";
      //await sign in
      //If successful, bring to home page with credentials
    } catch (error) {
      alert("Incorrect Username or Password");
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-amber-50">
      <div className="flex flex-col w-3/12 items-center bg-white rounded-full p-10 border-solid border-2 text-black">
        <header className="text-4xl mb-10 font-medium">Login Page</header>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
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
          <button className="bg-amber-100 rounded-lg mt-2 w-4/12 border-solid border-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
