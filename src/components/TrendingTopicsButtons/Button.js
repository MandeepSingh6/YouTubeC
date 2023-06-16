import React from "react";
import { useSelector } from "react-redux";
const Button = (props) => {
  const darkMode = useSelector((store) => store.app.darkMode);
  return (
    <button
      className={` py-[.2rem] px-[.8rem] rounded-[6px] text-[15px] duration-700 + ${
        darkMode
          ? "bg-[#3F3F3F] text-white hover:bg-gray-500"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {props.name}
    </button>
  );
};

export default Button;
