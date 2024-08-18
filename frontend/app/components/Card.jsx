import React from "react";

const Card = (props) => {
  return (
    <div className="pl-5 pr-5 p-2 bg-white border-solid border-2 border-solid m-5 rounded-lg">
      <div className="flex justify-between">
        <h1 className="font-medium">{props.main}</h1>
        <h1>{props.date}</h1>
      </div>
      <h1 className="font-medium">{props.sub}</h1>
      <p className="overflow-visible break-words">{props.complaint}</p>
    </div>
  );
};

export default Card;
