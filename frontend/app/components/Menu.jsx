"use client"
import React, {useState}  from 'react'

const Menu = ({ method, options, currentPane }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="bg-blue-200 p-2 rounded-md h-fit min-w-fit text-nowrap"onClick={()=>setIsOpen(!isOpen)}>
        {
          isOpen?(
            <div>
              {
                   options.map((option, index)=>(
              <div className=" mb-2 text-sm border-black hover:bg-gray-200" key={index} onClick={()=>method(option)}>{option}</div>
            ))
              }
            </div>
         
        ):<></>
        }
        {isOpen?(<div className="hidden">{currentPane}</div>): <div className="rounded-md font-bold w-fit">{currentPane}</div>}
    </div>
  )
}

export default Menu