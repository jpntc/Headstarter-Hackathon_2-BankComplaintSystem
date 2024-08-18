"use client"
import React, {useState} from 'react'

const Input = () => {
  const [input, setInput] = useState("")

  const handleInput = (e)=>{
    setInput(e.target.value)
  }
  return ( 
    <div className="p-2 mx-2 flex flex-col bg-slate-300 w-full rounded-md">
      
      <div className="w-full">
        <div className="flex min-h-80 md:min-h-96 ">Results</div>
        <div className="flex items-center">
          <textarea
            className="overflow-y-auto w-full mx-2 rounded-sm max-h-16"
            type="text"
            placeholder={"Enter a complaint to be processed here."}
            onChange={(e)=>handleInput(e)}
            
          ></textarea>
          <button className="bg-green-600 rounded-md font-bold p-2 h-fit" onClick={()=>{console.log(input)}}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
export default Input