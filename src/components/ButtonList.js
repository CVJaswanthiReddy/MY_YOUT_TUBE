import React from "react";
import Button from "./Button";

const buttonNames = [
  "All",
  "Gaming",
  "Songs",
  "Live",
  "Cricket",
  "Soccer",
  "News",
  "Cooking",
  "Valentines",
  "JavaScript",
];

const ButtonList = () => {
  return (
    <div className="flex">
      {buttonNames.map((name, index) => (
        <Button key={index} name={name} />
      ))}
    </div>
  );
};

export default ButtonList;
